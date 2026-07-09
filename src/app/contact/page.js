"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { Github, Linkedin, Twitter, Instagram, Discord } from "@/components/SocialIcons";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import gsap from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
    <PageTransition className="relative min-h-screen bg-custom-bg overflow-hidden font-sans transition-colors duration-500">

      {/* Technical Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-35 dark:opacity-20 pointer-events-none z-0" />

      {/* Page Header */}
      <div className="pt-40 pb-20 px-6 relative z-10 border-b border-custom-border">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-custom-border bg-custom-bg-card mb-6 rounded-full fade-up opacity-0">
                <span className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full animate-pulse transition-colors duration-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Contact</span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-black text-custom-text tracking-tighter leading-[0.9] uppercase">
                <span className="block overflow-hidden relative py-1 md:py-3"><span className="inline-block translate-y-full opacity-0 reveal-line">Let's Talk.</span></span>
              </h1>
            </div>
            <p className="text-zinc-500 text-base max-w-sm leading-relaxed font-semibold mb-4 fade-up opacity-0 uppercase tracking-wider">
              I'm currently open to new opportunities, freelance contracts, and system architecture consulting. Let's build something great together.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-6xl py-24 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24"
        >

          {/* LEFT: Info */}
          <div className="lg:col-span-2 space-y-16">

            {/* Direct Contact Info */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold pl-2">Direct Channels</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: "cha669156@gmail.com", href: "mailto:cha669156@gmail.com" },
                  { icon: <Phone size={20} />, label: "Phone", value: "03428573154", href: "tel:03428573154" },
                  { icon: <MapPin size={20} />, label: "Location", value: "Pakistan", href: null },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-custom-bg-card border border-custom-border shadow-sm hover:bg-custom-bg-alt/60 transition-colors duration-350"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-custom-bg border border-custom-border text-custom-text">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-custom-text text-lg font-bold hover:text-[var(--color-primary)] transition-colors duration-300">{item.value}</a>
                        : <p className="text-custom-text text-lg font-bold">{item.value}</p>
                      }
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold pl-2">Digital Presence</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Github size={18} />, name: "GitHub", href: "https://github.com/ahmadnadeem786" },
                  { icon: <Linkedin size={18} />, name: "LinkedIn", href: "https://www.linkedin.com/in/ahmadnadeem123" },
                  { icon: <Twitter size={18} />, name: "Twitter", href: "#" },
                  { icon: <Instagram size={18} />, name: "Instagram", href: "#" },
                  { icon: <Discord size={18} />, name: "Discord", href: "#" },
                ].map(s => (
                  <a key={s.name} href={s.href}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-custom-bg-card border border-custom-border hover:bg-custom-bg-alt/60 hover:-translate-y-0.5 transition-all duration-300 group shadow-sm">
                    <div className="text-zinc-500 group-hover:text-custom-text transition-colors">
                      {s.icon}
                    </div>
                    <p className="text-custom-text text-sm font-bold">{s.name}</p>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT: Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center border border-custom-border bg-custom-bg-card rounded-[2.5rem] p-16 text-center shadow-md"
              >
                <div className="w-24 h-24 rounded-full text-custom-button-text flex items-center justify-center mb-8 shadow-lg transition-colors duration-500 bg-[var(--color-primary)]">
                  <Send size={32} />
                </div>
                <h3 className="text-4xl font-black text-custom-text mb-4 tracking-tight">Message Sent!</h3>
                <p className="text-zinc-500 text-lg max-w-sm leading-relaxed">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <div className="bg-custom-bg-card border border-custom-border rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-custom-text mb-2 uppercase">Send a message</h2>
                    <p className="text-zinc-500 font-semibold text-sm">Fill out the form below and I'll get back to you shortly.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-3">
                      <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">Your Name</label>
                      <input
                        type="text" id="name" value={formData.name} onChange={handleChange}
                        placeholder="John Doe" required
                        className="w-full bg-custom-bg border border-custom-border rounded-2xl px-6 py-4 text-custom-text text-base focus:outline-none focus:border-[var(--color-primary)] focus:bg-custom-bg transition-all placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">Email Address</label>
                      <input
                        type="email" id="email" value={formData.email} onChange={handleChange}
                        placeholder="john@example.com" required
                        className="w-full bg-custom-bg border border-custom-border rounded-2xl px-6 py-4 text-custom-text text-base focus:outline-none focus:border-[var(--color-primary)] focus:bg-custom-bg transition-all placeholder:text-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <label htmlFor="subject" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">Subject</label>
                    <input
                      type="text" id="subject" value={formData.subject} onChange={handleChange}
                      placeholder="Project Consultation" required
                      className="w-full bg-custom-bg border border-custom-border rounded-2xl px-6 py-4 text-custom-text text-base focus:outline-none focus:border-[var(--color-primary)] focus:bg-custom-bg transition-all placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-3">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">Message</label>
                    <textarea
                      id="message" rows={6} value={formData.message} onChange={handleChange}
                      placeholder="Tell me about your project..." required
                      className="w-full bg-custom-bg border border-custom-border rounded-3xl px-6 py-5 text-custom-text text-base focus:outline-none focus:border-[var(--color-primary)] focus:bg-custom-bg transition-all placeholder:text-zinc-400 resize-none"
                    />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-3 py-5 rounded-full font-bold text-sm tracking-wide transition-colors duration-500 shadow-md hover:shadow-lg group mt-4 bg-custom-button-bg text-custom-button-text hover:bg-[var(--color-primary)] hover:text-white cursor-pointer">
                    Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>

        </motion.div>
      </div>
    </PageTransition>
  );
}
