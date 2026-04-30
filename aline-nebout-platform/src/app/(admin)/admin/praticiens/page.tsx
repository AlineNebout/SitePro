import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des praticiens",
  description: "Administration des praticiens du Pôle Santé.",
};

const practitioners = [
  {
    id: 1,
    name: "Aline Nebout",
    specialty: "Ostéopathie, Réflexes Archaïques",
    status: "actif",
    email: "aline@example.com",
  },
  {
    id: 2,
    name: "Dr. Sophie Martin",
    specialty: "Médecine générale",
    status: "actif",
    email: "sophie@example.com",
  },
  {
    id: 3,
    name: "Claire Dupont",
    specialty: "Kinésithérapie",
    status: "actif",
    email: "claire@example.com",
  },
  {
    id: 4,
    name: "Marc Lefèvre",
    specialty: "Podologie",
    status: "actif",
    email: "marc@example.com",
  },
  {
    id: 5,
    name: "Julie Moreau",
    specialty: "Psychologie",
    status: "actif",
    email: "julie@example.com",
  },
  {
    id: 6,
    name: "Thomas Bernard",
    specialty: "Diététique",
    status: "en attente",
    email: "thomas@example.com",
  },
];

export default function AdminPraticiensPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des praticiens
          </h1>
          <p className="text-text-muted text-sm">
            {practitioners.length} praticiens au Pôle Santé
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Inviter un praticien
        </button>
      </div>

      <div className="space-y-3">
        {practitioners.map((practitioner) => (
          <div
            key={practitioner.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">
                  {practitioner.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-sm text-text-dark truncate">
                  {practitioner.name}
                </h3>
                <p className="text-xs text-text-muted truncate">{practitioner.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted hidden sm:inline">{practitioner.email}</span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  practitioner.status === "actif"
                    ? "bg-[#10B981]/10 text-[#10B981]"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {practitioner.status === "actif" ? "Actif" : "En attente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
