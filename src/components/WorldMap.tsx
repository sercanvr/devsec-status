import React, { useMemo } from 'react';
import DottedMap from 'dotted-map';
import { useTheme } from '../hooks/useTheme';

export interface MapConnection {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: MapConnection[];
  lineColor?: string;
  className?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  className = '',
}) => {
  const { theme } = useTheme();

  // Generate clean, high-clarity static dotted world map SVG
  // Enhanced dot opacity for distinct visibility in both light and dark themes
  const svgMap = useMemo(() => {
    try {
      const DottedMapClass = (DottedMap as { default?: unknown }).default || DottedMap;
      // @ts-expect-error instantiate dynamic class
      const map = new DottedMapClass({ height: 100, grid: 'diagonal' });
      return map.getSVG({
        radius: 0.25,
        color: theme === 'dark' ? '#FFFFFF55' : '#00000038',
        shape: 'circle',
        backgroundColor: 'transparent',
      });
    } catch {
      return '';
    }
  }, [theme]);

  if (!svgMap) return null;

  return (
    <div
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-cover pointer-events-none select-none blur-[0.4px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_85%,transparent_100%)] transition-opacity duration-300"
        alt="world map"
        draggable={false}
      />
    </div>
  );
};

export default WorldMap;
