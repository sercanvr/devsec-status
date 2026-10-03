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
  size = 48,
  x = 50,
  y = 50,
  horizontalVignetteSize = 100,
  verticalVignetteSize = 100,
  intensity = 0,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[-1] pointer-events-none opacity-40 dark:opacity-50 transition-opacity duration-300",
        "bg-[image:linear-gradient(to_right,rgba(120,120,120,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.15)_1px,transparent_1px)]",
        "dark:bg-[image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
          100 - intensity
        }%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
          100 - intensity
        }%, transparent 100%)`,
      }}
    />
  );
};
