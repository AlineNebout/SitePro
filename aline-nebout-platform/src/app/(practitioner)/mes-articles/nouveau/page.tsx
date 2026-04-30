import type { Metadata } from "next";
import ArticleEditor from "@/components/practitioner/ArticleEditor";

export const metadata: Metadata = {
  title: "Nouvel article",
  description: "Rédigez un nouvel article pour le blog du Pôle Santé.",
};

export default function NouvelArticlePage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
          Rédiger un article
        </h1>
        <p className="text-text-muted text-sm">
          Votre article sera soumis à validation avant publication sur le blog
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-6 sm:p-8 shadow-sm">
        <ArticleEditor />
      </div>
    </>
  );
}
