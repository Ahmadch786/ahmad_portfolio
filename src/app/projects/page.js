"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import React, { useEffect } from "react";
import gsap from "gsap";

const projects = [
  {
    id: "01", title: "EXPAT CARE", tag: "Next.js & Node", year: "2024",
    desc: "A comprehensive multi-panel healthcare platform featuring an advanced appointment system and real-time chat between patients and doctors, fully managed by an admin dashboard.",
    img: "/assets/proj1.png",
    link: "https://expatcares.ae/"
  },
  {
    id: "02", title: "HEALENTRA", tag: "Full Stack HealthTech", year: "2024",
    desc: "A dedicated healthcare application featuring three distinct panels for doctors, patients, and administrators to streamline medical management and patient care.",
    img: "/assets/proj2.png",
    link: "https://dgbeorwuitdiy.cloudfront.net/"
  },
  {
    id: "03", title: "ALURA THERAPIST", tag: "SaaS & WebRTC", year: "2023",
    desc: "A robust SaaS platform for mental health clinics featuring 4 distinct panels (Admin, Clinic, Therapist, Patient) with real-time video calls, live chat, and lesson assignments.",
    img: "/assets/proj3.png",
    link: "https://alurareset.com/"
  },
  {
    id: "04", title: "KDC SERENITY", tag: "Frontend & API", year: "2026",
    desc: "A welcoming user-facing interface for a serenity home care platform, powered by an optimized external API to deliver fast and reliable service listings.",
    img: "/assets/proj4.png",
    link: "https://kdcserenityhome.com/"
  },
  {
    id: "05", title: "VISIONARY AI", tag: "AI SaaS & Next.js", year: "2025",
    desc: "A cutting-edge AI SaaS application equipped with advanced image enhancement, seamless object removal, and high-quality generative AI tools.",
    img: "/assets/proj5.png",
    link: "#"
  },
  {
    id: "06", title: "SWIFT DISPATCH", tag: "WebSockets & Tracking", year: "2025",
    desc: "A robust logistics and job dispatch system allowing real-time driver assignment, live map tracking, and efficient Uber-like ride management.",
    img: "/assets/proj6.png",
    link: "#"
  },
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  useEffect(() => {
    // Header text reveal animation
    const lines = document.querySelectorAll(".reveal-line");
    if (lines.length > 0) {
      gsap.fromTo(
        lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          delay: 0.4,
        }
      );
    }

    const fadeEls = document.querySelectorAll(".fade-up");
    if (fadeEls.length > 0) {
      gsap.fromTo(
        fadeEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.8,
        }
      );
    }
  }, []);

  return (
    <PageTransition className="relative min-h-screen bg-custom-bg text-custom-text overflow-hidden transition-colors duration-500">

      {/* Page Header */}
      <div className="pt-40 pb-20 px-6 relative z-10 border-b border-custom-border">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-custom-border bg-custom-bg-card mb-6 rounded-full fade-up opacity-0">
                <span className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,85,0,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Portfolio</span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-black text-custom-text tracking-tighter leading-[0.9] uppercase">
                <span className="block overflow-hidden relative py-1 md:py-3"><span className="inline-block translate-y-full opacity-0 reveal-line">Selected</span></span>
                <span className="block overflow-hidden relative py-1 md:py-3"><span className="inline-block translate-y-full opacity-0 reveal-line">Works.</span></span>
              </h1>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed font-semibold mb-4 uppercase tracking-widest text-justify fade-up opacity-0">
              A curated collection of full-stack engineering works—built with optimal scalability, database indexing, and fluid UIs.
            </p>
          </div>
        </div>
      </div>

      {/* Projects List - Brutalist Editorial Layout */}
      <div className="container mx-auto px-6 max-w-6xl py-24 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col"
        >
          {projects.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div key={p.id} variants={itemVariants} className="border-b border-custom-border">
                <Link href={`/project?id=${p.id}`}
                  className={`group flex flex-col md:flex-row items-center justify-between py-20 gap-12 md:gap-0 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >

                  {/* Number & Title */}
                  <div className={`flex items-center gap-6 w-full md:w-5/12 ${!isEven ? 'justify-start md:justify-end' : 'justify-start'}`}>
                    {isEven ? (
                      <>
                        <span className="text-[6rem] md:text-[10rem] font-black text-zinc-200 dark:text-zinc-800/60 leading-none tracking-tighter select-none transition-all duration-500 group-hover:text-[var(--color-primary)]">
                          {p.id}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-zinc-400 dark:text-zinc-500 group-hover:text-custom-text uppercase leading-[0.85] tracking-tighter w-24 break-words transition-colors whitespace-pre-wrap">
                          {p.title.replace(" ", "\n")}
                        </h2>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl md:text-3xl font-black text-zinc-400 dark:text-zinc-500 group-hover:text-custom-text uppercase leading-[0.85] tracking-tighter w-24 break-words text-right transition-colors whitespace-pre-wrap">
                          {p.title.replace(" ", "\n")}
                        </h2>
                        <span className="text-[6rem] md:text-[10rem] font-black text-zinc-200 dark:text-zinc-800/60 leading-none tracking-tighter select-none transition-all duration-500 group-hover:text-[var(--color-primary)]">
                          {p.id}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div className="w-full md:w-3/12 flex justify-center px-6 order-last md:order-none mt-8 md:mt-0">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-[11px] md:text-xs max-w-[220px] text-justify leading-relaxed tracking-wide group-hover:text-custom-text transition-colors">
                      {p.desc}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div className={`w-full md:w-4/12 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <div className="relative w-full max-w-[280px] aspect-[3/4] bg-custom-bg-card border border-custom-border overflow-hidden rounded-[2rem] group-hover:scale-95 group-hover:border-[var(--color-primary)] transition-all duration-700 ease-out shadow-sm">
                      <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover grayscale opacity-90 dark:opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </PageTransition>
  );
}
