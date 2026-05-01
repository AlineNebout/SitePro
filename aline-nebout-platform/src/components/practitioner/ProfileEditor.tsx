"use client";

import { useState, useEffect } from "react";

interface ProfileData {
  first_name: string;
  last_name: string;
  profession: string;
  specialty: string;
  bio: string;
  phone: string;
  email: string;
  website_url: string;
}

const emptyProfile: ProfileData = {
  first_name: "",
  last_name: "",
  profession: "",
  specialty: "",
  bio: "",
  phone: "",
  email: "",
  website_url: "",
};

export default function ProfileEditor() {
  const [form, setForm] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/practitioners/profile");
        if (!res.ok) {
          setFeedback({ type: "error", message: "Impossible de charger votre profil." });
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.profile) {
          setForm({
            first_name: data.profile.first_name ?? "",
            last_name: data.profile.last_name ?? "",
            profession: data.profile.profession ?? "",
            specialty: data.profile.specialty ?? "",
            bio: data.profile.bio ?? "",
            phone: data.profile.phone ?? "",
            email: data.profile.email ?? "",
            website_url: data.profile.website_url ?? "",
          });
        }
      } catch {
        setFeedback({ type: "error", message: "Erreur de connexion au serveur." });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFeedback(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/practitioners/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setFeedback({
          type: "error",
          message: data.error || "Erreur lors de la sauvegarde.",
        });
        return;
      }

      setFeedback({ type: "success", message: "Modifications enregistrées" });
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback({ type: "error", message: "Impossible de contacter le serveur." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-accent/10" />
          <div className="w-32 h-9 rounded-xl bg-accent/10" />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="w-24 h-4 bg-accent/10 rounded mb-2" />
              <div className="w-full h-10 bg-accent/10 rounded-xl" />
            </div>
          ))}
        </div>
        <div>
          <div className="w-24 h-4 bg-accent/10 rounded mb-2" />
          <div className="w-full h-10 bg-accent/10 rounded-xl" />
        </div>
        <div>
          <div className="w-24 h-4 bg-accent/10 rounded mb-2" />
          <div className="w-full h-24 bg-accent/10 rounded-xl" />
        </div>
      </div>
    );
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
        {/* First name */}
        <div>
          <label
            htmlFor="profile-first-name"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Prénom
          </label>
          <input
            id="profile-first-name"
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
          />
        </div>

        {/* Last name */}
        <div>
          <label
            htmlFor="profile-last-name"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Nom
          </label>
          <input
            id="profile-last-name"
            name="last_name"
            type="text"
            value={form.last_name}
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

        {/* Specialty */}
        <div>
          <label
            htmlFor="profile-specialty"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Spécialité
          </label>
          <input
            id="profile-specialty"
            name="specialty"
            type="text"
            value={form.specialty}
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
          name="website_url"
          type="url"
          value={form.website_url}
          onChange={handleChange}
          placeholder="https://www.example.com"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
        />
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="profile-bio"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Biographie
        </label>
        <textarea
          id="profile-bio"
          name="bio"
          rows={4}
          value={form.bio}
          onChange={handleChange}
          placeholder="Décrivez votre pratique, votre approche..."
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
        {feedback && (
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
              feedback.type === "success" ? "text-[#10B981]" : "text-red-600"
            }`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.type === "success" && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
            {feedback.type === "error" && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            {feedback.message}
          </span>
        )}
      </div>
    </form>
  );
}
