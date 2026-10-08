import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { GridVignetteBackground } from './components/GridVignetteBackground';
const SoftwarePage = React.lazy(() =>
  import('./pages/SoftwarePage').then((m) => ({ default: m.SoftwarePage }))
);
const SecurityPage = React.lazy(() =>
  import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage }))
);

import { highlightTechElement } from './lib/highlight';

export const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('common.pageTitle');
  }, [t, i18n.language]);

  useEffect(() => {
    const triggerHashHighlight = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          highlightTechElement(hash);
        }, 200);
      }
    };

    triggerHashHighlight();
    window.addEventListener('hashchange', triggerHashHighlight);
    return () => window.removeEventListener('hashchange', triggerHashHighlight);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#ECECEC]/60 dark:bg-[#141414]/60 text-[#141414] dark:text-[#FFFFFF] transition-colors duration-300 relative selection:bg-[#CEFF00] selection:text-[#141414]">
        <GridVignetteBackground className="opacity-80" x={50} y={50} intensity={0} horizontalVignetteSize={100} verticalVignetteSize={100} />
        <Navbar />

        <main className="flex-1 pb-12">
          <React.Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-neutral-400 font-mono text-xs" />}>
            <Routes>
              <Route path="/" element={<SoftwarePage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </main>

        <ScrollToTopButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
};


export default App;
