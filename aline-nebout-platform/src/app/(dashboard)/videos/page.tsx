import type { Metadata } from "next";
import VideoUpload from "@/components/dashboard/VideoUpload";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Mes vidéos",
  description: "Retrouvez vos analyses vidéo de foulée et uploadez de nouvelles vidéos.",
};

export default function VideosPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            Mes vidéos
          </h1>
          <p className="text-text-muted mt-1">
            Retrouvez vos analyses vidéo de foulée et partagez de nouvelles vidéos avec Aline
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-8">
          <VideoUpload />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-6 text-center">
          <svg className="w-8 h-8 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-text-dark font-medium mb-1">Comment ça marche ?</p>
          <p className="text-xs text-text-muted max-w-md mx-auto">
            Filmez-vous en train de courir (de profil, sur 20m aller-retour) et uploadez la vidéo ici. Aline analysera votre foulée et vous enverra un retour personnalisé avec des conseils d&apos;amélioration.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
