import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Administration",
  description: "Panneau d'administration de la plateforme Aline Nebout.",
};

async function getDashboardStats() {
  const supabase = await createClient();

  const [
    practitionersRes,
    rentalInquiriesRes,
    communityPostsRes,
    newsletterRes,
    blogRes,
    workshopsRes,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "practitioner"),
    supabase
      .from("rental_inquiries")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("community_posts")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("blog_articles")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("workshops")
      .select("id", { count: "exact", head: true })
      .eq("status", "upcoming"),
  ]);

  return {
    practitioners: practitionersRes.count ?? 0,
    rentalInquiries: rentalInquiriesRes.count ?? 0,
    communityPosts: communityPostsRes.count ?? 0,
    newsletter: newsletterRes.count ?? 0,
    blog: blogRes.count ?? 0,
    workshops: workshopsRes.count ?? 0,
  };
}

const COLOR_MAP: Record<string, { bg: string; text: string; iconBg: string }> = {
  primary: { bg: "bg-primary/5", text: "text-primary", iconBg: "bg-primary/10" },
  accent: { bg: "bg-accent/5", text: "text-accent", iconBg: "bg-accent/10" },
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Praticiens",
      value: String(stats.practitioners),
      href: "/admin/praticiens",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      color: "primary",
    },
    {
      label: "Demandes de location",
      value: String(stats.rentalInquiries),
      href: "/admin/locations",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      color: "accent",
    },
    {
      label: "Posts communauté",
      value: String(stats.communityPosts),
      href: "/admin/communaute",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      color: "primary",
    },
    {
      label: "Abonnés newsletter",
      value: String(stats.newsletter),
      href: "/admin/newsletter",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      color: "accent",
    },
    {
      label: "Ateliers à venir",
      value: String(stats.workshops),
      href: "/admin/ateliers",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      color: "accent",
    },
    {
      label: "Articles blog",
      value: String(stats.blog),
      href: "/admin/blog",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      ),
      color: "primary",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-text-dark mb-2">
          Administration
        </h1>
        <p className="text-text-muted text-sm">
          Vue d&apos;ensemble de la plateforme
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((stat) => {
          const colors = COLOR_MAP[stat.color];
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="block group"
            >
              <div className={`${colors.bg} border-2 border-transparent hover:border-${stat.color}/20 rounded-2xl p-6 transition-all duration-200 cursor-pointer`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0`}>
                    <span className={colors.text}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-text-dark">{stat.value}</p>
                    <p className="text-text-muted text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="font-heading text-lg text-text-dark mb-4">Accès rapide</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gérer les ateliers", href: "/admin/ateliers" },
            { label: "Gérer le blog", href: "/admin/blog" },
            { label: "Gérer les témoignages", href: "/admin/temoignages" },
            { label: "Voir les abonnés", href: "/admin/newsletter" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md text-sm font-medium text-text-dark hover:text-primary transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {link.label}
              <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
