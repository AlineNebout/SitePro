import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — public: fetch published testimonials
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("id, first_name, review_text, service_type, rating, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Testimonials fetch error:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des témoignages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Testimonials GET API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST — admin only: create a new testimonial
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
    const { firstName, reviewText, serviceType, rating, isPublished } = body;

    if (!firstName || !reviewText || !serviceType) {
      return NextResponse.json(
        { error: "Le nom, le texte et le service sont requis" },
        { status: 400 }
      );
    }

    const validServices = ["osteopathie", "reflexes", "coaching"];
    if (!validServices.includes(serviceType)) {
      return NextResponse.json(
        { error: "Type de service invalide" },
        { status: 400 }
      );
    }

    const { data: testimonial, error: insertError } = await supabase
      .from("testimonials")
      .insert({
        first_name: firstName.trim(),
        review_text: reviewText.trim(),
        service_type: serviceType,
        rating: rating ?? 5,
        is_published: isPublished ?? true,
      })
      .select("id, first_name, review_text, service_type, rating, is_published, created_at")
      .single();

    if (insertError) {
      console.error("Testimonial insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la création du témoignage" },
        { status: 500 }
      );
    }

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error("Testimonials POST API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
