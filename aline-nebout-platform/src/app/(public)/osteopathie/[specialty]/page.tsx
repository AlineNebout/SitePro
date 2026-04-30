import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import DoctolibButton from "@/components/booking/DoctolibButton";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface SpecialtyData {
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl: string;
  imageAlt: string;
  description: string[];
  indications: string[];
  treatmentApproach: string;
}

const specialties: Record<string, SpecialtyData> = {
  generale: {
    title: "Ostéopathie générale",
    slug: "generale",
    metaDescription:
      "Ostéopathie générale à Rochetaillée-sur-Saône : douleurs de dos, maux de tête, troubles digestifs, séquelles de traumatismes. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    imageAlt:
      "Séance d'ostéopathie générale — manipulation douce du dos",
    description: [
      "L'ostéopathie générale s'adresse à tous, du nourrisson à la personne âgée. Elle repose sur des techniques manuelles douces visant à restaurer la mobilité des différentes structures du corps : articulations, muscles, fascias et viscères. Aline Nebout vous accompagne pour soulager les douleurs de dos, les maux de tête, les troubles digestifs ou encore les séquelles de traumatismes anciens.",
      "Chaque consultation débute par un bilan complet afin de comprendre l'origine de vos douleurs. L'approche est globale : plutôt que de traiter uniquement le symptôme, Aline recherche les déséquilibres qui en sont la cause. Les techniques utilisées sont adaptées à chaque patient et à chaque situation.",
      "En prévention, il est recommandé de consulter un ostéopathe une à deux fois par an, même en l'absence de douleur. Ces bilans réguliers permettent de détecter et corriger les tensions avant qu'elles ne deviennent douloureuses, contribuant ainsi à maintenir un bon équilibre corporel au quotidien.",
    ],
    indications: [
      "Douleurs de dos (lombalgies, dorsalgies, cervicalgies)",
      "Maux de tête et migraines",
      "Troubles digestifs (ballonnements, reflux, constipation)",
      "Séquelles de traumatismes (entorses, chutes, accidents)",
      "Troubles musculo-squelettiques (tendinites, douleurs articulaires)",
      "Troubles du sommeil",
      "Fatigue chronique",
      "Bilan préventif annuel",
    ],
    treatmentApproach:
      "La séance dure environ 45 minutes. Après un interrogatoire détaillé et un examen clinique, Aline utilise des techniques structurelles, fonctionnelles, crâniennes et viscérales adaptées à vos besoins. L'objectif est de redonner de la mobilité aux zones en restriction et de permettre au corps de retrouver son équilibre naturel.",
  },
  "femme-enceinte": {
    title: "Femme enceinte & jeune maman",
    slug: "femme-enceinte",
    metaDescription:
      "Ostéopathie pour femme enceinte et jeune maman à Rochetaillée-sur-Saône : grossesse, préparation accouchement, post-partum. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=600&fit=crop",
    imageAlt:
      "Femme enceinte lors d'une séance d'ostéopathie douce",
    description: [
      "La grossesse entraîne d'importantes modifications morphologiques et physiologiques. Le corps de la femme enceinte s'adapte en permanence pour accueillir bébé, ce qui peut générer des douleurs articulaires, des lombalgies, des sciatiques, des troubles digestifs, circulatoires ou nerveux. L'ostéopathie permet d'accompagner ces transformations en douceur et de soulager les inconforts liés à chaque trimestre.",
      "Aline Nebout propose également un travail de préparation à l'accouchement axé sur la liberté du bassin. En libérant les tensions du bassin, du périnée et du diaphragme, l'ostéopathie favorise un accouchement plus physiologique. Après la naissance, un bilan post-accouchement est recommandé pour vérifier l'équilibre du bassin et accompagner la reprise du corps, y compris en cas de difficultés d'allaitement.",
      "Aline travaille en étroite collaboration avec Sophie Pierre, sage-femme à Fontaines-sur-Saône, pour offrir un suivi complémentaire et cohérent tout au long de la grossesse et du post-partum.",
    ],
    indications: [
      "Douleurs lombaires et sciatiques de grossesse",
      "Douleurs articulaires liées aux modifications morphologiques",
      "Troubles digestifs (nausées, reflux, constipation)",
      "Troubles circulatoires (jambes lourdes, œdèmes)",
      "Troubles du sommeil et nervosité",
      "Préparation à l'accouchement (liberté du bassin)",
      "Bilan post-accouchement",
      "Difficultés d'allaitement",
    ],
    treatmentApproach:
      "Les techniques utilisées sont exclusivement douces et adaptées à la grossesse. Aline travaille sur le bassin, le diaphragme, la colonne vertébrale et les viscères pour soulager les tensions et préparer le corps à l'accouchement. La collaboration avec Sophie Pierre, sage-femme, permet un accompagnement global et personnalisé.",
  },
  "nourrisson-enfant": {
    title: "Nourrisson & enfant",
    slug: "nourrisson-enfant",
    metaDescription:
      "Ostéopathie pour nourrisson et enfant à Rochetaillée-sur-Saône : torticolis, coliques, sommeil, déformation crânienne, croissance. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop",
    imageAlt:
      "Ostéopathie douce pour nourrisson — manipulation crânienne",
    description: [
      "Lors de l'accouchement, le nourrisson subit des pressions importantes au niveau du bassin maternel. Les os du crâne et du bassin du bébé, encore malléables, peuvent garder la mémoire de ces contraintes. Un bilan ostéopathique dans les premières semaines de vie permet de vérifier que tout est en place et de corriger d'éventuelles tensions, notamment après un accouchement difficile (forceps, ventouses, césarienne), trop long ou trop rapide, ou en cas de prématurité.",
      "Les motifs de consultation les plus fréquents chez le nourrisson sont les crispations, les pleurs inexpliqués, les troubles du sommeil, les régurgitations, les coliques, le torticolis congénital et les déformations crâniennes (plagiocéphalie). L'ostéopathie utilise des techniques très douces, adaptées à la fragilité du tout-petit, pour libérer les tensions et favoriser un développement harmonieux.",
      "Chez l'enfant et l'adolescent, l'ostéopathie accompagne les grandes étapes de la croissance : apprentissage de la marche, poussées de croissance, pratique sportive, scoliose, suivi orthodontique et gestion du stress scolaire. Un suivi régulier permet de prévenir les déséquilibres et d'accompagner le développement de l'enfant dans les meilleures conditions.",
    ],
    indications: [
      "Accouchement difficile (forceps, ventouses, césarienne)",
      "Accouchement trop long ou trop rapide",
      "Prématurité",
      "Crispations et pleurs inexpliqués",
      "Troubles du sommeil",
      "Régurgitations et coliques",
      "Torticolis congénital",
      "Déformation crânienne (plagiocéphalie)",
      "Chutes et traumatismes",
      "Troubles de la marche et de la croissance",
      "Scoliose et suivi orthodontique",
      "Stress scolaire (enfant et adolescent)",
    ],
    treatmentApproach:
      "Les techniques sont exclusivement douces et non invasives, adaptées à l'âge et à la morphologie de l'enfant. Aline travaille principalement sur le crâne, le bassin et la colonne vertébrale du nourrisson avec des pressions très légères. Chez l'enfant plus grand, les techniques s'adaptent pour accompagner la croissance et corriger les déséquilibres posturaux.",
  },
  "somato-emotionnel": {
    title: "Somato-émotionnel & stress",
    slug: "somato-emotionnel",
    metaDescription:
      "Ostéopathie somato-émotionnelle à Rochetaillée-sur-Saône : gestion du stress, émotions, anxiété, chocs émotionnels. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    imageAlt:
      "Séance de relaxation et gestion du stress par l'ostéopathie",
    description: [
      "Le corps garde la mémoire des émotions vécues. Lorsqu'un choc émotionnel n'est pas pleinement exprimé ou digéré, il peut s'enkyster dans les tissus sous forme de « kystes d'énergie ». En ostéopathie somato-émotionnelle, on considère que chaque organe est lié à une émotion : le rein à la peur, le foie à la colère, le cœur à l'affectif et le poumon à la nostalgie. Ces tensions émotionnelles peuvent se manifester par des douleurs physiques chroniques.",
      "L'approche somato-émotionnelle est douce et non intrusive. Aline utilise des techniques d'écoute tissulaire pour identifier les zones de tension liées aux émotions et les libérer progressivement. Il ne s'agit pas de psychothérapie, mais d'un travail corporel qui permet au corps de relâcher ce qu'il retient.",
      "Le stress se manifeste en trois stades : l'alarme (réaction immédiate), la résistance (adaptation du corps) et l'épuisement (décompensation). L'ostéopathie agit sur la régulation du système neuro-végétatif pour aider le corps à sortir de l'état de stress chronique, retrouver un meilleur sommeil, une digestion apaisée et un état émotionnel plus stable.",
    ],
    indications: [
      "Stress chronique et anxiété",
      "Chocs émotionnels (deuil, séparation, traumatisme)",
      "Troubles du sommeil liés au stress",
      "Douleurs chroniques sans cause organique identifiée",
      "Troubles digestifs d'origine nerveuse",
      "Oppression thoracique et difficultés respiratoires",
      "Fatigue nerveuse et épuisement",
      "Bruxisme et tensions de la mâchoire",
    ],
    treatmentApproach:
      "La séance repose sur des techniques d'écoute tissulaire et de relâchement myofascial. Aline travaille sur le système neuro-végétatif (sympathique et parasympathique) pour rétablir l'équilibre entre tension et relâchement. L'approche est progressive, douce et respectueuse du rythme de chaque patient.",
  },
  cicatrices: {
    title: "Cicatrices",
    slug: "cicatrices",
    metaDescription:
      "Traitement ostéopathique des cicatrices à Rochetaillée-sur-Saône : adhérences post-chirurgicales, césarienne, appendicectomie. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop",
    imageAlt:
      "Traitement ostéopathique des cicatrices et adhérences",
    description: [
      "Toute cicatrice, qu'elle soit chirurgicale ou traumatique, peut créer des adhérences dans les tissus sous-jacents. Ces adhérences perturbent la mobilité des fascias et peuvent avoir des répercussions à distance : une cicatrice de césarienne peut entraîner des douleurs dorso-lombaires, une cicatrice d'appendicectomie peut provoquer des sciatalgies, une cicatrice de péridurale peut être à l'origine de cervicalgies, et une cicatrice de thyroïde peut impacter la mobilité cervicale.",
      "Les adhérences cicatricielles peuvent également avoir un impact sur les viscères voisins, perturbant leur mobilité et leur fonctionnement. C'est pourquoi il est important de traiter les cicatrices en ostéopathie, même des années après l'intervention chirurgicale. Les résultats sont souvent surprenants, tant sur la souplesse de la cicatrice que sur les douleurs associées.",
      "Il est recommandé de consulter trois à quatre semaines après la guérison complète de la cicatrice, une fois que la peau est bien refermée. Le traitement peut également être réalisé sur des cicatrices anciennes, car les adhérences persistent dans le temps si elles ne sont pas traitées.",
    ],
    indications: [
      "Cicatrice de césarienne",
      "Cicatrice d'appendicectomie",
      "Cicatrice de péridurale",
      "Cicatrice de thyroïde",
      "Douleurs dorso-lombaires post-chirurgicales",
      "Sciatalgies liées à des adhérences",
      "Cervicalgies post-opératoires",
      "Gonalgies d'origine cicatricielle",
      "Adhérences viscérales",
      "Cicatrices anciennes non traitées",
    ],
    treatmentApproach:
      "Aline utilise des techniques de relâchement myofascial et de mobilisation tissulaire pour redonner de la souplesse aux cicatrices et libérer les adhérences. Le travail est doux et progressif, combinant des techniques locales sur la cicatrice et des techniques à distance pour traiter les compensations. Il est conseillé de consulter 3 à 4 semaines après la guérison complète.",
  },
  sportifs: {
    title: "Sportifs",
    slug: "sportifs",
    metaDescription:
      "Ostéopathie du sport à Rochetaillée-sur-Saône : trail, course à pied, triathlon, prévention blessures, conseils foulée. Aline Nebout, ostéopathe D.O.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    imageAlt:
      "Sportif en course à pied — ostéopathie du sport",
    description: [
      "L'ostéopathie du sport s'adresse à tous les sportifs, du pratiquant occasionnel au compétiteur confirmé. Elle intervient en prévention pour optimiser les performances et éviter les blessures, mais aussi en curatif pour traiter les douleurs liées à la pratique sportive. Aline accompagne particulièrement les pratiquants de trail, course à pied et triathlon, disciplines qu'elle connaît de l'intérieur en tant que traileuse et triathlète.",
      "Les motifs de consultation les plus fréquents sont les maux de dos, les douleurs de genou, les entorses, les tendinites et les troubles posturaux. Aline propose également des conseils personnalisés sur la foulée en course à pied, s'appuyant sur sa propre expérience de terrain et sa connaissance approfondie de la biomécanique du coureur.",
      "Un suivi ostéopathique régulier permet au sportif de maintenir un bon équilibre corporel, de prévenir les blessures de surcharge et d'optimiser sa récupération. En période de préparation ou après une compétition, une séance permet de rééquilibrer le corps et de traiter les micro-traumatismes accumulés.",
    ],
    indications: [
      "Maux de dos liés au sport",
      "Douleurs de genou (syndrome rotulien, tendinopathie)",
      "Entorses (cheville, genou)",
      "Tendinites (Achille, rotulienne, bandelette ilio-tibiale)",
      "Troubles posturaux et déséquilibres biomécaniques",
      "Périostite tibiale",
      "Pubalgie",
      "Préparation et récupération de compétition",
      "Conseils sur la foulée en course à pied",
    ],
    treatmentApproach:
      "Aline combine des techniques structurelles, fonctionnelles et myofasciales adaptées au sportif. Elle s'appuie sur sa propre pratique du trail et du triathlon pour comprendre les contraintes spécifiques de chaque discipline. La séance inclut un bilan postural, un traitement des zones en restriction et des conseils personnalisés pour la prévention et l'optimisation de la foulée.",
  },
};

