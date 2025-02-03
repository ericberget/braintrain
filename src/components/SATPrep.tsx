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
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { startOfDay } from 'date-fns';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'elementary' | 'middle' | 'high';
  grade?: number;
  topic?: string;
  context?: string;
}

const mathQuestions: Question[] = [
  {
    question: "Solve: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctIndex: 1,
    explanation: "To solve, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
    topic: "algebra",
    grade: 7
  },
  // ... rest of math questions
];

const writingQuestions: Question[] = [
  {
    question: "Which sentence uses correct punctuation?",
    options: [
      "The cat slept on the windowsill, it was sunny.",
      "The cat slept on the windowsill; it was sunny.",
      "The cat slept on the windowsill it was sunny.",
      "The cat slept on the windowsill... it was sunny."
    ],
    correctIndex: 1,
    explanation: "A semicolon correctly joins two related independent clauses.",
    topic: "punctuation",
    grade: 7
  },
  // Add at least one more writing question
];

const smartypantsQuestions: Question[] = [
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correctIndex: 1,
    explanation: "Tokyo is the capital city of Japan.",
    topic: "geography",
    grade: 6
  },
  // Add at least one more smartypants question
];

const vocabWords = [
  {
    word: 'Emerge',
    options: [
      'To stay hidden',
      'To come out or appear',
      'To go back in',
      'To disappear'
    ],
    correctIndex: 1,
    example: 'The butterfly emerged from its cocoon.'
  },
  {
    word: 'Ancient',
    options: [
      'New and modern',
      'Very old',
      'From last year',
      'Currently happening'
    ],
    correctIndex: 1,
    example: 'The ancient pyramids were built thousands of years ago.'
  },
  {
    word: 'Vacant',
    options: [
      'Full of people',
      'Empty or unused',
      'Very busy',
      'Crowded'
    ],
    correctIndex: 1,
    example: 'The vacant seat was available for anyone to use.'
  },
  {
    word: 'Rapid',
    options: [
      'Very slow',
      'Quick and fast',
      'Steady and careful',
      'Stopping often'
    ],
    correctIndex: 1,
    example: 'The rapid river moved quickly over the rocks.'
  },
  {
    word: 'Delicate',
    options: [
      'Very strong',
      'Easily broken or damaged',
      'Heavy and solid',
      'Rough and tough'
    ],
    correctIndex: 1,
    example: 'The delicate glass vase needed careful handling.'
  },
  {
    word: 'Fragment',
    options: [
      'A whole piece',
      'A broken piece or part',
      'A large amount',
      'A complete set'
    ],
    correctIndex: 1,
    example: 'We found a fragment of the broken plate.'
  },
  {
    word: 'Migrate',
    options: [
      'To stay in one place',
      'To move to a new area',
      'To build a nest',
      'To sleep all winter'
    ],
    correctIndex: 1,
    example: 'Birds migrate south for the winter.'
  },
  {
    word: 'Summit',
    options: [
      'The bottom',
      'The highest point',
      'The middle',
      'The entrance'
    ],
    correctIndex: 1,
    example: 'They reached the summit of the mountain.'
  },
  {
    word: 'Descend',
    options: [
      'To climb up',
      'To go down',
      'To stay level',
      'To move sideways'
    ],
    correctIndex: 1,
    example: 'We descended the stairs to the basement.'
  },
  {
    word: 'Dozen',
    options: [
      'A single item',
      'Twelve of something',
      'Half of something',
      'Twenty of something'
    ],
    correctIndex: 1,
    example: 'A dozen eggs fills the carton.'
  },
  {
    word: 'Flock',
    options: [
      'One bird alone',
      'A group of birds together',
      'A single sheep',
      'A type of cloud'
    ],
    correctIndex: 1,
    example: 'A flock of geese flew overhead.'
  },
  {
    word: 'Consume',
    options: [
      'To throw away',
      'To eat or use up',
      'To save for later',
      'To give away'
    ],
    correctIndex: 1,
    example: 'The fire consumed all the wood.'
  },
  {
    word: 'Parallel',
    options: [
      'Lines that cross',
      'Lines that never meet',
      'Lines that curve',
      'Lines that touch'
    ],
    correctIndex: 1,
    example: 'Railroad tracks are parallel lines.'
  },
  {
    word: 'Transparent',
    options: [
      'Impossible to see through',
      'Easy to see through',
      'Completely solid',
      'Very colorful'
    ],
    correctIndex: 1,
    example: 'The window glass is transparent.'
  },
  {
    word: 'Vertical',
    options: [
      'Lying flat',
      'Standing straight up and down',
      'At an angle',
      'Curved around'
    ],
    correctIndex: 1,
    example: 'The flag pole stands vertical to the ground.'
  },
  {
    word: 'Enormous',
    options: [
      'Tiny and small',
      'Huge and very large',
      'Medium sized',
      'Regular sized'
    ],
    correctIndex: 1,
    example: 'The enormous elephant was bigger than a car.'
  },
  {
    word: 'Dense',
    options: [
      'Light and airy',
      'Thick and packed together',
      'Spread out',
      'Empty inside'
    ],
    correctIndex: 1,
    example: 'The dense forest was hard to walk through.'
  },
  {
    word: 'Shallow',
    options: [
      'Very deep',
      'Not deep',
      'Empty',
      'Overflowing'
    ],
    correctIndex: 1,
    example: 'The shallow end of the pool is safe for small children.'
  },
  {
    word: 'Soar',
    options: [
      'To crawl slowly',
      'To fly high',
      'To swim underwater',
      'To walk quickly'
    ],
    correctIndex: 1,
    example: 'Eagles soar high in the sky.'
  },
  {
    word: 'Colony',
    options: [
      'A single animal',
      'A group living together',
      'A empty place',
      'A type of plant'
    ],
    correctIndex: 1,
    example: 'Ants live together in a colony.'
  },
  {
    word: 'Orbit',
    options: [
      'To stay still',
      'To move around something',
      'To fall down',
      'To jump up'
    ],
    correctIndex: 1,
    example: 'The Earth orbits around the Sun.'
  },
  {
    word: 'Toxic',
    options: [
      'Very healthy',
      'Poisonous or harmful',
      'Clean and pure',
      'Safe to eat'
    ],
    correctIndex: 1,
    example: 'The toxic waste was dangerous to touch.'
  },
  {
    word: 'Swarm',
    options: [
      'A single bug',
      'A large moving group',
      'A quiet crowd',
      'An empty space'
    ],
    correctIndex: 1,
    example: 'A swarm of bees surrounded the hive.'
  },
  {
    word: 'Camouflage',
    options: [
      'To stand out',
      'To blend in with surroundings',
      'To glow brightly',
      'To make noise'
    ],
    correctIndex: 1,
    example: "The lizard's camouflage helps it hide from predators."
  },
  {
    word: 'Grove',
    options: [
      'A single tree',
      'A group of trees',
      'A flower garden',
      'A grassy field'
    ],
    correctIndex: 1,
    example: 'We had a picnic in the orange grove.'
  },
  {
    word: 'Drift',
    options: [
      'To move quickly',
      'To move slowly with no direction',
      'To stay in place',
      'To sink quickly'
    ],
    correctIndex: 1,
    example: 'The leaves drift slowly to the ground.'
  },
  {
    word: 'Arctic',
    options: [
      'Very hot',
      'Very cold',
      'Mild temperature',
      'Rainy weather'
    ],
    correctIndex: 1,
    example: 'Polar bears live in arctic regions.'
  },
  {
    word: 'Barrier',
    options: [
      'An open path',
      'Something that blocks the way',
      'A welcome sign',
      'A clear road'
    ],
    correctIndex: 1,
    example: 'The fence was a barrier around the yard.'
  },
  {
    word: 'Blend',
    options: [
      'To separate things',
      'To mix things together',
      'To break apart',
      'To keep away'
    ],
    correctIndex: 1,
    example: 'The chef will blend the ingredients together.'
  },
  {
    word: 'Perch',
    options: [
      'To lie down',
      'To sit on something high',
      'To swim deep',
      'To run fast'
    ],
    correctIndex: 1,
    example: 'The bird found a perch on the telephone wire.'
  },
  {
    word: 'Harvest',
    options: [
      'To plant seeds',
      'To gather crops',
      'To water plants',
      'To dig holes'
    ],
    correctIndex: 1,
    example: 'Farmers harvest their corn in the fall.'
  },
  {
    word: 'Lecture',
    options: [
      'To listen quietly',
      'To teach by speaking',
      'To read silently',
      'To write notes'
    ],
    correctIndex: 1,
    example: 'The professor gave a lecture about history.'
  },
  {
    word: 'Symbol',
    options: [
      'A long word',
      'A sign representing something',
      'A full sentence',
      'A page of text'
    ],
    correctIndex: 1,
    example: 'A heart symbol means love.'
  },
  {
    word: 'Sprout',
    options: [
      'To die away',
      'To begin to grow',
      'To fall down',
      'To dry up'
    ],
    correctIndex: 1,
    example: 'The seeds will sprout into plants.'
  },
  {
    word: 'Huddle',
    options: [
      'To spread out',
      'To crowd close together',
      'To run away',
      'To stand alone'
    ],
    correctIndex: 1,
    example: 'The team will huddle to discuss their plan.'
  },
  {
    word: 'Permanent',
    options: [
      'Lasting a short time',
      'Lasting forever',
      'Changing often',
      'Disappearing quickly'
    ],
    correctIndex: 1,
    example: "The permanent marker won't wash off."
  },
  {
    word: 'Valuable',
    options: [
      'Worth nothing',
      'Worth a lot',
      'Very common',
      'Easily replaced'
    ],
    correctIndex: 1,
    example: 'The diamond ring was very valuable.'
  },
  {
    word: 'Horizon',
    options: [
      'The ground below',
      'Where sky meets earth',
      'Top of a mountain',
      'Bottom of the sea'
    ],
    correctIndex: 1,
    example: 'The sun set at the horizon.'
  },
  {
    word: 'Moisture',
    options: [
      'Very dry',
      'Wetness or water',
      'Hot and sunny',
      'Cold and frozen'
    ],
    correctIndex: 1,
    example: 'Plants need moisture to grow.'
  },
  {
    word: 'Glimpse',
    options: [
      'A long look',
      'A quick look',
      'To stare at',
      'To ignore'
    ],
    correctIndex: 1,
    example: 'We caught a glimpse of the deer running away.'
  },
  {
    word: 'Sturdy',
    options: [
      'Weak and fragile',
      'Strong and well-built',
      'Light and delicate',
      'Broken down'
    ],
    correctIndex: 1,
    example: 'The sturdy bridge held many cars.'
  },
  {
    word: 'Ripple',
    options: [
      'Still water',
      'Small waves',
      'Frozen ice',
      'Dry land'
    ],
    correctIndex: 1,
    example: 'Ripples spread across the pond.'
  },
  {
    word: 'Brilliant',
    options: [
      'Very dull',
      'Very bright or smart',
      'Dark and dim',
      'Ordinary'
    ],
    correctIndex: 1,
    example: 'The brilliant diamond sparkled in the light.'
  },
  {
    word: 'Gather',
    options: [
      'To scatter away',
      'To come together',
      'To leave quickly',
      'To stay alone'
    ],
    correctIndex: 1,
    example: 'The family will gather for dinner.'
  },
  {
    word: 'Microscopic',
    options: [
      'Very large',
      'Too small to see without help',
      'Medium sized',
      'Easily visible'
    ],
    correctIndex: 1,
    example: 'Bacteria are microscopic organisms.'
  }
];

