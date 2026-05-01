import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — admin only: fetch all testimonials including hidden
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

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("id, first_name, review_text, service_type, rating, is_published, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin testimonials fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des témoignages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Admin testimonials GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
