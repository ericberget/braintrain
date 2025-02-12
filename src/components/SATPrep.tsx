import { useState, useEffect, useRef } from 'react';
import { 
  Calculator,
  Pen,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Calendar,
  Star,
  Zap,
  Trophy,
  MessageSquare,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { startOfDay } from 'date-fns';
import { useGame } from '../context/GameContext';
import { useQuestions } from '../context/QuestionsContext';
import { 
  mathProblems, 
  writingProblems, 
  smartyPantsProblems, 
  vocabWords, 
  readingPassages 
} from '../data/questions';
import WordOfTheDay from './WordOfTheDay';

console.log('SATPrep component loading...');
console.log('date-fns import check:', startOfDay);

const playSound = (soundName: 'correct' | 'incorrect' | 'tick' | 'timeWarning' | 'timeUp', volume: number = 0.2) => {
  const soundMap = {
    correct: 'correctding',
    incorrect: 'wrong',
    tick: 'tick',
    timeWarning: 'timewarning',
    timeUp: 'timeup'
  };
  
  const audio = new Audio(`/sounds/${soundMap[soundName]}.wav`);
  audio.volume = volume;
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
};

interface AnswerButtonProps {
  option: string;
  index: number;
  isCorrect: boolean;
  onClick: (index: number) => void;
  revealed: boolean;
}

const AnswerButton = ({ option, index, isCorrect, onClick, revealed }: AnswerButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => onClick(index)}
      className={cn(
        "w-full p-4 rounded-lg text-left transition-colors",
        revealed
          ? isCorrect
            ? "bg-green-500/20 text-green-200"
            : "bg-gray-700 text-gray-400"
          : "bg-gray-700 hover:bg-gray-600 text-gray-200"
      )}
    >
      {option}
    </motion.button>
  );
};

interface TimeBombState {
  timeLeft: number;
  strikes: number;
  correctAnswers: number;
  isActive: boolean;
}

interface DailyChallengeState {
  timeLeft: number;
  isActive: boolean;
  currentCategory: 'math' | 'writing' | 'smartypants';
  progress: {
    math: number;
    writing: number;
    smartypants: number;
  };
  correctAnswers: {
    math: number;
    writing: number;
    smartypants: number;
  };
  points: number;
  currentQuestionIndex: number;
  streak: number;
  multiplier: number;
}

type SectionKey = 'home' | 'vocabulary' | 'math' | 'comprehension' | 'writing' | 'daily' | 'smartypants';

interface Section {
  title: string;
  icon: JSX.Element;
  content: JSX.Element;
}

// Add this type for the progress and correctAnswers objects
type CategoryScores = {
  math: number;
  writing: number;
  smartypants: number;
};

// Then update the DailyProgress interface
interface DailyProgress {
  completed: boolean;
  bestScore: number;
  lastPlayedAt: string;
}

interface UserProgress {
  points: number;
  streak: number;
  lastPlayed: string;
  dailyChallenge: DailyProgress;
  completedQuestions: {
    vocab: number[];
    math: number[];
    reading: number[];
    writing: number[];
    smartypants: number[];
  };
}

interface GameOverProps {
  points: number;
  streak: number;
  onClose: () => void;
}

