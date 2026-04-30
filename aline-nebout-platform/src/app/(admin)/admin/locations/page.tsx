import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des locations",
  description: "Administration des espaces de location du Pôle Santé.",
};

const spaces = [
  {
    id: 1,
    name: "Bureau A",
    status: "occupé",
    tenant: "Marion Grosdemange",
    profession: "Psychomotricienne",
    since: "Septembre 2024",
  },
  {
    id: 2,
    name: "Bureau B",
    status: "disponible",
    tenant: null,
    profession: null,
    since: null,
  },
];

const inquiries = [
  {
    id: 1,
    name: "Camille Renard",
    profession: "Sage-femme",
    date: "10 mars 2025",
    message: "Intéressée par un bureau à temps partiel (2 jours/semaine).",
    status: "nouveau",
  },
  {
    id: 2,
    name: "Julien Fabre",
    profession: "Psychologue",
    date: "5 mars 2025",
    message: "Recherche un espace de consultation pour démarrer une activité libérale.",
    status: "contacté",
  },
  {
    id: 3,
    name: "Nathalie Blanc",
    profession: "Diététicienne",
    date: "28 février 2025",
    message: "Souhaite intégrer le Pôle Santé à partir de septembre 2025.",
    status: "confirmé",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  nouveau: { bg: "bg-accent/10", text: "text-accent", label: "Nouveau" },
  contacté: { bg: "bg-primary/10", text: "text-primary", label: "Contacté" },
  confirmé: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Confirmé" },
};

export default function AdminLocationsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
          Gestion des locations
        </h1>
        <p className="text-text-muted text-sm">
          {spaces.length} espaces · {inquiries.length} demandes en cours
        </p>
      </div>

      {/* Rental spaces */}
      <h2 className="font-heading text-lg text-text-dark mb-4">Espaces de location</h2>
      <div className="space-y-3 mb-10">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-sm text-text-dark">{space.name}</h3>
                {space.tenant ? (
                  <p className="text-xs text-text-muted truncate">
                    {space.tenant} — {space.profession} · Depuis {space.since}
                  </p>
                ) : (
                  <p className="text-xs text-text-muted">Aucun locataire</p>
                )}
              </div>
            </div>

            <span
              className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                space.status === "occupé"
                  ? "bg-[#10B981]/10 text-[#10B981]"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {space.status === "occupé" ? "Occupé" : "Disponible"}
            </span>
          </div>
        ))}
      </div>

      {/* Rental inquiries */}
      <h2 className="font-heading text-lg text-text-dark mb-4">Demandes de location</h2>
      <div className="space-y-3">
        {inquiries.map((inquiry) => {
          const statusStyle = STATUS_COLORS[inquiry.status];
          return (
            <div
              key={inquiry.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {inquiry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm text-text-dark">{inquiry.name}</h3>
                    <p className="text-xs text-text-muted">{inquiry.profession} · {inquiry.date}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${statusStyle.bg} ${statusStyle.text}`}
                >
                  {statusStyle.label}
                </span>
              </div>
              <p className="text-sm text-text-muted mt-3 ml-13 sm:ml-13">
                {inquiry.message}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
