import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — fetch own practitioner profile (auth required)
export async function GET() {
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

    const { data: profile, error } = await supabase
      .from("practitioner_profiles")
      .select(
        "id, user_id, first_name, last_name, profession, specialty, bio, phone, email, website_url, photo_url, slug, is_active"
      )
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Practitioner profile fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération du profil" },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile: profile ?? null });
  } catch (error) {
    console.error("Practitioner profile GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// PATCH — update own practitioner profile (auth required, RLS enforced)
export async function PATCH(request: Request) {
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

    const body = await request.json();

    // Only allow updating specific fields
    const allowedFields = [
      "first_name",
      "last_name",
      "profession",
      "specialty",
      "bio",
      "phone",
      "email",
      "website_url",
    ];

    const updates: Record<string, string> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Aucun champ à mettre à jour" },
        { status: 400 }
      );
    }

    // RLS enforces user_id = auth.uid(), so this is safe
    const { error: updateError } = await supabase
      .from("practitioner_profiles")
      .update(updates)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Practitioner profile update error:", updateError);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour du profil" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Practitioner profile PATCH API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
