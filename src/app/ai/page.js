"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Send, Bot, User, ArrowRight, Palette, 
  Check, RefreshCw, Cpu, Layers, Terminal, CheckCircle
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

const themesList = [
  { name: "Classic Obsidian (Orange)", primary: "#ff5500", desc: "Sleek obsidian black with vibrant safety orange accents." },
  { name: "Cyberpunk Sapphire (Cyan)", primary: "#00b8c4", desc: "Futuristic deep blue backdrop offset by high-viz cyan details." },
  { name: "Royal Amethyst (Violet)", primary: "#a855f7", desc: "Mysterious violet tint creating a deep, creative atmosphere." },
  { name: "Nordic Forest (Emerald)", primary: "#10b981", desc: "Calm dark forest background with fresh emerald highlights." },
  { name: "Vampire Midnight (Rose)", primary: "#f43f5e", desc: "Stunning high-contrast dark palette with rich rose-red details." },
  { name: "Solar Gold (Amber)", primary: "#eab308", desc: "Warm ambient glow inspired by mid-century styling." },
  { name: "Electric Indigo (Indigo)", primary: "#6366f1", desc: "Vibrant synthwave energy featuring neon indigo accents." },
  { name: "Acid Lime (Neon)", primary: "#84cc16", desc: "Maximum contrast, modern brutalism using electric neon lime." }
];

