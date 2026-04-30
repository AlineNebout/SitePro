import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description:
    "Votre espace coaching personnel. Suivez vos exercices, votre progression et vos prochaines séances.",
};

// TODO: Replace with actual user data from Supabase
const userName = "Utilisateur";

export default function TableauDeBordPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            Bonjour, {userName}
          </h1>
          <p className="text-text-muted mt-1">
            Bienvenue dans votre espace coaching. Voici un résumé de votre
            activité.
          </p>
        </div>
      </ScrollReveal>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upcoming sessions */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
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
              </div>
              <h2 className="font-heading text-base text-text-dark">
                Prochaines séances
              </h2>
            </div>
            <div className="text-center py-4">
              <p className="text-text-muted text-sm">
                Aucune séance programmée pour le moment.
              </p>
              <Link
                href="/coaching/ateliers"
                className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
              >
                Réserver un atelier &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Recent activity */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-base text-text-dark">
                Activité récente
              </h2>
            </div>
            <div className="text-center py-4">
              <p className="text-text-muted text-sm">
                Commencez un programme d&apos;exercices pour voir votre activité
                ici.
              </p>
              <Link
                href="/exercices"
                className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
              >
                Voir les exercices &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Current program status */}
        <ScrollReveal delay={0.3}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 h-full sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
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
              </div>
              <h2 className="font-heading text-base text-text-dark">
                Programme en cours
              </h2>
            </div>
            <div className="text-center py-4">
              <p className="text-text-muted text-sm">
                Aucun programme actif. Explorez les exercices disponibles pour
                démarrer.
              </p>
              <Link
                href="/exercices"
                className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
              >
                Découvrir les programmes &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.4}>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-6 sm:p-8 text-center">
          <h2 className="font-heading text-xl text-text-dark mb-2">
            Prêt à progresser ?
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto mb-5">
            Réservez un atelier de coaching foulée pour bénéficier d&apos;un
            accompagnement personnalisé et améliorer votre technique de course.
          </p>
          <Link
            href="/coaching/ateliers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Réserver un atelier
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
