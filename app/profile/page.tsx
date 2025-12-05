"use client";

import { useRouter } from "next/navigation";
import { useModulesOverview } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { useAuthStore } from "@/lib/state/authStore";
import { api } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Flame,
  BookOpen,
  Star,
  TrendingUp,
  Award,
  Lock,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: modulesOverview, isLoading } = useModulesOverview();
  const { user, logout } = useAuthStore();

  // Access store directly to get current progress state

  const getModuleProgress = useProgressStore(
    (state) => state.getModuleProgress
  );

  const handleLogout = async () => {
    try {
      await api.logout();
      logout();
      useProgressStore.getState().reset();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading || !modulesOverview) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  // Calculate Stats using Store + Static Overview
  const modules = modulesOverview.modules;

  // Calculate total concepts across all modules
  let totalConcepts = 0;
  let completedConcepts = 0;

  modules.forEach((m) => {
    const moduleTotal = m.concepts.length;
    totalConcepts += moduleTotal;

    // Get completion from store helper if available, or manual check
    // The helper returns percentage, so we can back-calculate or just check the concept states directly if we had them.
    // Since store has `getConceptCompletionPercentage`, let's use the raw state for precise counts.
    const progress = getModuleProgress(m.id);
    if (progress) {
      // Count concepts marked as summary viewed (completed) in the store
      const completedInModule = Object.values(progress.concepts).filter(
        (c) => c.summaryViewed
      ).length;
      completedConcepts += completedInModule;
    }
  });

  const overallProgress =
    totalConcepts > 0
      ? Math.round((completedConcepts / totalConcepts) * 100)
      : 0;

  // Trophy Logic
  // Assuming Module 1 is "Active Listening" (ID 1 or Order 1) and Module 2 is "Expressing Needs"
  // We check if the module is marked completed in the store (which happens after reflection)
  const trophies = [
    {
      id: 1,
      title: "Listening Master",
      description:
        "Mastered the art of active listening and meaningful conversation",
      moduleId: modules[0]?.id, // Link to first module
      icon: (
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          🎧
        </div>
      ),
      // Check store for module completion
      earned: !!getModuleProgress(modules[0]?.id)?.completed,
    },
    {
      id: 2,
      title: "Communication Pro",
      description: "Completed 'Expressing Needs' to unlock this trophy",
      moduleId: modules[1]?.id,
      icon: (
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
          🗣️
        </div>
      ),
      earned: !!getModuleProgress(modules[1]?.id)?.completed,
    },
  ];

  const earnedTrophiesCount = trophies.filter((t) => t.earned).length;

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <Card className="bg-white border-blue-100 shadow-sm overflow-hidden rounded-2xl p-8 flex flex-col items-center text-center relative">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              className="text-slate-500 hover:text-slate-700"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mb-4">
            <User className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {user?.username || "Your Profile"}
          </h1>
          <p className="text-slate-600 text-lg mt-2">
            {user?.email || "Keep building your relationship skills!"}
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak */}
          <Card className="p-6 flex flex-col items-center justify-center text-center border-blue-100 shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-4 shadow-sm">
              <Flame className="w-8 h-8" fill="currentColor" />
            </div>
            <div className="text-4xl font-bold text-slate-900">7</div>
            <div className="text-slate-500 font-medium">Day Streak</div>
          </Card>

          {/* Lessons Completed */}
          <Card className="p-6 flex flex-col items-center justify-center text-center border-blue-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4 shadow-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold text-slate-900">
              {completedConcepts}
            </div>
            <div className="text-slate-500 font-medium">Lessons Completed</div>
          </Card>

          {/* Overall Progress */}
          <Card className="p-6 flex flex-col items-center justify-center text-center border-blue-100 shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-500 mb-4 shadow-sm">
              <Star className="w-8 h-8" fill="currentColor" />
            </div>
            <div className="text-4xl font-bold text-slate-900">
              {overallProgress}%
            </div>
            <div className="text-slate-500 font-medium">Overall Progress</div>
          </Card>
        </div>

        {/* Learning Journey Card */}
        <Card className="p-8 border-blue-100 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Your Learning Journey
              </h3>
              <p className="text-slate-500">
                {completedConcepts} of {totalConcepts} lessons completed
              </p>
            </div>
          </div>

          <div className="mb-8">
            <Progress value={overallProgress} className="h-4 bg-blue-100" />
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 flex gap-4 items-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Keep Going!</h4>
              <p className="text-slate-600 text-sm">
                You&apos;re making great progress!{" "}
                {totalConcepts - completedConcepts} more lessons to go.
              </p>
            </div>
          </div>
        </Card>

        {/* Trophy Collection */}
        <Card className="p-8 border-blue-100 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Trophy Collection
              </h3>
              <p className="text-slate-500">
                {earnedTrophiesCount} of {trophies.length} trophies earned
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trophies.map((trophy) => (
              <div
                key={trophy.id}
                className={cn(
                  "border-2 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden transition-all",
                  trophy.earned
                    ? "bg-amber-50/50 border-amber-200"
                    : "bg-slate-50 border-slate-200 opacity-70"
                )}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm",
                      trophy.earned ? "bg-white" : "bg-slate-200"
                    )}
                  >
                    {trophy.earned ? (
                      trophy.icon
                    ) : (
                      <Lock className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {trophy.earned ? trophy.title : "???"}
                    </h4>
                    {trophy.earned && (
                      <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                        Earned
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {trophy.description}
                </p>

                {!trophy.earned && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>
                        {/* Calculate specific module progress for locked state */}
                        {getModuleProgress(trophy.moduleId!)
                          ? Object.values(
                              getModuleProgress(trophy.moduleId!)!.concepts
                            ).filter((c) => c.summaryViewed).length
                          : 0}{" "}
                        /{" "}
                        {modules.find((m) => m.id === trophy.moduleId)?.concepts
                          .length || 3}{" "}
                        lessons
                      </span>
                    </div>
                    <Progress
                      value={
                        getModuleProgress(trophy.moduleId!)
                          ? (Object.values(
                              getModuleProgress(trophy.moduleId!)!.concepts
                            ).filter((c) => c.summaryViewed).length /
                              (modules.find((m) => m.id === trophy.moduleId)
                                ?.concepts.length || 1)) *
                            100
                          : 0
                      }
                      className="h-2 bg-slate-200"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
