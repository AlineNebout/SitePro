"use client";

import PostCard from "./PostCard";

export type PostCategory = "annonce" | "ressource" | "question" | "evenement";

export interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: PostCategory;
  is_pinned: boolean;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
  comment_count: number;
}

interface PostFeedProps {
  posts: CommunityPost[];
  currentFilter: PostCategory | null;
  onFilterChange: (category: PostCategory | null) => void;
  onCommentAdded: () => void;
}

const CATEGORY_OPTIONS: { value: PostCategory; label: string }[] = [
  { value: "annonce", label: "Annonce" },
  { value: "ressource", label: "Ressource" },
  { value: "question", label: "Question" },
  { value: "evenement", label: "Événement" },
];

export default function PostFeed({
  posts,
  currentFilter,
  onFilterChange,
  onCommentAdded,
}: PostFeedProps) {
  return (
    <div>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => onFilterChange(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
            currentFilter === null
              ? "bg-accent text-white shadow-md shadow-accent/20"
              : "bg-white/80 text-text-muted hover:bg-accent/5 hover:text-accent border border-accent/10"
          }`}
        >
          Tout
        </button>
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() =>
              onFilterChange(currentFilter === cat.value ? null : cat.value)
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              currentFilter === cat.value
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-white/80 text-text-muted hover:bg-accent/5 hover:text-accent border border-accent/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-accent/10 p-12 text-center shadow-sm">
          <svg
            className="w-12 h-12 text-accent/20 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <p className="text-text-muted text-sm">
            {currentFilter
              ? "Aucune publication dans cette catégorie."
              : "Aucune publication pour le moment. Soyez le premier à publier !"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onCommentAdded={onCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
