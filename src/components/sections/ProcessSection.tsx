"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

// ─────────────────────────────────────────────────────────────────────────────
// Phases Data
// ─────────────────────────────────────────────────────────────────────────────

interface PhaseItem {
  id: string;
  num: string;
  category: string;
  titleLines: string[];
  description: string;
  deliverables: string[];
  duration: string;
}

const phases: PhaseItem[] = [
  {
    id: "01",
    num: "/01",
    category: "PHASE 01 // STRATEGY",
    titleLines: ["STAKEHOLDER AUDIT", "& REQUIREMENTS"],
    description:
      "We align key stakeholders, audit existing systems, and establish technical architecture so delivery is risk-aware before coding starts.",
    deliverables: [
      "Technical architecture audit & scoping",
      "Security, SLA & compliance matrix",
      "Sprint roadmap & milestone plan",
    ],
    duration: "WEEKS 01 - 02",
  },
  {
    id: "02",
    num: "/02",
    category: "PHASE 02 // ARCHITECTURE",
    titleLines: ["RESEARCH-DRIVEN", "DESIGN SYSTEMS"],
    description:
      "We define user journeys and high-fidelity prototypes, validating UX clarity and creating atomic design systems for seamless engineering handoff.",
    deliverables: [
      "Interactive Figma tokens & prototypes",
      "Usability testing & feedback synthesis",
      "Developer handoff documentation",
    ],
    duration: "WEEKS 03 - 04",
  },
  {
    id: "03",
    num: "/03",
    category: "PHASE 03 // ASSURANCE",
    titleLines: ["SECURITY AUDITS", "& PERFORMANCE"],
    description:
      "Automated regression test suites, penetration testing, and load stress audits guarantee 99.99% resilience before going live.",
    deliverables: [
      "Automated regression test suites",
      "SOC2 / HIPAA compliance audits",
      "Sub-100ms load & stress profiling",
    ],
    duration: "WEEKS 05 - 06",
  },
  {
    id: "04",
    num: "/04",
    category: "PHASE 04 // EXECUTION",
    titleLines: ["AGILE SPRINTS", "& CI/CD BUILDS"],
    description:
      "Two-week agile sprints with continuous integration, automated code review gates, and zero-downtime database deployment pipelines.",
    deliverables: [
      "Microservices & cloud backend APIs",
      "Automated CI/CD build pipelines",
      "Transparent Jira sprint telemetry",
    ],
    duration: "WEEKS 07 - 10",
  },
  {
    id: "05",
    num: "/05",
    category: "PHASE 05 // SCALE",
    titleLines: ["ZERO-DOWNTIME", "24/7 MONITORING"],
    description:
      "Canary rollout with full telemetry dashboards, automated disaster recovery runbooks, and 24/7 SLA engineering support.",
    deliverables: [
      "Canary & blue-green deployments",
      "Real-time telemetry & latency alerts",
      "24/7 SLA enterprise support",
    ],
    duration: "CONTINUOUS",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_CUSTOM },
  },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ProcessSection Component
