"use client";

import { useState, type FormEvent } from "react";

interface RentalInquiryFormProps {
  rentalSpaceId: string;
}

export default function RentalInquiryForm({ rentalSpaceId }: RentalInquiryFormProps) {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Le nom et l'email sont requis.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rentals/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rentalSpaceId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          desiredPeriod: profession.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi de la demande.");
        return;
      }

      setSuccess(true);
      setName("");
      setProfession("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#10B981]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-heading text-lg text-text-dark mb-2">Demande envoyée</h3>
        <p className="text-text-muted text-sm max-w-sm mx-auto">
          Merci pour votre intérêt. Nous vous recontacterons dans les meilleurs délais.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-text-dark text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-name" className="block text-sm font-medium text-text-dark mb-1">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBase}
            placeholder="Votre nom"
            required
          />
        </div>
        <div>
          <label htmlFor="inquiry-profession" className="block text-sm font-medium text-text-dark mb-1">
            Profession
          </label>
          <input
            id="inquiry-profession"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className={inputBase}
            placeholder="Ex : Psychologue, Diététicien..."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-email" className="block text-sm font-medium text-text-dark mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
            placeholder="votre@email.fr"
            required
          />
        </div>
        <div>
          <label htmlFor="inquiry-phone" className="block text-sm font-medium text-text-dark mb-1">
            Téléphone
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputBase}
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiry-message" className="block text-sm font-medium text-text-dark mb-1">
          Message
        </label>
        <textarea
          id="inquiry-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputBase} resize-none`}
          rows={4}
          placeholder="Décrivez votre besoin, vos disponibilités..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
