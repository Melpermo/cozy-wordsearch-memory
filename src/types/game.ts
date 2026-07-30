import type { LanguageCode } from '../i18n/i18nConfig';

export type GameState = 'MAIN_MENU' | 'IDLE' | 'MEMORIZING' | 'SEARCHING' | 'COMPLETED' | 'LEVEL_COMPLETE' | 'LEVEL_FAILED' | 'GAME_OVER';

export type GameMode = 'cozy' | 'memory_rush' | 'zen';

export type DefeatReason = 'timeout' | 'out_of_lives';

export interface PlayerStats {
  attempts: number;
  mistakes: number;
  streak: number;
  maxStreak: number;
}

export interface GameModeConfig {
  id: GameMode;
  memorizeTimeLimit: (level: number) => number | null; // Dynamic time based on level
  hideWordListInSearch: boolean;
  isInfinite: boolean;
  maxLives: number | null; // null = infinite/no lives (Cozy & Zen)
  comboHealThreshold: number; // consecutive hits needed to recover 1 life (e.g. 3)
}

export const GAME_MODE_SETTINGS: Record<GameMode, GameModeConfig> = {
  cozy: {
    id: 'cozy',
    memorizeTimeLimit: () => null,
    hideWordListInSearch: true,
    isInfinite: false,
    maxLives: null,
    comboHealThreshold: 0,
  },
  memory_rush: {
    id: 'memory_rush',
    // Reduces memorize time as level increases (Min 4s)
    memorizeTimeLimit: (level) => Math.max(4, 9 - Math.floor(level / 3)),
    hideWordListInSearch: true,
    isInfinite: false,
    maxLives: 3, 
    comboHealThreshold: 3, // 3 hits in a row = +1 Life
  },
  zen: {
    id: 'zen',
    memorizeTimeLimit: () => null,
    hideWordListInSearch: false,
    isInfinite: true,
    maxLives: null,
    comboHealThreshold: 0,
  },
};

export interface Position {
  row: number;
  col: number;
}

export interface ActiveHint {
  word: string;
  startCoords: Position;
  endCoords: Position;
  step: 'first_letter' | 'direction';
}

export interface GridWord {
  word: string;        // Original display word (e.g. CABAÑA)
  normalized: string;  // Normalized word for matching (e.g. CABANA)
  start: Position;
  end: Position;
  cells: Position[];   // All cell positions occupied by the word
}

export interface GameStats {
  timeTaken: number;   // in seconds
  mistakes: number;    // number of invalid selection attempts
  accuracy: number;    // percentage of correct words found vs total select attempts
  score: number;       // total points based on speed and accuracy
  stars: number;       // 1, 2, or 3 stars
}

export interface LevelProgress {
  stars: number;
  completed: boolean;
  bestTime?: number;
}

export type ProgressMap = Record<number, LevelProgress>;

export type ProgressByLanguage = Record<string, ProgressMap>;

import type { CategoryId } from './category';

export interface GameContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  currentMode: GameMode;
  setCurrentMode: (mode: GameMode) => void;
  currentCategory: CategoryId;
  setCurrentCategory: (category: CategoryId) => void;
  gameModeConfig: GameModeConfig;
  currentLives: number | null;
  setCurrentLives: (lives: number | null) => void;
  defeatReason: DefeatReason | null;
  setDefeatReason: (reason: DefeatReason | null) => void;
  playerStats: PlayerStats;
  setPlayerStats: (stats: PlayerStats) => void;
  registerCorrectWord: () => { healed: boolean; comboCount: number };
  registerIncorrectWord: () => { gameOver: boolean; remainingLives: number | null };
  activeHint: ActiveHint | null;
  hintCooldown: boolean;
  hintCooldownSeconds: number;
  availableHints: number | null;
  hintToast: string | null;
  triggerHint: () => void;
  clearHint: () => void;
  awardHint: () => void;
  levelIndex: number;
  setLevelIndex: (index: number) => void;
  grid: string[][];
  setGrid: (grid: string[][]) => void;
  targetWords: string[];
  setTargetWords: (words: string[]) => void;
  foundWords: string[];
  setFoundWords: (words: string[]) => void;
  foundWordObjects: GridWord[];
  setFoundWordObjects: (words: GridWord[]) => void;
  allGridWords: GridWord[];
  setAllGridWords: (words: GridWord[]) => void;
  stats: GameStats | null;
  setStats: (stats: GameStats | null) => void;
  progressMap: ProgressMap;
  saveLevelProgress: (levelIndex: number, stars: number, timeSpent?: number) => void;
  startGame: (targetLevelIndex?: number, mode?: GameMode) => void;
  resetGame: () => void;
  completeGame: (stats: GameStats) => void;
  t: (key: string, paramsOrFallback?: string | Record<string, string | number>, fallback?: string) => string;
}
