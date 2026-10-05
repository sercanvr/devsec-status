import React from 'react';

interface SegmentedProgressBarProps {
  percentage: number;
  totalSegments?: number;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'coral' | 'lime' | 'auto';
  className?: string;
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  percentage,
  totalSegments = 24,
  colorScheme = 'auto',
  className = '',
}) => {
  const safePercent = Math.min(100, Math.max(0, percentage));
  const filledCount = Math.max(1, Math.round((safePercent / 100) * totalSegments));

  const getSegmentColor = () => {
    if (colorScheme !== 'auto') {
      switch (colorScheme) {
        case 'blue':
          return 'bg-[#0066FF] dark:bg-[#388BFD] shadow-xs shadow-blue-500/40';
        case 'emerald':
          return 'bg-emerald-500 shadow-xs shadow-emerald-500/40';
        case 'amber':
          return 'bg-amber-500 shadow-xs shadow-amber-500/40';
        case 'coral':
          return 'bg-rose-500 shadow-xs shadow-rose-500/40';
        case 'lime':
          return 'bg-[#CEFF00] shadow-xs shadow-[#CEFF00]/40';
      }
    }

    // Auto color based on tier (resembling Image 2 & Image 4)
    if (safePercent >= 75) {
      return 'bg-[#0066FF] dark:bg-[#3B82F6] shadow-xs shadow-blue-500/40';
    }
    if (safePercent >= 50) {
      return 'bg-[#0EA5E9] dark:bg-[#38BDF8] shadow-xs shadow-sky-500/40';
    }
    if (safePercent >= 25) {
      return 'bg-amber-500 dark:bg-amber-400 shadow-xs shadow-amber-500/40';
    }
    return 'bg-rose-500 dark:bg-rose-400 shadow-xs shadow-rose-500/40';
  };

  const activeColorClass = getSegmentColor();

  return (
    <div
      className={`flex items-center gap-[2.5px] sm:gap-[3px] w-full py-1 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(safePercent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Popularity ${Math.round(safePercent)}%`}
    >
      {Array.from({ length: totalSegments }).map((_, index) => {
        const isFilled = index < filledCount;
        return (
          <div
            key={index}
            className={`flex-1 h-3 sm:h-3.5 rounded-full transition-all duration-300 ${
              isFilled
                ? activeColorClass
                : 'bg-neutral-200/90 dark:bg-neutral-800/90 border border-neutral-300/40 dark:border-neutral-700/50'
            }`}
          />
        );
      })}
    </div>
  );
};
