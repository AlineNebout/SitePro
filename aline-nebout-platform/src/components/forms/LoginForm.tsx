"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const redirectTo = searchParams?.get("redirect") || null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        // Generic error message — Property 6: don't reveal which field is wrong
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
        setLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role === "admin") {
          router.push(redirectTo || "/admin");
          router.refresh();
          return;
        }
      }

      // Regular user — go to redirect target or dashboard
      router.push(redirectTo || "/tableau-de-bord");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-text-dark mb-1.5">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="votre@email.com"
          className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 text-text-dark placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${error ? "border-red-300" : "border-primary-light/30 hover:border-primary-light"}`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="login-password" className="block text-sm font-medium text-text-dark">Mot de passe</label>
          <Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:text-accent transition-colors duration-200 cursor-pointer">Mot de passe oublié ?</Link>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="••••••••"
            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-white/80 text-text-dark placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${error ? "border-red-300" : "border-primary-light/30 hover:border-primary-light"}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Connexion…
          </>
        ) : (
          "Se connecter"
        )}
      </button>

      <p className="text-center text-sm text-text-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-primary font-semibold hover:text-accent transition-colors duration-200 cursor-pointer">Créer un compte</Link>
      </p>
    </form>
  );
}
