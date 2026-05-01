import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — admin only: fetch all rental spaces + inquiries
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

    // Fetch all rental spaces
    const { data: spaces, error: spacesError } = await supabase
      .from("rental_spaces")
      .select("id, name, description, status, tenant_name, tenant_profession, since_date, created_at")
      .order("created_at", { ascending: true });

    if (spacesError) {
      console.error("Admin rental spaces fetch error:", spacesError);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des espaces" },
        { status: 500 }
      );
    }

    // Fetch all rental inquiries
    const { data: inquiries, error: inquiriesError } = await supabase
      .from("rental_inquiries")
      .select("id, name, profession, email, phone, message, status, created_at")
      .order("created_at", { ascending: false });

    if (inquiriesError) {
      console.error("Admin rental inquiries fetch error:", inquiriesError);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des demandes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ spaces: spaces ?? [], inquiries: inquiries ?? [] });
  } catch (error) {
    console.error("Admin rentals GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
