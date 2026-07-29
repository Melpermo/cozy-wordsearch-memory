import { useState, useCallback } from 'react';
import type { Position, GridWord } from '../types/game';
import { audioManager } from '../utils/audioManager';

interface UseWordSearchProps {
  grid: string[][];
  allGridWords: GridWord[];
  foundWords: string[];
  onWordFound: (wordObj: GridWord) => void;
  onMistake: () => void;
}

export function useWordSearch({
  grid,
  allGridWords,
  foundWords,
  onWordFound,
  onMistake,
}: UseWordSearchProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [currentPos, setCurrentPos] = useState<Position | null>(null);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);

  // Computes the path of cells from start to current position
  const getLineCells = useCallback((p1: Position, p2: Position): Position[] => {
    const cells: Position[] = [];
    const dr = p2.row - p1.row;
    const dc = p2.col - p1.col;

    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    const isHorizontal = dr === 0;
    const isVertical = dc === 0;
    const isDiagonal = absDr === absDc;

    if (!isHorizontal && !isVertical && !isDiagonal) {
      // Inactive or invalid straight line
      return [p1];
    }

    const stepCount = Math.max(absDr, absDc);
    const stepR = stepCount === 0 ? 0 : dr / stepCount;
    const stepC = stepCount === 0 ? 0 : dc / stepCount;

    for (let i = 0; i <= stepCount; i++) {
      cells.push({
        row: Math.round(p1.row + stepR * i),
        col: Math.round(p1.col + stepC * i),
      });
    }

    return cells;
  }, []);

  const startSelection = useCallback((row: number, col: number) => {
    const pos = { row, col };
    setIsSelecting(true);
    setStartPos(pos);
    setCurrentPos(pos);
    setSelectedCells([pos]);
    audioManager.playTileSelect();
  }, []);

  const updateSelection = useCallback((row: number, col: number) => {
    if (!isSelecting || !startPos) return;

    // Only update if current position has changed
    if (currentPos && currentPos.row === row && currentPos.col === col) return;

    const targetPos = { row, col };
    setCurrentPos(targetPos);

    // Calculate line cells
    const cells = getLineCells(startPos, targetPos);
    setSelectedCells(cells);
    audioManager.playTileSelect();
  }, [isSelecting, startPos, currentPos, getLineCells]);

  const endSelection = useCallback(() => {
    if (!isSelecting || !startPos || selectedCells.length === 0) {
      setIsSelecting(false);
      setStartPos(null);
      setCurrentPos(null);
      setSelectedCells([]);
      return;
    }

    // 1. Reconstruct the string of selected cells
    const selectedString = selectedCells
      .map(cell => grid[cell.row][cell.col])
      .join('');
      
    const reversedString = [...selectedString].reverse().join('');

    // 2. Find a matching word in allGridWords by string content
    const match = allGridWords.find(wordObj => {
      const isWordMatch = wordObj.normalized === selectedString || wordObj.normalized === reversedString;
      const isAlreadyFound = foundWords.includes(wordObj.word);
      return isWordMatch && !isAlreadyFound;
    });

    if (match) {
      // Correct match! Create GridWord with user's actual selected cells
      const matchedWord: GridWord = {
        word: match.word,
        normalized: match.normalized,
        start: selectedCells[0],
        end: selectedCells[selectedCells.length - 1],
        cells: selectedCells,
      };
      onWordFound(matchedWord);
    } else {
      // Only penalize if we actually dragged beyond a single tile
      if (selectedCells.length > 1) {
        onMistake();
      }
    }

    // Reset selection state
    setIsSelecting(false);
    setStartPos(null);
    setCurrentPos(null);
    setSelectedCells([]);
  }, [isSelecting, startPos, selectedCells, grid, allGridWords, foundWords, onWordFound, onMistake]);

  return {
    isSelecting,
    selectedCells,
    startSelection,
    updateSelection,
    endSelection,
  };
}
