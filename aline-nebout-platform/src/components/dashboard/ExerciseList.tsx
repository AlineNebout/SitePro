"use client";

import { useState } from "react";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  repetitions: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  initialCompletions: string[];
}

export default function ExerciseList({
  exercises,
  initialCompletions,
}: ExerciseListProps) {
  const [completions, setCompletions] = useState<Set<string>>(
    new Set(initialCompletions)
  );

  const completedCount = completions.size;
  const totalCount = exercises.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  function toggleExercise(id: string) {
    setCompletions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    // TODO: Persist completion state to Supabase
  }

  return (
    <div className="space-y-6">
      {/* Completion bar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-dark">
            Progression
          </span>
          <span className="text-sm font-semibold text-emerald-600">
            {completedCount}/{totalCount} — {percentage}%
          </span>
        </div>
        <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percentage}% complété`}
          />
        </div>
      </div>

      {/* Exercise items */}
      <ul className="space-y-3">
        {exercises.map((exercise) => {
          const isCompleted = completions.has(exercise.id);
          return (
            <li
              key={exercise.id}
              className={`bg-white/70 backdrop-blur-sm rounded-xl border p-4 transition-all duration-300 ${
                isCompleted
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-white/40 hover:border-emerald-200"
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleExercise(exercise.id)}
                    className="sr-only peer"
                    aria-label={`Marquer "${exercise.name}" comme ${isCompleted ? "non complété" : "complété"}`}
                  />
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-emerald-300 group-hover:border-emerald-400"
                    }`}
                  >
                    {isCompleted && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium transition-colors duration-300 ${
                      isCompleted
                        ? "text-emerald-700 line-through"
                        : "text-text-dark"
                    }`}
                  >
                    {exercise.name}
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">
                    {exercise.description}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {exercise.repetitions}
                  </span>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
