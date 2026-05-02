# Implementation Tasks — Aline Nebout Platform

## Phase 1: Project Setup & Foundation

- [x] 1. Initialize Next.js project with App Router, Tailwind CSS, and TypeScript
  - [x] 1.1 Run `npx create-next-app@latest` with App Router, TypeScript, Tailwind, ESLint
  - [x] 1.2 Configure Tailwind design tokens (colors: primary, primary-light, accent, bg-soft, text-dark, text-muted; fonts: Varela Round, Nunito Sans)
  - [x] 1.3 Set up `next/font/google` for Varela Round and Nunito Sans
  - [x] 1.4 Create `globals.css` with base styles, scroll-behavior, prefers-reduced-motion rules
  - [x] 1.5 Install core dependencies: framer-motion, zod, @supabase/supabase-js, @supabase/ssr

- [x] 2. Set up Supabase project and database schema
  - [x] 2.1 Create Supabase project and configure environment variables (.env.local)
  - [x] 2.2 Create SQL migration for `profiles` table with role enum (coaching_user, practitioner, admin)
  - [x] 2.3 Create SQL migration for `specialties` table
  - [x] 2.4 Create SQL migration for `reflex_articles` table
  - [x] 2.5 Create SQL migration for `blog_articles` table
  - [x] 2.6 Create SQL migration for `testimonials` table
  - [x] 2.7 Create SQL migration for `newsletter_subscribers` and `lead_captures` tables
  - [x] 2.8 Create Supabase client utilities (server + client) in `lib/supabase/`
  - [x] 2.9 Apply RLS policies for all tables (public read for published content, user-scoped writes)

- [x] 3. Create shared layout components
  - [x] 3.1 Create root `app/layout.tsx` with fonts, metadata, and body structure
  - [x] 3.2 Create `Navigation` component (floating navbar, universe links, mobile hamburger menu)
  - [x] 3.3 Create `Footer` component (social links, newsletter form, legal links, contact info)
  - [x] 3.4 Create `Breadcrumb` component
  - [x] 3.5 Create `CookieConsent` banner component

## Phase 2: Animation & 3D Foundation

- [x] 4. Set up animation and 3D infrastructure
  - [x] 4.1 Install React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `three`)
  - [x] 4.2 Create `WebGLGuard` component (WebGL detection + prefers-reduced-motion + Suspense wrapper)
  - [x] 4.3 Create `ScrollReveal` component (Framer Motion scroll-triggered reveals)
  - [x] 4.4 Create `TiltCard` component (CSS perspective transform on hover)
  - [x] 4.5 Create `PageTransition` component (crossfade between pages)
  - [x] 4.6 Create `ParticleBackground` component (subtle animated particle field)

## Phase 3: Osteopathy Universe (Public)

- [x] 5. Build Osteopathy landing page with 3D hero
  - [x] 5.1 Create `app/(public)/osteopathie/page.tsx` with hero section
  - [x] 5.2 Create `OsteopathyScene` 3D component (organic flowing shape, pink-to-purple gradient)
  - [x] 5.3 Implement mouse parallax on 3D scene (damped lerp)
  - [x] 5.4 Build services overview grid with 6 specialty cards (TiltCard)
  - [x] 5.5 Add pricing section (65€ / 45 min)
  - [x] 5.6 Add address, phone (tel: link), and Doctolib CTA button
  - [x] 5.7 Add testimonials section

- [x] 6. Build Osteopathy specialty pages
  - [x] 6.1 Create `app/(public)/osteopathie/[specialty]/page.tsx` dynamic route
  - [x] 6.2 Seed specialty data in Supabase (6 specialties with descriptions, images)
  - [x] 6.3 Implement specialty page layout (description, indications, treatment approach, image, CTA)
  - [x] 6.4 Add breadcrumb navigation (Home > Ostéopathie > [Specialty])

- [x] 7. Build About page
  - [x] 7.1 Create `app/(public)/a-propos/page.tsx`
  - [x] 7.2 Add practitioner profile section (portrait, qualifications, 2010, ISL, 6 years)
  - [x] 7.3 Add team/collaboration section (Sophie Pierre, Pôle Santé team)
  - [x] 7.4 Add cabinet photos gallery
  - [x] 7.5 Mention trail runner, triathlete, 80+ workshop participants

- [x] 8. Build Contact page
  - [x] 8.1 Create `app/(public)/contact/page.tsx`
  - [x] 8.2 Add contact info (address, phone, mobile 06 15 97 36 09)
  - [x] 8.3 Embed interactive map (Leaflet/OpenStreetMap or Google Maps)
  - [x] 8.4 Add Doctolib booking CTA
  - [x] 8.5 Add bus access info (ligne 40, ligne 43)

