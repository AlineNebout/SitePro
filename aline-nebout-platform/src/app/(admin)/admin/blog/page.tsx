"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  updated_at: string;
}

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  isPublished: boolean;
}

const defaultFormData: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "osteopathie",
  isPublished: false,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  osteopathie: { bg: "bg-primary/10", text: "text-primary" },
  reflexes: { bg: "bg-accent/10", text: "text-accent" },
  coaching: { bg: "bg-[#059669]/10", text: "text-[#059669]" },
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState<ArticleFormData>(defaultFormData);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Delete confirmation
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchArticles() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/admin");
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles ?? []);
      } else {
        // Fallback: fetch from public endpoint (only published)
        const publicRes = await fetch("/api/blog");
        if (publicRes.ok) {
          const data = await publicRes.json();
          setArticles(data.articles ?? []);
        } else {
          setError("Impossible de charger les articles.");
        }
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!createFormData.title.trim()) {
      setCreateError("Le titre est requis.");
      return;
    }

    setCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createFormData.title.trim(),
          slug: createFormData.slug || generateSlug(createFormData.title),
          excerpt: createFormData.excerpt.trim(),
          content: createFormData.content.trim(),
          category: createFormData.category,
          isPublished: createFormData.isPublished,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setCreateError(data.error || "Erreur lors de la création.");
        return;
      }

      setShowCreateForm(false);
      setCreateFormData(defaultFormData);
      await fetchArticles();
    } catch {
      setCreateError("Impossible de contacter le serveur.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(slug: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingSlug(null);
        await fetchArticles();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setDeleteLoading(false);
    }
  }

  const publishedCount = articles.filter((a) => a.is_published).length;

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none transition-colors";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion du blog
          </h1>
          <p className="text-text-muted text-sm">
            {loading
              ? "Chargement..."
              : `${articles.length} article${articles.length !== 1 ? "s" : ""} · ${publishedCount} publié${publishedCount !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          {showCreateForm ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Annuler
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nouvel article
            </>
          )}
        </button>
      </div>

      {/* Create article form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-primary/10">
              <h2 className="font-heading text-lg text-text-dark mb-4">Nouvel article</h2>
              <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="create-title" className="block text-sm font-medium text-text-dark mb-1">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="create-title"
                    type="text"
                    value={createFormData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setCreateFormData({
                        ...createFormData,
                        title,
                        slug: generateSlug(title),
                      });
                    }}
                    className={inputBase}
                    placeholder="Titre de l'article"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="create-slug" className="block text-sm font-medium text-text-dark mb-1">
                    Slug
                  </label>
                  <input
                    id="create-slug"
                    type="text"
                    value={createFormData.slug}
                    onChange={(e) => setCreateFormData({ ...createFormData, slug: e.target.value })}
                    className={inputBase}
                    placeholder="url-de-l-article"
                  />
                </div>

                <div>
                  <label htmlFor="create-category" className="block text-sm font-medium text-text-dark mb-1">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="create-category"
                    value={createFormData.category}
                    onChange={(e) => setCreateFormData({ ...createFormData, category: e.target.value })}
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="osteopathie">Ostéopathie</option>
                    <option value="reflexes">Réflexes Archaïques</option>
                    <option value="coaching">Coaching Foulée</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="create-excerpt" className="block text-sm font-medium text-text-dark mb-1">
                    Extrait
                  </label>
                  <textarea
                    id="create-excerpt"
                    value={createFormData.excerpt}
                    onChange={(e) => setCreateFormData({ ...createFormData, excerpt: e.target.value })}
                    className={`${inputBase} resize-none`}
                    rows={2}
                    placeholder="Résumé court de l'article..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="create-content" className="block text-sm font-medium text-text-dark mb-1">
                    Contenu
                  </label>
                  <textarea
                    id="create-content"
                    value={createFormData.content}
                    onChange={(e) => setCreateFormData({ ...createFormData, content: e.target.value })}
                    className={`${inputBase} resize-none`}
                    rows={6}
                    placeholder="Contenu de l'article..."
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <label htmlFor="create-published" className="flex items-center gap-2 cursor-pointer">
                    <input
                      id="create-published"
                      type="checkbox"
                      checked={createFormData.isPublished}
                      onChange={(e) => setCreateFormData({ ...createFormData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/40 cursor-pointer"
                    />
                    <span className="text-sm text-text-dark">Publier immédiatement</span>
                  </label>
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                  {createError && (
                    <p className="text-red-500 text-sm flex-1" role="alert">{createError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={creating}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-accent shadow-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {creating ? "Création..." : "Créer l\u2019article"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchArticles}
            className="mt-3 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm animate-pulse">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-1/3 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article list */}
      {!loading && !error && (
        <div className="space-y-3">
          {articles.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucun article</h3>
              <p className="text-sm text-text-muted">
                Créez votre premier article en cliquant sur le bouton ci-dessus.
              </p>
            </div>
          ) : (
            articles.map((article) => {
              const catColors = CATEGORY_COLORS[article.category] || { bg: "bg-primary/10", text: "text-primary" };
              const isConfirmingDelete = deletingSlug === article.slug;

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
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {article.published_at
                          ? formatDate(article.published_at)
                          : formatDate(article.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                        article.is_published
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-primary-light/20 text-text-muted"
                      }`}
                    >
                      {article.is_published ? "Publié" : "Brouillon"}
                    </span>

                    {/* Delete button */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(article.slug)}
                          disabled={deleteLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deleteLoading ? "..." : "Confirmer"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingSlug(null)}
                          className="px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Non
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeletingSlug(article.slug)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                        title="Supprimer cet article"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
