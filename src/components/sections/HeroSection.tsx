"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { useAppReady } from "@/hooks/useAppReady";

// Realistic Typewriter Effect with natural cadence and blinking cursor
function TypewriterEffect({
  text,
  delay = 0.5,
  baseSpeed = 24,
  showCursor = true,
  cursorClassName = "bg-[#FF5A00]",
  className = "",
  onComplete,
}: {
  text: string;
  delay?: number;
  baseSpeed?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const isAppReady = useAppReady();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isAppReady) return;

    if (shouldReduceMotion) {
      setDisplayText(text);
      setIsTypingComplete(true);
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayText(text.slice(0, currentIndex));

          // Natural human cadence variation
          const nextChar = text[currentIndex - 1];
          let interval = baseSpeed + (Math.random() * 12 - 6);
          if (nextChar === "," || nextChar === ".") interval += 90;
          if (nextChar === " ") interval += 15;

          timeoutId = setTimeout(typeNextChar, interval);
        } else {
          setIsTypingComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    };

    timeoutId = setTimeout(startTyping, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [text, delay, baseSpeed, isAppReady, shouldReduceMotion, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block ml-1 align-baseline transition-opacity duration-150 ${cursorClassName} ${isTypingComplete ? "animate-pulse" : "opacity-100"
            }`}
          style={{
            width: "0.12em",
            height: "0.9em",
            transform: "translateY(0.08em)",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAppReady = useAppReady();

  return (
    <section
      ref={containerRef}
      data-theme="hero"
      className="sticky top-0 z-0 w-full h-[100svh] overflow-hidden bg-surface-deep text-white select-none snap-section flex flex-col justify-between"
      aria-label="Hero"
    >
      {/* ── Ambient Video, Background & Overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
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
      </div>

      {/* ── Grid Lines ── */}
      <GridLines />

      {/* ── Main Hero Content Area (Aligned to 10.8% - 88.8% Grid Lines) ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-0 pt-28 md:pt-32 pb-14 md:pb-20 lg:pb-24 flex-1 flex flex-col justify-end">
        <div className="w-full md:w-[78.0%] md:ml-[10.8%] flex flex-col">

          {/* Top Tagline / Context Monospace Header — Aligned to Grid Line 1 (10.8%) */}
          <div className="w-full mb-3">
            <span className="font-mono text-[11px] sm:text-[13px] tracking-[0.25em] sm:tracking-[0.35em] text-[#FF5A00] font-bold uppercase flex items-center">
              <TypewriterEffect
                text="[ 20+ YEARS OF SOFTWARE ENGINEERING ]"
                delay={0.3}
                baseSpeed={28}
                showCursor={true}
                cursorClassName="bg-[#FF5A00] h-3.5 sm:h-4 w-1"
              />
            </span>
          </div>

          {/* Bold Impact Headline & Right Copy (Line 1: 10.8% -> Line 3: 49.8% -> Line 5: 88.8%) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-end">

            {/* Left Big Headline (Grid Line 1 to Line 3 -> 6 cols / 50% of content) */}
            <div className="lg:col-span-7 lg:pr-8">
              <h1 className="font-sans font-black text-[clamp(2.4rem,4.2vw,4.8rem)] leading-[0.93] tracking-[-0.035em] text-white uppercase select-none">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE_CUSTOM }}
                  className="block"
                >
                  DIGITAL PRODUCTS
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE_CUSTOM }}
                  className="block text-white/95"
                >
                  ENGINEERED TO
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: EASE_CUSTOM }}
                  className="block text-white/85"
                >
                  SCALE WITHOUT LIMITS.
                </motion.span>
              </h1>
            </div>

            {/* Right Supporting Value Statement & Lifecycle Summary (Terminates flush at Line 5 / 88.8%) */}
            <div className="lg:col-span-5 pb-1 flex flex-col justify-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.85, delay: 0.55, ease: EASE_CUSTOM }}
                className="font-sans text-[22px] sm:text-[26px] md:text-[29px] text-white/95 leading-[1.3] font-normal tracking-tight"
              >
                We design and engineer custom software, enterprise AI products, and cloud platforms with craft, agility, and precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.85, delay: 0.7, ease: EASE_CUSTOM }}
                className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-white/65 font-mono text-[13px] sm:text-[14.5px] uppercase tracking-[0.2em]"
              >
                <span>EST. 2001</span>
                <span className="text-[#FF5A00] font-semibold">WORLDWIDE IMPACT &bull;</span>
              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* Pinned Bottom Partner Ticker Bar */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}
