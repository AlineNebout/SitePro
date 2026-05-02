"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsentStatus } from "@/lib/analytics";

const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";

export default function Analytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const consent = getConsentStatus();
    if (consent === "accepted") {
      setShouldLoad(true);
    }

    // Listen for consent changes (user clicks accept after page load)
    function handleStorage(e: StorageEvent) {
      if (e.key === "cookie-consent" && e.newValue === "accepted") {
        setShouldLoad(true);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Also re-check on every render cycle in case consent was set in the same tab
  useEffect(() => {
    const interval = setInterval(() => {
      const consent = getConsentStatus();
      if (consent === "accepted") {
        setShouldLoad(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!shouldLoad || !websiteId) return null;

  return (
    <Script
      src={UMAMI_SCRIPT_URL}
      data-website-id={websiteId}
      strategy="lazyOnload"
      async
    />
  );
}
