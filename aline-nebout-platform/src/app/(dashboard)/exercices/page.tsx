import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Mes exercices",
  description:
    "Retrouvez vos programmes d'exercices personnalisés pour améliorer votre foulée et votre condition physique.",
};

// TODO: Replace with data from Supabase
const programs = [
  {
    id: "programme-foulee-s1",
    title: "Programme foulée — Semaine 1",
    description:
      "Exercices de base pour améliorer votre posture de course et votre cadence. Idéal pour les débutants.",
    totalExercises: 5,
    completedExercises: 3,
  },
  {
    id: "renforcement-musculaire-coureur",
    title: "Renforcement musculaire coureur",
    description:
      "Programme de renforcement ciblé pour les muscles sollicités en course à pied : quadriceps, ischio-jambiers, mollets et gainage.",
    totalExercises: 8,
    completedExercises: 2,
  },
];

export default function ExercicesPage() {
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
    </div>
  );
}
