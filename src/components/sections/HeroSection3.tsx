"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { useAppReady } from "@/hooks/useAppReady";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { GridLines } from "@/components/ui/GridLines";
import { ArrowDown, Code2, Cpu, Cloud, ShieldCheck, Terminal, Layers } from "lucide-react";

interface ArmiaPillarTile {
  id: string;
  tag: string;
  category: string;
  spec: string;
  image: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  floatDelay: number;
  floatDuration: number;
  floatDistance: number;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: ArmiaPillarTile[] = [
  {
    id: "pillar-1",
    tag: "SYS // AI & ML",
    category: "AI & INTELLIGENCE LABS",
    spec: "LLM Orchestration & Agentic RAG",
    image: "/images/tile_ai_brain.jpg",
    top: "8%",
    left: "2.5%",
    width: "13vw",
    height: "22vh",
    floatDelay: 0,
    floatDuration: 5.5,
    floatDistance: 10,
    icon: Cpu,
  },
  {
    id: "pillar-2",
    tag: "SYS // CLOUD",
    category: "DEVOPS & KUBERNETES",
    spec: "Multi-Region Zero-Downtime Infra",
    image: "/images/tile_cloud_mesh.jpg",
    bottom: "10%",
    left: "2.5%",
    width: "13vw",
    height: "22vh",
    floatDelay: 0.8,
    floatDuration: 6.2,
    floatDistance: 12,
    icon: Cloud,
  },
  {
    id: "pillar-3",
    tag: "SYS // ARCH",
    category: "CUSTOM SOFTWARE",
    spec: "High-Concurrency Enterprise Engines",
    image: "/images/tile_architecture.jpg",
    bottom: "6%",
    left: "17%",
    width: "14vw",
    height: "18vh",
    floatDelay: 0.4,
    floatDuration: 5.8,
    floatDistance: 9,
    icon: Code2,
  },
  {
    id: "pillar-4",
    tag: "SYS // SEC",
    category: "ENTERPRISE SECURITY",
    spec: "SOC2 Type II & HIPAA Compliance",
    image: "/images/tile_security.jpg",
    top: "8%",
    right: "2.5%",
    width: "13vw",
    height: "22vh",
    floatDelay: 1.2,
    floatDuration: 6.5,
    floatDistance: 11,
    icon: ShieldCheck,
  },
  {
    id: "pillar-5",
    tag: "SYS // SRE",
    category: "SRE & RELIABILITY",
    spec: "99.99% Guaranteed SLA Uptime",
    image: "/images/tile_sre.jpg",
    bottom: "10%",
    right: "2.5%",
    width: "13vw",
    height: "22vh",
    floatDelay: 0.2,
    floatDuration: 5.2,
    floatDistance: 12,
    icon: Terminal,
  },
  {
    id: "pillar-6",
    tag: "SYS // CORE",
    category: "PRODUCT ENGINEERING",
    spec: "End-to-End Modernization Lifecycle",
    image: "/images/tile_product_core.jpg",
    top: "6%",
    right: "17%",
    width: "14vw",
    height: "18vh",
    floatDelay: 1.6,
    floatDuration: 6.0,
    floatDistance: 9,
    icon: Layers,
  },
];

export function HeroSection3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAppReady = useAppReady();
  const shouldReduceMotion = useReducedMotion();
  const [activePillar, setActivePillar] = useState<ArmiaPillarTile | null>(null);

