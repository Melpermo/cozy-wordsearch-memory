import type { LanguageCode } from '../i18n/i18nConfig';
import type { Position, GridWord } from '../types/game';

const GRID_SIZE = 8;

const LETTER_FREQUENCIES: Record<LanguageCode, string> = {
  en: 'EEEEEEEEEEEEETTTTTTTTTTAAAAAAAAAOOOOOOOOOIIIIIIIIINNNNNNNNSSSSSSSRRRRRRRHHHHHHHLLLLDDCUUUMMWWFFGGYYPPBVKJXQZ',
  es: 'EEEEEEEEEEEEEAAAAAAAAAAAAOOOOOOOOOOSSSSSSSSSNNNNNNNNNDDDDDDDDRRRRRRRRUUUUUIIIIITTTTCCCPPPMMMYYQBBHGFZJÑXWK',
  fr: 'EEEEEEEEEEEEEEEEEAAAAAAAAAIIIIIIIIISSSSSSSSTTTTTTTTNNNNNNNRRRRRRRUUUUUULLLLLDOOOCCCPPMVVQFBGGHJXYZKW',
  de: 'EEEEEEEEEEEEEEEEEENNNNNNNNNNNIIIIIIIIISSSSSSSSRRRRRRRRRAAAAAAAAAATTTTTTTTDDDDDDHHUUULLLCCCGGGMMMOBBWFKZPVJYXPQ',
  pt: 'AAAAAAAAAAAAAEEEEEEEEEEEEOOOOOOOOOOOSSSSSSSSSRRRRRRRIIIIIIINNNNNNMMMMMUUTTTTCCLLDDPPVVGHQBFZXJKYW',
  it: 'EEEEEEEEEEEEEAAAAAAAAAAAAIIIIIIIIIIIOOOOOOOOOONNNNNNNLLLLLLRRRRRRTSSSSSSCCCCDDDPPUUMMVVGGHHFFBQQZJKWXY',
};

// Directions for word search placement
interface Direction {
  name: string;
  dx: number;
  dy: number;
}

const DIRECTIONS: Direction[] = [
  { name: 'horizontal-forward', dx: 1, dy: 0 },
  { name: 'horizontal-backward', dx: -1, dy: 0 },
  { name: 'vertical-forward', dx: 0, dy: 1 },
  { name: 'vertical-backward', dx: 0, dy: -1 },
  { name: 'diagonal-down-right', dx: 1, dy: 1 },
  { name: 'diagonal-up-right', dx: 1, dy: -1 },
  { name: 'diagonal-down-left', dx: -1, dy: 1 },
  { name: 'diagonal-up-left', dx: -1, dy: -1 },
];

/**
 * Normalizes a word string for grid matching and letter tiles.
 * - Converts to uppercase
 * - Normalizes accents (e.g. é -> E, ç -> C)
 * - In German, ß -> SS, Ä -> A, Ö -> O, Ü -> U
 * - In Spanish, retains Ñ
 */
export function normalizeWord(word: string, lang: LanguageCode): string {
  let normalized = word.toUpperCase();
  
  if (lang === 'de') {
    normalized = normalized.replace(/ß/g, 'SS');
  } else {
    normalized = normalized.replace(/ß/g, 'S');
  }

  return normalized.split('').map(char => {
    if (lang === 'es' && char === 'Ñ') return 'Ñ';
    if (char === 'Ä') return 'A';
    if (char === 'Ö') return 'O';
    if (char === 'Ü') return 'U';
    // Remove other accents/diacritics
    return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }).join('');
}

interface Placement {
  start: Position;
  dir: Direction;
}

export interface GeneratedGrid {
  matrix: string[][];
  placedWords: GridWord[];
}

/**
 * Generates an 8x8 word search board containing the target words.
 */
export function generateGrid(words: string[], lang: LanguageCode): GeneratedGrid {
  // We try generation multiple times in case placements overlap search space fails
  for (let attempt = 0; attempt < 200; attempt++) {
    const matrix: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const placedWords: GridWord[] = [];
    let success = true;

    // Shuffle words to place them in random order of difficulty
    const sortedWords = [...words]
      .map(w => ({ original: w, normalized: normalizeWord(w, lang) }))
      .sort((a, b) => b.normalized.length - a.normalized.length); // Place longest words first

    for (const item of sortedWords) {
      const word = item.normalized;
      const original = item.original;
      const wordLen = word.length;
      
      if (wordLen > GRID_SIZE) {
        // Word is too long for the grid, skip or error out
        success = false;
        break;
      }

      // Gather all valid placements
      const validPlacements: Placement[] = [];

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          for (const dir of DIRECTIONS) {
            // Check if word fits inside bounds in this direction
            const endRow = r + dir.dy * (wordLen - 1);
            const endCol = c + dir.dx * (wordLen - 1);

            if (endRow >= 0 && endRow < GRID_SIZE && endCol >= 0 && endCol < GRID_SIZE) {
              // Check if characters overlap correctly
              let fits = true;
              for (let i = 0; i < wordLen; i++) {
                const checkRow = r + dir.dy * i;
                const checkCol = c + dir.dx * i;
                const currentGridChar = matrix[checkRow][checkCol];
                const targetChar = word[i];

                if (currentGridChar !== '' && currentGridChar !== targetChar) {
                  fits = false;
                  break;
                }
              }

              if (fits) {
                validPlacements.push({ start: { row: r, col: c }, dir });
              }
            }
          }
        }
      }

      if (validPlacements.length === 0) {
        // Could not fit this word, abort this attempt and try generating a new board
        success = false;
        break;
      }

      // Select a random valid placement
      const placement = validPlacements[Math.floor(Math.random() * validPlacements.length)];
      const cells: Position[] = [];

      for (let i = 0; i < wordLen; i++) {
        const row = placement.start.row + placement.dir.dy * i;
        const col = placement.start.col + placement.dir.dx * i;
        matrix[row][col] = word[i];
        cells.push({ row, col });
      }

      placedWords.push({
        word: original,
        normalized: word,
        start: placement.start,
        end: {
          row: placement.start.row + placement.dir.dy * (wordLen - 1),
          col: placement.start.col + placement.dir.dx * (wordLen - 1),
        },
        cells,
      });
    }

    if (success) {
      // Fill empty spaces with random filler letters using localized frequencies
      const frequencyString = LETTER_FREQUENCIES[lang] || LETTER_FREQUENCIES.en;
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (matrix[r][c] === '') {
            const randIdx = Math.floor(Math.random() * frequencyString.length);
            matrix[r][c] = frequencyString[randIdx];
          }
        }
      }

      return { matrix, placedWords };
    }
  }

  // Fallback: in case generation fails 200 times (extremely rare for small word lists in 8x8), return empty state
  return { matrix: Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('A')), placedWords: [] };
}
