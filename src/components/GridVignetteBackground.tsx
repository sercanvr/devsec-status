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
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-0 pointer-events-none transition-opacity duration-300",
        "bg-[image:linear-gradient(to_right,rgba(0,0,0,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.13)_1px,transparent_1px)] opacity-60",
        "dark:bg-[image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] dark:opacity-75",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 85%)`,
        WebkitMaskImage: `radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 85%)`,
      }}
    />
  );
};



