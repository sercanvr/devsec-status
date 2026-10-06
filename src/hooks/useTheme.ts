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

function applyThemeToDOM(theme: Theme, isInitial = false) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  let styleEl: HTMLStyleElement | null = null;
  if (!isInitial) {
    styleEl = document.createElement('style');
    styleEl.appendChild(
      document.createTextNode(
        `*, *::before, *::after {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    );
    document.head.appendChild(styleEl);
  }

  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }

  if (styleEl) {
    // Force DOM reflow to apply new colors instantly
    void window.getComputedStyle(root).opacity;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (styleEl && styleEl.parentNode) {
          styleEl.parentNode.removeChild(styleEl);
        }
      });
    });
  }
}

// Initial apply
applyThemeToDOM(currentTheme, true);

function setGlobalTheme(newTheme: Theme) {
  if (newTheme === currentTheme) return;
  currentTheme = newTheme;
  applyThemeToDOM(newTheme, false);
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
