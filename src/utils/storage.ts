import type { GameMode, ProgressMap, LevelProgress } from '../types/game';
import type { CategoryId } from '../types/category';

// Key format: cozy_progress_[LANGUAGE]_[MODE]_[CATEGORY]
export const getStorageKey = (lang: string, mode: GameMode = 'cozy', category: CategoryId = 'general'): string => {
  return `cozy_progress_${lang}_${mode}_${category}`;
};

export const getProgressForCategory = (lang: string, mode: GameMode = 'cozy', category: CategoryId = 'general'): ProgressMap => {
  if (typeof window === 'undefined') return {};
  try {
    const key = getStorageKey(lang, mode, category);
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore storage parse errors
  }
  return {};
};

export const getProgressForMode = getProgressForCategory;

export const getLevelProgress = (lang: string, mode: GameMode, category: CategoryId, levelIndex: number): LevelProgress => {
  const progress = getProgressForCategory(lang, mode, category);
  return progress[levelIndex] || { completed: false, stars: 0 };
};

export const saveProgress = (
  lang: string,
  mode: GameMode,
  category: CategoryId,
  levelIndex: number,
  stars: number,
  timeSpent: number = 0
): ProgressMap => {
  const currentProgress = getProgressForCategory(lang, mode, category);
  const existingLevel = currentProgress[levelIndex];
  const newStars = existingLevel ? Math.max(existingLevel.stars, stars) : stars;

  let newTime: number | undefined = undefined;
  if (timeSpent > 0) {
    newTime = existingLevel?.bestTime ? Math.min(existingLevel.bestTime, timeSpent) : timeSpent;
  } else {
    newTime = existingLevel?.bestTime;
  }

  const updatedProgress: ProgressMap = {
    ...currentProgress,
    [levelIndex]: {
      stars: newStars,
      completed: true,
      ...(newTime !== undefined ? { bestTime: newTime } : {}),
    },
  };

  if (typeof window !== 'undefined') {
    try {
      const key = getStorageKey(lang, mode, category);
      localStorage.setItem(key, JSON.stringify(updatedProgress));
    } catch {
      // Ignore storage write errors
    }
  }

  return updatedProgress;
};
