import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — admin only: fetch all practitioner profiles
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

    const { data: practitioners, error } = await supabase
      .from("practitioner_profiles")
      .select(
        "id, user_id, first_name, last_name, profession, specialty, bio, phone, email, website_url, photo_url, slug, is_active, created_at"
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Admin practitioners fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des praticiens" },
        { status: 500 }
      );
    }

    return NextResponse.json({ practitioners: practitioners ?? [] });
  } catch (error) {
    console.error("Admin practitioners GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
