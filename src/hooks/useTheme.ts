import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'devsec_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default requirement: Dark mode on first load
    return document.documentElement.classList.contains('dark') ? 'dark' : 'dark';
  });

  useEffect(() => {
    const syncThemeFromDOM = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    window.addEventListener('themechange', syncThemeFromDOM);
    window.addEventListener('storage', syncThemeFromDOM);
    return () => {
      window.removeEventListener('themechange', syncThemeFromDOM);
      window.removeEventListener('storage', syncThemeFromDOM);
    };
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme: Theme = isCurrentlyDark ? 'light' : 'dark';
    const root = document.documentElement;

    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {}

    setTheme(newTheme);
    window.dispatchEvent(new Event('themechange'));
  };

  return { theme, setTheme, toggleTheme };
}
