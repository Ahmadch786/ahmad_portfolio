"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -10; // tilt range -10 to 10
    const rotateY = ((x - width / 2) / (width / 2)) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power3.out"
    });

    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        left: x - 150, // centers the 300px glow circle
        top: y - 150,
        duration: 0.1
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.5
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-shadow duration-500 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic Spotlight Glow */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full opacity-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 75%)",
          willChange: "left, top, opacity",
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </div>
  );
}
