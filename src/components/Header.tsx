import React from 'react';
import { BookOpen, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: 'learn' | 'profile';
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-white/95">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 bg-gradient-to-br from-[#60A5FA] to-[#38BDF8] rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="m-0 text-xl font-black bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] bg-clip-text text-transparent">
                BookAction
              </h1>
              <p className="m-0 text-xs text-gray-500 font-medium">Level Up Your Relationships 🚀</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-2">
            <button
              onClick={() => onNavigate('learn')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                currentPage === 'learn'
                  ? 'bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learn
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                currentPage === 'profile'
                  ? 'bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}