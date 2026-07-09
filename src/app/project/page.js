"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Github } from "@/components/SocialIcons";
import PageTransition from "@/components/PageTransition";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const projectData = {
  "01": {
    title: "Expat Care",
    tag: "Next.js & Node",
    year: "2026",
    desc: "A comprehensive multi-panel healthcare platform featuring an advanced appointment system and real-time chat between patients and doctors, fully managed by an admin dashboard.",
    img: "/assets/proj1.png",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    challenge: "Developing a seamless communication channel and scheduling system that instantly syncs between the patient, doctor, and admin panels without data conflicts.",
    solution: "Implemented real-time WebSockets for instant patient-doctor messaging and a robust appointment engine with state synchronization across all three dashboards.",
    link: "https://expatcares.ae/"
  },
  "02": {
    title: "Healentra",
    tag: "Full Stack HealthTech",
    year: "2026",
    desc: "A dedicated healthcare application featuring three distinct panels for doctors, patients, and administrators to streamline medical management and patient care.",
    img: "/assets/proj2.png",
    tech: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    challenge: "Creating a secure and role-based architecture that handles sensitive patient records while giving administrators full oversight of the platform.",
    solution: "Developed a secure RESTful API with strict role-based access controls (RBAC) ensuring that patients, doctors, and admins each have dedicated, protected workspaces.",
    link: "https://dgbeorwuitdiy.cloudfront.net/"
  },
  "03": {
    title: "Alura Therapist",
    tag: "SaaS & WebRTC",
    year: "2026",
    desc: "A robust SaaS platform for mental health clinics featuring 4 distinct panels (Admin, Clinic, Therapist, Patient) with real-time video calls, live chat, and lesson assignments.",
    img: "/assets/proj3.png",
    tech: ["React.js", "Node.js", "MongoDB", "WebRTC", "Socket.io", "Express"],
    challenge: "Building a complex multi-tenant SaaS architecture where clinics manage their own therapists, combined with high-quality real-time video consultations and task tracking.",
    solution: "Engineered a scalable SaaS infrastructure with integrated WebRTC for seamless video sessions, WebSocket-based real-time chat, and a modular lesson assignment system.",
    link: "https://alurareset.com/"
  },
  "04": {
    title: "KDC Serenity Home",
    tag: "Frontend & API",
    year: "2026",
    desc: "A welcoming user-facing interface for a serenity home care platform, powered by an optimized external API to deliver fast and reliable service listings.",
    img: "/assets/proj4.png",
    tech: ["React.js", "API Integration", "Tailwind CSS", "Framer Motion"],
    challenge: "Crafting a fast, highly accessible frontend that efficiently consumes complex API data to present home care services elegantly.",
    solution: "Utilized modern React patterns and data fetching strategies to create a fluid, responsive user experience that interacts flawlessly with the backend API.",
    link: "https://kdcserenityhome.com/"
  },
  "05": {
    title: "Visionary AI",
    tag: "AI SaaS & Next.js",
    year: "2025",
    desc: "A cutting-edge AI SaaS application equipped with advanced image enhancement, seamless object removal, and high-quality generative AI tools.",
    img: "/assets/proj5.png",
    tech: ["Next.js", "Generative AI", "Tailwind CSS", "Node.js"],
    challenge: "Integrating complex AI image processing algorithms while maintaining a blazing-fast user interface.",
    solution: "Built a robust Next.js frontend with optimized edge functions and deferred background processing for smooth generation.",
    link: "#"
  },
  "06": {
    title: "Swift Dispatch",
    tag: "WebSockets & Tracking",
    year: "2025",
    desc: "A robust logistics and job dispatch system allowing real-time driver assignment, live map tracking, and efficient Uber-like ride management.",
    img: "/assets/proj6.png",
    tech: ["React.js", "Node.js", "Socket.io", "Mapbox", "Express"],
    challenge: "Handling high-frequency real-time driver location updates without overwhelming the client or server.",
    solution: "Implemented efficient WebSocket broadcast channels with geospatial indexing for seamless real-time map updates.",
    link: "#"
  }
};

function ProjectContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || "01";
  
  const project = projectData[id] ?? {
    title: `Project ${id}`,
    tag: "MERN Stack", year: "2026",
    desc: "A full-stack web application built with the MERN stack.",
    img: "/assets/proj1.png",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    challenge: "Building a scalable architecture.",
    solution: "Applying modern backend patterns with optimized database queries.",
    link: "#"
  };

  return (
    <PageTransition className="relative min-h-screen bg-custom-bg overflow-hidden transition-colors duration-500">

      {/* Technical Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-35 dark:opacity-20 pointer-events-none z-0" />

      {/* Back nav */}
      <div className="pt-36 pb-0 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <Link href="/projects"
            className="inline-flex items-center gap-2 bg-custom-bg-card border border-custom-border px-6 py-3 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-custom-text font-bold text-sm shadow-sm transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="pt-12 pb-0 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-custom-bg-card border border-custom-border text-zinc-700 dark:text-zinc-300 text-[10px] font-bold px-5 py-2.5 rounded-full uppercase tracking-widest">{project.tag}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold border border-custom-border px-5 py-2.5 rounded-full">{project.year}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-custom-text tracking-tighter leading-none mb-6 uppercase">
                  {project.title}
                </h1>
              </div>
              <div className="text-[120px] md:text-[180px] font-black text-zinc-200 dark:text-zinc-800/40 leading-none select-none tracking-tighter -mb-10 md:-mb-14">
                {id}
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-10 font-semibold">{project.desc}</p>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pb-12">
              {project.link && project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-custom-button-bg text-custom-button-text px-10 py-5 rounded-full font-black text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-md cursor-pointer">
                  <ExternalLink size={18} /> Live Preview
                </a>
              )}
              <a href="#" className="flex items-center gap-2 bg-transparent text-custom-text border border-custom-border px-10 py-5 rounded-full font-bold text-sm hover:bg-custom-bg-alt transition-all shadow-sm">
                <Github size={18} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="px-6 py-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }}
            className="relative w-full h-[400px] md:h-[650px] rounded-[3.5rem] overflow-hidden bg-custom-bg-card shadow-md border border-custom-border"
          >
            <div className="relative w-full h-full">
              <Image src={project.img} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-all duration-700 hover:scale-105" priority />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-6 pt-16 pb-32 relative z-10">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Article Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-12"
          >
            <div className="bg-custom-bg-card border border-custom-border p-10 md:p-12 rounded-[2.5rem] shadow-sm">
              <h2 className="text-2xl font-black text-custom-text mb-6 flex items-center gap-4 uppercase">
                <div className="w-12 h-12 rounded-full bg-custom-button-bg text-custom-button-text flex items-center justify-center text-sm font-black shadow-md">01</div>
                The Challenge
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-semibold">{project.challenge}</p>
            </div>
            
            <div className="bg-custom-bg-card border border-custom-border p-10 md:p-12 rounded-[2.5rem] shadow-sm">
              <h2 className="text-2xl font-black text-custom-text mb-6 flex items-center gap-4 uppercase">
                <div className="w-12 h-12 rounded-full bg-custom-button-bg text-custom-button-text flex items-center justify-center text-sm font-black shadow-md">02</div>
                The Solution
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-semibold">{project.solution}</p>
            </div>
          </motion.div>
 
          {/* Right: Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="p-8 rounded-[2rem] bg-custom-bg-card border border-custom-border shadow-sm">
              <h3 className="text-[11px] font-bold text-zinc-400 mb-6 uppercase tracking-widest">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="bg-custom-bg border border-custom-border text-zinc-700 dark:text-zinc-300 text-xs font-bold px-5 py-2.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-[2rem] bg-custom-button-bg text-center shadow-xl border border-zinc-900">
              <h3 className="text-2xl font-black text-custom-button-text mb-4 uppercase">Build something similar?</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium">Let's coordinate on structural designs, custom API schemas, and interactive UX features.</p>
              <Link href="/contact"
                className="inline-block w-full bg-custom-bg text-custom-text py-5 rounded-full font-black text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-md hover:shadow-xl cursor-pointer">
                Start a Project
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </PageTransition>
  );
}

export default function ProjectDetail() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-custom-bg flex items-center justify-center text-custom-text">Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
}
