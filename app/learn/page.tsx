import { ModuleList } from "@/components/learn/ModuleList";

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#2b7fff] to-[#00b8db] shadow-lg shadow-blue-500/20">
          <span className="bg-[#ffdf20] w-2 h-2 rounded-full opacity-90" />
          <span className="text-sm font-bold text-white tracking-wide">
            🚀 Your Learning Journey
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400">
            Level Up Your
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400">
            Relationship Skills ⚡
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-600 max-w-2xl font-medium">
          Master essential communication skills through interactive lessons. Let's get started! 💪
        </p>
      </div>

      <ModuleList />
    </div>
  );
}
