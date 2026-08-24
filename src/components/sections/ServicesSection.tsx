"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

// ─────────────────────────────────────────────────────────────────────────────
// Services Data
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  num: string;
  category: string;
  titleLines: string[];
  description: string;
  capabilities: string[];
  image: string;
  video: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    num: "/01",
    category: "ENGINEERING // ARCHITECTURE",
    titleLines: ["CUSTOM SOFTWARE", "DEVELOPMENT"],
    description:
      "Full-cycle custom web and enterprise application engineering built for reliability, scalability and complex business requirements.",
    capabilities: [
      "Full-stack web & mobile development",
      "Microservices & API architecture",
      "Legacy system modernization",
      "Cloud-native application design",
    ],
    image: "/images/Service1.png",
    video: "/images/service1.mp4",
  },
  {
    id: "02",
    num: "/02",
    category: "AI & ML LABS",
    titleLines: ["AI & MACHINE", "LEARNING"],
    description:
      "Enterprise AI integration, custom LLM solutions, predictive systems and intelligent automation designed for secure production environments.",
    capabilities: [
      "AI product development",
      "LLM & RAG applications",
      "Intelligent automation",
      "Predictive analytics",
    ],
    image: "/images/service_ai_intelligence.png",
    video: "/images/service2.mp4",
  },
  {
    id: "03",
    num: "/03",
    category: "CLOUD // DEVOPS",
    titleLines: ["CLOUD & DEVOPS", "INFRASTRUCTURE"],
    description:
      "Cloud infrastructure and DevOps systems engineered for performance, resilience, deployment speed and operational visibility.",
    capabilities: [
      "AWS & cloud architecture",
      "CI/CD pipelines",
      "Infrastructure automation",
      "Monitoring & optimization",
    ],
    image: "/images/service_cloud_devops.png",
    video: "/images/service3.mp4",
  },
  {
    id: "04",
    num: "/04",
    category: "UI // UX DESIGN",
    titleLines: ["PRODUCT & UX", "DESIGN SYSTEMS"],
    description:
      "Research-led digital product design focused on usability, clarity, business goals and scalable design systems.",
    capabilities: [
      "Product strategy",
      "UX research",
      "Interface design",
      "Design systems",
    ],
    image: "/images/service_brand_identity.png",
    video: "/images/service4.mp4",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_CUSTOM },
  },
};

const numberVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_CUSTOM },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_CUSTOM, delay: 0.05 },
  },
};

const capabilityItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ServicesSection Component
// ─────────────────────────────────────────────────────────────────────────────

