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

  return (
    <a
      href="#top"
      onClick={scrollToTop}
      aria-label={t('common.scrollToTop')}
      title={t('common.scrollToTop')}
      className={`fixed right-4 sm:right-6 z-50 w-8 h-8 rounded-lg bg-[#1D1D1F]/90 dark:bg-[#1D1D1F]/90 backdrop-blur-xl border border-[#CEFF00] flex items-center justify-center overflow-hidden transition-all duration-300 focus:outline-none shadow-lg shadow-[#CEFF00]/10 ${
        visible ? 'bottom-6 sm:bottom-8 opacity-100' : '-bottom-20 opacity-0 pointer-events-none'
      }`}
    >
      <svg className="w-4 h-4 fill-[#CEFF00]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z" />
      </svg>
    </a>
  );
};

