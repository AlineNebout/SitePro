import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface ReflexData {
  name: string;
  slug: string;
  metaDescription: string;
  spheres: { key: string; label: string }[];
  origin: string;
  integration: string;
  description: string[];
  signs: string[];
  approach: string;
}

const SPHERE_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  motor: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  emotional: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  cognitive: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", dot: "bg-[#10B981]" },
};

const reflexes: Record<string, ReflexData> = {
  moro: {
    name: "Moro",
    slug: "moro",
    metaDescription:
      "Le réflexe de Moro : réflexe de sursaut, apparition à la 10ème semaine intra-utérine, signes de non-intégration et approche d'intégration. Aline Nebout.",
    spheres: [
      { key: "emotional", label: "Émotionnel" },
      { key: "cognitive", label: "Cognitif" },
    ],
    origin: "10ème semaine intra-utérine",
    integration: "3-4 mois",
    description: [
      "Le réflexe de Moro est le réflexe de sursaut du nourrisson. Il apparaît dès la 10ème semaine de vie intra-utérine et constitue le premier système d'alarme du bébé. Face à un stimulus soudain (bruit fort, changement de position, lumière vive), le bébé écarte brusquement les bras et les jambes, puis les ramène vers son corps en pleurant.",
      "Ce réflexe est essentiel à la survie : il déclenche la première inspiration à la naissance et active le système nerveux sympathique (réponse de stress). Il doit normalement s'intégrer entre 3 et 4 mois pour laisser place au réflexe de Strauss, plus mature.",
      "Lorsque le réflexe de Moro persiste, le système nerveux reste en état d'alerte permanent. L'enfant (ou l'adulte) sursaute au moindre stimulus, a du mal à gérer ses émotions et se fatigue rapidement car son corps mobilise en permanence des ressources pour gérer ce stress de fond.",
    ],
    signs: [
      "Sursauter au moindre bruit ou stimulus inattendu",
      "Difficulté à gérer la frustration",
      "Sauts d'humeur fréquents et réactions disproportionnées",
      "Difficultés de concentration et d'attention",
      "Hypersensibilité tactile (étiquettes, textures)",
      "Fatigue chronique inexpliquée",
      "Peur des roulades, de la planche (piscine)",
    ],
    approach:
      "L'intégration du réflexe de Moro passe par des mouvements rythmiques doux qui reproduisent le schéma du réflexe de manière contrôlée. Des exercices de bercement, de stimulation vestibulaire et de travail sur la respiration permettent au système nerveux de maturer et d'intégrer progressivement ce réflexe. Les résultats se manifestent souvent par une diminution de l'hypersensibilité et une meilleure gestion émotionnelle.",
  },
  galant: {
    name: "Galant",
    slug: "galant",
    metaDescription:
      "Le réflexe de Galant : flexion latérale de la colonne, apparition à la 20ème semaine, signes de non-intégration et approche d'intégration. Aline Nebout.",
    spheres: [
      { key: "motor", label: "Moteur" },
      { key: "cognitive", label: "Cognitif" },
    ],
    origin: "20ème semaine intra-utérine",
    integration: "8-9 mois",
    description: [
      "Le réflexe de Galant se manifeste par une flexion latérale de la colonne vertébrale lorsqu'on stimule un côté du dos du bébé. Il apparaît vers la 20ème semaine de vie intra-utérine et joue un rôle important dans le processus de naissance en aidant le bébé à descendre dans le canal pelvien.",
      "Ce réflexe participe également au développement de la mobilité de la colonne vertébrale et à la coordination des mouvements latéraux. Il doit normalement s'intégrer entre 8 et 9 mois.",
      "Lorsqu'il persiste, l'enfant présente souvent une agitation importante, notamment en position assise. Le contact du dossier de la chaise sur le dos peut réactiver le réflexe, provoquant des mouvements involontaires. C'est l'un des réflexes les plus fréquemment associés à l'agitation en classe et à l'énurésie.",
    ],
    signs: [
      "Agitation en position assise, se tortille sur sa chaise",
      "Difficultés de concentration en classe",
      "Problèmes de dos, tendance à la scoliose",
      "Confusion droite/gauche",
      "Énurésie (pipi au lit) au-delà de 5 ans",
      "Hypersensibilité tactile au niveau du dos",
    ],
    approach:
      "L'intégration du réflexe de Galant utilise des mouvements de glissement le long de la colonne vertébrale et des exercices de coordination latérale. Le travail sur la proprioception du dos et les exercices de reptation permettent au système nerveux de maturer ce réflexe. L'amélioration de la posture assise et la diminution de l'agitation sont souvent les premiers signes de progrès.",
  },
  rtac: {
    name: "RTAC",
    slug: "rtac",
    metaDescription:
      "Le réflexe tonique asymétrique du cou (RTAC) : latéralisation, coordination œil-main, signes de non-intégration. Aline Nebout.",
    spheres: [
      { key: "motor", label: "Moteur" },
      { key: "cognitive", label: "Cognitif" },
    ],
    origin: "18ème semaine intra-utérine",
    integration: "6 mois",
    description: [
      "Le réflexe tonique asymétrique du cou (RTAC) se manifeste lorsque le bébé tourne la tête d'un côté : le bras et la jambe du côté vers lequel il regarde s'étendent, tandis que les membres opposés se fléchissent. C'est la posture dite « de l'escrimeur ».",
      "Ce réflexe est fondamental pour le développement de la latéralisation (distinction droite/gauche), la coordination œil-main et la préparation aux mouvements croisés. Il participe à l'établissement de la dominance manuelle et prépare les bases de l'écriture.",
      "Lorsque le RTAC persiste, chaque rotation de la tête déclenche involontairement des mouvements des bras. L'enfant a du mal à dissocier les mouvements de la tête de ceux des mains, ce qui rend l'écriture laborieuse et la lecture difficile (les yeux doivent traverser la ligne médiane).",
    ],
    signs: [
      "Écriture laborieuse, crispation sur le stylo",
      "Difficultés de lecture (perte de ligne, saut de mots)",
      "Mauvaise coordination œil-main",
      "Crispation du bras lors de l'écriture",
      "Difficulté à croiser la ligne médiane du corps",
      "Confusion droite/gauche persistante",
    ],
    approach:
      "L'intégration du RTAC passe par des exercices de dissociation tête-bras et des mouvements croisés progressifs. Le travail sur la coordination bilatérale et les exercices de suivi oculaire permettent de libérer les mouvements de la main de l'influence de la position de la tête. L'amélioration de l'écriture et de la lecture est souvent rapide une fois le réflexe intégré.",
  },
  rtsc: {
    name: "RTSC",
    slug: "rtsc",
    metaDescription:
      "Le réflexe tonique symétrique du cou (RTSC) : passage à quatre pattes, posture, signes de non-intégration. Aline Nebout.",
    spheres: [{ key: "motor", label: "Moteur" }],
    origin: "6-9 mois",
    integration: "9-11 mois",
    description: [
      "Le réflexe tonique symétrique du cou (RTSC) apparaît vers 6-9 mois et lie le mouvement de la tête à la flexion ou l'extension des bras et des jambes. Quand le bébé lève la tête, ses bras s'étendent et ses jambes se fléchissent ; quand il baisse la tête, c'est l'inverse.",
      "Ce réflexe est une étape cruciale dans le développement moteur : il prépare le passage de la position couchée à la position à quatre pattes, puis à la station debout. Il permet au bébé de découvrir la notion de haut et de bas et de développer sa vision binoculaire.",
      "Lorsque le RTSC persiste, l'enfant a du mal à maintenir une posture stable. Il se tient souvent avachi sur sa chaise, enroule ses pieds autour des pieds de la chaise, ou s'assoit en W. La copie au tableau est difficile car le mouvement de la tête entre le tableau et la feuille déclenche des ajustements posturaux involontaires.",
    ],
    signs: [
      "Posture avachie, difficulté à se tenir droit",
      "Gigoter en permanence sur sa chaise",
      "Difficultés de coordination globale",
      "Marche sur la pointe des pieds",
      "Problèmes d'équilibre",
      "Difficultés en repérage spatial et en mathématiques",
      "Difficultés de lecture (copie au tableau)",
    ],
    approach:
      "L'intégration du RTSC utilise des exercices de dissociation tête-corps en position à quatre pattes et des mouvements de bascule contrôlés. Le travail sur le tonus postural et les exercices de coordination haut/bas permettent au système nerveux de maturer ce réflexe. L'amélioration de la posture assise est souvent le premier signe visible de progrès.",
  },
  grasping: {
    name: "Grasping",
    slug: "grasping",
    metaDescription:
      "Le réflexe de Grasping : agrippement, motricité fine, pince pouce-index, signes de non-intégration. Aline Nebout.",
    spheres: [{ key: "motor", label: "Moteur" }],
    origin: "11ème semaine intra-utérine",
    integration: "3-4 mois",
    description: [
      "Le réflexe de Grasping (ou réflexe d'agrippement palmaire) se manifeste par la fermeture automatique des doigts du bébé lorsqu'on stimule la paume de sa main. Ce réflexe est si puissant que le nouveau-né peut supporter son propre poids en s'agrippant.",
      "Ce réflexe est lié à l'attachement (le bébé s'agrippe à sa mère) et constitue la base du développement de la motricité fine. Il doit s'intégrer progressivement pour laisser place à la pince pouce-index volontaire, indispensable à l'écriture et à la manipulation d'objets fins.",
      "Lorsque le Grasping persiste, l'enfant a tendance à serrer trop fort son stylo, à avoir une prise crispée et à fatiguer rapidement lors de l'écriture. Les tensions remontent souvent dans l'avant-bras, l'épaule et le cou, provoquant des douleurs et une fatigue disproportionnée par rapport à l'effort demandé.",
    ],
    signs: [
      "Mauvaise pince pouce-index",
      "Difficulté à tenir correctement un stylo",
      "Tensions dans les épaules et le cou lors de l'écriture",
      "Fatigue rapide à l'écriture",
      "Prise crispée des objets",
      "Difficultés de motricité fine (boutons, lacets)",
    ],
    approach:
      "L'intégration du réflexe de Grasping passe par des exercices de stimulation palmaire, de dissociation des doigts et de relâchement progressif de la prise. Le travail sur la motricité fine et les exercices de manipulation permettent de développer une pince pouce-index fonctionnelle et détendue. L'amélioration de la tenue du stylo et la diminution des tensions sont souvent rapides.",
  },
  babinski: {
    name: "Babinski",
    slug: "babinski",
    metaDescription:
      "Le réflexe de Babinski : extension des orteils, maturation neurologique, signes de non-intégration. Aline Nebout.",
    spheres: [{ key: "motor", label: "Moteur" }],
    origin: "Naissance",
    integration: "12-24 mois",
    description: [
      "Le réflexe de Babinski se manifeste par l'extension en éventail des orteils lorsqu'on stimule la plante du pied du bébé, du talon vers les orteils. Chez l'adulte, la réponse normale est une flexion des orteils (signe de Babinski négatif).",
      "Ce réflexe est un marqueur important de la maturation neurologique. Sa persistance au-delà de 2 ans peut indiquer un retard de maturation du système nerveux central. Il est étroitement lié au développement de la marche, de l'équilibre et de la proprioception des pieds.",
      "Lorsque le réflexe de Babinski persiste, l'enfant peut présenter des tensions dans les pieds, des difficultés de marche (marche sur la pointe des pieds, pieds en dedans) et des troubles de l'équilibre. Ces difficultés peuvent impacter la posture globale et la confiance dans les activités motrices.",
    ],
    signs: [
      "Tensions dans les pieds et les orteils",
      "Troubles de la marche (pointe des pieds, pieds en dedans)",
      "Difficultés d'équilibre",
      "Inconfort dans les chaussures",
      "Fatigue à la marche prolongée",
      "Appréhension des terrains instables",
    ],
    approach:
      "L'intégration du réflexe de Babinski utilise des exercices de stimulation plantaire, de mobilisation des orteils et de travail proprioceptif sur différentes surfaces. Les exercices de marche consciente et de coordination pied-cheville permettent au système nerveux de maturer ce réflexe. L'amélioration du confort de marche et de l'équilibre sont les premiers signes de progrès.",
  },
};

