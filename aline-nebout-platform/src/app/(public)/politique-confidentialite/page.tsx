import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site d'Aline Nebout, ostéopathe D.O. Conformité RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: "Politique de confidentialité" }]} />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-text-muted text-sm">
              Dernière mise à jour : janvier 2025
            </p>
            <p className="text-text-muted leading-relaxed mt-4">
              Aline Nebout, ostéopathe D.O., s&apos;engage à protéger la vie privée des
              utilisateurs de son site internet, conformément au Règlement Général sur la Protection
              des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du
              6 janvier 1978 modifiée.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Données collectées */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Données collectées
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Dans le cadre de l&apos;utilisation du site, les données personnelles suivantes
                peuvent être collectées :
              </p>
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-text-dark mb-2">Formulaire de contact</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Nom, prénom, adresse e-mail, numéro de téléphone (facultatif), objet et contenu
                    du message. Ces données sont nécessaires pour répondre à votre demande.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-text-dark mb-2">Newsletter</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Adresse e-mail. Cette donnée est collectée avec votre consentement explicite pour
                    l&apos;envoi d&apos;informations sur l&apos;ostéopathie, les réflexes archaïques
                    et les actualités du cabinet.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-text-dark mb-2">Coaching et ateliers</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Nom, prénom, adresse e-mail, informations relatives à votre inscription
                    (atelier choisi, date). Ces données sont nécessaires à la gestion de votre
                    inscription et au suivi de votre participation.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Base légale */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Base légale du traitement
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: "Consentement",
                    text: "pour l'inscription à la newsletter et le dépôt de cookies non essentiels.",
                  },
                  {
                    label: "Intérêt légitime",
                    text: "pour le traitement des demandes de contact et l'amélioration du site.",
                  },
                  {
                    label: "Exécution d'un contrat",
                    text: "pour la gestion des inscriptions aux ateliers et au coaching.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 shrink-0"
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
                    <span>
                      <strong className="text-text-dark">{item.label}</strong> : {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Durée de conservation */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Durée de conservation
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Vos données personnelles sont conservées pour la durée strictement nécessaire à la
                finalité du traitement :
              </p>
              <ul className="space-y-2">
                {[
                  "Formulaire de contact : 3 ans à compter du dernier contact",
                  "Newsletter : jusqu'au retrait de votre consentement (désinscription)",
                  "Inscriptions ateliers/coaching : 3 ans après la fin de la prestation",
                  "Cookies : 13 mois maximum conformément aux recommandations de la CNIL",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="w-4 h-4 text-primary mt-1 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Droits des utilisateurs */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Vos droits
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants sur vos données
                personnelles :
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Droit d'accès", text: "Obtenir la confirmation que vos données sont traitées et en recevoir une copie." },
                  { title: "Droit de rectification", text: "Demander la correction de données inexactes ou incomplètes." },
                  { title: "Droit de suppression", text: "Demander l'effacement de vos données dans les conditions prévues par le RGPD." },
                  { title: "Droit à la portabilité", text: "Recevoir vos données dans un format structuré et lisible par machine." },
                  { title: "Droit d'opposition", text: "Vous opposer au traitement de vos données pour des motifs légitimes." },
                  { title: "Droit de limitation", text: "Demander la limitation du traitement de vos données." },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-text-dark text-sm mb-1">{right.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{right.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm mt-4">
                Pour exercer ces droits, contactez Aline Nebout par e-mail ou par courrier à
                l&apos;adresse indiquée ci-dessous. Vous disposez également du droit d&apos;introduire
                une réclamation auprès de la CNIL (www.cnil.fr).
              </p>
            </div>
          </ScrollReveal>

          {/* Cookies */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Cookies
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Ce site utilise des cookies pour assurer son bon fonctionnement et améliorer
                l&apos;expérience utilisateur. Les cookies suivants peuvent être déposés :
              </p>
              <ul className="space-y-2">
                {[
                  "Cookies strictement nécessaires : fonctionnement du site, gestion de la session (exemptés de consentement).",
                  "Cookies de mesure d'audience : analyse anonyme de la fréquentation du site (soumis à votre consentement).",
                  "Cookies de préférences : mémorisation de vos choix (consentement cookies, thème).",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-muted text-sm">
                    <svg
                      className="w-4 h-4 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-text-muted text-sm mt-4">
                Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de
                consentement ou les paramètres de votre navigateur.
              </p>
            </div>
          </ScrollReveal>

          {/* Hébergeur et sous-traitants */}
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Hébergeur et sous-traitants
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Les données collectées sont traitées par les sous-traitants suivants, dans le
                respect du RGPD :
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: "Vercel Inc.",
                    role: "Hébergement du site web",
                    location: "États-Unis — Clauses contractuelles types (CCT) de la Commission européenne",
                  },
                  {
                    name: "Supabase Inc.",
                    role: "Base de données et authentification",
                    location: "États-Unis — Clauses contractuelles types (CCT) de la Commission européenne",
                  },
                ].map((provider) => (
                  <div
                    key={provider.name}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm"
                  >
                    <h3 className="font-semibold text-text-dark mb-1">{provider.name}</h3>
                    <p className="text-text-muted text-sm">{provider.role}</p>
                    <p className="text-text-muted/70 text-xs mt-1">{provider.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact DPO */}
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 rounded-2xl p-8">
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Contact — Délégué à la protection des données
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Pour toute question relative à la protection de vos données personnelles ou pour
                exercer vos droits, vous pouvez contacter :
              </p>
              <div className="space-y-2 text-text-muted">
                <p className="font-semibold text-text-dark">Aline Nebout</p>
                <p>324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône</p>
                <p>Téléphone : 04 78 25 28 62</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
