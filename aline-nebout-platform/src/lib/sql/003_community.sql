-- ============================================================
-- Community Schema
-- Run this in the Supabase SQL Editor
-- ============================================================
-- NOTE: community_posts, community_comments, and post_attachments
-- tables already exist from the initial migration (001_initial_schema.sql).
-- This file documents the schema and adds any missing indexes.
--
-- Existing tables:
--   community_posts (id, author_id, category, title, content, is_pinned, created_at, updated_at)
--   community_comments (id, post_id, author_id, content, created_at)
--   post_attachments (id, post_id, file_name, file_url, file_type, file_size, created_at)
--
-- Existing RLS policies:
--   "Practitioners read community" — practitioners + admin can SELECT
--   "Practitioners create posts" — practitioners + admin can INSERT
--   "Authors update own posts" — author can UPDATE own posts
--   "Practitioners read comments" — practitioners + admin can SELECT
--   "Practitioners create comments" — practitioners + admin can INSERT
--   "Practitioners read attachments" — practitioners + admin can SELECT
--   "Admin delete community posts" — admin can DELETE
-- ============================================================

-- Add indexes for performance (IF NOT EXISTS to be safe)
CREATE INDEX IF NOT EXISTS idx_community_posts_author_id ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_pinned ON community_posts(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_comments_post_id ON community_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_community_comments_author_id ON community_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_post_attachments_post_id ON post_attachments(post_id);
