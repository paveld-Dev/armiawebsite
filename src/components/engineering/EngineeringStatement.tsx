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
    <div className="relative flex flex-col justify-between h-full py-8 md:py-12 select-none overflow-hidden">

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

      {/* ── Upper Header / Eyebrow Row matching ServicesSection Grid Columns ── */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="02" label="MISSION" className="!mb-0" />
          </div>

          {/* Right Supporting Year: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] md:ml-[39.0%] px-6 md:px-0 pt-1 flex justify-start">
            <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#111111]">
              ©2004–2026
            </span>
          </div>
        </div>

        {/* ── Main Content Block (30.3% to 88.8% width: 58.5%) matching ServicesSection ── */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="max-w-[760px] xl:max-w-[820px] flex flex-col justify-center space-y-4 md:space-y-5">
            {/* Main Title Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_CUSTOM }}
              className="font-sans text-[clamp(2.3rem,3.4vw,4.1rem)] font-bold tracking-[-0.04em] leading-[1.04] text-[#111111]"
            >
              Trusted technology partner since 2004.
            </motion.h2>

            {/* Subheading / Bold Promise */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE_CUSTOM }}
              className="font-sans text-[clamp(1.05rem,1.35vw,1.45rem)] font-semibold tracking-[-0.02em] leading-[1.3] text-[#111111]"
            >
              For more than two decades, we’ve helped startups, growing businesses, enterprises and technology partners turn complex ideas into dependable digital products.
            </motion.p>

            {/* Body Detail Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_CUSTOM }}
              className="space-y-3 font-sans text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.6] text-[#444444] max-w-[680px]"
            >
              <p>
                Our strength lies in combining deep engineering expertise, continuous innovation and practical business understanding to deliver software that is built for real-world scale.
              </p>
              <p>
                From product strategy and custom software development to enterprise platforms, AI-enabled solutions and cloud infrastructure, we provide end-to-end engineering support across the full technology lifecycle.
              </p>
            </motion.div>

            {/* Orange Accent Underline Bar & Footer Note */}
            <div className="pt-2">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE_CUSTOM }}
                style={{ transformOrigin: "left" }}
                className="w-44 md:w-56 h-[3px] bg-[#FF5A00] mb-3"
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, delay: 0.85, ease: EASE_CUSTOM }}
                className="font-sans text-[12px] md:text-[13px] font-medium text-[#222222]"
              >
                20+ years of engineering experience. Built around skill, innovation and long-term partnerships.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}