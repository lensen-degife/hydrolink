import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { HydroThemeColors } from '@/constants/dashboard-theme';

export type ThemePalette = {
  [K in keyof typeof HydroThemeColors.light]: string;
};

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  colors: ThemePalette;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useRNColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = themeMode === 'dark';
  const colors: ThemePalette = isDark ? HydroThemeColors.dark : HydroThemeColors.light;

  return (
    <ThemeContext.Provider value={{ themeMode, colors, isDark, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback to light mode if used outside provider
    return {
      themeMode: 'light' as ThemeMode,
      colors: HydroThemeColors.light as ThemePalette,
      isDark: false,
      toggleTheme: () => {},
      setThemeMode: () => {},
    };
  }
  return context;
}
