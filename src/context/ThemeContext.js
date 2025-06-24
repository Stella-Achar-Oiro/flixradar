import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

const initialState = {
  theme: 'light',
  preferences: {
    useSystemTheme: false,
    fontSize: 'medium',
    compactMode: false
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const [storedTheme, setStoredTheme] = useLocalStorage('flixradar-theme', null);
  const [storedPreferences, setStoredPreferences] = useLocalStorage('flixradar-theme-preferences', initialState.preferences);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme });
    } else if (storedPreferences.useSystemTheme) {
      dispatch({ type: 'SET_THEME', payload: systemTheme });
    }

    dispatch({ type: 'SET_PREFERENCES', payload: storedPreferences });
  }, [storedTheme, storedPreferences]);

  // Listen for system theme changes
  useEffect(() => {
    if (!state.preferences.useSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      dispatch({ type: 'SET_THEME', payload: e.matches ? 'dark' : 'light' });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.preferences.useSystemTheme]);

  // Save theme to localStorage
  useEffect(() => {
    if (!state.preferences.useSystemTheme) {
      setStoredTheme(state.theme);
    }
  }, [state.theme, state.preferences.useSystemTheme, setStoredTheme]);

  // Save preferences to localStorage
  useEffect(() => {
    setStoredPreferences(state.preferences);
  }, [state.preferences, setStoredPreferences]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.className = `theme-${state.theme} font-${state.preferences.fontSize} ${
      state.preferences.compactMode ? 'compact-mode' : ''
    }`;
  }, [state.theme, state.preferences]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
  };

  const value = {
    theme: state.theme,
    preferences: state.preferences,
    toggleTheme,
    setTheme,
    updatePreferences
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;