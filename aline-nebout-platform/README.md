# Aline Nebout — Plateforme Professionnelle

Plateforme web multi-services pour Aline Nebout, ostéopathe D.O. au Pôle Santé de Rochetaillée-sur-Saône. Le site remplace un ancien site Google Sites par une application moderne, immersive et performante.

## Présentation

La plateforme regroupe trois univers distincts :

- **Ostéopathie** — Vitrine des services d'ostéopathie, spécialités (femme enceinte, nourrisson, sport, somato-émotionnel, cicatrices), prise de rendez-vous Doctolib
- **Réflexes Archaïques** — Espace éducatif sur les réflexes primitifs, articles par sphère (motrice, émotionnelle, cognitive), pages parents et écoles
- **Coaching Foulée** — Ateliers d'optimisation de la foulée, inscription en ligne, espace connecté avec exercices et suivi de progression

Elle sert également de hub numérique pour le **Pôle Santé de Rochetaillée-sur-Saône** : annuaire des praticiens, espace communautaire, gestion des locations de bureaux.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, React Server Components) |
| Backend / Auth / DB | Supabase (Auth, PostgreSQL, Storage) |
| Styling | Tailwind CSS 4 |
| 3D | React Three Fiber + Drei |
| Animations | Framer Motion |
| Charts | Recharts |
| Validation | Zod |
| Tests unitaires / PBT | Vitest + fast-check + React Testing Library |
| Tests E2E | Playwright |
| Analytics | Umami (conditionnel au consentement cookies) |
| Polices | Varela Round (titres) + Nunito Sans (corps) via next/font |

## Fonctionnalités

### Public
- 3 univers avec landing pages immersives (scènes 3D, animations scroll)
- Pages spécialités ostéopathie (6 spécialités)
- Articles éducatifs réflexes archaïques avec filtrage par sphère
- Auto-évaluation parents avec seuil de recommandation
- Formulaire écoles et professionnels
- Calendrier d'ateliers foulée avec inscription (guest ou connecté)
- Blog avec catégories et articles en français
- Annuaire praticiens Pôle Santé avec filtrage par profession
- Espaces de location avec formulaire de demande
- Newsletter avec conformité RGPD
- SEO : JSON-LD (LocalBusiness, Article), sitemap dynamique, Open Graph
- Intégration Doctolib (lien externe)

### Espace connecté (coaching_user)
- Tableau de bord personnel
- Programmes d'exercices avec suivi de complétion
- Graphiques de progression (Recharts)
- Statistiques (sessions, exercices, semaines actives)

### Espace praticien
- Gestion du profil praticien
- Espace communautaire (posts, commentaires, pièces jointes)

