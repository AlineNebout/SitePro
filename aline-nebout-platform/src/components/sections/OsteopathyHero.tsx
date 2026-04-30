"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DoctolibButton from "@/components/booking/DoctolibButton";

export default function OsteopathyHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isLoaded ? { opacity: 0.35, scale: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary-light/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isLoaded ? { opacity: 0.25, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/20 to-primary-light/15 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.15 } : {}}
          transition={{ duration: 2.5, delay: 0.6 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Text */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-primary/20 mx-auto lg:mx-0"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-text-dark">Ostéopathe D.O. — Rochetaillée-sur-Saône</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight"
            >
              <span className="bg-gradient-to-r from-text-dark via-primary to-accent bg-clip-text text-transparent">
                Ostéopathie douce
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-xl sm:text-2xl text-text-muted"
            >
              Pour toute la famille
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-text-muted/80 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Nourrissons, enfants, femmes enceintes, sportifs et adultes. Une approche manuelle douce pour rétablir l&apos;équilibre du corps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <DoctolibButton />
              <a
                href="tel:0478252862"
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-primary/20 text-text-dark px-6 py-3 rounded-xl font-semibold hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                04 78 25 28 62
              </a>
            </motion.div>
          </div>

          {/* Visual — Photo with glassmorphism effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-primary/25 via-primary-light/15 to-accent/25 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            <div className="relative">
              {/* Decorative gradient ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-sm" aria-hidden="true" />

              {/* Photo */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 border border-white/40">
                <img
                  src="/images/Aline_cabinet.jpg"
                  alt="Aline Nebout dans son cabinet d'ostéopathie"
                  className="w-full max-w-md h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-soft/50 to-transparent" />
              </div>

              {/* Floating glassmorphism badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/50"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <span className="text-xs text-text-muted font-medium">Google</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -top-4 -left-4 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/50"
              >
                <p className="text-sm font-bold text-primary">1500+</p>
                <p className="text-xs text-text-muted">patients fidèles</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
