import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { GridVignetteBackground } from './components/GridVignetteBackground';
import { SoftwarePage } from './pages/SoftwarePage';
import { SecurityPage } from './pages/SecurityPage';

export const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('common.pageTitle');
  }, [t, i18n.language]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#ECECEC] dark:bg-[#141414] text-[#141414] dark:text-[#FFFFFF] transition-colors duration-300 relative">
        <GridVignetteBackground className="opacity-80" x={50} y={50} intensity={100} horizontalVignetteSize={50} verticalVignetteSize={30} />
        <Navbar />

        <main className="flex-1 pb-12">
          <Routes>
            <Route path="/" element={<SoftwarePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <ScrollToTopButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
