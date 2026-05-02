"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie-consent";

export type ConsentStatus = "accepted" | "rejected" | null;

/** Read the current cookie consent status from localStorage. */
export function getCookieConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_KEY);
  if (value === "accepted") return "accepted";
  if (value === "rejected") return "rejected";
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-primary/10"
      role="dialog"
      aria-label="Consentement aux cookies"
    >
      <div className="flex-1">
        <p className="text-sm text-text-dark leading-relaxed">
          Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic.{" "}
          <Link
            href="/politique-confidentialite"
            className="text-primary hover:text-accent transition-colors duration-200 underline cursor-pointer"
          >
            En savoir plus
          </Link>
        </p>
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <button
          onClick={handleReject}
          className="px-4 py-2 text-sm font-medium text-text-muted border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Refuser
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
