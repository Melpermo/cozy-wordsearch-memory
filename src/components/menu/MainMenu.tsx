import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { LOCALIZED_LEVELS } from '../../data/localizedLevels';
import { Button } from '../common/Button';
import { CategorySelect } from './CategorySelect';
import { InfoModal } from '../Modals/InfoModal';
import { Brain, Play, Map, Coffee, Zap, Sparkles, Info } from 'lucide-react';
import type { GameMode } from '../../types/game';

interface MainMenuProps {
  onOpenLevelSelect: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onOpenLevelSelect }) => {
  const { language, levelIndex, currentMode, setCurrentMode, progressMap, startGame, t } = useGame();
  const { playButtonClick } = useCozyAudio();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoDefaultTab, setInfoDefaultTab] = useState<'guide' | 'credits'>('guide');

  const levels = LOCALIZED_LEVELS[language] || LOCALIZED_LEVELS.en;

  // Find first uncompleted level or current levelIndex
  const getContinueLevelIndex = () => {
    const uncompletedIdx = levels.findIndex((_, idx) => !progressMap[idx]?.completed);
    return uncompletedIdx !== -1 ? uncompletedIdx : levelIndex;
  };

  const handlePlayClick = () => {
    playButtonClick();
    const targetIdx = getContinueLevelIndex();
    startGame(targetIdx, currentMode);
  };

  const handleLevelSelectClick = () => {
    playButtonClick();
    onOpenLevelSelect();
  };

  const handleOpenInfo = (tab: 'guide' | 'credits' = 'guide') => {
    playButtonClick();
    setInfoDefaultTab(tab);
    setIsInfoOpen(true);
  };

  const modes: { id: GameMode; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'cozy',
      label: 'Cozy',
      desc: 'Relaxed memorization & search',
      icon: <Coffee size={18} />,
    },
    {
      id: 'memory_rush',
      label: 'Memory Rush',
      desc: '7s memorization + hidden word list',
      icon: <Zap size={18} />,
    },
    {
      id: 'zen',
      label: 'Zen',
      desc: 'No memorization + infinite spawning',
      icon: <Sparkles size={18} />,
    },
  ];

  return (
    <div className="w-full py-6 flex flex-col items-center gap-6 animate-pop-in select-none max-w-md mx-auto">
      {/* Hero Logo / Icon */}
      <div className="text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-cozy-mint/15 text-cozy-mint rounded-card flex items-center justify-center mb-4 border-2 border-cozy-mint/25 shadow-cozy-card">
          <Brain size={52} className="animate-cozy-float" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-cozy-text mb-2">
          {t('title')}
        </h2>
        <p className="text-sm text-cozy-muted px-6 leading-relaxed max-w-sm">
          {t('subtitle')}
        </p>
      </div>

      {/* Mode Selector */}
      <div className="w-full flex flex-col gap-2 px-2">
        <span className="text-xs font-black text-cozy-muted uppercase tracking-widest px-1">
          Modo de Juego
        </span>
        <div className="grid grid-cols-3 gap-2">
          {modes.map((m) => {
            const isActive = currentMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  playButtonClick();
                  setCurrentMode(m.id);
                }}
                className={`
                  p-3 rounded-tile flex flex-col items-center text-center gap-1.5 border transition-all cursor-pointer
                  ${isActive
                    ? 'bg-cozy-mint/15 border-cozy-mint text-cozy-mint-dark font-black shadow-sm scale-102'
                    : 'bg-cozy-card hover:bg-cozy-tile/60 border-cozy-tile-shadow/15 text-cozy-text/75 font-semibold'
                  }
                `}
              >
                <div className={isActive ? 'text-cozy-mint-dark' : 'text-cozy-muted'}>
                  {m.icon}
                </div>
                <span className="text-xs font-bold leading-tight">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selector */}
      <CategorySelect />

      {/* Main Action Buttons */}
      <div className="flex flex-col w-full gap-3 px-2">
        <Button
          onClick={handlePlayClick}
          variant="primary"
          size="lg"
          className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2.5 shadow-tactile active:shadow-tactile-pressed"
        >
          <Play size={22} className="fill-current" />
          <span>{t('play')}</span>
        </Button>

        <div className="flex items-center gap-2.5 w-full">
          <button
            onClick={handleLevelSelectClick}
            className="flex-1 py-3.5 bg-cozy-card hover:bg-cozy-tile/80 text-cozy-text font-bold rounded-tile border-2 border-cozy-tile-shadow/20 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Map size={20} className="text-cozy-mint-dark" />
            <span>{t('levelSelect', 'Seleccionar Nivel')}</span>
          </button>

          <button
            onClick={() => handleOpenInfo('guide')}
            className="p-3.5 bg-cozy-card hover:bg-cozy-tile/80 text-cozy-text font-bold rounded-tile border-2 border-cozy-tile-shadow/20 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
            title={t('guide.tabGuide', 'Cómo Jugar')}
            aria-label={t('guide.tabGuide', 'Cómo Jugar')}
          >
            <Info size={20} className="text-cozy-mint-dark" />
            <span className="hidden sm:inline text-sm font-bold">{t('guide.tabGuide', 'Cómo Jugar')}</span>
          </button>
        </div>
      </div>

      {/* Info & Game Guide Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        defaultTab={infoDefaultTab}
      />
    </div>
  );
};
