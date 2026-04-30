import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ExerciseList from "@/components/dashboard/ExerciseList";
import ScrollReveal from "@/components/animation/ScrollReveal";
import type { Exercise } from "@/components/dashboard/ExerciseList";

// TODO: Replace with data from Supabase
const programsData: Record<
  string,
  {
    title: string;
    description: string;
    exercises: Exercise[];
    initialCompletions: string[];
  }
> = {
  "programme-foulee-s1": {
    title: "Programme foulée — Semaine 1",
    description:
      "Exercices de base pour améliorer votre posture de course et votre cadence. Travaillez chaque exercice à votre rythme, en vous concentrant sur la qualité du mouvement.",
    exercises: [
      {
        id: "ex-1",
        name: "Éducatif montées de genoux",
        description:
          "Montées de genoux dynamiques sur place, en gardant le buste droit et les bras actifs.",
        repetitions: "3 × 30 secondes",
      },
      {
        id: "ex-2",
        name: "Talons-fesses",
        description:
          "Talons-fesses en avançant lentement, en veillant à garder les genoux alignés.",
        repetitions: "3 × 30 secondes",
      },
      {
        id: "ex-3",
        name: "Griffé du pied",
        description:
          "Exercice de griffé pour travailler l'attaque du pied au sol et la réactivité.",
        repetitions: "3 × 20 mètres",
      },
      {
        id: "ex-4",
        name: "Foulées bondissantes",
        description:
          "Foulées amples et bondissantes en poussant bien sur la jambe arrière.",
        repetitions: "3 × 30 mètres",
      },
      {
        id: "ex-5",
        name: "Course en ligne droite — focus posture",
        description:
          "Course à allure modérée en se concentrant sur le placement du bassin et le regard loin devant.",
        repetitions: "4 × 100 mètres",
      },
    ],
    initialCompletions: ["ex-1", "ex-2", "ex-3"],
  },
  "renforcement-musculaire-coureur": {
    title: "Renforcement musculaire coureur",
    description:
      "Programme de renforcement ciblé pour les muscles sollicités en course à pied. Réalisez les exercices 2 à 3 fois par semaine, en respectant les temps de repos.",
    exercises: [
      {
        id: "rm-1",
        name: "Squats",
        description:
          "Squats classiques, pieds largeur d'épaules, descente contrôlée jusqu'à 90°.",
        repetitions: "3 × 15 répétitions",
      },
      {
        id: "rm-2",
        name: "Fentes avant alternées",
        description:
          "Fentes avant en alternant les jambes, genou arrière frôlant le sol.",
        repetitions: "3 × 12 par jambe",
      },
      {
        id: "rm-3",
        name: "Pont fessier",
        description:
          "Allongé sur le dos, pieds au sol, montée du bassin en contractant les fessiers.",
        repetitions: "3 × 20 répétitions",
      },
      {
        id: "rm-4",
        name: "Gainage planche",
        description:
          "Position de planche sur les avant-bras, corps aligné, abdominaux engagés.",
        repetitions: "3 × 45 secondes",
      },
      {
        id: "rm-5",
        name: "Gainage latéral",
        description:
          "Planche latérale sur un avant-bras, hanches hautes et alignées.",
        repetitions: "3 × 30 secondes par côté",
      },
      {
        id: "rm-6",
        name: "Mollets sur marche",
        description:
          "Montées sur pointes sur le bord d'une marche, descente lente sous l'horizontale.",
        repetitions: "3 × 20 répétitions",
      },
      {
        id: "rm-7",
        name: "Chaise murale",
        description:
          "Dos contre le mur, cuisses parallèles au sol, maintien statique.",
        repetitions: "3 × 40 secondes",
      },
      {
        id: "rm-8",
        name: "Step-ups",
        description:
          "Montées sur une marche ou un banc en alternant les jambes, poussée complète.",
        repetitions: "3 × 12 par jambe",
      },
    ],
    initialCompletions: ["rm-1", "rm-2"],
  },
};

export function generateStaticParams() {
  return Object.keys(programsData).map((programId) => ({ programId }));
}

type Props = {
  params: Promise<{ programId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programId } = await params;
  const program = programsData[programId];
  return {
    title: program?.title ?? "Programme d'exercices",
    description:
      program?.description ?? "Détail du programme d'exercices personnalisé.",
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { programId } = await params;
  const program = programsData[programId];

  if (!program) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="font-heading text-2xl text-text-dark mb-2">
          Programme introuvable
        </h1>
        <p className="text-text-muted">
          Ce programme n&apos;existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  const completedCount = program.initialCompletions.length;
  const totalCount = program.exercises.length;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumb
        items={[
          { label: "Exercices", href: "/exercices" },
          { label: program.title },
        ]}
      />

      <ScrollReveal>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-text-dark">
            {program.title}
          </h1>
          <p className="text-text-muted mt-2">{program.description}</p>
          <p className="text-sm text-emerald-600 font-medium mt-3">
            {completedCount} sur {totalCount} exercices complétés ({percentage}%)
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <ExerciseList
          exercises={program.exercises}
          initialCompletions={program.initialCompletions}
        />
      </ScrollReveal>
    </div>
  );
}
