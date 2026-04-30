import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des témoignages",
  description: "Administration des témoignages et avis clients.",
};

const testimonials = [
  {
    id: 1,
    name: "Gaëlle",
    text: "Aline est une ostéopathe exceptionnelle. Elle a su identifier et traiter des tensions que je traînais depuis des années. Son approche globale et sa douceur font toute la différence.",
    service: "Ostéopathie",
    rating: 5,
    status: "publié",
  },
  {
    id: 2,
    name: "Malo",
    text: "Grâce au bilan des réflexes archaïques, mon fils a fait des progrès incroyables en quelques semaines. Il est plus concentré à l'école et beaucoup moins agité. Merci Aline !",
    service: "Réflexes Archaïques",
    rating: 5,
    status: "publié",
  },
  {
    id: 3,
    name: "Pierre",
    text: "En tant que traileur, l'analyse de foulée m'a permis de corriger des défauts que je compensais depuis des années. Résultat : moins de douleurs et de meilleures performances.",
    service: "Coaching Foulée",
    rating: 5,
    status: "publié",
  },
  {
    id: 4,
    name: "Hélène",
    text: "Suivi ostéopathique pendant toute ma grossesse. Aline est à l'écoute, douce et très compétente. Je recommande les yeux fermés pour les futures mamans.",
    service: "Ostéopathie",
    rating: 5,
    status: "publié",
  },
  {
    id: 5,
    name: "Loréline",
    text: "Ma fille avait des difficultés d'écriture et de concentration. Après le bilan et les exercices proposés par Aline, les progrès ont été rapides et durables.",
    service: "Réflexes Archaïques",
    rating: 5,
    status: "publié",
  },
  {
    id: 6,
    name: "Damien",
    text: "Consultation pour des douleurs lombaires chroniques. En deux séances, Aline a trouvé l'origine du problème. Approche professionnelle et résultats concrets.",
    service: "Ostéopathie",
    rating: 5,
    status: "masqué",
  },
];

const SERVICE_COLORS: Record<string, { bg: string; text: string }> = {
  "Ostéopathie": { bg: "bg-primary/10", text: "text-primary" },
  "Réflexes Archaïques": { bg: "bg-accent/10", text: "text-accent" },
  "Coaching Foulée": { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

export default function AdminTemoignagesPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-1">
            Gestion des témoignages
          </h1>
          <p className="text-text-muted text-sm">
            {testimonials.length} témoignages · {testimonials.filter((t) => t.status === "publié").length} publiés
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter un témoignage
        </button>
      </div>

      <div className="space-y-3">
        {testimonials.map((testimonial) => {
          const serviceColors = SERVICE_COLORS[testimonial.service] || { bg: "bg-primary/10", text: "text-primary" };
          return (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm text-text-dark">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${serviceColors.bg} ${serviceColors.text}`}>
                        {testimonial.service}
                      </span>
                      <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} étoiles sur 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                    testimonial.status === "publié"
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "bg-primary-light/20 text-text-muted"
                  }`}
                >
                  {testimonial.status === "publié" ? "Publié" : "Masqué"}
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed pl-13">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
