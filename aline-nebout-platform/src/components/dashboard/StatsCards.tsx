"use client";

interface StatsCardsProps {
  totalSessions: number;
  totalExercises: number;
  activeWeeks: number;
}

const statIcons = {
  sessions: (
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
  exercises: (
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
  weeks: (
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
};

export default function StatsCards({
  totalSessions,
  totalExercises,
  activeWeeks,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Séances réalisées",
      value: totalSessions.toString(),
      icon: statIcons.sessions,
    },
    {
      label: "Exercices complétés",
      value: totalExercises.toString(),
      icon: statIcons.exercises,
    },
    {
      label: "Semaines actives",
      value: activeWeeks.toString(),
      icon: statIcons.weeks,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
            {stat.icon}
          </div>
          <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
          <p className="text-sm text-text-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
