import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CrosswordCell {
  letter?: string;
  number?: number;
  isBlack?: boolean;
}

interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
}

const CitizenshipCrossword: React.FC = () => {
  const [grid, setGrid] = useState<CrosswordCell[][]>([
    [{ letter: 'C', number: 1 }, { letter: 'O', number: 2 }, { letter: 'N' }, { letter: 'G' }, { letter: 'R' }, { letter: 'E' }, { letter: 'S' }, { letter: 'S' }],
    [{ letter: 'O' }, { isBlack: true }, { letter: 'A' }, { isBlack: true }, { letter: 'I' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'N' }, { isBlack: true }, { letter: 'T', number: 3 }, { letter: 'I' }, { letter: 'G' }, { letter: 'H' }, { letter: 'T' }, { letter: 'S' }],
    [{ letter: 'S', number: 4 }, { letter: 'E' }, { letter: 'I' }, { letter: 'O' }, { letter: 'N' }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'T' }, { isBlack: true }, { letter: 'O' }, { isBlack: true }, { isBlack: true }, { letter: 'V', number: 5 }, { letter: 'O' }, { letter: 'T' }, { letter: 'E' }],
    [{ letter: 'I' }, { isBlack: true }, { letter: 'N' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'T' }, { isBlack: true }, { letter: 'L' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'U' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }],
    [{ letter: 'T' }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }, { isBlack: true }]
  ]);

  const clues: CrosswordClue[] = [
    {
      number: 1,
      clue: "The legislative branch of the U.S. government",
      answer: "CONGRESS",
      direction: "across"
    },
    {
      number: 1,
      clue: "The document that outlines the basic principles of American government",
      answer: "CONSTITUTION",
      direction: "down"
    },
    {
      number: 2,
      clue: "The first ten amendments to the Constitution",
      answer: "NATIONAL",
      direction: "down"
    },
    {
      number: 3,
      clue: "Basic freedoms protected by the Bill of Rights",
      answer: "RIGHTS",
      direction: "across"
    },
    {
      number: 4,
      clue: "A meeting of representatives to discuss and make laws",
      answer: "SESSION",
      direction: "across"
    },
    {
      number: 5,
      clue: "The right and responsibility of citizens in a democracy",
      answer: "VOTE",
      direction: "across"
    }
  ];

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(''))
  );

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col].isBlack) {
      setSelectedCell({ row, col });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!selectedCell) return;

    if (event.key.match(/^[a-zA-Z]$/)) {
      const newAnswers = [...userAnswers];
      newAnswers[selectedCell.row][selectedCell.col] = event.key.toUpperCase();
      setUserAnswers(newAnswers);

      // Move to next non-black cell
      let nextCol = selectedCell.col + 1;
      while (nextCol < grid[0].length && grid[selectedCell.row][nextCol]?.isBlack) {
        nextCol++;
      }
      if (nextCol < grid[0].length) {
        setSelectedCell({ row: selectedCell.row, col: nextCol });
      }
    } else if (event.key === 'Backspace') {
      const newAnswers = [...userAnswers];
      newAnswers[selectedCell.row][selectedCell.col] = '';
      setUserAnswers(newAnswers);

      // Move to previous non-black cell
      let prevCol = selectedCell.col - 1;
      while (prevCol >= 0 && grid[selectedCell.row][prevCol]?.isBlack) {
        prevCol--;
      }
      if (prevCol >= 0) {
        setSelectedCell({ row: selectedCell.row, col: prevCol });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Citizenship Crossword</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div 
            className="grid gap-0.5"
            style={{ 
              gridTemplateColumns: `repeat(${grid[0].length}, 35px)`,
              gridTemplateRows: `repeat(${grid.length}, 35px)`
            }}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    relative border border-gray-600 flex items-center justify-center
                    ${cell.isBlack ? 'bg-gray-900' : 'bg-gray-700/50 cursor-pointer hover:bg-gray-600/50'}
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-500/30 ring-2 ring-blue-400' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell.number && (
                    <span className="absolute top-0 left-0.5 text-[10px] text-gray-400">
                      {cell.number}
                    </span>
                  )}
                  {!cell.isBlack && (
                    <span className="text-base font-semibold text-white">
                      {showAnswers ? cell.letter : userAnswers[rowIndex][colIndex]}
                    </span>
                  )}
                </div>
              ))
            ))}
          </div>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-6 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Across</h3>
            <ul className="space-y-2">
              {clues.filter(clue => clue.direction === 'across').map(clue => (
                <li key={`across-${clue.number}`} className="text-gray-300 text-sm">
                  <span className="font-bold text-gray-400">{clue.number}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Down</h3>
            <ul className="space-y-2">
              {clues.filter(clue => clue.direction === 'down').map(clue => (
                <li key={`down-${clue.number}`} className="text-gray-300 text-sm">
                  <span className="font-bold text-gray-400">{clue.number}.</span> {clue.clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenshipCrossword; 