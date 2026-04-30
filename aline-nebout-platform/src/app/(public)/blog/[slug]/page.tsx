import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import DoctolibButton from "@/components/booking/DoctolibButton";

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  category: "osteopathie" | "reflexes" | "coaching";
  date: string;
  readingTime: string;
  image: string;
  content: string[];
  ctaType: "doctolib" | "reflexes" | "coaching";
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  osteopathie: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  reflexes: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  coaching: { bg: "bg-[#059669]/10", text: "text-[#059669]", dot: "bg-[#059669]" },
};

const CATEGORY_LABELS: Record<string, string> = {
  osteopathie: "Ostéopathie",
  reflexes: "Réflexes Archaïques",
  coaching: "Coaching Foulée",
};

const articles: ArticleData[] = [
  {
    slug: "5-signes-reflexes-archaiques-enfant",
    title: "5 signes que votre enfant a besoin d'un bilan des réflexes archaïques",
    excerpt:
      "Votre enfant se tortille sur sa chaise, a du mal à se concentrer ou est hypersensible ? Ces signes peuvent indiquer des réflexes archaïques non intégrés.",
    category: "reflexes",
    date: "15 mars 2025",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop",
    ctaType: "reflexes",
    content: [
      "Les réflexes archaïques sont des mouvements automatiques présents dès la naissance. Ils jouent un rôle essentiel dans le développement neurologique du nourrisson, l'aidant à s'adapter à son environnement. Normalement, ces réflexes s'intègrent au cours de la première année de vie pour laisser place à des mouvements volontaires et coordonnés. Lorsqu'ils persistent, ils peuvent impacter le quotidien de l'enfant de manière significative.",
      "Le premier signe à surveiller est l'agitation corporelle : votre enfant se tortille constamment sur sa chaise, change de position sans cesse, enroule ses pieds autour des pieds de la chaise. Ce comportement, souvent interprété comme de l'indiscipline, peut en réalité être lié au réflexe tonique asymétrique du cou (RTAC) ou au réflexe spinal de Galant, qui maintiennent le corps en état d'alerte permanent. Le deuxième signe concerne les difficultés d'écriture : une prise de stylo crispée, une écriture irrégulière, une fatigue rapide à l'écrit. Le réflexe de préhension, s'il n'est pas intégré, oblige l'enfant à mobiliser une énergie considérable pour contrôler ses doigts.",
      "Le troisième signe est l'hypersensibilité sensorielle : votre enfant réagit de manière excessive au bruit, au toucher, aux étiquettes de vêtements. Le réflexe de Moro, lorsqu'il persiste, maintient le système nerveux en mode « combat ou fuite », rendant l'enfant vulnérable aux stimulations sensorielles. Le quatrième signe touche la coordination : maladresse, difficultés au sport, chutes fréquentes. Le réflexe tonique labyrinthique (RTL) influence directement l'équilibre et la posture.",
      "Enfin, le cinquième signe concerne les difficultés de concentration et d'apprentissage. Un enfant dont les réflexes ne sont pas intégrés dépense une énergie considérable pour compenser, ce qui réduit ses ressources disponibles pour les apprentissages. Si vous reconnaissez votre enfant dans plusieurs de ces descriptions, un bilan des réflexes archaïques peut apporter des réponses concrètes. L'accompagnement est doux, progressif, et les résultats sont souvent visibles en quelques semaines grâce à des exercices simples à réaliser à la maison.",
    ],
  },
  {
    slug: "preparer-corps-trail-osteopathe",
    title: "Comment préparer son corps à un trail : les conseils d'une ostéopathe",
    excerpt:
      "Préparer un trail ne se limite pas à l'entraînement. Découvrez les conseils d'Aline pour optimiser votre préparation physique.",
    category: "coaching",
    date: "1 mars 2025",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=600&fit=crop",
    ctaType: "coaching",
    content: [
      "La préparation d'un trail ne se résume pas aux kilomètres parcourus à l'entraînement. En tant qu'ostéopathe et traileuse, je constate régulièrement que les coureurs négligent la préparation de leur corps dans sa globalité. La foulée, la posture, la mobilité articulaire et la récupération sont des piliers aussi importants que le volume d'entraînement. Une approche holistique permet non seulement d'améliorer les performances, mais surtout de prévenir les blessures.",
      "Le premier conseil est de faire un bilan ostéopathique avant de commencer votre préparation. Ce bilan permet d'identifier les restrictions de mobilité, les déséquilibres posturaux et les zones de tension qui pourraient devenir problématiques sous l'effet de la charge d'entraînement. Une cheville qui manque de mobilité, un bassin légèrement décalé, des tensions dans le diaphragme : autant de petits déséquilibres qui, amplifiés par les kilomètres, peuvent mener à la blessure.",
      "Le deuxième axe concerne le travail de la foulée. Chaque coureur a une foulée unique, influencée par sa morphologie, ses habitudes et ses compensations. L'analyse de foulée permet d'identifier les points d'amélioration : attaque du pied, cadence, oscillation verticale, symétrie. Il ne s'agit pas de copier une foulée « idéale », mais d'optimiser la vôtre pour qu'elle soit plus économique et moins traumatisante. Des exercices éducatifs spécifiques, pratiqués régulièrement, permettent de reprogrammer progressivement les schémas moteurs.",
      "Enfin, la récupération est un élément souvent sous-estimé. Les étirements actifs, l'auto-massage avec rouleau, l'hydratation et le sommeil sont vos meilleurs alliés. Planifiez des séances d'ostéopathie régulières pendant votre préparation, idéalement toutes les 4 à 6 semaines, pour maintenir votre corps dans un état optimal. Le jour de la course, votre corps vous remerciera d'avoir pris soin de lui bien au-delà des simples entraînements.",
    ],
  },
  {
    slug: "osteopathie-grossesse-quand-consulter",
    title: "Ostéopathie et grossesse : quand consulter ?",
    excerpt:
      "L'ostéopathie accompagne la femme enceinte tout au long de sa grossesse. Découvrez à quels moments consulter.",
    category: "osteopathie",
    date: "15 février 2025",
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1200&h=600&fit=crop",
    ctaType: "doctolib",
    content: [
      "La grossesse est une période de transformations profondes pour le corps de la femme. En neuf mois, le corps s'adapte pour accueillir et faire grandir bébé : le bassin s'élargit, la colonne vertébrale modifie ses courbures, les ligaments se relâchent sous l'effet des hormones. Ces adaptations, bien que naturelles, peuvent générer des inconforts voire des douleurs. L'ostéopathie offre un accompagnement doux et adapté à chaque trimestre.",
      "Au premier trimestre, les consultations visent principalement à soulager les nausées, les tensions lombaires précoces et les maux de tête. Les techniques utilisées sont très douces, respectant la fragilité de cette période. C'est aussi le moment idéal pour faire un bilan postural et préparer le corps aux changements à venir. Au deuxième trimestre, le ventre s'arrondit et le centre de gravité se déplace. Les douleurs lombaires et sciatiques sont fréquentes, tout comme les tensions dans le diaphragme qui peuvent gêner la respiration.",
      "Le troisième trimestre est souvent le plus sollicitant. Le poids du bébé augmente, la mobilité du bassin est essentielle pour préparer l'accouchement. L'ostéopathe travaille sur la mobilité du bassin, du sacrum et du périnée pour favoriser un accouchement physiologique. Les techniques crâniennes et viscérales permettent également de soulager les reflux gastriques, les troubles du sommeil et la sensation de jambes lourdes.",
      "Après l'accouchement, une consultation post-natale est recommandée dans les 6 à 8 semaines suivant la naissance. Elle permet de vérifier la bonne récupération du bassin, de traiter les éventuelles tensions liées à l'accouchement et de préparer le corps à la rééducation périnéale. N'hésitez pas à consulter dès que vous ressentez un inconfort : l'ostéopathie pendant la grossesse est sans danger et peut considérablement améliorer votre confort au quotidien.",
    ],
  },
  {
    slug: "reflexes-archaiques-expliques-parents",
    title: "Les réflexes archaïques expliqués aux parents",
    excerpt:
      "Qu'est-ce qu'un réflexe archaïque ? Pourquoi certains persistent-ils ? Un guide simple et complet pour les parents.",
    category: "reflexes",
    date: "1 février 2025",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&h=600&fit=crop",
    ctaType: "reflexes",
    content: [
      "En tant que parent, vous avez peut-être entendu parler des réflexes archaïques sans vraiment comprendre de quoi il s'agit. Ces réflexes, aussi appelés réflexes primitifs, sont des mouvements automatiques et involontaires présents chez tous les nouveau-nés. Ils sont le signe d'un système nerveux en bonne santé et jouent un rôle fondamental dans les premiers mois de vie : le réflexe de succion permet au bébé de s'alimenter, le réflexe de Moro le protège des chutes, le réflexe de marche automatique prépare la future marche.",
      "Normalement, ces réflexes s'intègrent progressivement entre 6 et 12 mois. « S'intégrer » signifie qu'ils ne disparaissent pas, mais qu'ils sont inhibés par le cortex cérébral pour laisser place à des mouvements volontaires et coordonnés. C'est un processus naturel qui se fait grâce au mouvement libre du bébé : le temps passé au sol, le quatre-pattes, les retournements sont autant d'étapes essentielles. Lorsque ce processus est perturbé — naissance difficile, manque de mouvement libre, stress précoce — certains réflexes peuvent persister au-delà de la période normale.",
      "Un réflexe non intégré agit comme un « parasitage » du système nerveux. L'enfant doit mobiliser une énergie considérable pour compenser, ce qui se traduit par des difficultés dans trois sphères : motrice (maladresse, difficultés d'écriture, posture), émotionnelle (hypersensibilité, anxiété, difficultés de gestion des émotions) et cognitive (concentration, apprentissages, fatigue scolaire). Il est important de comprendre que ce n'est ni un problème de volonté, ni un trouble du comportement : c'est une immaturité neurologique qui peut être accompagnée.",
      "La bonne nouvelle, c'est que le cerveau conserve sa plasticité tout au long de la vie. Grâce à des mouvements spécifiques et répétés, il est possible de stimuler l'intégration des réflexes à tout âge. Le bilan permet d'identifier précisément quels réflexes sont concernés, et un programme d'exercices simples (5 à 10 minutes par jour) est mis en place. Les progrès sont généralement visibles en 4 à 6 semaines. En tant que parent, votre rôle est essentiel : c'est vous qui accompagnez votre enfant dans la réalisation quotidienne des exercices, dans un cadre bienveillant et ludique.",
    ],
  },
];

