import type { Metadata } from "next";
import { Varela_Round, Nunito_Sans } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import "./globals.css";

const varelaRound = Varela_Round({
  weight: "400",
  variable: "--font-varela-round",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aline Nebout — Ostéopathe D.O. & Réflexes Archaïques",
    template: "%s | Aline Nebout",
  },
  description:
    "Aline Nebout, ostéopathe D.O. spécialisée en ostéopathie douce, réflexes archaïques, femme enceinte, nourrisson et sportif. Cabinet au Pôle Santé de Rochetaillée-sur-Saône.",
  metadataBase: new URL("https://www.alinenebout-osteopathe.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Aline Nebout — Ostéopathe D.O.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${varelaRound.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-soft text-text-dark">
        <Navigation />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
