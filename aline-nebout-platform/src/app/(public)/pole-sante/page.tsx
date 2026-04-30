import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import PractitionerFilter from "@/components/content/PractitionerFilter";

export const metadata: Metadata = {
  title: "Pôle Santé de Rochetaillée-sur-Saône",
  description:
    "Le Pôle Santé de Rochetaillée-sur-Saône regroupe des professionnels de santé et du social : ostéopathe, orthophoniste, infirmiers, sage-femme, éducatrice spécialisée.",
};

const practitioners = [
  {
    name: "Aline Nebout",
    profession: "Ostéopathe D.O.",
    description:
      "Ostéopathie douce, réflexes archaïques, coaching foulée. Spécialisée femme enceinte, nourrisson, sportif et somato-émotionnel.",
    slug: "aline-nebout",
  },
  {
    name: "Marion Grosdemange",
    profession: "Orthophoniste",
    description:
      "Prise en charge des troubles du langage oral et écrit, de la voix et de la déglutition chez l'enfant et l'adulte.",
    slug: "marion-grosdemange",
  },
  {
    name: "Charles Porot",
    profession: "Infirmier",
    description:
      "Soins infirmiers à domicile et au cabinet. Prélèvements, injections, pansements et suivi des traitements.",
    slug: "charles-porot",
  },
  {
    name: "Clémentine Lyonnet",
    profession: "Infirmière",
    description:
      "Soins infirmiers à domicile et au cabinet. Accompagnement des patients dans leur parcours de soins.",
    slug: "clementine-lyonnet",
  },
  {
    name: "Tiffany Charry",
    profession: "Éducatrice spécialisée",
    description:
      "Accompagnement éducatif et social des enfants et adultes en situation de handicap ou de difficulté. Au Pôle Santé depuis 2024.",
    slug: "tiffany-charry",
  },
  {
    name: "Sophie Pierre",
    profession: "Sage-femme",
    description:
      "Suivi de grossesse, préparation à la naissance, rééducation périnéale et accompagnement post-partum.",
    slug: "sophie-pierre",
    location: "Fontaines-sur-Saône (partenaire)",
  },
];

export default function PoleSantePage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: "Pôle Santé" }]} />
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Notre équipe
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Pôle Santé de Rochetaillée-sur-Saône
            </h1>
            <p className="text-text-muted text-lg max-w-3xl">
              Le Pôle Santé regroupe des professionnels de santé et du social au service de votre
              bien-être.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-2 mt-4 text-text-muted text-sm">
              <svg
                className="w-4 h-4 text-primary shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Practitioners */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Annuaire
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-dark">
              Nos praticiens
            </h2>
          </ScrollReveal>
          <PractitionerFilter practitioners={practitioners} />
        </div>
      </section>

      {/* CTA Locations */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 rounded-2xl p-8 sm:p-12 text-center">
              <div
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Espaces disponibles à la location
              </h2>
              <p className="text-text-muted max-w-lg mx-auto mb-8">
                Vous êtes professionnel de santé ou du social ? Des bureaux de consultation sont
                disponibles au sein du Pôle Santé.
              </p>
              <Link
                href="/pole-sante/locations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                Voir les espaces disponibles
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
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
      </section>

      {/* Contact info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center">
            <p className="text-text-muted text-sm">
              Pôle Santé de Rochetaillée-sur-Saône — 324 quai Pierre Dupont
            </p>
            <p className="text-text-muted text-sm mt-1">
              À 15 min de Lyon, 5 min de Neuville-sur-Saône — Stationnement gratuit
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
