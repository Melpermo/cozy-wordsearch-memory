import React from 'react';

interface LetterTileProps {
  char: string;
  row: number;
  col: number;
  isSelected: boolean;
  isFound: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const LetterTile: React.FC<LetterTileProps> = ({
  char,
  row,
  col,
  isSelected,
  isFound,
  onPointerDown,
}) => {
  // Determine tailwind style mapping based on state
  let stateClasses = 'bg-cozy-tile text-cozy-text shadow-tactile border-cozy-tile-shadow/20 hover:brightness-95 active:translate-y-0.5 active:shadow-none';
  
  if (isFound) {
    stateClasses = 'bg-cozy-mint text-white shadow-[0px_4px_0px_#62A89B] border-cozy-mint-dark/30 scale-[0.98]';
  } else if (isSelected) {
    stateClasses = 'bg-cozy-honey text-cozy-text shadow-[0px_4px_0px_#E0B060] border-cozy-honey-dark/30 scale-[0.98] translate-y-[2px]';
  }

  return (
    <div
      data-tile-row={row}
      data-tile-col={col}
      onPointerDown={onPointerDown}
      className={`
        w-full aspect-square flex items-center justify-center 
        text-lg sm:text-2xl font-black rounded-tile border-2 
        select-none cursor-pointer touch-none
        transition-all duration-150 ease-out
        ${stateClasses}
      `}
      style={{
        WebkitTouchCallout: 'none',
      }}
    >
      {char}
    </div>
  );
};
