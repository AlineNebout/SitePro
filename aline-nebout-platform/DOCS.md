# Documentation technique — Aline Nebout Platform

## Routes API

### Blog

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/blog` | Public | Liste des articles publiés |
| POST | `/api/blog` | Admin/Practitioner | Créer un article |
| GET | `/api/blog/admin` | Admin | Liste de tous les articles (y compris brouillons) |
| GET | `/api/blog/[slug]` | Public | Détail d'un article par slug |
| DELETE | `/api/blog/[slug]` | Admin | Supprimer un article |
| POST | `/api/blog/generate` | Admin | Générer un brouillon d'article via templates IA |

**POST `/api/blog`**
```json
{
  "title": "string (requis)",
  "slug": "string (requis)",
  "excerpt": "string",
  "content": "string",
  "category": "osteopathie | reflexes | coaching (requis)",
  "featuredImageUrl": "string | null",
  "isPublished": "boolean"
}
```

**POST `/api/blog/generate`**
```json
// Request
{ "topic": "string (requis)", "category": "osteopathie | reflexes | coaching (requis)" }
// Response
{ "article": { "title": "string", "slug": "string", "excerpt": "string", "content": "string", "category": "string" } }
```

### Ateliers (Workshops)

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/workshops` | Public | Liste des ateliers à venir |
| GET | `/api/workshops/admin` | Admin | Liste complète avec inscrits |
| POST | `/api/workshops/admin` | Admin | Créer un atelier |
| GET | `/api/workshops/[id]` | Public | Détail d'un atelier |
| POST | `/api/workshops/[id]/register` | Public | Inscription à un atelier |
| POST | `/api/workshops/[id]/cancel` | Public | Annulation d'une inscription |

**POST `/api/workshops/[id]/register`**
```json
{
  "name": "string (requis)",
  "email": "string (requis)",
  "phone": "string",
  "message": "string"
}
```

### Newsletter

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/api/newsletter` | Public | S'abonner à la newsletter |
| DELETE | `/api/newsletter` | Public | Se désabonner (via token) |
| GET | `/api/newsletter/admin` | Admin | Liste des abonnés |

**POST `/api/newsletter`**
```json
{ "email": "string (requis)", "gdprConsent": "boolean (requis, doit être true)" }
```

### Locations (Rentals)

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/rentals/spaces` | Public | Liste des espaces de location |
| POST | `/api/rentals/spaces` | Admin | Créer un espace |
| POST | `/api/rentals/inquiry` | Public | Envoyer une demande de location |
| GET | `/api/rentals/admin` | Admin | Gestion des espaces et demandes |

**POST `/api/rentals/inquiry`**
```json
{
  "rentalSpaceId": "uuid (requis)",
  "name": "string (requis)",
  "email": "string (requis)",
  "phone": "string",
  "desiredPeriod": "string",
  "message": "string"
}
```

### Praticiens

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/practitioners/admin` | Admin | Liste des praticiens |
| POST | `/api/practitioners/admin` | Admin | Inviter un praticien |
| GET | `/api/practitioners/profile` | Practitioner | Mon profil praticien |
| PUT | `/api/practitioners/profile` | Practitioner | Mettre à jour mon profil |

### Communauté

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/community/posts` | Practitioner/Admin | Liste des publications |
| POST | `/api/community/posts` | Practitioner/Admin | Créer une publication |
| GET | `/api/community/[id]` | Practitioner/Admin | Détail d'une publication |
| DELETE | `/api/community/[id]` | Admin/Author | Supprimer une publication |
| GET | `/api/community/admin` | Admin | Modération |

### Exercices

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/exercises` | Authenticated | Programmes assignés |
| GET | `/api/exercises/[programId]` | Authenticated | Détail d'un programme |
| POST | `/api/exercises/[programId]/complete` | Authenticated | Marquer un exercice comme complété |

### Témoignages

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/testimonials` | Public | Témoignages publiés |
| GET | `/api/testimonials/admin` | Admin | Tous les témoignages |
| POST | `/api/testimonials/admin` | Admin | Créer un témoignage |
| PUT | `/api/testimonials/[id]` | Admin | Modifier un témoignage |
| DELETE | `/api/testimonials/[id]` | Admin | Supprimer un témoignage |

### Contact

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/api/contact/school` | Public | Formulaire contact écoles |

### Lead Capture

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/api/lead-capture` | Public | Capture email (guide parents) |

