import React from 'react';
import { HeartOff, Hourglass, RotateCcw, Home, Target, XCircle, Flame, Search } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface GameOverModalProps {
  onRetry: () => void;
  onBackToMenu?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onRetry, onBackToMenu }) => {
  const { defeatReason, foundWords, targetWords, playerStats, resetGame, t } = useGame();

  const handleBackToMenu = () => {
    if (onBackToMenu) {
      onBackToMenu();
    } else {
      resetGame();
    }
  };

  const isOutOfLives = defeatReason === 'out_of_lives';
  const correctHits = Math.max(0, playerStats.attempts - playerStats.mistakes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cozy-bg/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-card p-8 shadow-cozy-card flex flex-col items-center text-center space-y-6 select-none">
        
        {/* Icon Header based on Defeat Reason */}
        {isOutOfLives ? (
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-sm animate-pop-in">
            <HeartOff className="w-10 h-10" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-cozy-honey/20 flex items-center justify-center text-cozy-honey-dark shadow-sm animate-pop-in">
            <Hourglass className="w-10 h-10" />
          </div>
        )}

        {/* Dynamic Title & Description */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-cozy-text">
            {isOutOfLives
              ? t('outOfLivesTitle', '💔 ¡Sin vidas!')
              : t('timeoutTitle', '⏰ ¡Tiempo agotado!')}
          </h2>
          <p className="text-sm text-cozy-muted leading-relaxed">
            {isOutOfLives
              ? t('outOfLivesSubtitle', 'Has agotado tus intentos en este nivel. ¡Aprende el patrón y vuelve a intentarlo!')
              : t('timeoutSubtitle', 'El tiempo de búsqueda ha terminado. ¡Entrena esa vista para la próxima!')}
          </p>
        </div>

        {/* Extended Stats Cards Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 bg-cozy-card border border-cozy-tile-shadow/15 rounded-card p-3">
          <div className="flex flex-col items-center gap-1 p-2 rounded-tile bg-white border border-cozy-tile-shadow/10 shadow-xs">
            <Target size={16} className="text-cozy-mint-dark" />
            <span className="text-sm font-black text-cozy-text">{correctHits} / {playerStats.attempts}</span>
            <span className="text-[9px] font-bold text-cozy-muted uppercase tracking-wider">{t('statsHits', 'Aciertos')}</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-tile bg-white border border-cozy-tile-shadow/10 shadow-xs">
            <XCircle size={16} className="text-rose-500" />
            <span className="text-sm font-black text-cozy-text">{playerStats.mistakes}</span>
            <span className="text-[9px] font-bold text-cozy-muted uppercase tracking-wider">{t('statsErrors', 'Errores')}</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-tile bg-white border border-cozy-tile-shadow/10 shadow-xs">
            <Flame size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-black text-cozy-text">{playerStats.maxStreak}x</span>
            <span className="text-[9px] font-bold text-cozy-muted uppercase tracking-wider">{t('statsStreak', 'Racha Máx')}</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2 rounded-tile bg-white border border-cozy-tile-shadow/10 shadow-xs">
            <Search size={16} className="text-cozy-honey-dark" />
            <span className="text-sm font-black text-cozy-text">{foundWords.length} / {targetWords.length}</span>
            <span className="text-[9px] font-bold text-cozy-muted uppercase tracking-wider">{t('statsWords', 'Palabras')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="w-full py-4 bg-cozy-mint hover:bg-cozy-mint-dark text-white font-bold rounded-tile shadow-tactile active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5"/>
            <span>{t('retryLevel', 'Reintentar Nivel')}</span>
          </button>

          <button
            onClick={handleBackToMenu}
            className="w-full py-3 bg-cozy-tile hover:bg-cozy-tile/80 text-cozy-text font-bold rounded-tile border border-cozy-tile-shadow/20 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4 text-cozy-muted"/>
            <span>{t('mainMenu', 'Menú Principal')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