  // Parallax motion values with subtle cursor inertia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 45, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Inverted parallax for foreground tiles (creates genuine multiplane depth)
  const foregroundSpringConfig = { damping: 25, stiffness: 40, mass: 0.6 };
  const fgX = useSpring(useMotionValue(0), foregroundSpringConfig);
  const fgY = useSpring(useMotionValue(0), foregroundSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const xPercent = (clientX - rect.left) / rect.width - 0.5;
    const yPercent = (clientY - rect.top) / rect.height - 0.5;

    // Background moves with cursor
    mouseX.set(xPercent * 32);
    mouseY.set(yPercent * 24);

    // Foreground tiles move inversely to amplify depth
    fgX.set(-xPercent * 20);
    fgY.set(-yPercent * 16);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    fgX.set(0);
    fgY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-theme="white"
      className="relative z-0 w-full min-h-[100svh] overflow-hidden bg-[#fafafa] text-[#111111] select-none flex flex-col justify-between"
      aria-label="Armia Systems Inc. Engineering Standard Hero"
    >
      {/* ── Architectural Grid Lines ── */}
      <GridLines light={true} />

      {/* ── Atmospheric Visuals Window: Subtle Neural Networks, Prisms, Circuit traces ── */}
      <div className="relative w-full h-[64vh] sm:h-[70vh] md:h-[72vh] overflow-hidden pt-20 sm:pt-24 md:pt-28 border-b border-neutral-200">
        
        {/* Abstract Technology Visuals Backdrop */}
        <motion.div
          aria-hidden
          style={{ x: smoothX, y: smoothY }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.025, 1],
                  filter: ["brightness(0.95) contrast(1.05)", "brightness(1.02) contrast(1.08)", "brightness(0.95) contrast(1.05)"],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-[6%] z-0 pointer-events-none select-none will-change-transform"
        >
          <Image
            src="/images/hero3_tech_atmosphere.jpg"
            alt="Armia Systems Neural Engineering Backdrop"
            fill
            sizes="100vw"
            className="object-cover object-center filter saturate-[1.15] opacity-95"
            priority
          />
        </motion.div>

        {/* Ambient Film Grain Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]"
        />

        {/* Floating Architectural Pillar Photo Tiles with Specular Hover */}
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          const isSelected = activePillar?.id === pillar.id;

          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={
                isAppReady
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: shouldReduceMotion
                        ? 0
                        : [0, -pillar.floatDistance, 0, pillar.floatDistance * 0.6, 0],
                    }
                  : { opacity: 0, scale: 0.9, y: 30 }
              }
              transition={
                isAppReady
                  ? {
                      opacity: { duration: 0.7, delay: index * 0.08 },
                      scale: { duration: 0.7, delay: index * 0.08 },
                      y: {
                        duration: pillar.floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: pillar.floatDelay,
                      },
                    }
                  : undefined
              }
              style={{
                top: pillar.top,
                bottom: pillar.bottom,
                left: pillar.left,
                right: pillar.right,
                width: pillar.width,
                height: pillar.height,
                x: fgX,
              }}
              onMouseEnter={() => setActivePillar(pillar)}
              onMouseLeave={() => setActivePillar(null)}
              className={`absolute z-10 hidden sm:block p-1 bg-white/30 backdrop-blur-md border transition-all duration-300 cursor-pointer group shadow-[0_12px_32px_rgba(0,0,0,0.18)] will-change-transform ${
                isSelected
                  ? "border-[#ff5a00] scale-105 z-30 shadow-[0_16px_40px_rgba(255,90,0,0.35)] ring-2 ring-[#ff5a00]/50"
                  : "border-white/70 hover:scale-105 hover:z-20 hover:border-white"
              }`}
            >
              {/* Specular Shimmer Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

              {/* Conceptual Photo Artwork */}
              <div className="w-full h-full relative overflow-hidden bg-neutral-900">
                <Image
                  src={pillar.image}
                  alt={pillar.category}
                  fill
                  sizes="(max-width: 1200px) 25vw, 18vw"
                  className="object-cover object-center filter saturate-[1.1] contrast-[1.05] group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="relative z-10 p-2 flex items-center justify-between text-white font-mono text-[9px] font-bold">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm border border-white/10">
                    <Icon className="w-3 h-3 text-[#ff5a00] group-hover:rotate-12 transition-transform duration-300" />
                    <span className="tracking-wider">{pillar.tag}</span>
                  </div>
                </div>

                <div className="relative z-10 p-2 pt-0 hidden lg:block text-[10px] font-sans font-medium text-white/90 leading-tight drop-shadow-sm">
                  {pillar.spec}
                </div>
              </div>

