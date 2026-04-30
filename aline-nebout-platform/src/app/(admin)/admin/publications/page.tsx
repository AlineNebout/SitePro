import { Metadata } from "next";
import ScrollReveal from "@/components/animation/ScrollReveal";
import PublicationEditor from "@/components/admin/PublicationEditor";

export const metadata: Metadata = {
  title: "Publications réseaux sociaux",
  description:
    "Calendrier éditorial pour planifier et publier vos contenus sur les réseaux sociaux.",
};

const plannedPosts = [
  {
    id: 1,
    text: "Saviez-vous que les réflexes archaïques peuvent impacter la concentration de votre enfant ?",
    network: "Facebook" as const,
    date: "5 mai",
    day: 5,
    status: "publié" as const,
  },
  {
    id: 2,
    text: "Nouveau : les ateliers foulée saison 2 sont ouverts ! +80 coureurs nous ont fait confiance en saison 1.",
    network: "Instagram" as const,
    date: "8 mai",
    day: 8,
    status: "planifié" as const,
  },
  {
    id: 3,
    text: "L'ostéopathie pendant la grossesse : 3 moments clés pour consulter",
    network: "LinkedIn" as const,
    date: "12 mai",
    day: 12,
    status: "brouillon" as const,
  },
  {
    id: 4,
    text: "Témoignage : 'Un bébé transformé grâce à Aline' — Hélène",
    network: "Facebook" as const,
    date: "15 mai",
    day: 15,
    status: "planifié" as const,
  },
  {
    id: 5,
    text: "Comment optimiser votre foulée ? Nos 5 conseils d'ostéopathe et traileuse",
    network: "Instagram" as const,
    date: "20 mai",
    day: 20,
    status: "brouillon" as const,
  },
  {
    id: 6,
    text: "Le Pôle Santé de Rochetaillée recrute ! Espaces de consultation disponibles.",
    network: "LinkedIn" as const,
    date: "25 mai",
    day: 25,
    status: "brouillon" as const,
  },
];

const NETWORK_COLORS: Record<string, { bg: string; text: string }> = {
  Facebook: { bg: "bg-[#1877F2]/10", text: "text-[#1877F2]" },
  Instagram: { bg: "bg-[#E4405F]/10", text: "text-[#E4405F]" },
  LinkedIn: { bg: "bg-[#0A66C2]/10", text: "text-[#0A66C2]" },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  publié: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Publié" },
  planifié: { bg: "bg-[#3B82F6]/10", text: "text-[#3B82F6]", label: "Planifié" },
  brouillon: { bg: "bg-primary-light/20", text: "text-text-muted", label: "Brouillon" },
};

const templates = [
  {
    category: "Ostéopathie",
    template:
      "Saviez-vous que [fait ostéo] ? Prenez soin de votre corps. RDV sur [lien]",
    color: "primary",
  },
  {
    category: "Réflexes Archaïques",
    template:
      "Votre enfant [signe]. Et si c'était lié aux réflexes archaïques ? Faites le test : [lien]",
    color: "accent",
  },
  {
    category: "Coaching Foulée",
    template:
      "Prochains ateliers foulée : [dates]. Tarif libre, ouvert à tous ! Inscription : [lien]",
    color: "emerald",
  },
  {
    category: "Témoignage",
    template:
      "'[citation]' — [prénom]. Merci pour votre confiance ! RDV : [lien]",
    color: "amber",
  },
];

const TEMPLATE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/5", text: "text-primary", border: "border-primary/15" },
  accent: { bg: "bg-accent/5", text: "text-accent", border: "border-accent/15" },
  emerald: { bg: "bg-[#059669]/5", text: "text-[#059669]", border: "border-[#059669]/15" },
  amber: { bg: "bg-[#D97706]/5", text: "text-[#D97706]", border: "border-[#D97706]/15" },
};