const fontPairsList = [
  { id: "sans", name: "Sans-Serif", desc: "Outfit (Display) + Inter (Body)" },
  { id: "serif", name: "Serif", desc: "Playfair Display (Display) + Lora (Body)" },
  { id: "mono", name: "Monospace", desc: "Share Tech Mono (Display) + Fira Code (Body)" },
  { id: "cursive", name: "Cursive", desc: "Caveat (Display) + Plus Jakarta (Body)" },
  { id: "fantasy", name: "Fantasy", desc: "Syne (Display) + Space Grotesk (Body)" }
];

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hello! I am Ahmad's AI Agent. Ask me to change the theme, typography, or inquire about Ahmad's development skills." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successCommand, setSuccessCommand] = useState(null);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const dispatchThemeChange = (type, value) => {
    let detail = {};
    if (type === "theme") {
      detail = { type: "theme", name: value };
    } else if (type === "bg") {
      detail = { type: "bg", mode: value };
    } else if (type === "font") {
      detail = { type: "font", id: value };
    }
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("apply-custom-theme", { detail }));
      setSuccessCommand({ type, value });
      setTimeout(() => setSuccessCommand(null), 3000);
    }
  };

  const handleSend = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : input;
    if (!text.trim() || loading) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await res.json();
      if (data.text) {
        let responseText = data.text;
        
        // Match command blocks
        const themeRegex = /\[CMD:THEME=([^\]]+)\]/i;
        const bgRegex = /\[CMD:BG=([^\]]+)\]/i;
        const fontRegex = /\[CMD:FONT=([^\]]+)\]/i;

        const themeMatch = responseText.match(themeRegex);
        const bgMatch = responseText.match(bgRegex);
        const fontMatch = responseText.match(fontRegex);

        if (themeMatch) {
          const themeName = themeMatch[1].trim();
          dispatchThemeChange("theme", themeName);
          responseText = responseText.replace(themeRegex, "");
        }
        if (bgMatch) {
          const bgMode = bgMatch[1].trim();
          dispatchThemeChange("bg", bgMode);
          responseText = responseText.replace(bgRegex, "");
        }
        if (fontMatch) {
          const fontId = fontMatch[1].trim();
          dispatchThemeChange("font", fontId);
          responseText = responseText.replace(fontRegex, "");
        }

        setMessages(prev => [...prev, { role: "model", content: responseText.trim() }]);
      } else {
        setMessages(prev => [...prev, { role: "model", content: "Error: No text response from model." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", content: "Failed to connect to the agent. Check API logs." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="relative min-h-screen bg-custom-bg text-custom-text overflow-hidden transition-colors duration-500 pb-32">
      
      {/* Technical Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      {/* Header */}
      <div className="pt-40 pb-16 px-6 relative z-10 border-b border-custom-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-custom-border bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-6 rounded-full">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">New Feature</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-custom-text tracking-tighter leading-[0.9] uppercase">
                AI Agent<br />System.
              </h1>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md leading-relaxed font-semibold mb-4 text-justify">
              An agentic AI assistant powered by Google Generative AI (Gemini) capable of parsing natural language prompts and generating real-time styling mutations directly on the DOM.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Explainer and Interactive Triggers */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Architecture Card */}
          <div className="bg-custom-bg-card border border-custom-border p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Cpu size={20} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Agent Infrastructure</h2>
            </div>
            <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
              This system intercepts user requests via an API route, feeds them to the LLM with structured guidelines, parses custom action tags, and communicates style instructions back to the client using a real-time browser event bus.
            </p>

            {/* Step-by-Step Flow */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-custom-border flex items-center justify-center font-bold text-xs bg-custom-bg text-[var(--color-primary)] shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">Natural Prompt</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Visitor types: "Make the site look minimalist and change the accent to Solar Gold."</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-custom-border flex items-center justify-center font-bold text-xs bg-custom-bg text-[var(--color-primary)] shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">Intent Classification & Instruction Injection</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Gemini detects target entities and appends structure tags: <code>[CMD:THEME=Solar Gold] [CMD:BG=minimal]</code></p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-custom-border flex items-center justify-center font-bold text-xs bg-custom-bg text-[var(--color-primary)] shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">DOM Execution</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Client parsing extracts commands and updates CSS Variables and classes instantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Styling Playground */}
          <div className="bg-custom-bg-card border border-custom-border p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-custom-border">
              <div className="flex items-center gap-3">
                <Palette size={20} className="text-[var(--color-primary)]" />
                <h3 className="text-xl font-black uppercase tracking-tight">Direct Control playground</h3>
              </div>
              <AnimatePresence>
                {successCommand && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-widest"
                  >
                    <CheckCircle size={12} /> Applied {successCommand.type}!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accent Theme Grid */}
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Click to dispatch Accent theme</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {themesList.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => dispatchThemeChange("theme", theme.name)}
                      className="group border border-custom-border hover:border-[var(--color-primary)] bg-custom-bg p-3 rounded-2xl flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300"
                    >
                      <span className="w-6 h-6 rounded-full border border-custom-border mb-3 block" style={{ backgroundColor: theme.primary }} />
                      <span className="text-[10px] font-black uppercase tracking-wide leading-none">{theme.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Background Settings</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => dispatchThemeChange("bg", "chroma")}
                      className="flex-1 py-3 border border-custom-border hover:border-[var(--color-primary)] bg-custom-bg rounded-2xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all"
                    >
                      Chroma Mode
                    </button>
                    <button
                      onClick={() => dispatchThemeChange("bg", "minimal")}
                      className="flex-1 py-3 border border-custom-border hover:border-[var(--color-primary)] bg-custom-bg rounded-2xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all"
                    >
                      Minimal Mode
                    </button>
                  </div>
                </div>

                {/* Typography Options */}
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Typography System</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {fontPairsList.slice(0, 3).map((fp) => (
                      <button
                        key={fp.id}
                        onClick={() => dispatchThemeChange("font", fp.id)}
                        className="py-3 border border-custom-border hover:border-[var(--color-primary)] bg-custom-bg rounded-2xl text-[9px] font-black uppercase tracking-wider text-center cursor-pointer transition-all"
                      >
                        {fp.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Embedded Agent Chat Console */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] shadow-2xl flex flex-col h-[580px] overflow-hidden sticky top-32">
            
            {/* Console Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Terminal size={16} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-black uppercase tracking-widest leading-none mb-1">Agent Console</h3>
                  <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> Online
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Console Output */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar bg-black/40">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${
                    msg.role === "user" ? "bg-[var(--color-primary)] text-white" : "bg-zinc-800 text-zinc-300"
                  }`}>
                    {msg.role === "user" ? "US" : "AI"}
                  </div>
                  <div className={`text-xs leading-relaxed max-w-[80%] p-3.5 rounded-2xl font-medium ${
                    msg.role === "user" ? "bg-zinc-900 text-white rounded-tr-none" : "bg-zinc-900/50 text-zinc-400 border border-zinc-900 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 text-[10px] font-black animate-pulse">AI</div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Suggested Commands Quick-list */}
            <div className="px-5 py-3 border-t border-zinc-900 bg-zinc-900/20 flex flex-col gap-2">
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Try typing these commands:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Change to Cyberpunk Sapphire",
                  "Make the font Monospace",
                  "Switch back to minimal mode"
                ].map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(cmd)}
                    className="text-[9px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Console Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
              className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send prompt or style instruction..."
                className="flex-1 bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-medium transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-200 text-black flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-30 disabled:hover:bg-white"
              >
                <Send size={14} />
              </button>
            </form>

          </div>
        </div>

      </div>

    </PageTransition>
  );
}
