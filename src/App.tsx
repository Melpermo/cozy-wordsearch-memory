import React, { useState, useEffect, useCallback } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useTimer } from './hooks/useTimer';
import { useCozyAudio } from './hooks/useCozyAudio';
import { LOCALIZED_LEVELS } from './data/localizedLevels';
import { Header } from './components/layout/Header';
import { GameViewport } from './components/layout/GameViewport';
import { BoardGrid } from './components/game/BoardGrid';
import { MemorizeOverlay } from './components/game/MemorizeOverlay';
import { CompletionModal } from './components/game/CompletionModal';
import { LevelCompleteModal } from './components/game/LevelCompleteModal';
import { LevelFailedModal } from './components/game/LevelFailedModal';
import { MainMenu } from './components/menu/MainMenu';
import { LevelSelectModal } from './components/menu/LevelSelectModal';
import type { GridWord, GameStats } from './types/game';
import { 
  Clock, 
  Trophy, 
  EyeOff, 
  HelpCircle,
  Check
} from 'lucide-react';

const GameContent: React.FC = () => {
  const {
    gameState,
    setGameState,
    language,
    levelIndex,
    targetWords,
    foundWords,
    setFoundWords,
    foundWordObjects,
    setFoundWordObjects,
    stats,
    setStats,
    saveLevelProgress,
    startGame,
    t,
  } = useGame();

  const { playWordFound, playLevelComplete, playLevelFailed, playButtonClick } = useCozyAudio();

  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);

  const currentLevel = LOCALIZED_LEVELS[language][levelIndex] || LOCALIZED_LEVELS[language][0];

  const [mistakes, setMistakes] = useState(0);

  // Time-up callback when search timer hits 0
  const handleTimeUp = useCallback(() => {
    playLevelFailed();
    setGameState('LEVEL_FAILED');
  }, [setGameState, playLevelFailed]);

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

    const nextFoundWords = [...foundWords, wordObj.word];
    const nextFoundWordObjects = [...foundWordObjects, wordObj];

    setFoundWords(nextFoundWords);
    setFoundWordObjects(nextFoundWordObjects);

    // Check if level is finished (Win condition)
    if (nextFoundWords.length === targetWords.length) {
      playLevelComplete();

      // Calculate accuracy
      const totalAttempts = targetWords.length + mistakes;
      const accuracy = Math.round((targetWords.length / totalAttempts) * 100);

      // Score logic: base 500 + time bonus + accuracy bonus
      const speedBonus = Math.max(0, 1000 - elapsedTime * 10);
      const accuracyBonus = Math.max(0, 500 - mistakes * 80);
      const score = Math.round(targetWords.length * 150 + speedBonus + accuracyBonus);

      // Star calculation
      let stars = 1;
      if (mistakes <= 1 && elapsedTime <= currentLevel.memorizeTime * 3) {
        stars = 3;
      } else if (mistakes <= 3 && elapsedTime <= currentLevel.memorizeTime * 6) {
        stars = 2;
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
                  durationSeconds={currentLevel.memorizeTime}
                  onTimeUp={handleSkipMemorize}
                />
              )}
            </div>

            {/* Bottom Status / Memory Badges */}
            <div className="w-full bg-cozy-card border border-cozy-tile-shadow/15 rounded-card p-5 shadow-sm">
              <h4 className="text-xs font-black tracking-widest text-cozy-muted uppercase mb-3 flex items-center gap-1.5">
                {gameState === 'MEMORIZING' ? (
                  <>
                    <HelpCircle size={14} />
                    <span>{t('memorizeWords')}</span>
                  </>
                ) : (
                  <>
                    <EyeOff size={14} className="text-cozy-muted" />
                    <span>{t('searching')}</span>
                  </>
                )}
              </h4>

              {/* Word Recall slots grid */}
              <div className="flex flex-wrap gap-2 justify-start">
                {targetWords.map((word, index) => {
                  const isFound = foundWords.includes(word);
                  return (
                    <div
                      key={index}
                      className={`
                        px-3.5 py-2 rounded-tile font-black text-sm select-none border transition-all duration-300
                        ${isFound
                          ? 'bg-cozy-mint/15 border-cozy-mint/40 text-cozy-mint-dark line-through opacity-60 scale-95 flex items-center gap-1.5'
                          : 'bg-cozy-tile/50 border-cozy-tile-shadow/10 text-cozy-text'
                        }
                      `}
                    >
                      {isFound ? (
                        <span className="flex items-center gap-1.5">
                          <Check size={14} className="text-cozy-mint-dark stroke-[3] animate-pop-in" />
                          <span>{word}</span>
                        </span>
                      ) : (
                        // Render question mark slots to match letter lengths
                        <span className="font-mono text-cozy-muted/65 select-none font-bold">
                          {word.split('').map(() => '?').join(' ')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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

        {/* Level Failed Overlay */}
        {gameState === 'LEVEL_FAILED' && (
          <LevelFailedModal
            onRetry={handleRestartLevel}
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
          <LevelSelectModal key={language} onClose={() => setIsLevelSelectOpen(false)} />
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
