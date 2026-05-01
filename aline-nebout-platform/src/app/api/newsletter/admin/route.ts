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

    // Fetch all subscribers
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, source, gdpr_consent, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin newsletter fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des abonnés" },
        { status: 500 }
      );
    }

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Admin newsletter GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "L'identifiant est requis" },
        { status: 400 }
      );
    }

    const { error: deleteError } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Newsletter subscriber delete error:", deleteError);
      return NextResponse.json(
        { error: "Erreur lors de la suppression" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter DELETE API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
