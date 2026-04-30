import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import DoctolibButton from "@/components/booking/DoctolibButton";
import SelfAssessmentChecklist from "@/components/forms/SelfAssessmentChecklist";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Parents — Réflexes Archaïques",
  description:
    "Votre enfant a des difficultés à l'école ? Faites le test en ligne pour identifier les signes de réflexes archaïques non intégrés. Bilan et accompagnement par Aline Nebout.",
  openGraph: {
    title: "Parents — Réflexes Archaïques | Aline Nebout",
    description:
      "Test en ligne : identifiez les signes de réflexes archaïques non intégrés chez votre enfant.",
  },
};

const checklistItems = [
  { id: "chaise", label: "Se tortille sur sa chaise" },
  { id: "stylo", label: "A du mal à tenir son stylo" },
  { id: "bruit", label: "Hypersensible au bruit" },
  { id: "emotions", label: "Difficultés à gérer ses émotions" },
  { id: "maladroit", label: "Maladroit(e)" },
  { id: "tombe", label: "Tombe souvent" },
  { id: "concentration", label: "Difficultés de concentration" },
  { id: "agite", label: "Agité(e) / hyperactif(ve)" },
  { id: "ecriture", label: "Difficultés d'écriture" },
  { id: "pointe", label: "Marche sur la pointe des pieds" },
  { id: "transport", label: "Mal des transports" },
  { id: "enuresie", label: "Énurésie (pipi au lit)" },
  { id: "sommeil", label: "Troubles du sommeil" },
  { id: "coordination", label: "Difficultés de coordination" },
  { id: "alimentaire", label: "Sélectivité alimentaire" },
];

export default function ParentsPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Réflexes Archaïques", href: "/reflexes" },
              { label: "Parents" },
            ]}
          />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Espace parents
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Votre enfant a des difficultés ?
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Certains comportements du quotidien peuvent être le signe de réflexes archaïques non
              intégrés. Ce test rapide vous aide à identifier les signes les plus courants.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Self-assessment checklist */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-2">
                Test d&apos;auto-évaluation
              </h2>
              <p className="text-text-muted text-sm mb-6">
                Ce test ne remplace pas un bilan professionnel mais peut vous aider à identifier si
                une consultation serait bénéfique.
              </p>
              <SelfAssessmentChecklist items={checklistItems} threshold={3} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Understanding section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-white/50 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-6 text-center">
              Pourquoi ces difficultés ?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-text-dark mb-2">Ce n&apos;est pas un manque de volonté</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Quand un réflexe archaïque persiste, le corps de l&apos;enfant doit compenser en
                  permanence. Il dépense une énergie considérable pour des gestes qui devraient être
                  automatiques, ce qui le fatigue et réduit ses capacités d&apos;attention.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-text-dark mb-2">Une solution douce et efficace</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  L&apos;intégration des réflexes archaïques est une approche non invasive qui
                  utilise des mouvements doux et rythmiques. Les résultats sont souvent visibles en
                  quelques semaines, avec des exercices simples à faire à la maison.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lead capture — PDF guide */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 rounded-2xl p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-2xl text-text-dark mb-3">
                    Guide gratuit pour les parents
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    Recevez notre guide PDF &laquo;&nbsp;Comprendre les réflexes archaïques&nbsp;&raquo;
                    avec des exercices simples à faire à la maison.
                  </p>
                  <ul className="space-y-2 text-sm text-text-muted">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Les 6 réflexes les plus courants
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Comment les repérer au quotidien
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      3 exercices à faire à la maison
                    </li>
                  </ul>
                </div>
                <div>
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Prendre rendez-vous pour un bilan
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Le bilan des réflexes archaïques dure environ 45 minutes. Il permet d&apos;identifier
                les réflexes non intégrés et de proposer un programme personnalisé.
              </p>
              <DoctolibButton variant="primary" label="Prendre rendez-vous sur Doctolib" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
