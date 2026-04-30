import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface PractitionerData {
  name: string;
  slug: string;
  profession: string;
  metaDescription: string;
  photo?: string;
  photoAlt?: string;
  description: string[];
  specialties: string[];
  contact: {
    phone?: string;
    email?: string;
    location: string;
  };
  hasDoctolib: boolean;
  website: string | null;
  doctolibUrl: string | null;
}

const practitioners: Record<string, PractitionerData> = {
  "aline-nebout": {
    name: "Aline Nebout",
    slug: "aline-nebout",
    profession: "Ostéopathe D.O.",
    metaDescription:
      "Aline Nebout, ostéopathe D.O. au Pôle Santé de Rochetaillée-sur-Saône. Ostéopathie douce, réflexes archaïques, coaching foulée. Spécialisée femme enceinte, nourrisson, sportif.",
    photo: "/images/portrait.jpg",
    photoAlt: "Aline Nebout, ostéopathe D.O. à Rochetaillée-sur-Saône",
    description: [
      "Diplômée en 2010 de l'Institut Supérieur de Limonest (ISL) après 6 années d'études, Aline Nebout exerce l'ostéopathie avec passion depuis plus de 14 ans. Son approche est douce, globale et personnalisée, prenant en compte le corps dans son ensemble pour identifier et traiter les causes profondes des douleurs et déséquilibres.",
      "Au fil des années, Aline a enrichi sa pratique en se formant dans de nombreuses spécialités : femme enceinte, nourrisson, somato-émotionnel, cicatrices, sport, réflexes archaïques et coaching foulée. Sportive dans l'âme, traileuse et triathlète, elle comprend de l'intérieur les contraintes du corps en mouvement et accompagne au mieux les sportifs dans leur préparation et leur récupération.",
    ],
    specialties: [
      "Ostéopathie douce et générale",
      "Réflexes archaïques",
      "Coaching foulée en course à pied",
      "Femme enceinte et jeune maman",
      "Nourrisson et enfant",
      "Somato-émotionnel et gestion du stress",
      "Traitement des cicatrices",
      "Ostéopathie du sport (trail, triathlon)",
    ],
    contact: {
      phone: "04 78 25 28 62",
      location: "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
    },
    hasDoctolib: true,
    website: null,
    doctolibUrl: "https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout",
  },
  "sophie-pierre": {
    name: "Sophie Pierre",
    slug: "sophie-pierre",
    profession: "Sage-femme",
    metaDescription:
      "Sophie Pierre, sage-femme à Fontaines-sur-Saône, partenaire du Pôle Santé de Rochetaillée-sur-Saône. Suivi de grossesse, préparation à la naissance, rééducation périnéale.",
    description: [
      "Sophie Pierre est sage-femme libérale installée à Fontaines-sur-Saône. Elle accompagne les femmes tout au long de leur parcours de maternité : suivi de grossesse, préparation à la naissance, accompagnement à l'accouchement, suivi post-partum et rééducation périnéale.",
      "Partenaire du Pôle Santé de Rochetaillée-sur-Saône, Sophie travaille en étroite collaboration avec Aline Nebout pour offrir un suivi complémentaire et cohérent aux futures et jeunes mamans. Cette approche pluridisciplinaire permet un accompagnement global, de la grossesse aux premiers mois de vie du bébé.",
    ],
    specialties: [
      "Suivi de grossesse",
      "Préparation à la naissance",
      "Accompagnement post-partum",
      "Rééducation périnéale",
      "Conseils en allaitement",
      "Suivi gynécologique de prévention",
    ],
    contact: {
      location: "Fontaines-sur-Saône (partenaire du Pôle Santé)",
    },
    hasDoctolib: false,
    website: null,
    doctolibUrl: null,
  },
  "marion-grosdemange": {
    name: "Marion Grosdemange",
    slug: "marion-grosdemange",
    profession: "Orthophoniste",
    metaDescription:
      "Marion Grosdemange, orthophoniste au Pôle Santé de Rochetaillée-sur-Saône. Troubles du langage oral et écrit, voix, déglutition chez l'enfant et l'adulte.",
    description: [
      "Marion Grosdemange est orthophoniste au Pôle Santé de Rochetaillée-sur-Saône. Elle prend en charge les troubles du langage oral et écrit, de la voix et de la déglutition, aussi bien chez l'enfant que chez l'adulte. Son approche est bienveillante et adaptée à chaque patient.",
      "Les séances d'orthophonie sont prescrites par un médecin et prises en charge par l'Assurance Maladie. Marion propose un bilan initial complet pour évaluer les besoins de chaque patient et mettre en place un plan de rééducation personnalisé, en lien avec les autres professionnels du Pôle Santé.",
    ],
    specialties: [
      "Troubles du langage oral (retard de parole, bégaiement)",
      "Troubles du langage écrit (dyslexie, dysorthographie)",
      "Troubles de la voix (dysphonie)",
      "Troubles de la déglutition",
      "Troubles logico-mathématiques",
      "Rééducation neurologique (aphasie, AVC)",
    ],
    contact: {
      location: "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
    },
    hasDoctolib: false,
    website: null,
    doctolibUrl: null,
  },
  "charles-porot": {
    name: "Charles Porot",
    slug: "charles-porot",
    profession: "Infirmier",
    metaDescription:
      "Charles Porot, infirmier au Pôle Santé de Rochetaillée-sur-Saône. Soins infirmiers à domicile et au cabinet : prélèvements, injections, pansements, suivi des traitements.",
    description: [
      "Charles Porot est infirmier diplômé d'État, exerçant au Pôle Santé de Rochetaillée-sur-Saône et à domicile. Il assure l'ensemble des soins infirmiers courants : prélèvements sanguins, injections, perfusions, pansements, suivi des traitements et accompagnement des patients dans leur parcours de soins.",
      "Disponible et à l'écoute, Charles intervient au cabinet comme à domicile pour garantir la continuité des soins. Il travaille en coordination avec les médecins traitants et les autres professionnels de santé du Pôle pour assurer une prise en charge optimale de chaque patient.",
    ],
    specialties: [
      "Prélèvements sanguins",
      "Injections et perfusions",
      "Pansements et soins de plaies",
      "Suivi des traitements chroniques",
      "Soins post-opératoires",
      "Soins à domicile",
    ],
    contact: {
      location: "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
    },
    hasDoctolib: false,
    website: null,
    doctolibUrl: null,
  },
  "clementine-lyonnet": {
    name: "Clémentine Lyonnet",
    slug: "clementine-lyonnet",
    profession: "Infirmière",
    metaDescription:
      "Clémentine Lyonnet, infirmière au Pôle Santé de Rochetaillée-sur-Saône. Soins infirmiers à domicile et au cabinet, accompagnement des patients dans leur parcours de soins.",
    description: [
      "Clémentine Lyonnet est infirmière diplômée d'État au Pôle Santé de Rochetaillée-sur-Saône. Elle accompagne les patients dans leur parcours de soins avec professionnalisme et bienveillance, que ce soit au cabinet ou à domicile.",
      "En collaboration avec Charles Porot, Clémentine assure une large gamme de soins infirmiers : prélèvements, injections, pansements, suivi des traitements chroniques et soins post-opératoires. Elle veille à la coordination avec les médecins traitants et les autres professionnels du Pôle Santé pour une prise en charge globale et cohérente.",
    ],
    specialties: [
      "Prélèvements sanguins",
      "Injections et perfusions",
      "Pansements et soins de plaies",
      "Suivi des traitements chroniques",
      "Soins post-opératoires",
      "Soins à domicile",
    ],
    contact: {
      location: "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
    },
    hasDoctolib: false,
    website: null,
    doctolibUrl: null,
  },
  "tiffany-charry": {
    name: "Tiffany Charry",
    slug: "tiffany-charry",
    profession: "Éducatrice spécialisée",
    metaDescription:
      "Tiffany Charry, éducatrice spécialisée au Pôle Santé de Rochetaillée-sur-Saône depuis 2024. Accompagnement éducatif et social des enfants et adultes.",
    description: [
      "Tiffany Charry est éducatrice spécialisée, installée au Pôle Santé de Rochetaillée-sur-Saône depuis 2024. Elle accompagne les enfants, adolescents et adultes en situation de handicap, de difficulté sociale ou de vulnérabilité, en proposant un soutien éducatif adapté à chaque situation.",
      "Son approche est centrée sur la personne et vise à favoriser l'autonomie, l'inclusion sociale et le bien-être de chacun. Tiffany travaille en lien avec les familles, les établissements scolaires et les autres professionnels du Pôle Santé pour construire un accompagnement cohérent et personnalisé.",
    ],
    specialties: [
      "Accompagnement éducatif individualisé",
      "Soutien aux enfants en difficulté scolaire",
      "Accompagnement du handicap",
      "Aide à l'autonomie et à l'inclusion sociale",
      "Soutien à la parentalité",
      "Médiation familiale",
    ],
    contact: {
      location: "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
    },
    hasDoctolib: false,
    website: null,
    doctolibUrl: null,
  },
};

