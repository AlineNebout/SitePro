"use client";

import { useState } from "react";
import Link from "next/link";

interface Practitioner {
  name: string;
  profession: string;
  description: string;
  slug: string;
  location?: string;
}

interface PractitionerFilterProps {
  practitioners: Practitioner[];
}

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "Ostéopathe", label: "Ostéopathe" },
  { key: "Orthophoniste", label: "Orthophoniste" },
  { key: "Infirmier", label: "Infirmier" },
  { key: "Sage-femme", label: "Sage-femme" },
  { key: "Éducatrice", label: "Éducatrice" },
];

const PROFESSION_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Ostéopathe": { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  "Orthophoniste": { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  "Infirmier": { bg: "bg-[#10B981]/10", text: "text-[#10B981]", dot: "bg-[#10B981]" },
  "Sage-femme": { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", dot: "bg-[#F59E0B]" },
  "Éducatrice": { bg: "bg-[#6366F1]/10", text: "text-[#6366F1]", dot: "bg-[#6366F1]" },
};

function getProfessionKey(profession: string): string {
  if (profession.includes("Ostéopathe")) return "Ostéopathe";
  if (profession.includes("Orthophoniste")) return "Orthophoniste";
  if (profession.includes("Infirmier") || profession.includes("Infirmière")) return "Infirmier";
  if (profession.includes("Sage-femme")) return "Sage-femme";
  if (profession.includes("Éducatrice")) return "Éducatrice";
  return "Ostéopathe";
}

export default function PractitionerFilter({ practitioners }: PractitionerFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? practitioners
      : practitioners.filter((p) => getProfessionKey(p.profession) === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeFilter === filter.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white/80 text-text-muted hover:bg-primary-light/20 hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Practitioner cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((practitioner) => {
          const profKey = getProfessionKey(practitioner.profession);
          const colors = PROFESSION_COLORS[profKey] ?? PROFESSION_COLORS["Ostéopathe"];

          return (
            <Link
              key={practitioner.slug}
              href={`/pole-sante/praticiens/${practitioner.slug}`}
              className="block group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col cursor-pointer">
                {/* Avatar placeholder */}
                <div
                  className="w-14 h-14 rounded-full bg-primary-light/30 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>

                {/* Profession badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium w-fit mb-3 ${colors.bg} ${colors.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {practitioner.profession}
                </span>

                <h3 className="font-heading text-lg text-text-dark mb-2 group-hover:text-primary transition-colors duration-200">
                  {practitioner.name}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {practitioner.description}
                </p>

                {practitioner.location && (
                  <p className="text-text-muted/70 text-xs mt-2 flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {practitioner.location}
                  </p>
                )}

                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 group-hover:gap-2 transition-all duration-200">
                  Voir le profil
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          Aucun praticien dans cette catégorie.
        </p>
      )}
    </div>
  );
}
