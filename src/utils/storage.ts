import type { ProgressByLanguage, ProgressMap, LevelProgress } from '../types/game';

const STORAGE_KEY = 'cozy_wordsearch_progress_v2';
const OLD_STORAGE_KEY = 'cozy_wordsearch_progress';

export const getRawProgress = (): ProgressByLanguage => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    // Fallback/migration from v1 global progress if present
    const oldSaved = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldSaved) {
      const parsedOld = JSON.parse(oldSaved);
      // Migrate old data into 'en' locale bucket
      const migrated: ProgressByLanguage = { en: parsedOld };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    // Ignore storage parse errors
  }
  return {};
};

export const getProgressForLanguage = (lang: string): ProgressMap => {
  const currentData = getRawProgress();
  return currentData[lang] || {};
};

export const getLevelProgress = (lang: string, levelIndex: number): LevelProgress => {
  const allProgress = getRawProgress();
  const langProgress = allProgress[lang];

  if (!langProgress || !langProgress[levelIndex]) {
    return { completed: false, stars: 0 };
  }

  return langProgress[levelIndex];
};

export const saveProgress = (
  lang: string,
  levelIndex: number,
  stars: number,
  timeSpent: number = 0
): ProgressByLanguage => {
  const currentData = getRawProgress();
  const langProgress = currentData[lang] || {};
  
  const existingLevel = langProgress[levelIndex];
  const newStars = existingLevel ? Math.max(existingLevel.stars, stars) : stars;

  let newTime: number | undefined = undefined;
  if (timeSpent > 0) {
    newTime = existingLevel?.bestTime ? Math.min(existingLevel.bestTime, timeSpent) : timeSpent;
  } else {
    newTime = existingLevel?.bestTime;
  }

  currentData[lang] = {
    ...langProgress,
    [levelIndex]: {
      stars: newStars,
      completed: true,
      ...(newTime !== undefined ? { bestTime: newTime } : {}),
    },
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    } catch {
      // Ignore storage write errors
    }
  }

  return currentData;
};