const slugs = [
  "aline-nebout",
  "sophie-pierre",
  "marion-grosdemange",
  "charles-porot",
  "clementine-lyonnet",
  "tiffany-charry",
] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = practitioners[slug];

  if (!data) {
    return { title: "Praticien introuvable" };
  }

  return {
    title: `${data.name} — ${data.profession}`,
    description: data.metaDescription,
  };
}

export default async function PractitionerPage({ params }: PageProps) {
  const { slug } = await params;
  const data = practitioners[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Pôle Santé", href: "/pole-sante" },
              { label: data.name },
            ]}
          />
        </div>
      </section>

      {/* Profile */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className={`${data.photo ? "grid md:grid-cols-5 gap-10 items-start" : ""}`}>
            {/* Photo */}
            {data.photo && (
              <ScrollReveal direction="left" className="md:col-span-2">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={data.photo}
                    alt={data.photoAlt ?? `${data.name}, ${data.profession}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Info */}
            <ScrollReveal
              direction={data.photo ? "right" : "up"}
              className={data.photo ? "md:col-span-3" : ""}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {data.profession}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-6">
                {data.name}
              </h1>
              <div className="space-y-4">
                {data.description.map((paragraph, i) => (
                  <p key={i} className="text-text-muted leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-6">
                Domaines de compétences
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {data.specialties.map((specialty, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact info */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-6">
                Informations pratiques
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-text-muted">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 shrink-0"
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
                  <span>{data.contact.location}</span>
                </div>
                {data.contact.phone && (
                  <div className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <a
                      href={`tel:${data.contact.phone.replace(/\s/g, "")}`}
                      className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
                    >
                      {data.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Liens */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-6">
                Liens
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.website && (
                  <Link
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                    Voir le site web
                  </Link>
                )}
                {data.doctolibUrl && (
                  <Link
                    href={data.doctolibUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
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
                    Prendre RDV sur Doctolib
                  </Link>
                )}
                {data.contact.phone && (
                  <a
                    href={`tel:${data.contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    Appeler
                  </a>
                )}
                {!data.website && !data.doctolibUrl && !data.contact.phone && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    Contacter le Pôle Santé
                  </Link>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              {data.hasDoctolib ? (
                <>
                  <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                    Prendre rendez-vous
                  </h2>
                  <p className="text-text-muted mb-8 max-w-lg mx-auto">
                    Réservez votre consultation en ligne sur Doctolib, 24h/24.
                    Pas besoin de passer par votre médecin traitant.
                  </p>
                  <DoctolibButton variant="primary" label="Prendre rendez-vous sur Doctolib" />
                </>
              ) : (
                <>
                  <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                    Contacter {data.name}
                  </h2>
                  <p className="text-text-muted mb-8 max-w-lg mx-auto">
                    Pour prendre rendez-vous ou obtenir des informations, contactez directement le
                    Pôle Santé.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
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
                    Nous contacter
                  </Link>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Back link */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
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
            Retour à l&apos;annuaire du Pôle Santé
          </Link>
        </div>
      </section>
    </>
  );
}
