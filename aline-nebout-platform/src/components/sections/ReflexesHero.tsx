"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DoctolibButton from "@/components/booking/DoctolibButton";

const sphereData = [
  { label: "Moteur", color: "bg-primary", glowColor: "from-primary/30" },
  { label: "Émotionnel", color: "bg-accent", glowColor: "from-accent/30" },
  { label: "Cognitif", color: "bg-[#10B981]", glowColor: "from-[#10B981]/30" },
];

export default function ReflexesHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated gradient blobs — 3 colors for 3 spheres */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isLoaded ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent/25 to-accent/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isLoaded ? { opacity: 0.25, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#10B981]/20 to-[#10B981]/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.2 } : {}}
          transition={{ duration: 2.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-primary-light/15 blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-accent/20 mx-auto lg:mx-0"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-text-dark">Depuis 2024 — Rochetaillée-sur-Saône</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight"
            >
              <span className="bg-gradient-to-r from-accent via-primary to-[#10B981] bg-clip-text text-transparent">
                Réflexes Archaïques
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-xl sm:text-2xl text-text-muted"
            >
              Intégration des réflexes primitifs
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-text-muted/80 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Les réflexes archaïques non intégrés peuvent impacter le développement moteur, émotionnel et cognitif. Enfants et adultes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <DoctolibButton label="Prendre rendez-vous" />
              <a
                href="#spheres"
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-accent/20 text-text-dark px-6 py-3 rounded-xl font-semibold hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
                Découvrir
              </a>
            </motion.div>
          </div>

          {/* Visual — 3 Sphere glassmorphism cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Glow behind */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-accent/20 via-primary-light/10 to-[#10B981]/20 blur-3xl" />
              </div>

              {/* 3 stacked glassmorphism cards */}
              <div className="relative space-y-4">
                {sphereData.map((sphere, i) => (
                  <motion.div
                    key={sphere.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                    className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${sphere.color}/15 flex items-center justify-center`}>
                      <div className={`w-4 h-4 rounded-full ${sphere.color}`} />
                    </div>
                    <div>
                      <p className="font-heading text-base text-text-dark">Sphère {sphere.label.toLowerCase()}</p>
                      <p className="text-xs text-text-muted">
                        {sphere.label === "Moteur" && "Coordination, posture, écriture"}
                        {sphere.label === "Émotionnel" && "Stress, anxiété, hypersensibilité"}
                        {sphere.label === "Cognitif" && "Concentration, apprentissage, mémoire"}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-text-muted/40 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Connecting lines decoration */}
              <div className="absolute left-8 top-[72px] bottom-[72px] w-px bg-gradient-to-b from-primary/20 via-accent/20 to-[#10B981]/20" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
