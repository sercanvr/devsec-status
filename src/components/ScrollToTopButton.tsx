import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed right-3 sm:right-5 bottom-6 sm:bottom-8 z-50 p-1 rounded-[20px] bg-neutral-200/70 dark:bg-white/[0.06] border border-neutral-400/90 dark:border-white/35 backdrop-blur-md shadow-xl">
      <a
        href="#top"
        onClick={scrollToTop}
        aria-label={t('common.scrollToTop')}
        title={t('common.scrollToTop')}
        className="w-11 h-11 rounded-[16px] bg-[#CEFF00] hover:bg-[#b8e600] shadow-md flex items-center justify-center overflow-hidden focus:outline-none cursor-pointer transition-colors"
      >
        <svg
          className="w-5.5 h-5.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </a>
    </div>
  );
};

