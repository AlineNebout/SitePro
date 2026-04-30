import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Aline Nebout, ostéopathe D.O. au Pôle Santé de Rochetaillée-sur-Saône. 324 quai Pierre Dupont. Rendez-vous en ligne sur Doctolib.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: "Contact" }]} />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Nous trouver
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Contact &amp; accès
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Le cabinet est situé au Pôle Santé de Rochetaillée-sur-Saône, facilement accessible
              en voiture et en transports en commun.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Info cards + Map */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Address */}
            <ScrollReveal>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-primary-light/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
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
                  </div>
                  <div>
                    <h2 className="font-heading text-lg text-text-dark mb-1">Adresse</h2>
                    <p className="text-text-muted">
                      324 quai Pierre Dupont
                      <br />
                      Pôle Santé de Rochetaillée-sur-Saône
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-primary-light/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg text-text-dark mb-1">Téléphone</h2>
                    <p className="text-text-muted">
                      Cabinet :{" "}
                      <a
                        href="tel:0478252862"
                        className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
                      >
                        04 78 25 28 62
                      </a>
                    </p>
                    <p className="text-text-muted">
                      Mobile :{" "}
                      <a
                        href="tel:0615973609"
                        className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
                      >
                        06 15 97 36 09
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Transport */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-primary-light/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h17.25M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v10.875m0 0h3.375c.621 0 1.125.504 1.125 1.125v2.25"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg text-text-dark mb-1">Accès</h2>
                    <ul className="text-text-muted space-y-1 text-sm">
                      <li>Bus Ligne 40 — arrêt Rochetaillée Centre</li>
                      <li>Bus Ligne 43 — arrêt Couzon</li>
                      <li>À 15 min de Lyon</li>
                      <li>À 5 min de Neuville-sur-Saône</li>
                      <li>Stationnement gratuit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* LinkedIn */}
            <ScrollReveal delay={0.3}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-primary-light/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg text-text-dark mb-1">Réseaux</h2>
                    <Link
                      href="https://www.linkedin.com/in/aline-nebout-8a53936b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
                    >
                      LinkedIn — Aline Nebout
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal direction="right">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm h-full min-h-[400px]">
              <iframe
                title="Localisation du cabinet d'Aline Nebout — Pôle Santé de Rochetaillée-sur-Saône"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5!2d4.845!3d45.8367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f49456e369d261%3A0xb1fd3596e1d1f0ea!2sAline%20Nebout%20Ost%C3%A9opathe!5e0!3m2!1sfr!2sfr!4v1"
                className="w-full h-full min-h-[400px] border-0 rounded-2xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
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
                Prendre rendez-vous
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Réservez votre consultation en ligne sur Doctolib, 24h/24. Pas besoin de passer par
                votre médecin traitant.
              </p>
              <DoctolibButton variant="primary" label="Prendre rendez-vous sur Doctolib" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
