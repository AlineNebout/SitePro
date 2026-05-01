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

    // Fetch all workshops (all statuses)
    const { data: workshops, error } = await supabase
      .from("workshops")
      .select("id, date, time_display, location, max_capacity, current_count, status, notes, created_at")
      .order("date", { ascending: false });

    if (error) {
      console.error("Admin workshops fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des ateliers" },
        { status: 500 }
      );
    }

    return NextResponse.json({ workshops });
  } catch (error) {
    console.error("Admin workshops GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
