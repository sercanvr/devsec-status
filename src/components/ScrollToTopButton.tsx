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
    <a
      href="#top"
      onClick={scrollToTop}
      aria-label={t('common.scrollToTop')}
      title={t('common.scrollToTop')}
      className="fixed right-2 sm:right-4 bottom-6 sm:bottom-8 z-50 w-11 h-11 rounded-xl bg-[#CEFF00] hover:bg-[#b8e600] shadow-lg flex items-center justify-center overflow-hidden focus:outline-none cursor-pointer"
    >
      <svg className="w-8 h-8 fill-white drop-shadow-sm" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z" />
      </svg>
    </a>
  );
};

