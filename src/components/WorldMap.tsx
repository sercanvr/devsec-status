import React from 'react';
import worldMapDark from '../assets/world-map-dark.svg';
import worldMapLight from '../assets/world-map-light.svg';

interface WorldMapProps {
  lineColor?: string;
  className?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Light Theme Map */}
      <img
        src={worldMapLight}
        className="dark:hidden h-full w-full object-cover pointer-events-none select-none blur-[0.3px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_85%,transparent_100%)] transition-opacity duration-300"
        alt="World Map"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      {/* Dark Theme Map */}
      <img
        src={worldMapDark}
        className="hidden dark:block h-full w-full object-cover pointer-events-none select-none blur-[0.3px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_85%,transparent_100%)] transition-opacity duration-300"
        alt="World Map"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
};

export default WorldMap;

