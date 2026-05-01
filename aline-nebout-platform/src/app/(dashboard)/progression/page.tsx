"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StatsCards from "@/components/dashboard/StatsCards";
import ProgressChart from "@/components/dashboard/ProgressChart";
import type { ProgressDataPoint } from "@/components/dashboard/ProgressChart";

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export default function ProgressionPage() {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [activeWeeks, setActiveWeeks] = useState(0);
  const [chartData, setChartData] = useState<ProgressDataPoint[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Count completed workshop sessions
      const { count: sessionsCount } = await supabase
        .from("workshop_bookings")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "confirmed");

      setTotalSessions(sessionsCount ?? 0);

      // Count completed exercises
      const { data: completions } = await supabase
        .from("exercise_completions")
        .select("id, completed_at, exercise:exercises(name, program_id)")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: true });

      const completionsList = completions ?? [];
      setTotalExercises(completionsList.length);

      // Calculate active weeks (distinct weeks with activity)
      const weekSet = new Set<string>();
      for (const c of completionsList) {
        const d = new Date(c.completed_at);
        // ISO week key: year-weekNumber
        const startOfYear = new Date(d.getFullYear(), 0, 1);
        const weekNum = Math.ceil(
          ((d.getTime() - startOfYear.getTime()) / 86400000 +
            startOfYear.getDay() +
            1) /
            7
        );
        weekSet.add(`${d.getFullYear()}-W${weekNum}`);
      }
      // Also count weeks with sessions
      const { data: bookings } = await supabase
        .from("workshop_bookings")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("status", "confirmed");

      for (const b of bookings ?? []) {
        const d = new Date(b.created_at);
        const startOfYear = new Date(d.getFullYear(), 0, 1);
        const weekNum = Math.ceil(
          ((d.getTime() - startOfYear.getTime()) / 86400000 +
            startOfYear.getDay() +
            1) /
            7
        );
        weekSet.add(`${d.getFullYear()}-W${weekNum}`);
      }
      setActiveWeeks(weekSet.size);

      // Build chart data: group completions by date, calculate cumulative rate
      // Get total exercises assigned to user
      const { data: assignments } = await supabase
        .from("program_assignments")
        .select("program_id")
        .eq("user_id", user.id);

      const programIds = (assignments ?? []).map((a) => a.program_id);
      let totalAssignedExercises = 0;
      if (programIds.length > 0) {
        const { count } = await supabase
          .from("exercises")
          .select("id", { count: "exact", head: true })
          .in("program_id", programIds);
        totalAssignedExercises = count ?? 0;
      }

      if (totalAssignedExercises > 0 && completionsList.length > 0) {
        // Group by date
        const dateMap = new Map<string, number>();
        let cumulative = 0;
        for (const c of completionsList) {
          const dateKey = new Date(c.completed_at)
            .toISOString()
            .split("T")[0];
          cumulative++;
          dateMap.set(dateKey, cumulative);
        }

        const points: ProgressDataPoint[] = [];
        for (const [date, count] of dateMap) {
          points.push({
            date,
            completionRate: Math.round((count / totalAssignedExercises) * 100),
          });
        }
        setChartData(points);
      }

      // Build timeline from recent completions and bookings
      const timelineEntries: TimelineEntry[] = [];

      // Add recent completions
      const recentCompletions = completionsList.slice(-5).reverse();
      for (const c of recentCompletions) {
        const exercise = Array.isArray(c.exercise)
          ? c.exercise[0]
          : c.exercise;
        timelineEntries.push({
          date: new Date(c.completed_at).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          title: `Exercice complété : ${exercise?.name ?? "Exercice"}`,
          description: "Exercice terminé avec succès.",
        });
      }

      // Add recent bookings
      const { data: recentBookings } = await supabase
        .from("workshop_bookings")
        .select(
          "created_at, workshop:workshops(date, time_display, location)"
        )
        .eq("user_id", user.id)
        .eq("status", "confirmed")
        .order("created_at", { ascending: false })
        .limit(3);

      for (const b of recentBookings ?? []) {
        const ws = Array.isArray(b.workshop) ? b.workshop[0] : b.workshop;
        timelineEntries.push({
          date: new Date(b.created_at).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          title: "Séance coaching foulée",
          description: ws
            ? `${ws.time_display} — ${ws.location}`
            : "Atelier de coaching foulée",
        });
      }

      setTimeline(timelineEntries);
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-7 bg-emerald-100 rounded w-1/3 mb-2" />
          <div className="h-4 bg-emerald-50 rounded w-1/2 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-white/70 rounded-2xl border border-emerald-100"
              />
            ))}
          </div>
          <div className="h-64 bg-white/70 rounded-2xl border border-emerald-100" />
        </div>
      </div>
    );
  }

  const hasEnoughData = chartData.length >= 2;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            Ma progression
          </h1>
          <p className="text-text-muted mt-1">
            Suivez votre évolution et restez motivé
          </p>
        </div>
      </ScrollReveal>

      {/* Stats cards */}
      <ScrollReveal delay={0.1}>
        <StatsCards
          totalSessions={totalSessions}
          totalExercises={totalExercises}
          activeWeeks={activeWeeks}
        />
      </ScrollReveal>

      {/* Chart or encouragement */}
      <ScrollReveal delay={0.3}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-8">
          <h2 className="font-heading text-lg text-text-dark mb-4">
            Graphique de progression
          </h2>
          {hasEnoughData ? (
            <ProgressChart data={chartData} />
          ) : (
            <div className="flex items-center justify-center h-48 bg-emerald-50/50 rounded-xl border-2 border-dashed border-emerald-200">
              <div className="text-center">
                <svg
                  className="w-10 h-10 text-emerald-300 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0116.5 19.875V4.125z"
                  />
                </svg>
                <p className="text-sm text-emerald-500 font-medium">
                  Complétez quelques exercices pour voir votre courbe de
                  progression
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Activity timeline */}
      <ScrollReveal delay={0.4}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-8">
          <h2 className="font-heading text-lg text-text-dark mb-6">
            Historique d&apos;activité
          </h2>
          {timeline.length > 0 ? (
            <div className="space-y-0">
              {timeline.map((entry, index) => (
                <div
                  key={index}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {/* Timeline line */}
                  {index < timeline.length - 1 && (
                    <div
                      className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-emerald-200"
                      aria-hidden="true"
                    />
                  )}
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 -mt-0.5">
                    <time className="text-xs text-text-muted font-medium">
                      {entry.date}
                    </time>
                    <h3 className="text-sm font-semibold text-text-dark mt-0.5">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm text-center py-4">
              Aucune activité enregistrée pour le moment. Commencez par
              compléter des exercices ou réserver un atelier.
            </p>
          )}
        </div>
      </ScrollReveal>

      {/* Encouragement */}
      <ScrollReveal delay={0.5}>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-6 sm:p-8 text-center">
          <svg
            className="w-10 h-10 text-emerald-500 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <h2 className="font-heading text-xl text-text-dark mb-2">
            Continuez comme ça !
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            La régularité est la clé de la progression. Chaque séance vous
            rapproche de vos objectifs. Pensez à pratiquer vos exercices 2 à 3
            fois par semaine pour des résultats optimaux.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
