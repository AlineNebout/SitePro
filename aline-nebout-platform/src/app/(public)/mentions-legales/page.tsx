import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site d'Aline Nebout, ostéopathe D.O. au Pôle Santé de Rochetaillée-sur-Saône.",
};

const sections = [
  {
    title: "Éditeur du site",
    content: [
      "Aline Nebout — Ostéopathe D.O.",
      "324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône",
      "Téléphone : 04 78 25 28 62",
      "Numéro ADELI : [en cours de mise à jour]",
      "Numéro RPPS : [en cours de mise à jour]",
      "Profession réglementée : Ostéopathe, conformément aux articles L.4131-1 et suivants du Code de la santé publique.",
    ],
  },
  {
    title: "Hébergeur",
    content: [
      "Vercel Inc.",
      "440 N Barranca Ave #4133",
      "Covina, CA 91723, USA",
      "Site web : https://vercel.com",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, photographies, logos, icônes, vidéos, sons, logiciels, bases de données, mises en page) est protégé par le droit d'auteur et le droit de la propriété intellectuelle, conformément aux dispositions du Code de la propriété intellectuelle.",
      "Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, de l'un quelconque de ces éléments, par quelque moyen ou procédé que ce soit, est interdite sans l'autorisation écrite préalable d'Aline Nebout.",
      "Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      "Les informations fournies sur ce site le sont à titre indicatif et ne sauraient se substituer à un avis médical ou à une consultation professionnelle. Aline Nebout s'efforce de fournir des informations aussi précises que possible, mais ne saurait être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour de ces informations.",
      "Aline Nebout ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation des informations qui y sont diffusées.",
      "Les liens hypertextes présents sur ce site peuvent renvoyer vers d'autres sites internet. Aline Nebout décline toute responsabilité quant au contenu de ces sites tiers.",
    ],
  },
  {
    title: "Crédits",
    content: [
      "Conception et développement : Aline Nebout",
      "Photographies : droits réservés",
      "Icônes : Heroicons (MIT License)",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: "Mentions légales" }]} />
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-4">
              Mentions légales
            </h1>
            <p className="text-text-muted text-sm">
              Dernière mise à jour : janvier 2025
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sections */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.05}>
              <div>
                <h2 className="font-heading text-2xl text-text-dark mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className="text-text-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
