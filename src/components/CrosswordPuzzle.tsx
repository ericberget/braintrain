import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrosswordCell {
  letter: string;
  number?: number;
  isBlack?: boolean;
  row: number;
  col: number;
}

interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
}

// Sample 6th grade appropriate crossword puzzle
const samplePuzzle = {
  grid: [
    [{ letter: 'P', number: 1 }, { letter: 'H' }, { letter: 'O' }, { letter: 'T' }, { letter: 'O' }, { letter: 'S' }, { letter: 'Y' }, { letter: 'N' }, { letter: 'T' }, { letter: 'H' }, { letter: 'E' }, { letter: 'S' }, { letter: 'I' }, { letter: 'S' }],
    [{ letter: 'H' }, { isBlack: true }, { letter: 'S', number: 2 }, { letter: 'Y' }, { letter: 'M' }, { letter: 'M' }, { letter: 'E' }, { letter: 'T' }, { letter: 'R' }, { letter: 'Y' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'Y', number: 3 }, { letter: 'E' }, { letter: 'A' }, { letter: 'R' }, { isBlack: true }, { letter: 'I', number: 4 }, { letter: 'N' }, { letter: 'F' }, { letter: 'E' }, { letter: 'R' }, { letter: 'E' }, { letter: 'N' }, { letter: 'C' }, { letter: 'E' }],
    [{ letter: 'S' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'M' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'Q', number: 5 }, { letter: 'U' }, { letter: 'O' }, { letter: 'T' }],
    [{ letter: 'I' }, { letter: 'N', number: 6 }, { letter: 'T' }, { letter: 'E' }, { letter: 'G' }, { letter: 'E' }, { letter: 'R' }, { isBlack: true }, { letter: 'V', number: 7 }, { letter: 'O' }, { letter: 'L' }, { letter: 'U' }, { letter: 'M' }, { letter: 'E' }],
    [{ letter: 'C' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'T' }, { isBlack: true }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { letter: 'U' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'S' }, { isBlack: true }, { letter: 'C', number: 8 }, { letter: 'I' }, { letter: 'V' }, { letter: 'E' }, { letter: 'R' }, { isBlack: true }, { letter: 'R' }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'O' }, { isBlack: true }, { isBlack: true }, { letter: 'R' }, { isBlack: true }, { isBlack: true }, { letter: 'I' }, { isBlack: true }, { letter: 'T' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'N' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { letter: 'I' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'G' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'B' }, { isBlack: true }, { letter: 'O' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'R' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'L' }, { isBlack: true }, { letter: 'N' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'U' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'E' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'E' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'S' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
  ],
  clues: {
    across: [
      { number: 1, clue: "Process by which plants make their own food", answer: "PHOTOSYNTHESIS" },
      { number: 2, clue: "When something is the same on both sides", answer: "SYMMETRY" },
      { number: 4, clue: "Making a conclusion based on evidence", answer: "INFERENCE" },
      { number: 5, clue: "Words taken exactly from a source", answer: "QUOTE" },
      { number: 6, clue: "A whole number", answer: "INTEGER" },
      { number: 7, clue: "Amount of space something takes up", answer: "VOLUME" },
      { number: 8, clue: "Ancient Roman number system", answer: "CONGRUENT" }
    ],
    down: [
      { number: 1, clue: "Study of matter and its properties", answer: "PHYSICS" },
      { number: 3, clue: "Time Earth takes to orbit the Sun", answer: "YEAR" },
      { number: 7, clue: "Can be used to represent data graphically", answer: "VARIABLES" }
    ]
  }
};

const CrosswordPuzzle: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(samplePuzzle.grid.length)
      .fill('')
      .map(() => Array(samplePuzzle.grid[0].length).fill(''))
  );
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [showAnswers, setShowAnswers] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (samplePuzzle.grid[row][col].isBlack) return;
    
    if (selectedCell?.row === row && selectedCell?.col === col) {
      setDirection(direction === 'across' ? 'down' : 'across');
    }
    setSelectedCell({ row, col });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      const newAnswers = [...userAnswers];
      newAnswers[row][col] = key;
      setUserAnswers(newAnswers);

      // Move to next cell
      if (direction === 'across' && col < samplePuzzle.grid[0].length - 1) {
        setSelectedCell({ row, col: col + 1 });
      } else if (direction === 'down' && row < samplePuzzle.grid.length - 1) {
        setSelectedCell({ row: row + 1, col });
      }
    } else if (e.key === 'Backspace') {
      const newAnswers = [...userAnswers];
      newAnswers[row][col] = '';
      setUserAnswers(newAnswers);

      // Move to previous cell
      if (direction === 'across' && col > 0) {
        setSelectedCell({ row, col: col - 1 });
      } else if (direction === 'down' && row > 0) {
        setSelectedCell({ row: row - 1, col });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Educational Crossword</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div 
          className="grid gap-px bg-gray-600" 
          style={{ 
            gridTemplateColumns: `repeat(${samplePuzzle.grid[0].length}, 40px)`,
            gridTemplateRows: `repeat(${samplePuzzle.grid.length}, 40px)`
          }}
          tabIndex={0}
          onKeyDown={handleKeyPress}
        >
          {samplePuzzle.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  relative w-10 h-10 flex items-center justify-center
                  ${cell.isBlack ? 'bg-gray-900' : 'bg-gray-800'}
                  ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-900' : ''}
                  cursor-pointer
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {!cell.isBlack && (
                  <>
                    {cell.number && (
                      <span className="absolute top-0 left-0 text-xs text-gray-400 p-0.5">
                        {cell.number}
                      </span>
                    )}
                    <span className="text-xl text-white">
                      {showAnswers ? cell.letter : userAnswers[rowIndex][colIndex]}
                    </span>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Across</h3>
            <ul className="space-y-2">
              {samplePuzzle.clues.across.map((clue) => (
                <li key={`across-${clue.number}`} className="text-gray-300">
                  <span className="font-bold">{clue.number}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Down</h3>
            <ul className="space-y-2">
              {samplePuzzle.clues.down.map((clue) => (
                <li key={`down-${clue.number}`} className="text-gray-300">
                  <span className="font-bold">{clue.number}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
          >
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrosswordPuzzle; 