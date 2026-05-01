"use client";

import { useState, type FormEvent } from "react";

export default function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "parent_guide" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
        return;
      }
      if (data.success) {
        setSubmitted(true);
      }
    } catch {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#10B981]/10 border-2 border-[#10B981]/20 rounded-xl p-6 text-center">
        <svg
          className="w-8 h-8 text-[#10B981] mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <p className="text-text-dark font-medium text-sm">
          Merci ! Vérifiez votre boîte mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="guide-email" className="block text-sm font-medium text-text-dark mb-1.5">
          Votre email
        </label>
        <input
          id="guide-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="parent@email.com"
          className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark placeholder:text-text-muted/50 hover:border-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-2 border-primary-light text-primary accent-primary focus:ring-2 focus:ring-accent cursor-pointer"
        />
        <span className="text-xs text-text-muted leading-snug">
          J&apos;accepte de recevoir le guide par email. Mes données sont traitées conformément au
          RGPD et ne seront jamais partagées.
        </span>
      </label>
      {error && (
        <p className="text-red-500 text-sm text-center" role="alert">{error}</p>
      )}
      <button
        type="submit"
        disabled={!email || !consent || loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark shadow-lg shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        {loading ? "Envoi en cours..." : "Télécharger le guide gratuit"}
      </button>
    </form>
  );
}
