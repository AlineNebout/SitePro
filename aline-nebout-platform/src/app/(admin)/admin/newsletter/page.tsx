import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abonnés newsletter",
  description: "Gestion des abonnés à la newsletter.",
};

const subscribers = [
  { id: 1, email: "marie.d@email.com", date: "12 mars 2025", source: "Footer" },
  { id: 2, email: "pierre.l@email.com", date: "10 mars 2025", source: "Blog" },
  { id: 3, email: "sophie.m@email.com", date: "8 mars 2025", source: "Footer" },
  { id: 4, email: "jean.b@email.com", date: "5 mars 2025", source: "Blog" },
  { id: 5, email: "claire.r@email.com", date: "1 mars 2025", source: "Footer" },
];

export default function AdminNewsletterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
          Abonnés newsletter
        </h1>
        <p className="text-text-muted text-sm">
          45 abonnés au total
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-primary/5 rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-text-dark">45</p>
          <p className="text-xs text-text-muted mt-1">Abonnés actifs</p>
        </div>
        <div className="bg-accent/5 rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-text-dark">+5</p>
          <p className="text-xs text-text-muted mt-1">Ce mois-ci</p>
        </div>
        <div className="bg-[#10B981]/5 rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-text-dark">68%</p>
          <p className="text-xs text-text-muted mt-1">Taux d&apos;ouverture</p>
        </div>
      </div>

      {/* Recent subscribers */}
      <div>
        <h2 className="font-heading text-lg text-text-dark mb-4">Derniers inscrits</h2>
        <div className="space-y-3">
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-sm text-text-dark truncate">{sub.email}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span>{sub.date}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs font-medium">
                  {sub.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-text-muted text-sm mt-8">
          Affichage des 5 derniers inscrits sur 45 abonnés
        </p>
      </div>
    </>
  );
}
