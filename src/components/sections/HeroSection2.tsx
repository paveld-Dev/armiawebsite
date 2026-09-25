"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { useAppReady } from "@/hooks/useAppReady";
import { SeamlessVideoLoop } from "@/components/ui/SeamlessVideoLoop";

export function HeroSection2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAppReady = useAppReady();
  const shouldReduceMotion = useReducedMotion();

  // Subtle parallax drift on cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 45, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRotateX = useSpring(rotateXVal, springConfig);
  const smoothRotateY = useSpring(rotateYVal, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = e.clientX / innerWidth - 0.5;
      const yPercent = e.clientY / innerHeight - 0.5;

      // Subtle, quiet depth drift that never competes with the butterfly's organic motion
      mouseX.set(xPercent * 50);
      mouseY.set(yPercent * 35);
      rotateYVal.set(xPercent * 6);
      rotateXVal.set(-yPercent * 5);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [mouseX, mouseY, rotateXVal, rotateYVal, shouldReduceMotion]);

  // Staggered line entrance variants
  const headlineLineVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.15 + i * 0.12,
        ease: EASE_CUSTOM,
      },
    }),
  };

  const subcopyVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.55,
        ease: EASE_CUSTOM,
      },
    },
  };

  const footerLineVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.7,
        ease: EASE_CUSTOM,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      data-theme="hero"
      className="relative z-0 w-full min-h-[100svh] overflow-hidden bg-black text-white select-none flex flex-col justify-between [perspective:1200px]"
      aria-label="Armia Systems Inc. Hero"
    >
      {/* ── Full-Bleed Background Particles Glitter Video Filling the Entire Hero Section ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-black"
      >
        <SeamlessVideoLoop
          src="/videos/0_Particles_Glitter_.mp4"
          crossFadeDuration={1.2}
          objectFit="cover"
          className="h-full w-full opacity-80"
        />
        {/* Soft vignette/dim overlay so the central butterfly and typography pop cleanly */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      {/* ── Butterfly Looping Video & Subtle Depth Parallax (Floating on top of Glitter Background) ── */}
      <motion.div
        aria-hidden
        style={{
          x: smoothX,
          y: smoothY,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden will-change-transform flex items-center justify-center"
      >
        {/* Scaled butterfly video container */}
        <div className="relative w-[85vw] max-w-[1020px] aspect-[16/9] max-h-[700px] flex items-center justify-center">
          <SeamlessVideoLoop
            src="/videos/Butterfly_e.mp4"
            crossFadeDuration={1.2}
            objectFit="contain"
            className="h-full w-full"
          />

          {/* Black block overlay to cleanly mask the AI sparkle icon on the video */}
          <div
            aria-hidden="true"
            className="absolute bottom-[9%] right-[6%] w-[7%] h-[12%] bg-black pointer-events-none z-20"
          />
        </div>
      </motion.div>

      {/* ── Subtle Soft Gradient Overlay (Protects Left Typography Readability Without Crushing Contrast) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-black/90 via-black/45 to-transparent w-full md:w-3/5"
      />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 pt-32 sm:pt-36 md:pt-40 pb-12 md:pb-16 flex-1 flex flex-col justify-between pointer-events-none">
        
        {/* Left-Aligned Headline Block (Upper-Middle Third) */}
        <div className="w-full max-w-2xl pointer-events-auto flex flex-col items-start mt-auto md:my-auto">
          {/* H1: 3-line geometric bold headline */}
          <h1 className="font-sans font-bold text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[0.98] tracking-[-0.035em] text-white text-left select-none">
            <motion.span
              custom={0}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block"
            >
              Strategic design.
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block"
            >
              Deliberate craft.
            </motion.span>
            <motion.span
              custom={2}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block"
            >
              Elevated experiences.
            </motion.span>
          </h1>

          {/* Spot 1: Under the main headline */}
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={subcopyVariants}
            className="mt-6 md:mt-7 text-sm sm:text-[15px] md:text-base text-[#999999] max-w-[480px] font-sans font-normal leading-[1.55] tracking-normal"
          >
            No clutter. No noise. Just transformation — emerging only after careful, deliberate work.
          </motion.p>

          {/* Spot 2: Mobile placement */}
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={footerLineVariants}
            className="mt-6 text-xs sm:text-sm text-neutral-400/90 leading-snug md:hidden"
          >
            When you need senior-level thinking, dependable execution, and design that truly takes flight.
          </motion.p>
        </div>

        {/* Spot 2: Bottom-Right Supporting Line (Desktop view) */}
        <div className="w-full hidden md:flex justify-end pointer-events-auto">
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={footerLineVariants}
            className="max-w-[440px] text-right font-sans text-[15px] lg:text-[16.5px] text-neutral-300/90 leading-[1.4] font-normal tracking-tight"
          >
            When you need senior-level thinking, dependable execution, and design that truly takes flight.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
