import { useState, useCallback } from 'react';
import { audioService, type SoundEffectType } from '../services/audioService';

export function useAudio() {
  const [isMuted, setIsMutedState] = useState<boolean>(() => audioService.isMuted());
  const [volume, setVolumeState] = useState<number>(() => audioService.getVolume());

  const toggleMute = useCallback(() => {
    const nextMuted = audioService.toggleMute();
    setIsMutedState(nextMuted);
    return nextMuted;
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    audioService.setMuted(muted);
    setIsMutedState(muted);
  }, []);

  const setVolume = useCallback((vol: number) => {
    audioService.setVolume(vol);
    setVolumeState(vol);
  }, []);

  const playSfx = useCallback((type: SoundEffectType, dynamicParam?: number) => {
    audioService.playSfx(type, dynamicParam);
  }, []);

  const playClick = useCallback(() => {
    audioService.playClick();
  }, []);

  const playLetterSelect = useCallback((step?: number) => {
    audioService.playLetterSelect(step);
  }, []);

  const playWordFound = useCallback(() => {
    audioService.playWordFound();
  }, []);

  const playCombo = useCallback((streak?: number) => {
    audioService.playCombo(streak);
  }, []);

  const playHintUsed = useCallback(() => {
    audioService.playHintUsed();
  }, []);

  const playVictory = useCallback(() => {
    audioService.playVictory();
  }, []);

  const playDefeat = useCallback(() => {
    audioService.playDefeat();
  }, []);

  return {
    isMuted,
    volume,
    toggleMute,
    setMuted,
    setVolume,
    playSfx,
    playClick,
    playLetterSelect,
    playWordFound,
    playCombo,
    playHintUsed,
    playVictory,
    playDefeat,
  };
}
