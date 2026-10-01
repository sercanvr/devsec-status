import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { SoftwarePage } from './pages/SoftwarePage';
import { SecurityPage } from './pages/SecurityPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
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
