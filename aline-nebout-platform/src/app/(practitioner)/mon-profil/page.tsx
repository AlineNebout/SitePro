import type { Metadata } from "next";
import ProfileEditor from "@/components/practitioner/ProfileEditor";

export const metadata: Metadata = {
  title: "Mon profil",
  description: "Gérez votre profil praticien sur la plateforme Aline Nebout.",
};

export default function MonProfilPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
          Mon profil
        </h1>
        <p className="text-text-muted text-sm">
          Modifiez vos informations visibles sur le site du Pôle Santé
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-6 sm:p-8 shadow-sm">
        <ProfileEditor />
      </div>
    </>
  );
}
