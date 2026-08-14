"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { PartnerTicker } from "@/components/sections/PartnerTicker";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x } = useMousePosition();
  const reducedMotion = useReducedMotion();

  // Scroll-driven exit: as next section rises, hero scales down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleSpring = useSpring(rawScale, { stiffness: 80, damping: 20 });

  const bgDrift = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const mouseXOffset = reducedMotion
    ? 0
    : Math.max(
      -14,
      Math.min(
        14,
        (x / (typeof window !== "undefined" ? window.innerWidth : 1440) - 0.5) * 18
      )
    );

  // Letter mask reveal
  const letterVariants = {
    hidden: { y: "125%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: EASE_CUSTOM,
        delay: 0.28 + i * 0.035,
      },
    }),
  };

  const titleLetters = ["A", "R", "M", "I", "A"];

  return (
    <section
      ref={containerRef}
      className="section-hero relative w-full h-[100svh] overflow-hidden bg-surface-deep text-white select-none snap-section flex flex-col justify-between"
      aria-label="Hero"
    >
      {/* Background — drifts up and scales slightly as you scroll away */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          scale: reducedMotion ? 1.02 : 1.02,
          y: reducedMotion ? 0 : bgDrift,
          x: mouseXOffset,
        }}
      >
        {/* Entrance scale for background */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>

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

      {/* Scale-down + fade on exit */}
      <motion.div
        className="absolute inset-0 z-5 flex flex-col justify-between pointer-events-none"
        style={
          reducedMotion
            ? {}
            : { scale: scaleSpring, opacity: rawOpacity, transformOrigin: "center top" }
        }
      >
        {/* Top Left Metadata */}
        <motion.div
          className="absolute left-6 md:left-[49.8%] top-[40%] md:top-[46%] z-10 -translate-y-1/2 md:translate-y-0 pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE_CUSTOM }}
            className="font-mono text-[11px] md:text-xs tracking-[0.14em] uppercase text-white/90 space-y-1"
          >
            <p className="font-normal text-white">CUSTOM SOFTWARE, MOBILE &amp; WEB</p>
            <p className="font-normal text-white">DEVELOPMENT</p>
            <p className="text-white/60">SINCE 2001</p>
            <div className="h-1.5 w-1.5 bg-brand-accent mt-3" aria-hidden />
          </motion.div>
        </motion.div>

        {/* Right Metadata */}
        <motion.div
          className="absolute right-6 md:right-auto md:left-[69.3%] top-[40%] md:top-[46%] z-10 -translate-y-1/2 md:translate-y-0 pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_CUSTOM }}
            className="font-mono text-[11px] md:text-xs tracking-[0.14em] uppercase text-white/90 space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-white/50">/01</span>
              <span className="font-normal text-white">PRODUCTS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50">/02</span>
              <span className="font-normal text-white">SERVICES</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50">/03</span>
              <span className="font-normal text-white">SOLUTIONS</span>
            </div>
            <div className="h-1.5 w-1.5 bg-brand-accent mt-3" aria-hidden />
          </motion.div>
        </motion.div>

        {/* Main Headline — letter mask reveal */}
        <motion.div
          className="absolute left-6 md:left-[49.8%] top-[55%] md:top-[58%] z-10 w-[90%] md:w-[39vw] pointer-events-none"
        >
          <div className="leading-none select-none">
            <h1 className="flex justify-between w-full font-sans font-normal text-[clamp(5.5rem,11vw,13rem)] tracking-[-0.045em] leading-[0.82] text-white">
              {titleLetters.map((char, index) => (
                <span key={index} className="inline-block overflow-hidden pt-[0.2em] pb-[0.4em] px-[0.35em] -mt-[0.2em] -mb-[0.4em] -mx-[0.35em]">
                  <motion.span
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </motion.div>
      </motion.div>

      {/* Pinned Bottom Partner Ticker Bar */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}
