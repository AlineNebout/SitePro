import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Get programs assigned to this user
  const { data: assignments, error: assignError } = await supabase
    .from("program_assignments")
    .select("id, assigned_at, program:exercise_programs(id, title, description)")
    .eq("user_id", user.id);

  if (assignError) {
    return NextResponse.json({ error: assignError.message }, { status: 500 });
  }

  // For each program, get exercise count and completion count
  const programsWithProgress = await Promise.all(
    (assignments ?? []).map(async (a) => {
      const program = Array.isArray(a.program) ? a.program[0] : a.program;
      if (!program) return null;

      const { count: totalCount } = await supabase
        .from("exercises")
        .select("id", { count: "exact", head: true })
        .eq("program_id", program.id);

      const { count: completedCount } = await supabase
        .from("exercise_completions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .in(
          "exercise_id",
          // subquery: get exercise IDs for this program
          (
            await supabase
              .from("exercises")
              .select("id")
              .eq("program_id", program.id)
          ).data?.map((e) => e.id) ?? []
        );

      return {
        id: program.id,
        title: program.title,
        description: program.description,
        totalExercises: totalCount ?? 0,
        completedExercises: completedCount ?? 0,
      };
    })
  );

  return NextResponse.json(
    programsWithProgress.filter(Boolean)
  );
}
