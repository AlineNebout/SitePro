"use client";

import { useState } from "react";

const initialData = {
  name: "Dr. Marion Grosdemange",
  profession: "Orthophoniste",
  description:
    "Orthophoniste spécialisée dans la prise en charge des troubles du langage oral et écrit chez l'enfant. Approche ludique et bienveillante.",
  specialties: "Troubles du langage, Dyslexie, Bégaiement, Troubles de l'oralité",
  phone: "04 78 12 34 56",
  email: "marion.grosdemange@example.com",
  websiteUrl: "https://www.marion-orthophonie.fr",
  doctolibUrl: "https://www.doctolib.fr/orthophoniste/lyon/marion-grosdemange",
};

export default function ProfileEditor() {
  const [form, setForm] = useState(initialData);
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Save to Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Photo upload placeholder */}
      <div>
        <p className="block text-sm font-semibold text-text-dark mb-2">
          Photo de profil
        </p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-accent/40" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-accent/15 text-accent hover:bg-accent/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Changer la photo
          </button>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="profile-name"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Nom complet
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Profession */}
        <div>
          <label
            htmlFor="profile-profession"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Profession
          </label>
          <input
            id="profile-profession"
            name="profession"
            type="text"
            value={form.profession}
            onChange={handleChange}
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="profile-phone"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Téléphone
          </label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="profile-email"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Email
          </label>
          <input
            id="profile-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Website URL */}
        <div>
          <label
            htmlFor="profile-website"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Site web
          </label>
          <input
            id="profile-website"
            name="websiteUrl"
            type="url"
            value={form.websiteUrl}
            onChange={handleChange}
            placeholder="https://www.example.com"
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Doctolib URL */}
        <div>
          <label
            htmlFor="profile-doctolib"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            URL Doctolib
          </label>
          <input
            id="profile-doctolib"
            name="doctolibUrl"
            type="url"
            value={form.doctolibUrl}
            onChange={handleChange}
            placeholder="https://www.doctolib.fr/..."
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Specialties */}
      <div>
        <label
          htmlFor="profile-specialties"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Spécialités
          <span className="font-normal text-text-muted ml-1">(séparées par des virgules)</span>
        </label>
        <input
          id="profile-specialties"
          name="specialties"
          type="text"
          value={form.specialties}
          onChange={handleChange}
          placeholder="Ex : Ostéopathie, Kinésithérapie, Orthophonie"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="profile-description"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Description
        </label>
        <textarea
          id="profile-description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Décrivez votre pratique, votre approche…"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Enregistrer les modifications
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Modifications enregistrées
          </span>
        )}
      </div>
    </form>
  );
}
