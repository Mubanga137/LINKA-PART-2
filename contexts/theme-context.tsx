'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'dashboard-theme'
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setTheme(stored);
    }
  }, [storageKey]);

  // Update actual theme based on preference and system
  useEffect(() => {
    const updateActualTheme = () => {
      let newTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newTheme = theme;
      }
      
      setActualTheme(newTheme);
      
      // Update document class and data attribute
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      root.setAttribute('data-theme', newTheme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0f172a' : '#ffffff');
      }
    };

    updateActualTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateActualTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Save theme preference
  const setThemeWithStorage = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  // Toggle between light and dark (not system)
  const toggleTheme = () => {
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark';
    setThemeWithStorage(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme: setThemeWithStorage,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Theme configuration object for consistent styling
export const themeConfig = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      glass: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff'
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      glass: 'rgba(255, 255, 255, 0.2)'
    },
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      glass: '0 8px 32px rgba(31, 38, 135, 0.37)'
    }
  },
  dark: {
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      glass: 'rgba(0, 0, 0, 0.2)',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0f172a'
    },
    border: {
      primary: '#334155',
      secondary: '#475569',
      glass: 'rgba(255, 255, 255, 0.1)'
    },
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
      glass: '0 8px 32px rgba(0, 0, 0, 0.5)'
    }
  }
};

// Premium color schemes
export const premiumColorSchemes = {
  sapphire: {
    primary: 'linear-gradient(135deg, #235789 0%, #1e3a8a 100%)',
    secondary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    accent: '#60a5fa'
  },
  emerald: {
    primary: 'linear-gradient(135deg, #2ECC71 0%, #059669 100%)',
    secondary: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    accent: '#34d399'
  },
  gold: {
    primary: 'linear-gradient(135deg, #FFD700 0%, #f59e0b 100%)',
    secondary: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
    accent: '#fcd34d'
  },
  royal: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    accent: '#a78bfa'
  },
  sunset: {
    primary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    secondary: 'linear-gradient(135deg, #fb923c 0%, #dc2626 100%)',
    accent: '#fdba74'
  }
};

// Hook to get current theme styles
export function useThemeStyles() {
  const { actualTheme } = useTheme();
  
  return {
    colors: themeConfig[actualTheme],
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light'
  };
}

// Utility function to get CSS custom properties for theme
export function getThemeCSSVars(theme: 'light' | 'dark') {
  const config = themeConfig[theme];
  
  return {
    '--bg-primary': config.background.primary,
    '--bg-secondary': config.background.secondary,
    '--bg-tertiary': config.background.tertiary,
    '--bg-glass': config.background.glass,
    '--bg-gradient': config.background.gradient,
    '--text-primary': config.text.primary,
    '--text-secondary': config.text.secondary,
    '--text-tertiary': config.text.tertiary,
    '--text-inverse': config.text.inverse,
    '--border-primary': config.border.primary,
    '--border-secondary': config.border.secondary,
    '--border-glass': config.border.glass,
    '--shadow-sm': config.shadow.sm,
    '--shadow-md': config.shadow.md,
    '--shadow-lg': config.shadow.lg,
    '--shadow-xl': config.shadow.xl,
    '--shadow-glass': config.shadow.glass
  };
}
