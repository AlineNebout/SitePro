# Aline Nebout — Plateforme Professionnelle

> Plateforme web multi-services pour **Aline Nebout**, ostéopathe D.O. au Pôle Santé de Rochetaillée-sur-Saône.

## Présentation

La plateforme regroupe **trois univers** :

- **Ostéopathie** — Vitrine des services, 6 spécialités, prise de rendez-vous Doctolib
- **Réflexes Archaïques** — Espace éducatif, articles par sphère, pages parents et écoles
- **Coaching Foulée** — Ateliers d'optimisation de la foulée, inscription en ligne, espace connecté

Elle sert également de hub numérique pour le **Pôle Santé de Rochetaillée-sur-Saône** : annuaire des praticiens, espace communautaire, gestion des locations.

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
| Tests PBT | Vitest + fast-check |
| Tests E2E | Playwright |
| Analytics | Umami (conditionnel cookies) |

## Fonctionnalités

### Public
- 3 univers avec landing pages immersives (scènes 3D, animations scroll)
- 6 spécialités ostéopathie avec pages dédiées
- Articles réflexes archaïques avec filtrage par sphère (moteur, émotionnel, cognitif)
- Auto-évaluation parents avec seuil de recommandation
- Calendrier d'ateliers foulée avec inscription (guest ou connecté)
- Blog avec assistant IA pour la création d'articles
- Annuaire praticiens Pôle Santé
- Espaces de location avec formulaire de demande
- Newsletter RGPD avec désabonnement par token
- SEO : JSON-LD, sitemap dynamique, Open Graph, partage social

### Espace connecté
- Tableau de bord coaching personnel
- Programmes d'exercices avec suivi de complétion
- Graphiques de progression (Recharts)
- Espace praticien (profil, articles, communauté)

### Administration
- Dashboard avec statistiques temps réel
- Blog CRUD + assistant IA pour génération d'articles
- Gestion ateliers, newsletter, témoignages, praticiens, locations, communauté
- QR codes pour supports de communication

### Authentification
- 3 rôles : `coaching_user`, `practitioner`, `admin`
- Supabase Auth (email/password)
- Middleware Next.js pour protection des routes par rôle
- Row Level Security (RLS) sur toutes les tables

## Démarrage rapide

```bash
cd aline-nebout-platform
npm install
```

Créez `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id  # optionnel
```

Exécutez les migrations SQL dans Supabase (SQL Editor), dans l'ordre :

1. `supabase/migrations/001_initial_schema.sql`
2. `src/lib/sql/002_exercise_programs.sql`
3. `src/lib/sql/003_community.sql`
4. `src/lib/sql/004_seed_blog_articles.sql`

Lancez le serveur :

```bash
npm run dev
```

## Structure du projet

```
aline-nebout-platform/
├── src/
│   ├── app/              # Pages (public, auth, dashboard, admin, practitioner)
│   ├── components/       # Composants réutilisables
│   ├── lib/              # Supabase clients, validations Zod, business logic
│   └── __tests__/        # Tests PBT + E2E
├── supabase/migrations/  # Migration SQL principale
├── README.md             # Documentation détaillée
├── DOCS.md               # Référence API et architecture technique
└── package.json
```

## Tests

```bash
npm test              # 42 tests PBT (Vitest + fast-check)
npm run test:e2e      # Tests E2E (Playwright, nécessite serveur)
```

## Déploiement

Hébergé sur **Vercel** avec déploiement automatique à chaque push sur `main`.

## Documentation

- [`aline-nebout-platform/README.md`](aline-nebout-platform/README.md) — Documentation complète du projet
- [`aline-nebout-platform/DOCS.md`](aline-nebout-platform/DOCS.md) — Référence API, schéma DB, architecture

## Licence

Projet privé — Tous droits réservés © Aline Nebout
