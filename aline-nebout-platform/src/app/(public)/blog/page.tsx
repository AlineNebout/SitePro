import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import BlogFilter from "@/components/content/BlogFilter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles et conseils sur l'ostéopathie, les réflexes archaïques et le coaching foulée. Aline Nebout partage son expertise pour votre bien-être au quotidien.",
  openGraph: {
    title: "Blog | Aline Nebout",
    description:
      "Conseils, actualités et partages d'expérience en ostéopathie, réflexes archaïques et coaching foulée.",
  },
};

const articles = [
  {
    slug: "5-signes-reflexes-archaiques-enfant",
    title: "5 signes que votre enfant a besoin d'un bilan des réflexes archaïques",
    excerpt:
      "Votre enfant se tortille sur sa chaise, a du mal à se concentrer ou est hypersensible ? Ces signes peuvent indiquer des réflexes archaïques non intégrés. Découvrez comment les repérer.",
    category: "reflexes" as const,
    date: "15 mars 2025",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=450&fit=crop",
  },
  {
    slug: "preparer-corps-trail-osteopathe",
    title: "Comment préparer son corps à un trail : les conseils d'une ostéopathe",
    excerpt:
      "Préparer un trail ne se limite pas à l'entraînement. Découvrez les conseils d'Aline, ostéopathe et traileuse, pour optimiser votre préparation physique et éviter les blessures.",
    category: "coaching" as const,
    date: "1 mars 2025",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=450&fit=crop",
  },
  {
    slug: "osteopathie-grossesse-quand-consulter",
    title: "Ostéopathie et grossesse : quand consulter ?",
    excerpt:
      "L'ostéopathie accompagne la femme enceinte tout au long de sa grossesse. Découvrez à quels moments consulter et quels bienfaits attendre de chaque séance.",
    category: "osteopathie" as const,
    date: "15 février 2025",
    image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=450&fit=crop",
  },
  {
    slug: "reflexes-archaiques-expliques-parents",
    title: "Les réflexes archaïques expliqués aux parents",
    excerpt:
      "Qu'est-ce qu'un réflexe archaïque ? Pourquoi certains persistent-ils ? Un guide simple et complet pour comprendre leur rôle dans le développement de votre enfant.",
    category: "reflexes" as const,
    date: "1 février 2025",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=450&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: "Blog" }]} />

          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                Articles &amp; Conseils
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
                Blog
              </h1>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Conseils, actualités et partages d&apos;expérience
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <BlogFilter articles={articles} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
