import { createContext, useContext, useReducer, ReactNode } from 'react';

export type AppPage = 'home' | 'quiz' | 'results' | 'catalogue' | 'career-detail' | 'certificate' | 'roadmap';

interface AppState {
  currentPage: AppPage;
  quizAnswers: Record<number, string | number | string[]>;
  quizProgress: number;
  recommendedCareers: string[];
  selectedCareer: string | null;
  userName: string;
  userEmail: string;
  certificateClaimed: boolean;
  explorationComplete: boolean;
}

type AppAction =
  | { type: 'NAVIGATE'; page: AppPage }
  | { type: 'ANSWER_QUESTION'; questionId: number; answer: string | number | string[] }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_RECOMMENDATIONS'; careers: string[] }
  | { type: 'SELECT_CAREER'; careerId: string }
  | { type: 'SET_USER_NAME'; name: string }
  | { type: 'SET_USER_EMAIL'; email: string }
  | { type: 'CLAIM_CERTIFICATE' }
  | { type: 'COMPLETE_EXPLORATION' }
  | { type: 'RESET' };

const initialState: AppState = {
  currentPage: 'home',
  quizAnswers: {},
  quizProgress: 0,
  recommendedCareers: [],
  selectedCareer: null,
  userName: '',
  userEmail: '',
  certificateClaimed: false,
  explorationComplete: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentPage: action.page };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        quizAnswers: { ...state.quizAnswers, [action.questionId]: action.answer },
      };
    case 'SET_PROGRESS':
      return { ...state, quizProgress: action.progress };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendedCareers: action.careers };
    case 'SELECT_CAREER':
      return { ...state, selectedCareer: action.careerId };
    case 'SET_USER_NAME':
      return { ...state, userName: action.name };
    case 'SET_USER_EMAIL':
      return { ...state, userEmail: action.email };
    case 'CLAIM_CERTIFICATE':
      return { ...state, certificateClaimed: true };
    case 'COMPLETE_EXPLORATION':
      return { ...state, explorationComplete: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
