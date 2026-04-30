"use client";

import { useState } from "react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  function handleGenerate() {
    const trimmed = url.trim();
    if (!trimmed) return;
    setGeneratedUrl(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleGenerate();
    }
  }

  const qrApiUrl = generatedUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedUrl)}`
    : null;

  const downloadUrl = generatedUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&download=1&data=${encodeURIComponent(generatedUrl)}`
    : null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="custom-qr-url" className="sr-only">
          URL personnalisée
        </label>
        <input
          id="custom-qr-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://exemple.com/ma-page"
          className="flex-1 px-4 py-3 rounded-xl border-2 border-primary/20 bg-white/80 text-text-dark placeholder:text-text-muted/50 focus:border-primary focus:outline-none transition-colors duration-200"
        />
        <button
          onClick={handleGenerate}
          disabled={!url.trim()}
          className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent shadow-lg shadow-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          Générer
        </button>
      </div>

      {qrApiUrl && generatedUrl && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrApiUrl}
              alt={`QR code pour ${generatedUrl}`}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <p className="text-text-muted text-sm break-all text-center max-w-md">
            {generatedUrl}
          </p>
          <a
            href={downloadUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3"
              />
            </svg>
            Télécharger
          </a>
        </div>
      )}
    </div>
  );
}
