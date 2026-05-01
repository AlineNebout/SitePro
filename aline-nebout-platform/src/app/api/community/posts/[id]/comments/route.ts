import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — list comments for a post
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
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

    const { data: comments, error } = await supabase
      .from("community_comments")
      .select(
        "id, post_id, author_id, content, created_at, profiles:author_id(full_name, email)"
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Comments fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des commentaires" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comments: comments ?? [] });
  } catch (error) {
    console.error("Comments GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST — add a comment to a post
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
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
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Le commentaire ne peut pas être vide" },
        { status: 400 }
      );
    }

    const { data: comment, error: insertError } = await supabase
      .from("community_comments")
      .insert({
        post_id: postId,
        author_id: user.id,
        content: content.trim(),
      })
      .select("id, content, created_at")
      .single();

    if (insertError) {
      console.error("Comment insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de l'ajout du commentaire" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error("Comments POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
