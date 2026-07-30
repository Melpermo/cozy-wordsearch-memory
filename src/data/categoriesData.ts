import type { LanguageCode } from '../i18n/i18nConfig';
import type { CategoryId } from '../types/category';
import { getCategoryLevels } from './wordPacks';

const langs: LanguageCode[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];
const cats: CategoryId[] = ['general', 'nature', 'bakery', 'astral', 'animals', 'culture'];

export const CATEGORY_WORDS: Record<CategoryId, Record<LanguageCode, string[][]>> = cats.reduce(
  (catAcc, cat) => {
    catAcc[cat] = langs.reduce((langAcc, lang) => {
      langAcc[lang] = getCategoryLevels(cat, lang);
      return langAcc;
    }, {} as Record<LanguageCode, string[][]>);
    return catAcc;
  },
  {} as Record<CategoryId, Record<LanguageCode, string[][]>>
);
