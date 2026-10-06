import React, { useMemo } from 'react';
// @ts-expect-error dotted-map doesn't provide built-in typescript types
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
      const rawSvg = map.getSVG({
        radius: 0.25,
        color: theme === 'dark' ? '#FFFFFF55' : '#00000038',
        shape: 'circle',
        backgroundColor: 'transparent',
      });
      // Expand viewBox with 8 units top margin to ensure northern latitudes (Canada, Greenland, Scandinavia, Siberia) are fully visible without clipping
      return rawSvg.replace('viewBox="0 0 198 100"', 'viewBox="0 -8 198 112"');
    } catch {
      return '';
    }
  }, [theme]);

  if (!svgMap) return null;

  return (
    <div
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden flex items-center justify-center ${className}`}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-contain pointer-events-none select-none blur-[0.4px] transition-opacity duration-300"
        alt="world map"
        draggable={false}
      />
    </div>
  );
};

export default WorldMap;
