-- ============================================
-- Aline Nebout Platform — Initial Schema
-- ============================================

-- Role enum
CREATE TYPE user_role AS ENUM ('coaching_user', 'practitioner', 'admin');

-- Post category enum
CREATE TYPE post_category AS ENUM ('annonce', 'ressource', 'question', 'evenement');

-- Workshop status enum
CREATE TYPE workshop_status AS ENUM ('upcoming', 'full', 'completed', 'cancelled');

-- Booking status enum
CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'waitlisted');

-- Rental status enum
CREATE TYPE rental_status AS ENUM ('available', 'occupied', 'maintenance');

-- Inquiry status enum
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'confirmed', 'declined', 'completed');

-- Blog/article category enum
CREATE TYPE content_category AS ENUM ('osteopathie', 'reflexes', 'coaching');

-- School request type enum
CREATE TYPE school_request_type AS ENUM ('information_session', 'workshop', 'screening');

-- Sphere enum
CREATE TYPE sphere_type AS ENUM ('motor', 'emotional', 'cognitive');

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'coaching_user',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'coaching_user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SPECIALTIES
-- ============================================
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  indications TEXT NOT NULL DEFAULT '',
  treatment_approach TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- ============================================
-- REFLEX ARTICLES
-- ============================================
CREATE TABLE reflex_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  signs_of_non_integration TEXT NOT NULL DEFAULT '',
  integration_approach TEXT NOT NULL DEFAULT '',
  spheres sphere_type[] NOT NULL DEFAULT '{}',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- BLOG ARTICLES
-- ============================================
CREATE TABLE blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category content_category NOT NULL,
  featured_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  service_type content_category NOT NULL,
  review_text TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- NEWSLETTER & LEADS
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE TABLE lead_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'parent_guide',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE school_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  request_type school_request_type NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  status inquiry_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- PRACTITIONER PROFILES
-- ============================================
CREATE TABLE practitioner_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  profession TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  specialties TEXT[] DEFAULT '{}',
  phone TEXT,
  email TEXT,
  booking_url TEXT,
  photo_url TEXT,
  office_location TEXT,
  slug TEXT NOT NULL UNIQUE,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- WORKSHOPS & BOOKINGS
-- ============================================
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TIMESTAMPTZ NOT NULL,
  time_display TEXT NOT NULL DEFAULT '18h20',
  location TEXT NOT NULL DEFAULT 'Esplanade de l''écluse de Rochetaillée',
  max_capacity INT NOT NULL DEFAULT 12,
  current_count INT NOT NULL DEFAULT 0,
  status workshop_status NOT NULL DEFAULT 'upcoming',
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workshop_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  message TEXT,
  status booking_status NOT NULL DEFAULT 'confirmed',
  cancel_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workshop_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- EXERCISE PROGRAMS
-- ============================================
CREATE TABLE exercise_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES exercise_programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  repetitions INT,
  instructional_notes TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE program_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES exercise_programs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(program_id, user_id)
);

CREATE TABLE exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- COMMUNITY
-- ============================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category post_category NOT NULL DEFAULT 'annonce',
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'pdf',
  file_size INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- RENTAL SPACES
-- ============================================
CREATE TABLE rental_spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  surface_area FLOAT,
  amenities TEXT[] DEFAULT '{}',
  pricing JSONB DEFAULT '{}',
  photo_urls TEXT[] DEFAULT '{}',
  status rental_status NOT NULL DEFAULT 'available',
  tenant_name TEXT,
  tenant_period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE rental_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_space_id UUID NOT NULL REFERENCES rental_spaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  desired_period TEXT,
  message TEXT NOT NULL DEFAULT '',
  status inquiry_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflex_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_inquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read specialties" ON specialties FOR SELECT USING (true);
CREATE POLICY "Public read reflex_articles" ON reflex_articles FOR SELECT USING (true);
CREATE POLICY "Public read published blog" ON blog_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published practitioners" ON practitioner_profiles FOR SELECT USING (is_published = true);
CREATE POLICY "Public read upcoming workshops" ON workshops FOR SELECT USING (true);
CREATE POLICY "Public read rental spaces" ON rental_spaces FOR SELECT USING (true);
CREATE POLICY "Public read exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Public read exercise programs" ON exercise_programs FOR SELECT USING (true);

-- User-scoped policies
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users read own bookings" ON workshop_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert bookings" ON workshop_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users read own assignments" ON program_assignments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own completions" ON exercise_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert completions" ON exercise_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Practitioner policies
CREATE POLICY "Practitioners read community" ON community_posts FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin')));
CREATE POLICY "Practitioners create posts" ON community_posts FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin')));
CREATE POLICY "Authors update own posts" ON community_posts FOR UPDATE
  USING (auth.uid() = author_id);
CREATE POLICY "Practitioners read comments" ON community_comments FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin')));
CREATE POLICY "Practitioners create comments" ON community_comments FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin')));
CREATE POLICY "Practitioners update own profile" ON practitioner_profiles FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Practitioners read attachments" ON post_attachments FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin')));

-- Admin policies
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage all" ON blog_articles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage testimonials" ON testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage workshops" ON workshops FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage newsletter" ON newsletter_subscribers FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage leads" ON lead_captures FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage school inquiries" ON school_inquiries FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage rentals" ON rental_spaces FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage rental inquiries" ON rental_inquiries FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin manage practitioners" ON practitioner_profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin delete community posts" ON community_posts FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Public insert policies (for forms)
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert leads" ON lead_captures FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert school inquiries" ON school_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert rental inquiries" ON rental_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert waitlist" ON workshop_waitlist FOR INSERT WITH CHECK (true);
