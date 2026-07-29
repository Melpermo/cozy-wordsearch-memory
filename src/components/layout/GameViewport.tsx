import React from 'react';

interface GameViewportProps {
  children: React.ReactNode;
}

export const GameViewport: React.FC<GameViewportProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cozy-bg text-cozy-text font-sans">
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-lg mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
