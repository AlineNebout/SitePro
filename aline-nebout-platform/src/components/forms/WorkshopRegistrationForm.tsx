"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workshopRegistrationSchema } from "@/lib/validations/workshop";

interface WorkshopRegistrationFormProps {
  workshopId: string;
  workshopDate: string;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validateForm(data: FormData): FormErrors {
  const result = workshopRegistrationSchema.safeParse(data);
  if (result.success) return {};

  const errors: FormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof FormErrors | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export default function WorkshopRegistrationForm({
  workshopId,
  workshopDate,
  onSuccess,
}: WorkshopRegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({
        ...prev,
        [field]: (newErrors as Record<string, string | undefined>)[field],
      }));
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => new Set(prev).add(field));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({
      ...prev,
      [field]: (newErrors as Record<string, string | undefined>)[field],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setTouched(new Set(["name", "email", "phone"]));

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch(`/api/workshops/${workshopId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Une erreur est survenue.");
        return;
      }

      if (data.waitlisted) {
        setWaitlisted(true);
        setWaitlistPosition(data.position ?? null);
      }

      setSubmitted(true);
      onSuccess?.();
    } catch {
      setApiError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border-2 bg-white/80 text-text-dark placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm";
  const inputError = "border-red-400";
  const inputNormal = "border-gray-200 hover:border-emerald-300";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        {waitlisted ? (
          <>
            <h3 className="font-heading text-lg text-text-dark mb-1">
              Inscription sur liste d&apos;attente
            </h3>
            <p className="text-sm text-text-muted">
              L&apos;atelier du <strong>{workshopDate}</strong> est complet.
              Vous êtes en position <strong>{waitlistPosition}</strong> sur la liste d&apos;attente.
              Vous serez contacté(e) si une place se libère.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-heading text-lg text-text-dark mb-1">Inscription confirmée</h3>
            <p className="text-sm text-text-muted">
              Vous êtes inscrit(e) pour l&apos;atelier du <strong>{workshopDate}</strong>.
              Vous recevrez un email de confirmation prochainement.
            </p>
          </>
        )}
        <p className="text-xs text-text-muted mt-2">
          À bientôt sur les bords de Saône !
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-text-dark mb-1">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`${inputBase} ${errors.name && touched.has("name") ? inputError : inputNormal}`}
            placeholder="Votre nom"
          />
          <AnimatePresence>
            {errors.name && touched.has("name") && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-text-dark mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputBase} ${errors.email && touched.has("email") ? inputError : inputNormal}`}
            placeholder="votre@email.com"
          />
          <AnimatePresence>
            {errors.email && touched.has("email") && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="reg-phone" className="block text-sm font-medium text-text-dark mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`${inputBase} ${errors.phone && touched.has("phone") ? inputError : inputNormal}`}
            placeholder="06 XX XX XX XX"
          />
          <AnimatePresence>
            {errors.phone && touched.has("phone") && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="reg-message" className="block text-sm font-medium text-text-dark mb-1">
            Message <span className="text-text-muted text-xs font-normal">(optionnel)</span>
          </label>
          <input
            id="reg-message"
            type="text"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={`${inputBase} ${inputNormal}`}
            placeholder="Précisions, questions..."
          />
        </div>
      </div>

      {apiError && (
        <p className="text-red-500 text-sm" role="alert">{apiError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {loading ? "Inscription en cours..." : "Confirmer l'inscription"}
      </button>
    </form>
  );
}
