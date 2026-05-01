import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — list community posts with author info and comment counts
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Auth required — practitioners + admin only
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["practitioner", "admin"].includes(profile.role)) {
      return NextResponse.json(
        { error: "Accès réservé aux praticiens" },
        { status: 403 }
      );
    }

    // Parse optional category filter
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase
      .from("community_posts")
      .select(
        "id, author_id, title, content, category, is_pinned, created_at, profiles:author_id(full_name, email)"
      )
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (category && ["annonce", "ressource", "question", "evenement"].includes(category)) {
      query = query.eq("category", category);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error("Community posts fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des publications" },
        { status: 500 }
      );
    }

    // Fetch comment counts for all posts
    const postIds = (posts ?? []).map((p) => p.id);
    let commentCounts: Record<string, number> = {};

    if (postIds.length > 0) {
      const { data: comments } = await supabase
        .from("community_comments")
        .select("post_id")
        .in("post_id", postIds);

      if (comments) {
        commentCounts = comments.reduce<Record<string, number>>((acc, c) => {
          acc[c.post_id] = (acc[c.post_id] || 0) + 1;
          return acc;
        }, {});
      }
    }

    const postsWithCounts = (posts ?? []).map((post) => ({
      ...post,
      comment_count: commentCounts[post.id] || 0,
    }));

    return NextResponse.json({ posts: postsWithCounts });
  } catch (error) {
    console.error("Community posts GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST — create a new community post (auth required, practitioner/admin)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["practitioner", "admin"].includes(profile.role)) {
      return NextResponse.json(
        { error: "Accès réservé aux praticiens" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, category } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Le contenu est requis" },
        { status: 400 }
      );
    }

    const validCategories = ["annonce", "ressource", "question", "evenement"];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Catégorie invalide" },
        { status: 400 }
      );
    }

    const { data: post, error: insertError } = await supabase
      .from("community_posts")
      .insert({
        author_id: user.id,
        title: title.trim(),
        content: content.trim(),
        category,
      })
      .select("id, title, category, created_at")
      .single();

    if (insertError) {
      console.error("Community post insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la création de la publication" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Community posts POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