/* Calendar helpers */
const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getMayCalendar() {
  // May 2025: starts on Thursday (index 3 in Mon-based week)
  const daysInMonth = 31;
  const startDayOfWeek = 3; // 0=Mon … 6=Sun → Thursday=3
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function AdminPublicationsPage() {
  const calendarCells = getMayCalendar();
  const postsByDay = new Map<number, typeof plannedPosts>();
  for (const post of plannedPosts) {
    const existing = postsByDay.get(post.day) || [];
    existing.push(post);
    postsByDay.set(post.day, existing);
  }

  return (
    <>
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
              Calendrier éditorial
            </h1>
            <p className="text-text-muted text-sm">
              Planifiez et publiez vos contenus sur les réseaux sociaux
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://buffer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary/15 text-sm font-semibold text-text-dark hover:bg-primary/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.813a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.25"
                />
              </svg>
              Connecter Buffer
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Nouvelle publication
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Calendar view */}
      <ScrollReveal delay={0.1}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-sm p-4 sm:p-6 mb-8 overflow-x-auto">
          <h2 className="font-heading text-lg text-text-dark mb-4">
            Mai 2025
          </h2>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1 min-w-[640px]">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-text-muted py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 min-w-[640px]">
            {calendarCells.map((day, i) => {
              const posts = day ? postsByDay.get(day) : undefined;
              return (
                <div
                  key={i}
                  className={`min-h-[90px] rounded-xl p-1.5 text-xs transition-colors duration-150 ${
                    day
                      ? "bg-bg-soft/60 hover:bg-primary/5"
                      : "bg-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <span className="block font-semibold text-text-dark mb-1 pl-1">
                        {day}
                      </span>
                      {posts?.map((post) => {
                        const netColor = NETWORK_COLORS[post.network];
                        const statusStyle = STATUS_STYLES[post.status];
                        return (
                          <div
                            key={post.id}
                            className="bg-white/90 rounded-lg p-1.5 mb-1 border border-primary/5 cursor-pointer hover:shadow-sm transition-shadow duration-150"
                          >
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${netColor.bg} ${netColor.text} mb-0.5`}
                            >
                              {post.network}
                            </span>
                            <p className="text-[11px] text-text-dark leading-tight line-clamp-2">
                              {post.text}
                            </p>
                            <span
                              className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}
                            >
                              {statusStyle.label}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Post cards list (mobile-friendly) */}
      <ScrollReveal delay={0.15}>
        <h2 className="font-heading text-lg text-text-dark mb-4">
          Publications planifiées
        </h2>
        <div className="space-y-3 mb-12">
          {plannedPosts.map((post) => {
            const netColor = NETWORK_COLORS[post.network];
            const statusStyle = STATUS_STYLES[post.status];
            return (
              <div
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-dark mb-1.5 line-clamp-2">
                    {post.text}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${netColor.bg} ${netColor.text}`}
                    >
                      {post.network}
                    </span>
                    <span className="text-xs text-text-muted">
                      {post.date}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${statusStyle.bg} ${statusStyle.text}`}
                >
                  {statusStyle.label}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Publication Editor */}
      <ScrollReveal delay={0.2}>
        <div className="mb-12">
          <h2 className="font-heading text-lg text-text-dark mb-4">
            Nouvelle publication
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-sm p-5 sm:p-6">
            <PublicationEditor />
          </div>
        </div>
      </ScrollReveal>

      {/* Templates section */}
      <ScrollReveal delay={0.25}>
        <div>
          <h2 className="font-heading text-lg text-text-dark mb-1">
            Templates de publications
          </h2>
          <p className="text-text-muted text-sm mb-6">
            Utilisez un modèle pour créer rapidement une publication
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {templates.map((tpl) => {
              const colors = TEMPLATE_COLORS[tpl.color];
              return (
                <div
                  key={tpl.category}
                  className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 flex flex-col`}
                >
                  <h3
                    className={`font-heading text-sm ${colors.text} mb-2`}
                  >
                    {tpl.category}
                  </h3>
                  <p className="text-xs text-text-dark leading-relaxed flex-1 mb-4">
                    {tpl.template}
                  </p>
                  <button
                    type="button"
                    className={`self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold ${colors.text} bg-white/70 hover:bg-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                    Utiliser ce template
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
