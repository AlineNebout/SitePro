import { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre espace coaching Aline Nebout. Accédez à vos exercices, votre progression et vos ateliers.",
};

export default function ConnexionPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <ScrollReveal className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-primary/5 border border-white/40 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
              Connexion
            </h1>
            <p className="text-text-muted text-sm">
              Accédez à votre espace coaching personnel
            </p>
          </div>
          <LoginForm />
        </div>
      </ScrollReveal>
    </section>
  );
}
