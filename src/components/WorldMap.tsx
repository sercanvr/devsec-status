import React from 'react';
import { WORLD_MAP_PATH } from './worldMapPath';

interface WorldMapProps {
  lineColor?: string;
  className?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 198 100"
        fill="currentColor"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover blur-[0.3px] text-neutral-900/35 dark:text-white/45 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_85%,transparent_100%)] transition-opacity duration-300"
      >
        <path d={WORLD_MAP_PATH} />
      </svg>
    </div>
  );
};

export default WorldMap;
