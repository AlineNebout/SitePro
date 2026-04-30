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
                <a href="tel:0478252862" className="hover:text-primary transition-colors duration-200 cursor-pointer">
                  04 78 25 28 62
                </a>
              </li>
              <li>
                <a href="tel:0615973609" className="hover:text-primary transition-colors duration-200 cursor-pointer">
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
          <div className="flex items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Aline Nebout — Ostéopathe D.O.</p>
            <Link href="/admin" className="text-text-muted/30 hover:text-text-muted/60 transition-colors duration-200 cursor-pointer" aria-label="Administration">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </Link>
          </div>
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
