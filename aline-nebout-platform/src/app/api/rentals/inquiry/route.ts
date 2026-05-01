import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rentalSpaceId, name, email, phone, desiredPeriod, message } = body;

    // Validate required fields
    if (!rentalSpaceId || !name || !email) {
      return NextResponse.json(
        { error: "Les champs obligatoires sont manquants" },
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

    // Verify rental space exists
    const { data: space, error: spaceError } = await supabase
      .from("rental_spaces")
      .select("id")
      .eq("id", rentalSpaceId)
      .single();

    if (spaceError || !space) {
      return NextResponse.json(
        { error: "Espace de location introuvable" },
        { status: 404 }
      );
    }

    const { error: insertError } = await supabase
      .from("rental_inquiries")
      .insert({
        rental_space_id: rentalSpaceId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        desired_period: desiredPeriod?.trim() || null,
        message: message?.trim() || "",
      });

    if (insertError) {
      console.error("Rental inquiry insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rental inquiry API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
