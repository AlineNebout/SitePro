"use client";

import { useState, useEffect, useCallback } from "react";
import PostFeed, { type PostCategory, type CommunityPost } from "@/components/community/PostFeed";
import PostEditor from "@/components/community/PostEditor";

export default function PractitionerCommunautePage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentFilter, setCurrentFilter] = useState<PostCategory | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = currentFilter ? `?category=${currentFilter}` : "";
      const res = await fetch(`/api/community/posts${params}`);
      if (!res.ok) {
        setError("Impossible de charger les publications.");
        return;
      }
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }, [currentFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function handleFilterChange(category: PostCategory | null) {
    setCurrentFilter(category);
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
          Communauté
        </h1>
        <p className="text-text-muted text-sm">
          Échangez avec les praticiens du Pôle Santé
        </p>
      </div>

      {/* Post editor */}
      <div className="mb-6">
        <PostEditor onPostCreated={fetchPosts} />
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchPosts}
            className="mt-3 text-sm text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && !error ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm animate-pulse"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10" />
                <div className="flex-1">
                  <div className="w-32 h-4 bg-accent/10 rounded mb-1" />
                  <div className="w-20 h-3 bg-accent/10 rounded" />
                </div>
                <div className="w-16 h-5 bg-accent/10 rounded-md" />
              </div>
              <div className="w-48 h-4 bg-accent/10 rounded mb-2" />
              <div className="w-full h-3 bg-accent/10 rounded mb-1" />
              <div className="w-3/4 h-3 bg-accent/10 rounded" />
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <PostFeed
            posts={posts}
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            onCommentAdded={fetchPosts}
          />
        )
      )}
    </>
  );
}
