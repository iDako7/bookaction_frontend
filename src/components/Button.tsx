import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] text-white hover:from-[#3B82F6] hover:to-[#0EA5E9] before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-20 before:transition-opacity',
    secondary: 'bg-white text-[#3B82F6] border-2 border-[#60A5FA] hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50',
    outline: 'bg-transparent text-[#3B82F6] border-2 border-[#BFDBFE] hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-[#60A5FA]',
    accent: 'bg-gradient-to-r from-[#FBBF24] to-[#FDE047] text-gray-900 hover:from-[#F59E0B] hover:to-[#FBBF24] shadow-yellow-200/50'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle}`}
    >
      {children}
    </button>
  );
}