const GameOver = ({ points, streak, onClose }: GameOverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl max-w-lg w-full p-8"
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-emerald-400">
            Challenge Complete! 🎉
          </h2>
          <div className="py-8 space-y-6">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {points}
              </div>
              <div className="text-gray-400">Star Points Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {streak} Day Streak
              </div>
              <div className="text-gray-400">Keep it going!</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add this component for milestone celebrations
const Celebration = ({ message }: { message: string }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.5, opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center pointer-events-none"
  >
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-2xl font-bold">
      {message}
    </div>
  </motion.div>
);

// Add this near your other interfaces
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-200 p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">About Wiz Kid</h2>
        <div className="space-y-4">
          <p>
            Wiz Kid is a daily learning companion that helps homeschooled middle schoolers stay on grade level through gamified practice challenges. It's like a personal academic trainer that prevents learning loss and keeps students engaged with core subjects through consistent, bite-sized daily exercises.
          </p>
          <p>
            Our Daily Challenge feature offers a fresh set of questions each day across math, writing, and general knowledge. Complete these challenges to build streaks and earn points, making learning a fun daily habit.
          </p>
          <p>
            In the Practice section, you can focus on specific subjects and topics at your own pace. This is perfect for areas where you want extra practice or need to strengthen your understanding.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Add this function near the top of your file
function getRandomForDay(category: string, max: number) {
  const today = startOfDay(new Date());
  const seed = today.getTime() + category.charCodeAt(0);
  return Math.abs(Math.floor((seed / 10000) % max));
}

interface DailyQuestions {
  math: Question;
  writing: Question;
  smartypants: Question;
}



// Make sure this is OUTSIDE your component, with the vocabularyQuestions array
const readingQuestions = [
  {
    passage: `The Amazon Rainforest is often called the "lungs of the Earth" because it produces about 20% of the world's oxygen. This vast forest covers parts of nine countries in South America and is home to millions of plant and animal species. Many of these species cannot be found anywhere else in the world. However, the rainforest faces many challenges today. Every year, large areas are cut down for farming and building. This not only affects the plants and animals that live there but also impacts the Earth's climate. Scientists warn that if too much of the forest is lost, it could change weather patterns around the world.`,
    questions: [
      {
        question: "Why is the Amazon Rainforest called the 'lungs of the Earth'?",
        choices: [
          "Because it produces 20% of the world's oxygen",
          "Because it is very large",
          "Because it has many animals",
          "Because it is in South America"
        ],
        correctAnswer: "Because it produces 20% of the world's oxygen"
      }
    ]
  }
];

// Add these new interfaces at the top with other interfaces
interface GameState {
  isActive: boolean;
  currentDay: string;
  currentCategory: 'math' | 'writing' | 'smartypants' | null;
  questionsAnswered: number;
  correctAnswers: number;
  points: number;
  streak: number;
  lastPlayedDate: string | null;
  dailyProgress: DailyProgress;
}

interface DailyQuestions {
  math: Question[];
  writing: Question[];
  smartypants: Question[];
  date: string;
}

// Add this after other interfaces but before the component
const POINTS_PER_CORRECT = 10;
const STREAK_BONUS_MULTIPLIER = 0.5; // 50% bonus for maintaining streak
const QUESTIONS_PER_CATEGORY = 3;

// Add this utility function
const getDailyQuestions = (): DailyQuestions => {
  console.log('Getting daily questions...');
  const today = startOfDay(new Date()).toISOString();
  console.log('Today date:', today);
  
  const getRandomForDay = (array: Question[], seed: number) => {
    const shuffled = [...array].sort((a, b) => {
      const hashA = (seed + a.question.length) % array.length;
      const hashB = (seed + b.question.length) % array.length;
      return hashA - hashB;
    });
    return shuffled.slice(0, QUESTIONS_PER_CATEGORY);
  };

  const dateSeed = parseInt(today.replace(/\D/g, ''));
  
  return {
    math: getRandomForDay(mathProblems, dateSeed),
    writing: getRandomForDay(writingProblems, dateSeed),
    smartypants: getRandomForDay(smartyPantsProblems, dateSeed),
    date: today
  };
};

// Add these constants at the top with other constants
const STORAGE_KEYS = {
  GAME_STATE: 'wizKidGameState',
  USER_STATS: 'wizKidUserStats'
} as const;

// Add this interface
interface UserStats {
  totalPoints: number;
  streak: number;
  lastPlayed: string;
}

// Add these utility functions
const getUserStats = (): UserStats => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
  if (!stored) {
    return {
      totalPoints: 0,
      streak: 0,
      lastPlayed: ''
    };
  }
  return JSON.parse(stored);
};

const saveUserStats = (stats: UserStats) => {
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Keep utility functions and constants outside
const POINTS_KEY = 'wizKidPoints';

const savePoints = (points: number) => {
  localStorage.setItem(POINTS_KEY, points.toString());
};

const loadPoints = (): number => {
  const saved = localStorage.getItem(POINTS_KEY);
  return saved ? parseInt(saved) : 0;
};

// Move the PointsAnimation component outside (it's not using hooks)
const PointsAnimation = ({ points }: { points: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: -100 }}
      transition={{ duration: 1.5 }}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-2xl"
    >
      +{points}
    </motion.div>
  );
};

