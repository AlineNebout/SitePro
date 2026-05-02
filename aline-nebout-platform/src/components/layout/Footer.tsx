import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/30 border-t border-primary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-lg text-primary font-bold">
              Aline Nebout
            </Link>
            <p className="text-text-muted text-sm mt-2 leading-relaxed">
              Ostéopathe D.O. — Praticienne en intégration des réflexes archaïques — Traileuse &amp; Triathlète
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/aline-nebout-8a53936b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47f49456e369d261:0xb1fd3596e1d1f0ea?sa=X&ved=1t:8290&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                aria-label="Google Maps"
              >
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/alinenebout_osteo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a
                href="https://www.facebook.com/alinenebout.osteo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-bold mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/osteopathie" className="hover:text-primary transition-colors duration-200 cursor-pointer">Ostéopathie</Link></li>
              <li><Link href="/reflexes" className="hover:text-primary transition-colors duration-200 cursor-pointer">Réflexes Archaïques</Link></li>
              <li><Link href="/coaching" className="hover:text-primary transition-colors duration-200 cursor-pointer">Coaching Foulée</Link></li>
              <li><Link href="/pole-sante" className="hover:text-primary transition-colors duration-200 cursor-pointer">Pôle Santé</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47f49456e369d261:0xb1fd3596e1d1f0ea?sa=X&ved=1t:8290&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  324 quai Pierre Dupont
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47f49456e369d261:0xb1fd3596e1d1f0ea?sa=X&ved=1t:8290&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Pôle Santé de Rochetaillée-sur-Saône
                </a>
              </li>
              <li>
                <a href="tel:0478252862" className="hover:text-primary transition-colors duration-200 cursor-pointer" data-umami-event="phone-click">
                  04 78 25 28 62
                </a>
              </li>
              <li>
                <a href="tel:0615973609" className="hover:text-primary transition-colors duration-200 cursor-pointer" data-umami-event="phone-click">
                  06 15 97 36 09
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-sm font-bold mb-3">Informations</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/a-propos" className="hover:text-primary transition-colors duration-200 cursor-pointer">À propos</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors duration-200 cursor-pointer">Blog</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-primary transition-colors duration-200 cursor-pointer">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-primary transition-colors duration-200 cursor-pointer">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Aline Nebout — Ostéopathe D.O.</p>
          <a
            href="https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors duration-200 cursor-pointer font-medium"
          >
            Prendre rendez-vous sur Doctolib
          </a>
        </div>
      </div>
    </footer>
  );
}
