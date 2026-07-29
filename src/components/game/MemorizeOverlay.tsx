import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface MemorizeOverlayProps {
  words: string[];
  durationSeconds?: number; // Default: 10
  onTimeUp: () => void;
}

export const MemorizeOverlay: React.FC<MemorizeOverlayProps> = ({ 
  words, 
  durationSeconds = 10, 
  onTimeUp 
}) => {
  const { t } = useGame();
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  // Automatic Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // SVG Progress calculation
  // Circle radius r = 45. Circumference = 2 * PI * r = 282.74 (approx 283)
  const strokeDashoffset = 283 - (283 * timeLeft) / durationSeconds;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cozy-bg/85 backdrop-blur-md p-4 animate-pop-in">
      <div className="w-full max-w-md bg-white rounded-card p-8 shadow-cozy-card flex flex-col items-center text-center space-y-6">
        
        {/* Animated Circular Timer */}
        <div className="relative w-24 h-24 flex items-center justify-center select-none">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-cozy-tile"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-cozy-mint transition-all duration-1000 ease-linear"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-2xl font-black text-cozy-text font-mono">
            {timeLeft}
          </span>
        </div>

        {/* Title & Instructions */}
        <div className="space-y-1 select-none">
          <h2 className="text-2xl font-black text-cozy-text">
            {t('memorize.title', 'Memorize the Words!')}
          </h2>
          <p className="text-sm text-cozy-muted">
            {t('wordsDescription', 'Memorize the hidden words before the timer runs out.')}
          </p>
        </div>

        {/* Target Words */}
        <div className="flex flex-wrap justify-center gap-2 py-2 select-none">
          {words.map((word, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-cozy-tile text-cozy-text font-black rounded-tile shadow-tactile text-sm tracking-wider uppercase"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Skip / Start Button */}
        <button
          onClick={onTimeUp}
          className="w-full py-4 bg-cozy-mint hover:bg-cozy-mint-dark text-white font-bold rounded-tile shadow-tactile active:translate-y-[4px] active:shadow-tactile-pressed transition-all flex items-center justify-center gap-2 cursor-pointer outline-none focus:ring-4 focus:ring-cozy-mint/20"
        >
          <span>{t('play', 'Start Level')}</span>
          <ArrowRight className="w-5 h-5"/>
        </button>

      </div>
    </div>
  );
};