## Phase 4: Réflexes Archaïques Universe

- [x] 9. Build Réflexes Archaïques landing page with 3D
  - [x] 9.1 Create `app/(public)/reflexes/page.tsx` with intro section
  - [x] 9.2 Create `ReflexesScene` 3D component (3 interconnected sphere nodes for motor/emotional/cognitive)
  - [x] 9.3 Build 3 Sphere sections with descriptions and concrete examples
  - [x] 9.4 Add Integration Process steps (bilan, intégration, exercices maison, suivi)
  - [x] 9.5 Add pricing section (65€ / 45 min) and Doctolib CTA
  - [x] 9.6 Build Parent CTA section ("Votre enfant a des difficultés à l'école ?")
  - [x] 9.7 Build Schools CTA section ("Écoles & Professionnels")

- [x] 10. Build Parent outreach sub-page
  - [x] 10.1 Create `app/(public)/reflexes/parents/page.tsx`
  - [x] 10.2 Build `SelfAssessmentChecklist` component (10-15 signs, threshold = 3)
  - [x] 10.3 Implement threshold logic (3+ checked → show recommendation + booking CTA)
  - [x] 10.4 Build `LeadCaptureForm` for PDF guide download (email capture)
  - [x] 10.5 Create API route `app/api/lead-capture/route.ts` (store in Supabase)
  - [x] 10.6 Create parent guide PDF placeholder

- [x] 11. Build Schools outreach sub-page
  - [x] 11.1 Create `app/(public)/reflexes/ecoles/page.tsx`
  - [x] 11.2 Build `SchoolContactForm` component (school name, contact, type, message)
  - [x] 11.3 Create API route `app/api/contact/route.ts` (store inquiry + email notification)
  - [x] 11.4 Add intervention descriptions (info sessions, workshops, screening)

- [x] 12. Build Reflex article pages
  - [x] 12.1 Create `app/(public)/reflexes/articles/page.tsx` (article index with sphere filtering)
  - [x] 12.2 Create `app/(public)/reflexes/articles/[slug]/page.tsx` (individual article)
  - [x] 12.3 Seed reflex article data in Supabase (Moro, Galant, RTAC, RTSC, Grasping, Babinski)
  - [x] 12.4 Implement sphere filter (motor, emotional, cognitive tags)
  - [x] 12.5 Add prev/next article navigation
  - [x] 12.6 Add breadcrumb (Home > Réflexes Archaïques > [Reflex Name])
  - [x] 12.7 Add booking CTA at bottom of each article

## Phase 5: Coaching Foulée Universe

- [x] 13. Build Coaching public landing page with 3D
  - [x] 13.1 Create `app/(public)/coaching/page.tsx`
  - [x] 13.2 Create `CoachingScene` 3D component (running figure / motion trail)
  - [x] 13.3 Add workshop description ("Atelier Optimiser Votre Foulée", format, video analysis)
  - [x] 13.4 Add social proof (80+ participants saison 1, traileuse & triathlète)
  - [x] 13.5 Add pricing info (tarif libre, espèces/chèques/Wero)
  - [x] 13.6 Add trail running photo of Aline
  - [x] 13.7 Add contact numbers (cabinet + mobile 06 15 97 36 09)
  - [x] 13.8 Add CTA to workshop calendar + CTA to create coaching account

- [-] 14. Build Workshop registration system
  - [x] 14.1 Create SQL migration for `workshops`, `workshop_bookings`, `workshop_waitlist` tables
  - [x] 14.2 Create `app/(public)/coaching/ateliers/page.tsx` (workshop calendar)
  - [x] 14.3 Build `WorkshopRegistrationForm` component (name, email, phone, message)
  - [x] 14.4 Create API route `app/api/workshops/route.ts` (list workshops)
  - [x] 14.5 Create API route `app/api/workshops/[id]/register/route.ts` (register + capacity check)
  - [x] 14.6 Create API route `app/api/workshops/[id]/cancel/route.ts` (cancel + waitlist promotion)
  - [x] 14.7 Implement capacity display (remaining spots, "Complet" status, waitlist option)
  - [ ] 14.8 Send confirmation email on registration (Supabase Edge Function + Resend/Brevo)
  - [ ] 14.9 Send reminder email 24h before workshop

## Phase 6: Authentication & Coaching Dashboard

