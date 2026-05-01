import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — public: fetch available rental spaces
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: spaces, error } = await supabase
      .from("rental_spaces")
      .select("id, name, description, status, tenant_name, tenant_profession, since_date, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Rental spaces fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des espaces" },
        { status: 500 }
      );
    }

    return NextResponse.json({ spaces: spaces ?? [] });
  } catch (error) {
    console.error("Rental spaces GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST — admin only: create a new rental space
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
    const { name, description, status, tenantName, tenantProfession, sinceDate } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Le nom de l'espace est requis" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("rental_spaces")
      .insert({
        name: name.trim(),
        description: description?.trim() || "",
        status: status || "available",
        tenant_name: tenantName?.trim() || null,
        tenant_profession: tenantProfession?.trim() || null,
        since_date: sinceDate?.trim() || null,
      });

    if (insertError) {
      console.error("Rental space insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la création de l'espace" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rental spaces POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
