// First, let's create a types file for better organization
export interface DailyProgress {
  lastPlayed: string;
  completed: boolean;
  score: number;
  correctAnswers: {
    math: number;
    writing: number;
    smartypants: number;
  };
  timeRemaining: number;
  currentCategory: 'math' | 'writing' | 'smartypants';
  currentQuestionIndex: number;
}

export interface UserProgress {
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