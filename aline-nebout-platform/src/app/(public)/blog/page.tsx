import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import BlogFilter from "@/components/content/BlogFilter";
import { createClient } from "@/lib/supabase/server";

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

async function getPublishedArticles() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("blog_articles")
    .select(
      "id, title, slug, excerpt, category, featured_image_url, is_published, published_at, created_at"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Blog articles fetch error:", error);
    return [];
  }

  return articles ?? [];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const rawArticles = await getPublishedArticles();

  // Map to BlogFilter expected format
  const articles = rawArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || "",
    category: article.category as "osteopathie" | "reflexes" | "coaching",
    date: article.published_at
      ? formatDate(article.published_at)
      : formatDate(article.created_at),
    image:
      article.featured_image_url ||
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
  }));

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
            {articles.length > 0 ? (
              <BlogFilter articles={articles} />
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-text-dark mb-2">
                  Aucun article pour le moment
                </h3>
                <p className="text-sm text-text-muted">
                  De nouveaux articles seront bientôt disponibles.
                </p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
