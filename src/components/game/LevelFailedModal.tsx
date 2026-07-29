import React from 'react';
import { Hourglass, RotateCcw } from 'lucide-react';

interface LevelFailedModalProps {
  onRetry: () => void;
}

export const LevelFailedModal: React.FC<LevelFailedModalProps> = ({ onRetry }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cozy-bg/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-card p-8 shadow-cozy-card flex flex-col items-center text-center space-y-6">
        
        <div className="w-20 h-20 rounded-full bg-cozy-honey/20 flex items-center justify-center text-cozy-honey-dark">
          <Hourglass className="w-10 h-10"/>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-cozy-text">¡Se acabó el tiempo!</h2>
          <p className="text-sm text-cozy-muted">
            ¡Estuviste muy cerca! Entrenar la memoria es cuestión de práctica.
          </p>
        </div>

        <button
          onClick={onRetry}
          className="w-full py-4 bg-cozy-honey hover:bg-cozy-honey-dark text-white font-bold rounded-tile shadow-tactile active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5"/>
          <span>Intentarlo de nuevo</span>
        </button>

      </div>
    </div>
  );
};
