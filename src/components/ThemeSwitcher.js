"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Moon, Sun, Check, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  {
    name: "Classic Obsidian (Orange)",
    primary: "#ff5500",
    primaryDark: "#e04b00",
    previewColor: "#ff5500",
    bg: "#fafafa",
    bgAlt: "#f4f4f5",
    bgCard: "#ffffff",
    border: "rgba(255, 85, 0, 0.08)",
    accentMuted: "rgba(255, 85, 0, 0.06)",
    bgDark: "#09090b",
    bgAltDark: "#111113",
    bgCardDark: "#18181c",
    borderDark: "rgba(255, 85, 0, 0.12)",
    accentMutedDark: "rgba(255, 85, 0, 0.15)"
  },
  {
    name: "Cyberpunk Sapphire (Cyan)",
    primary: "#00b8c4",
    primaryDark: "#008a94",
    previewColor: "#00b8c4",
    bg: "#f0f7f9",
    bgAlt: "#e2edf2",
    bgCard: "#ffffff",
    border: "rgba(0, 184, 196, 0.12)",
    accentMuted: "rgba(0, 184, 196, 0.06)",
    bgDark: "#060e17",
    bgAltDark: "#0a1726",
    bgCardDark: "#0f2136",
    borderDark: "rgba(0, 184, 196, 0.15)",
    accentMutedDark: "rgba(0, 184, 196, 0.18)"
  },
  {
    name: "Royal Amethyst (Violet)",
    primary: "#a855f7",
    primaryDark: "#8b5cf6",
    previewColor: "#a855f7",
    bg: "#fbf0ff",
    bgAlt: "#f5e1ff",
    bgCard: "#ffffff",
    border: "rgba(168, 85, 247, 0.12)",
    accentMuted: "rgba(168, 85, 247, 0.06)",
    bgDark: "#0b0514",
    bgAltDark: "#130922",
    bgCardDark: "#1c0f30",
    borderDark: "rgba(168, 85, 247, 0.15)",
    accentMutedDark: "rgba(168, 85, 247, 0.18)"
  },
  {
    name: "Nordic Forest (Emerald)",
    primary: "#10b981",
    primaryDark: "#059669",
    previewColor: "#10b981",
    bg: "#f0fbf7",
    bgAlt: "#e1f7ed",
    bgCard: "#ffffff",
    border: "rgba(16, 185, 129, 0.12)",
    accentMuted: "rgba(16, 185, 129, 0.06)",
    bgDark: "#040d0a",
    bgAltDark: "#081712",
    bgCardDark: "#0f241d",
    borderDark: "rgba(16, 185, 129, 0.15)",
    accentMutedDark: "rgba(16, 185, 129, 0.18)"
  },
  {
    name: "Vampire Midnight (Rose)",
    primary: "#f43f5e",
    primaryDark: "#e11d48",
    previewColor: "#f43f5e",
    bg: "#fff0f2",
    bgAlt: "#ffe1e5",
    bgCard: "#ffffff",
    border: "rgba(244, 63, 94, 0.12)",
    accentMuted: "rgba(244, 63, 94, 0.06)",
    bgDark: "#0f0206",
    bgAltDark: "#1a040b",
    bgCardDark: "#260b13",
    borderDark: "rgba(244, 63, 94, 0.15)",
    accentMutedDark: "rgba(244, 63, 94, 0.18)"
  },
  {
    name: "Solar Gold (Amber)",
    primary: "#eab308",
    primaryDark: "#ca8a04",
    previewColor: "#eab308",
    bg: "#fffdf5",
    bgAlt: "#fcf7e1",
    bgCard: "#ffffff",
    border: "rgba(234, 179, 8, 0.12)",
    accentMuted: "rgba(234, 179, 8, 0.06)",
    bgDark: "#0d0b03",
    bgAltDark: "#171305",
    bgCardDark: "#221d0a",
    borderDark: "rgba(234, 179, 8, 0.15)",
    accentMutedDark: "rgba(234, 179, 8, 0.18)"
  },
  {
    name: "Electric Indigo (Indigo)",
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    previewColor: "#6366f1",
    bg: "#f5f6ff",
    bgAlt: "#e8ebff",
    bgCard: "#ffffff",
    border: "rgba(99, 102, 241, 0.12)",
    accentMuted: "rgba(99, 102, 241, 0.06)",
    bgDark: "#030312",
    bgAltDark: "#060621",
    bgCardDark: "#0c0c33",
    borderDark: "rgba(99, 102, 241, 0.15)",
    accentMutedDark: "rgba(99, 102, 241, 0.18)"
  },
  {
    name: "Acid Lime (Neon)",
    primary: "#84cc16",
    primaryDark: "#65a30d",
    previewColor: "#84cc16",
    bg: "#fafdf5",
    bgAlt: "#f1fbe1",
    bgCard: "#ffffff",
    border: "rgba(132, 204, 22, 0.12)",
    accentMuted: "rgba(132, 204, 22, 0.06)",
    bgDark: "#060a02",
    bgAltDark: "#0b1303",
    bgCardDark: "#142207",
    borderDark: "rgba(132, 204, 22, 0.15)",
    accentMutedDark: "rgba(132, 204, 22, 0.18)"
  }
];

