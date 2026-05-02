import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollReveal from "@/components/animation/ScrollReveal";
import RentalInquiryForm from "@/components/forms/RentalInquiryForm";
import { createClient } from "@/lib/supabase/server";

interface RentalSpace {
  id: string;
  name: string;
  description: string;
  status: string;
  tenant_name: string | null;
  tenant_profession: string | null;
  surface_area: number | null;
  amenities: string[] | null;
  pricing: Record<string, string> | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  available: { label: "Disponible", bg: "bg-[#10B981]/10", text: "text-[#10B981]" },
  occupied: { label: "Occupé", bg: "bg-primary/10", text: "text-primary" },
  maintenance: { label: "En travaux", bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]" },
};

async function getSpace(id: string): Promise<RentalSpace | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("rental_spaces")
      .select("id, name, description, status, tenant_name, tenant_profession, surface_area, amenities, pricing, created_at")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const space = await getSpace(id);

  if (!space) {
    return { title: "Espace introuvable" };
  }

  return {
    title: `${space.name} — Locations Pôle Santé`,
    description: `${space.name} au Pôle Santé de Rochetaillée-sur-Saône. ${space.description}`,
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const space = await getSpace(id);

  if (!space) {
    notFound();
  }

  const statusInfo = STATUS_LABELS[space.status] ?? STATUS_LABELS.available;
  const amenities = space.amenities ?? ["Meublé", "Accès salle d'attente", "Parking gratuit", "Wifi inclus"];
  const pricing = space.pricing as Record<string, string> | null;

  return (
    <>
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Pôle Santé", href: "/pole-sante" },
              { label: "Locations", href: "/pole-sante/locations" },
              { label: space.name },
            ]}
          />
        </div>
      </section>

      {/* Space details */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                {statusInfo.label}
              </span>
              {space.surface_area && (
                <span className="text-primary font-semibold text-sm">{space.surface_area} m²</span>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-text-dark mb-4">
              {space.name}
            </h1>
            <p className="text-text-muted text-lg leading-relaxed">
              {space.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tenant info if occupied */}
      {space.status === "occupied" && space.tenant_name && (
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-dark font-semibold">Actuellement occupé par {space.tenant_name}</p>
                  {space.tenant_profession && (
                    <p className="text-text-muted text-sm">{space.tenant_profession}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-6">Équipements et services</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-text-muted">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      {pricing && (pricing.halfDay || pricing.fullDay || pricing.monthly) && (
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-text-dark mb-6">Tarifs</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {pricing.halfDay && (
                    <div className="bg-bg-soft rounded-xl p-4 text-center">
                      <p className="text-text-muted text-sm mb-1">Demi-journée</p>
                      <p className="text-2xl font-bold text-primary">{pricing.halfDay}</p>
                    </div>
                  )}
                  {pricing.fullDay && (
                    <div className="bg-bg-soft rounded-xl p-4 text-center">
                      <p className="text-text-muted text-sm mb-1">Journée</p>
                      <p className="text-2xl font-bold text-primary">{pricing.fullDay}</p>
                    </div>
                  )}
                  {pricing.monthly && (
                    <div className="bg-bg-soft rounded-xl p-4 text-center">
                      <p className="text-text-muted text-sm mb-1">Mensuel</p>
                      <p className="text-2xl font-bold text-primary">{pricing.monthly}</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Inquiry form */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl text-text-dark mb-2">
                Intéressé par cet espace ?
              </h2>
              <p className="text-text-muted mb-6">
                Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
              </p>
              <RentalInquiryForm rentalSpaceId={space.id} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location info */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center">
            <div className="flex items-center justify-center gap-2 text-text-muted text-sm mb-2">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>324 quai Pierre Dupont, 69270 Rochetaillée-sur-Saône</span>
            </div>
            <p className="text-text-muted text-sm">
              À 15 min de Lyon, 5 min de Neuville-sur-Saône — Stationnement gratuit
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Back link */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/pole-sante/locations"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour aux espaces disponibles
          </Link>
        </div>
      </section>
    </>
  );
}