### Administration
- Dashboard avec statistiques globales
- Gestion blog (CRUD + assistant IA pour génération d'articles)
- Gestion ateliers (CRUD + liste inscrits)
- Gestion locations (CRUD + demandes)
- Gestion praticiens (invitation, publication)
- Gestion témoignages
- Gestion newsletter (abonnés)
- Modération communauté
- Génération QR codes

### Authentification
- 3 rôles : `coaching_user`, `practitioner`, `admin`
- Supabase Auth (email/password)
- Middleware Next.js pour protection des routes par rôle
- Row Level Security (RLS) sur toutes les tables

## Démarrage rapide

### Prérequis

- Node.js 18+
- npm
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

### Installation

```bash
git clone <repository-url>
cd aline-nebout-platform
npm install
```

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id  # optionnel
```

### Base de données

Exécutez les migrations SQL dans l'ordre sur votre projet Supabase (SQL Editor) :

1. `supabase/migrations/001_initial_schema.sql` — Schéma complet (tables, enums, RLS)
2. `src/lib/sql/002_exercise_programs.sql` — Programmes d'exercices
3. `src/lib/sql/003_community.sql` — Communauté
4. `src/lib/sql/004_seed_blog_articles.sql` — Articles de blog (seed)

### Lancer le serveur de développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Base de données

### Emplacement des migrations

- `supabase/migrations/` — Migration principale
- `src/lib/sql/` — Migrations complémentaires et seeds

### Tables principales

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (lié à auth.users) |
| `specialties` | Spécialités ostéopathie |
| `reflex_articles` | Articles éducatifs réflexes |
| `blog_articles` | Articles de blog |
| `testimonials` | Témoignages patients |
| `workshops` | Ateliers foulée |
| `workshop_bookings` | Inscriptions ateliers |
| `workshop_waitlist` | Liste d'attente ateliers |
| `exercise_programs` | Programmes d'exercices |
| `exercises` | Exercices individuels |
| `program_assignments` | Assignation programme → utilisateur |
| `exercise_completions` | Suivi de complétion |
| `practitioner_profiles` | Profils praticiens |
| `community_posts` | Publications communauté |
| `community_comments` | Commentaires |
| `post_attachments` | Pièces jointes |
| `rental_spaces` | Espaces de location |
| `rental_inquiries` | Demandes de location |
| `newsletter_subscribers` | Abonnés newsletter |
| `lead_captures` | Captures de leads (guide parents) |
| `school_inquiries` | Demandes écoles |

## Structure du projet

```
src/
├── app/
│   ├── (public)/          # Pages publiques (SSR/SSG)
│   │   ├── osteopathie/   # Univers ostéopathie
│   │   ├── reflexes/      # Univers réflexes archaïques
│   │   ├── coaching/      # Univers coaching foulée
│   │   ├── pole-sante/    # Annuaire + locations
│   │   ├── blog/          # Blog
│   │   ├── a-propos/      # À propos
│   │   ├── contact/       # Contact
│   │   └── ...            # Mentions légales, politique confidentialité
│   ├── (auth)/            # Pages d'authentification
│   ├── (dashboard)/       # Espace connecté coaching
│   ├── (practitioner)/    # Espace praticien
│   ├── (admin)/           # Panel d'administration
│   ├── api/               # Routes API
│   └── sitemap.ts         # Sitemap dynamique
├── components/
│   ├── 3d/                # Scènes Three.js (WebGLGuard, OsteopathyScene...)
│   ├── animation/         # ScrollReveal, TiltCard, PageTransition
│   ├── booking/           # DoctolibButton
│   ├── community/         # PostFeed, PostCard, PostEditor
│   ├── content/           # Filtres, cartes, boutons de partage
│   ├── dashboard/         # ExerciseList, ProgressChart, StatsCards
│   ├── forms/             # Formulaires (inscription, newsletter, contact...)
│   ├── layout/            # Navigation, Footer, Breadcrumb, CookieConsent
│   ├── practitioner/      # ProfileEditor, ArticleEditor
│   ├── sections/          # Hero sections par univers
│   └── seo/               # JSON-LD structured data
├── lib/
│   ├── supabase/          # Clients Supabase (server, client, middleware)
│   ├── validations/       # Schémas Zod
│   ├── sql/               # Migrations SQL complémentaires
│   ├── analytics.ts       # Utilitaires analytics
│   └── business-logic.ts  # Logique métier partagée
└── __tests__/             # Tests (PBT + E2E)
```

## Déploiement

### Vercel (recommandé)

1. Connectez le repository GitHub à Vercel
2. Configurez les variables d'environnement dans les settings Vercel
3. Le déploiement est automatique à chaque push sur `main`

### Variables d'environnement en production

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
```

## Tests

### Tests unitaires et property-based

```bash
npm test              # Exécution unique
npm run test:watch    # Mode watch
```

Les tests PBT (property-based testing) utilisent fast-check et couvrent :
- Invariant de capacité des ateliers
- Annulation et promotion liste d'attente
- Pourcentage de complétion des exercices
- Seuil d'auto-évaluation parents
- Filtrage et tri des collections
- Contrôle d'accès par rôle
- Sécurité des messages d'erreur d'authentification
- Isolation des données RLS

### Tests E2E

```bash
npx playwright install  # Première fois
npm run test:e2e
```

## Contribution

1. Créez une branche depuis `main`
2. Respectez le style existant (Tailwind, composants serveur/client, glassmorphism)
3. Écrivez des tests pour les nouvelles fonctionnalités
4. Vérifiez que le build passe (`npm run build`)
5. Ouvrez une Pull Request avec une description claire

### Conventions
- Texte UI en français
- Pas d'emojis comme icônes (SVG uniquement)
- `cursor-pointer` sur tous les éléments interactifs
- Style glassmorphism cohérent (`bg-white/80 backdrop-blur-sm rounded-2xl`)
