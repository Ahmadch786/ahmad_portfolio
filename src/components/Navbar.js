"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      if (!document.getElementById("preloader-container")) {
        setIsPreloaderActive(false);
        clearInterval(interval);
      }
    }, 80);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "AI", path: "/ai" },
    { name: "Contact", path: "/contact" },
  ];

  if (isPreloaderActive) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-center pointer-events-none">
          <nav
            className={`flex items-center justify-between w-full max-w-3xl rounded-full transition-all duration-300 pointer-events-auto ${
              scrolled
                ? "bg-custom-bg-card/90 backdrop-blur-xl border border-custom-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6 py-3"
                : "bg-transparent border border-transparent px-2 py-2"
            }`}
          >
            {/* Logo */}
            <Magnetic range={40} actionArea={0.25}>
              <Link href="/" className="relative z-10 flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm tracking-tighter transition-all duration-300 shadow-sm bg-custom-button-bg text-custom-button-text group-hover:bg-[var(--color-primary)] group-hover:scale-105">
                  AN
                </div>
                <span className="font-black tracking-tight text-custom-text transition-opacity duration-300 bg-custom-bg-alt/80 px-2 py-1 rounded backdrop-blur-sm">
                  Ahmad.
                </span>
              </Link>
            </Magnetic>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center p-1 rounded-full shadow-md border bg-custom-bg-card border-custom-border backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Magnetic key={link.path} range={35} actionArea={0.3}>
                    <Link
                      href={link.path}
                      className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-colors block ${
                        isActive 
                          ? "text-custom-button-text bg-custom-button-bg shadow-sm" 
                          : "text-zinc-500 hover:text-custom-text"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </Magnetic>
                );
              })}
            </div>

            {/* Contact Arrow Button */}
            <div className="hidden md:flex items-center gap-2">
              <Magnetic range={45} actionArea={0.35}>
                <Link href="/contact" className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-md bg-custom-button-bg text-custom-button-text hover:bg-[var(--color-primary)] hover:text-white hover:scale-105">
                  <span className="sr-only">Contact</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </Magnetic>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2 relative z-10">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-custom-button-bg text-custom-button-text hover:bg-[var(--color-primary)] hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-custom-bg/98 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-5xl font-black tracking-tight transition-colors ${
                      isActive ? "text-[var(--color-primary)]" : "text-zinc-400 dark:text-zinc-500 hover:text-custom-text"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
