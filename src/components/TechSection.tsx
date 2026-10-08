import React from 'react';
import { TechEntry } from '../types/tech';
import { TechBar } from './TechBar';
import { CardSkeleton } from './CardSkeleton';
import { sanitizeText } from '../lib/sanitize';
import { GlassBadge } from './GlassBadge';

interface TechSectionProps {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  entries: TechEntry[];
  isLoading?: boolean;
}

export const TechSection: React.FC<TechSectionProps> = ({ id, title, icon, entries, isLoading }) => {
  const cleanTitle = sanitizeText(title);

  // Compute max stars for scaling progress bars dynamically
  const maxStars = Math.max(...entries.map((item) => item.popularity.totalStars), 1);

  return (
    <section id={id} className="w-full py-6 space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-300 dark:border-neutral-800">
        {icon && <div className="text-[#CEFF00]">{icon}</div>}
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {cleanTitle}
        </h2>
        <GlassBadge count={isLoading ? '...' : entries.length} />
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : entries.map((entry) => (
              <div id={entry.id} key={entry.id} className="transition-all duration-300 rounded-2xl">
                <TechBar entry={entry} maxStars={maxStars} />
              </div>
            ))}
      </div>
    </section>
  );
};
