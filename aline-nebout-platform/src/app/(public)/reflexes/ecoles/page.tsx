import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import DoctolibButton from "@/components/booking/DoctolibButton";
import SchoolContactForm from "@/components/forms/SchoolContactForm";

export const metadata: Metadata = {
  title: "Écoles & Professionnels — Réflexes Archaïques",
  description:
    "Interventions en milieu scolaire : sessions d'information, ateliers pour le personnel, dépistage des réflexes archaïques chez les élèves. Aline Nebout, Rochetaillée-sur-Saône.",
  openGraph: {
    title: "Écoles & Professionnels — Réflexes Archaïques | Aline Nebout",
    description:
      "Interventions en milieu scolaire pour sensibiliser aux réflexes archaïques et accompagner les élèves en difficulté.",
  },
};

const interventions = [
  {
    title: "Sessions d'information",
    description:
      "Conférence de sensibilisation pour les enseignants et le personnel éducatif. Comprendre les réflexes archaïques, repérer les signes chez les élèves et adapter sa pédagogie.",
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    details: [
      "Durée : 1h30 à 2h",
      "Pour les enseignants, AESH, personnel éducatif",
      "Supports pédagogiques fournis",
    ],
  },
  {
    title: "Ateliers pour le personnel",
    description:
      "Formation pratique pour apprendre à repérer les réflexes non intégrés et proposer des exercices simples en classe. Outils concrets pour le quotidien.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    details: [
      "Durée : demi-journée ou journée complète",
      "Exercices pratiques et mises en situation",
      "Fiches-outils à utiliser en classe",
    ],
  },
  {
    title: "Dépistage élèves",
    description:
      "Séances de dépistage individuel ou en petit groupe pour identifier les élèves présentant des réflexes non intégrés. Compte-rendu et recommandations pour chaque enfant.",
    icon: (
      <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    details: [
      "Bilan individuel de 20 minutes par élève",
      "Compte-rendu écrit pour les parents",
      "Recommandations personnalisées",
    ],
  },
];

export default function EcolesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Réflexes Archaïques", href: "/reflexes" },
              { label: "Écoles & Professionnels" },
            ]}
          />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Interventions scolaires
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Écoles &amp; Professionnels
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Aline intervient dans les établissements scolaires et les structures éducatives pour
              sensibiliser aux réflexes archaïques et accompagner les élèves en difficulté.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intervention types */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {interventions.map((intervention, i) => (
              <ScrollReveal key={intervention.title} delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center mb-4">
                    {intervention.icon}
                  </div>
                  <h2 className="font-heading text-lg text-text-dark mb-3">
                    {intervention.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                    {intervention.description}
                  </p>
                  <ul className="space-y-1.5">
                    {intervention.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-text-muted text-xs">
                        <svg
                          className="w-3.5 h-3.5 text-primary shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-white/50 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-6">
              Pourquoi intervenir en milieu scolaire ?
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-4">
              On estime que 20 à 30 % des enfants présentent des réflexes archaïques non intégrés
              qui impactent leurs apprentissages. Ces enfants sont souvent étiquetés comme
              &laquo;&nbsp;agités&nbsp;&raquo;, &laquo;&nbsp;rêveurs&nbsp;&raquo; ou
              &laquo;&nbsp;maladroits&nbsp;&raquo;, alors qu&apos;ils compensent simplement des
              réflexes persistants.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Sensibiliser les équipes éducatives permet de mieux comprendre ces enfants, d&apos;adapter
              les pratiques pédagogiques et d&apos;orienter les familles vers un accompagnement
              adapté.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact form */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-2">
                Demander une intervention
              </h2>
              <p className="text-text-muted text-sm mb-6">
                Remplissez ce formulaire et Aline vous recontactera pour organiser l&apos;intervention
                adaptée à vos besoins.
              </p>
              <SchoolContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Vous êtes un professionnel de santé ?
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Aline collabore avec les orthophonistes, psychomotriciens, psychologues et
                pédiatres pour un accompagnement pluridisciplinaire.
              </p>
              <DoctolibButton variant="primary" label="Prendre contact" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