### Auth

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/auth/callback` | Public | Callback Supabase Auth |

---

## Schéma de base de données

### Enums

| Enum | Valeurs |
|------|---------|
| `user_role` | coaching_user, practitioner, admin |
| `post_category` | annonce, ressource, question, evenement |
| `workshop_status` | upcoming, full, completed, cancelled |
| `booking_status` | confirmed, cancelled, waitlisted |
| `rental_status` | available, occupied, maintenance |
| `inquiry_status` | new, contacted, confirmed, declined, completed |
| `content_category` | osteopathie, reflexes, coaching |
| `school_request_type` | information_session, workshop, screening |
| `sphere_type` | motor, emotional, cognitive |

### Relations principales

```
auth.users ──1:1──> profiles
profiles ──1:N──> workshop_bookings
profiles ──1:N──> exercise_completions
profiles ──1:N──> community_posts
profiles ──1:1──> practitioner_profiles
workshops ──1:N──> workshop_bookings
workshops ──1:N──> workshop_waitlist
exercise_programs ──1:N──> exercises
exercise_programs ──1:N──> program_assignments
community_posts ──1:N──> community_comments
community_posts ──1:N──> post_attachments
rental_spaces ──1:N──> rental_inquiries
```

---

## Flux d'authentification

### Inscription

1. L'utilisateur remplit le formulaire (`/inscription`)
2. Le client appelle `supabase.auth.signUp({ email, password })`
3. Supabase crée l'utilisateur dans `auth.users`
4. Le trigger `on_auth_user_created` crée automatiquement un profil dans `profiles` avec le rôle `coaching_user`
5. Un email de confirmation est envoyé
6. L'utilisateur clique sur le lien → callback `/api/auth/callback`
7. Redirection vers le tableau de bord

### Connexion

1. L'utilisateur remplit le formulaire (`/connexion`)
2. Le client appelle `supabase.auth.signInWithPassword({ email, password })`
3. Supabase retourne un JWT contenant l'ID utilisateur
4. Le cookie de session est défini
5. Redirection vers le tableau de bord

### Middleware de protection

Le middleware Next.js (`src/lib/supabase/middleware.ts`) intercepte chaque requête :

1. Vérifie la présence d'un cookie de session Supabase
2. Si la route est protégée et pas de session → redirection vers `/connexion`
3. Si la route nécessite un rôle spécifique → vérification du profil
4. Les routes publiques passent sans vérification

---

## Contrôle d'accès par rôle (RBAC)

### Matrice des accès

| Route | coaching_user | practitioner | admin |
|-------|:---:|:---:|:---:|
| Pages publiques | Oui | Oui | Oui |
| `/tableau-de-bord` | Oui | Non | Oui |
| `/exercices` | Oui | Non | Oui |
| `/progression` | Oui | Non | Oui |
| `/mon-profil` (praticien) | Non | Oui | Oui |
| `/communaute` | Non | Oui | Oui |
| `/admin/*` | Non | Non | Oui |

### Row Level Security (RLS)

Chaque table a des politiques RLS qui garantissent l'isolation des données :

- **Lecture publique** : spécialités, articles publiés, témoignages publiés, praticiens publiés, ateliers, espaces de location
- **Lecture utilisateur** : son propre profil, ses inscriptions, ses complétions d'exercices
- **Lecture praticien** : publications communauté, commentaires, pièces jointes
- **Écriture utilisateur** : ses propres complétions, ses inscriptions
- **Écriture praticien** : ses publications, son profil praticien
- **Accès admin** : toutes les tables en lecture/écriture
- **Insertion publique** : newsletter, leads, demandes écoles, demandes location, inscriptions ateliers

---

## Architecture des composants

### Composants serveur vs client

Le projet utilise les React Server Components (RSC) par défaut. Les composants client sont marqués avec `"use client"` et sont utilisés pour :

- Interactivité (formulaires, filtres, modales)
- Animations (Framer Motion)
- Scènes 3D (React Three Fiber)
- État local (useState, useEffect)

### Hiérarchie des layouts

```
app/layout.tsx (root)
├── Navigation (client)
├── Footer (server)
├── CookieConsent (client)
├── Analytics (client)
│
├── (public)/ → Pas de layout spécifique
├── (auth)/ → Pas de layout spécifique
├── (dashboard)/layout.tsx → Sidebar navigation coaching
├── (practitioner)/layout.tsx → Sidebar navigation praticien
└── (admin)/layout.tsx → Sidebar navigation admin
```

### Conventions de style

- **Glassmorphism** : `bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm`
- **Couleurs** : primary (#EC4899), accent (#8B5CF6), bg-soft, text-dark, text-muted
- **Polices** : Varela Round (headings via `font-heading`), Nunito Sans (body)
- **Icônes** : SVG inline (Heroicons style), pas d'emojis
- **Interactivité** : `cursor-pointer` sur tous les éléments cliquables
- **Transitions** : `transition-colors duration-200`
- **Focus** : `focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`

### Composants réutilisables clés

| Composant | Type | Usage |
|-----------|------|-------|
| `ScrollReveal` | Client | Animation d'apparition au scroll |
| `TiltCard` | Client | Effet de perspective au survol |
| `Breadcrumb` | Server | Navigation fil d'Ariane |
| `DoctolibButton` | Server | Lien vers Doctolib |
| `NewsletterForm` | Client | Formulaire newsletter (footer + inline) |
| `PractitionerFilter` | Client | Filtrage praticiens par profession |
| `BlogFilter` | Client | Filtrage articles par catégorie |
| `ShareButtons` | Client | Partage social (Facebook, LinkedIn, WhatsApp) |
| `RentalInquiryForm` | Client | Formulaire demande de location |
| `WorkshopRegistrationForm` | Client | Inscription atelier |