const readingPassages = [
  {
    title: "The Scientific Method",
    text: `The scientific method is a systematic approach used by scientists to investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge. It consists of several steps: observation, question formulation, hypothesis development, prediction, testing, and analysis.

    The process begins with careful observation of a phenomenon. Scientists then formulate questions about their observations and develop hypotheses—tentative explanations that can be tested. These hypotheses lead to predictions that can be investigated through controlled experiments. The results of these experiments either support or contradict the original hypothesis, leading to refinement of scientific understanding.`,
    questions: [
      {
        question: "What is the primary purpose of the scientific method?",
        options: [
          "To prove existing theories correct",
          "To systematically investigate and understand phenomena",
          "To develop new technologies",
          "To document observations only"
        ],
        correctIndex: 1,
        explanation: "The passage states that the scientific method is used to 'investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge.'"
      },
      {
        question: "According to the passage, what follows hypothesis development?",
        options: [
          "Observation",
          "Question formulation",
          "Prediction",
          "Analysis"
        ],
        correctIndex: 2,
        explanation: "The passage lists the steps in order, with prediction following hypothesis development."
      }
    ]
  },
  {
    title: "The Great Depression",
    text: `The Great Depression was a severe worldwide economic downturn that began in 1929 and lasted until the late 1930s. It was the longest and most severe depression ever experienced by the industrialized world. The economic crisis originated in the United States but quickly spread globally.

    The depression had devastating effects on both rich and poor countries. Personal income, tax revenue, profits, and prices dropped dramatically. International trade fell by more than 50%, and unemployment in the United States rose to 25%. Construction projects halted, farm prices fell by roughly 60%, and manufacturing output plunged.`,
    questions: [
      {
        question: "What aspect of the Great Depression does the passage emphasize?",
        options: [
          "Its political causes",
          "Its global impact",
          "Its effect on agriculture only",
          "Its resolution"
        ],
        correctIndex: 1,
        explanation: "The passage emphasizes the worldwide impact of the Depression, mentioning its effects on both rich and poor countries and international trade."
      },
      {
        question: "Based on the passage, which sector was NOT directly mentioned as being affected?",
        options: [
          "Manufacturing",
          "Construction",
          "Agriculture",
          "Education"
        ],
        correctIndex: 3,
        explanation: "The passage mentions effects on manufacturing, construction, and farming, but does not directly mention education."
      }
    ]
  }
];

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
  score: number;
  timeRemaining: number;
  currentCategory: keyof CategoryScores;
  correctAnswers: CategoryScores;
  lastPlayed: string; // Add this missing property
  currentQuestionIndex: number;
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
              <div className="text-gray-400">Points Earned</div>
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

