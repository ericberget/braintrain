import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Link, Puzzle, X } from 'lucide-react';

interface WordPair {
  word1: string;
  word2: string;
  relationship: string;
}

interface LogicPuzzle {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  solution: string;
}

interface WordAssociation {
  firstPair: {
    word1: string;
    word2: string;
  };
  secondPair: {
    word1: string;
    options: string[];
    correct: string;
  };
  explanation: string;
  hint: string;
}

const wordPairs: WordPair[] = [
  {
    word1: "Hot",
    word2: "Cold",
    relationship: "Opposites (Antonyms)"
  },
  {
    word1: "Tree",
    word2: "Forest",
    relationship: "Part to Whole"
  },
  {
    word1: "Author",
    word2: "Book",
    relationship: "Creator to Creation"
  },
  {
    word1: "Rain",
    word2: "Umbrella",
    relationship: "Problem to Solution"
  },
  {
    word1: "Student",
    word2: "Learn",
    relationship: "Subject to Action"
  }
];

const logicPuzzles: LogicPuzzle[] = [
  {
    id: 'puzzle1',
    title: 'The Birthday Party',
    description: 'Four friends - Amy, Ben, Cal, and Dan - are sitting around a table. Amy is not next to Ben. Cal is between Dan and Amy. Who is sitting next to Ben?',
    difficulty: 'easy',
    hints: [
      'Try drawing the table',
      'Start with Cal\'s position',
      'Remember Amy cannot be next to Ben'
    ],
    solution: 'Dan must be sitting next to Ben'
  },
  {
    id: 'puzzle2',
    title: 'The Book Series',
    description: 'A book series has 5 books. Book 2 is thicker than Book 3. Book 4 is thinner than Book 3. Book 1 is thicker than Book 2. Book 5 is thinner than Book 4. Which book is the thickest?',
    difficulty: 'medium',
    hints: [
      'Try ordering the books by thickness',
      'Start with Books 2, 3, and 4',
      'Then place Books 1 and 5'
    ],
    solution: 'Book 1 is the thickest'
  },
  {
    id: 'puzzle3',
    title: 'The Color Pattern',
    description: 'In a row of balls, a red ball is always followed by a blue ball. A blue ball is always followed by a green ball. A green ball is always followed by a red ball. If the row starts with a blue ball and has 10 balls total, what color is the last ball?',
    difficulty: 'easy',
    hints: [
      'Write out the pattern starting with blue',
      'Blue → Green → Red → Blue → Green...',
      'Count to the 10th position'
    ],
    solution: 'The 10th ball will be red'
  },
  {
    id: 'puzzle4',
    title: 'The Library Books',
    description: 'Sarah borrowed 3 books from the library. The first book took her 2 days to read. The second book took twice as long as the first. The third book took half as long as the second. How many days did it take Sarah to read all three books?',
    difficulty: 'easy',
    hints: [
      'First book = 2 days',
      'Second book = 2 × 2 days',
      'Third book = (2 × 2) ÷ 2 days'
    ],
    solution: '7 days total (2 + 4 + 2 = 7)'
  },
  {
    id: 'puzzle5',
    title: 'The Classroom Seats',
    description: 'In a classroom, Jack sits behind Maria, Elena sits in front of Jack, and Tom sits behind Elena. Who sits in the front?',
    difficulty: 'medium',
    hints: [
      'Draw the seating arrangement',
      'Start with Jack and Maria\'s positions',
      'Add Elena, then see where Tom fits'
    ],
    solution: 'Maria sits in the front'
  },
  {
    id: 'puzzle6',
    title: 'The Pet Store',
    description: 'A pet store has cats and dogs. Each cat has four legs, and each dog has four legs and one tail. If there are 20 legs and 6 tails in total, how many cats are there?',
    difficulty: 'medium',
    hints: [
      'Each dog has 4 legs and 1 tail',
      'The number of tails equals the number of dogs',
      'Subtract dog legs from total legs'
    ],
    solution: '2 cats (6 dogs with 24 legs, leaving 2 cats with 8 legs)'
  },
  {
    id: 'puzzle7',
    title: 'The Family Ages',
    description: 'A father is 4 times as old as his son. In 20 years, he will be twice as old as his son. How old is the father now?',
    difficulty: 'hard',
    hints: [
      'Let x be the son\'s current age',
      'Father\'s age = 4x',
      'In 20 years: (4x + 20) = 2(x + 20)'
    ],
    solution: 'The father is 40 years old'
  },
  {
    id: 'puzzle8',
    title: 'The School Clubs',
    description: 'In a school, 65% of students are in the Science Club, 45% are in the Art Club, and 25% are in both clubs. What percentage of students are not in any club?',
    difficulty: 'hard',
    hints: [
      'Add Science (65%) and Art (45%)',
      'Subtract the overlap (25%)',
      'Subtract from 100%'
    ],
    solution: '15% are not in any club (100% - (65% + 45% - 25%) = 15%)'
  },
  {
    id: 'puzzle9',
    title: 'The Fruit Basket',
    description: 'A basket has apples and oranges. If you take away 2 apples, the ratio of apples to oranges becomes 1:1. If you add 3 oranges instead, the ratio becomes 2:3. How many apples were in the basket originally?',
    difficulty: 'hard',
    hints: [
      'Let x be the original number of apples',
      'Let y be the original number of oranges',
      'Create two equations from the ratios'
    ],
    solution: '8 apples were in the basket originally'
  },
  {
    id: 'puzzle10',
    title: 'The Clock Hands',
    description: 'At what time between 3 and 4 o\'clock do the hour and minute hands overlap?',
    difficulty: 'medium',
    hints: [
      'Hour hand moves 30° per hour',
      'Minute hand moves 360° per hour',
      'Find when they meet between 3 and 4'
    ],
    solution: '3:16 (approximately)'
  },
  {
    id: 'puzzle11',
    title: 'The Soccer Teams',
    description: 'Three soccer teams (Red, Blue, and Green) played each other once. Red team scored 4 goals in total. Blue team conceded 3 goals. Green team scored 2 goals. What was the score in the Blue vs Green game?',
    difficulty: 'medium',
    hints: [
      'List all games: Red vs Blue, Red vs Green, Blue vs Green',
      'Use total goals scored by Red team',
      'Use goals conceded by Blue team'
    ],
    solution: 'Blue 1, Green 1'
  },
  {
    id: 'puzzle12',
    title: 'The Number Pattern',
    description: 'What comes next in this sequence: 2, 6, 12, 20, 30, __?',
    difficulty: 'easy',
    hints: [
      'Look at the difference between numbers',
      'The difference increases by 2 each time',
      '4, 6, 8, 10, ?'
    ],
    solution: '42 (difference from previous number is 12)'
  }
];

