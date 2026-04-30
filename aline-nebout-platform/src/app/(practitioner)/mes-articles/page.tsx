import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mes articles",
  description: "Gérez vos articles sur la plateforme Aline Nebout.",
};

// Hardcoded sample data — will be replaced by Supabase queries
const articles = [
  {
    id: "1",
    title: "Les bienfaits de l'orthophonie précoce",
    status: "brouillon" as const,
    date: "2025-01-15",
    author: "Marion Grosdemange",
  },
];

const STATUS_STYLES = {
  brouillon: {
    label: "Brouillon",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  publié: {
    label: "Publié",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
} as const;

export default function MesArticlesPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
            Mes articles
          </h1>
          <p className="text-text-muted text-sm">
            Rédigez et gérez vos articles pour le blog du Pôle Santé
          </p>
        </div>
        <Link
          href="/mes-articles/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvel article
        </Link>
      </div>

      {/* Articles list */}
      {articles.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-12 text-center shadow-sm">
          <svg className="w-12 h-12 text-accent/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
          <p className="text-text-muted text-sm">
            Vous n&apos;avez pas encore d&apos;article.
          </p>
          <Link
            href="/mes-articles/nouveau"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer"
          >
            Rédiger mon premier article
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => {
            const statusStyle = STATUS_STYLES[article.status];
            return (
              <article
                key={article.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Article info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h2 className="text-base font-semibold text-text-dark truncate">
                        {article.title}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} flex-shrink-0`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} aria-hidden="true" />
                        {statusStyle.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{article.author}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/mes-articles/${article.id}/modifier`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border-2 border-accent/15 text-text-dark hover:bg-accent/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Modifier
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
