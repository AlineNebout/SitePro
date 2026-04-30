import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gestion des ateliers",
  description: "Administration des ateliers coaching foulée.",
};

const workshops = [
  {
    id: 1,
    title: "Atelier Découverte Foulée",
    date: "22 mars 2025",
    location: "Parc de la Tête d'Or, Lyon",
    registrants: 8,
    maxRegistrants: 12,
    status: "ouvert",
  },
  {
    id: 2,
    title: "Stage Trail Préparation",
    date: "5 avril 2025",
    location: "Mont d'Or, Poleymieux",
    registrants: 15,
    maxRegistrants: 15,
    status: "complet",
  },
  {
    id: 3,
    title: "Atelier Technique de Descente",
    date: "19 avril 2025",
    location: "Monts du Lyonnais",
    registrants: 3,
    maxRegistrants: 10,
    status: "ouvert",
  },
];

export default function AdminAteliersPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des ateliers
          </h1>
          <p className="text-text-muted text-sm">
            {workshops.length} ateliers programmés
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Créer un atelier
        </button>
      </div>

      <div className="space-y-4">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base text-text-dark mb-1 truncate">
                {workshop.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {workshop.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {workshop.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-text-dark">
                  {workshop.registrants}/{workshop.maxRegistrants}
                </p>
                <p className="text-xs text-text-muted">inscrits</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                  workshop.status === "complet"
                    ? "bg-accent/10 text-accent"
                    : "bg-[#10B981]/10 text-[#10B981]"
                }`}
              >
                {workshop.status === "complet" ? "Complet" : "Ouvert"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
