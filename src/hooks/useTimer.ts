import { useState, useEffect } from 'react';
import type { GameState } from '../types/game';

export function useTimer(
  gameState: GameState,
  initialTime: number = 60,
  onTimeUp?: () => void
) {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (gameState === 'SEARCHING') {
      setRemainingTime(initialTime);
      setElapsedTime(0);

      interval = window.setInterval(() => {
        setRemainingTime((prevRemaining) => {
          if (prevRemaining <= 1) {
            if (interval) window.clearInterval(interval);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prevRemaining - 1;
        });

        setElapsedTime((prevElapsed) => prevElapsed + 1);
      }, 1000);
    } else if (gameState === 'LEVEL_COMPLETE' || gameState === 'COMPLETED' || gameState === 'LEVEL_FAILED') {
      // Freeze values
    } else {
      setRemainingTime(initialTime);
      setElapsedTime(0);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [gameState, initialTime, onTimeUp]);

  return { remainingTime, elapsedTime };
}
