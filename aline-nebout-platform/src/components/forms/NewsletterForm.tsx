"use client";

import { useState, type FormEvent } from "react";

interface NewsletterFormProps {
  variant: "footer" | "inline";
}

export default function NewsletterForm({ variant }: NewsletterFormProps) {
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
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, gdprConsent: consent }),
      });
      const data = await res.json();

      if (data.error === "already_subscribed") {
        setError("Vous êtes déjà inscrit(e) à la newsletter.");
        return;
      }
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
      <div className="bg-[#10B981]/10 border-2 border-[#10B981]/20 rounded-xl p-4 text-center">
        <svg
          className="w-6 h-6 text-[#10B981] mx-auto mb-1.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <p className="text-text-dark font-medium text-sm">
          Merci ! Vous êtes inscrit(e) à la newsletter.
        </p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <label htmlFor="newsletter-email-footer" className="sr-only">
            Votre email
          </label>
          <input
            id="newsletter-email-footer"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark text-sm placeholder:text-text-muted/50 hover:border-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
          <button
            type="submit"
            disabled={!email || !consent || loading}
            data-umami-event="newsletter-signup"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "..." : "S'inscrire"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs" role="alert">{error}</p>
        )}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-2 border-primary-light text-primary accent-primary focus:ring-2 focus:ring-accent cursor-pointer"
          />
          <span className="text-xs text-text-muted leading-snug">
            J&apos;accepte de recevoir la newsletter. Conformément au RGPD, mes données ne seront jamais partagées.
          </span>
        </label>
      </form>
    );
  }

  // Inline variant
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border-2 border-primary/10">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl text-text-dark mb-2">
          Restez informé(e)
        </h3>
        <p className="text-text-muted text-sm max-w-md mx-auto">
          Recevez nos conseils en ostéopathie, réflexes archaïques et coaching foulée directement dans votre boîte mail.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <label htmlFor="newsletter-email-inline" className="block text-sm font-medium text-text-dark mb-1.5">
            Votre email
          </label>
          <input
            id="newsletter-email-inline"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
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
            J&apos;accepte de recevoir la newsletter. Conformément au RGPD, mes données ne seront jamais partagées.
          </span>
        </label>
        {error && (
          <p className="text-red-500 text-sm text-center" role="alert">{error}</p>
        )}
        <button
          type="submit"
          disabled={!email || !consent || loading}
          data-umami-event="newsletter-signup"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          {loading ? "Inscription en cours..." : "S'inscrire à la newsletter"}
        </button>
      </form>
    </div>
  );
}
