import React from 'react';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { User, Award, Flame, BookOpen, TrendingUp, Star } from 'lucide-react';

interface ProfilePageProps {
  completedConcepts: Set<number>;
  totalConcepts: number;
  streak: number;
}

export function ProfilePage({ completedConcepts, totalConcepts, streak }: ProfilePageProps) {
  const progress = (completedConcepts.size / totalConcepts) * 100;
  
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card variant="elevated" padding="xl" className="mb-8 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A5B4FC]/10 via-[#C7D2FE]/10 to-[#F59E0B]/10"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <h1 className="mb-3">Your Profile</h1>
              <p className="text-xl text-gray-600">Keep building your relationship skills!</p>
            </div>
          </Card>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Streak */}
            <Card variant="elevated" padding="lg" className="text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{streak}</div>
                <p className="text-gray-600 m-0">Day Streak</p>
              </div>
            </Card>
            
            {/* Completed */}
            <Card variant="elevated" padding="lg" className="text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{completedConcepts.size}</div>
                <p className="text-gray-600 m-0">Lessons Completed</p>
              </div>
            </Card>
            
            {/* Achievement */}
            <Card variant="elevated" padding="lg" className="text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{Math.round(progress)}%</div>
                <p className="text-gray-600 m-0">Overall Progress</p>
              </div>
            </Card>
          </div>
          
          {/* Overall Progress */}
          <Card variant="elevated" padding="xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="m-0 mb-2">Your Learning Journey</h3>
                <p className="text-gray-600 m-0">
                  {completedConcepts.size} of {totalConcepts} lessons completed
                </p>
              </div>
            </div>
            
            <ProgressBar progress={progress} height="lg" animated />
            
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="m-0 mb-2">Keep Going!</h4>
                  <p className="text-gray-700 m-0">
                    {completedConcepts.size === totalConcepts
                      ? '🎉 Congratulations! You\'ve completed all lessons. Keep practicing what you\'ve learned!'
                      : `You're making great progress! ${totalConcepts - completedConcepts.size} more lesson${totalConcepts - completedConcepts.size === 1 ? '' : 's'} to go.`}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}