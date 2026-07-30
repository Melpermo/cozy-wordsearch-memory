import { useAudio } from './useAudio';

export function useCozyAudio() {
  const audio = useAudio();

  return {
    isMuted: audio.isMuted,
    toggleMute: audio.toggleMute,
    playTileSelect: audio.playLetterSelect,
    playWordFound: audio.playWordFound,
    playLevelComplete: audio.playVictory,
    playLevelFailed: audio.playDefeat,
    playButtonClick: audio.playClick,
    playHintUsed: audio.playHintUsed,
    playCombo: audio.playCombo,
  };
}
