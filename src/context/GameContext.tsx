import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { GameState, GameStats, GridWord, GameContextType, ProgressByLanguage } from '../types/game';
import { type LanguageCode, translate } from '../i18n/i18nConfig';
import { LOCALIZED_LEVELS } from '../data/localizedLevels';
import { generateGrid } from '../utils/gridGenerator';
import { getRawProgress, saveProgress } from '../utils/storage';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Detect system language or default to en
    const systemLang = navigator.language.split('-')[0] as LanguageCode;
    const supported: LanguageCode[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];
    return supported.includes(systemLang) ? systemLang : 'en';
  });

  const [gameState, setGameState] = useState<GameState>('MAIN_MENU');
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundWordObjects, setFoundWordObjects] = useState<GridWord[]>([]);
  const [allGridWords, setAllGridWords] = useState<GridWord[]>([]);
  const [stats, setStats] = useState<GameStats | null>(null);

  // Scoped progress dictionary by language code
  const [progressData, setProgressData] = useState<ProgressByLanguage>(() => getRawProgress());

  // Derived progress map for current active language
  const progressMap = useMemo(() => {
    return progressData[language] || {};
  }, [progressData, language]);

  // Sync level index when changing language to avoid out of bounds
  useEffect(() => {
    const levels = LOCALIZED_LEVELS[language] || LOCALIZED_LEVELS.en;
    if (levelIndex >= levels.length) {
      setLevelIndex(0);
    }
  }, [language, levelIndex]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const saveLevelProgress = (targetLevelIdx: number, stars: number, timeSpent: number = 0) => {
    const updatedProgress = saveProgress(language, targetLevelIdx, stars, timeSpent);
    setProgressData({ ...updatedProgress });
  };

  const startGame = (targetLevelIndex?: number) => {
    const levels = LOCALIZED_LEVELS[language] || LOCALIZED_LEVELS.en;
    const idx = targetLevelIndex !== undefined ? targetLevelIndex : levelIndex;
    if (targetLevelIndex !== undefined) {
      setLevelIndex(targetLevelIndex);
    }
    const currentLevel = levels[idx] || levels[0];

    // Generate grid
    const { matrix, placedWords } = generateGrid(currentLevel.words, language);

    setGrid(matrix);
    setTargetWords(currentLevel.words);
    setFoundWords([]);
    setFoundWordObjects([]);
    setAllGridWords(placedWords);
    setStats(null);
    setGameState('MEMORIZING');
  };

  const resetGame = () => {
    setGameState('MAIN_MENU');
    setGrid([]);
    setTargetWords([]);
    setFoundWords([]);
    setFoundWordObjects([]);
    setAllGridWords([]);
    setStats(null);
  };

  const completeGame = (finalStats: GameStats) => {
    setStats(finalStats);
    setGameState('COMPLETED');
  };

  const t = (key: string, paramsOrFallback?: string | Record<string, string | number>, fallback?: string) => {
    return translate(language, key, paramsOrFallback, fallback);
  };

  return (
    <GameContext.Provider
      value={{
        language,
        setLanguage,
        gameState,
        setGameState,
        levelIndex,
        setLevelIndex,
        grid,
        setGrid,
        targetWords,
        setTargetWords,
        foundWords,
        setFoundWords,
        foundWordObjects,
        setFoundWordObjects,
        allGridWords,
        setAllGridWords,
        stats,
        setStats,
        progressMap,
        saveLevelProgress,
        startGame,
        resetGame,
        completeGame,
        t,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
