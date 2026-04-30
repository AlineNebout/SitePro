import Link from "next/link";

interface DoctolibButtonProps {
  variant?: "primary" | "secondary";
  label?: string;
  className?: string;
}

const DOCTOLIB_URL = "https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout";

export default function DoctolibButton({
  variant = "primary",
  label = "Prendre rendez-vous",
  className = "",
}: DoctolibButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none";

  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white hover:bg-accent shadow-lg shadow-primary/20"
      : "border-2 border-primary text-primary hover:bg-primary hover:text-white";

  return (
    <Link
      href={DOCTOLIB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
      {label}
    </Link>
  );
}
