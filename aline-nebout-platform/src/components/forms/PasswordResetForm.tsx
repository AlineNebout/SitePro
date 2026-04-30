"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("L'email est requis");
      return;
    }
    // TODO: Supabase auth password reset
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="bg-[#10B981]/10 border-2 border-[#10B981]/20 rounded-2xl p-8 text-center">
        <svg className="w-10 h-10 text-[#10B981] mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        <h3 className="font-heading text-lg text-text-dark mb-2">Email envoyé</h3>
        <p className="text-text-muted text-sm">Si un compte existe avec cette adresse, vous recevrez un lien de réinitialisation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</p>}
      <div>
        <label htmlFor="reset-email" className="block text-sm font-medium text-text-dark mb-1">Email</label>
        <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-colors" placeholder="votre@email.com" />
      </div>
      <button type="submit" className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none">
        Réinitialiser le mot de passe
      </button>
      <p className="text-center text-text-muted text-sm">
        <Link href="/connexion" className="text-primary hover:text-accent transition-colors cursor-pointer">Retour à la connexion</Link>
      </p>
    </form>
  );
}
