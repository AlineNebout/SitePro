import { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animation/ScrollReveal";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ReflexesHero from "@/components/sections/ReflexesHero";

export const metadata: Metadata = {
  title: "Réflexes Archaïques",
  description:
    "Intégration des réflexes archaïques à Rochetaillée-sur-Saône. Bilan et accompagnement pour enfants et adultes : difficultés scolaires, concentration, coordination, émotions. Aline Nebout.",
  openGraph: {
    title: "Réflexes Archaïques | Aline Nebout",
    description:
      "Intégration des réflexes archaïques pour enfants et adultes. Bilan personnalisé et programme d'exercices.",
  },
};

const spheres = [
  {
    id: "motor",
    title: "Sphère motrice",
    color: "primary",
    dotColor: "bg-primary",
    borderColor: "border-primary/20",
    bgColor: "bg-primary/5",
    description:
      "Les réflexes non intégrés peuvent perturber la coordination, l'équilibre et la motricité fine. L'enfant peut paraître maladroit, avoir du mal à tenir son stylo ou se fatiguer rapidement à l'écriture.",
    signs: [
      "Maladresse, chutes fréquentes",
      "Difficultés d'écriture et de motricité fine",
      "Mal à tenir son stylo correctement",
      "Marche sur la pointe des pieds",
      "Difficultés de coordination (sport, vélo)",
      "Posture avachie, se tortille sur sa chaise",
    ],
  },
  {
    id: "emotional",
    title: "Sphère émotionnelle",
    color: "accent",
    dotColor: "bg-accent",
    borderColor: "border-accent/20",
    bgColor: "bg-accent/5",
    description:
      "Certains réflexes persistants maintiennent le système nerveux en état d'alerte. L'enfant peut être hypersensible, avoir des difficultés à gérer ses émotions ou présenter des réactions disproportionnées.",
    signs: [
      "Hypersensibilité au bruit, au toucher",
      "Difficultés à gérer ses émotions",
      "Sauts d'humeur, crises de colère",
      "Anxiété, peurs inexpliquées",
      "Troubles du sommeil",
      "Énurésie (pipi au lit)",
    ],
  },
  {
    id: "cognitive",
    title: "Sphère cognitive",
    color: "[#10B981]",
    dotColor: "bg-[#10B981]",
    borderColor: "border-[#10B981]/20",
    bgColor: "bg-[#10B981]/5",
    description:
      "Les réflexes archaïques non intégrés peuvent impacter la concentration, la mémoire et les apprentissages. L'enfant mobilise une énergie considérable pour compenser, ce qui le fatigue et réduit ses capacités d'attention.",
    signs: [
      "Difficultés de concentration",
      "Agitation, hyperactivité",
      "Difficultés de lecture",
      "Difficultés en mathématiques et repérage spatial",
      "Fatigue scolaire importante",
      "Sélectivité alimentaire",
    ],
  },
];

const processSteps = [
  {
    step: "1",
    title: "Bilan initial",
    description:
      "Évaluation complète des réflexes archaïques pour identifier ceux qui ne sont pas intégrés et comprendre leur impact sur le quotidien.",
  },
  {
    step: "2",
    title: "Séance d'intégration",
    description:
      "Travail corporel doux et spécifique pour stimuler l'intégration des réflexes identifiés. Techniques adaptées à l'âge et aux besoins.",
  },
  {
    step: "3",
    title: "Exercices maison",
    description:
      "Programme d'exercices simples à réaliser à la maison, quelques minutes par jour, pour prolonger le travail entre les séances.",
  },
  {
    step: "4",
    title: "Suivi à 6 semaines",
    description:
      "Réévaluation des progrès et ajustement du programme. Le rythme des séances est adapté à l'évolution de chaque patient.",
  },
];

const parentSigns = [
  "Se tortille sur sa chaise en classe",
  "A du mal à se concentrer",
  "Est maladroit ou tombe souvent",
  "A des difficultés d'écriture",
  "Est hypersensible au bruit ou au toucher",
  "A du mal à gérer ses émotions",
];

export default function ReflexesPage() {
  return (
    <>
      <ReflexesHero />

      {/* Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Comprendre les réflexes
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark mb-6">
              Qu&apos;est-ce qu&apos;un réflexe archaïque ?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-muted text-lg leading-relaxed mb-4">
              Les réflexes archaïques (ou primitifs) sont des mouvements automatiques et
              involontaires qui apparaissent dès la vie intra-utérine. Ils jouent un rôle
              fondamental dans le développement neurologique du bébé : ils l&apos;aident à naître,
              à s&apos;alimenter, à se protéger et à explorer son environnement.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-text-muted text-lg leading-relaxed">
              Normalement, ces réflexes s&apos;intègrent progressivement au cours de la première
              année de vie pour laisser place à des mouvements volontaires et coordonnés.
              Lorsqu&apos;ils persistent au-delà de cette période, ils peuvent perturber le
              développement moteur, émotionnel et cognitif, chez l&apos;enfant comme chez
              l&apos;adulte.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Three Spheres */}
      <section id="spheres" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Les 3 sphères du développement
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">
              Moteur, émotionnel, cognitif
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {spheres.map((sphere, i) => (
              <ScrollReveal key={sphere.id} delay={i * 0.15}>
                <div
                  className={`${sphere.bgColor} border-2 ${sphere.borderColor} rounded-2xl p-8 h-full`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${sphere.dotColor}`} />
                    <h3 className="font-heading text-xl text-text-dark">{sphere.title}</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {sphere.description}
                  </p>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted/70 mb-3">
                    Signes fréquents
                  </h4>
                  <ul className="space-y-2">
                    {sphere.signs.map((sign) => (
                      <li key={sign} className="flex items-start gap-2 text-text-dark text-sm">
                        <svg
                          className={`w-4 h-4 mt-0.5 shrink-0 text-${sphere.color}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Le parcours
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">
              Comment se déroule l&apos;accompagnement ?
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-accent font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-heading text-lg text-text-dark mb-2">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Informations pratiques
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-dark">Tarif</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <h3 className="font-heading text-lg mb-2">Bilan &amp; intégration des réflexes</h3>
              <p className="text-4xl font-bold text-primary mb-2">
                65<span className="text-lg font-normal text-text-muted">€</span>
              </p>
              <p className="text-text-muted text-sm">Séance d&apos;environ 45 minutes</p>
              <p className="text-text-muted text-xs mt-2">
                Remboursement possible par votre mutuelle
              </p>
              <div className="mt-6">
                <DoctolibButton variant="primary" label="Prendre rendez-vous" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Parent CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 rounded-2xl p-8 sm:p-12">
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                  Votre enfant a des difficultés à l&apos;école ?
                </h2>
                <p className="text-text-muted mb-6">
                  Certains signes du quotidien peuvent indiquer des réflexes archaïques non
                  intégrés :
                </p>
                <ul className="space-y-2 mb-8">
                  {parentSigns.map((sign) => (
                    <li key={sign} className="flex items-center gap-3 text-text-dark text-sm">
                      <svg
                        className="w-5 h-5 text-primary shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/reflexes/parents"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  Faire le test en ligne
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Schools CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-accent/5 to-[#10B981]/5 border-2 border-accent/10 rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Écoles &amp; Professionnels
              </h2>
              <p className="text-text-muted max-w-lg mx-auto mb-8">
                Aline intervient dans les établissements scolaires pour des sessions
                d&apos;information, des ateliers pour le personnel et des dépistages auprès des
                élèves.
              </p>
              <Link
                href="/reflexes/ecoles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark shadow-lg shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                En savoir plus
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-text-dark mb-4">
                Prendre rendez-vous
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Réservez votre bilan des réflexes archaïques en ligne sur Doctolib.
              </p>
              <DoctolibButton variant="primary" label="Prendre rendez-vous sur Doctolib" />
              <p className="text-text-muted text-xs mt-6">
                Aline Nebout — Réflexes archaïques depuis 2024
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
