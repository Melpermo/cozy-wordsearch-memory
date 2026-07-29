import { useState, useCallback } from 'react';
import { audioManager } from '../utils/audioManager';

export function useCozyAudio() {
  const [isMuted, setIsMutedState] = useState<boolean>(() => audioManager.isMuted());

  const toggleMute = useCallback(() => {
    const nextMuted = audioManager.toggleMute();
    setIsMutedState(nextMuted);
  }, []);

  const playTileSelect = useCallback(() => {
    audioManager.playTileSelect();
  }, []);

  const playWordFound = useCallback(() => {
    audioManager.playWordFound();
  }, []);

  const playLevelComplete = useCallback(() => {
    audioManager.playLevelComplete();
  }, []);

  const playLevelFailed = useCallback(() => {
    audioManager.playLevelFailed();
  }, []);

  const playButtonClick = useCallback(() => {
    audioManager.playButtonClick();
  }, []);

  return {
    isMuted,
    toggleMute,
    playTileSelect,
    playWordFound,
    playLevelComplete,
    playLevelFailed,
    playButtonClick,
  };
}
