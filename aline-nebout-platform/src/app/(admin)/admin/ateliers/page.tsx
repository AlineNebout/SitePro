"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Workshop {
  id: string;
  date: string;
  time_display: string;
  location: string;
  max_capacity: number;
  current_count: number;
  status: string;
  notes: string | null;
  created_at: string;
}

interface WorkshopFormData {
  date: string;
  timeDisplay: string;
  location: string;
  maxCapacity: number;
  notes: string;
}

const defaultFormData: WorkshopFormData = {
  date: "",
  timeDisplay: "18h20",
  location: "Esplanade de l\u2019écluse de Rochetaillée",
  maxCapacity: 12,
  notes: "",
};

const statusLabels: Record<string, { label: string; className: string }> = {
  upcoming: {
    label: "À venir",
    className: "bg-emerald-500/10 text-emerald-700",
  },
  full: {
    label: "Complet",
    className: "bg-amber-500/10 text-amber-700",
  },
  completed: {
    label: "Terminé",
    className: "bg-gray-500/10 text-gray-600",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-red-500/10 text-red-600",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const months = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc.",
  ];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function AdminAteliersPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState<WorkshopFormData>(defaultFormData);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchWorkshops() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/workshops/admin");
      if (res.ok) {
        const data = await res.json();
        setWorkshops(data.workshops ?? []);
      } else {
        // Fallback: fetch from public endpoint (only upcoming)
        const publicRes = await fetch("/api/workshops");
        if (publicRes.ok) {
          const data = await publicRes.json();
          setWorkshops(data.workshops ?? []);
        } else {
          setError("Impossible de charger les ateliers.");
        }
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkshops();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!createFormData.date) {
      setCreateError("La date est requise.");
      return;
    }

    setCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: createFormData.date,
          timeDisplay: createFormData.timeDisplay,
          location: createFormData.location,
          maxCapacity: createFormData.maxCapacity,
          notes: createFormData.notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setCreateError(data.error || "Erreur lors de la création.");
        return;
      }

      setShowCreateForm(false);
      setCreateFormData(defaultFormData);
      await fetchWorkshops();
    } catch {
      setCreateError("Impossible de contacter le serveur.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(workshopId: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/workshops/${workshopId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingId(null);
        await fetchWorkshops();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setDeleteLoading(false);
    }
  }

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none transition-colors";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des ateliers
          </h1>
          <p className="text-text-muted text-sm">
            {loading ? "Chargement..." : `${workshops.length} atelier${workshops.length !== 1 ? "s" : ""}`}
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
              Créer un atelier
            </>
          )}
        </button>
      </div>

      {/* Create workshop form */}
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
              <h2 className="font-heading text-lg text-text-dark mb-4">Nouvel atelier</h2>
              <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-date" className="block text-sm font-medium text-text-dark mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="create-date"
                    type="date"
                    value={createFormData.date}
                    onChange={(e) => setCreateFormData({ ...createFormData, date: e.target.value })}
                    className={`${inputBase} cursor-pointer`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="create-time" className="block text-sm font-medium text-text-dark mb-1">
                    Horaire
                  </label>
                  <input
                    id="create-time"
                    type="text"
                    value={createFormData.timeDisplay}
                    onChange={(e) => setCreateFormData({ ...createFormData, timeDisplay: e.target.value })}
                    className={inputBase}
                    placeholder="18h20"
                  />
                </div>

                <div>
                  <label htmlFor="create-location" className="block text-sm font-medium text-text-dark mb-1">
                    Lieu
                  </label>
                  <input
                    id="create-location"
                    type="text"
                    value={createFormData.location}
                    onChange={(e) => setCreateFormData({ ...createFormData, location: e.target.value })}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label htmlFor="create-capacity" className="block text-sm font-medium text-text-dark mb-1">
                    Capacité max
                  </label>
                  <input
                    id="create-capacity"
                    type="number"
                    min={1}
                    max={50}
                    value={createFormData.maxCapacity}
                    onChange={(e) => setCreateFormData({ ...createFormData, maxCapacity: parseInt(e.target.value) || 12 })}
                    className={inputBase}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="create-notes" className="block text-sm font-medium text-text-dark mb-1">
                    Notes <span className="text-text-muted text-xs font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    id="create-notes"
                    value={createFormData.notes}
                    onChange={(e) => setCreateFormData({ ...createFormData, notes: e.target.value })}
                    className={`${inputBase} resize-none`}
                    rows={2}
                    placeholder="Notes internes..."
                  />
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
                    {creating ? "Création..." : "Créer l\u2019atelier"}
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
            onClick={fetchWorkshops}
            className="mt-3 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-32 h-5 bg-gray-200 rounded" />
                <div className="flex-1" />
                <div className="w-16 h-8 bg-gray-200 rounded-lg" />
                <div className="w-20 h-6 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workshop list */}
      {!loading && !error && (
        <div className="space-y-4">
          {workshops.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucun atelier</h3>
              <p className="text-sm text-text-muted">
                Créez votre premier atelier en cliquant sur le bouton ci-dessus.
              </p>
            </div>
          ) : (
            workshops.map((workshop) => {
              const statusInfo = statusLabels[workshop.status] ?? {
                label: workshop.status,
                className: "bg-gray-500/10 text-gray-600",
              };
              const isConfirmingDelete = deletingId === workshop.id;

              return (
                <div
                  key={workshop.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-heading text-base text-text-dark">
                          {formatDate(workshop.date)}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {workshop.time_display}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {workshop.location}
                        </span>
                        {workshop.notes && (
                          <span className="flex items-center gap-1.5 text-xs italic">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            {workshop.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Registrant count */}
                      <div className="text-center">
                        <p className="text-lg font-bold text-text-dark">
                          {workshop.current_count}/{workshop.max_capacity}
                        </p>
                        <p className="text-xs text-text-muted">inscrits</p>
                      </div>

                      {/* Delete button */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDelete(workshop.id)}
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
                          onClick={() => setDeletingId(workshop.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                          title="Supprimer cet atelier"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Supprimer
                        </button>
                      )}
                    </div>
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
