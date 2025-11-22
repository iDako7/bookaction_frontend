import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
}

export function Card({ children, padding = 'md', className = '', variant = 'elevated' }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const variantStyles = {
    default: 'bg-white rounded-2xl shadow-md border border-blue-100 hover:border-blue-200 transition-all duration-300',
    elevated: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50',
    glass: 'glass-effect rounded-2xl shadow-lg'
  };
  
  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}