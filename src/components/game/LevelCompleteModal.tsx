import React from 'react';
import { Star, ArrowRight, RotateCcw, Clock } from 'lucide-react';

interface LevelCompleteModalProps {
  timeSpent: number;
  maxTime?: number; // Default 60s
  onNextLevel: () => void;
  onRestart: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  timeSpent,
  maxTime = 60,
  onNextLevel,
  onRestart,
}) => {
  // Calculate stars (3 stars: fast, 2 stars: medium, 1 star: completed)
  const calculateStars = () => {
    const ratio = timeSpent / maxTime;
    if (ratio <= 0.4) return 3;
    if (ratio <= 0.75) return 2;
    return 1;
  };

  const stars = calculateStars();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cozy-bg/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-card p-8 shadow-cozy-card flex flex-col items-center text-center space-y-6">
        
        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {[1, 2, 3].map((index) => (
            <Star
              key={index}
              className={`w-10 h-10 transition-all duration-500 ${
                index <= stars
                  ? 'text-cozy-honey fill-cozy-honey scale-110'
                  : 'text-cozy-tile fill-cozy-tile/30'
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-cozy-text">¡Excelente Memoria!</h2>
          <p className="text-sm text-cozy-muted">
            Has completado el nivel con éxito.
          </p>
        </div>

        {/* Stats Card */}
        <div className="w-full bg-cozy-tile/40 rounded-tile p-4 flex items-center justify-around text-cozy-text">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cozy-mint-dark"/>
            <div className="text-left">
              <span className="block text-xs text-cozy-muted uppercase font-bold">Tiempo</span>
              <span className="text-lg font-bold">{timeSpent}s</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-cozy-muted/20" />
          <div className="text-left">
            <span className="block text-xs text-cozy-muted uppercase font-bold">Valoración</span>
            <span className="text-lg font-bold text-cozy-honey-dark">{stars} / 3 ★</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3 pt-2">
          <button
            onClick={onNextLevel}
            className="w-full py-4 bg-cozy-mint hover:bg-cozy-mint-dark text-white font-bold rounded-tile shadow-tactile active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Siguiente Nivel</span>
            <ArrowRight className="w-5 h-5"/>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 bg-cozy-tile hover:bg-cozy-tile/80 text-cozy-text font-semibold rounded-tile active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4"/>
            <span>Repetir Nivel</span>
          </button>
        </div>

      </div>
    </div>
  );
};
