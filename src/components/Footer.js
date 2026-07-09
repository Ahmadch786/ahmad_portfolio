"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white pt-32 pb-12 overflow-hidden border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-8 mb-24">
          
          {/* Left Side: Brand and Vision */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-4 mb-10 group">
                <div className="w-14 h-14 bg-white text-zinc-950 rounded-full flex items-center justify-center font-black text-xl tracking-tighter group-hover:scale-110 transition-transform shadow-md">
                  AN
                </div>
                <span className="font-black tracking-tight text-white text-4xl">Ahmad Nadeem</span>
              </Link>
              <h3 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-zinc-200 leading-[1.1] tracking-tight max-w-3xl">
                Building exceptional digital experiences, from concept to highly performant code.
              </h3>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col md:flex-row gap-16 md:gap-24 lg:justify-end">
            
            {/* Navigation */}
            <div className="flex flex-col space-y-8">
              <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-[0.2em]">Sitemap</h4>
              <ul className="space-y-6">
                {["Home", "Work", "Experience", "Contact"].map(l => (
                  <li key={l}>
                    <Link href={l === "Home" ? "/" : l === "Work" ? "/projects" : `/${l.toLowerCase()}`} className="text-xl md:text-2xl font-medium text-zinc-400 hover:text-white transition-colors inline-block hover:translate-x-2 duration-300">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Socials & Connect */}
            <div className="flex flex-col space-y-8">
              <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-[0.2em]">Connect</h4>
              <ul className="space-y-6">
                <li>
                  <a href="mailto:cha669156@gmail.com" className="text-xl md:text-2xl font-medium text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                    Email <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/ahmadnadeem123" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-medium text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                    LinkedIn <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/ahmadnadeem786" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-medium text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                    GitHub <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-zinc-800/40">
                <span className="text-lg font-medium text-zinc-500 flex items-center gap-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Based in Pakistan
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-center pointer-events-none select-none w-full mt-24 mb-16 overflow-hidden">
          <h1 className="text-[22vw] lg:text-[18vw] font-black leading-[0.75] tracking-tighter whitespace-nowrap uppercase text-white">
            AHMAD
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 border-t border-zinc-800/40">
          <p className="text-zinc-500 text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} Ahmad Nadeem. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-zinc-500 text-sm font-medium tracking-wide hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-zinc-500 text-sm font-medium tracking-wide hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
