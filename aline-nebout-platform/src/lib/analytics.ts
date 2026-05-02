import { getCookieConsent, type ConsentStatus } from "@/components/layout/CookieConsent";

/**
 * Returns the current cookie consent status.
 * - "accepted": user accepted cookies — analytics may load
 * - "rejected": user rejected cookies — analytics must NOT load
 * - null: user has not yet made a choice — analytics must NOT load
 */
export function getConsentStatus(): ConsentStatus {
  return getCookieConsent();
}
