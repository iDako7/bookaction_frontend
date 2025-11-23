"use client";

import { ConceptListItem } from "@/lib/types/api";
import { ConceptItem } from "./ConceptItem";

interface ConceptListProps {
  moduleId: number;
  concepts: ConceptListItem[];
}

export function ConceptList({ moduleId, concepts }: ConceptListProps) {
  return (
    <div className="space-y-4">
      {concepts.map((concept, index) => (
        <ConceptItem
          key={concept.id}
          moduleId={moduleId}
          concept={concept}
          index={index}
        />
      ))}
    </div>
  );
}
