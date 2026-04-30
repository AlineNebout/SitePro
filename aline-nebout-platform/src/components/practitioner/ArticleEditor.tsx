"use client";

import { useState } from "react";

const CATEGORIES = [
  "Ostéopathie",
  "Réflexes Archaïques",
  "Coaching Foulée",
  "Pôle Santé",
  "Autre",
] as const;

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const excerptMax = 200;
  const excerptCount = excerpt.length;

  function showFeedback(message: string) {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 3000);
  }

  function handleSaveDraft(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // TODO: Save draft to Supabase
    setTimeout(() => {
      setSaving(false);
      showFeedback("Brouillon enregistré");
    }, 500);
  }

  function handleSubmit() {
    setSaving(true);
    // TODO: Submit for publication to Supabase
    setTimeout(() => {
      setSaving(false);
      showFeedback("Article soumis pour publication");
    }, 500);
  }

  return (
    <form onSubmit={handleSaveDraft} className="space-y-8">
      {/* Title */}
      <div>
        <label
          htmlFor="article-title"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Titre de l&apos;article
        </label>
        <input
          id="article-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : Les bienfaits de l'ostéopathie précoce"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="article-category"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Catégorie
        </label>
        <select
          id="article-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Featured image URL */}
      <div>
        <label
          htmlFor="article-image"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Image à la une
          <span className="font-normal text-text-muted ml-1">(URL)</span>
        </label>
        <input
          id="article-image"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label
          htmlFor="article-excerpt"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Extrait
          <span className="font-normal text-text-muted ml-1">(courte description)</span>
        </label>
        <textarea
          id="article-excerpt"
          rows={2}
          maxLength={excerptMax}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Résumé de l'article en quelques phrases…"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-none"
        />
        <div className="flex items-center justify-end mt-1.5">
          <p
            className={`text-xs font-semibold ${
              excerptCount >= excerptMax ? "text-red-500" : "text-text-muted"
            }`}
          >
            {excerptCount}/{excerptMax}
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="article-content"
          className="block text-sm font-semibold text-text-dark mb-2"
        >
          Contenu de l&apos;article
        </label>
        <textarea
          id="article-content"
          rows={16}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Rédigez votre article ici…"
          className="w-full rounded-xl border border-primary/15 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200 resize-y min-h-[200px]"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-accent/15 text-text-dark hover:bg-accent/5 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enregistrer en brouillon
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark shadow-md shadow-accent/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Soumettre pour publication
        </button>
        {feedback && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {feedback}
          </span>
        )}
      </div>
    </form>
  );
}
