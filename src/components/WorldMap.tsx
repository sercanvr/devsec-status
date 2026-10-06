import React, { useMemo, useRef, useEffect, useState } from 'react';
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

const DEFAULT_DOTS: MapConnection[] = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: 'San Francisco' },
    end: { lat: 50.1109, lng: 8.6821, label: 'Frankfurt' },
  },
  {
    start: { lat: 40.7128, lng: -74.006, label: 'New York' },
    end: { lat: 51.5074, lng: -0.1278, label: 'London' },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: 'London' },
    end: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  },
  {
    start: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
    end: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
  },
  {
    start: { lat: 52.52, lng: 13.405, label: 'Berlin' },
    end: { lat: 41.0082, lng: 28.9784, label: 'Istanbul' },
  },
  {
    start: { lat: 37.7749, lng: -122.4194, label: 'San Francisco' },
    end: { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
  },
];

export const WorldMap: React.FC<WorldMapProps> = ({
  dots = DEFAULT_DOTS,
  lineColor = '#E36A17',
  className = '',
}) => {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate dotted world map SVG dynamically based on current active theme
  const svgMap = useMemo(() => {
    try {
      const DottedMapClass = (DottedMap as { default?: unknown }).default || DottedMap;
      // @ts-expect-error instantiate dynamic class
      const map = new DottedMapClass({ height: 100, grid: 'diagonal' });
      return map.getSVG({
        radius: 0.22,
        color: theme === 'dark' ? '#FFFFFF30' : '#00000025',
        shape: 'circle',
        backgroundColor: 'transparent',
      });
    } catch {
      return '';
    }
  }, [theme]);

  // Pause & Play observer: pause animations when 80% out of viewport (< 20% visible)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Active when at least 20% visible (i.e. not 80% out of screen)
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        setIsVisible(inView);
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Modal detection: pause when search modal or dialog is open
  useEffect(() => {
    const checkModal = () => {
      const dialog = document.querySelector('[role="dialog"]');
      setIsModalOpen(!!dialog);
    };

    checkModal();

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Native SVG Animation Control: pauseAnimations() & unpauseAnimations()
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const shouldPlay = isVisible && !isModalOpen;

    try {
      if (shouldPlay) {
        svg.unpauseAnimations();
      } else {
        svg.pauseAnimations();
      }
    } catch {
      // Fallback for browsers without SVGAnimationElement control
    }
  }, [isVisible, isModalOpen]);

  // Project latitude/longitude coordinates to 800x400 SVG viewBox space
  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  // Create quadratic bezier curve path connecting two points on the map
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full object-cover blur-[0.6px] [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
          alt="world map"
          draggable={false}
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`map-path-gradient-${lineColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);

          return (
            <g key={`path-group-${i}`}>
              <path
                d={pathD}
                fill="none"
                stroke={`url(#map-path-gradient-${lineColor.replace('#', '')})`}
                strokeWidth="1.5"
                strokeDasharray="400"
                strokeDashoffset="400"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="400;0;0;400"
                  dur="4.5s"
                  begin={`${0.5 * i}s`}
                  repeatCount="indefinite"
                  keyTimes="0;0.5;0.8;1"
                />
              </path>
            </g>
          );
        })}

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="9"
                  dur="1.8s"
                  begin={`${0.3 * i}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.8s"
                  begin={`${0.3 * i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="9"
                  dur="1.8s"
                  begin={`${0.3 * i + 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.8s"
                  begin={`${0.3 * i + 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WorldMap;
