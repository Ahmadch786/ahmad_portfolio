"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Save window dimensions
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    // Percentage counter logic
    const duration = 1600;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      const easeProgress = progress === 100 ? 100 : 100 * (-Math.pow(2, -10 * progress / 100) + 1);
      
      setCounter(Math.floor(easeProgress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Path equations for SVG liquid curtain morphing
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height} Z`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height} Z`;

  const curveVariants = {
    initial: {
      d: initialPath
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const translateVariants = {
    initial: {
      y: 0
    },
    exit: {
      y: -dimension.height - 300,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const textFadeVariants = {
    initial: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -80,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          id="preloader-container"
          key="preloader"
          variants={translateVariants}
          initial="initial"
          exit="exit"
          className="fixed top-0 left-0 w-screen h-[calc(100vh+300px)] flex flex-col justify-between text-white overflow-hidden pointer-events-none"
          style={{ zIndex: 99999 }}
        >
          <motion.div 
            variants={textFadeVariants} 
            exit="exit"
            className="flex flex-col justify-between h-[100vh] w-full relative z-20 pointer-events-auto p-8 md:p-12 pb-12 md:pb-16"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start w-full overflow-hidden">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                System Initialization
              </span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                © {new Date().getFullYear()}
              </span>
            </div>
            
            {/* Center Name */}
            <div className="flex flex-col justify-center flex-grow overflow-hidden my-10">
              <h1 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-white">
                AHMAD NADEEM
              </h1>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between w-full">
              <div className="overflow-hidden hidden md:block mb-4">
                <p className="text-zinc-400 font-medium max-w-xs text-sm leading-relaxed uppercase tracking-widest">
                  Loading digital<br />experiences
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-[20vw] md:text-[14vw] font-black leading-[0.75] tracking-tighter text-white">{counter}</span>
                <span className="text-2xl md:text-4xl font-bold text-zinc-600 ml-2">%</span>
              </div>
            </div>
          </motion.div>

          {/* Morphing SVG Background (Solid Black) */}
          {dimension.width > 0 && (
            <svg className="absolute top-0 left-0 w-full h-full fill-zinc-950 z-10 pointer-events-none">
              <motion.path
                variants={curveVariants}
                initial="initial"
                exit="exit"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
