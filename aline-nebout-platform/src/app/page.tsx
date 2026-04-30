"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animation/ScrollReveal";
import TiltCard from "@/components/animation/TiltCard";
import NewsletterForm from "@/components/forms/NewsletterForm";

const universes = [
  {
    title: "Ostéopathie",
    description: "Ostéopathie douce pour toute la famille : femme enceinte, nourrisson, sportif, somato-émotionnel, cicatrices.",
    href: "/osteopathie",
    color: "from-primary to-primary-light",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Réflexes Archaïques",
    description: "Découvrir et accéder à son plein potentiel grâce à l'intégration des réflexes archaïques. Enfants et adultes.",
    href: "/reflexes",
    color: "from-accent to-accent-dark",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  {
    title: "Coaching Foulée",
    description: "Ateliers pour optimiser votre foulée en course à pied. Analyse vidéo personnalisée. +80 participants en saison 1.",
    href: "/coaching",
    color: "from-green-500 to-emerald-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <>
      {/* Premium Portrait Hero */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden -mt-20">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={isLoaded ? { opacity: 0.4, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={isLoaded ? { opacity: 0.3, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/15 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 0.2 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-light/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: Text content */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-primary/20 mx-auto lg:mx-0"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-text-dark">Professionnel de santé diplômé et certifié — Pôle Santé de Rochetaillée-sur-Saône</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-tight bg-gradient-to-r from-text-dark via-primary to-accent bg-clip-text text-transparent"
              >
                Aline Nebout
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-heading text-xl sm:text-2xl text-text-muted"
              >
                Ostéopathe D.O. · Réflexes Archaïques · Coaching Foulée
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-lg text-text-muted/80 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Une approche douce et globale pour toute la famille. Traileuse, triathlète et passionnée par le mouvement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="https://www.doctolib.fr/osteopathe/rochetaillee-sur-saone/aline-nebout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Prendre rendez-vous
                </Link>
                <a
                  href="tel:0478252862"
                  className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-primary/20 text-text-dark px-7 py-3.5 rounded-xl font-semibold hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  04 78 25 28 62
                </a>
              </motion.div>
            </div>

            {/* Right: Premium portrait with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative flex justify-center"
            >
              {/* Glow behind portrait */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/30 via-primary-light/20 to-accent/30 blur-3xl" />
              </div>

              {/* Portrait frame */}
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-sm" aria-hidden="true" />

                {/* Photo */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 border border-white/30">
                  <img
                    src="/images/Aline_cabinet.jpg"
                    alt="Aline Nebout dans son cabinet d'ostéopathie au Pôle Santé de Rochetaillée-sur-Saône"
                    className="w-full max-w-md h-auto object-cover"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-soft/60 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-primary/10"
                >
                  <p className="text-sm font-semibold text-text-dark">Diplômée depuis 2010</p>
                  <p className="text-xs text-text-muted">ISL — 6 ans d&apos;études</p>
                </motion.div>

                {/* Floating badge left */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-accent/10"
                >
                  <p className="text-sm font-semibold text-accent">+80 coureurs</p>
                  <p className="text-xs text-text-muted">Ateliers foulée saison 1</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 border-y border-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal delay={0}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-primary">1500+</p>
                <p className="text-sm text-text-muted mt-1">Patients fidèles</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">5</p>
                  <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <p className="text-sm text-text-muted">sur Google</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-primary">15 ans</p>
                <p className="text-sm text-text-muted mt-1">d&apos;expérience</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-primary">80+</p>
                <p className="text-sm text-text-muted mt-1">Coureurs coachés</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials from Google */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <span className="text-sm text-text-muted font-medium">5/5 sur Google</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl">Ce que disent mes patients</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Gaëlle",
                text: "Je recommande vivement. Elle suit ma fille dans le cadre d'un travail sur les Réflexes Archaïques, et les résultats sont vraiment au rendez-vous. Nous avons constaté de réels progrès.",
                service: "Réflexes Archaïques",
                date: "2025",
              },
              {
                name: "Malo",
                text: "Patient depuis maintenant près de 10 ans, Aline a toujours répondu présente. Régulièrement bloqué au niveau du dos, ses talents d'ostéopathe se rapprochent de la magie.",
                service: "Ostéopathie",
                date: "2023",
              },
              {
                name: "Pierre",
                text: "J'ai consulté Aline à plusieurs reprises lorsque j'avais le dos bloqué. Arrangeante pour les horaires et très à l'écoute, je suis toujours sorti soulagé.",
                service: "Ostéopathie",
                date: "2024",
              },
              {
                name: "Hélène",
                text: "Un bébé transformé grâce à Aline. Nous avons retrouvé notre bébé sourire après de longs mois à nous questionner sur son changement d'humeur.",
                service: "Nourrisson",
                date: "2019",
              },
              {
                name: "Loréline",
                text: "Un rdv pris en urgence pour un torticolis très douloureux. Aline est bienveillante et très douce, tout s'est résorbé quelques heures après. Merci !",
                service: "Ostéopathie",
                date: "2021",
              },
              {
                name: "Damien",
                text: "Merci beaucoup pour votre aide, je recommande vivement. Très bonne approche et très bon contact avec les enfants et nourrissons.",
                service: "Nourrisson",
                date: "2024",
              },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed flex-1 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary/5 flex items-center justify-between">
                    <div>
                      <p className="text-text-dark text-sm font-semibold">{review.name}</p>
                      <p className="text-text-muted text-xs">{review.service}</p>
                    </div>
                    <span className="text-text-muted/50 text-xs">{review.date}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-8">
            <a
              href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47f49456e369d261:0xb1fd3596e1d1f0ea?sa=X&ved=1t:8290&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              Voir tous les avis sur Google
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Universe cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Mes univers</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Trois approches complémentaires</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {universes.map((u, i) => (
              <ScrollReveal key={u.href} delay={i * 0.15}>
                <TiltCard>
                  <Link href={u.href} className="block">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${u.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        {u.icon}
                      </div>
                      <h3 className="font-heading text-xl mb-3">{u.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">{u.description}</p>
                      <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Découvrir
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Osteopathy — concrete benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Pourquoi consulter ?</p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-4">L&apos;ostéopathie, c&apos;est pour vous si...</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: "Vous avez mal au dos",
                desc: "Lombalgies, cervicalgies, dorsalgies, sciatiques, névralgies. L'ostéopathie identifie l'origine de la douleur et la traite en profondeur.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />,
              },
              {
                title: "Vous êtes enceinte",
                desc: "Douleurs de grossesse, préparation à l'accouchement, bilan post-partum, allaitement. Un accompagnement doux à chaque étape.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
              },
              {
                title: "Votre bébé pleure beaucoup",
                desc: "Coliques, torticolis, troubles du sommeil, régurgitations, déformation crânienne. Dès les premiers jours de vie.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
              },
              {
                title: "Vous êtes stressé(e)",
                desc: "Anxiété, troubles du sommeil, fatigue chronique, bruxisme. Le corps garde la mémoire des émotions — l'ostéopathie les libère.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />,
              },
              {
                title: "Vous faites du sport",
                desc: "Entorses, tendinites, douleurs de genou, préparation et récupération. Aline est elle-même traileuse et triathlète.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
              },
              {
                title: "Vous avez une cicatrice",
                desc: "Césarienne, appendicectomie, chirurgie. Les adhérences peuvent causer des douleurs à distance, même des années après.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
              },
              {
                title: "Votre enfant a des difficultés",
                desc: "Concentration, écriture, coordination, gestion des émotions. Les réflexes archaïques non intégrés peuvent en être la cause.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />,
              },
              {
                title: "Vous avez des maux de tête",
                desc: "Migraines, céphalées de tension, vertiges. L'ostéopathie agit sur les tensions crâniennes et cervicales qui en sont souvent la cause.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />,
              },
              {
                title: "Vous digérez mal",
                desc: "Ballonnements, reflux, constipation. L'ostéopathie viscérale restaure la mobilité des organes et améliore le transit.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />,
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{item.icon}</svg>
                  </div>
                  <h3 className="font-heading text-base mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Newsletter CTA */}
          <ScrollReveal>
            <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto border border-accent/15 mb-14">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-text-dark mb-2">
                  Restez informé(e)
                </h3>
                <p className="text-text-muted text-sm max-w-md mx-auto">
                  Recevez mes conseils en ostéopathie, réflexes archaïques et coaching foulée. Un email par mois, pas de spam.
                </p>
              </div>
              <div className="max-w-sm mx-auto">
                <NewsletterForm variant="footer" />
              </div>
            </div>
          </ScrollReveal>

          {/* Aline's mojo */}
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/5 via-white/90 to-accent/5 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-primary/10 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />

              <div className="relative z-10">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Ce qui m&apos;anime</p>
                <h3 className="font-heading text-2xl sm:text-3xl text-text-dark mb-6">
                  Installée depuis 13 ans à Rochetaillée
                </h3>
                <div className="space-y-4 text-text-muted leading-relaxed">
                  <p>
                    Ce qui me fait vibrer, c&apos;est le lien. Le lien avec mes patients, avec ce quartier que j&apos;aime, avec cette communauté de santé que nous construisons ensemble au Pôle Santé. Depuis 13 ans, je vis et travaille ici, au bord de la Saône, au pied des Monts d&apos;Or.
                  </p>
                  <p>
                    Mon métier, c&apos;est avant tout <strong className="text-text-dark">sentir les énergies</strong>. Sous mes mains, je perçois les tensions, les blocages, les émotions qui s&apos;enkystent. Chaque patient est unique, chaque corps raconte une histoire. Mon rôle, c&apos;est d&apos;écouter cette histoire et d&apos;aider le corps à retrouver son harmonie.
                  </p>
                  <p>
                    Ce qui me fait rêver ? Que chacun puisse <strong className="text-text-dark">vivre en harmonie</strong> — avec son corps, avec ses émotions, avec son environnement. Que les enfants puissent apprendre sans lutter contre leur propre corps. Que les sportifs puissent courir sans douleur. Que les mamans puissent vivre leur grossesse sereinement.
                  </p>
                  <p>
                    <strong className="text-text-dark">Aider les autres</strong>, c&apos;est ce qui donne du sens à chacune de mes journées. Et quand je ne suis pas au cabinet, vous me trouverez sur les sentiers — en trail ou en triathlon — parce que le mouvement, c&apos;est la vie.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img src="/images/portrait.jpg" alt="Aline Nebout" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-text-dark">Aline Nebout</p>
                    <p className="text-xs text-text-muted">Ostéopathe D.O. depuis 2010 — Rochetaillée-sur-Saône</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
