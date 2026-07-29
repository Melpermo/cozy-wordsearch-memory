import React from 'react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { LanguageSelector } from '../common/LanguageSelector';
import { Home, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const Header: React.FC = () => {
  const { gameState, resetGame, language, t, levelIndex } = useGame();
  const { isMuted, toggleMute, playButtonClick } = useCozyAudio();

  const isMainMenu = gameState === 'MAIN_MENU';

  const handleToggleMute = () => {
    toggleMute();
    playButtonClick();
  };

  const handleReset = () => {
    playButtonClick();
    resetGame();
  };

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-cozy-tile-shadow/20 bg-cozy-bg">
      {/* Brand / Home Button */}
      <div className="flex items-center gap-2">
        {!isMainMenu ? (
          <button
            onClick={handleReset}
            className="flex items-center justify-center p-2 rounded-full bg-cozy-tile text-cozy-text border-2 border-cozy-tile-shadow/20 shadow-tactile hover:bg-cozy-tile/80 active:translate-y-0.5 active:shadow-none transition-all duration-150 cursor-pointer"
            title={t('backToMenu')}
          >
            <Home size={18} />
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-cozy-mint">
            <Sparkles size={20} className="fill-current animate-cozy-float" />
          </div>
        )}
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-cozy-text select-none">
          Cozy WordSearch
        </h1>
      </div>

      {/* Active Level & Language HUD Indicator (Only shown during gameplay) */}
      {!isMainMenu && (
        <div className="flex items-center gap-2 bg-cozy-tile/60 border border-cozy-tile-shadow/15 px-3 py-1.5 rounded-full text-xs font-bold text-cozy-text/80 shadow-sm animate-fade-in select-none">
          <span className="uppercase tracking-wider font-mono">{language}</span>
          <span className="text-cozy-muted/40">•</span>
          <span>{t('level', { num: levelIndex + 1 })}</span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Sound Toggle Button (Always visible) */}
        <button
          onClick={handleToggleMute}
          className="flex items-center justify-center p-2 rounded-full bg-cozy-tile/65 text-cozy-text border border-cozy-tile-shadow/20 shadow-sm hover:bg-cozy-tile/90 active:translate-y-0.5 active:shadow-none transition-all duration-150 cursor-pointer"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX size={18} className="text-cozy-muted" />
          ) : (
            <Volume2 size={18} className="text-cozy-mint-dark" />
          )}
        </button>

        {/* Language Selector (ONLY visible in Main Menu) */}
        {isMainMenu && <LanguageSelector />}
      </div>
    </header>
  );
};
