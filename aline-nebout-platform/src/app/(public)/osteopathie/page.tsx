import { Metadata } from "next";
import ScrollReveal from "@/components/animation/ScrollReveal";
import SpecialtyCard from "@/components/content/SpecialtyCard";
import DoctolibButton from "@/components/booking/DoctolibButton";
import OsteopathyHero from "@/components/sections/OsteopathyHero";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: "Ostéopathie",
  description: "Ostéopathie douce pour toute la famille : femme enceinte, nourrisson, sportif, somato-émotionnel, cicatrices. Cabinet au Pôle Santé de Rochetaillée-sur-Saône.",
};

const specialties = [
  {
    title: "Ostéopathie générale",
    description: "Douleurs de dos, maux de tête, troubles digestifs, séquelles de traumatismes. Une approche manuelle douce pour rétablir l'équilibre du corps.",
    href: "/osteopathie/generale",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop",
    icon: null,
  },
  {
    title: "Femme enceinte & jeune maman",
    description: "Accompagnement pendant la grossesse, préparation à l'accouchement, bilan post-partum et conseils en allaitement.",
    href: "/osteopathie/femme-enceinte",
    imageUrl: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=600&fit=crop",
    icon: null,
  },
  {
    title: "Nourrisson & enfant",
    description: "Dès les premiers jours de vie : torticolis, coliques, troubles du sommeil, déformation crânienne, suivi de croissance.",
    href: "/osteopathie/nourrisson-enfant",
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop",
    icon: null,
  },
  {
    title: "Somato-émotionnel & stress",
    description: "Libération des tensions émotionnelles enkystées dans le corps. Gestion du stress, anxiété et chocs émotionnels.",
    href: "/osteopathie/somato-emotionnel",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    icon: null,
  },
  {
    title: "Cicatrices",
    description: "Traitement des adhérences de cicatrices pour améliorer leur élasticité et réduire les douleurs associées.",
    href: "/osteopathie/cicatrices",
    imageUrl: "/images/cicatrice-travail.jpg",
    icon: null,
  },
  {
    title: "Sportifs",
    description: "Prévention et traitement des blessures sportives. Conseils sur la foulée en course à pied.",
    href: "/osteopathie/sportifs",
    imageUrl: "/images/sportifs.jpg",
    icon: null,
  },
];

export default function OsteopathiePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <OsteopathyHero />

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Mes spécialités</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Une approche douce et globale</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 0.1}>
                <SpecialtyCard {...s} icon={s.icon ?? <></>} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Informations pratiques</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Tarifs &amp; consultations</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <h3 className="font-heading text-lg mb-2">Consultation d&apos;ostéopathie</h3>
              <p className="text-4xl font-bold text-primary mb-2">65<span className="text-lg font-normal text-text-muted">€</span></p>
              <p className="text-text-muted text-sm">Séance d&apos;environ 45 minutes</p>
              <p className="text-text-muted text-xs mt-2">Remboursement possible par votre mutuelle</p>
              <div className="mt-6">
                <DoctolibButton variant="primary" label="Prendre rendez-vous" />
              </div>
            </div>
          </ScrollReveal>
          <p className="text-center text-text-muted text-sm mt-6">
            Consultation à domicile sur demande. Pas besoin de passer par votre médecin traitant.
          </p>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center">
            <p className="text-text-muted text-sm">
              Pôle Santé de Rochetaillée-sur-Saône — 324 quai Pierre Dupont
            </p>
            <p className="text-text-muted text-sm mt-1">
              À 15 min de Lyon, 5 min de Neuville-sur-Saône — Stationnement gratuit
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
