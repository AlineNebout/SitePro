"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Universe = "osteopathie" | "reflexes" | "coaching" | "pole-sante" | null;

const universeLinks = [
  { href: "/osteopathie", label: "Ostéopathie", universe: "osteopathie" as Universe },
  { href: "/reflexes", label: "Réflexes Archaïques", universe: "reflexes" as Universe },
  { href: "/coaching", label: "Coaching Foulée", universe: "coaching" as Universe },
  { href: "/pole-sante", label: "Pôle Santé", universe: "pole-sante" as Universe },
];

const sharedLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/communaute", label: "Communauté" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const currentUniverse: Universe =
    universeLinks.find((l) => pathname.startsWith(l.href))?.universe ?? null;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md rounded-2xl shadow-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-colors duration-200"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-lg text-primary font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg px-1"
        >
          Aline Nebout
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden cursor-pointer p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Ouvrir le menu"
        >
          <svg className="w-6 h-6 text-text-dark" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {universeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  currentUniverse === link.universe
                    ? "text-primary bg-primary/10"
                    : "hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {sharedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-1.5 rounded-lg hover:text-primary transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ml-2"
            >
              Prendre RDV
            </Link>
          </li>
          <li>
            <Link
              href="/connexion"
              className="border-2 border-primary/30 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none text-sm font-medium"
            >
              Se connecter
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-lg font-medium"
          role="dialog"
          aria-label="Menu de navigation"
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 cursor-pointer p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            aria-label="Fermer le menu"
          >
            <svg className="w-6 h-6 text-text-dark" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {universeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors duration-200 cursor-pointer ${
                currentUniverse === link.universe ? "text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          {sharedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition-colors duration-200 cursor-pointer"
          >
            Prendre RDV
          </Link>
          <Link
            href="/connexion"
            className="border-2 border-primary/30 text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Se connecter
          </Link>
      )}
    </>
  );
}
