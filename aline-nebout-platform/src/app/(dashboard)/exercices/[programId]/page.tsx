"use client";

import { useEffect, useState, use } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ExerciseList from "@/components/dashboard/ExerciseList";
import ScrollReveal from "@/components/animation/ScrollReveal";
import type { Exercise } from "@/components/dashboard/ExerciseList";

interface ProgramData {
  program: {
    id: string;
    title: string;
    description: string;
  };
  exercises: Array<{
    id: string;
    name: string;
    description: string;
    repetitions: string;
    sort_order: number;
  }>;
  completedIds: string[];
}

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = use(params);
  const [data, setData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProgram() {
      try {
        const res = await fetch(`/api/exercises/${programId}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProgram();
  }, [programId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-emerald-100 rounded w-1/4 mb-6" />
          <div className="h-7 bg-emerald-100 rounded w-1/2 mb-3" />
          <div className="h-4 bg-emerald-50 rounded w-3/4 mb-6" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-white/70 rounded-xl border border-emerald-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="font-heading text-2xl text-text-dark mb-2">
          Programme introuvable
        </h1>
        <p className="text-text-muted">
          Ce programme n&apos;existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  const exercises: Exercise[] = data.exercises.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description ?? "",
    repetitions: e.repetitions ?? "",
  }));

  const completedCount = data.completedIds.length;
  const totalCount = exercises.length;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumb
        items={[
          { label: "Exercices", href: "/exercices" },
          { label: data.program.title },
        ]}
      />

      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            {data.program.title}
          </h1>
          <p className="text-text-muted mt-2">{data.program.description}</p>
          <p className="text-sm text-emerald-600 font-medium mt-3">
            {completedCount} sur {totalCount} exercices complétés ({percentage}%)
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <ExerciseList
          exercises={exercises}
          initialCompletions={data.completedIds}
          programId={programId}
        />
      </ScrollReveal>
    </div>
  );
}
