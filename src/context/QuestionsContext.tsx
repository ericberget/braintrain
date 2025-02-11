import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { startOfDay } from 'date-fns';
import { Question } from '../types';
import { mathProblems, writingProblems, smartyPantsProblems } from '../data/questions';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/soundUtils';

interface QuestionsContextType {
  dailyQuestions: {
    math: Question[];
    writing: Question[];
    smartypants: Question[];
    date: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  refreshQuestions: () => void;
  currentQuestion: Question | null;
  questionNumber: number;
  answered: boolean;
  setAnswered: (value: boolean) => void;
  nextQuestion: () => void;
  handleAnswer: (selectedIndex: number) => void;
}

const QuestionsContext = createContext<QuestionsContextType | null>(null);

const POINTS_PER_CORRECT = 10;
const STREAK_BONUS_MULTIPLIER = 0.5;

export const QuestionsProvider = ({ children }: { children: ReactNode }) => {
  const [dailyQuestions, setDailyQuestions] = useState<QuestionsContextType['dailyQuestions']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answered, setAnswered] = useState(false);
  const { state, dispatch } = useGame();

  const getRandomForDay = (array: Question[], seed: number) => {
    const shuffled = [...array].sort((a, b) => {
      const hashA = (seed + a.question.length) % array.length;
      const hashB = (seed + b.question.length) % array.length;
      return hashA - hashB;
    });
    return shuffled.slice(0, 3); // Get 3 questions per category
  };

  const generateDailyQuestions = () => {
    try {
      const today = startOfDay(new Date()).toISOString();
      const dateSeed = parseInt(today.replace(/\D/g, ''));

      const questions = {
        math: getRandomForDay(mathProblems, dateSeed),
        writing: getRandomForDay(writingProblems, dateSeed),
        smartypants: getRandomForDay(smartyPantsProblems, dateSeed),
        date: today
      };

      setDailyQuestions(questions);
      setError(null);
    } catch (err) {
      setError('Failed to generate daily questions');
      console.error('Error generating questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (!dailyQuestions) return;
    
    const allQuestions = [
      ...dailyQuestions.math,
      ...dailyQuestions.writing,
      ...dailyQuestions.smartypants
    ];

    const nextNum = questionNumber + 1;
    if (nextNum >= allQuestions.length) {
      dispatch({ type: 'END_GAME' });
    } else {
      setQuestionNumber(nextNum);
      setCurrentQuestion(allQuestions[nextNum]);
      setAnswered(false);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    if (answered || !currentQuestion) return;
    
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const streakBonus = Math.floor(POINTS_PER_CORRECT * (state.userStats.streak * STREAK_BONUS_MULTIPLIER));
    const pointsEarned = isCorrect ? POINTS_PER_CORRECT + streakBonus : 0;
    
    if (isCorrect) {
      dispatch({ type: 'UPDATE_SCORE', payload: pointsEarned });
      playSound('correct');
    } else {
      playSound('incorrect');
    }
    
    setAnswered(true);
  };

  useEffect(() => {
    console.log('QuestionsProvider mounted');
    try {
      generateDailyQuestions();
    } catch (err) {
      console.error('Error in QuestionsProvider:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  useEffect(() => {
    console.log('dailyQuestions updated:', dailyQuestions);
    if (dailyQuestions) {
      const allQuestions = [
        ...dailyQuestions.math,
        ...dailyQuestions.writing,
        ...dailyQuestions.smartypants
      ];
      console.log('Setting initial question:', allQuestions[0]);
      setCurrentQuestion(allQuestions[0]);
    }
  }, [dailyQuestions]);

  return (
    <QuestionsContext.Provider 
      value={{
        dailyQuestions,
        isLoading,
        error,
        refreshQuestions: generateDailyQuestions,
        currentQuestion,
        questionNumber,
        answered,
        setAnswered,
        nextQuestion,
        handleAnswer
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
}; 