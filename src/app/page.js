"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";

function WordReveal({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Register scroll trigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const words = el.querySelectorAll(".reveal-word");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
      }
    });

    tl.fromTo(
      words,
      { opacity: 0.15 },
      { opacity: 1, stagger: 0.03 }
    );
  }, [text]);

  return (
    <p ref={containerRef} className="flex flex-wrap gap-x-2 gap-y-1.5 justify-start leading-relaxed text-base md:text-xl text-custom-text font-light max-w-2xl">
      {text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block select-none">
          {word}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const aboutLineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    {
      id: "01",
      title: "Expat Care",
      desc: "A comprehensive multi-panel healthcare platform featuring an advanced appointment system and real-time chat between patients and doctors, fully managed by an admin dashboard.",
      tag: "Next.js & Node",
      year: "2026",
      img: "/assets/proj1.png",
      link: "https://expatcares.ae/"
    },
    {
      id: "02",
      title: "Healentra",
      desc: "A dedicated healthcare application featuring three distinct panels for doctors, patients, and administrators to streamline medical management and patient care.",
      tag: "Full Stack HealthTech",
      year: "2026",
      img: "/assets/proj2.png",
      link: "https://dgbeorwuitdiy.cloudfront.net/"
    },
    {
      id: "03",
      title: "Alura Therapist",
      desc: "A robust SaaS platform for mental health clinics featuring 4 distinct panels (Admin, Clinic, Therapist, Patient) with real-time video calls, live chat, and lesson assignments.",
      tag: "SaaS & WebRTC",
      year: "2026",
      img: "/assets/proj3.png",
      link: "https://alurareset.com/"
    },
    {
      id: "04",
      title: "KDC Serenity Home",
      desc: "A welcoming user-facing interface for a serenity home care platform, powered by an optimized external API to deliver fast and reliable service listings.",
      tag: "Frontend & API",
      year: "2026",
      img: "/assets/proj4.png",
      link: "https://kdcserenityhome.com/"
    },
    {
      id: "05",
      title: "Visionary AI",
      desc: "A cutting-edge AI SaaS application equipped with advanced image enhancement, seamless object removal, and high-quality generative AI tools.",
      tag: "AI SaaS & Next.js",
      year: "2025",
      img: "/assets/proj5.png",
      link: "#"
    },
    {
      id: "06",
      title: "Swift Dispatch",
      desc: "A robust logistics and job dispatch system allowing real-time driver assignment, live map tracking, and efficient Uber-like ride management.",
      tag: "WebSockets & Tracking",
      year: "2025",
      img: "/assets/proj6.png",
      link: "#"
    },
  ];

  useEffect(() => {
    // Register scroll trigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero title line-by-line reveal
    const lines = document.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 2.8,
      }
    );

    // Hero metadata and buttons staggered entrance
    gsap.fromTo(
      [".hero-badge", ".hero-desc", ".hero-ctas"],
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 3.1,
      }
    );

    // About section vertical progress line scroll-scrub
    const aboutLine = aboutLineRef.current;
    if (aboutLine) {
      gsap.fromTo(
        aboutLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-section",
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          }
        }
      );
    }

    // Sticky projects hover animation
    const projectContainers = document.querySelectorAll(".project-container");
    projectContainers.forEach((container) => {
      const img = container.querySelector(".project-img");
      if (img) {
        container.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        });
        container.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      }
    });

  }, []);

  return (
    <PageTransition className="relative min-h-screen bg-custom-bg text-custom-text font-sans selection:bg-[var(--color-primary)] selection:text-white antialiased transition-colors duration-500">

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        
        {/* Technical Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-35 dark:opacity-20 pointer-events-none z-0" />

        {/* Animated Premium Orb Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-primary)]/8 dark:bg-[var(--color-primary)]/6 filter blur-[80px] md:blur-[130px] opacity-70"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[var(--color-primary-dark)]/5 dark:bg-[var(--color-primary-dark)]/4 filter blur-[80px] md:blur-[130px] opacity-60"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="hero-badge mb-8 flex justify-center opacity-0">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-custom-border bg-custom-bg-card/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Available for new opportunities</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight text-custom-text leading-[1.05] mb-8 uppercase">
            <span className="block overflow-hidden relative py-1">
              <span className="inline-block translate-y-full opacity-0 hero-line">Designing <span className="text-[var(--color-primary)]">logic.</span></span>
            </span>
            <span className="block overflow-hidden relative py-1">
              <span className="inline-block translate-y-full opacity-0 hero-line">Building <span className="text-stroke text-stroke-hover">experiences.</span></span>
            </span>
          </h1>

          <p className="hero-desc text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed opacity-0">
            I craft highly functional, scalable web applications using the MERN stack. Simplicity on the frontend, power on the backend.
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 mt-8">
            <Magnetic range={45}>
              <Link href="/projects" className="group relative w-full sm:w-auto px-10 py-5 bg-custom-button-bg text-custom-button-text rounded-full font-black text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 flex items-center justify-center shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_10px_40px_rgba(255,85,0,0.25)] hover:-translate-y-1">
                View Projects <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Magnetic>
            
            <Magnetic range={45}>
              <a href="/Junior Developer.pdf" target="_blank" rel="noopener noreferrer" className="group relative w-full sm:w-auto px-10 py-5 bg-custom-bg-card border border-custom-border text-custom-text rounded-full font-black text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center shadow-sm hover:bg-custom-bg-alt hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="mr-2 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download CV
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Floating Rotating Text Badge */}
        <div className="absolute right-10 top-[40%] hidden xl:flex items-center justify-center opacity-80 pointer-events-none z-0">
          <svg className="w-36 h-36 animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
            <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            <text className="text-[10.5px] font-bold uppercase tracking-[0.2em] fill-custom-text">
              <textPath href="#circlePath">FULL STACK ENGINEER • SYSTEM ARCHITECTURE •</textPath>
            </text>
          </svg>
          <div className="absolute w-12 h-12 rounded-full bg-custom-bg-card flex items-center justify-center border border-custom-border">
            <ArrowUpRight className="text-[var(--color-primary)] w-5 h-5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ══════════════ HIGH CONTRAST ABOUT SECTION ══════════════ */}
      <section id="about-section" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          
          <div className="bg-custom-bg-card/75 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-custom-border shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
              
              {/* Left Side: Detail Area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
                    How I Engineer
                  </h3>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-custom-text leading-[1.1] tracking-tight mb-6 max-w-md uppercase">
                    Digital products reshaping modern solutions.
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-md font-medium">
                    From complex multi-tenant SaaS platforms to real-time WebRTC communication systems, scalable software engineering is driving a new era of efficiency and reliability.
                  </p>
                </div>

                <div className="mt-12 space-y-8">
                  <div className="flex flex-wrap gap-2.5">
                    {["Performance", "Scalability", "MERN Stack", "Next.js", "System Architecture"].map(tag => (
                      <span key={tag} className="px-4 py-2.5 bg-custom-bg-card rounded-full text-xs font-bold border border-custom-border shadow-sm text-zinc-500 dark:text-zinc-300 hover:border-[var(--color-primary)] transition-all cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center justify-center sm:justify-start gap-3 bg-custom-button-bg text-custom-button-text px-8 py-4 rounded-full text-sm font-bold shadow-md hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5 transition-all w-full sm:w-auto cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                    Explore My Process
                  </button>
                </div>
              </div>

              {/* Right Side: Bento Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Massive Bento Box */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="col-span-1 sm:col-span-2 bg-zinc-950 p-8 md:p-10 rounded-[2rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[260px] border border-zinc-900"
                >
                  
                  {/* Background decorative graphic */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none flex items-center justify-center overflow-hidden">
                    <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                      <circle cx="200" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                      <circle cx="300" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                    </svg>
                  </div>

                  <div className="relative z-10 mb-8">
                    <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight text-white leading-tight uppercase">
                      Scalable Architecture.
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
                      Merging cutting-edge frontend technologies with robust backend architecture to reduce latency and solve complex problems.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto relative z-10">
                    <Link href="/projects" className="inline-flex items-center gap-2 bg-white text-zinc-950 px-6 py-3 rounded-full text-xs font-black hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-lg">
                      View Portfolio <ArrowRight size={14} />
                    </Link>
                  </div>

                </motion.div>

                {/* Micro Bento 1: Real-time */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-custom-bg-card border border-custom-border p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group min-h-[220px] shadow-sm hover:border-[var(--color-primary)] transition-all"
                >
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-custom-bg border border-custom-border rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <h4 className="text-xl font-black text-custom-text mb-2 tracking-tight uppercase">Real-Time</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed max-w-[140px]">WebSockets & Live Map Tracking</p>
                  </div>
                </motion.div>

                {/* Micro Bento 2: Code */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-custom-bg-card border border-custom-border p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group min-h-[220px] shadow-sm hover:border-[var(--color-primary)] transition-all"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:12px_12px] opacity-35 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex flex-col gap-2.5 relative z-10 mb-6 w-full max-w-[120px]">
                    <div className="h-2 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-full group-hover:bg-[var(--color-primary)] transition-colors"></div>
                    <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors delay-75"></div>
                    <div className="h-2 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-full group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors delay-100"></div>
                    <div className="h-2 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-full group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors delay-150"></div>
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-custom-text mb-2 tracking-tight uppercase">Clean Code</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed max-w-[140px]">Modular, maintainable & documented</p>
                  </div>
                </motion.div>

              </div>
              
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ EXPERTISE SECTION ══════════════ */}
      <section className="py-24 bg-zinc-950 text-white dark:bg-zinc-950/70 dark:border-t dark:border-b dark:border-zinc-900 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-end justify-between mb-16 pt-16 border-t border-zinc-800 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">Technical Arsenal.</h2>
              <p className="text-zinc-400 max-w-xl text-sm font-medium leading-relaxed">A comprehensive suite of modern frameworks, tools, and platforms used to build scalable, high-performance applications.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Frontend */}
            <TiltCard className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/60 border border-zinc-800/80 shadow-2xl hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 right-2 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2 z-0">
                <span className="text-[120px] font-black text-zinc-800/40 leading-none tracking-tighter group-hover:text-[var(--color-primary)]/20 transition-colors duration-500">01</span>
              </div>
              <div className="relative z-10 mb-10 pr-12 md:pr-16">
                <h3 className="text-2xl font-black text-white mb-3 uppercase">Frontend</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-[260px] md:max-w-xs">Crafting immersive web applications and pixel-perfect layouts.</p>
              </div>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {[
                  { name: "HTML5", slug: "html5" },
                  { name: "CSS3", slug: "css3" },
                  { name: "Tailwind CSS", slug: "tailwindcss" },
                  { name: "Shadcn UI", slug: "shadcnui" },
                  { name: "React.js", slug: "react" },
                  { name: "React Native", slug: "react" },
                  { name: "Next.js", slug: "nextdotjs" }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/60 px-4 py-2 rounded-full text-xs font-bold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 cursor-default">
                    <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-3.5 h-3.5 object-contain" onError={(e) => e.target.style.display='none'} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Backend & Cloud */}
            <TiltCard className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/60 border border-zinc-800/80 shadow-2xl hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 right-2 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2 z-0">
                <span className="text-[120px] font-black text-zinc-800/40 leading-none tracking-tighter group-hover:text-[var(--color-primary)]/20 transition-colors duration-500">02</span>
              </div>
              <div className="relative z-10 mb-10 pr-12 md:pr-16">
                <h3 className="text-2xl font-black text-white mb-3 uppercase">Backend</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-[260px] md:max-w-xs">Developing secure APIs and deploying robust infrastructure.</p>
              </div>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {[
                  { name: "Node.js", slug: "nodedotjs" },
                  { name: "Express", slug: "express" },
                  { name: "Git", slug: "git" },
                  { name: "GitHub", slug: "github" },
                  { name: "AWS", slug: "amazonaws" },
                  { name: "Hostinger", slug: "hostinger" },
                  { name: "GoDaddy", slug: "godaddy" }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/60 px-4 py-2 rounded-full text-xs font-bold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 cursor-default">
                    <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-3.5 h-3.5 object-contain" onError={(e) => e.target.style.display='none'} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Database */}
            <TiltCard className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/60 border border-zinc-800/80 shadow-2xl hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 right-2 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2 z-0">
                <span className="text-[120px] font-black text-zinc-800/40 leading-none tracking-tighter group-hover:text-[var(--color-primary)]/20 transition-colors duration-500">03</span>
              </div>
              <div className="relative z-10 mb-10 pr-12 md:pr-16">
                <h3 className="text-2xl font-black text-white mb-3 uppercase">Database</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-[260px] md:max-w-xs">Designing optimized models and high-performance caching.</p>
              </div>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {[
                  { name: "MongoDB", slug: "mongodb" },
                  { name: "Mongoose", slug: "mongoose" },
                  { name: "Supabase", slug: "supabase" },
                  { name: "Redis", slug: "redis" }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/60 px-4 py-2 rounded-full text-xs font-bold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 cursor-default">
                    <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-3.5 h-3.5 object-contain" onError={(e) => e.target.style.display='none'} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Vibe Coding */}
            <TiltCard className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/60 border border-zinc-800/80 shadow-2xl hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 right-2 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2 z-0">
                <span className="text-[120px] font-black text-zinc-800/40 leading-none tracking-tighter group-hover:text-[var(--color-primary)]/20 transition-colors duration-500">04</span>
              </div>
              <div className="relative z-10 mb-10 pr-12 md:pr-16">
                <h3 className="text-2xl font-black text-white mb-3 uppercase">Vibe Coding</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-[260px] md:max-w-xs">Accelerating development with advanced AI agentic systems.</p>
              </div>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {[
                  { name: "Codex", slug: "openai" },
                  { name: "Claude", slug: "anthropic" },
                  { name: "Antigravity", slug: "google" }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/60 px-4 py-2 rounded-full text-xs font-bold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 cursor-default">
                    <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-3.5 h-3.5 object-contain" onError={(e) => e.target.style.display='none'} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED WORK (STICKY SCROLL) ══════════════ */}
      <section className="py-24 md:py-32 bg-transparent relative">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Selected Work</span>
              <h2 className="text-4xl md:text-5xl font-black text-custom-text tracking-tighter uppercase">Featured Projects.</h2>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-24 relative pb-24">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="project-container relative lg:sticky w-full min-h-[350px] bg-custom-bg-card rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(var(--color-primary),0.15)] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center border border-custom-border transition-all duration-500"
                style={isMobile ? {} : { 
                  top: `calc(90px + ${index * 15}px)`, 
                  zIndex: index + 10 
                }}
              >
                {/* Text Content */}
                <div className="w-full lg:w-1/2 relative z-20">
                  <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase mb-3 block">{project.id} / {project.year}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-custom-text mb-4 tracking-tight uppercase">{project.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-custom-bg text-custom-text px-4 py-2 rounded-full text-xs font-bold border border-custom-border shadow-sm">{project.tag}</span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Magnetic range={35}>
                      <Link href={`/project?id=${project.id}`} className="inline-flex items-center gap-3 bg-custom-button-bg text-custom-button-text px-6 md:px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors group shadow-md cursor-pointer">
                        View Case <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Magnetic>
                    
                    <Magnetic range={35}>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-custom-bg-card text-custom-text px-6 md:px-8 py-3.5 rounded-full font-bold text-sm hover:bg-custom-bg-alt transition-colors border border-custom-border shadow-sm cursor-pointer">
                        Live Site <ArrowUpRight size={16} />
                      </a>
                    </Magnetic>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2 h-[220px] md:h-[280px] relative rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="project-img object-cover transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════ FOOTER CTA ══════════════ */}
      <section className="py-32 md:py-48 bg-transparent text-center px-6 relative overflow-hidden border-t border-custom-border">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/3 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-custom-text mb-8 leading-[0.9] uppercase">
            HAVE A PROJECT<br/>IN MIND?
          </h2>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's build something exceptional and highly scalable together.
          </p>
          <Magnetic range={50}>
            <Link href="/contact" className="group relative inline-flex items-center gap-3 px-12 py-6 bg-custom-button-bg text-custom-button-text rounded-full font-black text-lg md:text-xl overflow-hidden transition-transform duration-300 shadow-lg hover:scale-105 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_15px_50px_rgba(255,85,0,0.25)]">
              <span className="relative z-10 flex items-center gap-3">
                Start a Conversation <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </section>

    </PageTransition>
  );
}
