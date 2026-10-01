import React from 'react';
import { TechEntry } from '../types/tech';
import { TechBar } from './TechBar';
import { sanitizeText } from '../lib/sanitize';

interface TechSectionProps {
  title: string;
  icon?: React.ReactNode;
  entries: TechEntry[];
}

export const TechSection: React.FC<TechSectionProps> = ({ title, icon, entries }) => {
  const cleanTitle = sanitizeText(title);

  // Compute max stars for scaling progress bars dynamically
  const maxStars = Math.max(...entries.map((item) => item.popularity.totalStars), 1);

  return (
    <section className="w-full py-6 space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
        {icon && <div className="text-cyan-500">{icon}</div>}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {cleanTitle}
        </h2>
        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {entries.length}
        </span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <TechBar key={entry.id} entry={entry} maxStars={maxStars} />
        ))}
      </div>
    </section>
  );
};
