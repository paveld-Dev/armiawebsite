"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, VIEWPORT_ONCE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function EngineeringStatement() {
  const reducedMotion = useReducedMotion();

  // Motion variants for the spiral: Starts in the middle, rotates, scales down, and moves right
  const spiralVariants = {
    hidden: {
      left: "50%",
      x: "-50%",
      scale: 1.18,
      rotate: 0,
      opacity: 0.95,
    },
    visible: {
      left: "86%",
      x: "0%",
      scale: 0.62,
      rotate: 360,
      opacity: 0.9,
      transition: {
        duration: 2.8, // Decreased speed (longer duration) for a smoother, graceful motion
        ease: EASE_CUSTOM,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="relative flex flex-col justify-between h-full py-6 md:py-8 pl-[clamp(28px,3vw,56px)] pr-[clamp(32px,5vw,84px)] select-none overflow-hidden">

      {/* ── Background Spiral Ribbon Element (Starts Middle -> Rotates, Shrinks & Shifts Right) ── */}
      <motion.div
        aria-hidden="true"
        variants={reducedMotion ? undefined : spiralVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="pointer-events-none absolute top-[50%] -translate-y-1/2 z-0 w-[52vw] max-w-[600px] max-h-[600px] aspect-square"
        style={reducedMotion ? { left: "86%", x: "0%", scale: 0.65 } : undefined}
      >
        <div className="relative w-full h-full opacity-90 filter drop-shadow-[0_20px_50px_rgba(255,90,0,0.15)]">
          <Image
            src="/images/spiral-ribbon.png"
            alt=""
            fill
            sizes="(max-width: 768px) 70vw, 600px"
            className="object-contain object-center"
            priority
          />
        </div>
      </motion.div>

      {/* ── 1. Top Meta Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6, ease: EASE_CUSTOM }}
        className="relative z-10 flex items-center justify-between shrink-0 mb-6 md:mb-10"
      >
        <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#111111]">
          <span className="h-1.5 w-1.5 bg-[#FF5A00] inline-block" />
          <span>02 MISSION</span>
        </div>
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#111111]">
          ©2004–2026
        </span>
      </motion.div>

      {/* ── 2. Main Layout with Left Content and Right Meta ── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">

        {/* Left Editorial Content */}
        <div className="max-w-[760px] xl:max-w-[820px] flex flex-col justify-center space-y-6 md:space-y-8 py-2">

          {/* Main Title Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_CUSTOM }}
            className="font-sans text-[clamp(2.1rem,3.6vw,4.2rem)] font-bold tracking-[-0.035em] leading-[1.08] text-[#111111]"
          >
            22+ years engineering enterprise software.
          </motion.h2>

          {/* Subheading / Bold Promise */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_CUSTOM }}
            className="font-sans text-[clamp(1.2rem,1.75vw,1.95rem)] font-semibold tracking-[-0.025em] leading-[1.25] text-[#111111]"
          >
            We eliminate the speed vs. reliability compromise — 98% of projects delivered on time and on budget.
          </motion.p>

          {/* Body Detail Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE_CUSTOM }}
            className="font-sans text-[14px] md:text-[16px] lg:text-[17px] font-normal leading-[1.65] text-[#444444] max-w-[680px]"
          >
            From critical infrastructure to complex compliance requirements, our engineers ship production-grade systems without cutting corners — because reliability isn&apos;t a checkbox, it&apos;s the whole point.
          </motion.p>

          {/* Orange Accent Underline Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE_CUSTOM }}
            style={{ transformOrigin: "left" }}
            className="w-44 md:w-56 h-[3px] bg-[#FF5A00] mt-2"
          />
        </div>

        {/* Right Vertical Divider & Bottom-Right Tagline (as seen in image) */}
        <div className="hidden lg:flex flex-col justify-end h-full pl-12 pr-4 border-l border-black/[0.08] relative min-h-[380px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_CUSTOM }}
            className="font-mono text-[9px] xl:text-[10px] tracking-[0.2em] uppercase text-[#666666] space-y-1 mb-2 whitespace-nowrap"
          >
            <p>RELIABILITY ISN&apos;T A FEATURE.</p>
            <p>IT&apos;S OUR STANDARD.</p>
          </motion.div>
        </div>

      </div>

    </div>
  );
}