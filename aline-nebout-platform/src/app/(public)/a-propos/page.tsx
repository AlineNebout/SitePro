import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours d'Aline Nebout, ostéopathe D.O. diplômée depuis 2010, spécialisée en ostéopathie douce, femme enceinte, nourrisson, sportif et réflexes archaïques. Cabinet au Pôle Santé de Rochetaillée-sur-Saône.",
};

const timeline = [
  { year: "2010", label: "Diplôme d'ostéopathie — ISL Limonest (6 ans d'études)" },
  { year: "2010", label: "Ostéopathie générale — installation en cabinet" },
  { year: "2012", label: "Spécialisation femme enceinte & jeune maman" },
  { year: "2013", label: "Spécialisation nourrisson & enfant" },
  { year: "2015", label: "Formation somato-émotionnel & gestion du stress" },
  { year: "2017", label: "Formation traitement des cicatrices" },
  { year: "2018", label: "Spécialisation sportifs — trail & triathlon" },
  { year: "2024", label: "Formation réflexes archaïques" },
  { year: "2024", label: "Coaching foulée en course à pied" },
];

const team = [
  {
    name: "Marion Grosdemange",
    role: "Orthophoniste",
    location: null,
  },
  {
    name: "Charles Porot",
    role: "Infirmier",
    location: null,
  },
  {
    name: "Clémentine Lyonnet",
    role: "Infirmière",
    location: null,
  },
  {
    name: "Tiffany Charry",
    role: "Éducatrice spécialisée",
    location: "Depuis 2024",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: "À propos" }]} />
        </div>
      </section>

      {/* Portrait & Bio */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Portrait */}
            <ScrollReveal direction="left" className="md:col-span-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/portrait.jpg"
                  alt="Aline Nebout, ostéopathe D.O. à Rochetaillée-sur-Saône"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="right" className="md:col-span-3">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Votre ostéopathe
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl text-text-dark mb-6">
                Aline Nebout
              </h1>
              <div className="space-y-4 text-text-muted leading-relaxed text-lg">
                <p>
                  Diplômée en 2010 de l&apos;Institut Supérieur de Limonest (ISL), Aline a suivi
                  6 années d&apos;études pour obtenir son diplôme d&apos;ostéopathe D.O. C&apos;est
                  lors d&apos;un stage de 3ème au collège qu&apos;elle découvre l&apos;ostéopathie
                  et se passionne immédiatement pour cette discipline manuelle qui considère le corps
                  dans sa globalité.
                </p>
                <p>
                  Au fil des années, Aline a enrichi sa pratique en se formant dans de nombreuses
                  spécialités : femme enceinte, nourrisson, somato-émotionnel, cicatrices, sport et
                  plus récemment les réflexes archaïques et le coaching foulée. Chaque formation
                  vient nourrir une approche toujours plus complète et personnalisée.
                </p>
                <p>
                  Sportive dans l&apos;âme, Aline est elle-même traileuse et triathlète. Cette
                  pratique personnelle lui permet de comprendre de l&apos;intérieur les contraintes
                  du corps en mouvement et d&apos;accompagner au mieux les sportifs dans leur
                  préparation et leur récupération.
                </p>
                <p>
                  Maman de deux filles, elle porte un regard bienveillant et attentif sur
                  l&apos;accompagnement des familles, de la grossesse aux premières années de vie de
                  l&apos;enfant.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trail photo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Aline-Trail.jpg"
                alt="Aline Nebout en trail — traileuse et triathlète"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-heading text-lg sm:text-xl">
                  Traileuse &amp; triathlète
                </p>
                <p className="text-white/80 text-sm">
                  Comprendre le sport de l&apos;intérieur pour mieux accompagner les sportifs
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Parcours
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">
              Formations &amp; spécialisations
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-primary-light"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 pl-2">
                    <div
                      className="relative z-10 w-3 h-3 rounded-full bg-primary mt-2 shrink-0 ring-4 ring-bg-soft"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-primary font-semibold text-sm">{item.year}</span>
                      <p className="text-text-dark">{item.label}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Réseau
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">
              Collaborations professionnelles
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Aline travaille en lien étroit avec d&apos;autres professionnels de santé pour offrir
              un accompagnement complet et cohérent à ses patients.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm text-center">
                  <div
                    className="w-12 h-12 rounded-full bg-primary-light/30 flex items-center justify-center mx-auto mb-4"
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg text-text-dark">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold">{member.role}</p>
                  {member.location && (
                    <p className="text-text-muted text-xs mt-1">{member.location}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cabinet */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Le cabinet
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">
              Pôle Santé de Rochetaillée-sur-Saône
            </h2>
            <p className="text-text-muted mt-4">324 quai Pierre Dupont</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/cabinet-1.jpg"
                  alt="Cabinet d'ostéopathie Aline Nebout — salle de consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/cabinet-2.jpg"
                  alt="Cabinet d'ostéopathie Aline Nebout — espace d'accueil"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-sm text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Envie de prendre soin de vous ?
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Prenez rendez-vous en ligne sur Doctolib ou contactez le cabinet directement.
                Consultation de 45 minutes — 65&nbsp;€.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <DoctolibButton variant="primary" label="Prendre rendez-vous" />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
