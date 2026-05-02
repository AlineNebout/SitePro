import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
}

const CATEGORY_INTROS: Record<string, string> = {
  osteopathie:
    "En tant qu'ostéopathe D.O. diplômée depuis 2010, j'accompagne mes patients avec une approche douce et globale. ",
  reflexes:
    "Formée aux réflexes archaïques depuis 2024, j'accompagne enfants et adultes dans l'intégration de ces réflexes fondamentaux pour le développement. ",
  coaching:
    "Traileuse et triathlète, je propose des ateliers de coaching foulée pour optimiser votre course et prévenir les blessures. ",
};

const CATEGORY_EXPERTISE: Record<string, string> = {
  osteopathie: "ostéopathe",
  reflexes: "spécialiste des réflexes archaïques",
  coaching: "coach foulée et ostéopathe du sport",
};

const CATEGORY_CTA: Record<string, string> = {
  osteopathie:
    "N'hésitez pas à prendre rendez-vous sur Doctolib pour une consultation d'ostéopathie. Je vous accueille au Pôle Santé de Rochetaillée-sur-Saône, dans un cadre calme et bienveillant.",
  reflexes:
    "Si vous souhaitez en savoir plus ou faire un bilan des réflexes archaïques, n'hésitez pas à prendre rendez-vous. Je vous accueille au Pôle Santé de Rochetaillée-sur-Saône.",
  coaching:
    "Envie d'optimiser votre foulée ? Rejoignez un de mes ateliers de coaching foulée ! Consultez les prochaines dates sur le site ou contactez-moi directement.",
};

function generateArticle(topic: string, category: string): GeneratedArticle {
  const topicLower = topic.toLowerCase();
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);

  const title = `${topicCapitalized} : le point de vue d'une ${CATEGORY_EXPERTISE[category] ?? "ostéopathe"}`;
  const slug = generateSlug(title);

  const intro = CATEGORY_INTROS[category] ?? CATEGORY_INTROS.osteopathie;
  const cta = CATEGORY_CTA[category] ?? CATEGORY_CTA.osteopathie;

  const excerpt = `${intro}Découvrez dans cet article mon approche et mes conseils sur le sujet : ${topicLower}.`;

  const sections = generateSections(topicLower, category);

  const content = `## Introduction

${intro}Aujourd'hui, je souhaite aborder un sujet qui revient régulièrement en consultation : **${topicLower}**. C'est une thématique importante que je rencontre au quotidien dans ma pratique au Pôle Santé de Rochetaillée-sur-Saône.

Dans cet article, je vous propose de faire le point sur ce sujet, de comprendre les mécanismes en jeu et de découvrir comment une prise en charge adaptée peut vous aider.

${sections}

## Conclusion

${topicCapitalized} est un sujet qui mérite une attention particulière et une approche personnalisée. Chaque personne est unique, et c'est pourquoi je prends le temps d'écouter, d'observer et d'adapter ma prise en charge à vos besoins spécifiques.

${cta}

*Aline Nebout — Ostéopathe D.O., Pôle Santé de Rochetaillée-sur-Saône*`;

  return { title, slug, excerpt, content, category };
}

