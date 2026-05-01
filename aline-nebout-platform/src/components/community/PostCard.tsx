"use client";

import { useState } from "react";
import type { CommunityPost } from "./PostFeed";

interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}

interface PostCardProps {
  post: CommunityPost;
  onCommentAdded: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  annonce: { bg: "bg-primary/10", text: "text-primary" },
  ressource: { bg: "bg-accent/10", text: "text-accent" },
  question: { bg: "bg-amber-100", text: "text-amber-700" },
  evenement: { bg: "bg-[#059669]/10", text: "text-[#059669]" },
};

const CATEGORY_LABELS: Record<string, string> = {
  annonce: "Annonce",
  ressource: "Ressource",
  question: "Question",
  evenement: "Événement",
};

function getInitials(name: string | undefined | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({ post, onCommentAdded }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  const catColors = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.annonce;
  const catLabel = CATEGORY_LABELS[post.category] || post.category;
  const authorName = post.profiles?.full_name || post.profiles?.email?.split("@")[0] || "Praticien";

  async function loadComments() {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments ?? []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingComments(false);
    }
  }

  function handleToggleComments() {
    if (!showComments) {
      loadComments();
    }
    setShowComments(!showComments);
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    setCommentError("");

    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setCommentError(data.error || "Erreur lors de l'envoi.");
        return;
      }

      setNewComment("");
      loadComments();
      onCommentAdded();
    } catch {
      setCommentError("Impossible de contacter le serveur.");
    } finally {
      setSubmittingComment(false);
    }
  }

  return (
    <article
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-sm ${
        post.is_pinned ? "ring-2 ring-accent/20" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <span className="text-accent font-bold text-sm">
            {getInitials(authorName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-text-dark">
              {authorName}
            </span>
            {post.is_pinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Épinglé
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted">
            {formatDate(post.created_at)}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${catColors.bg} ${catColors.text} shrink-0`}
        >
          {catLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-base text-text-dark mb-2">
        {post.title}
      </h3>

      {/* Content */}
      <p className="text-sm text-text-dark leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-accent/5">
        <button
          type="button"
          onClick={handleToggleComments}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg px-2 py-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          {post.comment_count} commentaire{post.comment_count !== 1 ? "s" : ""}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-4 space-y-3">
          {loadingComments ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/10 shrink-0" />
                  <div className="flex-1">
                    <div className="w-24 h-3 bg-accent/10 rounded mb-1" />
                    <div className="w-full h-3 bg-accent/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-xs text-text-muted pl-2">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            <div className="space-y-3 pl-2">
              {comments.map((comment) => {
                const commentAuthor =
                  comment.profiles?.full_name ||
                  comment.profiles?.email?.split("@")[0] ||
                  "Praticien";
                return (
                  <div key={comment.id} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-[10px]">
                        {getInitials(commentAuthor)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-dark">
                          {commentAuthor}
                        </span>
                        <span className="text-[10px] text-text-muted">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-text-dark leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add comment form */}
          <form onSubmit={handleSubmitComment} className="flex gap-2 pt-2">
            <label htmlFor={`comment-${post.id}`} className="sr-only">
              Ajouter un commentaire
            </label>
            <input
              id={`comment-${post.id}`}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 min-w-0 rounded-xl border border-primary/15 bg-white/80 px-3 py-2 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={submittingComment || !newComment.trim()}
              className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {submittingComment ? "..." : "Envoyer"}
            </button>
          </form>
          {commentError && (
            <p className="text-red-500 text-xs pl-2" role="alert">
              {commentError}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
