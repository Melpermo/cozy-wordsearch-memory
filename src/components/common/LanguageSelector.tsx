import React from 'react';
import { useGame } from '../../context/GameContext';
import { LANGUAGES, type LanguageCode } from '../../i18n/i18nConfig';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useGame();

  return (
    <div className="flex items-center gap-2 bg-cozy-tile/50 border border-cozy-tile-shadow/30 px-3 py-1.5 rounded-full">
      <Globe size={16} className="text-cozy-muted" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="bg-transparent text-sm font-bold text-cozy-text focus:outline-none cursor-pointer"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code} className="bg-white text-cozy-text font-medium">
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
