import React from 'react';
import { Skeleton } from './ui/skeleton';

export interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`p-4 rounded-2xl bg-white dark:bg-[#1A1A1E] border-[1.5px] border-neutral-300/90 dark:border-neutral-700 shadow-xs dark:shadow-md dark:shadow-black/40 space-y-3.5 transition-colors ${className}`}
      role="status"
      aria-busy="true"
      aria-label="Loading card"
    >
      {/* Top: Icon + Title + Category Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Skeleton.Circle size={44} className="rounded-xl! flex-none" />
          <div className="flex-1 min-w-0">
            <Skeleton width="48%" height={20} className="rounded-md" />
          </div>
        </div>
        <Skeleton width={68} height={22} className="rounded-lg shrink-0" />
      </div>

      {/* Creator & Version Sub-row */}
      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Skeleton.Circle size={24} />
          <Skeleton width={110} height={13} className="rounded-md" />
        </div>
        <Skeleton width={48} height={20} className="rounded-md" />
      </div>

      {/* Segmented Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Skeleton width={70} height={13} className="rounded-md" />
          <Skeleton width={32} height={13} className="rounded-md" />
        </div>
        <Skeleton width="100%" height={10} className="rounded-pill" />
      </div>

      {/* Footer: Contributors + Repos + Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <Skeleton.Circle size={20} />
            <Skeleton.Circle size={20} />
            <Skeleton.Circle size={20} />
          </div>
          <Skeleton width={64} height={13} className="rounded-md ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton width={56} height={22} className="rounded-md" />
          <Skeleton width={28} height={28} className="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
