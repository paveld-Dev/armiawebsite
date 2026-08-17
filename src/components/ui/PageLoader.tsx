"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";

/**
 * High-precision liquid physics loader:
 * - SVG <mask> with <text> clips the entire fluid simulation STRICTLY inside the ARMIA glyphs.
 * - Dual physics-based undulating sine wave layers (crests, troughs, sloshing phase offsets).
 * - Floating, buoyancy-driven water bubbles that wobble and pop as they ascend within the text.
 * - Glowing liquid meniscus surface with water highlights.
 */
const MIN_DURATION_MS = 2500;

// Individual bubble physics inside the liquid
const BUBBLES = [
  { id: 1, cx: 220, r: 8, delay: 0.1, duration: 1.6, xDrift: 15 },
  { id: 2, cx: 340, r: 12, delay: 0.5, duration: 2.0, xDrift: -20 },
  { id: 3, cx: 480, r: 6, delay: 0.2, duration: 1.4, xDrift: 10 },
  { id: 4, cx: 600, r: 14, delay: 0.7, duration: 2.2, xDrift: -16 },
  { id: 5, cx: 720, r: 9, delay: 0.3, duration: 1.8, xDrift: 22 },
  { id: 6, cx: 860, r: 13, delay: 0.6, duration: 2.1, xDrift: -12 },
  { id: 7, cx: 980, r: 7, delay: 0.2, duration: 1.5, xDrift: 18 },
  { id: 8, cx: 1100, r: 11, delay: 0.8, duration: 1.9, xDrift: -14 },
];

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / MIN_DURATION_MS);
      // Realistic liquid filling curve (accelerates as pump fills, eases at brim)
      const easedT = t < 0.65 ? (t / 0.65) * 0.7 : 0.7 + ((t - 0.65) / 0.35) * 0.3;
      const pct = Math.min(100, Math.round(easedT * 100));
      setProgress(pct);

      if (elapsed < MIN_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
        }, 360);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  // Map progress (0 -> 100) to SVG view box Y coordinate (viewBox height is 300)
  // Text sits vertically between Y = 60 and Y = 250
  const waterLevelY = 270 - (progress / 100) * 230;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE_CUSTOM } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#101010] text-[#f3f3f0] select-none overflow-hidden"
        >
          {/* Background Texture identical to Services Section */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')]" />
          <GridLines />

          {/* Top Eyebrow Tag */}
          <div className="absolute top-8 md:top-12 z-20 flex items-center justify-between w-full max-w-[1920px] px-6 md:px-12 font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 uppercase">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-brand-accent animate-pulse" />
              <span>INITIALIZING ARCHITECTURE</span>
            </div>
            <span>©2004–2026</span>
          </div>

          {/* Center Liquid Physical SVG Simulation */}
          <div className="relative z-20 w-full max-w-[1240px] px-4 flex flex-col items-center justify-center">
            
            <div className="w-full relative flex items-center justify-center">
              <svg
                viewBox="0 0 1300 300"
                className="w-full h-auto max-h-[38vh] overflow-visible drop-shadow-[0_0_50px_rgba(255,92,0,0.35)]"
              >
                <defs>
                  {/* Linear Liquid Color Gradient */}
                  <linearGradient id="waterGradDeep" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#d93800" />
                    <stop offset="45%" stopColor="#ff5a00" />
                    <stop offset="85%" stopColor="#ff7a00" />
                    <stop offset="100%" stopColor="#ffa043" />
                  </linearGradient>

                  <linearGradient id="waterGradBack" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#b32e00" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#e64a00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff851b" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Surface Glow Gradient */}
                  <linearGradient id="foamGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.2" />
                  </linearGradient>

                  {/* 1. MASK: Strictly cuts anything outside of ARMIA letterforms */}
                  <mask id="armiaTextMask">
                    {/* Black background = transparent */}
                    <rect width="100%" height="100%" fill="black" />
                    {/* White text = opaque reveal portal */}
                    <text
                      x="50%"
                      y="74%"
                      textAnchor="middle"
                      fill="white"
                      fontFamily="var(--font-geist-sans), var(--font-sans), system-ui, sans-serif"
                      fontWeight="400"
                      fontSize="220"
                      letterSpacing="-0.04em"
                    >
                      ARMIA
                    </text>
                  </mask>
                </defs>

                {/* 2. BASE: Subdued Outlined & Translucent Body Text (Unfilled portion) */}
                <text
                  x="50%"
                  y="74%"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.03)"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="2"
                  fontFamily="var(--font-geist-sans), var(--font-sans), system-ui, sans-serif"
                  fontWeight="400"
                  fontSize="220"
                  letterSpacing="-0.04em"
                  className="select-none"
                >
                  ARMIA
                </text>

                {/* 3. FLUID SIMULATION: Rendered entirely inside the mask */}
                <g mask="url(#armiaTextMask)">
                  
                  {/* Wave Layer 1 (Back wave, slower offset phase) */}
                  <motion.g
                    animate={{
                      x: [0, -650],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <path
                      fill="url(#waterGradBack)"
                      d={`
                        M 0,${waterLevelY + 4}
                        Q 162.5,${waterLevelY - 10} 325,${waterLevelY + 4}
                        T 650,${waterLevelY + 4}
                        T 975,${waterLevelY + 4}
                        T 1300,${waterLevelY + 4}
                        T 1625,${waterLevelY + 4}
                        T 1950,${waterLevelY + 4}
                        L 1950,350
                        L 0,350
                        Z
                      `}
                    />
                  </motion.g>

                  {/* Wave Layer 2 (Front wave with liquid slosh amplitude) */}
                  <motion.g
                    animate={{
                      x: [0, -650],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <path
                      fill="url(#waterGradDeep)"
                      d={`
                        M 0,${waterLevelY}
                        Q 162.5,${waterLevelY + 12} 325,${waterLevelY}
                        T 650,${waterLevelY}
                        T 975,${waterLevelY}
                        T 1300,${waterLevelY}
                        T 1625,${waterLevelY}
                        T 1950,${waterLevelY}
                        L 1950,350
                        L 0,350
                        Z
                      `}
                    />

                    {/* Glowing Water Meniscus Highlight along the crest */}
                    <path
                      fill="none"
                      stroke="url(#foamGlow)"
                      strokeWidth="3.5"
                      d={`
                        M 0,${waterLevelY}
                        Q 162.5,${waterLevelY + 12} 325,${waterLevelY}
                        T 650,${waterLevelY}
                        T 975,${waterLevelY}
                        T 1300,${waterLevelY}
                        T 1625,${waterLevelY}
                        T 1950,${waterLevelY}
                      `}
                    />
                  </motion.g>

                  {/* 4. Rising Physical Bubbles Inside Liquid */}
                  {progress > 8 &&
                    BUBBLES.map((b) => (
                      <motion.circle
                        key={b.id}
                        cx={b.cx}
                        r={b.r}
                        fill="rgba(255, 255, 255, 0.75)"
                        stroke="#ffe6b0"
                        strokeWidth="1.5"
                        initial={{
                          cy: 280,
                          opacity: 0,
                          scale: 0.5,
                        }}
                        animate={{
                          cy: [280, Math.max(waterLevelY, 40)],
                          x: [0, b.xDrift, 0],
                          opacity: [0, 0.85, 0.9, 0],
                          scale: [0.5, 1.1, 0.4],
                        }}
                        transition={{
                          duration: b.duration,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: b.delay,
                        }}
                      />
                    ))}
                </g>
              </svg>
            </div>

            {/* Real-time Percentage Indicator */}
            <div className="mt-4 flex items-center justify-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.25em] text-white/70">
              <span className="uppercase text-white/40">LOADING SYSTEM</span>
              <span className="font-semibold text-brand-accent tabular-nums">
                {String(progress).padStart(3, " ")}%
              </span>
            </div>

          </div>

          {/* Bottom Brand Tagline */}
          <div className="absolute bottom-8 md:bottom-12 z-20 flex items-center justify-center font-mono text-[8.5px] md:text-[9.5px] tracking-[0.22em] text-white/40 uppercase">
            ENTERPRISE SOFTWARE &bull; SINCE 2004
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
