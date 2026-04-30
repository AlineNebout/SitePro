import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modération communauté",
  description: "Modération de l'espace communauté du Pôle Santé.",
};

const posts = [
  {
    id: 1,
    author: "Aline Nebout",
    profession: "Ostéopathe D.O.",
    content: "Bienvenue dans l'espace communauté du Pôle Santé !",
    category: "Annonce",
    date: "1 mars 2025",
    pinned: true,
  },
  {
    id: 2,
    author: "Marion Grosdemange",
    profession: "Psychomotricienne",
    content: "Nouveau protocole de prise en charge des troubles DYS",
    category: "Ressource",
    date: "8 mars 2025",
    pinned: false,
  },
  {
    id: 3,
    author: "Sophie Pierre",
    profession: "Sage-femme",
    content: "Atelier allaitement le 15 juin — places disponibles",
    category: "Événement",
    date: "12 mars 2025",
    pinned: false,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Annonce": { bg: "bg-primary/10", text: "text-primary" },
  "Ressource": { bg: "bg-accent/10", text: "text-accent" },
  "Événement": { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

export default function AdminCommunautePage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
          Espace communauté — Modération
        </h1>
        <p className="text-text-muted text-sm">
          {posts.length} publications
        </p>
      </div>

      <div className="space-y-3">
        {posts.map((post) => {
          const catColors = CATEGORY_COLORS[post.category] || { bg: "bg-primary/10", text: "text-primary" };
          return (
            <div
              key={post.id}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm ${post.pinned ? "ring-2 ring-primary/20" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-sm text-text-dark">{post.author}</h3>
                      {post.pinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          Épinglé
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{post.profession} · {post.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${catColors.bg} ${catColors.text}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-dark mt-3 pl-13">
                {post.content}
              </p>

              <div className="flex items-center gap-2 mt-4 pl-13">
                {!post.pinned && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:bg-primary/5 hover:text-primary transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                    Épingler
                  </button>
                )}
                {post.pinned && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                    Désépingler
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
