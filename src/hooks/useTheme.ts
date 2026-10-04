import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'devsec_theme';

const listeners = new Set<(theme: Theme) => void>();

let currentTheme: Theme = (() => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return 'dark';
})();

function applyThemeToDOM(theme: Theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

// Initial apply
applyThemeToDOM(currentTheme);

function setGlobalTheme(newTheme: Theme) {
  if (newTheme === currentTheme) return;
  currentTheme = newTheme;
  applyThemeToDOM(newTheme);
  try {
    localStorage.setItem(STORAGE_KEY, newTheme);
  } catch {}
  listeners.forEach((listener) => listener(newTheme));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  useEffect(() => {
    const listener = (newTheme: Theme) => setThemeState(newTheme);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    setGlobalTheme(newTheme);
  };

  const toggleTheme = () => {
    setGlobalTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme };
}
