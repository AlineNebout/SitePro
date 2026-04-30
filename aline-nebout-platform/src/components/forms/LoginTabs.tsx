"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Tab = "patient" | "praticien" | "admin";

const TABS: { key: Tab; label: string; icon: React.ReactNode; description: string; color: string }[] = [
  {
    key: "patient",
    label: "Patient / Coaching",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    description: "Accédez à votre espace coaching, exercices et progression",
    color: "emerald",
  },
  {
    key: "praticien",
    label: "Praticien",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    description: "Gérez votre profil, articles et communauté du Pôle Santé",
    color: "accent",
  },
  {
    key: "admin",
    label: "Administration",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    description: "Panneau d'administration de la plateforme",
    color: "primary",
  },
];

const REDIRECT_MAP: Record<Tab, string> = {
  patient: "/tableau-de-bord",
  praticien: "/mon-profil",
  admin: "/admin",
};

const COLOR_MAP: Record<string, { tab: string; tabActive: string; btn: string }> = {
  emerald: {
    tab: "hover:bg-emerald-50 hover:text-emerald-700",
    tabActive: "bg-emerald-50 text-emerald-700 border-emerald-500",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20",
  },
  accent: {
    tab: "hover:bg-accent/10 hover:text-accent",
    tabActive: "bg-accent/10 text-accent border-accent",
    btn: "bg-accent hover:bg-accent-dark shadow-accent/20",
  },
  primary: {
    tab: "hover:bg-primary/10 hover:text-primary",
    tabActive: "bg-primary/10 text-primary border-primary",
    btn: "bg-primary hover:bg-accent shadow-primary/20",
  },
};

export default function LoginTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const redirectParam = searchParams?.get("redirect") || null;

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const colors = COLOR_MAP[currentTab.color];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Identifiants incorrects.");
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
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
        setLoading(false);
        return;
      }

      const destination = redirectParam || REDIRECT_MAP[activeTab];
      router.push(destination);
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const tabColors = COLOR_MAP[tab.color];
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => { setActiveTab(tab.key); setError(""); }}
              className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold border-2 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                isActive
                  ? tabColors.tabActive
                  : `border-transparent text-text-muted ${tabColors.tab}`
              }`}
            >
              {tab.icon}
              <span className="leading-tight text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-text-muted text-xs text-center mb-6">
        {currentTab.description}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark placeholder:text-text-muted/50 hover:border-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-text-dark mb-1.5">Mot de passe</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border-2 border-primary-light/30 bg-white/80 text-text-dark placeholder:text-text-muted/50 hover:border-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${colors.btn}`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Connexion…
            </>
          ) : (
            `Se connecter — ${currentTab.label}`
          )}
        </button>

        <div className="flex items-center justify-between text-xs text-text-muted pt-2">
          <Link href="/mot-de-passe-oublie" className="hover:text-primary transition-colors cursor-pointer">Mot de passe oublié ?</Link>
          {activeTab === "patient" && (
            <Link href="/inscription" className="text-primary font-semibold hover:text-accent transition-colors cursor-pointer">Créer un compte</Link>
          )}
        </div>
      </form>
    </div>
  );
}
