import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: workshops, error } = await supabase
      .from("workshops")
      .select("id, date, time_display, location, max_capacity, current_count, status, notes, created_at")
      .eq("status", "upcoming")
      .order("date", { ascending: true });

    if (error) {
      console.error("Workshops fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des ateliers" },
        { status: 500 }
      );
    }

    return NextResponse.json({ workshops });
  } catch (error) {
    console.error("Workshops GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    // Check admin role
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

    const body = await request.json();
    const { date, timeDisplay, location, maxCapacity, notes } = body;

    // Validate required fields
    if (!date) {
      return NextResponse.json(
        { error: "La date est requise" },
        { status: 400 }
      );
    }

    const { data: workshop, error: insertError } = await supabase
      .from("workshops")
      .insert({
        date,
        time_display: timeDisplay || "18h20",
        location: location || "Esplanade de l'écluse de Rochetaillée",
        max_capacity: maxCapacity || 12,
        notes: notes || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Workshop insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la création de l'atelier" },
        { status: 500 }
      );
    }

    return NextResponse.json({ workshop }, { status: 201 });
  } catch (error) {
    console.error("Workshops POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
