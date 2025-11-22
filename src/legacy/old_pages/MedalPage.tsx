import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Award, TrendingUp, Flame, Sparkles, Trophy, Star } from 'lucide-react';

interface MedalPageProps {
  completedConcepts: number;
  totalConcepts: number;
  streak: number;
  onBackToLearn: () => void;
}

export function MedalPage({ completedConcepts, totalConcepts, streak, onBackToLearn }: MedalPageProps) {
  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated" padding="xl" className="text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-amber-200/20 to-orange-200/20"></div>
            
            <div className="relative z-10">
              {/* Medal Display */}
              <div className="relative mb-10">
                <div className="w-48 h-48 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse">
                  <Award className="w-28 h-28 text-white" />
                </div>
                {/* Sparkles */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center gap-8">
                  <Sparkles className="w-10 h-10 text-yellow-500 animate-bounce" style={{ animationDelay: '0s' }} />
                  <Sparkles className="w-10 h-10 text-amber-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Sparkles className="w-10 h-10 text-orange-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              
              <h1 className="mb-4 text-6xl bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Champion!
              </h1>
              <p className="text-3xl text-gray-700 mb-4">
                🎉 You've Completed Everything! 🎉
              </p>
              <p className="text-xl text-gray-600 mb-12">
                All {totalConcepts} lessons mastered. You're now equipped with essential relationship skills!
              </p>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{completedConcepts}</div>
                  <p className="text-gray-600 m-0">Lessons Completed</p>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{streak}</div>
                  <p className="text-gray-600 m-0">Day Streak</p>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                  <p className="text-gray-600 m-0">Completion</p>
                </div>
              </div>
              
              {/* Congratulatory Message */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-10 mb-10 border-2 border-[#C7D2FE]">
                <h3 className="mb-4">Your Journey to Better Relationships</h3>
                <p className="text-lg text-gray-700 mb-6">
                  You've invested in yourself and your relationships. The skills you've learned—active listening, 
                  expressing needs, and setting boundaries—will serve you for a lifetime. Remember, these skills 
                  grow stronger with practice.
                </p>
                <p className="text-lg text-gray-700 m-0">
                  Keep applying what you've learned, and watch your relationships flourish! 🌟
                </p>
              </div>
              
              <Button onClick={onBackToLearn} variant="accent" size="lg" fullWidth>
                Review Your Lessons
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}