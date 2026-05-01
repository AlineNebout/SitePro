-- ============================================================
-- Exercise Programs Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Exercise programs (created by admin)
CREATE TABLE IF NOT EXISTS exercise_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Individual exercises within a program
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES exercise_programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  repetitions TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assignments: which user has which program
CREATE TABLE IF NOT EXISTS program_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES exercise_programs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(program_id, user_id)
);

-- Exercise completions: tracks when a user completes an exercise
CREATE TABLE IF NOT EXISTS exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(exercise_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_exercises_program_id ON exercises(program_id);
CREATE INDEX IF NOT EXISTS idx_program_assignments_user_id ON program_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_completions_user_id ON exercise_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_completions_exercise_id ON exercise_completions(exercise_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE exercise_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_completions ENABLE ROW LEVEL SECURITY;

-- exercise_programs: public read (so assigned users can see them)
CREATE POLICY "Anyone can read exercise programs"
  ON exercise_programs FOR SELECT
  USING (true);

-- exercise_programs: admin can insert/update/delete
CREATE POLICY "Admin can manage exercise programs"
  ON exercise_programs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- exercises: public read
CREATE POLICY "Anyone can read exercises"
  ON exercises FOR SELECT
  USING (true);

-- exercises: admin can manage
CREATE POLICY "Admin can manage exercises"
  ON exercises FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- program_assignments: users can read their own
CREATE POLICY "Users can read own assignments"
  ON program_assignments FOR SELECT
  USING (auth.uid() = user_id);

-- program_assignments: admin can manage all
CREATE POLICY "Admin can manage assignments"
  ON program_assignments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- exercise_completions: users can read/insert/delete their own
CREATE POLICY "Users can read own completions"
  ON exercise_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON exercise_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own completions"
  ON exercise_completions FOR DELETE
  USING (auth.uid() = user_id);

-- Admin can manage all completions
CREATE POLICY "Admin can manage completions"
  ON exercise_completions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