function generateSections(topic: string, category: string): string {
  if (category === "osteopathie") {
    return `## Comprendre ${topic}

Le corps humain est un ensemble complexe où chaque structure est interconnectée. Lorsqu'un déséquilibre s'installe, il peut se manifester de différentes manières. En ostéopathie, nous cherchons à identifier la cause profonde du problème plutôt que de simplement traiter les symptômes.

${topic} peut avoir des origines multiples : posturales, mécaniques, viscérales ou même émotionnelles. C'est pourquoi une approche globale est essentielle pour une prise en charge efficace.

## L'approche ostéopathique

Mon approche repose sur des techniques douces et non invasives. Lors de la première consultation, je réalise un bilan complet pour comprendre votre histoire, vos antécédents et vos habitudes de vie. Ce bilan me permet d'établir un plan de traitement personnalisé.

Les techniques que j'utilise incluent :
- Les manipulations articulaires douces
- Les techniques fasciales et tissulaires
- Le travail crânio-sacré
- Les techniques viscérales quand c'est nécessaire

## Conseils pratiques au quotidien

En complément des séances d'ostéopathie, voici quelques conseils que je donne régulièrement à mes patients :

1. **Écoutez votre corps** : la douleur est un signal d'alerte qu'il ne faut pas ignorer
2. **Bougez régulièrement** : l'activité physique adaptée est essentielle pour maintenir la mobilité
3. **Adoptez une bonne posture** : que ce soit au travail ou dans vos activités quotidiennes
4. **Hydratez-vous** : une bonne hydratation favorise la souplesse des tissus
5. **Gérez votre stress** : le stress a un impact direct sur les tensions musculaires

## Quand consulter ?

Je recommande de consulter un ostéopathe dès l'apparition des premiers signes de gêne ou de douleur. Plus la prise en charge est précoce, plus elle est efficace. N'attendez pas que la situation s'aggrave pour prendre rendez-vous.

Une consultation dure environ 45 minutes et coûte 65 €. Je suis disponible sur Doctolib pour faciliter la prise de rendez-vous.`;
  }

  if (category === "reflexes") {
    return `## Qu'est-ce que les réflexes archaïques ?

Les réflexes archaïques (ou réflexes primitifs) sont des mouvements automatiques présents dès la vie intra-utérine. Ils jouent un rôle fondamental dans le développement neurologique de l'enfant. Normalement, ces réflexes s'intègrent progressivement au cours des premières années de vie pour laisser place à des mouvements volontaires et coordonnés.

Lorsque certains réflexes ne s'intègrent pas correctement, cela peut entraîner des difficultés dans trois sphères : motrice, émotionnelle et cognitive.

## Le lien avec ${topic}

${topic} est directement lié au bon fonctionnement de notre système neurologique. Quand des réflexes archaïques restent actifs au-delà de l'âge normal, le corps doit compenser en permanence, ce qui mobilise une énergie considérable et peut se manifester par différents signes.

Chez l'enfant, on peut observer :
- Des difficultés de concentration et d'attention
- Une maladresse motrice ou des problèmes de coordination
- Des difficultés d'écriture ou de lecture
- Une hypersensibilité sensorielle ou émotionnelle
- De l'agitation ou au contraire un repli sur soi

Chez l'adulte, ces réflexes non intégrés peuvent se manifester par des tensions chroniques, du stress, des difficultés posturales ou des blocages émotionnels.

## Le bilan des réflexes archaïques

Le bilan est une étape essentielle. Il dure environ 45 minutes et permet d'identifier quels réflexes sont encore actifs et comment ils impactent le quotidien. Ce bilan est réalisé à travers des tests simples et non invasifs.

À l'issue du bilan, je propose un programme d'intégration personnalisé comprenant :
- Des séances en cabinet (environ toutes les 6 semaines)
- Des exercices simples à faire à la maison (5-10 minutes par jour)
- Un suivi régulier pour adapter le programme

## Témoignages et résultats

Les résultats de l'intégration des réflexes archaïques sont souvent remarquables. Les parents rapportent fréquemment des améliorations significatives en quelques semaines : meilleure concentration, écriture plus fluide, gestion des émotions facilitée, confiance en soi renforcée.

C'est un travail qui demande de la régularité, mais les bénéfices sont durables car on agit sur la cause profonde des difficultés.`;
  }

  // coaching
  return `## Pourquoi s'intéresser à sa foulée ?

La course à pied est un sport accessible à tous, mais courir de manière efficace et sans se blesser demande une attention particulière à sa technique. En tant que traileuse et triathlète, je sais à quel point la qualité de la foulée impacte les performances et la prévention des blessures.

${topic} est un aspect fondamental de la pratique de la course à pied que beaucoup de coureurs négligent.

## Mon approche du coaching foulée

Lors de mes ateliers "Optimiser Votre Foulée", je propose une analyse complète de votre technique de course. L'atelier se déroule en petit groupe (10-12 personnes maximum) sur l'esplanade de l'écluse de Rochetaillée, et dure environ 1h30 à 2h.

Le programme comprend :
- Une analyse vidéo de votre foulée actuelle
- Des exercices éducatifs pour améliorer votre posture
- Un travail sur la cadence et le placement du pied
- Des conseils personnalisés adaptés à votre morphologie et vos objectifs

## Les clés d'une bonne foulée

Voici les points essentiels que je travaille avec mes coureurs :

1. **La posture** : un alignement correct de la tête aux pieds est la base d'une foulée efficace
2. **La cadence** : augmenter légèrement sa cadence (nombre de pas par minute) réduit l'impact au sol
3. **L'attaque du pied** : privilégier une attaque médio-pied plutôt que talon
4. **Le relâchement** : courir détendu permet d'économiser de l'énergie
5. **La respiration** : synchroniser sa respiration avec sa foulée

## L'apport de l'ostéopathie pour les coureurs

En tant qu'ostéopathe et coach foulée, j'ai une vision unique de la biomécanique du coureur. Les restrictions de mobilité articulaire, les tensions musculaires ou les déséquilibres posturaux peuvent directement impacter la qualité de votre foulée.

C'est pourquoi je propose une approche complémentaire : le coaching foulée pour optimiser votre technique, et l'ostéopathie pour lever les blocages mécaniques qui limitent votre potentiel.

## Rejoindre un atelier

Les ateliers sont ouverts à tous les niveaux, du débutant au coureur confirmé. Le tarif est libre (espèces, chèques ou Wero). Plus de 80 coureurs ont déjà participé lors de la première saison !`;
}

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
    const { topic, category } = body;

    if (!topic?.trim()) {
      return NextResponse.json(
        { error: "Le sujet est requis" },
        { status: 400 }
      );
    }

    const validCategories = ["osteopathie", "reflexes", "coaching"];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Catégorie invalide" },
        { status: 400 }
      );
    }

    const article = generateArticle(topic.trim(), category);

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Blog generate API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
