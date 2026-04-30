import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion du blog",
  description: "Administration des articles du blog.",
};

const articles = [
  {
    id: 1,
    title: "5 signes que votre enfant a besoin d'un bilan des réflexes archaïques",
    category: "Réflexes Archaïques",
    date: "15 mars 2025",
    status: "publié",
  },
  {
    id: 2,
    title: "Comment préparer son corps à un trail : les conseils d'une ostéopathe",
    category: "Coaching Foulée",
    date: "1 mars 2025",
    status: "publié",
  },
  {
    id: 3,
    title: "Ostéopathie et grossesse : quand consulter ?",
    category: "Ostéopathie",
    date: "15 février 2025",
    status: "publié",
  },
  {
    id: 4,
    title: "Les réflexes archaïques expliqués aux parents",
    category: "Réflexes Archaïques",
    date: "1 février 2025",
    status: "publié",
  },
  {
    id: 5,
    title: "Ostéopathie du sportif : prévenir plutôt que guérir",
    category: "Ostéopathie",
    date: "—",
    status: "brouillon",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Ostéopathie": { bg: "bg-primary/10", text: "text-primary" },
  "Réflexes Archaïques": { bg: "bg-accent/10", text: "text-accent" },
  "Coaching Foulée": { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

export default function AdminBlogPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion du blog
          </h1>
          <p className="text-text-muted text-sm">
            {articles.length} articles
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvel article
        </button>
      </div>

      <div className="space-y-3">
        {articles.map((article) => {
          const catColors = CATEGORY_COLORS[article.category] || { bg: "bg-primary/10", text: "text-primary" };
          return (
            <div
              key={article.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-sm text-text-dark mb-1.5 truncate">
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${catColors.bg} ${catColors.text}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-text-muted">{article.date}</span>
                </div>
              </div>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  article.status === "publié"
                    ? "bg-[#10B981]/10 text-[#10B981]"
                    : "bg-primary-light/20 text-text-muted"
                }`}
              >
                {article.status === "publié" ? "Publié" : "Brouillon"}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
