import { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// Hook for getting current theme preference
export const useThemePreference = () => {
  const { theme, preferences } = useTheme();

  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  
  return {
    theme,
    isDark,
    isLight,
    preferences,
    useSystemTheme: preferences.useSystemTheme,
    fontSize: preferences.fontSize,
    compactMode: preferences.compactMode
  };
};

// Hook for theme actions
export const useThemeActions = () => {
  const { toggleTheme, setTheme, updatePreferences, preferences } = useTheme();

  const switchToLight = () => setTheme('light');
  const switchToDark = () => setTheme('dark');
  
  const toggleSystemTheme = () => {
    updatePreferences({ useSystemTheme: !preferences.useSystemTheme });
  };

  const setFontSize = (size) => {
    updatePreferences({ fontSize: size });
  };

  const toggleCompactMode = () => {
    updatePreferences({ compactMode: !preferences.compactMode });
  };

  return {
    toggleTheme,
    setTheme,
    switchToLight,
    switchToDark,
    updatePreferences,
    toggleSystemTheme,
    setFontSize,
    toggleCompactMode
  };
};

// Hook for getting system theme preference
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
};

export default useTheme;