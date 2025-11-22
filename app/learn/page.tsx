import { ModuleList } from "@/components/learn/ModuleList";

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Path</h1>
        <p className="text-muted-foreground">
          Master healthy relationship skills step by step.
        </p>
      </div>
      
      <ModuleList />
    </div>
  );
}


