import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import WorkshopList from "@/components/sections/WorkshopList";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Ateliers Foulée",
  description:
    "Prochaines dates des ateliers course à pied à Rochetaillée-sur-Saône. Inscription en ligne, tarif libre, groupes de 10-12 personnes. Analyse vidéo personnalisée.",
  openGraph: {
    title: "Ateliers Foulée | Aline Nebout",
    description:
      "Inscrivez-vous aux prochains ateliers d'optimisation de la foulée. Tarif libre, ouvert à tous.",
  },
};

function formatDayLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const dayName = days[date.getDay()];
  const dayNum = String(date.getDate()).padStart(2, "0");
  const monthName = months[date.getMonth()];
  return `${dayName} ${dayNum} ${monthName}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default async function AteliersPage() {
  const supabase = await createClient();

  const { data: rawWorkshops } = await supabase
    .from("workshops")
    .select("id, date, time_display, location, max_capacity, current_count, status")
    .in("status", ["upcoming", "full"])
    .order("date", { ascending: true });

  const workshops = (rawWorkshops ?? []).map((w) => ({
    id: w.id,
    date: formatDate(w.date),
    dayLabel: formatDayLabel(w.date),
    time: w.time_display ?? "18h20",
    location: w.location ?? "Esplanade de l\u2019écluse, Rochetaillée",
    spotsTotal: w.max_capacity ?? 12,
    spotsTaken: w.current_count ?? 0,
  }));

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Coaching Foulée", href: "/coaching" },
            { label: "Ateliers" },
          ]}
        />

        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Saison 2
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl text-text-dark mb-4">
              Prochains ateliers foulée
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Choisissez votre date et inscrivez-vous en quelques clics.
              Les places sont limitées à 12 participants par atelier.
            </p>
          </div>
        </ScrollReveal>

        {/* Workshop list */}
        <ScrollReveal delay={0.15}>
          <WorkshopList workshops={workshops} />
        </ScrollReveal>

        {/* Info reminder */}
        <ScrollReveal delay={0.25}>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-sm text-text-dark mb-1">Durée</h3>
              <p className="text-text-muted text-xs">~1h30 à 2h, rendez-vous à 18h20</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-sm text-text-dark mb-1">À prévoir</h3>
              <p className="text-text-muted text-xs">Chaussures de route, tenue de sport</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-sm text-text-dark mb-1">Tarif libre</h3>
              <p className="text-text-muted text-xs">Espèces, chèques ou Wero</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Back to coaching + contact */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-text-muted text-sm mb-6">
              Une question ? Contactez Aline au{" "}
              <a
                href="tel:0615973609"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 cursor-pointer"
              >
                06 15 97 36 09
              </a>
            </p>
            <Link
              href="/coaching"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Retour au coaching foulée
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