const fontPairs = [
  { id: "sans", name: "Sans-Serif", desc: "Outfit / Inter" },
  { id: "serif", name: "Serif", desc: "Playfair / Lora" },
  { id: "mono", name: "Monospace", desc: "Share / Fira" },
  { id: "cursive", name: "Cursive", desc: "Caveat / Jakarta" },
  { id: "fantasy", name: "Fantasy", desc: "Syne / Space" }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: mode, setTheme: setMode, resolvedTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [bgMode, setBgMode] = useState("chroma"); // "chroma" or "minimal"
  const [activeFont, setActiveFont] = useState("sans");
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const applyTheme = useCallback((theme, currentBgMode) => {
    document.documentElement.style.setProperty("--color-primary", theme.primary);
    document.documentElement.style.setProperty("--color-primary-dark", theme.primaryDark);

    if (currentBgMode === "chroma") {
      document.documentElement.style.setProperty("--theme-bg", theme.bg);
      document.documentElement.style.setProperty("--theme-bg-alt", theme.bgAlt);
      document.documentElement.style.setProperty("--theme-bg-card", theme.bgCard);
      document.documentElement.style.setProperty("--theme-border", theme.border);
      document.documentElement.style.setProperty("--theme-accent-muted", theme.accentMuted);

      document.documentElement.style.setProperty("--theme-bg-dark", theme.bgDark);
      document.documentElement.style.setProperty("--theme-bg-alt-dark", theme.bgAltDark);
      document.documentElement.style.setProperty("--theme-bg-card-dark", theme.bgCardDark);
      document.documentElement.style.setProperty("--theme-border-dark", theme.borderDark);
      document.documentElement.style.setProperty("--theme-accent-muted-dark", theme.accentMutedDark);
    } else {
      document.documentElement.style.removeProperty("--theme-bg");
      document.documentElement.style.removeProperty("--theme-bg-alt");
      document.documentElement.style.removeProperty("--theme-bg-card");
      document.documentElement.style.removeProperty("--theme-border");
      document.documentElement.style.removeProperty("--theme-accent-muted");

      document.documentElement.style.removeProperty("--theme-bg-dark");
      document.documentElement.style.removeProperty("--theme-bg-alt-dark");
      document.documentElement.style.removeProperty("--theme-bg-card-dark");
      document.documentElement.style.removeProperty("--theme-border-dark");
      document.documentElement.style.removeProperty("--theme-accent-muted-dark");
    }
  }, []);

  const applyFontPair = useCallback((fontId) => {
    if (typeof document === "undefined") return;
    fontPairs.forEach(fp => {
      document.body.classList.remove(`font-pair-${fp.id}`);
    });
    document.body.classList.add(`font-pair-${fontId}`);
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedBgMode = localStorage.getItem("selected-bg-mode") || "chroma";
    setBgMode(savedBgMode);

    const savedFont = localStorage.getItem("selected-font-pair") || "sans";
    const validFont = fontPairs.some(fp => fp.id === savedFont) ? savedFont : "sans";
    setActiveFont(validFont);
    applyFontPair(validFont);

    const savedThemeStr = localStorage.getItem("selected-theme");
    let currentTheme = themes[0];
    if (savedThemeStr) {
      try {
        const theme = JSON.parse(savedThemeStr);
        const matched = themes.find(t => t.primary === theme.primary);
        if (matched) {
          currentTheme = matched;
        } else {
          currentTheme = theme;
        }
      } catch (e) {
        console.error("Error parsing saved theme", e);
      }
    }
    setActiveTheme(currentTheme);
    applyTheme(currentTheme, savedBgMode);

    const interval = setInterval(() => {
      if (!document.getElementById("preloader-container")) {
        setIsPreloaderActive(false);
        clearInterval(interval);
      }
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [applyTheme, applyFontPair]);

  const changeTheme = (theme) => {
    setActiveTheme(theme);
    applyTheme(theme, bgMode);
    localStorage.setItem("selected-theme", JSON.stringify(theme));
  };

  const changeBgMode = (mode) => {
    setBgMode(mode);
    applyTheme(activeTheme, mode);
    localStorage.setItem("selected-bg-mode", mode);
  };

  const changeFontPair = (fontId) => {
    setActiveFont(fontId);
    applyFontPair(fontId);
    localStorage.setItem("selected-font-pair", fontId);
  };

  const toggleDarkMode = () => {
    setMode(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleCustomThemeEvent = (e) => {
      const { type, name, mode, id } = e.detail;
      if (type === "theme") {
        const matched = themes.find(t => t.name.toLowerCase().includes(name.toLowerCase()));
        if (matched) {
          changeTheme(matched);
        }
      } else if (type === "bg") {
        if (mode === "chroma" || mode === "minimal") {
          changeBgMode(mode);
        }
      } else if (type === "font") {
        const matched = fontPairs.find(fp => fp.id.toLowerCase() === id.toLowerCase() || fp.name.toLowerCase() === id.toLowerCase());
        if (matched) {
          changeFontPair(matched.id);
        }
      }
    };

    window.addEventListener("apply-custom-theme", handleCustomThemeEvent);
    return () => {
      window.removeEventListener("apply-custom-theme", handleCustomThemeEvent);
    };
  }, [activeTheme, bgMode, activeFont, applyTheme, applyFontPair]);

  if (!mounted || isPreloaderActive) return null;

  return (
    <div ref={panelRef} className="fixed bottom-20 left-6 sm:bottom-8 sm:left-8 z-50 flex flex-col items-start gap-3 sm:gap-4">
      
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-custom-bg-card border border-custom-border p-4 rounded-[2rem] flex flex-col gap-3 shadow-xl w-[calc(100vw-48px)] sm:w-72 backdrop-blur-lg select-none mb-2 max-h-[70vh] sm:max-h-[85vh] overflow-y-auto no-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-custom-border">
              <Sparkles size={16} className="text-[var(--color-primary)]" />
              <h4 className="text-xs font-black text-custom-text uppercase tracking-widest">
                Design System
              </h4>
            </div>

            {/* Accent Color Section */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                Accent Theme
              </span>
              <div className="flex flex-wrap gap-3.5 pl-1">
                {themes.map((t) => {
                  const isActive = activeTheme.primary === t.primary;
                  return (
                    <button
                      key={t.name}
                      onClick={() => changeTheme(t)}
                      className="w-8 h-8 rounded-full hover:scale-110 transition-all border border-custom-border flex items-center justify-center shadow-sm relative cursor-pointer"
                      style={{ backgroundColor: "var(--color-bg)" }}
                      title={t.name}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center transition-transform"
                        style={{ backgroundColor: t.previewColor }}
                      >
                        {isActive && (
                          <Check size={10} className="text-white font-bold" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Style Section */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                Background Mode
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => changeBgMode("chroma")}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-2xl border transition-all cursor-pointer ${
                    bgMode === "chroma"
                      ? "border-[var(--color-primary)] bg-[var(--theme-accent-muted,rgba(255,85,0,0.06))] text-custom-text font-black"
                      : "border-custom-border bg-custom-bg text-zinc-400 hover:text-custom-text hover:bg-custom-bg-alt font-bold"
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Chroma</span>
                  <span className="text-[9px] opacity-75 font-medium mt-0.5">Soft Color</span>
                </button>
                <button
                  onClick={() => changeBgMode("minimal")}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-2xl border transition-all cursor-pointer ${
                    bgMode === "minimal"
                      ? "border-[var(--color-primary)] bg-[var(--theme-accent-muted,rgba(255,85,0,0.06))] text-custom-text font-black"
                      : "border-custom-border bg-custom-bg text-zinc-400 hover:text-custom-text hover:bg-custom-bg-alt font-bold"
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Minimal</span>
                  <span className="text-[9px] opacity-75 font-medium mt-0.5">Obsidian</span>
                </button>
              </div>
            </div>

            {/* Typography Section */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                Typography
              </span>
              <div className="grid grid-cols-2 gap-2">
                {fontPairs.map((fp) => {
                  const isActive = activeFont === fp.id;
                  return (
                    <button
                      key={fp.id}
                      onClick={() => changeFontPair(fp.id)}
                      className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? "border-[var(--color-primary)] bg-[var(--theme-accent-muted,rgba(255,85,0,0.06))] text-custom-text font-black shadow-sm"
                          : "border-custom-border bg-custom-bg text-zinc-400 hover:text-custom-text hover:bg-custom-bg-alt font-bold"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider leading-none">{fp.name}</span>
                      <span className="text-[8px] opacity-75 font-medium mt-1 leading-none">{fp.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons */}
      <div className="flex items-center gap-3">
        {/* Toggle Panel Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group ${
            isOpen
              ? "bg-[var(--color-primary)] text-white"
              : "bg-custom-button-bg text-custom-button-text"
          }`}
          title="Customize Theme"
        >
          <Palette size={20} className={`${isOpen ? "rotate-45" : ""} sm:w-[22px] sm:h-[22px] transition-transform duration-300`} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-custom-button-bg text-custom-button-text flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group"
          title="Toggle Dark Mode"
        >
          {resolvedTheme === "dark" ? (
            <Sun size={20} className="sm:w-[22px] sm:h-[22px] group-hover:scale-110 transition-transform" />
          ) : (
            <Moon size={20} className="sm:w-[22px] sm:h-[22px] group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

    </div>
  );
}
