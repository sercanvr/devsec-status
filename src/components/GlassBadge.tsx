import React from 'react';

interface GlassBadgeProps {
  count: number | string;
  className?: string;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({ count, className = '' }) => {
  return (
    <div className={`glass-counter-badge ${className}`}>
      <span>{count}</span>
      <span className="glass-counter-glint" aria-hidden="true" />
    </div>
  );
};

export default GlassBadge;
