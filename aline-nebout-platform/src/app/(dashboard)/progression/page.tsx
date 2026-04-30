import type { Metadata } from "next";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Ma progression",
  description:
    "Suivez votre progression en coaching foulée : séances réalisées, exercices complétés et historique d'activité.",
};

// TODO: Replace with data from Supabase
const stats = [
  {
    label: "Séances réalisées",
    value: "3",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    label: "Exercices complétés",
    value: "12",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Semaines actives",
    value: "4",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0116.5 19.875V4.125z"
        />
      </svg>
    ),
  },
];

const timeline = [
  {
    date: "12 juin 2025",
    title: "Séance coaching foulée #3",
    description:
      "Travail sur la cadence et la posture en côte. Bonne progression sur le placement du bassin.",
  },
  {
    date: "5 juin 2025",
    title: "Programme renforcement — 2 exercices complétés",
    description:
      "Squats et fentes avant terminés. Bonne exécution, augmenter les répétitions la semaine prochaine.",
  },
  {
    date: "28 mai 2025",
    title: "Séance coaching foulée #2",
    description:
      "Focus sur les éducatifs : montées de genoux et talons-fesses. Amélioration notable de la réactivité au sol.",
  },
];

export default function ProgressionPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            Ma progression
          </h1>
          <p className="text-text-muted mt-1">
            Suivez votre évolution et restez motivé
          </p>
        </div>
      </ScrollReveal>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <ScrollReveal key={stat.label} delay={0.1 * (index + 1)}>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-emerald-600">
                {stat.value}
              </p>
              <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Chart placeholder */}
      <ScrollReveal delay={0.3}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-8">
          <h2 className="font-heading text-lg text-text-dark mb-4">
            Graphique de progression
          </h2>
          <div className="flex items-center justify-center h-48 bg-emerald-50/50 rounded-xl border-2 border-dashed border-emerald-200">
            <div className="text-center">
              <svg
                className="w-10 h-10 text-emerald-300 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0116.5 19.875V4.125z"
                />
              </svg>
              <p className="text-sm text-emerald-500 font-medium">
                Graphique de progression — disponible après 2 séances
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Activity timeline */}
      <ScrollReveal delay={0.4}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-8">
          <h2 className="font-heading text-lg text-text-dark mb-6">
            Historique d&apos;activité
          </h2>
          <div className="space-y-0">
            {timeline.map((entry, index) => (
              <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Timeline line */}
                {index < timeline.length - 1 && (
                  <div
                    className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-emerald-200"
                    aria-hidden="true"
                  />
                )}
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 -mt-0.5">
                  <time className="text-xs text-text-muted font-medium">
                    {entry.date}
                  </time>
                  <h3 className="text-sm font-semibold text-text-dark mt-0.5">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Encouragement */}
      <ScrollReveal delay={0.5}>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-6 sm:p-8 text-center">
          <svg
            className="w-10 h-10 text-emerald-500 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <h2 className="font-heading text-xl text-text-dark mb-2">
            Continuez comme ça !
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            La régularité est la clé de la progression. Chaque séance vous
            rapproche de vos objectifs. Pensez à pratiquer vos exercices 2 à 3
            fois par semaine pour des résultats optimaux.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
