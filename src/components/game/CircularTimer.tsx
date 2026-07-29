import React from 'react';

interface CircularTimerProps {
  duration: number;
  timeLeft: number;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({ duration, timeLeft }) => {
  const radius = 36;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24 select-none">
      <svg className="w-full h-full transform -rotate-90">
        {/* Track circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-cozy-tile fill-transparent"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-cozy-mint fill-transparent transition-all duration-1000 ease-linear"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Centered Time text */}
      <span className="absolute text-2xl font-black text-cozy-text font-mono">
        {timeLeft}
      </span>
    </div>
  );
};
