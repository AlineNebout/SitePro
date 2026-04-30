"use client";

import { useState, useRef } from "react";

interface VideoFile {
  name: string;
  size: string;
  date: string;
  status: "uploading" | "processing" | "ready";
  progress?: number;
}

export default function VideoUpload() {
  const [videos, setVideos] = useState<VideoFile[]>([
    { name: "analyse-foulee-session-2.mp4", size: "45 MB", date: "12 juin 2025", status: "ready" },
    { name: "exercices-posture.mp4", size: "28 MB", date: "5 juin 2025", status: "ready" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState<VideoFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) simulateUpload(files[0]);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) simulateUpload(files[0]);
  }

  function simulateUpload(file: File) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const newVideo: VideoFile = {
      name: file.name,
      size: `${sizeMB} MB`,
      date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: "uploading",
      progress: 0,
    };
    setUploading(newVideo);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploading(null);
          setVideos((prev) => [{ ...newVideo, status: "ready", progress: undefined }, ...prev]);
        }, 500);
      }
      setUploading((prev) => prev ? { ...prev, progress: Math.min(progress, 100) } : null);
    }, 300);
  }

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/50"
            : "border-emerald-300/50 bg-emerald-50/20 hover:border-emerald-400 hover:bg-emerald-50/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <svg className="w-10 h-10 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="text-sm font-semibold text-text-dark mb-1">
          Glissez votre vidéo ici ou cliquez pour sélectionner
        </p>
        <p className="text-xs text-text-muted">
          MP4, MOV, AVI — Max 500 MB
        </p>
      </div>

      {/* Upload in progress */}
      {uploading && (
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-5 h-5 text-emerald-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-dark truncate">{uploading.name}</p>
              <p className="text-xs text-text-muted">{uploading.size} — Upload en cours...</p>
            </div>
            <span className="text-sm font-semibold text-emerald-600">{Math.round(uploading.progress || 0)}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${uploading.progress || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Video list */}
      {videos.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-dark mb-3">Mes vidéos ({videos.length})</h3>
          <div className="space-y-3">
            {videos.map((video, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-dark truncate">{video.name}</p>
                  <p className="text-xs text-text-muted">{video.size} · {video.date}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Disponible
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
