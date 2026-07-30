import React from 'react';
import { Sparkles, Timer } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';

export const HintButton: React.FC = () => {
  const { gameState, activeHint, hintCooldown, hintCooldownSeconds, availableHints, triggerHint, t } = useGame();
  const { playButtonClick } = useCozyAudio();

  if (gameState !== 'SEARCHING') {
    return null;
  }

  const isRushMode = availableHints !== null;
  const isDisabled = isRushMode ? availableHints <= 0 : hintCooldown;

  const handleClick = () => {
    if (isDisabled) return;
    playButtonClick();
    triggerHint();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
        border-2 transition-all duration-200 select-none cursor-pointer
        ${isDisabled
          ? 'bg-cozy-tile/40 border-cozy-tile-shadow/10 text-cozy-muted opacity-60 cursor-not-allowed'
          : activeHint
          ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-cozy-glow ring-2 ring-amber-300/50 animate-pulse'
          : 'bg-cozy-tile/80 hover:bg-cozy-tile border-cozy-tile-shadow/20 text-cozy-text shadow-tactile active:translate-y-0.5 active:shadow-none'
        }
      `}
      title={isRushMode ? `${t('hint', 'Pista')}: ${availableHints}` : hintCooldown ? `${hintCooldownSeconds}s` : t('hint', 'Pista')}
    >
      {hintCooldown && !isRushMode ? (
        <>
          <Timer size={15} className="animate-spin text-cozy-muted" />
          <span>{hintCooldownSeconds}s</span>
        </>
      ) : (
        <>
          <Sparkles size={16} className={activeHint ? 'text-amber-600 fill-amber-500' : 'text-cozy-mint-dark'} />
          <span>{t('hint', 'Pista')}</span>
          {isRushMode && (
            <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-black rounded-full bg-cozy-mint/20 text-cozy-mint-dark">
              {availableHints}
            </span>
          )}
        </>
      )}
    </button>
  );
};
