"use client";

import { useState } from "react";
import type { PostCategory } from "./PostFeed";

interface PostEditorProps {
  onPostCreated: () => void;
}

const CATEGORY_OPTIONS: { value: PostCategory; label: string }[] = [
  { value: "annonce", label: "Annonce" },
  { value: "ressource", label: "Ressource" },
  { value: "question", label: "Question" },
  { value: "evenement", label: "Événement" },
];

export default function PostEditor({ onPostCreated }: PostEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("annonce");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), category }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de la publication.");
        return;
      }

      // Reset form
      setTitle("");
      setContent("");
      setCategory("annonce");
      setIsOpen(false);
      onPostCreated();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-5 shadow-sm text-left hover:shadow-md transition-shadow duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-sm text-text-muted">
            Publier un message, une ressource ou un événement...
          </span>
        </div>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-5 sm:p-6 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base text-text-dark">
          Nouvelle publication
        </h3>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setError("");
          }}
          className="p-1.5 rounded-lg text-text-muted hover:bg-accent/5 hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Category select */}
      <div>
        <label htmlFor="post-category" className="block text-sm font-semibold text-text-dark mb-1.5">
          Catégorie
        </label>
        <select
          id="post-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as PostCategory)}
          className="w-full rounded-xl border border-primary/15 bg-white/80 px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 cursor-pointer"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="post-title" className="block text-sm font-semibold text-text-dark mb-1.5">
          Titre
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de votre publication"
          required
          className="w-full rounded-xl border border-primary/15 bg-white/80 px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="post-content" className="block text-sm font-semibold text-text-dark mb-1.5">
          Contenu
        </label>
        <textarea
          id="post-content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Partagez une information, une ressource ou posez une question..."
          required
          className="w-full rounded-xl border border-primary/15 bg-white/80 px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-none"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm" role="alert">{error}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting || !title.trim() || !content.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          {submitting ? "Publication..." : "Publier"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setError("");
          }}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-accent/5 hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
