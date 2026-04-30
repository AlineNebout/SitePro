import Link from "next/link";
import TiltCard from "@/components/animation/TiltCard";
import type { ReactNode } from "react";

interface SpecialtyCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  imageUrl?: string;
}

export default function SpecialtyCard({ title, description, icon, href, imageUrl }: SpecialtyCardProps) {
  return (
    <TiltCard>
      <Link href={href} className="block">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          {imageUrl && (
            <div className="w-full h-48 overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
          <div className="p-6">
            {!imageUrl && (
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                {icon}
              </div>
            )}
            <h3 className="font-heading text-lg mb-2">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