// Add this component near the top with other components
const QuestionTransition = ({ children, key }: { children: React.ReactNode; key: string | number }) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Add this component near the top with other components
const FeedbackAnimation = ({ isCorrect, children }: { isCorrect: boolean; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 rounded-lg ${
        isCorrect ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
      }`}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Add this component for the celebration animation
const Confetti = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: -10,
            x: Math.random() * window.innerWidth
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: window.innerHeight + 10,
            x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 200
          }}
          transition={{
            duration: 2.5,
            delay: Math.random() * 0.2
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: ['#FFD700', '#FF69B4', '#00FF00', '#00BFFF'][Math.floor(Math.random() * 4)]
          }}
        />
      ))}
    </motion.div>
  );
};

const SATPrep = () => {
  console.log('SATPrep component rendering...');
  const { state, dispatch } = useGame();
  const { 
    dailyQuestions, 
    isLoading, 
    error,
    currentQuestion,
    questionNumber,
    answered,
    isCorrect,
    nextQuestion,
    handleAnswer
  } = useQuestions();

  // Move these useState declarations inside the component
  const [currentSmartyPantsQuestions, setCurrentSmartyPantsQuestions] = useState<Question[]>([]);
  const [currentSmartyPantsIndex, setCurrentSmartyPantsIndex] = useState(0);
  const [smartyPantsAnswered, setSmartyPantsAnswered] = useState(false);
  const [isCorrectSmartyPants, setIsCorrectSmartyPants] = useState(false);
  const [isSmartyPantsModalOpen, setIsSmartyPantsModalOpen] = useState(false);

  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const hasPlayedWarningRef = useRef(false);
  const hasPlayedUrgentRef = useRef(false);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  const [currentVocabQuestions, setCurrentVocabQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [currentReadingQuestions, setCurrentReadingQuestions] = useState([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentReadingQuestionIndex, setCurrentReadingQuestionIndex] = useState(0);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [currentMathIndex, setCurrentMathIndex] = useState(0);
  const [mathAnswered, setMathAnswered] = useState(false);
  const [isCorrectMath, setIsCorrectMath] = useState(false);
  const [vocabAnswered, setVocabAnswered] = useState(false);
  const [isCorrectVocab, setIsCorrectVocab] = useState(false);

  // Add this state
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());

  // Add this with other state declarations
  const [currentMathQuestions, setCurrentMathQuestions] = useState<Question[]>([]);

  // Add this state for the hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Add this state for the FAQ modal
  const [showFAQModal, setShowFAQModal] = useState(false);

  // Move all useState and useEffect hooks inside the component
  const [totalPoints, setTotalPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [animationPoints, setAnimationPoints] = useState(0);

  // Add this useEffect inside the component
  useEffect(() => {
    setTotalPoints(loadPoints());
  }, []);

  // Move addPoints function inside the component
  const addPoints = (amount: number) => {
    const newTotal = totalPoints + amount;
    setTotalPoints(newTotal);
    savePoints(newTotal);
    
    // Trigger animation
    setAnimationPoints(amount);
    setShowPointsAnimation(true);
    setTimeout(() => setShowPointsAnimation(false), 1500);
    
    playSound('correct');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Add these state variables for reading feedback
  const [readingAnswered, setReadingAnswered] = useState(false);
  const [isCorrectReading, setIsCorrectReading] = useState(false);

  // Add state for Word of the Day modal
  const [showWordOfTheDay, setShowWordOfTheDay] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!dailyQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: Could not load questions</p>
      </div>
    );
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Add these helper functions near the top
  const getTodayString = () => startOfDay(new Date()).toISOString();

  const getStoredGameState = () => {
    const stored = localStorage.getItem('wizKidGameState');
    if (!stored) return null;
    return JSON.parse(stored);
  };

  // Update startDailyChallenge
  const startDailyChallenge = () => {
    if (!dailyQuestions) {
      console.error('No questions available');
      return;
    }

    dispatch({ type: 'START_GAME' });
    setShowDailyChallenge(true);
    setShowGameOver(false);

    // Reset sound flags
    hasPlayedWarningRef.current = false;
    hasPlayedUrgentRef.current = false;

    // Start timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      dispatch({ type: 'UPDATE_TIME', payload: state.gameSession.timeLeft - 1 });
      
      if (state.gameSession.timeLeft <= 1) {
        clearInterval(timerRef.current);
        handleGameOver();
      } else if (state.gameSession.timeLeft === 30 && !hasPlayedWarningRef.current) {
          playSound('timeWarning', 0.3);
          hasPlayedWarningRef.current = true;
      } else if (state.gameSession.timeLeft === 10 && !hasPlayedUrgentRef.current) {
          playSound('tick', 0.3);
          hasPlayedUrgentRef.current = true;
      } else if (state.gameSession.timeLeft <= 10) {
          playSound('tick', 0.1);
        }
    }, 1000);
  };

  // Update handleGameOver function
  const handleGameOver = () => {
    clearInterval(timerRef.current);
    
    // Calculate final score and dispatch completion
    dispatch({ 
      type: 'COMPLETE_DAILY_CHALLENGE', 
      payload: { 
        score: state.gameSession.score,
        timeLeft: state.gameSession.timeLeft 
      }
    });

    // Update UI state
      setShowGameOver(true);
      setShowDailyChallenge(false);
  };

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const startVocabPractice = () => {
    console.log('Starting vocab practice with words:', vocabWords); // Debug log
    const shuffledQuestions = shuffleArray([...vocabWords]);
    console.log('Shuffled questions:', shuffledQuestions); // Debug log
    setCurrentVocabQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setVocabAnswered(false);
    setIsCorrectVocab(false);
    setIsVocabModalOpen(true);
  };

  // Add this button click handler
  const handleVocabButtonClick = () => {
    startVocabPractice();
  };

  const handleVocabAnswer = (selectedChoice: string) => {
    if (!vocabAnswered) {
      const currentWord = currentVocabQuestions[currentQuestionIndex];
      const isCorrect = selectedChoice === currentWord.options[currentWord.correctIndex];
      setIsCorrectVocab(isCorrect);
      setVocabAnswered(true);
      playSound(isCorrect ? 'correct' : 'incorrect');
    }
  };

  const handleNextVocabQuestion = () => {
    if (currentQuestionIndex < currentVocabQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setVocabAnswered(false);
      setIsCorrectVocab(false);
    } else {
      setIsVocabModalOpen(false);
      setCurrentQuestionIndex(0);
      setVocabAnswered(false);
      setIsCorrectVocab(false);
    }
  };

  const startReadingPractice = () => {
    console.log('Starting reading practice'); // Debug log
    setIsReadingModalOpen(true);
    setCurrentPassageIndex(0);
    setCurrentReadingQuestionIndex(0);
  };

  const handleReadingAnswer = (index: number) => {
    if (!readingAnswered) {
    const currentPassage = readingPassages[currentPassageIndex];
    const currentQuestion = currentPassage.questions[currentReadingQuestionIndex];
      const isCorrect = index === currentQuestion.correctIndex;
      
      setIsCorrectReading(isCorrect);
      setReadingAnswered(true);
      
      // Award points for correct answers
      if (isCorrect) {
        addPoints(10);
        playSound('correct');
      } else {
        playSound('incorrect');
      }
    }
  };

  // Add a function to handle next reading question
  const handleNextReadingQuestion = () => {
    const currentPassage = readingPassages[currentPassageIndex];
    
    if (currentReadingQuestionIndex < currentPassage.questions.length - 1) {
      // Move to next question in current passage
      setCurrentReadingQuestionIndex(prev => prev + 1);
      setReadingAnswered(false);
      setIsCorrectReading(false);
    } else if (currentPassageIndex < readingPassages.length - 1) {
      // Move to next passage
      setCurrentPassageIndex(prev => prev + 1);
      setCurrentReadingQuestionIndex(0);
      setReadingAnswered(false);
      setIsCorrectReading(false);
    } else {
      // End of all passages
      setIsReadingModalOpen(false);
      setCurrentPassageIndex(0);
      setCurrentReadingQuestionIndex(0);
      setReadingAnswered(false);
      setIsCorrectReading(false);
    }
  };

  // Update the math button click handler
  const handleMathButtonClick = () => {
    const shuffledQuestions = shuffleArray([...mathProblems]);
    setCurrentMathQuestions(shuffledQuestions);
    setCurrentMathIndex(0);
    setMathAnswered(false);
    setIsCorrectMath(false);
    setIsMathModalOpen(true);
  };

  // Update handleMathAnswer to award points
  const handleMathAnswer = (selectedIndex: number) => {
    if (!mathAnswered) {
      const isCorrect = selectedIndex === currentMathQuestions[currentMathIndex].correctIndex;
      setIsCorrectMath(isCorrect);
      setMathAnswered(true);

      // Award points for correct answers
      if (isCorrect) {
        addPoints(10); // Award 10 points for each correct answer
        playSound('correct');
      } else {
        playSound('incorrect');
      }
    }
  };

  // Update handleNextMathQuestion to use currentMathQuestions
  const handleNextMathQuestion = () => {
    if (currentMathIndex < currentMathQuestions.length - 1) {
      setCurrentMathIndex(prev => prev + 1);
      setMathAnswered(false);
      setIsCorrectMath(false);
    } else {
      setIsMathModalOpen(false);
      setCurrentMathIndex(0);
      setMathAnswered(false);
      setIsCorrectMath(false);
    }
  };

  const handleSmartyPantsButtonClick = () => {
    const shuffledQuestions = shuffleArray([...smartyPantsProblems]);
    setCurrentSmartyPantsQuestions(shuffledQuestions);
    setCurrentSmartyPantsIndex(0);
    setSmartyPantsAnswered(false);
    setIsCorrectSmartyPants(false);
    setIsSmartyPantsModalOpen(true);
  };

  // Similarly update handleSmartyPantsAnswer
  const handleSmartyPantsAnswer = (selectedIndex: number) => {
    if (!smartyPantsAnswered) {
      const isCorrect = selectedIndex === currentSmartyPantsQuestions[currentSmartyPantsIndex].correctIndex;
      setIsCorrectSmartyPants(isCorrect);
      setSmartyPantsAnswered(true);

      // Award points for correct answers
      if (isCorrect) {
        addPoints(15); // Award 15 points for Smarty Pants (they're harder!)
        playSound('correct');
      } else {
        playSound('incorrect');
      }
    }
  };

  const handleNextSmartyPantsQuestion = () => {
    if (currentSmartyPantsIndex < currentSmartyPantsQuestions.length - 1) {
      setCurrentSmartyPantsIndex(prev => prev + 1);
      setSmartyPantsAnswered(false);
      setIsCorrectSmartyPants(false);
    } else {
      setIsSmartyPantsModalOpen(false);
      setCurrentSmartyPantsIndex(0);
      setSmartyPantsAnswered(false);
      setIsCorrectSmartyPants(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black to-gray-900">
      {/* Hamburger Menu */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 hover:bg-white/10 rounded-lg transition-colors"
        >
          <img src="/ham.png" alt="Menu" className="w-12 h-12" />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-white/10">
            {/* Points Display */}
            <div className="px-4 py-2 border-b border-white/10">
              <div className="text-yellow-400 font-bold">Points: {totalPoints}</div>
            </div>
            
            <button
              onClick={() => {
                setShowAboutModal(true);
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-white/10 text-gray-300 border-b border-white/10"
            >
              About WizKid
            </button>
            
            <button
              onClick={() => {
                setShowFAQModal(true);
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-white/10 text-gray-300 border-b border-white/10"
            >
              FAQ
            </button>

            {/* Reset Points Button */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your points? This cannot be undone.')) {
                  setTotalPoints(0);
                  savePoints(0);
                  setIsMenuOpen(false);
                }
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-400"
            >
              Reset Points
            </button>
          </div>
        )}
      </div>

      {/* About Modal with expanded description */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">About WizKid <span className="text-blue-400 text-sm ml-2">BETA</span></h2>
            <div className="space-y-4 text-gray-300">
              <p>
                WizKid is your daily learning companion, designed to help middle school students stay engaged and on track with their studies through fun, interactive challenges.
              </p>
              <p>
                Currently in BETA, WizKid features practice questions tailored for 6th and 7th grade levels across various subjects including math, vocabulary, and general knowledge.
              </p>
              <p>
                Our Daily Challenge feature offers a fresh set of questions each day, while the Practice section allows students to focus on specific subjects at their own pace.
              </p>
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto relative">
            {/* Add close button */}
            <button
              onClick={() => setShowFAQModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-400 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">What grade level are the questions?</h3>
                <p>Currently, WizKid's questions are tailored for 6th and 7th grade students. We're working on expanding our content to include more grade levels and difficulty options in future updates.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">How often are new questions added?</h3>
                <p>The Daily Challenge provides fresh questions every day. We regularly update our practice question bank to ensure variety and engagement.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Will there be more subjects and features?</h3>
                <p>Yes! We're actively developing new subjects, difficulty levels, and interactive features. Our roadmap includes customizable difficulty settings and expanded topic coverage.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">How does scoring work?</h3>
                <p>You earn points for correct answers, with bonus points for maintaining streaks in the Daily Challenge. Practice sessions help you learn but don't affect your score.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Is this a complete curriculum?</h3>
                <p>WizKid is designed as a supplementary learning tool to reinforce concepts and maintain academic engagement. It works best alongside regular schoolwork and instruction.</p>
              </div>
            </div>

            {/* Move close button to bottom */}
            <button
              onClick={() => setShowFAQModal(false)}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/WIZ KID.png" 
          alt="WIZ KID Logo" 
          className="w-72 h-auto"
        />
      </div>

      {/* Main Content - added pt-32 to create space below logo */}
      <div className="container mx-auto px-4 py-8 pt-32 relative z-10">
        <div className="space-y-8">


          {/* Stats and Categories Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
{/* Daily Challenge Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <Card className="relative overflow-hidden bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl">
                {/* Background Pattern with subtle animation */}
                <motion.div 
                  className="absolute inset-0 opacity-[0.08]"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ 
                    duration: 20, 
                    ease: "linear", 
                    repeat: Infinity 
                  }}
    style={{ 
      backgroundImage: `repeating-linear-gradient(
        45deg,
        #ffffff,
                      #ffffff 2px,
                      transparent 2px,
                      transparent 12px
      )`
    }}
  />
  
                {/* Content with hover animation */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/wizquizLogo.png" 
                alt="WizQuiz Challenge" 
                className="h-16"
              />
                        {state.dailyProgress.completed && (
                          <div className="flex items-center space-x-2 text-emerald-400">
                            <Star className="w-4 h-4" />
                            <span className="text-sm">Best Score: {state.dailyProgress.bestScore}</span>
                          </div>
                        )}
            </div>
            <button
              onClick={startDailyChallenge}
                        className={cn(
                          "px-6 py-2 backdrop-blur-sm border rounded-lg font-semibold transition-all hover:scale-105 flex items-center space-x-2",
                          state.dailyProgress.completed 
                            ? "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50 text-purple-400"
                            : "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/50 text-emerald-400"
                        )}
                      >
                        {state.dailyProgress.completed ? (
                          <>
              <Zap className="w-5 h-5" />
                          <span>Play Again</span>
                          </>
                        ) : (
                          <>
                            <Star className="w-5 h-5" />
              <span>Start Challenge</span>
                          </>
                        )}
            </button>
          </div>
        </CardContent>
                </motion.div>
      </Card>
            </motion.div>

            {/* Points Card - simplified */}
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl">
              <div className="p-4">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-yellow-400 text-3xl font-bold mb-1">
                      {totalPoints}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Wiz Points
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* WizSpeller Card - simplified */}
            <Card 
              onClick={() => setShowWordOfTheDay(true)}
              className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="p-4">
                <div className="text-center space-y-1">
                  <div className="text-purple-400 text-lg font-bold">WizSpeller</div>
                  <div className="text-gray-400 text-sm">Word of the Day</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Start / Focused Practice Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-100 mb-4">Focused Practice</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Vocabulary Button */}
              <button
                onClick={handleVocabButtonClick}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <MessageSquare className="w-6 h-6 mb-2 mx-auto text-blue-400" />
                <div className="text-sm font-medium text-gray-300">Vocabulary</div>
              </button>

              <button
                onClick={startReadingPractice}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <BookOpen className="w-6 h-6 mb-2 mx-auto text-blue-400" />
                <div className="text-sm font-medium text-gray-300">Reading</div>
              </button>

              <button
                onClick={handleMathButtonClick}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <Calculator className="w-6 h-6 mb-2 mx-auto text-blue-400" />
                <div className="text-sm font-medium text-gray-300">Math</div>
              </button>

              <button
                onClick={handleSmartyPantsButtonClick}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <Lightbulb className="w-6 h-6 mb-2 mx-auto text-yellow-400" />
                <div className="text-sm font-medium text-gray-300">Smarty Pants</div>
              </button>

              {/* Spelling Button (previously Word of the Day) */}
              <button
                onClick={() => setShowWordOfTheDay(true)}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <Pen className="w-6 h-6 mb-2 mx-auto text-purple-400" />
                <div className="text-sm font-medium text-gray-300">Spelling</div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Daily Challenge Modal */}
      {showDailyChallenge && currentQuestion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl max-w-2xl w-full p-8"
          >
            <div className="space-y-6">
              {/* Progress and Score Row */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-4"
              >
                <div className="text-emerald-400 font-semibold">
                  Question {questionNumber + 1} of 9
                </div>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={answered && isCorrect ? { scale: [1, 1.2, 1] } : {}}
                  className="text-yellow-400 font-semibold"
                >
                  Score: {state.gameSession.score}
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
              <h2 className="text-2xl font-bold text-white">{currentQuestion.question}</h2>
              {currentQuestion.context && (
                    <p className="text-gray-300 italic mt-2">{currentQuestion.context}</p>
              )}
                </motion.div>
              </AnimatePresence>

              <div className="space-y-4">
                <motion.div 
                  className="space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                {currentQuestion.options.map((option, index) => (
                    <motion.button
                    key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      answered
                        ? index === currentQuestion.correctIndex
                          ? 'bg-green-500/20 text-green-200'
                            : 'bg-gray-700 text-gray-400'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {option}
                    </motion.button>
                ))}
                </motion.div>
              </div>
              {answered && (
                <div className="mt-4">
                  <p className="text-gray-300">{currentQuestion.explanation}</p>
                  <button
                    onClick={() => {
                      if (questionNumber === 7) {
                        // Only show game over, don't update points here
                        setShowGameOver(true);
                        setShowDailyChallenge(false);
                      } else {
                        nextQuestion();
                      }
                    }}
                    className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold"
                  >
                    {questionNumber === 7 ? 'Finish Challenge' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Confetti />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gray-800 rounded-xl max-w-lg w-full p-8"
          >
            <motion.div 
              className="text-center space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-4xl font-bold text-emerald-400"
              >
                Challenge Complete! 🎉
              </motion.h2>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="py-8 space-y-4"
              >
                <div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                    +{state.gameSession.score}
                </div>
                  <div className="text-gray-400">Points Earned Today</div>
                  </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">
                    {totalPoints + state.gameSession.score}
              </div>
                  <div className="text-gray-400">Total WizQuiz Points</div>
                </div>
              </motion.div>

              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Update points before closing
                  const newTotal = totalPoints + state.gameSession.score;
                  console.log('Game Over - Updating points:', { 
                    currentTotal: totalPoints,
                    sessionScore: state.gameSession.score,
                    newTotal 
                  });
                  setTotalPoints(newTotal);
                  savePoints(newTotal);
                  // Reset game state
                  setShowGameOver(false);
                  if (nextQuestion) nextQuestion();
                  // Reset session score
                  dispatch({ type: 'RESET_SCORE' });
                }}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
              >
                Back to Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Vocabulary Practice Modal */}
      <AnimatePresence>
      {isVocabModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-gray-800 rounded-xl max-w-4xl w-full p-8"
            >
              {/* Add close button */}
              <button
                onClick={() => setIsVocabModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-400 mb-8">Vocabulary Practice</h2>
              
              {currentVocabQuestions.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-400">
                   Question {currentQuestionIndex + 1} of {currentVocabQuestions.length}
                </div>
                
                  <h3 className="text-2xl text-white font-bold">
                    What does <span className="text-emerald-400 font-bold">"{currentVocabQuestions[currentQuestionIndex].word}"</span> mean?
                </h3>

                <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`options-${currentQuestionIndex}`}
                        className="space-y-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                      >
                        {currentVocabQuestions[currentQuestionIndex].options.map((option, index) => (
                          <motion.button
                      key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            onClick={() => handleVocabAnswer(option)}
                            disabled={vocabAnswered}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                              vocabAnswered
                                ? index === currentVocabQuestions[currentQuestionIndex].correctIndex
                            ? 'bg-green-500/20 text-green-200'
                            : 'bg-gray-700/50 text-gray-400'
                          : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                      }`}
                    >
                      {option}
                          </motion.button>
                  ))}
                      </motion.div>
                    </AnimatePresence>
                </div>

                  {vocabAnswered && (
                  <div className="mt-4 space-y-4">
              <FeedbackAnimation isCorrect={isCorrectVocab}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-medium mb-4"
                >
                  {isCorrectVocab ? 'Correct! 🎉' : 'Not quite right. 🤔'}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-gray-400 text-sm">Example:</p>
                  <p className="mt-2 font-bold text-white text-2xl">
                    {currentVocabQuestions[currentQuestionIndex].example}
                  </p>
                </motion.div>
              </FeedbackAnimation>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={handleNextVocabQuestion}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                {currentQuestionIndex === currentVocabQuestions.length - 1 ? 'Finish Practice' : 'Next Question'}
              </motion.button>
                  </div>
                )}
              </div>
              ) : (
                <div className="text-white">No vocabulary questions available.</div>
            )}
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>

      {/* Reading Practice Modal */}
      {isReadingModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-gray-800 rounded-xl max-w-5xl w-full p-8 max-h-[90vh] overflow-y-auto">
            {/* Add close button */}
            <button
              onClick={() => setIsReadingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-400 mb-6">Reading Practice</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Passage on the left */}
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                Passage {currentPassageIndex + 1} of {readingPassages.length}
              </div>
              
                <div className="bg-gray-700/50 p-6 rounded-lg h-[calc(90vh-12rem)] overflow-y-auto">
                <p className="text-white text-lg leading-relaxed tracking-wide">
                  {readingPassages[currentPassageIndex].text}
                </p>
                </div>
              </div>

              {/* Questions on the right */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <QuestionTransition key={`${currentPassageIndex}-${currentReadingQuestionIndex}`}>
                    <h3 className="text-xl text-emerald-400 font-bold">
                  {readingPassages[currentPassageIndex].questions[currentReadingQuestionIndex].question}
                </h3>
                  </QuestionTransition>
                </AnimatePresence>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`options-${currentPassageIndex}-${currentReadingQuestionIndex}`}
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                  {readingPassages[currentPassageIndex].questions[currentReadingQuestionIndex].options.map((option, index) => (
                        <motion.button
                      key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                      onClick={() => handleReadingAnswer(index)}
                          disabled={readingAnswered}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            readingAnswered
                              ? index === readingPassages[currentPassageIndex].questions[currentReadingQuestionIndex].correctIndex
                                ? 'bg-green-500/20 text-green-200'
                                : 'bg-gray-700/50 text-gray-400'
                              : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                          }`}
                    >
                      {option}
                        </motion.button>
                  ))}
                    </motion.div>
                  </AnimatePresence>
            </div>

                {readingAnswered && (
                  <div className="mt-4 space-y-4">
                    <FeedbackAnimation isCorrect={isCorrectReading}>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-medium mb-4"
                      >
                        {isCorrectReading ? 'Correct! 🎉' : 'Not quite right. 🤔'}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-blue-400 text-lg mb-2">Explanation:</p>
                        <p className="text-lg">
                          {readingPassages[currentPassageIndex].questions[currentReadingQuestionIndex].explanation}
                        </p>
                      </motion.div>
                    </FeedbackAnimation>
                    
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={handleNextReadingQuestion}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                      {currentPassageIndex === readingPassages.length - 1 && 
                       currentReadingQuestionIndex === readingPassages[currentPassageIndex].questions.length - 1 
                        ? 'Finish Practice' 
                        : 'Next Question'}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Math Practice Modal */}
      {isMathModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
        >
          <div 
            className="relative bg-gray-800 rounded-xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Add close button */}
            <button
              onClick={() => setIsMathModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-400 mb-8">Math Practice</h2>
            
            {currentMathQuestions.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-400">
                  Question {currentMathIndex + 1} of {currentMathQuestions.length}
                </div>
                
                <h3 className="text-2xl text-emerald-400 font-bold">
                  {currentMathQuestions[currentMathIndex].question}
                </h3>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`options-${currentMathIndex}`}
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      {currentMathQuestions[currentMathIndex].options.map((option, index) => (
                        <motion.button
                      key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                      onClick={() => handleMathAnswer(index)}
                      disabled={mathAnswered}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                        mathAnswered
                              ? index === currentMathQuestions[currentMathIndex].correctIndex
                            ? 'bg-green-500/20 text-green-200'
                            : 'bg-gray-700/50 text-gray-400'
                          : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                      }`}
                    >
                      {option}
                        </motion.button>
                  ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {mathAnswered && (
                  <div className="mt-4 space-y-4">
                    <FeedbackAnimation isCorrect={isCorrectMath}>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-medium mb-4"
                      >
                        {isCorrectMath ? 'Correct! 🎉' : 'Not quite right. 🤔'}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-blue-400 text-lg mb-2">Explanation:</p>
                        <p className="text-lg">
                          {currentMathQuestions[currentMathIndex].explanation}
                        </p>
                      </motion.div>
                    </FeedbackAnimation>
                    
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={handleNextMathQuestion}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                      {currentMathIndex === currentMathQuestions.length - 1 ? 'Finish Practice' : 'Next Question'}
                    </motion.button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-white">No math questions available.</div>
            )}
          </div>
        </div>
      )}

      {/* Smarty Pants Modal */}
      {isSmartyPantsModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
          <div className="relative bg-gray-800 rounded-xl max-w-4xl w-full p-8">
            {/* Add close button */}
            <button
              onClick={() => setIsSmartyPantsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-400 mb-8">Smarty Pants</h2>
            
            {currentSmartyPantsQuestions.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-400">
                  Question {currentSmartyPantsIndex + 1} of {currentSmartyPantsQuestions.length}
                </div>
                
                <h3 className="text-2xl text-emerald-400 font-bold">
                  {currentSmartyPantsQuestions[currentSmartyPantsIndex].question}
                </h3>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`options-${currentSmartyPantsIndex}`}
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      {currentSmartyPantsQuestions[currentSmartyPantsIndex].options.map((option, index) => (
                        <motion.button
                      key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                      onClick={() => handleSmartyPantsAnswer(index)}
                      disabled={smartyPantsAnswered}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            smartyPantsAnswered
                              ? index === currentSmartyPantsQuestions[currentSmartyPantsIndex].correctIndex
                                ? 'bg-green-500/20 text-green-200'
                                : 'bg-gray-700/50 text-gray-400'
                              : 'bg-gray-700/50 hover:bg-gray-700/80 text-white'
                          }`}
                    >
                      {option}
                        </motion.button>
                  ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {smartyPantsAnswered && (
                  <div className="mt-4 space-y-4">
                    <FeedbackAnimation isCorrect={isCorrectSmartyPants}>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-medium mb-4"
                      >
                        {isCorrectSmartyPants ? 'Correct! 🎉' : 'Not quite right. 🤔'}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-blue-400 text-lg mb-2">Explanation:</p>
                        <p className="text-lg">
                          {currentSmartyPantsQuestions[currentSmartyPantsIndex].explanation}
                        </p>
                      </motion.div>
                    </FeedbackAnimation>
                    
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      onClick={handleNextSmartyPantsQuestion}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                      {currentSmartyPantsIndex === currentSmartyPantsQuestions.length - 1 ? 'Finish Practice' : 'Next Question'}
                    </motion.button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-white">No questions available.</div>
            )}
          </div>
        </div>
      )}

      {/* Word of the Day Modal */}
      <WordOfTheDay 
        isOpen={showWordOfTheDay}
        onClose={() => setShowWordOfTheDay(false)}
      />

      {/* Points Animation */}
      {showPointsAnimation && <PointsAnimation points={animationPoints} />}
    </div>
  );
};

export default SATPrep;