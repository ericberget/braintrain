export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'elementary' | 'middle' | 'high';
  grade?: number;
  topic?: string;
  context?: string;
}

// Add other type definitions... 