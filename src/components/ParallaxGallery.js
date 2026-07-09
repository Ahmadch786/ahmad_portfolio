"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxGallery() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[150vh] bg-white py-32 overflow-hidden flex items-center justify-center border-b border-zinc-100"
    >
      {/* Background huge text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <h2 className="text-[25vw] font-black text-black whitespace-nowrap tracking-tighter">
          VISIONARY
        </h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Giant Text overlaying images */}
        <div className="relative w-full flex justify-center items-center h-screen max-h-[800px]">
          
          <h2 className="absolute z-50 text-[16vw] font-black text-white mix-blend-difference tracking-tighter uppercase pointer-events-none">
            INNO<span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>VATE</span>
          </h2>

          {/* Floating Image 1 (Moves up fast) */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute left-[5%] top-[15%] w-[25vw] max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-200 z-10"
          >
            <Image 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop" 
              alt="Design 1" 
              fill 
              className="object-cover"
            />
          </motion.div>

          {/* Floating Image 2 (Moves down) */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute right-[5%] top-[25%] w-[22vw] max-w-[280px] aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200 z-10"
          >
            <Image 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop" 
              alt="Design 2" 
              fill 
              className="object-cover"
            />
          </motion.div>

          {/* Floating Image 3 (Moves up slow) */}
          <motion.div 
            style={{ y: y3 }}
            className="absolute left-[35%] bottom-[5%] w-[35vw] max-w-[450px] aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200 z-10"
          >
            <Image 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&auto=format&fit=crop" 
              alt="Design 3" 
              fill 
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
