import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import ReflexArticleFilter from "@/components/content/ReflexArticleFilter";

export const metadata: Metadata = {
  title: "Articles — Réflexes Archaïques",
  description:
    "Découvrez les principaux réflexes archaïques : Moro, Galant, RTAC, RTSC, Grasping, Babinski. Comprendre leur rôle et les signes de non-intégration.",
  openGraph: {
    title: "Articles — Réflexes Archaïques | Aline Nebout",
    description:
      "Les principaux réflexes archaïques expliqués : rôle, signes de non-intégration et approche d'intégration.",
  },
};

const articles = [
  {
    slug: "moro",
    name: "Moro",
    description:
      "Le réflexe de Moro est le réflexe de sursaut. Présent dès la 10ème semaine intra-utérine, il impacte la sphère émotionnelle et cognitive lorsqu'il persiste.",
    spheres: ["emotional", "cognitive"],
  },
  {
    slug: "galant",
    name: "Galant",
    description:
      "Le réflexe de Galant provoque une flexion latérale de la colonne. Il apparaît à la 20ème semaine et impacte la motricité et la concentration.",
    spheres: ["motor", "cognitive"],
  },
  {
    slug: "rtac",
    name: "RTAC",
    description:
      "Le réflexe tonique asymétrique du cou lie la rotation de la tête à l'extension du bras. Il est essentiel pour la latéralisation et la coordination œil-main.",
    spheres: ["motor", "cognitive"],
  },
  {
    slug: "rtsc",
    name: "RTSC",
    description:
      "Le réflexe tonique symétrique du cou lie le mouvement de la tête à la flexion/extension des bras et jambes. Il prépare le passage à quatre pattes.",
    spheres: ["motor"],
  },
  {
    slug: "grasping",
    name: "Grasping",
    description:
      "Le réflexe de Grasping est le réflexe d'agrippement. Il est lié à l'attachement et à la motricité fine, notamment la pince pouce-index.",
    spheres: ["motor"],
  },
  {
    slug: "babinski",
    name: "Babinski",
    description:
      "Le réflexe de Babinski se manifeste par l'extension des orteils. Il témoigne de la maturation neurologique et impacte la marche et l'équilibre.",
    spheres: ["motor"],
  },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ sphere?: string }>;
}) {
  const { sphere } = await searchParams;
  const validSpheres = ["motor", "emotional", "cognitive"];
  const initialFilter = sphere && validSpheres.includes(sphere) ? sphere : undefined;

  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Réflexes Archaïques", href: "/reflexes" },
              { label: "Articles" },
            ]}
          />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Comprendre les réflexes
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Les réflexes archaïques
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Chaque réflexe a un rôle précis dans le développement. Découvrez les principaux
              réflexes, leurs signes de non-intégration et l&apos;approche d&apos;intégration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles with filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <ReflexArticleFilter articles={articles} initialFilter={initialFilter} />
        </div>
      </section>
    </>
  );
}
