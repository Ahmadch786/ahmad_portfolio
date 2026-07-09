"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hello! I'm Ahmad's AI Assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const scrollRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.getElementById("preloader-container")) {
        setIsPreloaderActive(false);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const suggestions = [
    "What is your tech stack?",
    "Tell me about your projects.",
    "How can I contact Ahmad?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

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
        let text = data.text;
        
        // Define regex for custom AI-agent theme actions
        const themeRegex = /\[CMD:THEME=([^\]]+)\]/i;
        const bgRegex = /\[CMD:BG=([^\]]+)\]/i;
        const fontRegex = /\[CMD:FONT=([^\]]+)\]/i;

        const themeMatch = text.match(themeRegex);
        const bgMatch = text.match(bgRegex);
        const fontMatch = text.match(fontRegex);

        if (themeMatch) {
          const themeName = themeMatch[1].trim();
          window.dispatchEvent(new CustomEvent("apply-custom-theme", { detail: { type: "theme", name: themeName } }));
          text = text.replace(themeRegex, "");
        }
        if (bgMatch) {
          const bgMode = bgMatch[1].trim();
          window.dispatchEvent(new CustomEvent("apply-custom-theme", { detail: { type: "bg", mode: bgMode } }));
          text = text.replace(bgRegex, "");
        }
        if (fontMatch) {
          const fontId = fontMatch[1].trim();
          window.dispatchEvent(new CustomEvent("apply-custom-theme", { detail: { type: "font", id: fontId } }));
          text = text.replace(fontRegex, "");
        }

        setMessages(prev => [...prev, { role: "model", content: text.trim() }]);
      } else {
        setMessages(prev => [...prev, { role: "model", content: "Sorry, I encountered an issue parsing the response." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", content: "Error connecting to the AI helper. Please check your API configuration." }]);
    } finally {
      setLoading(false);
    }
  };

  if (isPreloaderActive) return null;

  return (
    <div ref={chatRef}>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-custom-button-bg text-custom-button-text flex items-center justify-center shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-all cursor-pointer group"
      >
        <Sparkles size={20} className="text-custom-button-text sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-4 sm:bottom-[110px] sm:right-8 z-[60] w-[calc(100vw-32px)] sm:w-[420px] h-[450px] sm:h-[520px] max-h-[75vh] bg-custom-bg-card border border-custom-border shadow-[0_30px_80px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden rounded-3xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-custom-border bg-custom-bg flex items-center justify-between text-custom-text">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-custom-button-bg text-custom-button-text flex items-center justify-center font-black text-sm shadow-sm relative">
                  AI
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-custom-border rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-custom-text text-base font-bold leading-none mb-1">Ahmad's Assistant</h4>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={10} className="text-[var(--color-primary)] transition-colors duration-500" /> Advanced AI
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-custom-bg-alt border border-custom-border flex items-center justify-center text-zinc-400 hover:text-custom-text hover:bg-custom-bg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-custom-bg-alt/30">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-auto shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-custom-button-bg text-custom-button-text rounded-2xl rounded-br-sm font-medium"
                        : "bg-custom-bg text-custom-text rounded-2xl rounded-bl-sm border border-custom-border"
                    }`}
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-zinc-650 dark:text-zinc-300" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-extrabold text-custom-text" {...props} />,
                          a: ({node, ...props}) => <a className="text-[var(--color-primary)] underline underline-offset-2 hover:text-custom-button-bg transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center flex-shrink-0 mt-auto shadow-sm">
                      <User size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-auto shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="bg-custom-bg text-custom-text rounded-2xl rounded-bl-sm px-5 py-4 border border-custom-border flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !loading && (
              <div className="px-5 pb-3 bg-custom-bg-alt/30 flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="text-xs bg-custom-bg border border-custom-border text-zinc-500 hover:text-custom-text hover:bg-custom-bg-alt px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-4 border-t border-custom-border bg-custom-bg-card flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-custom-bg border border-custom-border rounded-full px-5 py-3 text-sm text-custom-text placeholder:text-zinc-400 focus:outline-none focus:border-[var(--color-primary)] focus:bg-custom-bg-card font-medium transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full bg-custom-button-bg text-custom-button-text hover:bg-custom-text hover:scale-105 shadow-md transition-all flex items-center justify-center flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send size={18} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