- [x] 15. Implement authentication system
  - [x] 15.1 Create `app/(auth)/connexion/page.tsx` (login form)
  - [x] 15.2 Create `app/(auth)/inscription/page.tsx` (registration form)
  - [x] 15.3 Create `app/(auth)/mot-de-passe-oublie/page.tsx` (password reset)
  - [x] 15.4 Create `app/api/auth/callback/route.ts` (Supabase auth callback)
  - [x] 15.5 Create Next.js middleware for role-based route protection
  - [x] 15.6 Implement generic auth error messages (Property 6)
  - [x] 15.7 Create Zod validation schemas for auth forms in `lib/validations/`

- [x] 16. Build Coaching dashboard
  - [x] 16.1 Create `app/(dashboard)/layout.tsx` (sidebar nav)
  - [x] 16.2 Create `app/(dashboard)/tableau-de-bord/page.tsx` (dashboard home)
  - [x] 16.3 Build `SessionSummary` component (upcoming + recent sessions)
  - [x] 16.4 Build empty states (no sessions, no history, welcome message)

- [x] 17. Build Exercise programs feature
  - [x] 17.1 Create SQL migration for `exercise_programs`, `exercises`, `program_assignments`, `exercise_completions`
  - [x] 17.2 Create `app/(dashboard)/exercices/page.tsx` (program list)
  - [x] 17.3 Create `app/(dashboard)/exercices/[programId]/page.tsx` (program detail)
  - [x] 17.4 Implement exercise completion tracking (mark complete + timestamp)
  - [x] 17.5 Implement completion percentage calculation (Property 9)

- [x] 18. Build Progress tracking feature
  - [x] 18.1 Install Recharts
  - [x] 18.2 Create `app/(dashboard)/progression/page.tsx`
  - [x] 18.3 Build `ProgressChart` component (completion rate over time)
  - [x] 18.4 Build `StatsCards` component (total sessions, exercises, active weeks — Property 10)
  - [x] 18.5 Implement minimum data point check (< 2 points → encouragement message)

## Phase 7: Pôle Santé — Directory & Community

- [x] 19. Build Practitioner directory
  - [x] 19.1 Create SQL migration for `practitioner_profiles` table
  - [x] 19.2 Create `app/(public)/pole-sante/page.tsx` (directory with profession filter)
  - [x] 19.3 Create `app/(public)/pole-sante/praticiens/[slug]/page.tsx` (practitioner profile)
  - [x] 19.4 Seed initial practitioner data (Marion, Charles, Clémentine, Tiffany, Sophie, Aline)
  - [x] 19.5 Build `PractitionerCard` component
  - [x] 19.6 Add breadcrumb (Home > Pôle Santé > [Practitioner])

- [x] 20. Build Practitioner account management
  - [x] 20.1 Create `app/(practitioner)/layout.tsx`
  - [x] 20.2 Create `app/(practitioner)/mon-profil/page.tsx` (profile edit form)
  - [x] 20.3 Implement profile update API (own profile only, RLS enforced)

- [x] 21. Build Community space
  - [x] 21.1 Create SQL migration for `community_posts`, `community_comments`, `post_attachments`
  - [x] 21.2 Create `app/(practitioner)/communaute/page.tsx`
  - [x] 21.3 Build `PostFeed` component (reverse chronological, category filter)
  - [x] 21.4 Build `PostEditor` component (title, content, category, file attachments)
  - [x] 21.5 Build `PostCard` component with comment thread
  - [x] 21.6 Implement file upload to Supabase Storage (PDF, images, max 10MB)
  - [x] 21.7 Apply RLS: practitioners + admin only

## Phase 8: Rental Management

- [ ] 22. Build Rental listings (public)
  - [ ] 22.1 Create SQL migration for `rental_spaces` and `rental_inquiries` tables
  - [ ] 22.2 Create `app/(public)/pole-sante/locations/page.tsx` (listing page)
  - [ ] 22.3 Create `app/(public)/pole-sante/locations/[id]/page.tsx` (detail + inquiry form)
  - [ ] 22.4 Build `RentalInquiryForm` component
  - [ ] 22.5 Create API route for rental inquiries (store + email notification to admin)

## Phase 9: Blog, Newsletter & Content Marketing

- [x] 23. Build Blog system
  - [x] 23.1 Create `app/(public)/blog/page.tsx` (blog index with category filter)
  - [x] 23.2 Create `app/(public)/blog/[slug]/page.tsx` (blog article page)
  - [x] 23.3 Add JSON-LD Article structured data on each blog article
  - [x] 23.4 Add related articles section (same category, max 3 — Property 14)
  - [x] 23.5 Add CTA at bottom (Doctolib or coaching sign-up based on category)

