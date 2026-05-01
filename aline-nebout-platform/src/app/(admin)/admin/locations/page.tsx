"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RentalSpace {
  id: string;
  name: string;
  description: string;
  status: string;
  tenant_name: string | null;
  tenant_profession: string | null;
  since_date: string | null;
  created_at: string;
}

interface RentalInquiry {
  id: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface SpaceFormData {
  name: string;
  description: string;
  status: string;
  tenantName: string;
  tenantProfession: string;
  sinceDate: string;
}

const defaultSpaceForm: SpaceFormData = {
  name: "",
  description: "",
  status: "available",
  tenantName: "",
  tenantProfession: "",
  sinceDate: "",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  nouveau: { bg: "bg-accent/10", text: "text-accent", label: "Nouveau" },
  "contacté": { bg: "bg-primary/10", text: "text-primary", label: "Contacté" },
  "confirmé": { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Confirmé" },
};

const NEXT_STATUS: Record<string, string> = {
  nouveau: "contacté",
  "contacté": "confirmé",
};

export default function AdminLocationsPage() {
  const [spaces, setSpaces] = useState<RentalSpace[]>([]);
  const [inquiries, setInquiries] = useState<RentalInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create space form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [spaceForm, setSpaceForm] = useState<SpaceFormData>(defaultSpaceForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Inquiry actions
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rentals/admin");
      if (res.ok) {
        const data = await res.json();
        setSpaces(data.spaces ?? []);
        setInquiries(data.inquiries ?? []);
      } else {
        setError("Impossible de charger les données de location.");
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateSpace(e: FormEvent) {
    e.preventDefault();
    if (!spaceForm.name.trim()) {
      setCreateError("Le nom de l'espace est requis.");
      return;
    }

    setCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/rentals/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: spaceForm.name.trim(),
          description: spaceForm.description.trim(),
          status: spaceForm.status,
          tenantName: spaceForm.tenantName.trim() || null,
          tenantProfession: spaceForm.tenantProfession.trim() || null,
          sinceDate: spaceForm.sinceDate.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setCreateError(data.error || "Erreur lors de la création.");
        return;
      }

      setShowCreateForm(false);
      setSpaceForm(defaultSpaceForm);
      await fetchData();
    } catch {
      setCreateError("Impossible de contacter le serveur.");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdateInquiryStatus(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/rentals/inquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDeleteInquiry(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/rentals/inquiry/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingId(null);
        await fetchData();
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
            Gestion des locations
          </h1>
          <p className="text-text-muted text-sm">
            {loading
              ? "Chargement..."
              : `${spaces.length} espace${spaces.length !== 1 ? "s" : ""} · ${inquiries.length} demande${inquiries.length !== 1 ? "s" : ""} en cours`}
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
              Ajouter un espace
            </>
          )}
        </button>
      </div>

      {/* Create space form */}
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
              <h2 className="font-heading text-lg text-text-dark mb-4">Nouvel espace de location</h2>
              <form onSubmit={handleCreateSpace} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="space-name" className="block text-sm font-medium text-text-dark mb-1">
                    Nom de l&apos;espace <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="space-name"
                    type="text"
                    value={spaceForm.name}
                    onChange={(e) => setSpaceForm({ ...spaceForm, name: e.target.value })}
                    className={inputBase}
                    placeholder="Ex : Bureau C"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="space-status" className="block text-sm font-medium text-text-dark mb-1">
                    Statut
                  </label>
                  <select
                    id="space-status"
                    value={spaceForm.status}
                    onChange={(e) => setSpaceForm({ ...spaceForm, status: e.target.value })}
                    className={`${inputBase} cursor-pointer`}
                  >
                    <option value="available">Disponible</option>
                    <option value="occupied">Occupé</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="space-description" className="block text-sm font-medium text-text-dark mb-1">
                    Description
                  </label>
                  <textarea
                    id="space-description"
                    value={spaceForm.description}
                    onChange={(e) => setSpaceForm({ ...spaceForm, description: e.target.value })}
                    className={`${inputBase} resize-none`}
                    rows={2}
                    placeholder="Description de l'espace..."
                  />
                </div>

                <div>
                  <label htmlFor="space-tenant" className="block text-sm font-medium text-text-dark mb-1">
                    Locataire actuel
                  </label>
                  <input
                    id="space-tenant"
                    type="text"
                    value={spaceForm.tenantName}
                    onChange={(e) => setSpaceForm({ ...spaceForm, tenantName: e.target.value })}
                    className={inputBase}
                    placeholder="Nom du locataire"
                  />
                </div>

                <div>
                  <label htmlFor="space-profession" className="block text-sm font-medium text-text-dark mb-1">
                    Profession du locataire
                  </label>
                  <input
                    id="space-profession"
                    type="text"
                    value={spaceForm.tenantProfession}
                    onChange={(e) => setSpaceForm({ ...spaceForm, tenantProfession: e.target.value })}
                    className={inputBase}
                    placeholder="Ex : Psychomotricienne"
                  />
                </div>

                <div>
                  <label htmlFor="space-since" className="block text-sm font-medium text-text-dark mb-1">
                    Depuis
                  </label>
                  <input
                    id="space-since"
                    type="text"
                    value={spaceForm.sinceDate}
                    onChange={(e) => setSpaceForm({ ...spaceForm, sinceDate: e.target.value })}
                    className={inputBase}
                    placeholder="Ex : Septembre 2024"
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
                    {creating ? "Création..." : "Ajouter l'espace"}
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
            onClick={fetchData}
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gray-200 rounded mb-1" />
                  <div className="w-40 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Rental spaces */}
          <h2 className="font-heading text-lg text-text-dark mb-4">Espaces de location</h2>
          <div className="space-y-3 mb-10">
            {spaces.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-text-dark mb-2">Aucun espace</h3>
                <p className="text-sm text-text-muted">
                  Ajoutez votre premier espace en cliquant sur le bouton ci-dessus.
                </p>
              </div>
            ) : (
              spaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-sm text-text-dark">{space.name}</h3>
                      {space.tenant_name ? (
                        <p className="text-xs text-text-muted truncate">
                          {space.tenant_name} — {space.tenant_profession} · Depuis {space.since_date}
                        </p>
                      ) : (
                        <p className="text-xs text-text-muted">Aucun locataire</p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                      space.status === "occupied"
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {space.status === "occupied" ? "Occupé" : "Disponible"}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Rental inquiries */}
          <h2 className="font-heading text-lg text-text-dark mb-4">Demandes de location</h2>
          <div className="space-y-3">
            {inquiries.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V18z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-text-dark mb-2">Aucune demande</h3>
                <p className="text-sm text-text-muted">
                  Les demandes de location apparaîtront ici.
                </p>
              </div>
            ) : (
              inquiries.map((inquiry) => {
                const statusStyle = STATUS_COLORS[inquiry.status] || STATUS_COLORS.nouveau;
                const nextStatus = NEXT_STATUS[inquiry.status];
                const isUpdating = updatingId === inquiry.id;
                const isConfirmingDelete = deletingId === inquiry.id;

                return (
                  <div
                    key={inquiry.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {inquiry.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-sm text-text-dark">{inquiry.name}</h3>
                          <p className="text-xs text-text-muted">
                            {inquiry.profession} · {inquiry.email}
                            {inquiry.phone ? ` · ${inquiry.phone}` : ""}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>

                    <p className="text-sm text-text-muted mt-3 pl-13">
                      {inquiry.message}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pl-13">
                      {/* Advance status */}
                      {nextStatus && (
                        <button
                          type="button"
                          onClick={() => handleUpdateInquiryStatus(inquiry.id, nextStatus)}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {isUpdating
                            ? "..."
                            : `Marquer ${STATUS_COLORS[nextStatus]?.label.toLowerCase() ?? nextStatus}`}
                        </button>
                      )}

                      {/* Delete */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inquiry.id)}
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
                          onClick={() => setDeletingId(inquiry.id)}
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
        </>
      )}
    </>
  );
}
