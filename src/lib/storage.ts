import { UserProgress, DailyProgress } from './types';

const STORAGE_KEY = 'brainTrain_progress';

export const loadProgress = (): UserProgress | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const progress = JSON.parse(stored) as UserProgress;
    // Check if it's a new day
    const today = new Date().toISOString().split('T')[0];
    if (progress.dailyChallenge.lastPlayed !== today) {
      // Reset daily challenge for new day
      progress.dailyChallenge = getInitialDailyProgress();
    }
    return progress;
  } catch (e) {
    console.error('Failed to parse stored progress:', e);
    return null;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

export const getInitialDailyProgress = (): DailyProgress => ({
  lastPlayed: new Date().toISOString().split('T')[0],
  completed: false,
  score: 0,
  correctAnswers: {
    math: 0,
    writing: 0,
    smartypants: 0
  },
  timeRemaining: 300,
  currentCategory: 'math',
  currentQuestionIndex: 0
});

export const getInitialProgress = (): UserProgress => ({
  points: 0,
  streak: 0,
  lastPlayed: new Date().toISOString().split('T')[0],
  dailyChallenge: getInitialDailyProgress(),
  completedQuestions: {
    vocab: [],
    math: [],
    reading: [],
    writing: [],
    smartypants: []
  }
}); 