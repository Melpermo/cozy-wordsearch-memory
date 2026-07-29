import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Star, Trophy, Award, Clock, ThumbsUp } from 'lucide-react';

interface CompletionModalProps {
  onRestart: () => void;
  onNextLevel: () => void;
  hasNextLevel: boolean;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  onRestart,
  onNextLevel,
  hasNextLevel,
}) => {
  const { stats, t } = useGame();
  const [animStars, setAnimStars] = useState<number>(0);

  // Animate stars popping in one by one
  useEffect(() => {
    if (stats) {
      setAnimStars(0);
      const timers = Array.from({ length: stats.stars }).map((_, idx) => 
        setTimeout(() => {
          setAnimStars(prev => prev + 1);
        }, 300 + idx * 250)
      );

      return () => {
        timers.forEach(t => clearTimeout(t));
      };
    }
  }, [stats]);

  if (!stats) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cozy-bg/85 backdrop-blur-md">
      <div className="w-full max-w-md animate-pop-in">
        <Card className="border-2 border-cozy-honey/30 shadow-2xl flex flex-col items-center text-center p-6 sm:p-8">
          
          {/* Trophy Header */}
          <div className="relative mb-4">
            <div className="p-4 bg-cozy-honey/15 text-cozy-honey-dark rounded-full animate-cozy-float">
              <Trophy size={40} className="fill-current" />
            </div>
            <Award className="absolute -bottom-1 -right-1 text-cozy-mint fill-current animate-bounce" size={24} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-cozy-text mb-1">
            {t('congratulations')}
          </h2>
          <p className="text-xs sm:text-sm text-cozy-muted mb-6">
            {t('victoryMessage')}
          </p>

          {/* Tactile Stars Board */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((starIdx) => {
              const active = starIdx <= animStars;
              const earned = starIdx <= stats.stars;
              return (
                <div
                  key={starIdx}
                  className={`
                    transition-all duration-300 transform
                    ${active ? 'scale-110 rotate-0' : 'scale-75 -rotate-12 opacity-30'}
                  `}
                >
                  <Star
                    size={36}
                    className={`
                      ${earned ? 'text-cozy-honey fill-cozy-honey' : 'text-cozy-tile fill-cozy-tile'}
                      filter drop-shadow-md
                    `}
                  />
                </div>
              );
            })}
          </div>

          {/* Cognitive & Stats Table */}
          <div className="w-full bg-cozy-tile/40 border border-cozy-tile-shadow/15 rounded-card p-4 mb-6 text-left">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-cozy-text font-medium">
                <Clock size={16} className="text-cozy-muted" />
                <span>{t('timeTaken', { time: stats.timeTaken })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-cozy-text font-medium justify-end">
                <ThumbsUp size={16} className="text-cozy-muted" />
                <span>{t('accuracy', { acc: stats.accuracy })}</span>
              </div>
            </div>
            
            <div className="h-[1px] bg-cozy-tile-shadow/20 my-3" />
            
            <div className="flex items-center justify-between text-sm mb-2 font-bold text-cozy-text">
              <span>{t('mistakes', { count: stats.mistakes })}</span>
              <span className="text-cozy-mint-dark">{t('score', { score: stats.score })}</span>
            </div>

            {/* Cognitive Feedback */}
            <div className="mt-3 p-3 bg-white/70 rounded-tile border border-cozy-tile-shadow/10 text-xs leading-relaxed text-cozy-muted italic">
              <span className="font-bold block text-cozy-text not-italic mb-0.5">{t('memoryRecall')} & {t('attentionDetail')}</span>
              {t('cognitiveSummary')}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            {hasNextLevel && (
              <Button onClick={onNextLevel} variant="primary" className="flex-1">
                {t('nextLevel')}
              </Button>
            )}
            <Button onClick={onRestart} variant="secondary" className="flex-1">
              {t('playAgain')}
            </Button>
          </div>
          
          <button
            onClick={() => {
              window.location.reload(); // Quick reset back to title menu
            }}
            className="mt-4 text-xs font-bold text-cozy-muted hover:text-cozy-text transition-colors underline"
          >
            {t('backToMenu')}
          </button>

        </Card>
      </div>
    </div>
  );
};
