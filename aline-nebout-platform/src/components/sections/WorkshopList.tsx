"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Workshop {
  id: string;
  date: string;
  dayLabel: string;
  time: string;
  location: string;
  spotsTotal: number;
  spotsTaken: number;
}

interface WorkshopListProps {
  workshops: Workshop[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Le nom est requis";
  }
  if (!data.email.trim()) {
    errors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email invalide";
  }
  if (!data.phone.trim()) {
    errors.phone = "Le téléphone est requis";
  } else if (!/^[\d\s+()-]{10,}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Numéro de téléphone invalide";
  }
  return errors;
}

export default function WorkshopList({ workshops }: WorkshopListProps) {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submittedWaitlist, setSubmittedWaitlist] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleOpenForm(workshopId: string, waitlist: boolean) {
    setSelectedWorkshopId(workshopId);
    setIsWaitlist(waitlist);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setFormErrors({});
    setSubmitted(null);
    setSubmittedWaitlist(false);
    setWaitlistPosition(null);
    setApiError("");
  }

  function handleCloseForm() {
    setSelectedWorkshopId(null);
    setIsWaitlist(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch(`/api/workshops/${selectedWorkshopId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Une erreur est survenue.");
        return;
      }

      if (data.waitlisted) {
        setSubmittedWaitlist(true);
        setWaitlistPosition(data.position ?? null);
      }

      setSubmitted(selectedWorkshopId);
      setSelectedWorkshopId(null);
    } catch {
      setApiError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (workshops.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <h3 className="font-heading text-lg text-text-dark mb-2">Aucun atelier programmé</h3>
        <p className="text-sm text-text-muted">
          Les prochaines dates seront annoncées bientôt. Revenez consulter cette page régulièrement.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {workshops.map((workshop) => {
        const isFull = workshop.spotsTaken >= workshop.spotsTotal;
        const spotsRemaining = workshop.spotsTotal - workshop.spotsTaken;
        const isFormOpen = selectedWorkshopId === workshop.id;
        const wasSubmitted = submitted === workshop.id;

        return (
          <div key={workshop.id} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Date block */}
                <div className="flex items-center gap-4 sm:min-w-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-base text-text-dark">{workshop.dayLabel}</p>
                    <p className="text-sm text-text-muted">{workshop.date}</p>
                  </div>
                </div>

                {/* Time & location */}
                <div className="flex items-center gap-6 text-sm text-text-muted flex-1">
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {workshop.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {workshop.location}
                  </span>
                </div>

                {/* Status & action */}
                <div className="flex items-center gap-4">
                  {isFull ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Complet
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {spotsRemaining}/{workshop.spotsTotal} places
                    </span>
                  )}

                  {wasSubmitted ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {submittedWaitlist ? "En liste d\u2019attente" : "Inscrit"}
                    </span>
                  ) : isFull ? (
                    <button
                      type="button"
                      onClick={() => handleOpenForm(workshop.id, true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-emerald-500/30 text-emerald-700 text-sm font-semibold hover:bg-emerald-50 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                    >
                      Liste d&apos;attente
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenForm(workshop.id, false)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                    >
                      S&apos;inscrire
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Inline registration form */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-emerald-100 bg-emerald-50/30 p-6 sm:p-8">
                    <h3 className="font-heading text-lg text-text-dark mb-1">
                      {isWaitlist ? "S\u2019inscrire sur la liste d\u2019attente" : "S\u2019inscrire à cet atelier"}
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      {isWaitlist
                        ? "Vous serez contacté(e) si une place se libère."
                        : "Remplissez le formulaire ci-dessous pour réserver votre place."}
                    </p>

                    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4" noValidate>
                      <div>
                        <label htmlFor={`name-${workshop.id}`} className="block text-sm font-medium text-text-dark mb-1">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          id={`name-${workshop.id}`}
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none transition-colors"
                          placeholder="Votre nom"
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor={`email-${workshop.id}`} className="block text-sm font-medium text-text-dark mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id={`email-${workshop.id}`}
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none transition-colors"
                          placeholder="votre@email.com"
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor={`phone-${workshop.id}`} className="block text-sm font-medium text-text-dark mb-1">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id={`phone-${workshop.id}`}
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none transition-colors"
                          placeholder="06 XX XX XX XX"
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor={`message-${workshop.id}`} className="block text-sm font-medium text-text-dark mb-1">
                          Message <span className="text-text-muted text-xs font-normal">(optionnel)</span>
                        </label>
                        <input
                          id={`message-${workshop.id}`}
                          type="text"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none transition-colors"
                          placeholder="Précisions, questions..."
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-3 pt-2">
                        {apiError && (
                          <p className="text-red-500 text-sm" role="alert">{apiError}</p>
                        )}
                        <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading
                              ? "Inscription en cours..."
                              : isWaitlist
                                ? "Rejoindre la liste d\u2019attente"
                                : "Confirmer l\u2019inscription"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseForm}
                            className="px-4 py-2.5 rounded-xl text-text-muted text-sm font-medium hover:text-text-dark hover:bg-white/60 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {wasSubmitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-emerald-100 bg-emerald-50/50 p-6 sm:p-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-base text-text-dark">
                          {submittedWaitlist
                            ? "Inscription sur liste d\u2019attente confirmée"
                            : "Inscription confirmée"}
                        </p>
                        <p className="text-sm text-text-muted mt-1">
                          {submittedWaitlist && waitlistPosition
                            ? `Vous êtes en position ${waitlistPosition} sur la liste d\u2019attente. Vous serez contacté(e) si une place se libère.`
                            : "Vous recevrez un email de confirmation prochainement. À bientôt sur les bords de Saône !"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
