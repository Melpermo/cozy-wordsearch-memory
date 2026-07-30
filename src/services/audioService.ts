export type SoundEffectType =
  | 'ui_click'
  | 'letter_select'
  | 'word_found'
  | 'combo_hit'
  | 'hint_used'
  | 'victory'
  | 'defeat';

class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMutedState: boolean = false;
  private volumeState: number = 0.8;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('cozy_sound_muted');
      this.isMutedState = savedMute === 'true';

      const savedVol = localStorage.getItem('cozy_sound_volume');
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          this.volumeState = parsed;
        }
      }
    }
  }

  private initCtx() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMutedState ? 0 : this.volumeState, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  public setMuted(muted: boolean): void {
    this.isMutedState = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cozy_sound_muted', String(muted));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volumeState, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    const nextMuted = !this.isMutedState;
    this.setMuted(nextMuted);
    return nextMuted;
  }

  public getVolume(): number {
    return this.volumeState;
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volumeState = clamped;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cozy_sound_volume', String(clamped));
    }
    if (this.masterGain && this.ctx && !this.isMutedState) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public playSfx(type: SoundEffectType, dynamicParam?: number): void {
    switch (type) {
      case 'ui_click':
        this.playClick();
        break;
      case 'letter_select':
        this.playLetterSelect(dynamicParam);
        break;
      case 'word_found':
        this.playWordFound();
        break;
      case 'combo_hit':
        this.playCombo(dynamicParam);
        break;
      case 'hint_used':
        this.playHintUsed();
        break;
      case 'victory':
        this.playVictory();
        break;
      case 'defeat':
        this.playDefeat();
        break;
    }
  }

  // 1. UI Click: Short, subtle sine pop at ~440 Hz (duration ~0.05s)
  public playClick(): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio execution safe catch
    }
  }

  // 2. Letter Select: Soft melodic tone (C5, E5, G5 based on index/combo)
  public playLetterSelect(step: number = 0): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const freq = scale[Math.abs(step) % scale.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio execution safe catch
    }
  }

  // 3. Word Found: Upward major arpeggio (C5 -> E5 -> G5 -> C6) with soft exponential decay
  public playWordFound(): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const startTime = this.ctx.currentTime + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.01, startTime);
        gain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Audio execution safe catch
    }
  }

  // 4. Combo Hit: Ascending pitch sequence based on combo streak multiplier
  public playCombo(streak: number = 1): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const baseFreq = 523.25;
      const pitchShift = Math.min(streak, 10) * 50;
      const now = this.ctx.currentTime;

      const notes = [baseFreq + pitchShift, baseFreq + pitchShift + 130];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const startTime = now + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Audio execution safe catch
    }
  }

  // 5. Hint Used: Gentle magical chime (dual frequency layered sine wave with slight vibrato)
  public playHintUsed(): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const freq1 = 880; // A5
      const freq2 = 1320; // E6

      [freq1, freq2].forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq + 15, now + 0.15);
        osc.frequency.linearRampToValueAtTime(freq - 10, now + 0.3);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {
      // Audio execution safe catch
    }
  }

  // 6. Victory: Warm pentatonic chord progression/fanfare using layered oscillators
  public playVictory(): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50]; // C4, E4, G4, C5, E5, C6
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const startTime = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        const duration = idx === chord.length - 1 ? 0.7 : 0.45;
        gain.gain.setValueAtTime(0.01, startTime);
        gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch {
      // Audio execution safe catch
    }
  }

  // 7. Defeat: Low-frequency descending minor chord with soft low-pass filter sweep
  public playDefeat(): void {
    if (this.isMutedState) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    try {
      const notes = [440.00, 349.23, 293.66, 220.00]; // A4, F4, D4, A3
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const startTime = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, startTime);
        filter.frequency.exponentialRampToValueAtTime(200, startTime + 0.4);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Audio execution safe catch
    }
  }
}

export const audioService = new AudioService();
export const soundEngine = audioService;
