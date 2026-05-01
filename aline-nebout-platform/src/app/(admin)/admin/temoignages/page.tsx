"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  first_name: string;
  review_text: string;
  service_type: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

interface TestimonialFormData {
  firstName: string;
  reviewText: string;
  serviceType: string;
  rating: number;
  isPublished: boolean;
}

const defaultFormData: TestimonialFormData = {
  firstName: "",
  reviewText: "",
  serviceType: "osteopathie",
  rating: 5,
  isPublished: true,
};

const SERVICE_COLORS: Record<string, { bg: string; text: string }> = {
  osteopathie: { bg: "bg-primary/10", text: "text-primary" },
  reflexes: { bg: "bg-accent/10", text: "text-accent" },
  coaching: { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

const SERVICE_LABELS: Record<string, string> = {
  osteopathie: "Ostéopathie",
  reflexes: "Réflexes Archaïques",
  coaching: "Coaching Foulée",
};

export default function AdminTemoignagesPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState<TestimonialFormData>(defaultFormData);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toggle loading
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function fetchTestimonials() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/testimonials/admin");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials ?? []);
      } else {
        // Fallback: fetch from public endpoint (only published)
        const publicRes = await fetch("/api/testimonials");
        if (publicRes.ok) {
          const data = await publicRes.json();
          setTestimonials(data.testimonials ?? []);
        } else {
          setError("Impossible de charger les témoignages.");
        }
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!createFormData.firstName.trim() || !createFormData.reviewText.trim()) {
      setCreateError("Le nom et le texte sont requis.");
      return;
    }

    setCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: createFormData.firstName.trim(),
          reviewText: createFormData.reviewText.trim(),
          serviceType: createFormData.serviceType,
          rating: createFormData.rating,
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
      await fetchTestimonials();
    } catch {
      setCreateError("Impossible de contacter le serveur.");
    } finally {
      setCreating(false);
    }
  }

  async function handleTogglePublished(id: string, currentlyPublished: boolean) {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentlyPublished }),
      });
      if (res.ok) {
        await fetchTestimonials();
      }
    } catch {
      // Silently fail
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingId(null);
        await fetchTestimonials();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setDeleteLoading(false);
    }
  }

  const publishedCount = testimonials.filter((t) => t.is_published).length;

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none transition-colors";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des témoignages
          </h1>
          <p className="text-text-muted text-sm">
            {loading
              ? "Chargement..."
              : `${testimonials.length} témoignage${testimonials.length !== 1 ? "s" : ""} · ${publishedCount} publié${publishedCount !== 1 ? "s" : ""}`}
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
              Ajouter un témoignage
            </>
          )}
        </button>
      </div>

      {/* Create testimonial form */}
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
              <h2 className="font-heading text-lg text-text-dark mb-4">Nouveau témoignage</h2>
              <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-name" className="block text-sm font-medium text-text-dark mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="create-name"
                    type="text"
                    value={createFormData.firstName}
                    onChange={(e) => setCreateFormData({ ...createFormData, firstName: e.target.value })}
                    className={inputBase}
                    placeholder="Prénom du patient"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="create-service" className="block text-sm font-medium text-text-dark mb-1">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="create-service"
                    value={createFormData.serviceType}
                    onChange={(e) => setCreateFormData({ ...createFormData, serviceType: e.target.value })}
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="osteopathie">Ostéopathie</option>
                    <option value="reflexes">Réflexes Archaïques</option>
                    <option value="coaching">Coaching Foulée</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="create-text" className="block text-sm font-medium text-text-dark mb-1">
                    Témoignage <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="create-text"
                    value={createFormData.reviewText}
                    onChange={(e) => setCreateFormData({ ...createFormData, reviewText: e.target.value })}
                    className={`${inputBase} resize-none`}
                    rows={3}
                    placeholder="Texte du témoignage..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="create-rating" className="block text-sm font-medium text-text-dark mb-1">
                    Note
                  </label>
                  <select
                    id="create-rating"
                    value={createFormData.rating}
                    onChange={(e) => setCreateFormData({ ...createFormData, rating: parseInt(e.target.value) })}
                    className={`${inputBase} cursor-pointer`}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} étoile{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label htmlFor="create-published" className="flex items-center gap-2 cursor-pointer pb-2.5">
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
                    {creating ? "Création..." : "Ajouter le témoignage"}
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
            onClick={fetchTestimonials}
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
                  <div className="w-24 h-4 bg-gray-200 rounded mb-1" />
                  <div className="w-32 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-lg" />
              </div>
              <div className="w-full h-4 bg-gray-200 rounded ml-13" />
            </div>
          ))}
        </div>
      )}

      {/* Testimonial list */}
      {!loading && !error && (
        <div className="space-y-3">
          {testimonials.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucun témoignage</h3>
              <p className="text-sm text-text-muted">
                Ajoutez votre premier témoignage en cliquant sur le bouton ci-dessus.
              </p>
            </div>
          ) : (
            testimonials.map((testimonial) => {
              const serviceColors = SERVICE_COLORS[testimonial.service_type] || { bg: "bg-primary/10", text: "text-primary" };
              const isConfirmingDelete = deletingId === testimonial.id;
              const isToggling = togglingId === testimonial.id;

              return (
                <div
                  key={testimonial.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {testimonial.first_name[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm text-text-dark">{testimonial.first_name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${serviceColors.bg} ${serviceColors.text}`}>
                            {SERVICE_LABELS[testimonial.service_type] || testimonial.service_type}
                          </span>
                          <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} étoiles sur 5`}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3.5 h-3.5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-200"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Toggle published */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(testimonial.id, testimonial.is_published)}
                        disabled={isToggling}
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 ${
                          testimonial.is_published
                            ? "bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20"
                            : "bg-primary-light/20 text-text-muted hover:bg-primary-light/30"
                        }`}
                        title={testimonial.is_published ? "Cliquer pour masquer" : "Cliquer pour publier"}
                      >
                        {isToggling ? "..." : testimonial.is_published ? "Publié" : "Masqué"}
                      </button>

                      {/* Delete button */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDelete(testimonial.id)}
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
                          onClick={() => setDeletingId(testimonial.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                          title="Supprimer ce témoignage"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed pl-13">
                    &ldquo;{testimonial.review_text}&rdquo;
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