const slugOrder = ["moro", "galant", "rtac", "rtsc", "grasping", "babinski"];

export function generateStaticParams() {
  return slugOrder.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = reflexes[slug];

  if (!data) {
    return { title: "Réflexe introuvable" };
  }

  return {
    title: `Réflexe de ${data.name} — Réflexes Archaïques`,
    description: data.metaDescription,
    openGraph: {
      title: `Réflexe de ${data.name} | Aline Nebout`,
      description: data.metaDescription,
    },
  };
}

export default async function ReflexArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const data = reflexes[slug];

  if (!data) {
    notFound();
  }

  const currentIndex = slugOrder.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;
  const prevReflex = prevSlug ? reflexes[prevSlug] : null;
  const nextReflex = nextSlug ? reflexes[nextSlug] : null;

  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Réflexes Archaïques", href: "/reflexes" },
              { label: "Articles", href: "/reflexes/articles" },
              { label: `Réflexe de ${data.name}` },
            ]}
          />
        </div>
      </section>

      {/* Title + meta */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            {/* Sphere badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {data.spheres.map((sphere) => {
                const styles = SPHERE_STYLES[sphere.key];
                return (
                  <span
                    key={sphere.key}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${styles.bg} ${styles.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    {sphere.label}
                  </span>
                );
              })}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Réflexe de {data.name}
            </h1>

            {/* Origin + integration info */}
            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Apparition : {data.origin}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Intégration : {data.integration}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {data.description.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-text-muted leading-relaxed text-lg">{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Signs of non-integration */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-6">
                Signes de non-intégration
              </h2>
              <ul className="space-y-3">
                {data.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 text-text-muted">
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
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integration approach */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl text-text-dark mb-4">
              Approche d&apos;intégration
            </h2>
            <p className="text-text-muted leading-relaxed text-lg">{data.approach}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {prevReflex ? (
              <Link
                href={`/reflexes/articles/${prevReflex.slug}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors duration-200 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <div>
                  <p className="text-xs text-text-muted">Précédent</p>
                  <p className="font-heading text-sm text-text-dark group-hover:text-primary transition-colors duration-200">
                    Réflexe de {prevReflex.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextReflex ? (
              <Link
                href={`/reflexes/articles/${nextReflex.slug}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-end gap-3 text-right"
              >
                <div>
                  <p className="text-xs text-text-muted">Suivant</p>
                  <p className="font-heading text-sm text-text-dark group-hover:text-primary transition-colors duration-200">
                    Réflexe de {nextReflex.name}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors duration-200 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Prendre rendez-vous
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Vous reconnaissez ces signes chez votre enfant ou chez vous ? Un bilan des réflexes
                archaïques permettra d&apos;identifier les réflexes concernés et de proposer un
                programme d&apos;intégration adapté.
              </p>
              <DoctolibButton variant="primary" label="Prendre rendez-vous sur Doctolib" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
