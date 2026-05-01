import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: workshopId } = await params;
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Le nom et l'email sont requis" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check workshop exists and get capacity info
    const { data: workshop, error: workshopError } = await supabase
      .from("workshops")
      .select("id, max_capacity, current_count, status")
      .eq("id", workshopId)
      .single();

    if (workshopError || !workshop) {
      return NextResponse.json(
        { error: "Atelier introuvable" },
        { status: 404 }
      );
    }

    if (workshop.status === "cancelled" || workshop.status === "completed") {
      return NextResponse.json(
        { error: "Cet atelier n'est plus disponible" },
        { status: 400 }
      );
    }

    // Check if workshop is full
    if (workshop.current_count >= workshop.max_capacity) {
      // Add to waitlist
      // Get current max position
      const { data: lastWaitlist } = await supabase
        .from("workshop_waitlist")
        .select("position")
        .eq("workshop_id", workshopId)
        .order("position", { ascending: false })
        .limit(1)
        .single();

      const nextPosition = (lastWaitlist?.position ?? 0) + 1;

      const { error: waitlistError } = await supabase
        .from("workshop_waitlist")
        .insert({
          workshop_id: workshopId,
          email: email.toLowerCase().trim(),
          name: name.trim(),
          position: nextPosition,
        });

      if (waitlistError) {
        console.error("Waitlist insert error:", waitlistError);
        return NextResponse.json(
          { error: "Erreur lors de l'inscription en liste d'attente" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        waitlisted: true,
        position: nextPosition,
      });
    }

    // Workshop has space — create booking
    const { error: bookingError } = await supabase
      .from("workshop_bookings")
      .insert({
        workshop_id: workshopId,
        guest_name: name.trim(),
        guest_email: email.toLowerCase().trim(),
        guest_phone: phone?.trim() || null,
        message: message?.trim() || null,
        status: "confirmed",
      });

    if (bookingError) {
      console.error("Booking insert error:", bookingError);
      return NextResponse.json(
        { error: "Erreur lors de l'inscription" },
        { status: 500 }
      );
    }

    // Increment current_count
    const { error: updateError } = await supabase
      .from("workshops")
      .update({ current_count: workshop.current_count + 1 })
      .eq("id", workshopId);

    if (updateError) {
      console.error("Workshop count update error:", updateError);
    }

    // Update status to 'full' if now at capacity
    if (workshop.current_count + 1 >= workshop.max_capacity) {
      await supabase
        .from("workshops")
        .update({ status: "full" })
        .eq("id", workshopId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop register API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
