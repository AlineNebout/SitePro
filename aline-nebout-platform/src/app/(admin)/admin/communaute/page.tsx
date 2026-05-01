"use client";

import { useState, useEffect } from "react";

interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  is_pinned: boolean;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  annonce: { bg: "bg-primary/10", text: "text-primary" },
  ressource: { bg: "bg-accent/10", text: "text-accent" },
  question: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]" },
  evenement: { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

const CATEGORY_LABELS: Record<string, string> = {
  annonce: "Annonce",
  ressource: "Ressource",
  question: "Question",
  evenement: "Événement",
};

export default function AdminCommunautePage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Action states
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/community/admin");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts ?? []);
      } else {
        setError("Impossible de charger les publications.");
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleTogglePin(id: string, currentlyPinned: boolean) {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/community/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !currentlyPinned }),
      });
      if (res.ok) {
        await fetchPosts();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/community/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingId(null);
        await fetchPosts();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setDeleteLoading(false);
    }
  }

  function formatDate(dateStr: string): string {
    try {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  }

  const pinnedCount = posts.filter((p) => p.is_pinned).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
          Espace communauté — Modération
        </h1>
        <p className="text-text-muted text-sm">
          {loading
            ? "Chargement..."
            : `${posts.length} publication${posts.length !== 1 ? "s" : ""}${pinnedCount > 0 ? ` · ${pinnedCount} épinglée${pinnedCount !== 1 ? "s" : ""}` : ""}`}
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchPosts}
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
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="w-28 h-4 bg-gray-200 rounded mb-1" />
                  <div className="w-40 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded-lg" />
              </div>
              <div className="w-full h-4 bg-gray-200 rounded ml-13" />
            </div>
          ))}
        </div>
      )}

      {/* Post list */}
      {!loading && !error && (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucune publication</h3>
              <p className="text-sm text-text-muted">
                Les publications de la communauté apparaîtront ici.
              </p>
            </div>
          ) : (
            posts.map((post) => {
              const catKey = post.category?.toLowerCase() ?? "";
              const catColors = CATEGORY_COLORS[catKey] || { bg: "bg-primary/10", text: "text-primary" };
              const catLabel = CATEGORY_LABELS[catKey] || post.category || "—";
              const authorName = post.profiles?.full_name || post.profiles?.email || "Auteur inconnu";
              const authorInitials = authorName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const isToggling = togglingId === post.id;
              const isConfirmingDelete = deletingId === post.id;

              return (
                <div
                  key={post.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm ${post.is_pinned ? "ring-2 ring-primary/20" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {authorInitials || "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading text-sm text-text-dark">{authorName}</h3>
                          {post.is_pinned && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                              </svg>
                              Épinglé
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted">{formatDate(post.created_at)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${catColors.bg} ${catColors.text}`}>
                        {catLabel}
                      </span>
                    </div>
                  </div>

                  {post.title && (
                    <p className="text-sm font-semibold text-text-dark mt-3 pl-13">
                      {post.title}
                    </p>
                  )}
                  <p className="text-sm text-text-muted mt-1 pl-13">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pl-13">
                    {/* Pin / Unpin */}
                    <button
                      type="button"
                      onClick={() => handleTogglePin(post.id, post.is_pinned)}
                      disabled={isToggling}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                        post.is_pinned
                          ? "text-primary hover:bg-primary/5"
                          : "text-text-muted hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                      </svg>
                      {isToggling ? "..." : post.is_pinned ? "Désépingler" : "Épingler"}
                    </button>

                    {/* Delete */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          disabled={deleteLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deleteLoading ? "..." : "Confirmer"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(null)}
                          className="px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Non
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeletingId(post.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
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
