"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useRotator } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

const phases = [
  {
    id: "01",
    dots: "▪▪▪▪",
    category: "DISCOVERY & STRATEGY",
    title: "Stakeholder interviews, technical audit, requirements analysis",
    description:
      "We align stakeholders, audit the technical landscape, and define requirements so the delivery path is clear before build begins.",
  },
  {
    id: "02",
    dots: "▪▪▪▪",
    category: "UX & INTERFACE DESIGN",
    title: "Research-driven design with iterative prototyping",
    description:
      "We define the experience through research, wireframes, and iterative prototyping - ensuring the UI is clear, consistent, and aligned to goals.",
  },
  {
    id: "03",
    dots: "▪▪▪▪",
    category: "QUALITY ASSURANCE",
    title: "Security audits, performance testing, compliance",
    description:
      "We validate security, performance, and compliance before launch, so the delivery is reliable and risk-aware.",
  },
  {
    id: "04",
    dots: "▪▪▪▪▪",
    category: "ENGINEERING & DEVELOPMENT",
    title: "Agile sprints with CI/CD and code reviews",
    description:
      "We build in agile sprints with CI/CD, code reviews, and a focus on maintainable, production-ready systems.",
  },
  {
    id: "05",
    dots: "▪▪▪▪▪",
    category: "LAUNCH & SUPPORT",
    title: "Zero-downtime deployment with 24/7 monitoring",
    description:
      "We deploy with zero downtime and hand off with monitoring, runbooks, and support so the system stays stable in production.",
  },
];

export function ProcessSection() {
  const {
    activeIndex,
    setActiveIndex,
    activeItem: phase,
    setIsPaused,
    autoAdvance,
    intervalMs,
    timerKey,
    isPaused,
  } = useRotator(phases, { autoAdvance: true, intervalMs: 4500 });

  return (
    <section className="relative w-full bg-[#101010] text-[#f3f3f0] h-[1080px] min-h-[1080px] py-10 md:py-14 flex flex-col justify-center overflow-hidden select-none snap-section border-t border-white/[0.08]">
      {/* Architectural Vertical Grid Lines */}
      <GridLines animate={true} animationMode="center" />

      {/* Main Section Content Container */}
      <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-0">
        {/* Upper Header Row matching Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="04" label="PROCESS" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#6b6b6b]">A PROVEN</span>
              <span className="block text-white">DELIVERY</span>
              <span className="block text-white">FRAMEWORK.</span>
            </h2>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <p className="font-mono text-[10px] md:text-[11px] leading-[1.35] text-[#9a9a96] uppercase tracking-wider max-w-[240px]">
              EVERY ENGAGEMENT FOLLOWS THE SAME RIGOROUS FIVE-PHASE PROCESS -
              REFINED OVER 25+ YEARS AND 185+ SUCCESSFUL DELIVERIES.
            </p>
          </div>
        </div>

        {/* 2-Column Main Content: Rotator Spotlight on Left, Persistent CTA on Right */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          {/* Left Column: Tab Strip + Phase Spotlight (30.3% to 69.3% -> width: 39.0%) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="w-full md:w-[39.0%] md:ml-[30.3%] flex flex-col justify-between pr-0 md:pr-8"
          >
            {/* Tab Strip with active tab progress fill */}
            <div className="mb-4">
              <RotatorTabStrip
                items={phases.map((p) => ({ id: p.id, label: p.id }))}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                dark
                autoAdvance={autoAdvance}
                intervalMs={intervalMs}
                timerKey={timerKey}
                isPaused={isPaused}
              />
            </div>

            {/* Rotator Card with AnimatePresence */}
            <div className="relative flex-1 min-h-[260px] md:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: EASE_CUSTOM }}
                  className="relative bg-[#121212] p-6 md:p-8 flex flex-col justify-between h-full border-t border-b border-white/[0.06]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent z-10" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-[36px] md:text-[44px] font-normal text-white tracking-tight leading-none">
                      {phase.id}
                    </span>
                    <span className="font-mono text-[11px] text-brand-accent tracking-tighter">
                      {phase.dots}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-brand-accent flex items-center gap-1.5 mb-2">
                      <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                      <span>{phase.category}</span>
                    </div>
                    <h3 className="font-sans text-[20px] md:text-[24px] font-medium text-white tracking-tight leading-[1.2] mb-3">
                      {phase.title}
                    </h3>
                    <p className="font-sans text-[13px] md:text-[14px] text-[#a4a4a0] leading-[1.5] font-normal max-w-lg">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Persistent Orange CTA Card (69.3% to 88.8% -> width: 19.5%) */}
          <div className="w-full md:w-[19.5%] flex flex-col mt-6 md:mt-0">
            <div className="relative bg-brand-accent p-6 md:p-7 flex flex-col justify-between h-full text-white overflow-hidden">
              {/* Subtle decorative spiral ribbon accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 w-[180px] md:w-[220px] aspect-square opacity-20 filter contrast-125"
              >
                <Image
                  src="/images/spiral-ribbon.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                <h3 className="font-sans font-bold text-[22px] md:text-[26px] leading-[1.05] tracking-tight uppercase mb-3">
                  READY
                  <br />
                  TO START?
                </h3>

                <p className="font-sans text-[11px] md:text-[12px] text-white/90 leading-[1.35] mb-4">
                  Tell me about your project, your goals, and where you want the
                  website to go.
                </p>

                {/* Subdued Checklist */}
                <div className="space-y-1.5 mb-4 pt-2.5 border-t border-white/20">
                  <div className="font-mono text-[8px] md:text-[9px] tracking-widest text-white/70 uppercase mb-1.5">
                    WHAT YOU GET
                  </div>
                  <div className="font-sans text-[11px] md:text-[12px] text-white flex items-center gap-1.5">
                    <span className="text-white/80">✓</span>
                    <span>Free intro call</span>
                  </div>
                  <div className="font-sans text-[11px] md:text-[12px] text-white flex items-center gap-1.5">
                    <span className="text-white/80">✓</span>
                    <span>Project fit check</span>
                  </div>
                  <div className="font-sans text-[11px] md:text-[12px] text-white flex items-center gap-1.5">
                    <span className="text-white/80">✓</span>
                    <span>Clear next steps</span>
                  </div>
                </div>
              </div>

              {/* Compact CTA Button */}
              <a
                href="#contact"
                className="relative z-10 group bg-[#111111] text-white font-mono text-[9px] md:text-[10px] tracking-widest uppercase px-4 py-3 flex items-center justify-between hover:bg-black transition-colors w-full mt-2"
              >
                <span>BOOK A CALL</span>
                <div className="w-5 h-5 bg-white text-black flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