              {/* Corner Tag */}
              <div className="absolute bottom-1 right-1 px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm group-hover:bg-[#ff5a00] transition-colors duration-200 z-10">
                {pillar.tag}
              </div>
            </motion.div>
          );
        })}

        {/* ── Clean Black Rectangular Content Block Centered with Soft Drop Shadow ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-6 pt-10">
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={isAppReady ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE_CUSTOM }}
            className="relative bg-black text-white px-6 sm:px-12 md:px-16 lg:px-20 py-7 sm:py-9 md:py-11 shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col items-center justify-center text-center pointer-events-auto select-text group max-w-5xl w-full"
          >
            {/* Small orange uppercase text at top */}
            <div className="mb-3 sm:mb-4 font-mono text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#ff5a00] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] animate-ping" />
              <span>[ 24+ YEARS OF SOFTWARE ENGINEERING ]</span>
            </div>

            {/* Large, bold, pure white sans-serif headline stacked in two lines */}
            <div className="w-full flex flex-col items-center justify-center px-2">
              <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight leading-[0.98] text-white whitespace-nowrap uppercase">
                DIGITAL PRODUCTS
              </h2>
              <div className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight leading-[0.98] text-white mt-1 text-center whitespace-nowrap uppercase">
                ENGINEERED TO SCALE
              </div>
            </div>

            {/* Thin horizontal divider line */}
            <div className="w-full h-px bg-white/20 my-4 sm:my-5" />

            {/* Left side small white text & Right side small orange text */}
            <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest uppercase">
              <span className="text-white font-medium">
                EST. 2001 // WORLDWIDE IMPACT
              </span>
              <span className="text-[#ff5a00] font-bold">
                ARCHITECTED FOR COMPLEXITY
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile Pillar Photos Carousel Strip (Visible on mobile/tablet) ── */}
      <div className="sm:hidden px-4 py-3 bg-[#111111] border-b border-neutral-800 overflow-x-auto flex gap-3 no-scrollbar">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={`mobile-${pillar.id}`}
              className="flex-shrink-0 w-36 h-28 relative rounded-sm overflow-hidden border border-white/15 bg-neutral-900"
            >
              <Image
                src={pillar.image}
                alt={pillar.category}
                fill
                sizes="144px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                <Icon className="w-2.5 h-2.5 text-[#ff5a00]" />
                <span className="font-mono text-[8px] font-bold text-white tracking-wider">{pillar.tag}</span>
              </div>
              <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-mono text-white/90 truncate font-semibold">
                {pillar.category}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Below the Black Block, on a Clean Light Background ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end">
        
        {/* Left side: short refined paragraph in dark gray */}
        <div className="md:col-span-5 flex flex-col justify-between h-full space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_CUSTOM }}
            className="font-sans text-base sm:text-lg lg:text-xl text-[#333333] font-normal leading-relaxed max-w-lg tracking-tight"
          >
            We design and engineer custom software, enterprise AI products, and cloud platforms with craft, agility, and precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE_CUSTOM }}
            className="font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest leading-relaxed pt-3 border-t border-neutral-200"
          >
            <p className="font-bold text-neutral-900">ARMIA SYSTEMS INC // GLOBAL ENGINEERING FOUNDRY</p>
            <p className="text-neutral-500">FULL-CYCLE PRODUCT ARCHITECTURE &bull; ENTERPRISE AI LABS</p>
          </motion.div>
        </div>

        {/* Right side: large bold black typography */}
        <div className="md:col-span-7 flex flex-col md:items-end text-left md:text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE_CUSTOM }}
            className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.96] text-[#111111] uppercase"
          >
            <div>SOFTWARE ARCHITECTURE</div>
            <div className="text-neutral-900 mt-1">ENTERPRISE AI 2026</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_CUSTOM }}
            className="mt-6 flex items-center gap-3 font-mono text-xs text-neutral-600 uppercase tracking-widest cursor-pointer group"
          >
            <span className="font-semibold text-neutral-900 group-hover:text-[#ff5a00] transition-colors duration-200">
              Explore capabilities
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#ff5a00] group-hover:translate-y-1 transition-transform duration-200" />
          </motion.div>
        </div>

      </div>

      {/* Pinned Bottom Partner Ticker Bar */}
      <div className="relative z-20 w-full mt-auto border-t border-neutral-200 bg-black">
        <PartnerTicker />
      </div>
    </section>
  );
}
