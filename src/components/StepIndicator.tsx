import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
            index < currentStep ? 'bg-[#4F8CC9]' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