// ─────────────────────────────────────────────────────────────────────────────

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance through the 5 phases every 4 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIdx((prev: number) => (prev + 1) % phases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const phase = phases[activeIdx];

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] h-[100svh] min-h-[100svh] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section border-t border-white/[0.08] select-none"
    >
      {/* Background GridLines & Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        
        {/* ── Upper Section Header Row (10.8% / 30.3% / 69.3% Grid) ── */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-4 md:mb-0">
            <SectionEyebrow number="04" label="PROCESS" dark className="!mb-0" />
          </div>

          {/* Heading Block */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.1rem,3.0vw,3.8rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#6b6b6b]">A PROVEN</span>
              <span className="block text-white font-medium">DELIVERY FRAMEWORK.</span>
            </h2>
          </div>

          {/* Right Supporting Copy */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <p className="font-mono text-[12px] md:text-[14px] leading-[1.45] text-[#9a9a96] uppercase tracking-wider max-w-[280px]">
              EVERY ENGAGEMENT FOLLOWS THE SAME RIGOROUS FIVE-PHASE PROCESS - REFINED OVER 20+ YEARS.
            </p>
          </div>
        </div>

        {/* ── Main Structured Showcase Panel (10.8% to 88.8% -> width: 78.0%) ── */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full md:w-[78.0%] md:ml-[10.8%] px-6 md:px-0"
        >
          {/* Outer Bordered Framework Card */}
          <div className="border border-white/[0.1] bg-[#0c0c0c] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            
            {/* ── Left Column: Active Phase Deep Dive (7 cols) ── */}
            <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[380px] md:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Category & Timeline Badge */}
                    <motion.div variants={fadeVariants} className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#FF5A00] inline-block" />
                        <span className="font-mono text-[12px] md:text-[13.5px] tracking-widest uppercase text-[#FF5A00] font-semibold">
                          {phase.category}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] md:text-[13px] tracking-wider text-white/60 bg-white/[0.05] px-2.5 py-0.5 border border-white/[0.08]">
                        {phase.duration}
                      </span>
                    </motion.div>

                    {/* Title with Mask Reveal */}
                    <div className="overflow-hidden pb-1 mb-3">
                      <motion.h3
                        variants={maskVariants}
                        className="font-sans text-[clamp(1.6rem,2.4vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.05] text-white uppercase"
                      >
                        {phase.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </motion.h3>
                    </div>

                    {/* Description */}
                    <motion.p
                      variants={fadeVariants}
                      className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#a4a4a0] max-w-lg mb-6"
                    >
                      {phase.description}
                    </motion.p>

                    {/* Deliverables Checklist */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="font-mono text-[10px] md:text-[11.5px] tracking-widest text-[#777777] uppercase mb-2.5">
                        PHASE DELIVERABLES
                      </div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((del, i) => (
                          <motion.li
                            key={i}
                            variants={fadeVariants}
                            className="font-mono text-[13px] md:text-[14px] uppercase tracking-wider text-[#d0d0cc] flex items-center gap-2.5"
                          >
                            <span className="text-[#FF5A00] font-bold text-sm">✓</span>
                            <span>{del}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Numbered Controls Strip at bottom of phase */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <RotatorTabStrip
                      items={phases.map((p) => ({ id: p.id, label: p.id }))}
                      activeIndex={activeIdx}
                      onSelect={(idx) => {
                        setActiveIdx(idx);
                      }}
                      dark
                      autoAdvance={!isHovered}
                      intervalMs={4000}
                      isPaused={isHovered}
                      layoutIdPrefix="process-steps-tab"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right Column: Engagement Action & Overview Box (5 cols) ── */}
            <div className="md:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-[#101010] relative overflow-hidden">
              {/* Subtle Ribbon Backdrop Graphic */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -right-8 w-[200px] aspect-square opacity-15 filter contrast-125 select-none"
              >
                <Image
                  src="/images/spiral-ribbon.png"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                <div className="font-mono text-[10px] md:text-[11.5px] tracking-widest text-[#FF5A00] uppercase mb-2">
                  // ENGAGEMENT MODEL
                </div>

                <h4 className="font-sans font-bold text-[clamp(1.3rem,1.8vw,1.9rem)] leading-[1.1] tracking-tight uppercase text-white mb-3">
                  HOW WE WORK
                  <br />
                  WITH YOUR TEAM.
                </h4>

                <p className="font-sans text-[15px] md:text-[16px] text-[#8e8e88] leading-[1.6] mb-5">
                  Direct Slack access to technical leads, weekly demo releases, and zero contract lock-in.
                </p>

                {/* Structured Highlights */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">01</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Dedicated Pod</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">Dedicated engineers &amp; sprint leads</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">02</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Sprint Cadence</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">2-week sprints with transparent Jira boards</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">03</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Production Guarantee</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">Automated testing &amp; 99.99% SLA uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08]">
                <a
                  href="#contact"
                  className="group bg-[#FF5A00] hover:bg-[#ff4500] text-white font-mono text-[11px] md:text-[13px] tracking-widest uppercase px-5 py-3.5 flex items-center justify-between transition-colors w-full"
                >
                  <span className="font-semibold">SCHEDULE A TECHNICAL AUDIT</span>
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