const slugs = [
  "generale",
  "femme-enceinte",
  "nourrisson-enfant",
  "somato-emotionnel",
  "cicatrices",
  "sportifs",
] as const;

export function generateStaticParams() {
  return slugs.map((specialty) => ({ specialty }));
}

interface PageProps {
  params: Promise<{ specialty: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { specialty } = await params;
  const data = specialties[specialty];

  if (!data) {
    return { title: "Spécialité introuvable" };
  }

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: `${data.title} | Aline Nebout`,
      description: data.metaDescription,
      images: [{ url: data.imageUrl, width: 800, height: 600, alt: data.imageAlt }],
    },
  };
}

export default async function SpecialtyPage({ params }: PageProps) {
  const { specialty } = await params;
  const data = specialties[specialty];

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Hero image */}
      <section className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src={data.imageUrl}
          alt={data.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-bg-soft" />
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Ostéopathie", href: "/osteopathie" },
              { label: data.title },
            ]}
          />

          <ScrollReveal>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-dark mb-8">
              {data.title}
            </h1>
          </ScrollReveal>

          {/* Description */}
          <div className="space-y-6 mb-12">
            {data.description.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className="text-text-muted leading-relaxed text-lg">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Indications */}
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm mb-12">
              <h2 className="font-heading text-2xl text-text-dark mb-6">
                Indications
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {data.indications.map((indication, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{indication}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Treatment approach */}
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="font-heading text-2xl text-text-dark mb-4">
                Déroulement de la séance
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {data.treatmentApproach}
              </p>
            </div>
          </ScrollReveal>

          {/* Pricing & CTA */}
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm text-center">
              <h2 className="font-heading text-2xl text-text-dark mb-2">
                Consultation d&apos;ostéopathie
              </h2>
              <p className="text-4xl font-bold text-primary mb-2">
                65<span className="text-lg font-normal text-text-muted">€</span>
              </p>
              <p className="text-text-muted text-sm mb-1">
                Séance d&apos;environ 45 minutes
              </p>
              <p className="text-text-muted text-xs mb-6">
                Remboursement possible par votre mutuelle
              </p>
              <DoctolibButton variant="primary" label="Prendre rendez-vous" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
