"use client";

import { useState } from "react";

const NETWORKS = [
  { id: "facebook", label: "Facebook", color: "#1877F2" },
  { id: "instagram", label: "Instagram", color: "#E4405F" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2" },
] as const;

type NetworkId = (typeof NETWORKS)[number]["id"];

export default function PublicationEditor() {
  const [content, setContent] = useState("");
  const [selectedNetworks, setSelectedNetworks] = useState<NetworkId[]>([]);
  const [date, setDate] = useState("");

  const hasInstagram = selectedNetworks.includes("instagram");
  const maxChars = hasInstagram ? 2200 : 280;
  const charCount = content.length;
  const isOverLimit = charCount > maxChars;

  function toggleNetwork(id: NetworkId) {
    setSelectedNetworks((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor */}
      <div className="space-y-6">
        {/* Content */}
        <div>
          <label
            htmlFor="pub-content"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Contenu de la publication
          </label>
          <textarea
            id="pub-content"
            rows={6}
            maxLength={2200}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Rédigez votre publication ici…"
            className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-none"
          />
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-text-muted">
              Max {maxChars} caractères
              {hasInstagram ? " (Instagram)" : " (Twitter-style)"}
            </p>
            <p
              className={`text-xs font-semibold ${
                isOverLimit ? "text-red-500" : "text-text-muted"
              }`}
            >
              {charCount}/{maxChars}
            </p>
          </div>
        </div>

        {/* Network selector */}
        <fieldset>
          <legend className="block text-sm font-semibold text-text-dark mb-2">
            Réseaux cibles
          </legend>
          <div className="flex flex-wrap gap-3">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetworks.includes(network.id);
              return (
                <label
                  key={network.id}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 border-2 ${
                    isSelected
                      ? "border-current shadow-sm"
                      : "border-transparent bg-white/60 hover:bg-white/80"
                  }`}
                  style={
                    isSelected
                      ? { color: network.color, backgroundColor: `${network.color}10`, borderColor: `${network.color}40` }
                      : undefined
                  }
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleNetwork(network.id)}
                    className="sr-only"
                    aria-label={network.label}
                  />
                  <NetworkIcon id={network.id} />
                  {network.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Date picker */}
        <div>
          <label
            htmlFor="pub-date"
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            Date de publication
          </label>
          <input
            id="pub-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 cursor-pointer"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-primary/15 text-text-dark hover:bg-primary/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Enregistrer en brouillon
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-accent shadow-md shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Planifier sur Buffer
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Publier maintenant
          </button>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-sm font-semibold text-text-dark mb-3">
          Aperçu
        </h3>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 p-6 shadow-sm">
          {/* Network badges */}
          {selectedNetworks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedNetworks.map((id) => {
                const net = NETWORKS.find((n) => n.id === id)!;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: net.color }}
                  >
                    <NetworkIcon id={id} size={14} />
                    {net.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Content preview */}
          <p className="text-sm text-text-dark leading-relaxed whitespace-pre-wrap min-h-[80px]">
            {content || (
              <span className="text-text-muted/40 italic">
                Votre publication apparaîtra ici…
              </span>
            )}
          </p>

          {/* Date */}
          {date && (
            <p className="text-xs text-text-muted mt-4 pt-3 border-t border-primary/10">
              Programmée le{" "}
              {new Date(date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function NetworkIcon({ id, size = 16 }: { id: string; size?: number }) {
  const s = `${size}`;
  switch (id) {
    case "facebook":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}
