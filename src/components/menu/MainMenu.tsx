import React from 'react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { LOCALIZED_LEVELS } from '../../data/localizedLevels';
import { Button } from '../common/Button';
import { Brain, Play, Map } from 'lucide-react';

interface MainMenuProps {
  onOpenLevelSelect: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onOpenLevelSelect }) => {
  const { language, levelIndex, progressMap, startGame, t } = useGame();
  const { playButtonClick } = useCozyAudio();

  const levels = LOCALIZED_LEVELS[language] || LOCALIZED_LEVELS.en;

  // Find first uncompleted level or current levelIndex
  const getContinueLevelIndex = () => {
    const uncompletedIdx = levels.findIndex((_, idx) => !progressMap[idx]?.completed);
    return uncompletedIdx !== -1 ? uncompletedIdx : levelIndex;
  };

  const handlePlayClick = () => {
    playButtonClick();
    const targetIdx = getContinueLevelIndex();
    startGame(targetIdx);
  };

  const handleLevelSelectClick = () => {
    playButtonClick();
    onOpenLevelSelect();
  };

  return (
    <div className="w-full py-6 flex flex-col items-center gap-8 animate-pop-in select-none max-w-md mx-auto">
      {/* Hero Logo / Icon */}
      <div className="text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-cozy-mint/15 text-cozy-mint rounded-card flex items-center justify-center mb-5 border-2 border-cozy-mint/25 shadow-cozy-card">
          <Brain size={52} className="animate-cozy-float" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-cozy-text mb-2">
          {t('title')}
        </h2>
        <p className="text-sm text-cozy-muted px-6 leading-relaxed max-w-sm">
          {t('subtitle')}
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col w-full gap-3.5 px-2">
        <Button
          onClick={handlePlayClick}
          variant="primary"
          size="lg"
          className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2.5 shadow-tactile active:shadow-tactile-pressed"
        >
          <Play size={22} className="fill-current" />
          <span>{t('play')}</span>
        </Button>

        <button
          onClick={handleLevelSelectClick}
          className="w-full py-3.5 bg-cozy-card hover:bg-cozy-tile/80 text-cozy-text font-bold rounded-tile border-2 border-cozy-tile-shadow/20 shadow-sm transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
        >
          <Map size={20} className="text-cozy-mint-dark" />
          <span>Seleccionar Nivel</span>
        </button>
      </div>
    </div>
  );
};
