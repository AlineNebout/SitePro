"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";

interface WorkshopCardProps {
  date: string;
  time: string;
  location: string;
  spotsRemaining: number;
  isFull: boolean;
}

export default function WorkshopCard({
  date,
  time,
  location,
  spotsRemaining,
  isFull,
}: WorkshopCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleToggleForm() {
    if (!isRegistered) {
      setIsFormOpen((prev) => !prev);
    }
  }

  function handleSuccess() {
    setIsFormOpen(false);
    setIsRegistered(true);
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Date icon block */}
          <div className="flex items-center gap-4 sm:min-w-[180px]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div>
              <p className="font-heading text-base text-text-dark">{date}</p>
            </div>
          </div>

          {/* Time & location */}
          <div className="flex items-center gap-6 text-sm text-text-muted flex-1">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {time}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {location}
            </span>
          </div>

          {/* Status & action */}
          <div className="flex items-center gap-3">
            {isFull ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Complet
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {spotsRemaining} places restantes
              </span>
            )}

            {isRegistered ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Inscrit
              </span>
            ) : isFull ? (
              <button
                type="button"
                onClick={handleToggleForm}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-emerald-500/30 text-emerald-700 text-sm font-semibold hover:bg-emerald-50 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                Liste d&apos;attente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggleForm}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                S&apos;inscrire
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable registration form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-emerald-100 bg-emerald-50/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-base text-text-dark">
                    {isFull
                      ? "S'inscrire sur la liste d'attente"
                      : "S'inscrire à cet atelier"}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {isFull
                      ? "Vous serez contacté(e) si une place se libère."
                      : "Remplissez le formulaire pour réserver votre place."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-dark hover:bg-white/60 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  aria-label="Fermer le formulaire"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <WorkshopRegistrationForm
                workshopDate={date}
                onSuccess={handleSuccess}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
