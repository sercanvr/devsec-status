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

  // Reusable DottedMap instance to project pins to exact map coordinates
  const mapInstance = useMemo(() => {
    try {
      const DottedMapClass = (DottedMap as { default?: unknown }).default || DottedMap;
      // @ts-expect-error instantiate dynamic class
      return new DottedMapClass({ height: 100, grid: 'diagonal' });
    } catch {
      return null;
    }
  }, []);

  // Generate dotted world map SVG dynamically based on active theme
  // We expand the viewBox from 0 0 198 100 to 0 -10 198 115 so northern latitudes and cyber arcs never clip
  const svgMap = useMemo(() => {
    try {
      if (!mapInstance) return '';
      const rawSvg = mapInstance.getSVG({
        radius: 0.22,
        color: theme === 'dark' ? '#FFFFFF30' : '#00000025',
        shape: 'circle',
        backgroundColor: 'transparent',
      });
      return rawSvg.replace('viewBox="0 0 198 100"', 'viewBox="0 -10 198 115"');
    } catch {
      return '';
    }
  }, [mapInstance, theme]);

  // Project lat/lng coordinates directly to the 198x100 (extended to 198x115) map space
  const projectPoint = (lat: number, lng: number) => {
    if (mapInstance && typeof mapInstance.getPin === 'function') {
      try {
        const pin = mapInstance.getPin({ lat, lng });
        if (pin && typeof pin.x === 'number' && typeof pin.y === 'number') {
          return { x: pin.x, y: pin.y };
        }
      } catch {
        // Fallback below
      }
    }
    return {
      x: ((lng + 180) / 360) * 198,
      y: ((90 - lat) / 180) * 100,
    };
  };

  // Quadratic bezier cyber arc with apex safely below y = -10
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 8;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Immediate and precise visibility check via scroll, resize & sticky navbar position
  useEffect(() => {
    const checkVisibility = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // 1. Scrolled out of view above (e.g. past the sticky navbar, which has bottom ~80px)
      // When card bottom <= 150px, the map is off-screen
      if (rect.bottom <= 150) {
        setIsVisible(false);
        return;
      }

      // 2. Scrolled out of view below
      if (rect.top >= windowHeight - 40) {
        setIsVisible(false);
        return;
      }

      // 3. Compute vertical visible ratio of the container
      const visibleTop = Math.max(rect.top, 80); // Sticky navbar offset
      const visibleBottom = Math.min(rect.bottom, windowHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = visibleHeight / rect.height;

      // Active when at least 25% of the card is in view
      setIsVisible(ratio >= 0.25);
    };

    checkVisibility();

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  // Modal detection: pause when search modal or dialog is open, or tab is hidden
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

  const shouldPlay = isVisible && !isModalOpen;

  // Native SMIL SVG Animation Control: pauseAnimations() & unpauseAnimations()
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    try {
      if (shouldPlay) {
        if (typeof svg.unpauseAnimations === 'function' && svg.animationsPaused?.()) {
          svg.unpauseAnimations();
        }
      } else {
        if (typeof svg.pauseAnimations === 'function' && !svg.animationsPaused?.()) {
          svg.pauseAnimations();
        }
      }
    } catch {
      // Fallback
    }
  }, [shouldPlay]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Dynamic Keyframe & CSS play-state injection to guarantee pause/play on compositor thread */}
      <style>{`
        @keyframes mapDashOffset {
          0% { stroke-dashoffset: 100; }
          50% { stroke-dashoffset: 0; }
          80% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        @keyframes mapBeaconPulse {
          0% { r: 0.7; opacity: 0.7; }
          100% { r: 2.8; opacity: 0; }
        }
        .map-anim-path {
          animation: mapDashOffset 4.5s infinite ease-in-out;
          animation-play-state: ${shouldPlay ? 'running' : 'paused'} !important;
        }
        .map-anim-pulse {
          animation: mapBeaconPulse 1.8s infinite ease-out;
          animation-play-state: ${shouldPlay ? 'running' : 'paused'} !important;
        }
      `}</style>

      {/* Dotted Map Base Image: object-contain fits completely inside the card without clipping the top */}
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full object-contain blur-[0.5px] [mask-image:linear-gradient(to_bottom,white_85%,transparent_100%)] pointer-events-none select-none"
          alt="world map"
          draggable={false}
        />
      )}

      {/* Cyber Arc Lines & Beacons: exact viewBox match with preserveAspectRatio meet */}
      <svg
        ref={svgRef}
        viewBox="0 -10 198 115"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`map-path-gradient-${lineColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="10%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="90%" stopColor={lineColor} stopOpacity="1" />
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
                strokeWidth="0.45"
                strokeDasharray="100"
                strokeDashoffset="100"
                className="map-anim-path"
                style={{
                  animationDelay: `${0.5 * i}s`,
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="100;0;0;100"
                  dur="4.5s"
                  begin={`${0.5 * i}s`}
                  repeatCount="indefinite"
                  keyTimes="0;0.5;0.8;1"
                />
              </path>
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startP = projectPoint(dot.start.lat, dot.start.lng);
          const endP = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              {/* Start Beacon */}
              <g key={`start-${i}`}>
                <circle
                  cx={startP.x}
                  cy={startP.y}
                  r="0.7"
                  fill={lineColor}
                />
                <circle
                  cx={startP.x}
                  cy={startP.y}
                  r="0.7"
                  fill={lineColor}
                  opacity="0.6"
                  className="map-anim-pulse"
                  style={{
                    animationDelay: `${0.3 * i}s`,
                  }}
                >
                  <animate
                    attributeName="r"
                    from="0.7"
                    to="2.8"
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

              {/* End Beacon */}
              <g key={`end-${i}`}>
                <circle
                  cx={endP.x}
                  cy={endP.y}
                  r="0.7"
                  fill={lineColor}
                />
                <circle
                  cx={endP.x}
                  cy={endP.y}
                  r="0.7"
                  fill={lineColor}
                  opacity="0.6"
                  className="map-anim-pulse"
                  style={{
                    animationDelay: `${0.3 * i + 0.5}s`,
                  }}
                >
                  <animate
                    attributeName="r"
                    from="0.7"
                    to="2.8"
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
          );
        })}
      </svg>
    </div>
  );
};

export default WorldMap;
