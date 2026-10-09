import React, { useMemo } from 'react';

interface GlassBadgeProps {
  count: number | string;
  className?: string;
}

let sessionSparkleTriggered = false;
const checkShouldSparkle = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    if (!sessionStorage.getItem('devsec:badge_sparkled')) {
      sessionSparkleTriggered = true;
      sessionStorage.setItem('devsec:badge_sparkled', 'true');
      return true;
    }
    return sessionSparkleTriggered;
  } catch {
    return false;
  }
};

export const GlassBadge: React.FC<GlassBadgeProps> = ({ count, className = '' }) => {
  const shouldAnimate = useMemo(() => checkShouldSparkle(), []);

  return (
    <div className={`glass-counter-badge ${className}`}>
      <span>{count}</span>
      <span
        className={`glass-counter-glint ${shouldAnimate ? 'animate-glint-once' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default GlassBadge;

