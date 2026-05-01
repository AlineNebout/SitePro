"use client";

import { useState, useEffect } from "react";

interface Practitioner {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  profession: string;
  specialty: string;
  bio: string;
  phone: string;
  email: string;
  website_url: string;
  photo_url: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminPraticiensPage() {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPractitioners() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/practitioners/admin");
      if (res.ok) {
        const data = await res.json();
        setPractitioners(data.practitioners ?? []);
      } else {
        setError("Impossible de charger les praticiens.");
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPractitioners();
  }, []);

  const activeCount = practitioners.filter((p) => p.is_active).length;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des praticiens
          </h1>
          <p className="text-text-muted text-sm">
            {loading
              ? "Chargement..."
              : `${practitioners.length} praticien${practitioners.length !== 1 ? "s" : ""} au Pôle Santé · ${activeCount} actif${activeCount !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Inviter un praticien
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchPractitioners}
            className="mt-3 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="w-32 h-4 bg-gray-200 rounded mb-1" />
                  <div className="w-48 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practitioner list */}
      {!loading && !error && (
        <div className="space-y-3">
          {practitioners.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">Aucun praticien</h3>
              <p className="text-sm text-text-muted">
                Invitez votre premier praticien en cliquant sur le bouton ci-dessus.
              </p>
            </div>
          ) : (
            practitioners.map((practitioner) => {
              const initials = `${practitioner.first_name?.[0] ?? ""}${practitioner.last_name?.[0] ?? ""}`.toUpperCase();
              const fullName = `${practitioner.first_name} ${practitioner.last_name}`.trim();

              return (
                <div
                  key={practitioner.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {initials || "?"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-sm text-text-dark truncate">
                        {fullName || "Sans nom"}
                      </h3>
                      <p className="text-xs text-text-muted truncate">
                        {practitioner.profession || practitioner.specialty || "—"}
                        {practitioner.specialty && practitioner.profession
                          ? ` · ${practitioner.specialty}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted hidden sm:inline truncate max-w-[200px]">
                      {practitioner.email || "—"}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                        practitioner.is_active
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {practitioner.is_active ? "Actif" : "En attente"}
                    </span>
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
