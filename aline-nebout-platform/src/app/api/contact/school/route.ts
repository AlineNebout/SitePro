import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { schoolName, contactName, email, phone, requestType, message } = body;

    // Validate required fields
    if (!schoolName || !contactName || !email || !requestType) {
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

    const validRequestTypes = ["information_session", "workshop", "screening"];
    if (!validRequestTypes.includes(requestType)) {
      return NextResponse.json(
        { error: "Type de demande invalide" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("school_inquiries")
      .insert({
        school_name: schoolName.trim(),
        contact_name: contactName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        request_type: requestType,
        message: message?.trim() || "",
      });

    if (insertError) {
      console.error("School inquiry insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("School contact API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
