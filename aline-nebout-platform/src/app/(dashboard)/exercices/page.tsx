"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface ProgramWithProgress {
  id: string;
  title: string;
  description: string;
  totalExercises: number;
  completedExercises: number;
}

export default function ExercicesPage() {
  const [programs, setPrograms] = useState<ProgramWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch("/api/exercises");
        if (res.ok) {
          const data = await res.json();
          setPrograms(data);
        }
      } catch {
        // Silently fail — show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            Mes exercices
          </h1>
          <p className="text-text-muted mt-1">
            Vos programmes d&apos;exercices personnalisés
          </p>
        </div>
      </ScrollReveal>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 animate-pulse"
            >
              <div className="h-5 bg-emerald-100 rounded w-1/3 mb-3" />
              <div className="h-4 bg-emerald-50 rounded w-2/3 mb-4" />
              <div className="h-2.5 bg-emerald-100 rounded-full w-full" />
            </div>
          ))}
        </div>
      ) : programs.length === 0 ? (
        <ScrollReveal delay={0.1}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </div>
            <h2 className="font-heading text-lg text-text-dark mb-2">
              Aucun programme assigné
            </h2>
            <p className="text-text-muted text-sm max-w-sm mx-auto">
              Votre coach vous assignera des programmes d&apos;exercices
              personnalisés après votre première séance.
            </p>
            <Link
              href="/coaching/ateliers"
              className="inline-block mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Réserver un atelier &rarr;
            </Link>
          </div>
        </ScrollReveal>
      ) : (
        <div className="space-y-4">
          {programs.map((program, index) => {
            const percentage =
              program.totalExercises > 0
                ? Math.round(
                    (program.completedExercises / program.totalExercises) * 100
                  )
                : 0;

            return (
              <ScrollReveal key={program.id} delay={0.1 * (index + 1)}>
                <Link
                  href={`/exercices/${program.id}`}
                  className="block bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100/50 transition-all duration-200 cursor-pointer group focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-heading text-lg text-text-dark group-hover:text-emerald-700 transition-colors duration-200">
                        {program.title}
                      </h2>
                      <p className="text-text-muted text-sm mt-1">
                        {program.description}
                      </p>
                      <p className="text-xs text-emerald-600 font-medium mt-2">
                        {program.totalExercises} exercices
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex-shrink-0 sm:w-32 sm:text-right">
                      <span className="text-2xl font-bold text-emerald-600">
                        {percentage}%
                      </span>
                      <p className="text-xs text-text-muted">complété</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                        role="progressbar"
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${program.title} : ${percentage}% complété`}
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-1.5">
                      {program.completedExercises} sur {program.totalExercises}{" "}
                      exercices terminés
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
