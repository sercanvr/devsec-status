import React, { useState, useEffect } from 'react';

const SESSION_KEY = 'devsec_bottom_vignette_dismissed';

export const InitialViewportVignette: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const alreadyDismissed = sessionStorage.getItem(SESSION_KEY);
      if (alreadyDismissed === 'true') return false;
      return true;
    } catch {
      return false;
    }
  });

  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isVisible || isFadingOut) return;

    let dismissed = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        // Calculate remaining distance to page bottom
        const scrollBottom = window.innerHeight + window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        const distanceToBottom = totalHeight - scrollBottom;

        // When reaching near the footer (~350px before end), smoothly fade out and dismiss
        if (distanceToBottom <= 350 && !dismissed) {
          dismissed = true;
          setIsFadingOut(true);
          try {
            sessionStorage.setItem(SESSION_KEY, 'true');
          } catch {
            // Ignore storage quota or access errors
          }
          // After transition completes, remove from DOM
          setTimeout(() => {
            setIsVisible(false);
          }, 700);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position in case page loads at the bottom
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isFadingOut]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-0 inset-x-0 h-28 sm:h-40 pointer-events-none select-none z-40 transition-opacity duration-700 ease-out bg-gradient-to-t from-[#ECECEC] via-[#ECECEC]/60 to-transparent dark:from-[#141414] dark:via-[#141414]/70 dark:to-transparent ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    />
  );
};

export default InitialViewportVignette;
