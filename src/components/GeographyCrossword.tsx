import React, { useState } from 'react';
import { motion } from 'framer-motion';

const geographyPuzzle = {
  grid: [
    [{ letter: 'P', number: 1 }, { letter: 'L' }, { letter: 'A' }, { letter: 'T' }, { letter: 'E' }, { letter: 'A' }, { letter: 'U' }, { isBlack: true }, { letter: 'M', number: 2 }, { letter: 'A' }, { letter: 'P' }],
    [{ letter: 'E' }, { isBlack: true }, { letter: 'T', number: 3 }, { letter: 'R' }, { letter: 'O' }, { letter: 'P' }, { letter: 'I' }, { letter: 'C' }, { letter: 'A' }, { letter: 'L' }, { isBlack: true }],
    [{ letter: 'N' }, { isBlack: true }, { letter: 'L' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'P' }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'I' }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { letter: 'D', number: 4 }, { letter: 'E' }, { letter: 'L' }, { letter: 'T' }, { letter: 'A' }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'N' }, { isBlack: true }, { letter: 'S' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'S' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { letter: 'I', number: 5 }, { letter: 'S' }, { letter: 'L' }, { letter: 'A' }, { letter: 'N' }, { letter: 'D' }, { isBlack: true }],
    [{ letter: 'U' }, { isBlack: true }, { letter: 'C', number: 6 }, { letter: 'A' }, { letter: 'N' }, { letter: 'Y' }, { letter: 'O' }, { letter: 'N' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'L' }, { isBlack: true }, { letter: 'O' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'A' }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'S' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ isBlack: true }, { isBlack: true }, { letter: 'T' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
  ],
  clues: {
    across: [
      { number: 1, clue: "A flat, elevated area of land", answer: "PLATEAU" },
      { number: 3, clue: "Type of climate near the equator", answer: "TROPICAL" },
      { number: 4, clue: "Triangle-shaped landform where a river meets the ocean", answer: "DELTA" },
      { number: 5, clue: "Land completely surrounded by water", answer: "ISLAND" },
      { number: 6, clue: "Deep valley with steep sides, like the Grand Canyon", answer: "CANYON" }
    ],
    down: [
      { number: 1, clue: "Narrow strip of land connecting two larger land masses", answer: "PENINSULA" },
      { number: 2, clue: "Tool used to show locations and features on Earth", answer: "MAP" },
      { number: 3, clue: "Large, flat area near the coast", answer: "COAST" }
    ]
  }
};

const GeographyCrossword: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(geographyPuzzle.grid.length)
      .fill('')
      .map(() => Array(geographyPuzzle.grid[0].length).fill(''))
  );
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [showAnswers, setShowAnswers] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (geographyPuzzle.grid[row][col].isBlack) return;
    
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
      if (direction === 'across' && col < geographyPuzzle.grid[0].length - 1) {
        setSelectedCell({ row, col: col + 1 });
      } else if (direction === 'down' && row < geographyPuzzle.grid.length - 1) {
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
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Geography Crossword</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div 
          className="grid gap-px bg-gray-600" 
          style={{ 
            gridTemplateColumns: `repeat(${geographyPuzzle.grid[0].length}, 40px)`,
            gridTemplateRows: `repeat(${geographyPuzzle.grid.length}, 40px)`
          }}
          tabIndex={0}
          onKeyDown={handleKeyPress}
        >
          {geographyPuzzle.grid.map((row, rowIndex) =>
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
              {geographyPuzzle.clues.across.map((clue) => (
                <li key={`across-${clue.number}`} className="text-gray-300">
                  <span className="font-bold">{clue.number}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Down</h3>
            <ul className="space-y-2">
              {geographyPuzzle.clues.down.map((clue) => (
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

export default GeographyCrossword; 