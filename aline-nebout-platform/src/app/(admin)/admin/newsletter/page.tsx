"use client";

import { useState, useEffect } from "react";

interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  gdpr_consent: boolean;
  created_at: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchSubscribers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/admin");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers ?? []);
      } else {
        setError("Impossible de charger les abonnés.");
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/newsletter/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setDeletingId(null);
        await fetchSubscribers();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setDeleteLoading(false);
    }
  }

  // Compute stats
  const totalCount = subscribers.length;
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthCount = subscribers.filter(
    (s) => new Date(s.created_at) >= thisMonthStart
  ).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
          Abonnés newsletter
        </h1>
        <p className="text-text-muted text-sm">
          {loading ? "Chargement..." : `${totalCount} abonné${totalCount !== 1 ? "s" : ""} au total`}
        </p>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-primary/5 rounded-2xl p-5 text-center">
            <p className="text-2xl font-bold text-text-dark">{totalCount}</p>
            <p className="text-xs text-text-muted mt-1">Abonnés au total</p>
          </div>
          <div className="bg-accent/5 rounded-2xl p-5 text-center">
            <p className="text-2xl font-bold text-text-dark">+{thisMonthCount}</p>
            <p className="text-xs text-text-muted mt-1">Ce mois-ci</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchSubscribers}
            className="mt-3 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/80 rounded-2xl p-5 animate-pulse">
                <div className="w-12 h-6 bg-gray-200 rounded mx-auto mb-2" />
                <div className="w-20 h-3 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="w-48 h-4 bg-gray-200 rounded" />
                </div>
                <div className="w-20 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subscriber list */}
      {!loading && !error && (
        <div>
          <h2 className="font-heading text-lg text-text-dark mb-4">
            {totalCount > 0 ? "Tous les abonnés" : ""}
          </h2>

          {subscribers.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucun abonné</h3>
              <p className="text-sm text-text-muted">
                Les abonnés apparaîtront ici lorsqu&apos;ils s&apos;inscriront à la newsletter.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {subscribers.map((sub) => {
                const isConfirmingDelete = deletingId === sub.id;

                return (
                  <div
                    key={sub.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <span className="text-sm text-text-dark truncate">{sub.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{formatDate(sub.created_at)}</span>
                      {sub.source && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs font-medium">
                          {sub.source}
                        </span>
                      )}
                    </div>

                    {/* Delete button */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDelete(sub.id)}
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
                        onClick={() => setDeletingId(sub.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                        title="Supprimer cet abonné"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Supprimer
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
