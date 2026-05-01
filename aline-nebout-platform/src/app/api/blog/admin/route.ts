import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    // Fetch all articles (including drafts)
    const { data: articles, error } = await supabase
      .from("blog_articles")
      .select(
        "id, title, slug, excerpt, content, category, featured_image_url, is_published, published_at, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin blog articles fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des articles" },
        { status: 500 }
      );
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Admin blog GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
