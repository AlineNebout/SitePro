"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { registerSchema } from "@/lib/validations/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword: password,
    });
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      setError(firstIssue?.message ?? "Tous les champs sont requis");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#10B981]/10 border-2 border-[#10B981]/20 rounded-2xl p-8 text-center">
        <svg className="w-10 h-10 text-[#10B981] mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        <h3 className="font-heading text-lg text-text-dark mb-2">Compte créé</h3>
        <p className="text-text-muted text-sm">Vérifiez votre boîte mail pour confirmer votre inscription.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</p>}
      <div>
        <label htmlFor="reg-name" className="block text-sm font-medium text-text-dark mb-1">Nom complet</label>
        <input id="reg-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-colors" placeholder="Votre nom" />
      </div>
      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-text-dark mb-1">Email</label>
        <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-colors" placeholder="votre@email.com" />
      </div>
      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-text-dark mb-1">Mot de passe</label>
        <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-colors" placeholder="6 caractères minimum" />
      </div>
      <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? "Création en cours..." : "Créer mon compte"}
      </button>
      <p className="text-center text-text-muted text-sm">
        Déjà un compte ? <Link href="/connexion" className="text-primary hover:text-accent transition-colors cursor-pointer">Se connecter</Link>
      </p>
    </form>
  );
}
