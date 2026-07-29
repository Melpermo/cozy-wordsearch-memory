import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-cozy-card rounded-card shadow-cozy-card border border-cozy-tile/50 p-6 sm:p-8 transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-[1.01] hover:shadow-lg' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
