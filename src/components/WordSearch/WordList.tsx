import React from 'react';
import { Check, EyeOff, HelpCircle } from 'lucide-react';
import type { GameState } from '../../types/game';
import { useGame } from '../../context/GameContext';

export interface WordListProps {
  targetWords: string[];
  foundWords: string[];
  hideWordListInSearch?: boolean;
  gameState?: GameState;
}

export const WordList: React.FC<WordListProps> = ({
  targetWords,
  foundWords,
  hideWordListInSearch = false,
  gameState,
}) => {
  const { t } = useGame();

  const isMemorizing = gameState === 'MEMORIZING';
  const isSearching = gameState === 'SEARCHING';
  const isHiddenMode = hideWordListInSearch && isSearching;

  return (
    <div className="w-full bg-cozy-card border border-cozy-tile-shadow/15 rounded-card p-5 shadow-sm">
      <h4 className="text-xs font-black tracking-widest text-cozy-muted uppercase mb-3 flex items-center gap-1.5">
        {isMemorizing ? (
          <>
            <HelpCircle size={14} />
            <span>{t('memorizeWords', 'Memorize Words')}</span>
          </>
        ) : (
          <>
            <EyeOff size={14} className="text-cozy-muted" />
            <span>{t('searching', 'Searching')}</span>
          </>
        )}
      </h4>

      {/* Word Recall / Target slots grid */}
      <div className="flex flex-wrap gap-2 justify-start">
        {targetWords.map((word, index) => {
          const isFound = foundWords.includes(word);

          // Render content based on hidden search mode vs normal mode
          let displayContent: React.ReactNode;

          if (isFound) {
            displayContent = (
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-cozy-mint-dark stroke-[3] animate-pop-in" />
                <span>{word}</span>
              </span>
            );
          } else if (isHiddenMode) {
            // Render placeholders for hidden memory rush mode
            displayContent = (
              <span className="font-mono text-cozy-muted/65 select-none font-bold tracking-widest">
                {word.split('').map(() => '?').join(' ')}
              </span>
            );
          } else {
            // Normal display
            displayContent = (
              <span className="font-bold tracking-wide">
                {word}
              </span>
            );
          }

          return (
            <div
              key={`${word}-${index}`}
              className={`
                px-3.5 py-2 rounded-tile font-black text-sm select-none border transition-all duration-300
                ${isFound
                  ? 'bg-cozy-mint/15 border-cozy-mint/40 text-cozy-mint-dark line-through opacity-60 scale-95'
                  : isHiddenMode
                    ? 'bg-cozy-tile/40 border-cozy-tile-shadow/10 text-cozy-muted/70'
                    : 'bg-cozy-tile/60 border-cozy-tile-shadow/15 text-cozy-text'
                }
              `}
            >
              {displayContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
