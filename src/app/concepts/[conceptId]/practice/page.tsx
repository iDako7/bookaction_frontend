"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { CheckCircle, XCircle } from 'lucide-react';
import { conceptQuizzes } from '@/lib/mockData';
import { useProgressStore } from '@/store/useProgressStore';

export default function PracticeQuestionPage() {
  const params = useParams();
  const router = useRouter();
  
  if (!params) return null;

  const conceptId = Number(params.conceptId);
  const quiz = conceptQuizzes[conceptId];
  const { completeConcept } = useProgressStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  if (!quiz) return <div>Quiz not found</div>;

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleOptionToggle = (optionIndex: number) => {
    if (submitted) return;
    
    if (currentQuestion.questionType === 'single_choice') {
      setSelectedOptions([optionIndex]);
    } else {
      if (selectedOptions.includes(optionIndex)) {
        setSelectedOptions(selectedOptions.filter(i => i !== optionIndex));
      } else {
        setSelectedOptions([...selectedOptions, optionIndex]);
      }
    }
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    
    // Check if answer is correct
    const correct = 
      selectedOptions.length === currentQuestion.correctOptionIndex.length &&
      selectedOptions.every(i => currentQuestion.correctOptionIndex.includes(i));
    
    if (correct) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      completeConcept(conceptId);
      router.push(`/concepts/${conceptId}/summary`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setSubmitted(false);
    }
  };
  
  const isCorrect = submitted && 
    selectedOptions.length === currentQuestion.correctOptionIndex.length &&
    selectedOptions.every(i => currentQuestion.correctOptionIndex.includes(i));
  
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold">{currentQuestionIndex + 1}</span>
                </div>
                <div>
                  <p className="m-0 font-semibold text-gray-900">Question {currentQuestionIndex + 1} of {questions.length}</p>
                  <p className="m-0 text-sm text-gray-500">Score: {score}/{questions.length}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#A5B4FC] to-[#C7D2FE] transition-all duration-500 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <Card variant="elevated" padding="xl">
            {/* Question */}
            <div className="mb-8">
              <h2 className="mb-4">{currentQuestion.question}</h2>
              {currentQuestion.questionType === 'multiple_choice' && (
                <p className="text-sm text-gray-500 bg-indigo-50 px-4 py-2 rounded-lg inline-block">
                  💡 Select all that apply
                </p>
              )}
            </div>
            
            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOptions.includes(index);
                const isCorrectOption = currentQuestion.correctOptionIndex.includes(index);
                const showCorrect = submitted && isCorrectOption;
                const showIncorrect = submitted && isSelected && !isCorrectOption;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionToggle(index)}
                    disabled={submitted}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                      showCorrect
                        ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50'
                        : showIncorrect
                        ? 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50'
                        : isSelected
                        ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'
                    } ${submitted ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                          showCorrect
                            ? 'bg-green-400 border-green-400'
                            : showIncorrect
                            ? 'bg-red-400 border-red-400'
                            : isSelected
                            ? 'bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] border-indigo-400'
                            : 'border-gray-300 bg-white'
                        }`}>
                          <span className={`font-semibold ${isSelected || showCorrect || showIncorrect ? 'text-white' : 'text-gray-500'}`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="text-gray-900 font-medium">{option}</span>
                      </div>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Feedback */}
            {submitted && (
              <div className={`mb-8 p-6 rounded-2xl border-2 ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-green-400' : 'bg-red-400'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                      {isCorrect ? '✨ Correct!' : '❌ Not quite'}
                    </p>
                    <p className={`m-0 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              {!submitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedOptions.length === 0}
                  size="lg"
                  fullWidth
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  size="lg"
                  fullWidth
                >
                  {isLastQuestion ? 'View Summary →' : 'Next Question →'}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
