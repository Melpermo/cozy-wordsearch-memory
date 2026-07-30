import React from 'react';
import { useGame } from '../../context/GameContext';
import { useCozyAudio } from '../../hooks/useCozyAudio';
import { getCategoryLevels } from '../../data/wordPacks';
import { X, Star, Lock, Compass, Play } from 'lucide-react';

interface LevelSelectModalProps {
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ onClose }) => {
  const { language, currentCategory, progressMap, startGame, t } = useGame();
  const { playButtonClick } = useCozyAudio();

  const categoryLevels = getCategoryLevels(currentCategory, language);

  const isLevelUnlocked = (idx: number) => {
    if (idx === 0) return true;
    return Boolean(progressMap[idx - 1]?.completed);
  };

  const handleSelectLevel = (idx: number) => {
    if (!isLevelUnlocked(idx)) return;
    playButtonClick();
    onClose();
    startGame(idx);
  };

  const categoryName = t(`category_${currentCategory}`, t(`category.${currentCategory}`, currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cozy-bg/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-card p-6 shadow-cozy-card flex flex-col gap-5 max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cozy-tile-shadow/15 pb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-cozy-text flex items-center gap-2">
              <span>{t('levelSelect', 'Seleccionar Nivel')}</span>
            </h2>
            <span className="text-xs font-semibold text-cozy-mint-dark">
              {categoryName}
            </span>
          </div>
          <button
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="p-1.5 rounded-full bg-cozy-tile text-cozy-text hover:bg-cozy-tile/80 active:scale-95 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Level Grid / List */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {categoryLevels.map((words, idx) => {
            const unlocked = isLevelUnlocked(idx);
            const progress = progressMap[idx];
            const stars = progress?.stars || 0;
            const isCompleted = progress?.completed || false;

            return (
              <div
                key={idx}
                onClick={() => handleSelectLevel(idx)}
                className={`
                  p-4 rounded-card border-2 transition-all duration-200 flex items-center justify-between select-none
                  ${unlocked
                    ? 'cursor-pointer bg-cozy-card border-cozy-tile-shadow/20 hover:border-cozy-mint hover:shadow-md active:scale-[0.99]'
                    : 'cursor-not-allowed bg-cozy-tile/30 border-transparent opacity-60'
                  }
                `}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-widest text-cozy-muted uppercase">
                      {t('level', { num: idx + 1 })}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] bg-cozy-mint/20 text-cozy-mint-dark font-extrabold px-2 py-0.5 rounded-full">
                        Completado
                      </span>
                    )}
                  </div>

                  <span className="text-base font-bold text-cozy-text">
                    {categoryName} #{idx + 1}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-cozy-muted font-medium mt-0.5">
                    <span className="flex items-center gap-1">
                      <Compass size={13} />
                      {words.length} {t('statsWords', 'palabras')}
                    </span>
                  </div>
                </div>

                {/* Status / Stars */}
                <div className="flex items-center gap-3">
                  {unlocked ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            size={16}
                            className={`
                              ${starIdx <= stars
                                ? 'text-cozy-honey fill-cozy-honey'
                                : 'text-cozy-tile fill-cozy-tile/40'
                              }
                            `}
                          />
                        ))}
                      </div>
                      <div className="p-2 rounded-full bg-cozy-mint/15 text-cozy-mint-dark">
                        <Play size={16} className="fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-full bg-cozy-tile/60 text-cozy-muted">
                      <Lock size={18} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