const wordAssociations: WordAssociation[] = [
  {
    firstPair: {
      word1: "Book",
      word2: "Page"
    },
    secondPair: {
      word1: "Album",
      options: ["Song", "Cover", "Artist", "Record"],
      correct: "Song"
    },
    hint: "Think about how a book is divided into parts",
    explanation: "A book is made up of pages, just as an album is made up of songs."
  },
  {
    firstPair: {
      word1: "Bird",
      word2: "Nest"
    },
    secondPair: {
      word1: "Person",
      options: ["Car", "House", "Street", "City"],
      correct: "House"
    },
    hint: "Think about where each lives",
    explanation: "A bird lives in a nest, just as a person lives in a house."
  },
  {
    firstPair: {
      word1: "Tree",
      word2: "Leaf"
    },
    secondPair: {
      word1: "Ocean",
      options: ["Beach", "Wave", "Fish", "Drop"],
      correct: "Drop"
    },
    hint: "Think about the smallest part of each",
    explanation: "A leaf is a small part of a tree, just as a drop is a small part of an ocean."
  },
  {
    firstPair: {
      word1: "Teacher",
      word2: "Student"
    },
    secondPair: {
      word1: "Coach",
      options: ["Game", "Field", "Player", "Ball"],
      correct: "Player"
    },
    hint: "Think about who guides and who learns",
    explanation: "A teacher guides students, just as a coach guides players."
  },
  {
    firstPair: {
      word1: "Sun",
      word2: "Day"
    },
    secondPair: {
      word1: "Moon",
      options: ["Stars", "Night", "Sky", "Space"],
      correct: "Night"
    },
    hint: "Think about when each appears",
    explanation: "The sun appears during the day, just as the moon appears during the night."
  },
  {
    firstPair: {
      word1: "Pencil",
      word2: "Write"
    },
    secondPair: {
      word1: "Scissors",
      options: ["Paper", "Cut", "Sharp", "Tool"],
      correct: "Cut"
    },
    hint: "Think about what each tool does",
    explanation: "A pencil is used to write, just as scissors are used to cut."
  },
  {
    firstPair: {
      word1: "Fish",
      word2: "Swim"
    },
    secondPair: {
      word1: "Bird",
      options: ["Nest", "Fly", "Wing", "Feather"],
      correct: "Fly"
    },
    hint: "Think about how each animal moves",
    explanation: "Fish swim through water, just as birds fly through air."
  },
  {
    firstPair: {
      word1: "Piano",
      word2: "Keys"
    },
    secondPair: {
      word1: "Guitar",
      options: ["Music", "Strings", "Wood", "Sound"],
      correct: "Strings"
    },
    hint: "Think about what you play to make music",
    explanation: "A piano is played using keys, just as a guitar is played using strings."
  },
  {
    firstPair: {
      word1: "Chef",
      word2: "Restaurant"
    },
    secondPair: {
      word1: "Doctor",
      options: ["Medicine", "Hospital", "Patient", "Health"],
      correct: "Hospital"
    },
    hint: "Think about where each professional works",
    explanation: "A chef works in a restaurant, just as a doctor works in a hospital."
  },
  {
    firstPair: {
      word1: "Bee",
      word2: "Honey"
    },
    secondPair: {
      word1: "Cow",
      options: ["Grass", "Farm", "Milk", "Barn"],
      correct: "Milk"
    },
    hint: "Think about what each animal produces",
    explanation: "Bees produce honey, just as cows produce milk."
  },
  {
    firstPair: {
      word1: "Winter",
      word2: "Snow"
    },
    secondPair: {
      word1: "Summer",
      options: ["Sun", "Beach", "Heat", "Vacation"],
      correct: "Heat"
    },
    hint: "Think about the characteristic weather of each season",
    explanation: "Winter is characterized by snow, just as summer is characterized by heat."
  },
  {
    firstPair: {
      word1: "Painter",
      word2: "Canvas"
    },
    secondPair: {
      word1: "Writer",
      options: ["Paper", "Pen", "Book", "Story"],
      correct: "Paper"
    },
    hint: "Think about the surface each artist works on",
    explanation: "A painter works on a canvas, just as a writer works on paper."
  },
  {
    firstPair: {
      word1: "Seed",
      word2: "Plant"
    },
    secondPair: {
      word1: "Egg",
      options: ["Bird", "Nest", "Shell", "Wing"],
      correct: "Bird"
    },
    hint: "Think about what each grows into",
    explanation: "A seed grows into a plant, just as an egg develops into a bird."
  },
  {
    firstPair: {
      word1: "Clock",
      word2: "Time"
    },
    secondPair: {
      word1: "Ruler",
      options: ["Length", "Wood", "Straight", "Measure"],
      correct: "Length"
    },
    hint: "Think about what each tool measures",
    explanation: "A clock measures time, just as a ruler measures length."
  },
  {
    firstPair: {
      word1: "Desert",
      word2: "Cactus"
    },
    secondPair: {
      word1: "Rainforest",
      options: ["Rain", "Palm", "Vines", "Trees"],
      correct: "Palm"
    },
    hint: "Think about plants typical to each environment",
    explanation: "Cacti are typical plants in deserts, just as palm trees are typical in rainforests."
  },
  {
    firstPair: {
      word1: "Eye",
      word2: "See"
    },
    secondPair: {
      word1: "Ear",
      options: ["Sound", "Hear", "Music", "Listen"],
      correct: "Hear"
    },
    hint: "Think about the function of each sense organ",
    explanation: "Eyes are used to see, just as ears are used to hear."
  },
  {
    firstPair: {
      word1: "Question",
      word2: "Answer"
    },
    secondPair: {
      word1: "Problem",
      options: ["Math", "Difficult", "Solution", "Work"],
      correct: "Solution"
    },
    hint: "Think about what completes each",
    explanation: "A question is completed by an answer, just as a problem is completed by a solution."
  },
  {
    firstPair: {
      word1: "Shoe",
      word2: "Foot"
    },
    secondPair: {
      word1: "Glove",
      options: ["Winter", "Hand", "Warm", "Fingers"],
      correct: "Hand"
    },
    hint: "Think about which body part each covers",
    explanation: "A shoe goes on a foot, just as a glove goes on a hand."
  },
  {
    firstPair: {
      word1: "Camera",
      word2: "Photo"
    },
    secondPair: {
      word1: "Printer",
      options: ["Paper", "Ink", "Document", "Office"],
      correct: "Document"
    },
    hint: "Think about what each device produces",
    explanation: "A camera produces photos, just as a printer produces documents."
  },
  {
    firstPair: {
      word1: "Car",
      word2: "Road"
    },
    secondPair: {
      word1: "Boat",
      options: ["Water", "Fish", "Ocean", "Sail"],
      correct: "Water"
    },
    hint: "Think about where each vehicle travels",
    explanation: "A car travels on a road, just as a boat travels on water."
  }
];

