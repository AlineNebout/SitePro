import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: articles, error } = await supabase
      .from("blog_articles")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        featured_image_url,
        is_published,
        published_at,
        created_at,
        updated_at,
        author:profiles!author_id (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Blog articles fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des articles" },
        { status: 500 }
      );
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Blog GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check auth — admin or practitioner
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    // Check role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "practitioner"].includes(profile.role)) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, slug, excerpt, content, category, featuredImageUrl, isPublished } = body;

    // Validate required fields
    if (!title || !slug || !category) {
      return NextResponse.json(
        { error: "Le titre, le slug et la catégorie sont requis" },
        { status: 400 }
      );
    }

    const validCategories = ["osteopathie", "reflexes", "coaching"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Catégorie invalide" },
        { status: 400 }
      );
    }

    const { data: article, error: insertError } = await supabase
      .from("blog_articles")
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt?.trim() || "",
        content: content?.trim() || "",
        category,
        featured_image_url: featuredImageUrl || null,
        is_published: isPublished ?? false,
        author_id: user.id,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        category,
        is_published,
        published_at,
        created_at,
        author:profiles!author_id (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .single();

    if (insertError) {
      console.error("Blog article insert error:", insertError);

      // Handle unique slug constraint
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Ce slug est déjà utilisé" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Erreur lors de la création de l'article" },
        { status: 500 }
      );
    }

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error("Blog POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
