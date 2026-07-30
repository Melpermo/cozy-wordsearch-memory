import { useState, useEffect, useCallback } from 'react';
import type { GameState, GameMode, GameModeConfig, PlayerStats, DefeatReason } from '../types/game';
import { GAME_MODE_SETTINGS } from '../types/game';

interface UseGameFSMProps {
  onTransitionToSearching?: () => void;
  levelIndex?: number;
}

export function useGameFSM(props?: UseGameFSMProps) {
  const [currentMode, setCurrentMode] = useState<GameMode>('cozy');
  const [gameState, setGameState] = useState<GameState>('MAIN_MENU');
  const [memorizeCountdown, setMemorizeCountdown] = useState<number | null>(null);
  const [defeatReason, setDefeatReason] = useState<DefeatReason | null>(null);

  const gameModeConfig: GameModeConfig = GAME_MODE_SETTINGS[currentMode] || GAME_MODE_SETTINGS.cozy;

  const [currentLives, setCurrentLives] = useState<number | null>(gameModeConfig.maxLives);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    attempts: 0,
    mistakes: 0,
    streak: 0,
    maxStreak: 0,
  });

  // Transition helper
  const transitionTo = useCallback((newState: GameState) => {
    setGameState(newState);
    if (newState === 'SEARCHING' && props?.onTransitionToSearching) {
      props.onTransitionToSearching();
    }
  }, [props]);

  // Start game with specified or current mode and level
  const startGameFSM = useCallback((mode?: GameMode, levelIdx: number = 0) => {
    const activeMode = mode || currentMode;
    if (mode) {
      setCurrentMode(mode);
    }

    const config = GAME_MODE_SETTINGS[activeMode];
    setCurrentLives(config.maxLives);
    setDefeatReason(null);
    setPlayerStats({
      attempts: 0,
      mistakes: 0,
      streak: 0,
      maxStreak: 0,
    });

    const timeLimit = config.memorizeTimeLimit(levelIdx);

    // If Zen mode, bypass MEMORIZING entirely and go straight to SEARCHING
    if (config.isInfinite) {
      transitionTo('SEARCHING');
      setMemorizeCountdown(null);
    } else {
      setGameState('MEMORIZING');
      setMemorizeCountdown(timeLimit);
    }
  }, [currentMode, transitionTo]);

  // MEMORIZING State handling for memory_rush automated countdown
  useEffect(() => {
    if (gameState !== 'MEMORIZING') {
      return;
    }

    const timeLimit = gameModeConfig.memorizeTimeLimit(props?.levelIndex || 0);
    if (timeLimit === null || timeLimit === undefined) {
      // Untimed (e.g. cozy mode)
      return;
    }

    setMemorizeCountdown(timeLimit);

    const interval = setInterval(() => {
      setMemorizeCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          transitionTo('SEARCHING');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, gameModeConfig, props?.levelIndex, transitionTo]);

  const skipMemorize = useCallback(() => {
    if (gameState === 'MEMORIZING') {
      transitionTo('SEARCHING');
    }
  }, [gameState, transitionTo]);

  // Word validation logic: Correct Word Found
  const registerCorrectWord = useCallback(() => {
    let healed = false;
    let newComboCount = 0;

    setPlayerStats((prev) => {
      const nextAttempts = prev.attempts + 1;
      const nextStreak = prev.streak + 1;
      const nextMaxStreak = Math.max(prev.maxStreak, nextStreak);
      newComboCount = nextStreak;

      // Combo Heal Check
      if (
        gameModeConfig.maxLives !== null &&
        gameModeConfig.comboHealThreshold > 0 &&
        nextStreak % gameModeConfig.comboHealThreshold === 0
      ) {
        setCurrentLives((lives) => {
          if (lives !== null && lives < gameModeConfig.maxLives!) {
            healed = true;
            return lives + 1;
          }
          return lives;
        });
      }

      return {
        attempts: nextAttempts,
        mistakes: prev.mistakes,
        streak: nextStreak,
        maxStreak: nextMaxStreak,
      };
    });

    return { healed, comboCount: newComboCount };
  }, [gameModeConfig.maxLives, gameModeConfig.comboHealThreshold]);

  // Word validation logic: Incorrect Word Attempt
  const registerIncorrectWord = useCallback(() => {
    let isGameOver = false;
    let nextLives: number | null = null;

    setPlayerStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
      mistakes: prev.mistakes + 1,
      streak: 0,
    }));

    if (gameModeConfig.maxLives !== null) {
      setCurrentLives((lives) => {
        if (lives === null) return null;
        const updated = Math.max(0, lives - 1);
        nextLives = updated;
        if (updated <= 0) {
          isGameOver = true;
          setDefeatReason('out_of_lives');
          setGameState('LEVEL_FAILED');
        }
        return updated;
      });
    }

    return { gameOver: isGameOver, remainingLives: nextLives };
  }, [gameModeConfig.maxLives]);

  return {
    currentMode,
    setCurrentMode,
    gameModeConfig,
    gameState,
    setGameState,
    memorizeCountdown,
    currentLives,
    setCurrentLives,
    defeatReason,
    setDefeatReason,
    playerStats,
    setPlayerStats,
    startGameFSM,
    skipMemorize,
    transitionTo,
    registerCorrectWord,
    registerIncorrectWord,
  };
}
