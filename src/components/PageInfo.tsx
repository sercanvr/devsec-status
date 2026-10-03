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
      <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-[#1E1E1E]/75 backdrop-blur-md p-6 sm:p-8 border border-neutral-300 dark:border-neutral-800 shadow-xl shadow-black/5">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#CEFF00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#CEFF00]/15 text-neutral-900 dark:text-[#CEFF00] border border-[#CEFF00]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CEFF00] animate-pulse" />
              {badge}
            </span>
          )}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {cleanTitle}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed font-normal">
            {cleanDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
