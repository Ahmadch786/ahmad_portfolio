"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import React, { useEffect } from "react";
import gsap from "gsap";

const experiences = [
  {
    id: "03",
    role: "Full Stack Engineer",
    company: "ENDLESS INO",
    period: "Present",
    desc: "Currently engineering scalable web applications. Leading development on several major healthcare and specialized platforms. Implemented real-time features using WebSockets (Socket.io) across both frontend and backend architectures for live tracking and communication.",
    projects: ["e Expat Care", "Alura Therapist", "Telemed", "CareConnect", "Helantra Project", "WebSockets (Real-time)"],
  },
  {
    id: "02",
    role: "React.js & PHP Developer",
    company: "IT LOGIC",
    period: "8 Months",
    desc: "Engineered complex full-stack systems with React.js and PHP. Designed dynamic dashboards and logistics interfaces for tracking and management.",
    projects: ["Map Driver Tracking", "Booking & Dispatch", "Car Rental System", "Furniture E-Commerce"],
  },
  {
    id: "01",
    role: "Frontend Developer",
    company: "HKSTECHLAB",
    period: "3 Months",
    desc: "Started my career focused on building interactive, highly responsive client-side interfaces. Gained foundational experience in modern frontend workflows.",
    projects: ["UI/UX Implementation", "Responsive Design", "Frontend Optimization"],
  },
];

const skills = [
  { cat: "Frontend", items: ["React.js", "React Native", "Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"] },
  { cat: "Backend", items: ["Node.js", "PHP", "Express.js", "REST APIs", "Auth"] },
  { cat: "Database", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { cat: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
];

export default function Experience() {
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
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Career</span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-black text-custom-text tracking-tighter leading-[0.9] uppercase">
                <span className="block overflow-hidden relative py-1 md:py-3"><span className="inline-block translate-y-full opacity-0 reveal-line">Work</span></span>
                <span className="block overflow-hidden relative py-1 md:py-3"><span className="inline-block translate-y-full opacity-0 reveal-line">History.</span></span>
              </h1>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed font-semibold mb-4 uppercase tracking-widest text-justify fade-up opacity-0">
              A professional journey building high-grade production web applications and tracking systems.
            </p>
          </div>
        </div>
      </div>

      {/* Experience List - Minimalist CV Layout */}
      <div className="container mx-auto px-6 max-w-6xl py-24 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col"
        >
          {experiences.map((exp, idx) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <div className="group flex flex-col lg:flex-row items-start lg:items-stretch border-b border-custom-border py-16 transition-colors hover:bg-custom-bg-alt/40 -mx-6 px-6 lg:-mx-10 lg:px-10 rounded-[2rem] duration-500">

                {/* Left Side: Company & Period */}
                <div className="w-full lg:w-5/12 flex flex-col justify-between mb-8 lg:mb-0 pr-0 lg:pr-12">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black text-zinc-400 dark:text-zinc-600 group-hover:text-custom-text uppercase leading-[0.9] tracking-tighter break-words transition-colors">
                      {exp.company}
                    </h2>
                  </div>
                  <div className="mt-8 lg:mt-auto flex items-center gap-4">
                    <span className="text-[10px] font-bold border border-custom-border bg-custom-bg-card text-zinc-700 dark:text-zinc-300 px-5 py-2.5 uppercase tracking-widest rounded-full shadow-sm">{exp.period}</span>
                  </div>
                </div>

                {/* Right Side: Role & Details */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl md:text-3xl font-black text-custom-text tracking-tight">{exp.role}</h3>
                      <ArrowUpRight size={28} className="text-zinc-400 group-hover:text-[var(--color-primary)] transition-colors hidden md:block" />
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-sm md:text-base max-w-xl text-justify mb-10">
                      {exp.desc}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-4">Key Projects / Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map(p => (
                        <span key={p} className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 border border-custom-border bg-custom-bg-card shadow-sm px-4 py-2 uppercase tracking-wider group-hover:border-[var(--color-primary)] transition-colors rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Skills Section - Brutalist Update */}
      <div className="border-t border-zinc-900 py-32 px-6 relative z-10 bg-zinc-950 text-white dark:bg-zinc-950/70">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-800 bg-zinc-900 mb-6 rounded-full">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Expertise</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Technical<br />Arsenal.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-zinc-850/80">
            {skills.map((s, idx) => (
              <motion.div
                key={s.cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border-r border-b border-zinc-850/80 p-10 hover:bg-zinc-900/60 transition-colors group"
              >
                <h3 className="text-sm font-black text-zinc-500 group-hover:text-[var(--color-primary)] transition-colors uppercase tracking-[0.2em] mb-10 pb-4 border-b border-zinc-850/80">
                  {s.cat}
                </h3>
                <div className="flex flex-col gap-4">
                  {s.items.map(item => (
                    <span key={item} className="text-zinc-400 group-hover:text-white transition-colors text-sm font-bold tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
