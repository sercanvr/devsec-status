import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GridVignetteBackgroundProps {
  size?: number;
  x?: number;
  y?: number;
  horizontalVignetteSize?: number;
  verticalVignetteSize?: number;
  intensity?: number;
  className?: string;
}

export const GridVignetteBackground: React.FC<GridVignetteBackgroundProps> = ({
  size = 40,
  x = 50,
  y = 50,
  horizontalVignetteSize = 100,
  verticalVignetteSize = 100,
  intensity = 0,
  className,
}) => {
  const hasMask = intensity > 0;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-0 pointer-events-none transition-opacity duration-300",
        "bg-[image:linear-gradient(to_right,rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] opacity-80",
        "dark:bg-[image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] dark:opacity-90",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        ...(hasMask
          ? {
              maskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
                100 - intensity
              }%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
                100 - intensity
              }%, transparent 100%)`,
            }
          : {}),
      }}
    />
  );
};


