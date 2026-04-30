"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "osteopathie" | "reflexes" | "coaching";
  date: string;
  image: string;
}

interface BlogFilterProps {
  articles: BlogArticle[];
}

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "osteopathie", label: "Ostéopathie" },
  { key: "reflexes", label: "Réflexes Archaïques" },
  { key: "coaching", label: "Coaching Foulée" },
];

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

export default function BlogFilter({ articles }: BlogFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeFilter === filter.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white/80 text-text-muted hover:bg-primary-light/20 hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="grid sm:grid-cols-2 gap-8">
        {filtered.map((article) => {
          const colors = CATEGORY_COLORS[article.category];
          return (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block group"
            >
              <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                {/* Featured image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Category badge + date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    <time className="text-xs text-text-muted">{article.date}</time>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg text-text-dark mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-muted text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          Aucun article dans cette catégorie.
        </p>
      )}
    </div>
  );
}
