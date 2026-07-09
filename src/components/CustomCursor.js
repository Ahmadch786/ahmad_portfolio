"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState("");
  const [cursorColor, setCursorColor] = useState("#ff5500");
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 1. Sharp tracking springs for the core dot
  const dotSpringConfig = { damping: 20, stiffness: 450, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // 2. Middle-lag springs for the interactive HUD ring
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], .clickable");
      const projectCard = target.closest(".project-container");
      const textElement = target.closest("p, h1, h2, h3, h4, h5, h6, li, span");

      let type = "";
      if (projectCard) {
        type = "view";
      } else if (clickable) {
        type = "link";
      } else if (textElement) {
        type = "text";
      }

      setHoverType((prev) => {
        if (prev !== type) {
          setIsHovering(type !== "");
          return type;
        }
        return prev;
      });
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Read initial theme color
    const getThemeColor = () => {
      if (typeof window === "undefined") return "#ff5500";
      const colorVal = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();
      return colorVal || "#ff5500";
    };

    setCursorColor(getThemeColor());

    // Observe changes to the style attribute of HTML element (theme changes)
    const observer = new MutationObserver(() => {
      setCursorColor(getThemeColor());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"]
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Ambient Spotlight Halo (Removed to prevent gradient effect on solid background) */}

      {/* 2. Interactive Outer HUD Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: hoverType === "view" ? -40 : hoverType === "link" ? -28 : -16,
          translateY: hoverType === "view" ? -40 : hoverType === "link" ? -28 : -16,
          width: hoverType === "view" ? 80 : hoverType === "link" ? 56 : 32,
          height: hoverType === "view" ? 80 : hoverType === "link" ? 56 : 32,
          border: `1px ${hoverType === "link" ? "dashed" : "solid"} ${cursorColor}`,
          backgroundColor: "transparent",
          opacity: hoverType === "text" ? 0 : (hoverType !== "" ? 1 : 0.5),
        }}
        animate={{
          rotate: hoverType === "link" ? 360 : 0,
          scale: hoverType === "" ? 0.7 : 1,
        }}
        transition={{
          rotate: hoverType === "link" ? { repeat: Infinity, duration: 8, ease: "linear" } : { duration: 0.3 },
          scale: { type: "spring", damping: 20, stiffness: 250 }
        }}
      />

      {/* 3. Glowing Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: -3,
          translateY: -3,
          width: 6,
          height: 6,
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: hoverType === "view" ? 0 : hoverType === "link" ? 1.5 : 1,
          opacity: hoverType === "text" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 350 }}
      />
    </>
  );
}
