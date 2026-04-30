import { Metadata } from "next";
import QRCodeGenerator from "@/components/admin/QRCodeGenerator";

export const metadata: Metadata = {
  title: "QR Codes & Affichettes",
  description:
    "Générez des QR codes pour vos supports de communication : site, Doctolib, Google Maps, pages spécifiques.",
};

const BASE_URL = "https://www.aline-nebout.fr";

interface QRTarget {
  name: string;
  url: string;
  description: string;
}

const qrTargets: QRTarget[] = [
  {
    name: "Site principal",
    url: "/",
    description: "Page d'accueil du site",
  },
  {
    name: "Ostéopathie",
    url: "/osteopathie",
    description: "Landing page ostéopathie",
  },
  {
    name: "Réflexes Archaïques",
    url: "/reflexes",
    description: "Landing page réflexes archaïques",
  },
  {
    name: "Test parents",
    url: "/reflexes/parents",
    description: "Auto-évaluation pour les parents",
  },
  {
    name: "Coaching Foulée",
    url: "/coaching",
    description: "Landing page coaching",
  },
  {
    name: "Ateliers Foulée",
    url: "/coaching/ateliers",
    description: "Inscription aux ateliers",
  },
  {
    name: "Pôle Santé",
    url: "/pole-sante",
    description: "Annuaire du Pôle Santé",
  },
  {
    name: "Doctolib",
    url: "https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout",
    description: "Prise de rendez-vous",
  },
  {
    name: "Google Maps",
    url: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47f49456e369d261:0xb1fd3596e1d1f0ea",
    description: "Localisation du cabinet",
  },
];

function getFullUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url}`;
}

function getQRImageUrl(url: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(getFullUrl(url))}`;
}

function getQRDownloadUrl(url: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&download=1&data=${encodeURIComponent(getFullUrl(url))}`;
}

export default function QRCodesPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
          QR Codes &amp; Affichettes
        </h1>
        <p className="text-text-muted text-sm">
          Générez des QR codes pour vos supports de communication
        </p>
      </div>

      {/* Pre-configured QR codes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {qrTargets.map((target) => (
          <div
            key={target.url}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col items-center text-center"
          >
            {/* QR code image */}
            <div className="bg-white rounded-xl p-3 shadow-sm mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getQRImageUrl(target.url)}
                alt={`QR code pour ${target.name}`}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>

            {/* Info */}
            <h3 className="font-heading text-lg text-text-dark mb-1">
              {target.name}
            </h3>
            <p className="text-text-muted text-xs mb-1 break-all">
              {target.url.startsWith("http") ? target.url : `${BASE_URL}${target.url}`}
            </p>
            <p className="text-text-muted/70 text-sm mb-4">
              {target.description}
            </p>

            {/* Download button */}
            <a
              href={getQRDownloadUrl(target.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none mt-auto"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3"
                />
              </svg>
              Télécharger
            </a>
          </div>
        ))}
      </div>

      {/* Custom QR code section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="font-heading text-xl text-text-dark mb-2">
            QR code personnalisé
          </h2>
          <p className="text-text-muted text-sm">
            Entrez n&apos;importe quelle URL pour générer un QR code sur mesure.
          </p>
        </div>
        <QRCodeGenerator />
      </div>
    </>
  );
}
