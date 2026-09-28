"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { useAppReady } from "@/hooks/useAppReady";
import { SeamlessVideoLoop } from "@/components/ui/SeamlessVideoLoop";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MechanicalSlide {
  id: string;
  tag: string;
  videoSrc: string;
  headline: [string, string, string];
  subcopy: string;
  caption: string;
}

const MECHANICAL_SLIDES: MechanicalSlide[] = [
  {
    id: "mechanical-1",
    tag: "01 // SYSTEM ARCHITECTURE",
    videoSrc: "/videos/Mechanical1.mp4",
    headline: [
      "Strategic engineering.",
      "Proven since 2003.",
      "Trusted by enterprise teams.",
    ],
    subcopy:
      "End-to-end software, AI and cloud engineering, built with precision and delivered with care.",
    caption:
      "When you need senior-level engineers, dependable execution, and software that holds up in production.",
  },
  {
    id: "mechanical-2",
    tag: "02 // KINETIC PRECISION",
    videoSrc: "/videos/Mechanical2.mp4",
    headline: [
      "Autonomous systems.",
      "Engineered to scale.",
      "Built for zero downtime.",
    ],
    subcopy:
      "Resilient cloud architecture and mission-critical engineering designed to handle enterprise workloads seamlessly.",
    caption:
      "Architected with rigorous testing, distributed reliability, and sub-millisecond precision.",
  },
  {
    id: "mechanical-3",
    tag: "03 // INTELLIGENCE & CLOUD",
    videoSrc: "/videos/Mechanical3.mp4",
    headline: [
      "Intelligent workflows.",
      "Modern cloud platforms.",
      "Transformative results.",
    ],
    subcopy:
      "Accelerating product roadmaps with modern LLM orchestration, agentic AI, and scalable cloud solutions.",
    caption:
      "Empowering global industry leaders with transformative engineering that turns bold visions into reality.",
  },
];

