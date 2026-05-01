import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
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

  // Get program
  const { data: program, error: programError } = await supabase
    .from("exercise_programs")
    .select("id, title, description")
    .eq("id", programId)
    .single();

  if (programError || !program) {
    return NextResponse.json(
      { error: "Programme introuvable" },
      { status: 404 }
    );
  }

  // Get exercises
  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, name, description, repetitions, sort_order")
    .eq("program_id", programId)
    .order("sort_order", { ascending: true });

  // Get completions for this user
  const exerciseIds = (exercises ?? []).map((e) => e.id);
  const { data: completions } = await supabase
    .from("exercise_completions")
    .select("exercise_id")
    .eq("user_id", user.id)
    .in("exercise_id", exerciseIds.length > 0 ? exerciseIds : ["__none__"]);

  const completedIds = (completions ?? []).map((c) => c.exercise_id);

  return NextResponse.json({
    program,
    exercises: exercises ?? [],
    completedIds,
  });
}
