import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { useWordSearch } from '../../hooks/useWordSearch';
import { LetterTile } from './LetterTile';
import type { GridWord } from '../../types/game';

interface BoardGridProps {
  onWordFound: (wordObj: GridWord) => void;
  onMistake: () => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({ onWordFound, onMistake }) => {
  const { grid, allGridWords, foundWords, foundWordObjects, gameState, activeHint } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    selectedCells,
    startSelection,
    updateSelection,
    endSelection,
  } = useWordSearch({
    grid,
    allGridWords,
    foundWords,
    onWordFound,
    onMistake,
  });

  // Track dragging via pointer moves over the grid container (handles touch devices properly)
  const handlePointerMove = (e: PointerEvent) => {
    if (!containerRef.current) return;
    
    // Find element under touch/mouse pointer
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (!element) return;

    // Check if the element or parent contains the custom row/col attributes
    const tile = element.closest('[data-tile-row]');
    if (tile) {
      const row = parseInt(tile.getAttribute('data-tile-row') || '', 10);
      const col = parseInt(tile.getAttribute('data-tile-col') || '', 10);
      if (!isNaN(row) && !isNaN(col)) {
        updateSelection(row, col);
      }
    }
  };

  // Add global event listener for pointerup to release selection even if mouse leaves grid
  useEffect(() => {
    const handlePointerUp = () => {
      endSelection();
    };

    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [endSelection]);

  // Bind pointermove to the grid container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e: PointerEvent) => {
      // Prevent browser default actions like scroll or drag
      e.preventDefault();
      handlePointerMove(e);
    };

    container.addEventListener('pointermove', onPointerMove, { passive: false });
    return () => {
      container.removeEventListener('pointermove', onPointerMove);
    };
  }, [updateSelection]);

  // Check if a specific cell coordinate is currently selected
  const isSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  // Check if a specific cell coordinate is part of an already found word
  const isFound = (row: number, col: number) => {
    return foundWordObjects.some(wordObj => 
      wordObj.cells.some(cell => cell.row === row && cell.col === col)
    );
  };

  const isHintFirstLetter = (row: number, col: number) => {
    if (!activeHint) return false;
    return activeHint.startCoords.row === row && activeHint.startCoords.col === col;
  };

  const isHintDirection = (row: number, col: number) => {
    if (!activeHint || activeHint.step !== 'direction') return false;
    return (
      (activeHint.startCoords.row === row && activeHint.startCoords.col === col) ||
      (activeHint.endCoords.row === row && activeHint.endCoords.col === col)
    );
  };

  const isBlurred = gameState === 'MEMORIZING' || gameState === 'IDLE';

  return (
    <div className="relative w-full max-w-sm aspect-square select-none">
      {/* 8x8 Grid Container */}
      <div
        ref={containerRef}
        className={`
          grid grid-cols-8 grid-rows-8 gap-1.5 p-2 w-full h-full 
          bg-cozy-card rounded-card border-2 border-cozy-tile-shadow/15 shadow-cozy-card 
          touch-none select-none transition-all duration-500 ease-in-out
          ${isBlurred ? 'filter blur-md opacity-40 scale-[0.97]' : 'filter-none opacity-100 scale-100'}
        `}
        style={{
          touchAction: 'none',
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((char, cIdx) => (
            <LetterTile
              key={`${rIdx}-${cIdx}`}
              char={char}
              row={rIdx}
              col={cIdx}
              isSelected={isSelected(rIdx, cIdx)}
              isFound={isFound(rIdx, cIdx)}
              isHintFirstLetter={isHintFirstLetter(rIdx, cIdx)}
              isHintDirection={isHintDirection(rIdx, cIdx)}
              onPointerDown={(e) => {
                if (isBlurred) return;
                // Only left click triggers (pointerType === 'mouse' ? button === 0)
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                startSelection(rIdx, cIdx);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
