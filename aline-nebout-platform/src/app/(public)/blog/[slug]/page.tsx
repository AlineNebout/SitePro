import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { createClient } from "@/lib/supabase/server";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getArticle(slug: string): Promise<BlogArticle | null> {
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("blog_articles")
    .select(
      "id, title, slug, excerpt, content, category, featured_image_url, is_published, published_at, created_at"
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !article) {
    return null;
  }

  return article;
}

async function getRelatedArticles(category: string, currentSlug: string) {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("blog_articles")
    .select("id, title, slug, excerpt, category, featured_image_url, published_at, created_at")
    .eq("is_published", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  return articles ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.title,
    description: article.excerpt || `Article sur ${CATEGORY_LABELS[article.category] || article.category}`,
    openGraph: {
      title: `${article.title} | Aline Nebout`,
      description: article.excerpt || "",
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, article.slug);
  const colors = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.osteopathie;
  const imageUrl =
    article.featured_image_url ||
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop";

  return (
    <>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />

          <ScrollReveal>
            {/* Category + date */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                {CATEGORY_LABELS[article.category] || article.category}
              </span>
              <time className="text-sm text-text-muted">
                {article.published_at
                  ? formatDate(article.published_at)
                  : formatDate(article.created_at)}
              </time>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl text-text-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}
          </ScrollReveal>

          {/* Featured image */}
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.15}>
            <div className="prose prose-lg max-w-none text-text-dark prose-headings:font-heading prose-headings:text-text-dark prose-a:text-primary prose-a:no-underline hover:prose-a:underline mb-12">
              {article.content.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i}>{paragraph}</p>
                ) : null
              )}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center mb-12">
              <h2 className="font-heading text-xl text-text-dark mb-3">
                {article.category === "coaching"
                  ? "Envie d\u2019optimiser votre foulée ?"
                  : "Besoin d\u2019un rendez-vous ?"}
              </h2>
              <p className="text-text-muted text-sm mb-5">
                {article.category === "coaching"
                  ? "Découvrez nos ateliers de coaching foulée et inscrivez-vous."
                  : "Prenez rendez-vous avec Aline Nebout sur Doctolib."}
              </p>
              <a
                href={
                  article.category === "coaching"
                    ? "/coaching/ateliers"
                    : "https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout"
                }
                target={article.category === "coaching" ? undefined : "_blank"}
                rel={article.category === "coaching" ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer"
              >
                {article.category === "coaching"
                  ? "Voir les ateliers"
                  : "Prendre rendez-vous"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <ScrollReveal delay={0.25}>
              <div>
                <h2 className="font-heading text-xl text-text-dark mb-6">
                  Articles similaires
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => {
                    const relColors = CATEGORY_COLORS[related.category] || CATEGORY_COLORS.osteopathie;
                    const relImage =
                      related.featured_image_url ||
                      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop";

                    return (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={relImage}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${relColors.bg} ${relColors.text} mb-2 self-start`}
                            >
                              {CATEGORY_LABELS[related.category] || related.category}
                            </span>
                            <h3 className="font-heading text-sm text-text-dark group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                              {related.title}
                            </h3>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-accent transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Retour au blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