const LearningGames = () => {
  const [selectedGame, setSelectedGame] = useState<'words' | 'logic' | null>(null);
  const [currentPuzzle, setCurrentPuzzle] = useState<LogicPuzzle | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showWordHint, setShowWordHint] = useState(false);
  const [wordAnswered, setWordAnswered] = useState(false);

  const handleWordAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setWordAnswered(true);
  };

  const nextWord = () => {
    if (currentWordIndex < wordAssociations.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSelectedAnswer(null);
      setWordAnswered(false);
      setShowWordHint(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Brain Games</h2>
      <p className="text-gray-400 mb-8">Challenge yourself with word associations and logic puzzles</p>

      {/* Game Selection */}
      {!selectedGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-500/20 p-6 rounded-xl cursor-pointer"
            onClick={() => setSelectedGame('words')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Link className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Word Associations</h3>
            </div>
            <p className="text-gray-300">Connect related words and understand their relationships</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-purple-500/20 p-6 rounded-xl cursor-pointer"
            onClick={() => setSelectedGame('logic')}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Puzzle className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-purple-400">Logic Puzzles</h3>
            </div>
            <p className="text-gray-300">Solve challenging puzzles that test your reasoning</p>
          </motion.div>
        </div>
      )}

      {/* Word Associations Game */}
      {selectedGame === 'words' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            onClick={() => setSelectedGame(null)}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back to Games
          </button>

          <div className="bg-gray-800/50 p-8 rounded-xl">
            <div className="mb-8">
              <p className="text-sm text-gray-400 mb-2">
                Question {currentWordIndex + 1} of {wordAssociations.length}
              </p>
              <h3 className="text-2xl text-white font-bold mb-4">
                Complete the analogy:
              </h3>
              <p className="text-xl text-gray-200 mb-6">
                <span className="text-blue-400">{wordAssociations[currentWordIndex].firstPair.word1}</span>
                {" is to "}
                <span className="text-blue-400">{wordAssociations[currentWordIndex].firstPair.word2}</span>
                {" as "}
                <span className="text-purple-400">{wordAssociations[currentWordIndex].secondPair.word1}</span>
                {" is to... "}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {wordAssociations[currentWordIndex].secondPair.options.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleWordAnswer(option)}
                  disabled={wordAnswered}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    wordAnswered
                      ? option === wordAssociations[currentWordIndex].secondPair.correct
                        ? 'bg-green-500/20 text-green-200'
                        : option === selectedAnswer
                        ? 'bg-red-500/20 text-red-200'
                        : 'bg-gray-700/50 text-gray-400'
                      : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowWordHint(!showWordHint)}
                className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
              >
                {showWordHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              {showWordHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-blue-500/10 rounded-lg"
                >
                  <p className="text-blue-400">{wordAssociations[currentWordIndex].hint}</p>
                </motion.div>
              )}

              {wordAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === wordAssociations[currentWordIndex].secondPair.correct
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                  }`}>
                    <p className={`font-bold mb-2 ${
                      selectedAnswer === wordAssociations[currentWordIndex].secondPair.correct
                        ? 'text-green-200'
                        : 'text-red-200'
                    }`}>
                      {selectedAnswer === wordAssociations[currentWordIndex].secondPair.correct
                        ? 'Correct!'
                        : 'Not quite right.'}
                    </p>
                    <p className="text-gray-200">
                      {wordAssociations[currentWordIndex].explanation}
                    </p>
                  </div>

                  {currentWordIndex < wordAssociations.length - 1 && (
                    <button
                      onClick={nextWord}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                      Next Word
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Logic Puzzles */}
      {selectedGame === 'logic' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            onClick={() => setSelectedGame(null)}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back to Games
          </button>

          {!currentPuzzle ? (
            <div className="grid gap-4">
              {logicPuzzles.map((puzzle) => (
                <motion.div
                  key={puzzle.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-800/50 p-6 rounded-xl cursor-pointer"
                  onClick={() => setCurrentPuzzle(puzzle)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{puzzle.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      puzzle.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                      puzzle.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400">{puzzle.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{currentPuzzle.title}</h3>
                <button
                  onClick={() => {
                    setCurrentPuzzle(null);
                    setShowHint(false);
                    setCurrentHintIndex(0);
                    setShowSolution(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-lg text-gray-200 mb-8">{currentPuzzle.description}</p>

              <div className="space-y-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                {showHint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-blue-500/10 rounded-lg"
                  >
                    <p className="text-blue-400">{currentPuzzle.hints[currentHintIndex]}</p>
                    {currentHintIndex < currentPuzzle.hints.length - 1 && (
                      <button
                        onClick={() => setCurrentHintIndex(i => i + 1)}
                        className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                      >
                        Next Hint →
                      </button>
                    )}
                  </motion.div>
                )}

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30"
                >
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>

                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-purple-500/10 rounded-lg"
                  >
                    <p className="text-purple-400">{currentPuzzle.solution}</p>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LearningGames; 