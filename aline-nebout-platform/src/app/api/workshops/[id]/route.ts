import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: workshopId } = await params;
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

    // Delete related waitlist entries first
    await supabase
      .from("workshop_waitlist")
      .delete()
      .eq("workshop_id", workshopId);

    // Delete related bookings
    await supabase
      .from("workshop_bookings")
      .delete()
      .eq("workshop_id", workshopId);

    // Delete the workshop
    const { error: deleteError } = await supabase
      .from("workshops")
      .delete()
      .eq("id", workshopId);

    if (deleteError) {
      console.error("Workshop delete error:", deleteError);
      return NextResponse.json(
        { error: "Erreur lors de la suppression de l'atelier" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop DELETE API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
