import { audioService } from '../services/audioService';

class CozyAudioManager {
  public isMuted(): boolean {
    return audioService.isMuted();
  }

  public setMuted(muted: boolean): void {
    audioService.setMuted(muted);
  }

  public toggleMute(): boolean {
    return audioService.toggleMute();
  }

  public playTileSelect(): void {
    audioService.playLetterSelect();
  }

  public playWordFound(): void {
    audioService.playWordFound();
  }

  public playLevelComplete(): void {
    audioService.playVictory();
  }

  public playLevelFailed(): void {
    audioService.playDefeat();
  }

  public playButtonClick(): void {
    audioService.playClick();
  }
}

export const audioManager = new CozyAudioManager();
