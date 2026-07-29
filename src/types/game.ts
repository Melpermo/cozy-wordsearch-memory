import type { LanguageCode } from '../i18n/i18nConfig';

export type GameState = 'MAIN_MENU' | 'IDLE' | 'MEMORIZING' | 'SEARCHING' | 'COMPLETED' | 'LEVEL_COMPLETE' | 'LEVEL_FAILED';

export interface Position {
  row: number;
  col: number;
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

export interface GameContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
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
  startGame: (targetLevelIndex?: number) => void;
  resetGame: () => void;
  completeGame: (stats: GameStats) => void;
  t: (key: string, paramsOrFallback?: string | Record<string, string | number>, fallback?: string) => string;
}