export function HeroSection2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAppReady = useAppReady();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = MECHANICAL_SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % MECHANICAL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + MECHANICAL_SLIDES.length) % MECHANICAL_SLIDES.length
    );
  }, []);

  // Auto-advance carousel every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Entrance variants for text transition
  const textContainerVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_CUSTOM,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: 0.35,
        ease: EASE_CUSTOM,
      },
    },
  };

  const lineItemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASE_CUSTOM },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.25, ease: EASE_CUSTOM },
    },
  };

  return (
    <section
      ref={containerRef}
      data-theme="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-0 w-full min-h-[100svh] overflow-hidden bg-[#0A0A0A] text-white select-none flex flex-col justify-between [perspective:1200px]"
      aria-label="Armia Systems Inc. Hero"
    >
      {/* ── Mechanical Looping Video Carousel Background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-[1] w-full md:w-[60vw] lg:w-[58vw] xl:w-[55vw] pointer-events-none select-none overflow-hidden flex items-center justify-end"
      >
        {/* Right-aligned container with full vertical fill and horizontal left-edge fade */}
        <div
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%)",
          }}
          className="relative h-full w-full flex items-center justify-end"
        >
          {MECHANICAL_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <SeamlessVideoLoop
                  src={slide.videoSrc}
                  crossFadeDuration={1.2}
                  objectFit="cover"
                  objectPosition="right"
                  className="h-full w-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Subtle Soft Gradient Overlay (Protects Left Typography Readability) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent w-full md:w-3/5"
      />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8 flex-1 flex flex-col justify-between pointer-events-none">
        
        {/* Left-Aligned Headline Block & Carousel Text */}
        <div className="w-full max-w-3xl pointer-events-auto flex flex-col items-start my-auto min-h-[380px] sm:min-h-[420px] justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              variants={textContainerVariants}
              initial="initial"
              animate={isAppReady ? "animate" : "initial"}
              exit="exit"
              className="flex flex-col items-start w-full"
            >
              {/* H1: 3-line geometric bold headline */}
              <h1 className="font-sans font-bold text-[clamp(2.1rem,4.9vw,4.8rem)] leading-[1.02] tracking-[-0.035em] text-white text-left select-none">
                <motion.span variants={lineItemVariants} className="block">
                  {currentSlide.headline[0]}
                </motion.span>
                <motion.span variants={lineItemVariants} className="block">
                  {currentSlide.headline[1]}
                </motion.span>
                <motion.span
                  variants={lineItemVariants}
                  className="block whitespace-nowrap"
                >
                  {currentSlide.headline[2]}
                </motion.span>
              </h1>

              {/* Subcopy */}
              <motion.p
                variants={lineItemVariants}
                className="mt-6 md:mt-7 text-sm sm:text-[15px] md:text-base text-[#999999] max-w-[500px] font-sans font-normal leading-[1.55] tracking-normal"
              >
                {currentSlide.subcopy}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Action Row: CTA Button with Animated Tech Lines on Hover */}
          <div className="mt-7 md:mt-8">
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

                {/* 1b. Slowly Drifting Architectural Tech Blocks (revealed on hover) */}
                <span aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {/* Floating Block 1 */}
                  <span className="absolute top-[20%] left-[-15%] w-3.5 h-2.5 rounded-[1px] bg-white/10 border border-white/20 group-hover:translate-x-[260px] transition-transform duration-[6000ms] ease-linear" />
                  {/* Floating Block 2 (Orange Accent) */}
                  <span className="absolute top-[55%] left-[-20%] w-5 h-2 rounded-[1px] bg-[#FF5A00]/20 border border-[#FF5A00]/40 group-hover:translate-x-[280px] transition-transform duration-[4800ms] ease-linear delay-150" />
                  {/* Floating Block 3 */}
                  <span className="absolute top-[35%] left-[-10%] w-2.5 h-2.5 rounded-[1px] bg-white/15 border border-white/25 group-hover:translate-x-[270px] transition-transform duration-[7000ms] ease-linear delay-300" />
                  {/* Floating Block 4 (Micro Data Packet) */}
                  <span className="absolute top-[70%] left-[-5%] w-2 h-1.5 rounded-[1px] bg-[#FF5A00]/30 border border-[#FF5A00]/50 group-hover:translate-x-[260px] transition-transform duration-[4200ms] ease-linear delay-500" />
                </span>

                {/* 2. Cyber Horizontal Scanning Ray Beam (moving left to right) */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 -left-[100%] w-[80%] bg-gradient-to-r from-transparent via-[#FF5A00]/25 to-transparent pointer-events-none -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[280%] transition-all duration-1000 ease-out"
                />

                {/* 3. Horizontal Micro Circuit Trace Line on Top Edge */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />

                {/* 4. Horizontal Micro Circuit Trace Line on Bottom Edge */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
                />

                {/* 5. Glowing Corner Circuit Nodes */}
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
          </div>

          {/* Mobile caption placement */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.id + "-mobile"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 text-xs sm:text-sm text-neutral-400/90 leading-snug md:hidden"
            >
              {currentSlide.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Bottom Bar Row: 01 02 03 on Bottom-Left & Caption on Bottom-Right ── */}
        <div className="relative w-full flex items-end justify-between pointer-events-auto pt-4">
          
          {/* Bottom-Left Numbered Carousel Buttons: 01 02 03 */}
          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-[13px] tracking-[0.18em]">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-1 -ml-1 text-neutral-500 hover:text-white transition-colors focus:outline-none focus-visible:text-[#FF5A00]"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            <div className="flex items-center gap-3 sm:gap-4">
              {MECHANICAL_SLIDES.map((slide, idx) => {
                const isCurrent = idx === currentSlideIndex;
                const numStr = `0${idx + 1}`;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Go to slide ${numStr}`}
                    className={`relative py-1 transition-all duration-300 flex flex-col items-center focus:outline-none group ${
                      isCurrent
                        ? "text-[#FF5A00] font-semibold"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <span>{numStr}</span>
                    <span
                      className={`h-[2px] transition-all duration-300 rounded-full mt-1 ${
                        isCurrent
                          ? "w-full bg-[#FF5A00]"
                          : "w-0 bg-transparent group-hover:w-2 group-hover:bg-white/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-1 text-neutral-500 hover:text-white transition-colors focus:outline-none focus-visible:text-[#FF5A00]"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>

          {/* Bottom-Right Supporting Line (Desktop view) with radial gradient scrim */}
          <div className="relative hidden md:flex justify-end">
            {/* Soft radial scrim that extends beyond the bottom and right edges */}
            <div
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 95% 85% at 90% 85%, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 45%, rgba(10,10,10,0) 100%)",
              }}
              className="absolute -right-28 -bottom-16 w-[620px] h-[220px] pointer-events-none -z-10 blur-md"
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide.id + "-caption"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE_CUSTOM }}
                className="relative z-10 max-w-[440px] text-right font-sans text-[15px] lg:text-[16.5px] text-neutral-200 leading-[1.4] font-normal tracking-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]"
              >
                {currentSlide.caption}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Pinned Bottom Partner Ticker Bar (Seamless transition into the white Engineering section) */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}
