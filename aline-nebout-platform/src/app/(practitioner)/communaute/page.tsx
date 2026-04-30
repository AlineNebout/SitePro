import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Communauté — Pôle Santé",
  description: "Espace d'échange entre les praticiens du Pôle Santé de Rochetaillée-sur-Saône.",
};

const posts = [
  {
    id: 1,
    author: "Aline Nebout",
    profession: "Ostéopathe D.O.",
    content: "Bienvenue dans l'espace communauté du Pôle Santé ! Cet espace est réservé aux praticiens pour échanger, partager des ressources et coordonner nos prises en charge.",
    category: "Annonce",
    date: "1 mars 2025",
    pinned: true,
    comments: 3,
  },
  {
    id: 2,
    author: "Marion Grosdemange",
    profession: "Orthophoniste",
    content: "Nouveau protocole de prise en charge des troubles DYS — je partage le document de référence mis à jour par la HAS. N'hésitez pas si vous avez des questions.",
    category: "Ressource",
    date: "8 mars 2025",
    pinned: false,
    comments: 1,
  },
  {
    id: 3,
    author: "Sophie Pierre",
    profession: "Sage-femme",
    content: "Atelier allaitement le 15 juin à Fontaines-sur-Saône — il reste des places. Si vous avez des patientes intéressées, n'hésitez pas à leur transmettre l'info.",
    category: "Événement",
    date: "12 mars 2025",
    pinned: false,
    comments: 2,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Annonce": { bg: "bg-primary/10", text: "text-primary" },
  "Ressource": { bg: "bg-accent/10", text: "text-accent" },
  "Événement": { bg: "bg-[#059669]/10", text: "text-[#059669]" },
  "Question": { bg: "bg-amber-100", text: "text-amber-700" },
};

export default function CommunautePage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
            Communauté du Pôle Santé
          </h1>
          <p className="text-text-muted text-sm">
            Échangez avec les autres praticiens
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvelle publication
        </button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Tous", "Annonce", "Ressource", "Événement", "Question"].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              cat === "Tous"
                ? "bg-accent text-white"
                : "bg-white/80 text-text-muted hover:bg-accent/10 hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => {
          const catColors = CATEGORY_COLORS[post.category] || { bg: "bg-primary/10", text: "text-primary" };
          return (
            <ScrollReveal key={post.id}>
              <article className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm ${post.pinned ? "ring-2 ring-accent/20" : ""}`}>
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm">
                      {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-text-dark">{post.author}</span>
                      {post.pinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
                          Épinglé
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span>{post.profession}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${catColors.bg} ${catColors.text} shrink-0`}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-text-dark leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <button type="button" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-200 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>
                    {post.comments} commentaire{post.comments > 1 ? "s" : ""}
                  </button>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </>
  );
}
