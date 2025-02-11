import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { startOfDay } from 'date-fns';

interface GameState {
  userStats: {
    totalPoints: number;
    streak: number;
    lastPlayed: string;
  };
  dailyProgress: {
    completed: boolean;
    bestScore: number;
    lastPlayedAt: string;
  };
  gameSession: {
    isActive: boolean;
    currentQuestion: number;
    score: number;
    timeLeft: number;
  };
}

type GameAction = 
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'COMPLETE_DAILY_CHALLENGE'; payload: { score: number; timeLeft: number } }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'LOAD_SAVED_STATE'; payload: GameState };

const initialState: GameState = {
  userStats: {
    totalPoints: 0,
    streak: 0,
    lastPlayed: ''
  },
  dailyProgress: {
    completed: false,
    bestScore: 0,
    lastPlayedAt: ''
  },
  gameSession: {
    isActive: false,
    currentQuestion: 0,
    score: 0,
    timeLeft: 120
  }
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          score: state.gameSession.score + action.payload
        }
      };
    case 'COMPLETE_DAILY_CHALLENGE':
      const today = startOfDay(new Date()).toISOString();
      return {
        ...state,
        userStats: {
          totalPoints: state.userStats.totalPoints + action.payload.score,
          streak: state.userStats.streak + 1,
          lastPlayed: today
        },
        dailyProgress: {
          completed: true,
          bestScore: Math.max(state.dailyProgress.bestScore, action.payload.score),
          lastPlayedAt: today
        },
        gameSession: {
          ...state.gameSession,
          isActive: false,
          timeLeft: action.payload.timeLeft
        }
      };
    case 'START_GAME':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          isActive: true,
          currentQuestion: 0,
          score: 0,
          timeLeft: 120
        }
      };
    case 'END_GAME':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          isActive: false
        }
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        gameSession: {
          ...state.gameSession,
          timeLeft: action.payload
        }
      };
    case 'LOAD_SAVED_STATE':
      return action.payload;
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    console.log('GameProvider state:', state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 