import React, { useState, useEffect } from 'react';
import { X, BookOpen, Sparkles, Coffee, Zap, Trophy, ShieldCheck, Cpu, Music, Globe, Heart } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'guide' | 'credits';
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, defaultTab = 'guide' }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'credits'>(defaultTab);
  const { t } = useGame();
  const { playButtonClick } = useCozyAudio();

  // Reset tab to defaultTab whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

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

  const handleTabChange = (tab: 'guide' | 'credits') => {
    playButtonClick();
    setActiveTab(tab);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cozy-bg/85 backdrop-blur-sm animate-fade-in select-none"
    >
      <div className="w-full max-w-lg bg-white rounded-card p-6 shadow-cozy-card flex flex-col gap-5 max-h-[90vh] overflow-y-auto border border-cozy-tile-shadow/15 relative animate-pop-in">
        
        {/* Header & Close */}
        <div className="flex items-center justify-between border-b border-cozy-tile-shadow/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-card bg-cozy-mint/15 text-cozy-mint-dark border border-cozy-mint/30 shadow-xs">
              {activeTab === 'guide' ? (
                <BookOpen size={22} className="text-cozy-mint-dark" />
              ) : (
                <Sparkles size={22} className="fill-current animate-cozy-float text-cozy-mint-dark" />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-cozy-text leading-tight">
                {activeTab === 'guide'
                  ? t('guide.title', 'Guía del Juego & Reglas')
                  : t('credits.title', 'Acerca del Proyecto')}
              </h2>
              <span className="text-xs font-semibold text-cozy-muted">
                {activeTab === 'guide'
                  ? t('guide.subtitle', 'Aprende los modos de juego y el sistema de progresión')
                  : t('credits.subtitle', 'Un laboratorio de desarrollo por Melpermo')}
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

        {/* Tab Navigation */}
        <div className="flex items-center bg-cozy-bg p-1 rounded-tile border border-cozy-tile-shadow/15">
          <button
            onClick={() => handleTabChange('guide')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-cozy-mint-dark shadow-sm border border-cozy-tile-shadow/20'
                : 'text-cozy-muted hover:text-cozy-text'
            }`}
          >
            <BookOpen size={15} />
            <span>{t('guide.tabGuide', 'Cómo Jugar')}</span>
          </button>

          <button
            onClick={() => handleTabChange('credits')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'credits'
                ? 'bg-white text-cozy-mint-dark shadow-sm border border-cozy-tile-shadow/20'
                : 'text-cozy-muted hover:text-cozy-text'
            }`}
          >
            <Sparkles size={15} />
            <span>{t('guide.tabCredits', 'Créditos & Lab')}</span>
          </button>
        </div>

        {/* TAB 1: GUIDE */}
        {activeTab === 'guide' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Game Modes Breakdown */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-black text-cozy-muted uppercase tracking-widest px-1">
                {t('guide.modesTitle', 'Modos de Juego')}
              </h3>

              <div className="flex flex-col gap-2">
                {/* Cozy Mode */}
                <div className="p-3.5 rounded-tile bg-amber-50/50 border border-amber-200/60 flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                    <Coffee size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cozy-text">
                      {t('guide.cozyTitle', 'Modo Acogedor (Cozy)')}
                    </span>
                    <span className="text-[11px] text-cozy-muted leading-relaxed mt-0.5">
                      {t('guide.cozyDesc', 'Búsqueda relajada de palabras con pistas progresivas sin estrés. Ideal para desconectar.')}
                    </span>
                  </div>
                </div>

                {/* Memory Rush */}
                <div className="p-3.5 rounded-tile bg-rose-50/50 border border-rose-200/60 flex items-start gap-3">
                  <div className="p-2 rounded-full bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                    <Zap size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cozy-text">
                      {t('guide.rushTitle', 'Carrera de Memoria (Memory Rush)')}
                    </span>
                    <span className="text-[11px] text-cozy-muted leading-relaxed mt-0.5">
                      {t('guide.rushDesc', 'Memoriza las palabras en pocos segundos antes de buscar. Juega con temporizador, vidas, rachas de combo y pistas recompensadas.')}
                    </span>
                  </div>
                </div>

                {/* Zen Mode */}
                <div className="p-3.5 rounded-tile bg-emerald-50/50 border border-emerald-200/60 flex items-start gap-3">
                  <div className="p-2 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Sparkles size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cozy-text">
                      {t('guide.zenTitle', 'Modo Zen')}
                    </span>
                    <span className="text-[11px] text-cozy-muted leading-relaxed mt-0.5">
                      {t('guide.zenDesc', 'Generación infinita de tableros sin temporizador ni puntuación. Relajación pura y sin presión.')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progression & Isolation Rules */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-cozy-tile-shadow/15">
              {/* Level Progression */}
              <div className="p-3.5 rounded-tile bg-indigo-50/50 border border-indigo-200/60 flex items-start gap-3">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                  <Trophy size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cozy-text">
                    {t('guide.progressionTitle', 'Progresión de Niveles')}
                  </span>
                  <span className="text-[11px] text-cozy-muted leading-relaxed mt-0.5">
                    {t('guide.progressionDesc', 'Al completar cada nivel de una categoría desbloqueas el siguiente con trazados de palabras más desafiantes.')}
                  </span>
                </div>
              </div>

              {/* Independent Progress Isolation */}
              <div className="p-3.5 rounded-tile bg-cozy-mint/10 border border-cozy-mint/30 flex items-start gap-3">
                <div className="p-2 rounded-full bg-cozy-mint/20 text-cozy-mint-dark shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cozy-text">
                    {t('guide.isolationTitle', 'Progresión Independiente')}
                  </span>
                  <span className="text-[11px] text-cozy-muted leading-relaxed mt-0.5">
                    {t('guide.isolationDesc', 'Cada combinación de Idioma + Modo + Categoría guarda su propia progresión y estadísticas. ¡Cambiar de idioma o modo no borra tus logros en otros ejes!')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CREDITS & LAB */}
        {activeTab === 'credits' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Description */}
            <p className="text-sm text-cozy-text/85 leading-relaxed bg-cozy-bg/50 p-4 rounded-tile border border-cozy-tile-shadow/10">
              {t(
                'credits.description',
                'Este juego nació como un proyecto experimental enfocado en explorar las capacidades de la IA conversacional (Google Gemini) y la aceleración de desarrollo mediante Antigravity IDE.'
              )}
            </p>

            {/* Tech Highlights */}
            <div className="flex flex-col gap-2.5">
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
        )}

      </div>
    </div>
  );
};
