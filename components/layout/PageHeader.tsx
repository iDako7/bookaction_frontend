"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-gray-200 shadow-sm px-6 p-4 flex-shrink-0 ${className}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

// 专门用于课程的 Header（带进度条）
interface LessonHeaderProps {
  title: string;
  subtitle: string;
  currentStep?: number;
  totalSteps?: number;
  progress?: number;
}

export function LessonHeader({
  title,
  subtitle,
  currentStep,
  totalSteps,
  progress,
}: LessonHeaderProps) {
  const progressPercentage = progress || (currentStep && totalSteps ? (currentStep / totalSteps) * 100 : 0);

  return (
    <>
      {/* Title Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-6 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col justify-end h-[72px]">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {(currentStep && totalSteps) && (
        <div className="bg-white border-b border-gray-200 px-6 py-1.5 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                {currentStep}/{totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}