# Requirements Document

## Introduction

The Aline Nebout Platform is a multi-service professional website for Aline Nebout, an osteopath based in Rochetaillée-sur-Saône, France. The platform replaces the existing basic Google Sites website with a modern, wellness-oriented web application built on Next.js and Supabase. It encompasses three distinct universes: a vitrine/landing site for osteopathy services, an educational space for archaic reflexes (réflexes archaïques), and a connected coaching space for running form workshops (coaching foulée). Additionally, the platform serves as the digital hub for the Pôle Santé de Rochetaillée-sur-Saône, featuring a practitioner directory, a local health community space, and a rental management system for office spaces within the center. The design follows a Soft UI Evolution aesthetic with a pink (#EC4899) and purple (#8B5CF6) color palette, using Varela Round and Nunito Sans fonts. The landing pages feature an immersive 3D visual experience with Three.js/React Three Fiber, including animated 3D elements, parallax effects, scroll-driven animations, and interactive visual storytelling to create a premium, memorable first impression.

## Glossary

- **Platform**: The complete Aline Nebout multi-service web application
- **Visitor**: An unauthenticated user browsing the public pages of the Platform
- **Authenticated_User**: A user who has registered and logged into the Coaching Foulée connected space
- **Navigation_System**: The global navigation component that provides access to the three universes and shared pages
- **Osteopathy_Landing**: The vitrine/landing section showcasing osteopathy services, specialties, and contact information
- **Specialty_Section**: A dedicated content area within the Osteopathy_Landing for a specific osteopathy discipline (e.g., pregnant women, newborns, sports)
- **Reflexes_Space**: The educational content section dedicated to archaic reflexes (réflexes archaïques)
- **Reflex_Article**: A detailed educational page describing a specific archaic reflex (e.g., Moro, Galant, RTAC)
- **Coaching_Space**: The connected space for running form coaching and workshops (coaching foulée / atelier)
- **Dashboard**: The authenticated user's personal area within the Coaching_Space showing session history, progress, and exercises
- **Auth_System**: The Supabase-based authentication module handling user registration, login, and session management
- **Booking_Widget**: The Doctolib integration component enabling appointment scheduling
- **Exercise_Program**: A structured set of exercises assigned to an Authenticated_User within the Coaching_Space
- **Progress_Tracker**: The component that records and displays an Authenticated_User's metrics and evolution over time
- **Sphere**: One of the three developmental domains in the Reflexes_Space: motor, emotional, or cognitive
- **Integration_Process**: The archaic reflex treatment workflow: initial assessment, integration sessions, home exercises, and follow-up every 6 weeks
- **Design_System**: The visual identity system using Soft UI Evolution style with pink (#EC4899) and purple (#8B5CF6) colors, Varela Round headings, and Nunito Sans body text
- **Immersive_Scene**: A Three.js / React Three Fiber 3D scene embedded in a landing page section, featuring animated 3D objects, lighting, and camera movements
- **Scroll_Animation**: A scroll-driven animation sequence that triggers visual transitions (parallax layers, 3D object transformations, opacity fades) as the Visitor scrolls through a page
- **Interactive_3D_Element**: A 3D object rendered via React Three Fiber that responds to user interaction (mouse hover, click, or device orientation on mobile)
- **Pôle_Santé**: The healthcare center (Pôle Santé de Rochetaillée-sur-Saône) where Aline Nebout practices
- **Practitioner_Directory**: The public-facing directory listing all health and social practitioners operating within or affiliated with the Pôle_Santé
- **Practitioner_Profile**: A dedicated page for a practitioner in the Practitioner_Directory, displaying their name, profession, specialties, contact information, photo, and booking link
- **Practitioner_Account**: An authenticated account for a practitioner registered on the Platform, allowing them to manage their Practitioner_Profile and participate in the Community_Space
- **Community_Space**: The private area of the Platform where Practitioner_Accounts can interact, share resources, post announcements, and coordinate within the local health network
- **Community_Post**: A message, article, or announcement published by a Practitioner_Account within the Community_Space
- **Rental_Space**: A physical office or consultation room within the Pôle_Santé available for rental by external practitioners
- **Rental_Listing**: A public-facing page describing a Rental_Space, including photos, amenities, pricing, availability, and contact information
- **Rental_Inquiry**: A request submitted by a Visitor or Practitioner_Account expressing interest in renting a Rental_Space
- **Admin_User**: A user with elevated privileges (Aline Nebout or designated manager) who can manage Practitioner_Profiles, Rental_Listings, Community_Space moderation, and platform content

## Requirements

### Requirement 1: Global Navigation and Multi-Universe Structure

**User Story:** As a Visitor, I want to navigate seamlessly between the three universes (Ostéopathie, Réflexes Archaïques, Coaching Foulée), so that I can discover all services offered by Aline Nebout from a single platform.

#### Acceptance Criteria

1. THE Navigation_System SHALL display links to the three universes (Ostéopathie, Réflexes Archaïques, Coaching Foulée) and shared pages (About, Contact) on every page of the Platform.
2. WHEN a Visitor selects a universe link, THE Navigation_System SHALL route the Visitor to the corresponding universe landing page without a full page reload.
3. THE Navigation_System SHALL visually indicate the currently active universe using the Design_System color scheme.
4. WHILE the Visitor is on a mobile viewport (width below 768px), THE Navigation_System SHALL collapse into a hamburger menu that expands on tap.
5. THE Navigation_System SHALL include the Aline Nebout logo and brand name, linking back to the Platform home page.
6. WHEN a Visitor scrolls down on any page, THE Navigation_System SHALL remain fixed at the top of the viewport with a floating style (offset from edges).

### Requirement 2: Osteopathy Landing Page — Hero and Services Overview

**User Story:** As a Visitor, I want to see a visually stunning hero section with 3D elements and an overview of osteopathy services, so that I am immediately captivated and understand what Aline Nebout offers.

#### Acceptance Criteria

1. THE Osteopathy_Landing SHALL display a hero section containing a professional headline, a subtitle describing osteopathy services, a primary call-to-action button linking to the Booking_Widget, and an Immersive_Scene as the visual centerpiece.
2. THE hero section SHALL feature an animated 3D background or foreground element (e.g., an abstract organic shape, flowing particles, or anatomical silhouette) rendered via React Three Fiber that responds to mouse movement with subtle parallax.
3. THE Osteopathy_Landing SHALL display a services overview section listing all six specialties: general osteopathy, pregnant women, newborns/children, somato-emotional, scars, and sports.
4. WHEN a Visitor clicks on a specialty card in the services overview, THE Osteopathy_Landing SHALL navigate the Visitor to the corresponding Specialty_Section page.
5. THE specialty cards SHALL feature hover animations with depth/elevation changes and subtle 3D tilt effects (CSS perspective transforms).
6. THE Osteopathy_Landing SHALL display the session pricing information: 65€ per session, 45-minute duration.
7. THE Osteopathy_Landing SHALL display the practice address: 324 quai Pierre Dupont, Pôle Santé de Rochetaillée-sur-Saône.
8. THE Osteopathy_Landing SHALL display the phone number 04.78.25.28.62 as a clickable tel: link.

### Requirement 3: Osteopathy Specialty Pages

**User Story:** As a Visitor, I want to read detailed information about each osteopathy specialty, so that I can understand whether the service is relevant to my needs.

#### Acceptance Criteria

1. THE Platform SHALL provide a dedicated Specialty_Section page for each of the six specialties: general osteopathy, pregnant women, newborns/children, somato-emotional, scars, and sports.
2. WHEN a Visitor navigates to a Specialty_Section page, THE Platform SHALL display a description of the specialty, indications, the treatment approach, and a relevant image from the existing image assets.
3. THE Specialty_Section page SHALL include a call-to-action button linking to the Booking_Widget for appointment scheduling.
4. THE Specialty_Section page SHALL include a breadcrumb navigation showing the path: Home > Ostéopathie > [Specialty Name].

### Requirement 4: About Section — Practitioner Profile

**User Story:** As a Visitor, I want to learn about Aline Nebout's qualifications and team, so that I can trust the practitioner before booking.

#### Acceptance Criteria

1. THE Platform SHALL display an About page containing Aline Nebout's professional portrait image, graduation year (2010), institution name (Institut Supérieur d'Ostéopathie de Limonest), and duration of studies (6 years).
2. THE About page SHALL mention the collaboration with Sophie Pierre (sage-femme) and the Pôle_Santé team.
3. THE About page SHALL mention that Aline Nebout has offered archaic reflex integration services since 2024.
4. THE About page SHALL mention that Aline Nebout is a trail runner and triathlete who provides running form coaching workshops ("Atelier Optimiser Votre Foulée"), with over 80 participants in the first season.
5. THE About page SHALL display images of the practice (cabinet) using the existing cabinet image assets.

### Requirement 5: Doctolib Booking Integration

**User Story:** As a Visitor, I want to book an appointment directly from the website, so that I can schedule a session without leaving the platform.

#### Acceptance Criteria

1. WHEN a Visitor clicks a booking call-to-action button, THE Booking_Widget SHALL open the Doctolib appointment page (https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout) in a new browser tab.
2. THE Booking_Widget SHALL be accessible from the Osteopathy_Landing hero section, each Specialty_Section page, and the Contact page.
3. THE Booking_Widget button SHALL display clear labeling indicating it leads to Doctolib for appointment booking.

### Requirement 6: Contact Page

**User Story:** As a Visitor, I want to find contact information and the practice location, so that I can reach Aline Nebout or find directions to the office.

#### Acceptance Criteria

1. THE Platform SHALL display a Contact page containing the full address (324 quai Pierre Dupont, Pôle Santé de Rochetaillée-sur-Saône), the phone number (04.78.25.28.62), and a link to the Doctolib booking page.
2. THE Contact page SHALL embed an interactive map showing the practice location in Rochetaillée-sur-Saône.
3. THE Contact page SHALL display the phone number as a clickable tel: link for mobile users.
4. THE Contact page SHALL include a call-to-action button linking to the Booking_Widget.

### Requirement 7: Réflexes Archaïques — Educational Landing Page

**User Story:** As a Visitor, I want to discover the archaic reflexes service and understand the three developmental spheres, so that I can learn about this approach and determine if it applies to me or my child.

#### Acceptance Criteria

1. THE Reflexes_Space SHALL display a landing page with an introduction to archaic reflexes, explaining the concept and its relevance for children and adults.
2. THE Reflexes_Space landing page SHALL present the three Spheres (motor, emotional, cognitive) as distinct visual sections with descriptions and concrete examples of signs (e.g., difficulty writing, anxiety, concentration issues).
3. THE Reflexes_Space landing page SHALL display the Integration_Process steps: initial assessment, integration sessions, home exercises, and follow-up every 6 weeks.
4. THE Reflexes_Space landing page SHALL display the session pricing: 65€ per session, 45-minute duration.
5. THE Reflexes_Space landing page SHALL include a call-to-action button linking to the Booking_Widget.
6. THE Reflexes_Space landing page SHALL mention that this service has been available since 2024.
7. THE Reflexes_Space landing page SHALL display a prominent "Parents" CTA section with a headline such as "Votre enfant a des difficultés à l'école ?" followed by a checklist of recognizable signs (concentration, écriture, coordination, gestion des émotions, agitation) and a call-to-action button to book a reflex assessment or download a free parent guide.
8. THE Reflexes_Space landing page SHALL display a prominent "Écoles & Professionnels" CTA section inviting schools, teachers, and education professionals to request an information session or workshop about archaic reflexes, with a dedicated contact form.

### Requirement 7b: Réflexes Archaïques — Parent and School Outreach

**User Story:** As a parent or school professional, I want targeted information and easy ways to take action, so that I can understand if archaic reflex integration could help my child or students and contact Aline directly.

#### Acceptance Criteria

1. THE Platform SHALL provide a dedicated "Parents" landing sub-page within the Reflexes_Space, accessible from the parent CTA on the Reflexes_Space landing page.
2. THE Parents sub-page SHALL present a self-assessment checklist of 10-15 common signs of non-integrated reflexes in children (e.g., "Votre enfant se tortille sur sa chaise", "Il a du mal à tenir son stylo", "Il est hypersensible au bruit", "Il a des difficultés à gérer ses émotions"), allowing the parent to check applicable items.
3. WHEN a parent checks 3 or more items on the self-assessment checklist, THE Platform SHALL display a personalized message recommending a reflex assessment and a prominent call-to-action button to book an appointment.
4. THE Parents sub-page SHALL offer a downloadable free resource (PDF guide: "Comprendre les réflexes archaïques — Guide pour les parents") in exchange for an email address, stored in the Supabase database for newsletter follow-up.
5. THE Platform SHALL provide a dedicated "Écoles & Professionnels" landing sub-page within the Reflexes_Space, accessible from the school CTA on the Reflexes_Space landing page.
6. THE Schools sub-page SHALL describe the intervention options Aline can offer: information sessions for teachers, workshops for school staff, and screening sessions for students.
7. THE Schools sub-page SHALL include a contact form requesting the school name, contact person name, email, phone, type of request (information session, workshop, screening), and a message field.
8. WHEN a school professional submits the contact form, THE Platform SHALL store the inquiry in the Supabase database and send a notification email to the Admin_User.
9. THE Schools sub-page SHALL include testimonials from teachers or school professionals who have worked with Aline on reflex integration, when available.
10. THE Platform SHALL generate shareable social media cards (og:image) for both the Parents and Schools sub-pages, designed to be eye-catching when shared on Facebook parent groups or school community pages.

### Requirement 8: Réflexes Archaïques — Reflex Article Pages

**User Story:** As a Visitor, I want to read detailed educational content about each archaic reflex, so that I can understand specific reflexes and their impact on development.

#### Acceptance Criteria

1. THE Reflexes_Space SHALL provide a dedicated Reflex_Article page for each major archaic reflex: Moro, Galant, RTAC (Réflexe Tonique Asymétrique du Cou), RTSC (Réflexe Tonique Symétrique du Cou), Grasping, and Babinski.
2. WHEN a Visitor navigates to a Reflex_Article page, THE Platform SHALL display the reflex name, a description of the reflex, its associated Sphere(s), signs of non-integration, and the integration approach.
3. THE Reflex_Article page SHALL follow a blog/guide structure inspired by the labo-rnp.com educational model, with clear headings, illustrations, and readable typography.
4. THE Reflex_Article page SHALL include breadcrumb navigation showing the path: Home > Réflexes Archaïques > [Reflex Name].
5. THE Reflex_Article page SHALL include navigation links to the previous and next Reflex_Article pages for sequential reading.
6. THE Reflex_Article page SHALL include a call-to-action section linking to the Booking_Widget for scheduling an assessment.

### Requirement 9: Réflexes Archaïques — Article Index and Filtering

**User Story:** As a Visitor, I want to browse and filter the list of archaic reflex articles by sphere, so that I can find content relevant to a specific developmental domain.

#### Acceptance Criteria

1. THE Reflexes_Space SHALL provide an article index page listing all available Reflex_Article pages with titles, short descriptions, and associated Sphere tags.
2. WHEN a Visitor selects a Sphere filter (motor, emotional, or cognitive), THE article index page SHALL display only the Reflex_Article entries associated with the selected Sphere.
3. WHEN no Sphere filter is selected, THE article index page SHALL display all Reflex_Article entries.
4. THE article index page SHALL display each Reflex_Article entry as a card with a visual indicator of its associated Sphere(s).

### Requirement 10: Coaching Foulée — Public Landing Page

**User Story:** As a Visitor, I want to learn about the running form workshops and coaching service, so that I can decide whether to sign up for an upcoming session.

#### Acceptance Criteria

1. THE Coaching_Space SHALL display a public landing page describing the "Atelier Optimiser Votre Foulée" workshop concept: posture awareness, cadence optimization, joint and muscle preservation, and personalized video analysis.
2. THE Coaching_Space landing page SHALL mention that Aline Nebout is a trail runner and triathlete who provides running form coaching, and that over 80 runners participated in the first season of workshops.
3. THE Coaching_Space landing page SHALL describe the workshop format: groups of 10-12 people, approximately 1h30-2h duration, outdoor sessions at the esplanade de l'écluse de Rochetaillée, road running shoes required, minimal running distance (~20m back and forth).
4. THE Coaching_Space landing page SHALL display the pricing model: "tarif libre" (pay what you want) with accepted payment methods (cash, cheque, Wero).
5. THE Coaching_Space landing page SHALL display a list of upcoming workshop dates with available spots remaining, and a call-to-action button to register for a specific date.
6. THE Coaching_Space landing page SHALL mention that the workshop is open to all: running clubs, triathlon clubs, companies, patients, and individuals.
7. THE Coaching_Space landing page SHALL include a call-to-action button prompting the Visitor to create an account or log in to access the connected coaching space for ongoing follow-up after attending a workshop.
8. THE Coaching_Space landing page SHALL display the trail running photo of Aline and a gallery of workshop action shots when available.
9. THE Coaching_Space landing page SHALL display Aline's mobile contact number (06 15 97 36 09) for workshop inquiries alongside the cabinet number.

### Requirement 11: User Authentication

**User Story:** As a Visitor, I want to create an account and log in, so that I can access the Coaching Foulée connected space and track my progress.

#### Acceptance Criteria

1. WHEN a Visitor clicks the sign-up button, THE Auth_System SHALL display a registration form requesting email address and password.
2. WHEN a Visitor submits valid registration credentials, THE Auth_System SHALL create a new user account in Supabase and send a confirmation email to the provided address.
3. WHEN a Visitor submits a login form with valid credentials, THE Auth_System SHALL authenticate the user via Supabase Auth and redirect the Authenticated_User to the Dashboard.
4. IF a Visitor submits a login form with invalid credentials, THEN THE Auth_System SHALL display an error message indicating that the email or password is incorrect without revealing which field is wrong.
5. WHEN an Authenticated_User clicks the logout button, THE Auth_System SHALL terminate the session and redirect the user to the Coaching_Space public landing page.
6. IF a Visitor submits a registration form with an email address already associated with an existing account, THEN THE Auth_System SHALL display an error message indicating that the email is already in use.
7. WHEN a Visitor clicks the "forgot password" link, THE Auth_System SHALL send a password reset email to the provided address via Supabase Auth.

### Requirement 12: Coaching Foulée — Authenticated Dashboard

**User Story:** As an Authenticated_User, I want to see a personal dashboard with my session history and upcoming appointments, so that I can track my coaching journey.

#### Acceptance Criteria

1. WHEN an Authenticated_User navigates to the Dashboard, THE Coaching_Space SHALL display a summary of upcoming booked sessions, recent session history, and current Exercise_Program status.
2. THE Dashboard SHALL display the Authenticated_User's name and profile information.
3. WHILE an Authenticated_User has no booked sessions, THE Dashboard SHALL display a prompt to book a first session with a link to the appointment booking feature.
4. WHILE an Authenticated_User has no session history, THE Dashboard SHALL display a welcome message explaining how to get started with the coaching program.

### Requirement 13: Coaching Foulée — Workshop Registration and Appointment Booking

**User Story:** As a Visitor or Authenticated_User, I want to register for upcoming workshop sessions directly on the site, so that I don't need to use an external Doodle link.

#### Acceptance Criteria

1. THE Platform SHALL display a workshop calendar showing all upcoming "Atelier Foulée" dates with the day, time (18h20), location (esplanade de l'écluse de Rochetaillée), and remaining spots (max 10-12 per session).
2. WHEN a Visitor selects a workshop date, THE Platform SHALL display a registration form requesting name, email, phone number, and an optional message.
3. WHEN a Visitor submits a valid registration, THE Platform SHALL create a booking record in the Supabase database, decrement the available spots count, and display a confirmation message with the workshop details.
4. THE Platform SHALL send a confirmation email to the registrant with the workshop date, time, location, and what to bring (road running shoes, sportswear).
5. IF a workshop session has reached maximum capacity, THE Platform SHALL display the session as "Complet" and offer a waitlist option.
6. WHEN a registrant cancels their booking (via a link in the confirmation email or from their account), THE Platform SHALL free the spot and notify the first person on the waitlist if applicable.
7. THE Platform SHALL allow registration without creating an account (guest registration with email), but SHALL prompt the registrant to create an account for ongoing coaching follow-up after the workshop.
8. THE Admin_User SHALL be able to create new workshop dates, set capacity, and view the list of registrants for each session.
9. THE Platform SHALL send a reminder email to all registrants 24 hours before the workshop date.

### Requirement 14: Coaching Foulée — Exercise Programs

**User Story:** As an Authenticated_User, I want to view and follow exercise programs assigned to me, so that I can practice between coaching sessions.

#### Acceptance Criteria

1. WHEN an Authenticated_User navigates to the exercise section of the Coaching_Space, THE Platform SHALL display the list of Exercise_Programs assigned to the Authenticated_User.
2. WHEN an Authenticated_User selects an Exercise_Program, THE Platform SHALL display the program details including exercise names, descriptions, repetitions, and instructional notes.
3. WHEN an Authenticated_User marks an exercise as completed, THE Platform SHALL record the completion in the Supabase database with a timestamp.
4. THE Exercise_Program view SHALL display the Authenticated_User's completion percentage for the current program.

### Requirement 15: Coaching Foulée — Progress Tracking

**User Story:** As an Authenticated_User, I want to see my progress over time with visual charts, so that I can understand my improvement and stay motivated.

#### Acceptance Criteria

1. WHEN an Authenticated_User navigates to the progress section of the Coaching_Space, THE Progress_Tracker SHALL display a timeline of completed sessions with dates and notes.
2. THE Progress_Tracker SHALL display visual charts showing the Authenticated_User's exercise completion rate over time.
3. THE Progress_Tracker SHALL display the total number of sessions completed, exercises completed, and active weeks for the Authenticated_User.
4. WHEN an Authenticated_User has fewer than two data points, THE Progress_Tracker SHALL display a message encouraging the user to complete more sessions before progress charts become available.

### Requirement 16: Responsive Design and Accessibility

**User Story:** As a Visitor, I want the platform to be fully usable on mobile, tablet, and desktop devices, so that I can access information and services from any device.

#### Acceptance Criteria

1. THE Platform SHALL render correctly and remain fully functional at viewport widths of 375px (mobile), 768px (tablet), 1024px (laptop), and 1440px (desktop).
2. THE Platform SHALL use the Design_System colors: primary pink (#EC4899), primary purple (#8B5CF6), with appropriate contrast ratios meeting WCAG 2.1 AA standards (minimum 4.5:1 for normal text).
3. THE Platform SHALL use Varela Round for headings and Nunito Sans for body text, loaded via Google Fonts with appropriate fallback fonts.
4. THE Platform SHALL ensure all images include descriptive alt text attributes.
5. THE Platform SHALL ensure all interactive elements are reachable and operable via keyboard navigation.
6. THE Platform SHALL respect the user's prefers-reduced-motion setting by disabling non-essential animations, 3D scene animations, and scroll-driven transitions, replacing them with static equivalents.
7. THE Platform SHALL apply the Soft UI Evolution design style with soft shadows, rounded corners, gradient accents using the pink-to-purple color palette, and 3D depth effects (perspective transforms, layered parallax) on landing pages.

### Requirement 17: SEO and Performance

**User Story:** As a Visitor, I want the platform to load quickly and appear in search engine results, so that I can find Aline Nebout's services through web search.

#### Acceptance Criteria

1. THE Platform SHALL render all public pages (Osteopathy_Landing, Specialty_Section pages, Reflexes_Space pages, Coaching_Space landing page, About, Contact) using Next.js server-side rendering or static generation for search engine indexing.
2. THE Platform SHALL include appropriate meta tags (title, description, Open Graph) on every public page with content relevant to the page topic.
3. THE Platform SHALL generate a sitemap.xml file listing all public pages.
4. THE Platform SHALL optimize all images using Next.js Image component with appropriate sizing, lazy loading, and modern formats (WebP).
5. WHEN a public page is loaded, THE Platform SHALL achieve a Lighthouse Performance score of 90 or above on desktop.

### Requirement 18: Supabase Data Layer

**User Story:** As a developer, I want a well-structured Supabase backend, so that user data, bookings, exercises, and progress are stored securely and efficiently.

#### Acceptance Criteria

1. THE Platform SHALL store Authenticated_User profiles, booking records, Exercise_Programs, exercise completions, and progress data in a Supabase PostgreSQL database.
2. THE Platform SHALL enforce Row Level Security (RLS) policies on all Supabase tables so that each Authenticated_User can only read and modify their own data.
3. WHEN an Authenticated_User is deleted, THE Platform SHALL cascade-delete all associated booking records, exercise completions, and progress data.
4. THE Platform SHALL use Supabase Auth for all authentication operations (registration, login, logout, password reset) without storing passwords in the application database.
5. IF a database query fails, THEN THE Platform SHALL display a user-friendly error message and log the error details server-side without exposing database internals to the user.

### Requirement 19: Internationalization Readiness

**User Story:** As a developer, I want the platform content to be structured for the French language with internationalization readiness, so that future language support can be added without restructuring.

#### Acceptance Criteria

1. THE Platform SHALL display all user-facing text in French as the default and primary language.
2. THE Platform SHALL store user-facing text strings in a centralized location (e.g., translation files or CMS) rather than hardcoding them in component templates.
3. THE Platform SHALL set the HTML lang attribute to "fr" on all pages.

### Requirement 20: Legal and Privacy Compliance

**User Story:** As a Visitor, I want to understand how my data is handled, so that I can make informed decisions about using the platform.

#### Acceptance Criteria

1. THE Platform SHALL display a cookie consent banner on the first visit, allowing the Visitor to accept or reject non-essential cookies before any tracking scripts are loaded.
2. THE Platform SHALL provide a Privacy Policy page (Politique de Confidentialité) describing data collection, storage, and usage practices in compliance with GDPR.
3. THE Platform SHALL provide a Legal Notice page (Mentions Légales) containing the practitioner's professional information as required by French law.
4. WHEN an Authenticated_User requests account deletion, THE Platform SHALL delete the user account and all associated data within 30 days as required by GDPR.

### Requirement 21: Immersive 3D Visual Experience

**User Story:** As a Visitor, I want to experience a visually immersive landing page with 3D elements, scroll-driven animations, and interactive visuals, so that I feel the premium quality and care of Aline Nebout's practice from the first moment.

#### Acceptance Criteria

1. THE Platform SHALL integrate React Three Fiber (@react-three/fiber) and Drei (@react-three/drei) for rendering 3D scenes on the landing pages of each universe.
2. THE Osteopathy_Landing hero section SHALL feature an Immersive_Scene with an animated 3D element (organic flowing shape, abstract body silhouette, or particle system) that uses the Design_System pink-to-purple gradient as material colors.
3. THE Immersive_Scene SHALL respond to the Visitor's mouse position (desktop) or device orientation (mobile) with smooth parallax camera or object movement, using a damping factor for fluid motion.
4. THE Platform SHALL implement Scroll_Animations on each landing page using Framer Motion or GSAP ScrollTrigger, triggering section reveals, text fade-ins, card stagger animations, and 3D object transformations as the Visitor scrolls.
5. THE Reflexes_Space landing page SHALL feature an Interactive_3D_Element representing the three Spheres (motor, emotional, cognitive) as interconnected 3D nodes or an animated brain/neural network visualization that the Visitor can rotate or explore.
6. THE Coaching_Space public landing page SHALL feature a 3D running figure or motion trail animation that plays on scroll, illustrating the coaching concept visually.
7. WHEN a Visitor hovers over a service card or feature card on any landing page, THE card SHALL apply a 3D tilt effect using CSS perspective transforms (rotateX/rotateY based on cursor position) with smooth transitions (200-300ms).
8. THE Platform SHALL render a subtle animated particle or gradient mesh background on the hero sections that moves slowly and continuously, creating visual depth without distracting from the content.
9. THE Platform SHALL lazy-load all 3D scenes using React Suspense with a lightweight placeholder (gradient or skeleton) to prevent blocking the initial page render.
10. WHILE the Visitor's device does not support WebGL or has prefers-reduced-motion enabled, THE Platform SHALL gracefully degrade by hiding 3D scenes and displaying static gradient backgrounds with the same color palette instead.
11. THE 3D scenes SHALL NOT cause the page's Largest Contentful Paint (LCP) to exceed 2.5 seconds on a mid-range mobile device over a 4G connection.
12. THE Platform SHALL use smooth page transitions between universe landing pages with crossfade or slide animations (300-500ms duration) to reinforce the premium visual experience.

### Requirement 22: Social Media Integration and Sharing

**User Story:** As a Visitor, I want to easily share content from the platform on social media and find Aline Nebout's social profiles, so that I can follow her activity and recommend her services to others.

#### Acceptance Criteria

1. THE Platform SHALL display social media profile links (Instagram, Facebook, LinkedIn) in the footer of every page and on the Contact page.
2. WHEN a Visitor views a Reflex_Article page, THE Platform SHALL display share buttons for Facebook, Instagram Stories (via link copy), LinkedIn, and WhatsApp, pre-populated with the article title, description, and URL.
3. THE Platform SHALL generate Open Graph meta tags (og:title, og:description, og:image, og:url) and Twitter Card meta tags on every public page so that shared links display rich previews on social platforms.
4. THE Osteopathy_Landing, Reflexes_Space landing page, and Coaching_Space landing page SHALL each include a unique og:image designed as a branded visual card (1200x630px) using the Design_System colors and Aline Nebout branding.
5. WHEN a Visitor shares a Reflex_Article, THE og:image SHALL display the article title and a visual related to the reflex topic, formatted as a branded card.

### Requirement 23: Blog and Content Marketing Engine

**User Story:** As a Visitor, I want to read regularly updated articles about osteopathy, reflexes, and running, so that I can learn from Aline Nebout's expertise and return to the site frequently.

#### Acceptance Criteria

1. THE Platform SHALL provide a blog section accessible from the Navigation_System, listing articles across all three universes (osteopathy tips, reflex education, running/coaching advice).
2. WHEN a new blog article is published, THE Platform SHALL display it on the blog index page with a title, publication date, category tag (Ostéopathie, Réflexes Archaïques, or Coaching Foulée), a short excerpt, and a featured image.
3. THE blog index page SHALL support filtering by category (universe) and display articles in reverse chronological order.
4. EACH blog article page SHALL include a structured data markup (JSON-LD Article schema) for enhanced search engine visibility.
5. EACH blog article page SHALL include a call-to-action section at the bottom linking to the Booking_Widget or the Coaching_Space sign-up, depending on the article category.
6. THE blog article pages SHALL include related article suggestions (2-3 articles from the same category) at the bottom of the page.

### Requirement 24: Google Business Profile and Local SEO

**User Story:** As a Visitor searching for an osteopath near Rochetaillée-sur-Saône, I want to find Aline Nebout's practice in local search results, so that I can discover her services through Google Search and Google Maps.

#### Acceptance Criteria

1. THE Platform SHALL include LocalBusiness structured data markup (JSON-LD) on the Osteopathy_Landing and Contact pages, containing the practice name, address, phone number, opening hours, geo-coordinates, and service types.
2. THE Platform SHALL include a link to the Google Business Profile in the Contact page and footer.
3. THE Contact page SHALL embed a Google Maps widget showing the practice location with the correct pin at 324 quai Pierre Dupont, Rochetaillée-sur-Saône.
4. THE Platform SHALL generate location-specific meta descriptions on the Osteopathy_Landing page mentioning "Rochetaillée-sur-Saône", "Lyon", and "Monts d'Or" for local search relevance.

### Requirement 25: Newsletter and Email Capture

**User Story:** As a Visitor, I want to subscribe to a newsletter, so that I can receive updates about new articles, workshops, and coaching sessions from Aline Nebout.

#### Acceptance Criteria

1. THE Platform SHALL display a newsletter subscription form on the blog index page and in the footer of all public pages, requesting only an email address.
2. WHEN a Visitor submits a valid email address, THE Platform SHALL store the subscription in the Supabase database and display a confirmation message.
3. IF a Visitor submits an email address already subscribed, THEN THE Platform SHALL display a message indicating the email is already registered.
4. THE newsletter subscription form SHALL include a checkbox for GDPR consent with a link to the Privacy Policy page.
5. THE Platform SHALL provide an unsubscribe mechanism in every email sent, removing the subscriber from the database upon confirmation.

### Requirement 26: Social Proof and Testimonials

**User Story:** As a Visitor, I want to read testimonials from other patients and coaching clients, so that I can feel confident about the quality of Aline Nebout's services.

#### Acceptance Criteria

1. THE Osteopathy_Landing SHALL display a testimonials section showing at least 3 patient testimonials with first name, service type, and review text.
2. THE Coaching_Space public landing page SHALL display testimonials from coaching clients.
3. THE testimonials SHALL be stored in the Supabase database and manageable by an admin interface or directly in the database.
4. WHEN a testimonial is displayed, THE Platform SHALL show a star rating (1-5) if available, the reviewer's first name, and the service category.

### Requirement 27: Analytics and Conversion Tracking

**User Story:** As a site owner, I want to track visitor behavior and conversion events, so that I can understand which content drives appointments and optimize the platform accordingly.

#### Acceptance Criteria

1. THE Platform SHALL integrate a privacy-compliant analytics solution (e.g., Plausible, Umami, or Google Analytics with consent) that tracks page views, unique visitors, and referral sources.
2. THE Platform SHALL track conversion events: Doctolib booking button clicks, coaching sign-up completions, newsletter subscriptions, and phone number clicks.
3. THE analytics integration SHALL only load after the Visitor has accepted analytics cookies via the cookie consent banner.
4. THE Platform SHALL expose a simple analytics dashboard or provide access to the analytics service for the site owner to review traffic and conversion data.

### Requirement 28: Pôle Santé — Practitioner Directory

**User Story:** As a Visitor, I want to browse a directory of all health and social practitioners at the Pôle Santé, so that I can find the right professional for my needs and discover the full range of services available locally.

#### Acceptance Criteria

1. THE Platform SHALL display a Practitioner_Directory page listing all practitioners operating within or affiliated with the Pôle_Santé, including their name, profession, photo, and a short description.
2. THE Practitioner_Directory SHALL include the current known practitioners: Marion Grosdemange (orthophoniste), Charles Porot (infirmier), Clémentine Lyonnet (infirmière), Tiffany Charry (éducatrice spécialisée), Sophie Pierre (sage-femme, Fontaines-sur-Saône), and Aline Nebout (ostéopathe).
3. WHEN a Visitor clicks on a practitioner card, THE Platform SHALL navigate to the corresponding Practitioner_Profile page.
4. THE Practitioner_Directory SHALL support filtering by profession type (ostéopathe, orthophoniste, infirmier, sage-femme, éducatrice spécialisée, etc.).
5. THE Practitioner_Directory SHALL be accessible from the Navigation_System under a "Pôle Santé" section.

### Requirement 29: Pôle Santé — Practitioner Profile Pages

**User Story:** As a Visitor, I want to view a detailed profile for each practitioner, so that I can learn about their qualifications, specialties, and how to book an appointment with them.

#### Acceptance Criteria

1. WHEN a Visitor navigates to a Practitioner_Profile page, THE Platform SHALL display the practitioner's full name, profession, photo, detailed description, specialties, contact information (phone, email), and external booking link (e.g., Doctolib) if available.
2. THE Practitioner_Profile page SHALL display the practitioner's office location within the Pôle_Santé or affiliated address.
3. THE Practitioner_Profile page SHALL include a call-to-action button linking to the practitioner's booking system or contact method.
4. THE Practitioner_Profile page SHALL include breadcrumb navigation: Home > Pôle Santé > [Practitioner Name].

### Requirement 30: Pôle Santé — Practitioner Account Management

**User Story:** As a practitioner at the Pôle Santé, I want to manage my own profile on the platform, so that I can keep my information up to date without relying on Aline.

#### Acceptance Criteria

1. WHEN a Practitioner_Account logs in, THE Platform SHALL display a profile management interface where the practitioner can edit their name, photo, description, specialties, contact information, and booking link.
2. THE Auth_System SHALL support a "practitioner" role distinct from the "coaching_user" and "admin" roles, with permissions limited to managing their own Practitioner_Profile and participating in the Community_Space.
3. WHEN a Practitioner_Account updates their profile, THE changes SHALL be reflected on the public Practitioner_Profile page immediately after saving.
4. THE Admin_User SHALL be able to invite new practitioners by email, creating a Practitioner_Account with a registration link.

### Requirement 31: Community Space for Local Health Professionals

**User Story:** As a practitioner at the Pôle Santé, I want a private online space to communicate with other local health and social professionals, so that we can coordinate care, share resources, and build a local network.

#### Acceptance Criteria

1. THE Platform SHALL provide a Community_Space accessible only to authenticated Practitioner_Accounts and Admin_Users.
2. THE Community_Space SHALL display a feed of Community_Posts in reverse chronological order, with each post showing the author's name, profession, timestamp, and content.
3. WHEN a Practitioner_Account creates a Community_Post, THE Platform SHALL store it in the Supabase database and display it in the feed for all Community_Space members.
4. THE Community_Space SHALL support post categories: "Annonce" (announcement), "Ressource" (shared resource/document), "Question" (question to the group), and "Événement" (local event).
5. WHEN a Practitioner_Account views the Community_Space, THE Platform SHALL allow filtering posts by category.
6. THE Community_Space SHALL support comments on Community_Posts, allowing threaded discussions between practitioners.
7. THE Community_Space SHALL support file attachments (PDF, images) on Community_Posts, stored in Supabase Storage.
8. THE Admin_User SHALL be able to moderate the Community_Space: pin posts, delete inappropriate content, and manage member access.

### Requirement 32: Rental Space Listings

**User Story:** As a Visitor or external practitioner, I want to browse available office spaces for rent at the Pôle Santé, so that I can find a consultation room to practice from.

#### Acceptance Criteria

1. THE Platform SHALL display a Rental_Listings page listing all available Rental_Spaces within the Pôle_Santé, accessible from the Navigation_System under the "Pôle Santé" section.
2. EACH Rental_Listing SHALL display the space name or number, photos, surface area, amenities (furnished, waiting room access, parking, accessibility), rental pricing (hourly, daily, monthly), and current availability status.
3. WHEN a Visitor clicks on a Rental_Listing, THE Platform SHALL display a detailed page with a full description, a photo gallery, pricing details, availability calendar, and a contact/inquiry form.
4. THE Rental_Listing detail page SHALL include a Rental_Inquiry form requesting the Visitor's name, email, phone, desired rental period, and a message.
5. WHEN a Visitor submits a Rental_Inquiry, THE Platform SHALL store the inquiry in the Supabase database and send a notification email to the Admin_User.

### Requirement 33: Rental Space Management (Admin)

**User Story:** As an Admin_User, I want to manage rental listings and inquiries, so that I can keep availability up to date and respond to potential tenants.

#### Acceptance Criteria

1. WHEN an Admin_User navigates to the rental management section, THE Platform SHALL display a list of all Rental_Spaces with their current status (available, occupied, maintenance).
2. THE Admin_User SHALL be able to create, edit, and archive Rental_Listings, including uploading photos, setting pricing, and updating availability.
3. THE Admin_User SHALL be able to view all Rental_Inquiries with their status (new, contacted, confirmed, declined) and update the status.
4. WHEN a Rental_Inquiry status is updated, THE Platform SHALL send a notification email to the inquirer if the status changes to "contacted" or "confirmed".
5. THE Admin_User SHALL be able to mark a Rental_Space as occupied and associate it with a tenant name and rental period.

### Requirement 34: Admin Dashboard

**User Story:** As an Admin_User, I want a centralized dashboard to manage all aspects of the platform, so that I can oversee practitioners, rentals, community, content, and analytics from one place.

#### Acceptance Criteria

1. WHEN an Admin_User logs in, THE Platform SHALL display an admin dashboard with summary cards for: total practitioners, active rental inquiries, new community posts, pending newsletter subscribers, and recent blog articles.
2. THE admin dashboard SHALL provide navigation to: Practitioner management, Rental management, Community moderation, Blog/content management, Newsletter subscriber list, and Testimonial management.
3. THE Admin_User role SHALL be assignable only by another Admin_User or via direct Supabase database configuration.
4. THE admin dashboard SHALL be accessible at a dedicated route (e.g., /admin) protected by role-based access control.
