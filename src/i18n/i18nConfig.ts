import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import pt from './translations/pt.json';
import it from './translations/it.json';

import { CATEGORY_TRANSLATIONS } from '../data/translations';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

export const LANGUAGES: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
};

const rawTranslations: Record<LanguageCode, Record<string, string>> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
};

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = (
  Object.keys(rawTranslations) as LanguageCode[]
).reduce((acc, code) => {
  acc[code] = {
    ...rawTranslations[code],
    ...(CATEGORY_TRANSLATIONS[code] || {}),
  };
  return acc;
}, {} as Record<LanguageCode, Record<string, string>>);


export function translate(
  lang: LanguageCode,
  key: string,
  paramsOrFallback?: string | Record<string, string | number>,
  fallback?: string
): string {
  const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  let actualParams: Record<string, string | number> | undefined = undefined;
  let actualFallback = fallback;

  if (typeof paramsOrFallback === 'string') {
    actualFallback = paramsOrFallback;
  } else {
    actualParams = paramsOrFallback;
  }

  let text = dictionary[key] || TRANSLATIONS.en[key] || actualFallback || key;

  if (actualParams) {
    Object.entries(actualParams).forEach(([paramKey, paramValue]) => {
      text = text.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramValue));
    });
  }

  return text;
}
