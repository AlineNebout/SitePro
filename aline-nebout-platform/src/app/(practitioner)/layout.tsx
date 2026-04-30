"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  {
    href: "/mon-profil",
    label: "Mon profil",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/mes-articles",
    label: "Mes articles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    href: "/communaute",
    label: "Communauté",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function PractitionerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // TODO: Replace with actual user data from Supabase auth
  const userName = "Dr. Marion Grosdemange";

  return (
    <div className="min-h-screen bg-bg-soft">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-white/80 backdrop-blur-md border-r border-accent/10 z-30">
        {/* Logo / Brand */}
        <div className="p-6 border-b border-accent/10">
          <Link
            href="/"
            className="font-heading text-lg text-primary cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
          >
            Aline Nebout
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-semibold">
              Praticien
            </span>
          </div>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-dark truncate">
                {userName}
              </p>
              <p className="text-xs text-text-muted">Praticien</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4" aria-label="Navigation praticien">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-text-muted hover:bg-accent/5 hover:text-accent"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to site + Logout */}
        <div className="p-4 border-t border-accent/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-accent/5 hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Retour au site
          </Link>
          <button
            type="button"
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="md:pl-64">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-accent/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-heading text-base text-primary cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
            >
              Aline Nebout
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-semibold">
              Praticien
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted truncate max-w-[120px]">{userName}</span>
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-accent/10 px-2 py-2"
        aria-label="Navigation praticien mobile"
      >
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted hover:text-accent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          {/* Mobile logout */}
          <li>
            <button
              type="button"
              onClick={() => {
                // TODO: Supabase signOut then redirect to /connexion
              }}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium text-text-muted hover:text-red-600 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span>Quitter</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
