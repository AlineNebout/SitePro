"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  requestType: string;
  message: string;
}

interface FormErrors {
  schoolName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  requestType?: string;
  message?: string;
}

const REQUEST_TYPES = [
  { value: "", label: "Choisir un type de demande" },
  { value: "information", label: "Session d'information" },
  { value: "atelier", label: "Atelier pour le personnel" },
  { value: "depistage", label: "Dépistage élèves" },
];

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.schoolName.trim()) {
    errors.schoolName = "Le nom de l'établissement est requis";
  }
  if (!data.contactPerson.trim()) {
    errors.contactPerson = "Le nom du contact est requis";
  }
  if (!data.email.trim()) {
    errors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "L'email n'est pas valide";
  }
  if (data.phone && !/^[\d\s+()-]{10,}$/.test(data.phone)) {
    errors.phone = "Le numéro de téléphone n'est pas valide";
  }
  if (!data.requestType) {
    errors.requestType = "Veuillez choisir un type de demande";
  }
  if (!data.message.trim()) {
    errors.message = "Le message est requis";
  }

  return errors;
}

export default function SchoolContactForm() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    requestType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => new Set(prev).add(field));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setTouched(new Set(Object.keys(formData)));

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#10B981]/10 border-2 border-[#10B981]/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#10B981]/15 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-[#10B981]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-xl text-text-dark mb-2">Message envoyé</h3>
        <p className="text-text-muted">
          Merci pour votre demande. Aline vous recontactera dans les meilleurs délais pour
          organiser l&apos;intervention.
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border-2 bg-white/80 text-text-dark placeholder:text-text-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";
  const inputError = "border-red-400";
  const inputNormal = "border-primary-light/30 hover:border-primary-light";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* School name */}
      <div>
        <label htmlFor="schoolName" className="block text-sm font-medium text-text-dark mb-1.5">
          Nom de l&apos;établissement <span className="text-primary">*</span>
        </label>
        <input
          id="schoolName"
          type="text"
          value={formData.schoolName}
          onChange={(e) => handleChange("schoolName", e.target.value)}
          onBlur={() => handleBlur("schoolName")}
          className={`${inputBase} ${errors.schoolName && touched.has("schoolName") ? inputError : inputNormal}`}
          placeholder="École, collège, lycée..."
        />
        {errors.schoolName && touched.has("schoolName") && (
          <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>
        )}
      </div>

      {/* Contact person */}
      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-text-dark mb-1.5">
          Personne de contact <span className="text-primary">*</span>
        </label>
        <input
          id="contactPerson"
          type="text"
          value={formData.contactPerson}
          onChange={(e) => handleChange("contactPerson", e.target.value)}
          onBlur={() => handleBlur("contactPerson")}
          className={`${inputBase} ${errors.contactPerson && touched.has("contactPerson") ? inputError : inputNormal}`}
          placeholder="Nom et prénom"
        />
        {errors.contactPerson && touched.has("contactPerson") && (
          <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
        )}
      </div>

      {/* Email + Phone row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1.5">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputBase} ${errors.email && touched.has("email") ? inputError : inputNormal}`}
            placeholder="contact@ecole.fr"
          />
          {errors.email && touched.has("email") && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-1.5">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`${inputBase} ${errors.phone && touched.has("phone") ? inputError : inputNormal}`}
            placeholder="04 XX XX XX XX"
          />
          {errors.phone && touched.has("phone") && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Request type */}
      <div>
        <label htmlFor="requestType" className="block text-sm font-medium text-text-dark mb-1.5">
          Type de demande <span className="text-primary">*</span>
        </label>
        <select
          id="requestType"
          value={formData.requestType}
          onChange={(e) => handleChange("requestType", e.target.value)}
          onBlur={() => handleBlur("requestType")}
          className={`${inputBase} cursor-pointer ${errors.requestType && touched.has("requestType") ? inputError : inputNormal}`}
        >
          {REQUEST_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.requestType && touched.has("requestType") && (
          <p className="text-red-500 text-xs mt-1">{errors.requestType}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={`${inputBase} resize-y ${errors.message && touched.has("message") ? inputError : inputNormal}`}
          placeholder="Décrivez votre projet ou vos besoins..."
        />
        {errors.message && touched.has("message") && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        Envoyer la demande
      </button>
    </form>
  );
}
