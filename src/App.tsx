import React, { useState, useEffect, useCallback } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useTimer } from './hooks/useTimer';
import { useCozyAudio } from './hooks/useCozyAudio';
import { LOCALIZED_LEVELS } from './data/localizedLevels';
import { generateGrid } from './utils/gridGenerator';
import { Header } from './components/layout/Header';
import { GameViewport } from './components/layout/GameViewport';
import { BoardGrid } from './components/game/BoardGrid';
import { MemorizeOverlay } from './components/game/MemorizeOverlay';
import { CompletionModal } from './components/game/CompletionModal';
import { LevelCompleteModal } from './components/game/LevelCompleteModal';
import { GameOverModal } from './components/game/GameOverModal';
import { MainMenu } from './components/menu/MainMenu';
import { LevelSelectModal } from './components/menu/LevelSelectModal';
import { WordList } from './components/WordSearch/WordList';
import type { GridWord, GameStats } from './types/game';
import { 
  Clock, 
  Trophy
} from 'lucide-react';

const GameContent: React.FC = () => {
  const {
    gameState,
    setGameState,
    gameModeConfig,
    setDefeatReason,
    registerCorrectWord,
    registerIncorrectWord,
    awardHint,
    language,
    currentMode,
    currentCategory,
    levelIndex,
    targetWords,
    setTargetWords,
    foundWords,
    setFoundWords,
    foundWordObjects,
    setFoundWordObjects,
    setGrid,
    setAllGridWords,
    stats,
    setStats,
    saveLevelProgress,
    startGame,
    resetGame,
    t,
  } = useGame();

  const { playWordFound, playLevelComplete, playLevelFailed, playButtonClick } = useCozyAudio();

  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);

  const currentLevel = LOCALIZED_LEVELS[language][levelIndex] || LOCALIZED_LEVELS[language][0];

  const [mistakes, setMistakes] = useState(0);

  // Time-up callback when search timer hits 0
  const handleTimeUp = useCallback(() => {
    setDefeatReason('timeout');
    playLevelFailed();
    setGameState('LEVEL_FAILED');
  }, [setGameState, setDefeatReason, playLevelFailed]);

  const searchDuration = currentLevel.searchTime || 60;

  // Hook up our countdown timer
  const { remainingTime, elapsedTime } = useTimer(gameState, searchDuration, handleTimeUp);

  // Reset mistakes when level starts
  useEffect(() => {
    if (gameState === 'MEMORIZING') {
      setMistakes(0);
    }
  }, [gameState]);

  // Handle a target word being found
  const handleWordFound = (wordObj: GridWord) => {
    // Avoid double entries
    if (foundWords.includes(wordObj.word)) return;

    const { comboCount } = registerCorrectWord();
    if (currentMode === 'memory_rush' && comboCount >= 3 && comboCount % 3 === 0) {
      awardHint();
    }

    const nextFoundWords = [...foundWords, wordObj.word];
    const nextFoundWordObjects = [...foundWordObjects, wordObj];

    setFoundWords(nextFoundWords);
    setFoundWordObjects(nextFoundWordObjects);

    // Zen Mode (isInfinite === true): dynamically spawn a new word in the grid to replace it without triggering LEVEL_COMPLETE
    if (gameModeConfig.isInfinite) {
      playWordFound();

      const allPoolWords = (LOCALIZED_LEVELS[language] || LOCALIZED_LEVELS.en).flatMap(l => l.words);
      const availablePool = allPoolWords.filter(w => !targetWords.includes(w));
      const nextWord = availablePool[Math.floor(Math.random() * availablePool.length)] || `WORD${targetWords.length + 1}`;

      const updatedTargets = targetWords.map(w => w === wordObj.word ? nextWord : w);
      const { matrix, placedWords } = generateGrid(updatedTargets, language);

      setGrid(matrix);
      setTargetWords(updatedTargets);
      setAllGridWords(placedWords);
      setFoundWords(nextFoundWords);
      return;
    }

    // Check if level is finished (Win condition)
    if (nextFoundWords.length === targetWords.length) {
      playLevelComplete();

      // Calculate accuracy & score with mode penalty settings
      const effectiveMistakes = gameModeConfig.maxLives !== null ? mistakes : 0;
      const totalAttempts = targetWords.length + effectiveMistakes;
      const accuracy = Math.round((targetWords.length / totalAttempts) * 100);

      // Score logic: base 500 + time bonus + accuracy bonus
      const speedBonus = Math.max(0, 1000 - elapsedTime * 10);
      const accuracyBonus = Math.max(0, 500 - effectiveMistakes * 80);
      const score = Math.round(targetWords.length * 150 + speedBonus + accuracyBonus);

      // Star calculation
      let stars = 3;
      if (gameModeConfig.maxLives !== null) {
        if (effectiveMistakes <= 1 && elapsedTime <= currentLevel.memorizeTime * 3) {
          stars = 3;
        } else if (effectiveMistakes <= 3 && elapsedTime <= currentLevel.memorizeTime * 6) {
          stars = 2;
        } else {
          stars = 1;
        }
      }

      const finalStats: GameStats = {
        timeTaken: elapsedTime,
        mistakes,
        accuracy,
        score,
        stars,
      };

      saveLevelProgress(levelIndex, stars, elapsedTime);
      setStats(finalStats);
      setGameState('LEVEL_COMPLETE');
    } else {
      playWordFound();
    }
  };

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
    const { gameOver } = registerIncorrectWord();
    if (gameOver) {
      playLevelFailed();
    }
  };

  const handleSkipMemorize = () => {
    playButtonClick();
    setGameState('SEARCHING');
  };

  const handleNextLevel = () => {
    playButtonClick();
    const levels = LOCALIZED_LEVELS[language];
    const nextIndex = (levelIndex + 1) % levels.length;
    startGame(nextIndex);
  };

  const handleRestartLevel = () => {
    playButtonClick();
    startGame(levelIndex);
  };

  const levels = LOCALIZED_LEVELS[language];
  const hasNextLevel = levelIndex + 1 < levels.length;

  const timeLimitVal = gameModeConfig.memorizeTimeLimit(levelIndex);
  const memorizeDuration = timeLimitVal !== null
    ? timeLimitVal
    : currentLevel.memorizeTime;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      
      <GameViewport>
        {(gameState === 'MAIN_MENU' || gameState === 'IDLE') && (
          <MainMenu onOpenLevelSelect={() => setIsLevelSelectOpen(true)} />
        )}

        {(gameState === 'MEMORIZING' || gameState === 'SEARCHING') && (
          <div className="w-full flex flex-col items-center gap-6 py-2 select-none">
            {/* Active Header Dashboard */}
            <div className="w-full flex items-center justify-between px-2">
              {/* Level name / status */}
              <div className="flex flex-col">
                <span className="text-xs font-black text-cozy-muted uppercase tracking-wider">
                  {currentLevel.displayName[language] || currentLevel.displayName.en}
                </span>
                <span className="text-sm font-black text-cozy-text">
                  {gameState === 'MEMORIZING' ? (
                    <span className="text-cozy-honey-dark flex items-center gap-1">
                      <Clock size={14} className="animate-pulse" />
                      {t('memorizeWords')}
                    </span>
                  ) : (
                    <span className="text-cozy-mint-dark flex items-center gap-1">
                      <Trophy size={14} />
                      {t('wordsFound', { found: foundWords.length, total: targetWords.length })}
                    </span>
                  )}
                </span>
              </div>

              {/* Remaining timer display */}
              {gameState === 'SEARCHING' && (
                <div className="bg-cozy-tile/65 border border-cozy-tile-shadow/20 px-3 py-1.5 rounded-full flex items-center gap-2 font-mono text-sm font-black text-cozy-text shadow-sm">
                  <Clock size={16} className="text-cozy-muted" />
                  <span>
                    {`${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`}
                  </span>
                </div>
              )}
            </div>

            {/* Grid viewport wrapper containing blur filters */}
            <div className="relative w-full flex justify-center">
              <BoardGrid onWordFound={handleWordFound} onMistake={handleMistake} />

              {/* Phase 1 Overlay */}
              {gameState === 'MEMORIZING' && (
                <MemorizeOverlay
                  words={targetWords}
                  durationSeconds={memorizeDuration}
                  onTimeUp={handleSkipMemorize}
                />
              )}
            </div>

            {/* Bottom Status / Memory Badges rendering via WordList component */}
            <WordList
              targetWords={targetWords}
              foundWords={foundWords}
              hideWordListInSearch={gameModeConfig.hideWordListInSearch}
              gameState={gameState}
            />
          </div>
        )}
        {/* Level Complete Overlay */}
        {gameState === 'LEVEL_COMPLETE' && (
          <LevelCompleteModal
            timeSpent={stats?.timeTaken || elapsedTime}
            maxTime={searchDuration}
            onNextLevel={handleNextLevel}
            onRestart={handleRestartLevel}
          />
        )}

        {/* Defeat / Game Over Overlay */}
        {(gameState === 'LEVEL_FAILED' || gameState === 'GAME_OVER') && (
          <GameOverModal
            onRetry={handleRestartLevel}
            onBackToMenu={resetGame}
          />
        )}

        {/* Completion Modal fallback for COMPLETED state */}
        {gameState === 'COMPLETED' && (
          <CompletionModal
            onRestart={() => startGame()}
            onNextLevel={handleNextLevel}
            hasNextLevel={hasNextLevel}
          />
        )}

        {/* Level Select Modal */}
        {isLevelSelectOpen && (
          <LevelSelectModal key={`${language}-${currentMode}-${currentCategory}`} onClose={() => setIsLevelSelectOpen(false)} />
        )}
      </GameViewport>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default App;
