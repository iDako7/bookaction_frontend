import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({ progress, height = 'md', showLabel = false, animated = true }: ProgressBarProps) {
  const heightStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      <div className={`w-full bg-blue-100 rounded-full overflow-hidden ${heightStyles[height]} shadow-inner`}>
        <div
          className={`h-full bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] rounded-full relative overflow-hidden ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          {showLabel && (
            <div className="flex items-center justify-end h-full pr-2">
              <span className="text-xs text-white font-semibold drop-shadow-md">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}