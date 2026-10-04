import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3 animate-pulse border border-[#C7C7C7] dark:border-neutral-700">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-300/60 dark:bg-neutral-800 shrink-0" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-neutral-300/60 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-48 bg-neutral-200/60 dark:bg-neutral-900 rounded-md" />
          </div>
        </div>
        <div className="h-8 w-20 bg-neutral-300/60 dark:bg-neutral-800 rounded-xl" />
      </div>
      <div className="h-3 w-full bg-neutral-200/60 dark:bg-neutral-800 rounded-full mt-2" />
      <div className="flex justify-between items-center pt-2 border-t border-neutral-200/40 dark:border-neutral-800/40">
        <div className="h-4 w-28 bg-neutral-200/60 dark:bg-neutral-800 rounded-md" />
        <div className="h-4 w-36 bg-neutral-200/60 dark:bg-neutral-800 rounded-md" />
      </div>
    </div>
  );
};
