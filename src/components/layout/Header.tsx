import React from 'react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { LanguageSelector } from '../common/LanguageSelector';
import { HintButton } from '../HUD/HintButton';
import { Home, Sparkles, Volume2, VolumeX, Heart, Flame } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    gameState, 
    resetGame, 
    language, 
    t, 
    levelIndex, 
    gameModeConfig, 
    currentLives, 
    playerStats,
    hintToast 
  } = useGame();
  const { isMuted, toggleMute, playButtonClick } = useCozyAudio();

  const isMainMenu = gameState === 'MAIN_MENU';
  const showHUD = !isMainMenu && (gameState === 'MEMORIZING' || gameState === 'SEARCHING');

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

      {/* Active Level, Lives & Combo HUD Indicator (Only shown during gameplay) */}
      {showHUD && (
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <div className="flex items-center gap-2 bg-cozy-tile/60 border border-cozy-tile-shadow/15 px-3 py-1.5 rounded-full text-xs font-bold text-cozy-text/80 shadow-sm animate-fade-in select-none">
            <span className="uppercase tracking-wider font-mono">{language}</span>
            <span className="text-cozy-muted/40">•</span>
            <span>{t('level', { num: levelIndex + 1 })}</span>
          </div>

          {/* Lives (Hearts) Indicator for Memory Rush */}
          {gameModeConfig.maxLives !== null && currentLives !== null && (
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full shadow-sm animate-pop-in select-none">
              {Array.from({ length: gameModeConfig.maxLives }).map((_, idx) => {
                const isAlive = idx < currentLives;
                return (
                  <Heart
                    key={idx}
                    size={16}
                    className={`transition-all duration-300 ${
                      isAlive
                        ? 'fill-rose-500 text-rose-500 scale-100'
                        : 'fill-transparent text-rose-300/60 scale-90'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Combo / Streak Indicator */}
          {playerStats.streak >= 2 && (
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-600 px-2.5 py-1 rounded-full text-xs font-black shadow-sm animate-bounce select-none">
              <Flame size={15} className="fill-amber-500 text-amber-500" />
              <span>{playerStats.streak}x Combo</span>
            </div>
          )}

          {/* Hint Toast Banner */}
          {hintToast && (
            <div className="flex items-center gap-1 bg-cozy-mint/25 border border-cozy-mint text-cozy-mint-dark px-3 py-1 rounded-full text-xs font-black shadow-md animate-pop-in select-none">
              <Sparkles size={15} className="fill-current" />
              <span>{hintToast}</span>
            </div>
          )}

          {/* Hint Button */}
          <HintButton />
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
