import React, { createContext, useContext, useState, useEffect } from 'react';
import type { GameMode, GameStats, GridWord, GameContextType, ProgressMap, ActiveHint } from '../types/game';
import type { CategoryId } from '../types/category';
import { type LanguageCode, translate } from '../i18n/i18nConfig';
import { WORD_PACKS, getCategoryWordList } from '../data/wordPacks';
import { generateGrid, selectTargetWordsForDifficulty } from '../utils/gridGenerator';
import { getProgressForCategory, saveProgress } from '../utils/storage';
import { useGameFSM } from '../hooks/useGameFSM';
import { audioService } from '../services/audioService';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Detect system language or default to en
    const systemLang = navigator.language.split('-')[0] as LanguageCode;
    const supported: LanguageCode[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];
    return supported.includes(systemLang) ? systemLang : 'en';
  });

  const [currentCategory, setCurrentCategory] = useState<CategoryId>('general');
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundWordObjects, setFoundWordObjects] = useState<GridWord[]>([]);
  const [allGridWords, setAllGridWords] = useState<GridWord[]>([]);
  const [stats, setStats] = useState<GameStats | null>(null);

  // Core Game FSM
  const fsm = useGameFSM({ levelIndex });

  // Progress dictionary scoped by language, mode, and category
  const [progressMap, setProgressMap] = useState<ProgressMap>(() => 
    getProgressForCategory(language, fsm.currentMode, currentCategory)
  );

  // Sync progressMap when language, currentMode, or currentCategory changes
  useEffect(() => {
    setProgressMap(getProgressForCategory(language, fsm.currentMode, currentCategory));
  }, [language, fsm.currentMode, currentCategory]);

  // Sync level index when changing language or category to avoid out of bounds
  useEffect(() => {
    const categoryWords = getCategoryWordList(currentCategory, language);
    const totalLevels = Math.max(1, Math.ceil(categoryWords.length / 5));
    if (levelIndex >= totalLevels) {
      setLevelIndex(0);
    }
  }, [language, currentCategory, levelIndex]);

  const [activeHint, setActiveHint] = useState<ActiveHint | null>(null);
  const [hintCooldown, setHintCooldown] = useState<boolean>(false);
  const [hintCooldownSeconds, setHintCooldownSeconds] = useState<number>(0);
  const [availableHints, setAvailableHints] = useState<number | null>(null);
  const [hintToast, setHintToast] = useState<string | null>(null);

  // Cooldown countdown effect for Cozy / Zen mode infinite hints
  // Auto-clears active hint when cooldown ends (timer reaches 0)
  useEffect(() => {
    if (hintCooldownSeconds <= 0) {
      setHintCooldown(false);
      if (fsm.currentMode !== 'memory_rush') {
        setActiveHint(null);
      }
      return;
    }
    const timer = setInterval(() => {
      setHintCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setHintCooldown(false);
          if (fsm.currentMode !== 'memory_rush') {
            setActiveHint(null);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hintCooldownSeconds, fsm.currentMode]);

  // Clear active hint if the target word is found
  useEffect(() => {
    if (activeHint && (foundWords.includes(activeHint.word) || foundWords.some(w => w.toUpperCase() === activeHint.word.toUpperCase()))) {
      setActiveHint(null);
    }
  }, [foundWords, activeHint]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const saveLevelProgress = (targetLevelIdx: number, stars: number, timeSpent: number = 0) => {
    const updatedProgress = saveProgress(language, fsm.currentMode, currentCategory, targetLevelIdx, stars, timeSpent);
    setProgressMap({ ...updatedProgress });
  };

  const triggerHintToast = (msg: string) => {
    setHintToast(msg);
    setTimeout(() => {
      setHintToast(null);
    }, 2000);
  };

  const applyHintConsumption = () => {
    if (fsm.currentMode === 'memory_rush') {
      setAvailableHints((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
    } else {
      setHintCooldown(true);
      setHintCooldownSeconds(5);
    }
  };

  const triggerHint = () => {
    if (fsm.gameState !== 'SEARCHING') return;

    if (availableHints !== null && availableHints <= 0) return;
    if (availableHints === null && hintCooldown) return;

    const unfoundWords = allGridWords.filter(
      (gw) => !foundWords.includes(gw.word) && !foundWords.includes(gw.normalized)
    );

    if (unfoundWords.length === 0) return;

    if (activeHint) {
      const currentHintWordStillUnfound = unfoundWords.find(
        (gw) => gw.word === activeHint.word || gw.normalized === activeHint.word
      );
      if (currentHintWordStillUnfound && activeHint.step === 'first_letter') {
        setActiveHint({
          ...activeHint,
          step: 'direction',
        });
        applyHintConsumption();
        return;
      }
    }

    const targetWord = unfoundWords.reduce((prev, curr) =>
      curr.word.length > prev.word.length ? curr : prev, unfoundWords[0]
    );

    setActiveHint({
      word: targetWord.word,
      startCoords: targetWord.start,
      endCoords: targetWord.end,
      step: 'first_letter',
    });

    audioService.playHintUsed();
    applyHintConsumption();
  };

  const clearHint = () => {
    setActiveHint(null);
  };

  const startGame = (targetLevelIndex?: number, mode?: GameMode) => {
    const idx = targetLevelIndex !== undefined ? targetLevelIndex : levelIndex;
    if (targetLevelIndex !== undefined) {
      setLevelIndex(targetLevelIndex);
    }

    const categoryWords = WORD_PACKS[currentCategory]?.words[language] || WORD_PACKS[currentCategory]?.words['en'] || getCategoryWordList(currentCategory, language);
    const levelWords = selectTargetWordsForDifficulty(categoryWords, idx, 5);

    // Generate grid
    const { matrix, placedWords } = generateGrid(levelWords, language);

    setGrid(matrix);
    setTargetWords(levelWords);
    setFoundWords([]);
    setFoundWordObjects([]);
    setAllGridWords(placedWords);
    setStats(null);

    // Reset hints
    setActiveHint(null);
    setHintCooldown(false);
    setHintCooldownSeconds(0);
    const activeMode = mode || fsm.currentMode;
    if (activeMode === 'memory_rush') {
      setAvailableHints(0);
    } else {
      setAvailableHints(null);
    }

    fsm.startGameFSM(mode, idx);
  };

  const resetGame = () => {
    fsm.setGameState('MAIN_MENU');
    setGrid([]);
    setTargetWords([]);
    setFoundWords([]);
    setFoundWordObjects([]);
    setAllGridWords([]);
    setStats(null);
    setActiveHint(null);
    setHintCooldown(false);
    setHintCooldownSeconds(0);
    setAvailableHints(null);
  };

  const completeGame = (finalStats: GameStats) => {
    setStats(finalStats);
    audioService.playVictory();
    fsm.setGameState('COMPLETED');
  };

  const t = (key: string, paramsOrFallback?: string | Record<string, string | number>, fallback?: string) => {
    return translate(language, key, paramsOrFallback, fallback);
  };

  const awardHint = () => {
    setAvailableHints((prev) => (prev !== null ? prev + 1 : 1));
    triggerHintToast(translate(language, 'hintEarned', '+1 Pista!'));
  };

  return (
    <GameContext.Provider
      value={{
        language,
        setLanguage,
        gameState: fsm.gameState,
        setGameState: fsm.setGameState,
        currentMode: fsm.currentMode,
        setCurrentMode: fsm.setCurrentMode,
        currentCategory,
        setCurrentCategory,
        gameModeConfig: fsm.gameModeConfig,
        currentLives: fsm.currentLives,
        setCurrentLives: fsm.setCurrentLives,
        defeatReason: fsm.defeatReason,
        setDefeatReason: fsm.setDefeatReason,
        playerStats: fsm.playerStats,
        setPlayerStats: fsm.setPlayerStats,
        registerCorrectWord: () => {
          const res = fsm.registerCorrectWord();
          audioService.playWordFound();
          if (res.comboCount > 1) {
            audioService.playCombo(res.comboCount);
          }
          return res;
        },
        registerIncorrectWord: () => {
          const res = fsm.registerIncorrectWord();
          if (res.gameOver) {
            audioService.playDefeat();
          }
          return res;
        },
        activeHint,
        hintCooldown,
        hintCooldownSeconds,
        availableHints,
        hintToast,
        triggerHint,
        clearHint,
        awardHint,
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
