import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppSettings, AppAction } from '../types';

const STORAGE_KEY = 'muslim_prayer_settings';

const defaultSettings: AppSettings = {
  location: null,
  method: 'MWL',
  madhab: 'Shafi',
  useLocation: true,
};

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return defaultSettings;
}

function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

function appReducer(state: AppSettings, action: AppAction): AppSettings {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_METHOD':
      return { ...state, method: action.payload };
    case 'SET_MADHAB':
      return { ...state, madhab: action.payload };
    case 'TOGGLE_USE_LOCATION':
      return { ...state, useLocation: !state.useLocation };
    case 'RESET_LOCATION':
      return { ...state, location: null };
    default:
      return state;
  }
}

interface AppContextType {
  settings: AppSettings;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(appReducer, undefined, loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  return (
    <AppContext.Provider value={{ settings, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}