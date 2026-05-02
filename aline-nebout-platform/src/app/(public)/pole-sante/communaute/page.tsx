import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Communauté — Pôle Santé",
  description: "La communauté du Pôle Santé de Rochetaillée-sur-Saône. Praticiens, patients et partenaires échangent autour de la santé et du bien-être.",
};

const posts = [
  {
    id: 1,
    author: "Aline Nebout",
    profession: "Ostéopathe D.O.",
    content: "Bienvenue dans l'espace communauté du Pôle Santé ! Cet espace est ouvert à tous pour échanger autour de la santé, du bien-être et des actualités du Pôle.",
    category: "Annonce",
    date: "1 mars 2025",
    pinned: true,
  },
  {
    id: 2,
    author: "Marion Grosdemange",
    profession: "Orthophoniste",
    content: "Nouveau protocole de prise en charge des troubles DYS — je partage le document de référence mis à jour par la HAS. N'hésitez pas si vous avez des questions.",
    category: "Ressource",
    date: "8 mars 2025",
    pinned: false,
  },
  {
    id: 3,
    author: "Tiffany Charry",
    profession: "Éducatrice spécialisée",
    content: "Nouveau groupe de soutien à la parentalité le mardi après-midi au Pôle Santé. Ouvert à tous les parents, sur inscription. N'hésitez pas à en parler autour de vous.",
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

export default function CommunautePublicPage() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Pôle Santé</p>
            <h1 className="font-heading text-3xl sm:text-4xl text-text-dark mb-4">
              Communauté
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Actualités, ressources et événements partagés par les praticiens du Pôle Santé de Rochetaillée-sur-Saône.
            </p>
          </div>
        </ScrollReveal>

        {/* Posts */}
        <div className="space-y-4 mb-12">
          {posts.map((post) => {
            const catColors = CATEGORY_COLORS[post.category] || { bg: "bg-primary/10", text: "text-primary" };
            return (
              <ScrollReveal key={post.id}>
                <article className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm ${post.pinned ? "ring-2 ring-accent/20" : ""}`}>
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
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">Épinglé</span>
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
                  <p className="text-sm text-text-dark leading-relaxed">{post.content}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 rounded-2xl p-8 text-center">
            <h2 className="font-heading text-xl text-text-dark mb-3">Vous êtes praticien ?</h2>
            <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
              Connectez-vous pour publier des articles, partager des ressources et échanger avec les autres praticiens du Pôle Santé.
            </p>
            <Link
              href="/connexion?redirect=/communaute"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark shadow-lg shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Se connecter en tant que praticien
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
