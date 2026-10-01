import React from 'react';
import { sanitizeText } from '../lib/sanitize';

interface PageInfoProps {
  title: string;
  description: string;
  badge?: string;
}

export const PageInfo: React.FC<PageInfoProps> = ({ title, description, badge }) => {
  const cleanTitle = sanitizeText(title);
  const cleanDescription = sanitizeText(description);

  return (
    <div className="w-full py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 border border-slate-800 shadow-xl shadow-cyan-950/10">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {cleanTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {cleanDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
