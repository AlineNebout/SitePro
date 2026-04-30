import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Locations — Pôle Santé",
  description:
    "Espaces de consultation disponibles à la location au Pôle Santé de Rochetaillée-sur-Saône. Bureaux meublés avec accès salle d'attente et parking.",
};

const rentalSpaces = [
  {
    id: "bureau-a",
    name: "Bureau de consultation A",
    surface: "15 m²",
    features: ["Meublé", "Accès salle d'attente", "Parking gratuit", "Wifi inclus"],
    pricing: {
      halfDay: "30 €",
      fullDay: "50 €",
    },
    description:
      "Bureau spacieux et lumineux, idéal pour les consultations individuelles. Équipé d'un bureau, de deux chaises, d'une table d'examen et d'un point d'eau.",
  },
  {
    id: "bureau-b",
    name: "Bureau de consultation B",
    surface: "12 m²",
    features: ["Meublé", "Accès salle d'attente", "Parking gratuit", "Wifi inclus"],
    pricing: {
      halfDay: "25 €",
      fullDay: "45 €",
    },
    description:
      "Bureau confortable et fonctionnel, adapté aux consultations et entretiens. Équipé d'un bureau, de deux chaises et d'un rangement.",
  },
];

export default function LocationsPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Pôle Santé", href: "/pole-sante" },
              { label: "Locations" },
            ]}
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Professionnels de santé
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Espaces disponibles à la location
            </h1>
            <p className="text-text-muted text-lg max-w-3xl">
              Des bureaux de consultation sont disponibles au sein du Pôle Santé de
              Rochetaillée-sur-Saône pour les professionnels de santé et du social souhaitant
              exercer dans un cadre agréable et bien équipé.
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

      {/* Rental spaces */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {rentalSpaces.map((space, i) => (
              <ScrollReveal key={space.id} delay={i * 0.15}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6 text-primary"
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
                    <div>
                      <h2 className="font-heading text-xl text-text-dark">{space.name}</h2>
                      <p className="text-primary font-semibold text-sm">{space.surface}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-muted leading-relaxed mb-6">{space.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {space.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-text-muted text-sm">
                        <svg
                          className="w-4 h-4 text-primary shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="bg-bg-soft rounded-xl p-4 mb-6 mt-auto">
                    <p className="text-text-dark font-semibold text-sm mb-2">Tarifs</p>
                    <div className="flex items-baseline gap-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {space.pricing.halfDay}
                        </span>
                        <span className="text-text-muted text-sm"> / demi-journée</span>
                      </div>
                      <div className="text-text-muted/40">|</div>
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {space.pricing.fullDay}
                        </span>
                        <span className="text-text-muted text-sm"> / journée</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none w-full"
                  >
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    Demander des informations
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Avantages
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-dark">
              Pourquoi exercer au Pôle Santé ?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Cadre pluridisciplinaire",
                text: "Exercez aux côtés d'autres professionnels de santé pour un accompagnement complet des patients.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                ),
              },
              {
                title: "Emplacement idéal",
                text: "À 15 min de Lyon, 5 min de Neuville-sur-Saône, avec stationnement gratuit pour vos patients.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                ),
              },
              {
                title: "Tout équipé",
                text: "Bureaux meublés, salle d'attente partagée, wifi et parking. Vous n'avez qu'à exercer.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                ),
              },
            ].map((advantage, i) => (
              <ScrollReveal key={advantage.title} delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm text-center h-full">
                  <div
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      {advantage.icon}
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg text-text-dark mb-2">{advantage.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{advantage.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/pole-sante"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Retour au Pôle Santé
          </Link>
        </div>
      </section>
    </>
  );
}
