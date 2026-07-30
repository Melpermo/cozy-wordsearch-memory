import React, { useEffect } from 'react';
import { X, Sparkles, Cpu, Globe, Music, Zap, Heart } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useGame();
  const { playButtonClick } = useCozyAudio();

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        playButtonClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, playButtonClick]);

  if (!isOpen) return null;

  const handleClose = () => {
    playButtonClick();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cozy-bg/85 backdrop-blur-sm animate-fade-in select-none"
    >
      <div className="w-full max-w-lg bg-white rounded-card p-6 shadow-cozy-card flex flex-col gap-5 max-h-[90vh] overflow-y-auto border border-cozy-tile-shadow/15 relative animate-pop-in">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cozy-tile-shadow/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-card bg-cozy-mint/15 text-cozy-mint-dark border border-cozy-mint/30 shadow-xs">
              <Sparkles size={24} className="fill-current animate-cozy-float" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-cozy-text leading-tight">
                {t('credits.title', 'Acerca del Proyecto')}
              </h2>
              <span className="text-xs font-semibold text-cozy-muted">
                {t('credits.subtitle', 'Un laboratorio de desarrollo por Melpermo')}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-cozy-tile text-cozy-text hover:bg-cozy-tile/80 active:scale-95 transition-all cursor-pointer"
            title={t('close', 'Cerrar')}
            aria-label={t('close', 'Cerrar')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-cozy-text/85 leading-relaxed bg-cozy-bg/50 p-4 rounded-tile border border-cozy-tile-shadow/10">
          {t(
            'credits.description',
            'Este juego nació como un proyecto experimental enfocado en explorar las capacidades de la IA conversacional (Google Gemini) y la aceleración de desarrollo mediante Antigravity IDE.'
          )}
        </p>

        {/* Tech Highlights */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black text-cozy-muted uppercase tracking-widest px-1 flex items-center gap-1.5">
            <Cpu size={14} className="text-cozy-mint-dark" />
            <span>{t('credits.techTitle', 'Aspectos Técnicos Destacados')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-tile bg-cozy-card border border-cozy-tile-shadow/15 flex items-start gap-3 shadow-xs">
              <Cpu size={20} className="text-indigo-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cozy-text">FSM Architecture</span>
                <span className="text-[11px] text-cozy-muted leading-snug">
                  {t('credits.arch', 'Máquina de Estados Finitos en React + TypeScript.')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-tile bg-cozy-card border border-cozy-tile-shadow/15 flex items-start gap-3 shadow-xs">
              <Music size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cozy-text">Procedural Audio</span>
                <span className="text-[11px] text-cozy-muted leading-snug">
                  {t('credits.audio', 'Sintetizador Web Audio API sin assets externos.')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-tile bg-cozy-card border border-cozy-tile-shadow/15 flex items-start gap-3 shadow-xs">
              <Globe size={20} className="text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cozy-text">Native i18n</span>
                <span className="text-[11px] text-cozy-muted leading-snug">
                  {t('credits.i18n', 'Diccionarios y sopas de letras en 6 idiomas.')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-tile bg-cozy-card border border-cozy-tile-shadow/15 flex items-start gap-3 shadow-xs">
              <Zap size={20} className="text-rose-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cozy-text">Zero Dependencies</span>
                <span className="text-[11px] text-cozy-muted leading-snug">
                  {t('credits.zeroDeps', 'Alto rendimiento y peso ultra ligero.')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-cozy-tile-shadow/15 text-center flex items-center justify-center gap-1.5 text-xs font-bold text-cozy-muted">
          <span>{t('credits.footer', 'Diseñado y desarrollado con pasión por Melpermo • 2026')}</span>
          <Heart size={14} className="fill-rose-400 text-rose-400 inline shrink-0" />
        </div>

      </div>
    </div>
  );
};
