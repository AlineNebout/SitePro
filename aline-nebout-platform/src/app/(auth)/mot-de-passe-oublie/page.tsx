import { Metadata } from "next";
import PasswordResetForm from "@/components/forms/PasswordResetForm";
import ScrollReveal from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description:
    "Réinitialisez votre mot de passe pour accéder à votre espace coaching Aline Nebout.",
};

export default function MotDePasseOubliePage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-56 h-56 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <ScrollReveal className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-primary/5 border border-white/40 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
              Mot de passe oublié
            </h1>
            <p className="text-text-muted text-sm">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>
          <PasswordResetForm />
        </div>
      </ScrollReveal>
    </section>
  );
}