function getArticleBySlug(slug: string): ArticleData | undefined {
  return articles.find((a) => a.slug === slug);
}

function getRelatedArticles(current: ArticleData): ArticleData[] {
  return articles
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, 2);
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Aline Nebout`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.image, width: 1200, height: 600, alt: article.title }],
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: article.image,
        datePublished: article.date,
        author: {
          "@type": "Person",
          name: "Aline Nebout",
          jobTitle: "Ostéopathe D.O.",
        },
        publisher: {
          "@type": "Organization",
          name: "Aline Nebout — Ostéopathe D.O.",
        },
      }),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-2xl text-text-dark mb-4">Article introuvable</h1>
        <Link
          href="/blog"
          className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer font-medium"
        >
          Retour au blog
        </Link>
      </section>
    );
  }

  const colors = CATEGORY_COLORS[article.category];
  const related = getRelatedArticles(article);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            datePublished: article.date,
            author: {
              "@type": "Person",
              name: "Aline Nebout",
              jobTitle: "Ostéopathe D.O.",
            },
            publisher: {
              "@type": "Organization",
              name: "Aline Nebout — Ostéopathe D.O.",
            },
          }),
        }}
      />

      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />

          <ScrollReveal>
            {/* Category + date + reading time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                {CATEGORY_LABELS[article.category]}
              </span>
              <span className="text-text-muted text-sm">{article.date}</span>
              <span className="text-text-muted/50">·</span>
              <span className="text-text-muted text-sm">{article.readingTime} de lecture</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-8 leading-tight">
              {article.title}
            </h1>
          </ScrollReveal>

          {/* Featured image */}
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Article content */}
          <ScrollReveal delay={0.2}>
            <div className="prose-custom space-y-6">
              {article.content.map((paragraph, i) => (
                <p key={i} className="text-text-muted leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 rounded-2xl p-8">
              {article.ctaType === "doctolib" && (
                <div className="text-center">
                  <h2 className="font-heading text-xl text-text-dark mb-3">
                    Besoin d&apos;un accompagnement ?
                  </h2>
                  <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                    Prenez rendez-vous pour une consultation en ostéopathie adaptée à vos besoins.
                  </p>
                  <DoctolibButton variant="primary" label="Prendre rendez-vous" />
                </div>
              )}
              {article.ctaType === "reflexes" && (
                <div className="text-center">
                  <h2 className="font-heading text-xl text-text-dark mb-3">
                    Vous reconnaissez votre enfant ?
                  </h2>
                  <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                    Faites le test en ligne pour évaluer si un bilan des réflexes archaïques pourrait aider votre enfant.
                  </p>
                  <Link
                    href="/reflexes/parents"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark shadow-lg shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    Faire le test en ligne
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}
              {article.ctaType === "coaching" && (
                <div className="text-center">
                  <h2 className="font-heading text-xl text-text-dark mb-3">
                    Envie d&apos;améliorer votre foulée ?
                  </h2>
                  <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                    Découvrez les ateliers coaching foulée pour optimiser votre technique de course.
                  </p>
                  <Link
                    href="/coaching/ateliers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] text-white font-semibold hover:bg-[#047857] shadow-lg shadow-[#059669]/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    Voir les ateliers
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-2xl text-text-dark mb-8 text-center">
                Articles similaires
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {related.map((rel, i) => {
                const relColors = CATEGORY_COLORS[rel.category];
                return (
                  <ScrollReveal key={rel.slug} delay={i * 0.1}>
                    <Link href={`/blog/${rel.slug}`} className="block group">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${relColors.bg} ${relColors.text}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${relColors.dot}`} />
                              {CATEGORY_LABELS[rel.category]}
                            </span>
                            <time className="text-xs text-text-muted">{rel.date}</time>
                          </div>
                          <h3 className="font-heading text-lg text-text-dark mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                            {rel.title}
                          </h3>
                          <p className="text-text-muted text-sm leading-relaxed flex-1">
                            {rel.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 group-hover:gap-2 transition-all duration-200">
                            Lire l&apos;article
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