const SATPrep = () => {
  const [currentCategory, setCurrentCategory] = useState<'math' | 'writing' | 'smartypants'>('math');
  const [dailyQuestions, setDailyQuestions] = useState<DailyQuestions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('daily');
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef<NodeJS.Timeout>();
  const hasPlayedWarningRef = useRef(false);
  const hasPlayedUrgentRef = useRef(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    try {
      const questions = getDailyQuestions();
      if (questions) {
        setDailyQuestions(questions);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsLoading(false);
    }
  }, []);

  const getRandomForDay = (category: string, max: number) => {
    const today = startOfDay(new Date());
    const seed = today.getTime() + category.charCodeAt(0);
    return Math.abs(Math.floor((seed / 10000) % max));
  };

  const getDailyQuestions = (): DailyQuestions | null => {
    try {
      if (!mathQuestions?.length || !writingQuestions?.length || !smartypantsQuestions?.length) {
        console.error('Question arrays not properly loaded');
        return null;
      }
      
      return {
        math: mathQuestions[getRandomForDay('math', mathQuestions.length)],
        writing: writingQuestions[getRandomForDay('writing', writingQuestions.length)],
        smartypants: smartypantsQuestions[getRandomForDay('smartypants', smartypantsQuestions.length)]
      };
    } catch (error) {
      console.error('Error getting daily questions:', error);
      return null;
    }
  };

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

  const startDailyChallenge = () => {
    // Reset sound effect flags
    hasPlayedWarningRef.current = false;
    hasPlayedUrgentRef.current = false;
    
    // Get 3 questions from each category
    const mathQuestions = shuffleArray(mathProblems).slice(0, 3);
    const writingQuestions = shuffleArray(writingProblems).slice(0, 3);
    const smartyQuestions = shuffleArray(smartyPantsProblems).slice(0, 3);

    // Combine and shuffle all questions
    const allQuestions = shuffleArray([...mathQuestions, ...writingQuestions, ...smartyQuestions]);
    
    setGameQuestions(allQuestions);
    setQuestionNumber(0);
    setScore(0);
    setShowDailyChallenge(true);
    setCurrentQuestion(allQuestions[0]);
    setAnswered(false);
    setShowGameOver(false);
    setTimeLeft(120);

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 30 && !hasPlayedWarningRef.current) {
          playSound('timeWarning', 0.3);
          hasPlayedWarningRef.current = true;
        }
        if (prev === 10 && !hasPlayedUrgentRef.current) {
          playSound('tick', 0.3);
          hasPlayedUrgentRef.current = true;
        }
        if (prev <= 1) {
          clearInterval(timerRef.current);
          playSound('timeUp', 0.4);
          setShowGameOver(true);
          setShowDailyChallenge(false);
          return 0;
        }
        if (prev <= 10) {
          playSound('tick', 0.1);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (answered || !currentQuestion) return;
    
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 10);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    const nextNum = questionNumber + 1;
    if (nextNum >= gameQuestions.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setShowGameOver(true);
      setShowDailyChallenge(false);
    } else {
      setQuestionNumber(nextNum);
      setCurrentQuestion(gameQuestions[nextNum]);
      setAnswered(false);
    }
  };

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black to-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
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
          className="w-48 h-auto"
        />
      </div>

      {/* Main Content - added pt-32 to create space below logo */}
      <div className="container mx-auto px-4 py-8 pt-32 relative z-10">
        <div className="space-y-8">
          {/* Stats and Categories Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

{/* Daily Challenge Card */}
<Card className="relative overflow-hidden bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl lg:col-span-3">
  {/* Background Pattern */}
  <div 
    className="absolute inset-0 opacity-[0.03]" 
    style={{ 
      backgroundImage: `repeating-linear-gradient(
        45deg,
        #ffffff,
        #ffffff 1px,
        transparent 1px,
        transparent 10px
      )`
    }}
  />
  
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/wizquizLogo.png" 
                alt="WizQuiz Challenge" 
                className="h-16"
              />
            </div>
            <button
              onClick={startDailyChallenge}
              className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-sm border border-emerald-500/50 rounded-lg font-semibold transition-all hover:scale-105 text-emerald-400 flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Start Challenge</span>
            </button>
          </div>
        </CardContent>
      </Card>
            {/* Combined Stats Card */}
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl lg:col-span-2">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-400">
                      {userProgress.points}
                    </div>
                    <div className="text-xs text-gray-300">Points</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-400">
                      {userProgress.streak}
                    </div>
                    <div className="text-xs text-gray-300">Streak</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">
                      {Math.floor(userProgress.points / 100)}
                    </div>
                    <div className="text-xs text-gray-300">Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

           

 
          </div>

          {/* Quick Start / Focused Practice Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-100 mb-4">Focused Practice</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { key: 'vocabulary', title: 'Vocabulary', icon: <GraduationCap className="w-6 h-6" /> },
                { key: 'math', title: 'Math', icon: <Calculator className="w-6 h-6" /> },
                { key: 'comprehension', title: 'Reading', icon: <BookOpen className="w-6 h-6" /> },
                { key: 'writing', title: 'Writing', icon: <Pen className="w-6 h-6" /> },
                { key: 'smartypants', title: 'Smarty Pants', icon: <Lightbulb className="w-6 h-6" /> }
              ].map(({ key, title, icon }) => (
                <button
                  key={key}
                  onClick={() => handleSectionChange(key)}
                  className="p-6 rounded-lg bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-all hover:scale-105 text-center group"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 rounded-full bg-black/30 group-hover:bg-black/40 transition-colors">
                      {icon}
                    </div>
                    <span className="font-medium text-gray-200">{title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge Modal */}
      {showDailyChallenge && currentQuestion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          {/* Logo above modal */}
          <div className="mb-6">
            <img 
              src="/WIZ KID.png" 
              alt="WIZ KID Logo" 
              className="w-64 h-auto"
            />
          </div>

          {/* Question Modal */}
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-8">
            <div className="space-y-6">
              {/* Progress, Score, and Timer Row */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-emerald-400 font-semibold">
                  Question {questionNumber + 1} of 9
                </div>
                <div className="text-yellow-400 font-semibold">
                  Score: {score}
                </div>
                <div className={cn(
                  "font-mono text-2xl font-bold",
                  timeLeft <= 10 
                    ? "text-red-500" 
                    : timeLeft <= 30 
                      ? "text-yellow-400" 
                      : "text-blue-400"
                )}>
                  {formatTime(timeLeft)}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white">{currentQuestion.question}</h2>
              {currentQuestion.context && (
                <p className="text-gray-300 italic">{currentQuestion.context}</p>
              )}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={cn(
                      "w-full p-4 rounded-lg text-left transition-colors",
                      answered
                        ? index === currentQuestion.correctIndex
                          ? "bg-green-500/20 text-green-200"
                          : "bg-gray-700 text-gray-400"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answered && (
                <div className="mt-4">
                  <p className="text-gray-300">{currentQuestion.explanation}</p>
                  <button
                    onClick={nextQuestion}
                    className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold"
                  >
                    {questionNumber === gameQuestions.length - 1 ? 'Finish' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-lg w-full p-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-emerald-400">
                {timeLeft === 0 ? "Time's Up! ⏰" : "Challenge Complete! 🎉"}
              </h2>
              <div className="py-8">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {score}
                </div>
                <div className="text-gray-400">Points Earned</div>
                {timeLeft > 0 && (
                  <div className="text-blue-400 mt-2">
                    Completed with {formatTime(timeLeft)} remaining!
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowGameOver(false)}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SATPrep;

// Add these back near the top of the file, after the interfaces
const mathProblems = [
  {
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctIndex: 1,
    explanation: "To find 25% of 80, multiply 80 by 0.25 or divide by 4: 80 × 0.25 = 20"
  },
  {
    question: "Solve: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctIndex: 1,
    explanation: "To solve, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
  },
  {
    question: "What is -8 + (-3)?",
    options: ["-11", "-5", "5", "11"],
    correctIndex: 0,
    explanation: "When adding two negative numbers, add their absolute values and keep the negative sign: |-8| + |-3| = 8 + 3 = 11, so -8 + (-3) = -11"
  },
  {
    question: "Simplify: (3 × 4) + (2 × 5)",
    options: ["22", "24", "26", "28"],
    correctIndex: 0,
    explanation: "(3 × 4) + (2 × 5) = 12 + 10 = 22"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctIndex: 2,
    explanation: "12 × 12 = 144, so √144 = 12"
  }
];

const writingProblems = [
  {
    question: "Choose the correct form of the verb:",
    context: "Yesterday, she _____ to the store.",
    options: ["go", "goes", "went", "going"],
    correctIndex: 2,
    explanation: "In past tense, the irregular verb 'go' becomes 'went'"
  },
  {
    question: "Which sentence uses correct punctuation?",
    options: [
      "The cat slept on the windowsill, it was sunny.",
      "The cat slept on the windowsill; it was sunny.",
      "The cat slept on the windowsill it was sunny.",
      "The cat slept on the windowsill... it was sunny."
    ],
    correctIndex: 1,
    explanation: "A semicolon correctly joins two related independent clauses."
  },
  {
    question: "Choose the sentence with correct subject-verb agreement:",
    options: [
      "The group of students were talking loudly.",
      "The group of students was talking loudly.",
      "The group of students is talking loudly.",
      "The group of students be talking loudly."
    ],
    correctIndex: 1,
    explanation: "'Group' is a singular collective noun, so it takes the singular verb 'was'."
  },
  {
    question: "Which word correctly completes this sentence? 'The cake smells _____ good!'",
    options: [
      "real",
      "really",
      "very much",
      "much more"
    ],
    correctIndex: 1,
    explanation: "We need an adverb (really) to modify the adjective 'good'."
  },
  {
    question: "Identify the sentence with correct pronoun usage:",
    options: [
      "Me and Tom went to the movie.",
      "Tom and me went to the movie.",
      "Tom and I went to the movie.",
      "Tom and myself went to the movie."
    ],
    correctIndex: 2,
    explanation: "Use 'I' as part of the subject of a sentence. Also, put the other person's name first."
  },
  {
    question: "Which sentence uses commas correctly?",
    options: [
      "I packed sandwiches chips, cookies and juice for lunch.",
      "I packed sandwiches, chips cookies, and juice for lunch.",
      "I packed, sandwiches, chips, cookies, and juice for lunch.",
      "I packed sandwiches, chips, cookies, and juice for lunch."
    ],
    correctIndex: 3,
    explanation: "In a list of items, use commas between each item and include the Oxford comma before 'and'."
  },
  {
    question: "Choose the correct homophone: 'The dog wagged ___ tail.'",
    options: [
      "its",
      "it's",
      "its'",
      "its's"
    ],
    correctIndex: 0,
    explanation: "'Its' is the possessive form, while 'it's' is a contraction of 'it is'."
  }
];

const smartyPantsProblems = [
  {
    question: "Which of these inventions came first?",
    options: [
      "Television",
      "Telephone",
      "Internet",
      "Radio"
    ],
    correctIndex: 1,
    explanation: "The telephone was invented by Alexander Graham Bell in 1876, before the radio (1895), television (1920s), and internet (1960s)."
  },
  {
    question: "If a train travels 60 miles per hour, how far will it travel in 2.5 hours?",
    options: [
      "120 miles",
      "150 miles",
      "180 miles",
      "200 miles"
    ],
    correctIndex: 1,
    explanation: "Multiply speed (60) by time (2.5): 60 × 2.5 = 150 miles"
  },
  {
    question: "Which continent has the most countries?",
    options: [
      "Asia",
      "Africa",
      "Europe",
      "South America"
    ],
    correctIndex: 1,
    explanation: "Africa has 54 countries, more than any other continent."
  },
  {
    question: "What causes a rainbow to appear?",
    options: [
      "Heat from the sun",
      "Clouds moving together",
      "Light reflecting off water droplets",
      "Wind patterns"
    ],
    correctIndex: 2,
    explanation: "Rainbows appear when sunlight reflects and refracts (bends) through water droplets in the air."
  },
  {
    question: "Which of these animals is NOT a mammal?",
    options: [
      "Dolphin",
      "Bat",
      "Salamander",
      "Kangaroo"
    ],
    correctIndex: 2,
    explanation: "A salamander is an amphibian, while all the others are mammals that give birth to live young and produce milk."
  },
  {
    question: "What was the main purpose of the Great Wall of China?",
    options: [
      "To create a trade route",
      "To protect against invasions",
      "To store water",
      "To display wealth"
    ],
    correctIndex: 1,
    explanation: "The Great Wall was built primarily as a defensive fortification to protect Chinese states from nomadic invasions."
  },
  {
    question: "If you face east and turn clockwise 270 degrees, which direction are you facing?",
    options: [
      "North",
      "South",
      "East",
      "West"
    ],
    correctIndex: 0,
    explanation: "Starting east, turning clockwise 270° means: east → south (90°) → west (180°) → north (270°)"
  },
  {
    question: "Which of these is a renewable resource?",
    options: [
      "Coal",
      "Natural gas",
      "Solar energy",
      "Oil"
    ],
    correctIndex: 2,
    explanation: "Solar energy is renewable because it naturally replenishes daily, unlike fossil fuels like coal, oil, and natural gas."
  },
  {
    question: "What makes sound travel faster?",
    options: [
      "Colder temperature",
      "Higher altitude",
      "Denser material",
      "Larger space"
    ],
    correctIndex: 2,
    explanation: "Sound travels faster through denser materials because the molecules are closer together and can transfer vibrations more quickly."
  },
  {
    question: "During the American Revolution, which country helped the colonies fight Britain?",
    options: [
      "Spain",
      "France",
      "Germany",
      "Italy"
    ],
    correctIndex: 1,
    explanation: "France was a key ally during the American Revolution, providing military and financial support."
  },
  {
    question: "What's the difference between weather and climate?",
    options: [
      "They're the same thing",
      "Weather is short-term, climate is long-term",
      "Weather is only about rain",
      "Climate is only about temperature"
    ],
    correctIndex: 1,
    explanation: "Weather describes day-to-day conditions, while climate describes average conditions over many years."
  },
  {
    question: "Which ancient civilization built the pyramids of Giza?",
    options: [
      "The Romans",
      "The Greeks",
      "The Egyptians",
      "The Mayans"
    ],
    correctIndex: 2,
    explanation: "The ancient Egyptians built the pyramids of Giza around 2500 BCE as tombs for their pharaohs."
  }
];

const userProgress = {
  points: 0,
  streak: 0,
  lastPlayed: '',
  dailyChallenge: {
    completed: false,
    score: 0,
    timeRemaining: 0,
    currentCategory: 'math',
    correctAnswers: {
      math: 0,
      writing: 0,
      smartypants: 0
    }
  }
};

 