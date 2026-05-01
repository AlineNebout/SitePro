import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ programId: string }> }
) {
  const { programId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { exerciseId, completed } = body as {
    exerciseId: string;
    completed: boolean;
  };

  if (!exerciseId) {
    return NextResponse.json(
      { error: "exerciseId requis" },
      { status: 400 }
    );
  }

  // Verify the exercise belongs to the program
  const { data: exercise } = await supabase
    .from("exercises")
    .select("id")
    .eq("id", exerciseId)
    .eq("program_id", programId)
    .single();

  if (!exercise) {
    return NextResponse.json(
      { error: "Exercice introuvable dans ce programme" },
      { status: 404 }
    );
  }

  if (completed) {
    // Mark as complete (upsert to handle duplicates)
    const { error } = await supabase.from("exercise_completions").upsert(
      {
        exercise_id: exerciseId,
        user_id: user.id,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "exercise_id,user_id" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Remove completion
    const { error } = await supabase
      .from("exercise_completions")
      .delete()
      .eq("exercise_id", exerciseId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
