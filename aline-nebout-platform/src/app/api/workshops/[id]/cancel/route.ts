import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: workshopId } = await params;
    const body = await request.json();
    const { cancelToken } = body;

    if (!cancelToken) {
      return NextResponse.json(
        { error: "Le token d'annulation est requis" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Find booking by cancel_token
    const { data: booking, error: bookingError } = await supabase
      .from("workshop_bookings")
      .select("id, workshop_id, status")
      .eq("cancel_token", cancelToken)
      .eq("workshop_id", workshopId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Réservation introuvable" },
        { status: 404 }
      );
    }

    if (booking.status === "cancelled") {
      return NextResponse.json(
        { error: "Cette réservation est déjà annulée" },
        { status: 400 }
      );
    }

    // Cancel the booking
    const { error: cancelError } = await supabase
      .from("workshop_bookings")
      .update({ status: "cancelled" })
      .eq("id", booking.id);

    if (cancelError) {
      console.error("Booking cancel error:", cancelError);
      return NextResponse.json(
        { error: "Erreur lors de l'annulation" },
        { status: 500 }
      );
    }

    // Decrement workshop current_count
    const { data: workshop } = await supabase
      .from("workshops")
      .select("current_count, max_capacity, status")
      .eq("id", workshopId)
      .single();

    if (workshop) {
      const newCount = Math.max(0, workshop.current_count - 1);
      const updates: { current_count: number; status?: string } = {
        current_count: newCount,
      };

      // If workshop was full, set back to upcoming
      if (workshop.status === "full") {
        updates.status = "upcoming";
      }

      await supabase
        .from("workshops")
        .update(updates)
        .eq("id", workshopId);

      // Check waitlist and promote first person
      const { data: nextInLine } = await supabase
        .from("workshop_waitlist")
        .select("*")
        .eq("workshop_id", workshopId)
        .order("position", { ascending: true })
        .limit(1)
        .single();

      if (nextInLine) {
        // Create booking for waitlisted person
        const { error: promoteError } = await supabase
          .from("workshop_bookings")
          .insert({
            workshop_id: workshopId,
            guest_name: nextInLine.name,
            guest_email: nextInLine.email,
            status: "confirmed",
          });

        if (!promoteError) {
          // Remove from waitlist
          await supabase
            .from("workshop_waitlist")
            .delete()
            .eq("id", nextInLine.id);

          // Re-increment count since we promoted someone
          await supabase
            .from("workshops")
            .update({ current_count: newCount + 1 })
            .eq("id", workshopId);

          // If back at capacity, set to full again
          if (newCount + 1 >= workshop.max_capacity) {
            await supabase
              .from("workshops")
              .update({ status: "full" })
              .eq("id", workshopId);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop cancel API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
