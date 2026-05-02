"use client";

import { useState } from "react";
import Link from "next/link";

interface ReflexArticle {
  slug: string;
  name: string;
  description: string;
  spheres: string[];
}

interface ReflexArticleFilterProps {
  articles: ReflexArticle[];
  initialFilter?: string;
}

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "motor", label: "Moteur" },
  { key: "emotional", label: "Émotionnel" },
  { key: "cognitive", label: "Cognitif" },
];

const SPHERE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  motor: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  emotional: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  cognitive: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", dot: "bg-[#10B981]" },
};

const SPHERE_LABELS: Record<string, string> = {
  motor: "Moteur",
  emotional: "Émotionnel",
  cognitive: "Cognitif",
};

export default function ReflexArticleFilter({ articles, initialFilter }: ReflexArticleFilterProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter || "all");

  const filtered =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.spheres.includes(activeFilter));

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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/reflexes/articles/${article.slug}`}
            className="block group"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
              {/* Sphere badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.spheres.map((sphere) => {
                  const colors = SPHERE_COLORS[sphere];
                  return (
                    <span
                      key={sphere}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {SPHERE_LABELS[sphere]}
                    </span>
                  );
                })}
              </div>

              <h3 className="font-heading text-lg text-text-dark mb-2 group-hover:text-primary transition-colors duration-200">
                Réflexe de {article.name}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed flex-1">
                {article.description}
              </p>

              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 group-hover:gap-2 transition-all duration-200">
                Lire l&apos;article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          Aucun article dans cette catégorie.
        </p>
      )}
    </div>
  );
}
