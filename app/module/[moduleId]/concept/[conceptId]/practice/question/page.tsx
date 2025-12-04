"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useConceptQuiz, useSubmitQuizAnswer } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { useAuthStore } from "@/lib/state/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Circle,
  Square,
  CheckSquare,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    moduleId: string;
    conceptId: string;
  }>;
}

export default function PracticeQuestionPage({ params }: PageProps) {
  const { moduleId, conceptId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);
  const numericConceptId = parseInt(conceptId, 10);
  const router = useRouter();

  const { data: quizData, isLoading } = useConceptQuiz(numericConceptId);
  const userId = useAuthStore((state) => state.user?.id ?? 1);

  const saveQuizAnswer = useProgressStore((state) => state.saveQuizAnswer);
  const markPracticeCompleted = useProgressStore(
    (state) => state.markConceptPracticeCompleted
  );

  // Local state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    correctIndices: number[];
    explanation: string;
  } | null>(null);
  const [score, setScore] = useState(0);

  const questions = quizData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Hook usage dependent on state
  const currentQuestionId = currentQuestion?.id || 0;
  const submitAnswer = useSubmitQuizAnswer(currentQuestionId);

  // Handle selection
  const handleSelect = (index: number) => {
    if (isSubmitted) return;

    if (currentQuestion.questionType === "single_choice") {
      setSelectedIndices([index]);
    } else {
      // Multiple choice toggle
      setSelectedIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  // Handle submission
  const handleSubmit = async () => {
    if (selectedIndices.length === 0) return;

    // Call API
    try {
      await submitAnswer.mutateAsync({
        responseType: currentQuestion.questionType as
          | "single_choice"
          | "multiple_choice",
        userId,
        userAnswerIndices: selectedIndices,
        timeSpent: 0, // TODO: Track time
      });
    } catch (error) {
      console.error("Failed to submit answer", error);
      // Fallback to local calculation if API fails or for optimistic UI
    }

    // Optimistic check for immediate feedback
    const correctIndices = currentQuestion.correctOptionIndex;

    // Check correctness
    // Single choice: exact match
    // Multi choice: exact match of arrays (ignoring order)
    const sortedSelected = [...selectedIndices].sort();
    const sortedCorrect = [...correctIndices].sort();
    const isCorrect =
      JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    setFeedback({
      correct: isCorrect,
      correctIndices,
      explanation: currentQuestion.explanation,
    });
    setIsSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Save to store
    // Use the real quizId from the backend
    saveQuizAnswer(
      numericModuleId,
      numericConceptId,
      currentQuestion.id,
      selectedIndices
    );
  };

  // Handle next / finish
  const handleNext = () => {
    if (isLastQuestion) {
      // Mark practice as done
      markPracticeCompleted(numericModuleId, numericConceptId);
      router.push(`/module/${moduleId}/concept/${conceptId}/summary`);
    } else {
      // Reset for next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedIndices([]);
      setIsSubmitted(false);
      setFeedback(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="p-6 text-center">No questions found.</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-200 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm">
              {currentQuestionIndex + 1}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <p className="text-sm text-slate-500">
                Score: {score}/{questions.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:block w-48 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 transition-all duration-500"
              style={{
                width: `${(currentQuestionIndex / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Card className="bg-white border-blue-100 shadow-sm overflow-hidden rounded-2xl">
          <div className="p-6 md:p-8 space-y-8">
            {/* Question Image */}
            {currentQuestion.mediaUrl && (
              <div className="rounded-2xl overflow-hidden shadow-md aspect-video relative bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentQuestion.mediaUrl}
                  alt="Question Context"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Question Text */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </h1>
              {currentQuestion.questionType === "multiple_choice" && (
                <Badge
                  variant="secondary"
                  className="mt-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-50"
                >
                  💡 Select all that apply
                </Badge>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedIndices.includes(index);

                // Logic to determine styling based on state
                let stateStyles =
                  "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30";
                let icon =
                  currentQuestion.questionType === "single_choice" ? (
                    <Circle className="w-5 h-5 text-slate-300" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  );

                if (isSelected && !isSubmitted) {
                  stateStyles =
                    "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                  icon =
                    currentQuestion.questionType === "single_choice" ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    ) : (
                      <CheckSquare className="w-5 h-5 text-blue-500" />
                    );
                }

                if (isSubmitted) {
                  const isCorrect = feedback?.correctIndices.includes(index);
                  const isWrongSelection = isSelected && !isCorrect;

                  if (isCorrect) {
                    // Correct answer (whether selected or not, usually we highlight correct answers)
                    // If selected -> Green, if not selected -> Green outline (to show it was the answer)
                    stateStyles = isSelected
                      ? "border-green-500 bg-green-50 ring-1 ring-green-500"
                      : "border-green-400 bg-white border-dashed"; // Show correct answer user missed
                  } else if (isWrongSelection) {
                    stateStyles =
                      "border-red-500 bg-red-50 ring-1 ring-red-500";
                  } else {
                    stateStyles = "opacity-50 grayscale";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={isSubmitted}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group",
                      stateStyles
                    )}
                  >
                    <div className="shrink-0">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-colors",
                          isSelected && !isSubmitted
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-slate-300 text-slate-500",
                          isSubmitted &&
                            feedback?.correctIndices.includes(index) &&
                            "bg-green-500 text-white border-green-500",
                          isSubmitted &&
                            isSelected &&
                            !feedback?.correctIndices.includes(index) &&
                            "bg-red-500 text-white border-red-500"
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                    <span className="font-medium text-slate-700 text-lg flex-1">
                      {option}
                    </span>
                    <div className="shrink-0">
                      {/* Optional end icon */}
                      {isSubmitted &&
                        feedback?.correctIndices.includes(index) && (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        )}
                      {isSubmitted &&
                        isSelected &&
                        !feedback?.correctIndices.includes(index) && (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Section */}
            {isSubmitted && feedback && (
              <div
                className={cn(
                  "rounded-2xl p-6 border-2 flex gap-4",
                  feedback.correct
                    ? "bg-green-50 border-green-100 text-green-900"
                    : "bg-red-50 border-red-100 text-red-900"
                )}
              >
                <div className="text-3xl shrink-0">
                  {feedback.correct ? "🎉" : "❌"}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">
                    {feedback.correct ? "Correct!" : "Not quite"}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {feedback.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedIndices.length === 0}
                  className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-lg font-semibold h-14 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-lg font-semibold h-14 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  {isLastQuestion ? "View Summary →" : "Next Question →"}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
