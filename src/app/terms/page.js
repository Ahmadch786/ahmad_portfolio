"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <PageTransition className="relative min-h-screen bg-custom-bg-alt text-zinc-600 dark:text-zinc-400 font-sans selection:bg-[var(--color-primary)] selection:text-white antialiased pb-32">
      <div className="pt-40 px-6 max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-custom-text transition-colors mb-12 font-medium text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-7xl font-black text-custom-text tracking-tighter mb-6">
          Terms of Service.
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-16">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-12 text-base md:text-lg leading-relaxed font-medium">
          
          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using this portfolio website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">2. Intellectual Property</h2>
            <p>
              The content, design, code, and graphics on this website are owned by Ahmad Nadeem unless otherwise stated. Projects displayed in the portfolio may contain proprietary code belonging to their respective owners or clients, and are showcased here strictly for demonstration purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">3. Use License</h2>
            <p>
              Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only. You may not:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>attempt to decompile or reverse engineer any software contained on the website;</li>
              <li>remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">4. Disclaimer</h2>
            <p>
              The materials on this website are provided on an 'as is' basis. Ahmad Nadeem makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">5. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact me through the <Link href="/contact" className="text-custom-text underline hover:text-[var(--color-primary)] transition-colors">Contact page</Link>.
            </p>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
