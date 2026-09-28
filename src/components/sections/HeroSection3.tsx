"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { useAppReady } from "@/hooks/useAppReady";
import { SeamlessVideoLoop } from "@/components/ui/SeamlessVideoLoop";
import { PartnerTicker } from "@/components/sections/PartnerTicker";

export function HeroSection3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAppReady = useAppReady();

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

  const ctaVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.65,
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
        delay: 0.75,
        ease: EASE_CUSTOM,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      data-theme="hero"
      className="relative z-0 w-full min-h-[100svh] overflow-hidden bg-[#0A0A0A] text-white select-none flex flex-col justify-between [perspective:1200px]"
      aria-label="Armia Systems Inc. Hero"
    >
      {/* ── Butterfly Looping Video (Right-Aligned) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-[1] w-full md:w-[60vw] lg:w-[58vw] xl:w-[55vw] pointer-events-none select-none overflow-hidden flex items-center justify-end"
      >
        {/* Right-aligned container with vertical fill and horizontal left-edge fade */}
        <div
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%)",
          }}
          className="relative h-full w-full flex items-center justify-end"
        >
          <SeamlessVideoLoop
            src="/videos/Butterfly.mp4"
            crossFadeDuration={1.2}
            objectFit="contain"
            objectPosition="right"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* ── Subtle Soft Gradient Overlay (Protects Left Typography Readability) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent w-full md:w-3/5"
      />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8 flex-1 flex flex-col justify-between pointer-events-none">
        
        {/* Left-Aligned Headline Block */}
        <div className="w-full max-w-3xl pointer-events-auto flex flex-col items-start my-auto">
          {/* H1: 3-line geometric bold headline */}
          <h1 className="font-sans font-bold text-[clamp(2.1rem,4.9vw,4.8rem)] leading-[1.02] tracking-[-0.035em] text-white text-left select-none">
            <motion.span
              custom={0}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block"
            >
              Strategic engineering.
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block"
            >
              Proven since 2003.
            </motion.span>
            <motion.span
              custom={2}
              initial="hidden"
              animate={isAppReady ? "visible" : "hidden"}
              variants={headlineLineVariants}
              className="block whitespace-nowrap"
            >
              Trusted by enterprise teams.
            </motion.span>
          </h1>

          {/* Subcopy */}
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={subcopyVariants}
            className="mt-6 md:mt-7 text-sm sm:text-[15px] md:text-base text-[#999999] max-w-[480px] font-sans font-normal leading-[1.55] tracking-normal"
          >
            End-to-end software, AI and cloud engineering, built with precision and delivered with care.
          </motion.p>

          {/* Primary CTA (Start a Project) with Tech Hover Animation */}
          <motion.div
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={ctaVariants}
            className="mt-7 md:mt-8"
          >
            <a
              href="#contact"
              aria-label="Start a project with Armia Systems"
              className="group relative inline-flex items-center h-[42px] md:h-[46px] font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black border border-white/20 hover:border-brand-accent shadow-[0_0_20px_rgba(255,90,0,0)] hover:shadow-[0_0_25px_rgba(255,90,0,0.18)]"
            >
              {/* Dark Button Body with Animated Tech Lines */}
              <span className="relative overflow-hidden px-5 md:px-7 font-medium bg-[#111111] text-white h-full flex items-center select-none transition-colors duration-300 group-hover:text-white">
                {/* 1. Subtle Circuit/Grid Background Lines */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10px_10px]"
                />

                {/* 1b. Slowly Drifting Architectural Tech Blocks */}
                <span aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="absolute top-[20%] left-[-15%] w-3.5 h-2.5 rounded-[1px] bg-white/10 border border-white/20 group-hover:translate-x-[260px] transition-transform duration-[6000ms] ease-linear" />
                  <span className="absolute top-[55%] left-[-20%] w-5 h-2 rounded-[1px] bg-[#FF5A00]/20 border border-[#FF5A00]/40 group-hover:translate-x-[280px] transition-transform duration-[4800ms] ease-linear delay-150" />
                  <span className="absolute top-[35%] left-[-10%] w-2.5 h-2.5 rounded-[1px] bg-white/15 border border-white/25 group-hover:translate-x-[270px] transition-transform duration-[7000ms] ease-linear delay-300" />
                  <span className="absolute top-[70%] left-[-5%] w-2 h-1.5 rounded-[1px] bg-[#FF5A00]/30 border border-[#FF5A00]/50 group-hover:translate-x-[260px] transition-transform duration-[4200ms] ease-linear delay-500" />
                </span>

                {/* 2. Cyber Horizontal Scanning Ray Beam */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 -left-[100%] w-[80%] bg-gradient-to-r from-transparent via-[#FF5A00]/25 to-transparent pointer-events-none -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[280%] transition-all duration-1000 ease-out"
                />

                {/* 3. Horizontal Micro Circuit Trace Lines */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
                />

                {/* 4. Glowing Corner Circuit Nodes */}
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-[#FF5A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_#FF5A00]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-[#FF5A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_#FF5A00]"
                />

                {/* Text Content */}
                <span className="relative z-10 transition-transform duration-300 group-hover:tracking-[0.18em]">
                  START A PROJECT
                </span>
              </span>

              {/* Orange Arrow Block */}
              <div className="relative overflow-hidden flex items-center justify-center h-full w-[42px] md:w-[46px] bg-brand-accent transition-all duration-300 group-hover:bg-[#ff4500]">
                <span
                  className="text-white text-sm md:text-base font-semibold transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </a>
          </motion.div>

          {/* Mobile placement */}
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={footerLineVariants}
            className="mt-8 text-xs sm:text-sm text-neutral-400/90 leading-snug md:hidden"
          >
            When you need senior-level engineers, dependable execution, and software that holds up in production.
          </motion.p>
        </div>

        {/* Spot 2: Bottom-Right Supporting Line (Desktop view) with radial gradient scrim */}
        <div className="relative w-full hidden md:flex justify-end pointer-events-auto">
          {/* Soft radial scrim that extends beyond the bottom and right edges */}
          <div
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 95% 85% at 90% 85%, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 45%, rgba(10,10,10,0) 100%)",
            }}
            className="absolute -right-28 -bottom-16 w-[620px] h-[220px] pointer-events-none -z-10 blur-md"
          />
          <motion.p
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={footerLineVariants}
            className="relative z-10 max-w-[440px] text-right font-sans text-[15px] lg:text-[16.5px] text-neutral-200 leading-[1.4] font-normal tracking-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]"
          >
            When you need senior-level engineers, dependable execution, and software that holds up in production.
          </motion.p>
        </div>

      </div>

      {/* Pinned Bottom Partner Ticker Bar (Seamless transition into the white Engineering section) */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}