export function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Automatically cycle through services every 4 seconds when user is not hovering
  React.useEffect(() => {
    if (hoveredIdx !== null) return; // Pause auto-rotation when user is interacting/hovering

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % servicesData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hoveredIdx]);

  const currentService = hoveredIdx !== null ? servicesData[hoveredIdx] : servicesData[activeIdx];

  return (
    <section
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] h-[100svh] min-h-[100svh] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section border-t border-white/[0.08] select-none"
    >
      {/* Background Architectural GridLines & Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* ── Upper Section Header Row (Matching 10.8% / 30.3% / 69.3% Grid) ── */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-12 md:mb-16">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-4 md:mb-0">
            <SectionEyebrow number="03" label="SERVICES" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.1rem,3.0vw,3.8rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#6b6b6b]">ENGINEERING</span>
              <span className="block text-white font-medium">WHAT MATTERS.</span>
            </h2>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <p className="font-mono text-[12px] md:text-[14px] leading-[1.45] text-[#9a9a96] uppercase tracking-wider max-w-[280px]">
              END-TO-END DIGITAL ENGINEERING — FROM PRODUCT STRATEGY TO PRODUCTION.
            </p>
          </div>
        </div>

        {/* ── Main Showcase Row (10.8% to 88.8% -> width: 78.0%) ── */}
        <div className="w-full md:w-[78.0%] md:ml-[10.8%] px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Interactive Service Detail & Capabilities (~40% -> 5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Service Number & Category */}
                    <motion.div variants={numberVariants} className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm md:text-base font-semibold text-[#FF5A00] tracking-widest">
                        {currentService.num}
                      </span>
                      <span className="font-mono text-[11px] md:text-[13px] tracking-widest uppercase text-[#888888]">
                        {currentService.category}
                      </span>
                    </motion.div>

                    {/* Large Typography Heading with Mask Reveal */}
                    <div className="overflow-hidden pb-1 mb-3">
                      <motion.h3
                        variants={maskVariants}
                        className="font-sans text-[clamp(1.8rem,2.8vw,3.6rem)] font-bold tracking-[-0.04em] leading-[0.96] text-white uppercase"
                      >
                        {currentService.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </motion.h3>
                    </div>

                    {/* Description Paragraph */}
                    <motion.p
                      variants={descVariants}
                      className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#b0b0a8] max-w-[460px] mb-4 md:mb-5"
                    >
                      {currentService.description}
                    </motion.p>

                    {/* Editorial Capabilities Checklist */}
                    <ul className="space-y-2 mb-6">
                      {currentService.capabilities.map((cap, i) => (
                        <motion.li
                          key={i}
                          variants={capabilityItemVariants}
                          className="font-mono text-[13px] md:text-[14px] uppercase tracking-wider text-[#d0d0cc] flex items-center"
                        >
                          <span className="text-[#FF5A00] font-mono mr-3 text-sm font-bold select-none">
                            +
                          </span>
                          <span>{cap}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="font-mono text-[11px] md:text-[13px] text-[#FF5A00] hover:text-white tracking-widest uppercase transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>TALK TO A SOLUTIONS ARCHITECT</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: 4-Tile Video Mosaic (~60% -> 7 cols) */}
            <div className="md:col-span-7 grid grid-cols-12 gap-3 md:gap-3.5 h-full min-h-[340px] md:min-h-[400px]">
              {servicesData.map((item, idx) => {
                const isCurrent = (hoveredIdx !== null ? hoveredIdx : activeIdx) === idx;

                // Asymmetric editorial sizing matching reference:
                // Tile 01: 7 cols (~58%), Tile 02: 5 cols (~42%)
                // Tile 03: 5 cols (~42%), Tile 04: 7 cols (~58%)
                const colSpanClass =
                  idx === 0
                    ? "col-span-12 md:col-span-7 h-[170px] md:h-[195px]"
                    : idx === 1
                    ? "col-span-12 md:col-span-5 h-[170px] md:h-[195px]"
                    : idx === 2
                    ? "col-span-12 md:col-span-5 h-[170px] md:h-[195px]"
                    : "col-span-12 md:col-span-7 h-[170px] md:h-[195px]";

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`${colSpanClass} relative overflow-hidden cursor-pointer bg-black border transition-all duration-300 ${
                      isCurrent
                        ? "border-[#FF5A00] shadow-[0_0_20px_rgba(255,90,0,0.18)]"
                        : "border-white/[0.08] hover:border-white/30"
                    }`}
                  >
                    {/* Ambient Looping Video - No zoom on hover */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={item.image}
                      className="w-full h-full object-cover object-center pointer-events-none"
                    >
                      <source src={item.video} type="video/mp4" />
                      <Image
                        src={item.image}
                        alt={item.titleLines.join(" ")}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                    </video>

                    {/* Subtle Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        isCurrent
                          ? "bg-black/10"
                          : "bg-black/35 hover:bg-black/15"
                      }`}
                    />

                    {/* Corner Tag */}
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className={`font-mono text-[10px] md:text-[11px] px-1.5 py-0.5 font-bold transition-colors ${
                        isCurrent ? "bg-[#FF5A00] text-white" : "bg-black/75 text-white/75"
                      }`}>
                        {item.num}
                      </span>
                    </div>

                    {/* Title on Hover / Active */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                      <span className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-white/90 truncate drop-shadow-md">
                        {item.titleLines.join(" ")}
                      </span>
                      <span className={`text-[11px] transition-all duration-300 ${
                        isCurrent ? "text-[#FF5A00] font-bold" : "text-white/40 group-hover:text-white"
                      }`}>
                        ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}