- [x] 24. Build Newsletter subscription
  - [x] 24.1 Build `NewsletterForm` component (footer + inline variants)
  - [x] 24.2 Create API route `app/api/newsletter/route.ts` (subscribe/unsubscribe)
  - [x] 24.3 Implement GDPR consent checkbox + link to privacy policy
  - [x] 24.4 Implement duplicate email check
  - [x] 24.5 Generate unsubscribe token per subscriber

## Phase 10: Admin Panel

- [x] 25. Build Admin dashboard and management
  - [x] 25.1 Create `app/(admin)/admin/page.tsx` (dashboard with summary cards — Property 16)
  - [x] 25.2 Create `app/(admin)/admin/ateliers/page.tsx` (workshop CRUD + registrant list)
  - [x] 25.3 Create `app/(admin)/admin/locations/page.tsx` (rental CRUD + inquiry management)
  - [x] 25.4 Create `app/(admin)/admin/praticiens/page.tsx` (practitioner invite + management)
  - [x] 25.5 Create `app/(admin)/admin/communaute/page.tsx` (moderation: pin, delete, manage access)
  - [x] 25.6 Create `app/(admin)/admin/blog/page.tsx` (blog article CRUD)
  - [x] 25.7 Create `app/(admin)/admin/temoignages/page.tsx` (testimonial CRUD)
  - [x] 25.8 Create `app/(admin)/admin/newsletter/page.tsx` (subscriber list)
  - [x] 25.9 Apply admin role guard on all /admin routes (Property 15)

## Phase 11: SEO, Social & Legal

- [x] 26. Implement SEO and social sharing
  - [x] 26.1 Add meta tags (title, description, Open Graph, Twitter Card) on all public pages (Property 11)
  - [x] 26.2 Create branded og:image cards (1200x630px) for each universe landing page
  - [x] 26.3 Add LocalBusiness JSON-LD structured data on osteopathy landing + contact pages
  - [x] 26.4 Create `app/sitemap.ts` for dynamic sitemap generation
  - [x] 26.5 Add share buttons on reflex articles and blog articles (Facebook, LinkedIn, WhatsApp)
  - [x] 26.6 Add social profile links in footer (Instagram, Facebook, LinkedIn)

- [x] 27. Build Legal pages
  - [x] 27.1 Create `app/(public)/mentions-legales/page.tsx`
  - [x] 27.2 Create `app/(public)/politique-confidentialite/page.tsx`
  - [x] 27.3 Implement cookie consent logic (block analytics until accepted)

- [x] 28. Integrate analytics
  - [x] 28.1 Set up Umami (or Plausible) analytics
  - [x] 28.2 Track conversion events (Doctolib clicks, coaching sign-ups, newsletter, phone clicks)
  - [x] 28.3 Conditional loading after cookie consent

## Phase 12: Testing & Performance

- [ ] 29. Write property-based tests
  - [ ] 29.1 Install Vitest + fast-check + React Testing Library
  - [ ] 29.2 Write PBT for workshop booking capacity invariant (Property 7)
  - [ ] 29.3 Write PBT for cancellation + waitlist promotion (Property 8)
  - [ ] 29.4 Write PBT for exercise completion percentage (Property 9)
  - [ ] 29.5 Write PBT for self-assessment threshold (Property 4)
  - [ ] 29.6 Write PBT for collection filter/sort correctness (Property 3)
  - [ ] 29.7 Write PBT for role-based access control (Property 15)
  - [ ] 29.8 Write PBT for auth error message safety (Property 6)
  - [ ] 29.9 Write PBT for RLS data isolation (Property 12)

- [ ] 30. Write E2E tests and optimize performance
  - [ ] 30.1 Install Playwright
  - [ ] 30.2 Write E2E: Visitor books osteopathy appointment (Landing → Specialty → Doctolib)
  - [ ] 30.3 Write E2E: Parent self-assessment flow (Reflexes → Parents → Check → Book)
  - [ ] 30.4 Write E2E: Workshop registration guest flow
  - [ ] 30.5 Write E2E: Coaching user journey (Register → Login → Dashboard → Exercises → Progress)
  - [ ] 30.6 Run Lighthouse CI on all public pages (target ≥ 90)
  - [ ] 30.7 Verify 3D scenes LCP < 2.5s on throttled 4G
  - [ ] 30.8 Run bundle analysis to verify 3D code-splitting
