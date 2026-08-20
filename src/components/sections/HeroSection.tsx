"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { useAppReady } from "@/hooks/useAppReady";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x } = useMousePosition();
  const reducedMotion = useReducedMotion();
  const isAppReady = useAppReady();

  const bgScale = 1.02;
  const bgY = "0%";

  const titleY = 0;
  const titleOpacity = 1;

  const topMetaY = 0;
  const rightMetaY = 0;

  const mouseXOffset = reducedMotion
    ? 0
    : Math.max(
      -14,
      Math.min(
        14,
        (x / (typeof window !== "undefined" ? window.innerWidth : 1440) - 0.5) * 18
      )
    );

  const letterVariants = {
    hidden: { y: "125%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: EASE_CUSTOM,
        delay: 0.15 + i * 0.04,
      },
    }),
  };

  const titleLetters = ["A", "R", "M", "I", "A"];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-surface-deep text-white select-none snap-section flex flex-col justify-between"
      aria-label="Hero"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          scale: reducedMotion ? 1 : bgScale,
          y: reducedMotion ? 0 : bgY,
          x: mouseXOffset,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/orange.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 opacity-100 pointer-events-none">
          <Image
            src="/images/Overlay.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      <GridLines />

      <motion.div
        style={{ y: reducedMotion ? 0 : topMetaY }}
        className="absolute left-6 md:left-[49.8%] top-[40%] md:top-[46%] z-10 -translate-y-1/2 md:translate-y-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_CUSTOM }}
          className="font-mono text-[11px] md:text-xs tracking-[0.14em] uppercase text-white/90 space-y-1"
        >
          <p className="font-normal text-white">END-TO-END SOFTWARE</p>
          <p className="font-normal text-white">ENGINEERING</p>
          <p className="text-white/60">SINCE 2001</p>
          <div className="h-1.5 w-1.5 bg-brand-accent mt-3" aria-hidden />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: reducedMotion ? 0 : rightMetaY }}
        className="absolute right-6 md:right-auto md:left-[69.3%] top-[40%] md:top-[46%] z-10 -translate-y-1/2 md:translate-y-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_CUSTOM }}
          className="font-mono text-[11px] md:text-xs tracking-[0.14em] uppercase text-white/90 space-y-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="text-white/50">/01</span>
            <span className="font-normal text-white">CUSTOM SOFTWARE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50">/02</span>
            <span className="font-normal text-white">AI &amp; CLOUD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50">/03</span>
            <span className="font-normal text-white">UX &amp; DESIGN</span>
          </div>
          <div className="h-1.5 w-1.5 bg-brand-accent mt-3" aria-hidden />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: reducedMotion ? 0 : titleY, opacity: reducedMotion ? 1 : titleOpacity }}
        className="absolute left-6 md:left-[49.8%] right-6 md:right-[11.2%] top-[55%] md:top-[58%] z-10 pointer-events-none"
      >
        <div className="leading-none select-none w-full">
          <h1 className="flex justify-between items-baseline w-full font-sans font-normal text-[clamp(4rem,8.2vw,9.8rem)] tracking-tight leading-[0.82] text-white">
            {titleLetters.map((char, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <motion.span
                  custom={index}
                  initial="hidden"
                  animate={isAppReady ? "visible" : "hidden"}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE_CUSTOM }}
          className="font-sans font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-snug tracking-tight max-w-[540px] mt-4 md:mt-6"
        >
          Reliable software engineering, trusted by enterprise teams since 2001.
        </motion.p>
      </motion.div>

      {/* Pinned Bottom Partner Ticker Bar */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}
