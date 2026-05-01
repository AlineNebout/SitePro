import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// PATCH — admin only: update inquiry status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { status } = body;

    const validStatuses = ["nouveau", "contacté", "confirmé"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Statut invalide. Valeurs acceptées : nouveau, contacté, confirmé" },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase
      .from("rental_inquiries")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.error("Rental inquiry update error:", updateError);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rental inquiry PATCH API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE — admin only: delete a rental inquiry
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { error: deleteError } = await supabase
      .from("rental_inquiries")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Rental inquiry delete error:", deleteError);
      return NextResponse.json(
        { error: "Erreur lors de la suppression" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rental inquiry DELETE API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
