"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <PageTransition className="relative min-h-screen bg-custom-bg-alt text-zinc-600 dark:text-zinc-400 font-sans selection:bg-[var(--color-primary)] selection:text-white antialiased pb-32">
      <div className="pt-40 px-6 max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-custom-text transition-colors mb-12 font-medium text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-7xl font-black text-custom-text tracking-tighter mb-6">
          Privacy Policy.
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-16">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-12 text-base md:text-lg leading-relaxed font-medium">
          
          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">1. Information Collection</h2>
            <p>
              When you use the contact form on this website, you may be asked to provide certain personally identifiable information, such as your name and email address. This information is strictly used for communication purposes regarding your inquiry or project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">2. AI Assistant Usage</h2>
            <p>
              This website utilizes an AI Assistant powered by Google Generative AI (Gemini). Any queries you submit through the chat interface are processed by the AI model to provide you with relevant answers about my portfolio, experience, and skills. Do not share sensitive personal data through the chatbot.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">3. Log Data and Analytics</h2>
            <p>
              Like many site operators, this website may collect information that your browser sends whenever you visit the site. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of the site that you visit, the time and date of your visit, and other statistics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">4. Data Security</h2>
            <p>
              The security of your Personal Information is important, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While I strive to use commercially acceptable means to protect your Personal Information, I cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-custom-text mb-4">5. Contact Me</h2>
            <p>
              If you have any questions about this Privacy Policy, please feel free to reach out via the <Link href="/contact" className="text-custom-text underline hover:text-[var(--color-primary)] transition-colors">Contact page</Link>.
            </p>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
