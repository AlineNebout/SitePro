import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — admin only: fetch all community posts with author info
export async function GET() {
  try {
    const supabase = await createClient();

    // Check auth — admin only
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

    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Fetch all community posts with author profile info
    const { data: posts, error } = await supabase
      .from("community_posts")
      .select(
        "id, author_id, title, content, category, is_pinned, created_at, profiles:author_id(full_name, email)"
      )
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin community posts fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des publications" },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts: posts ?? [] });
  } catch (error) {
    console.error("Admin community GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
