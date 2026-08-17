"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_DURATION_MS = 2500;
const EASING_CINEMATIC = [0.22, 1, 0.36, 1] as const;

const CODE_LINES = [
  { line: 1, prefix: "01", code: 'import { createEnterpriseCore } from "@armia/systems";', highlight: "keyword" },
  { line: 2, prefix: "02", code: 'import { scalableArchitecture, aiModules } from "@/kernel";', highlight: "import" },
  { line: 3, prefix: "03", code: "", highlight: "empty" },
  { line: 4, prefix: "04", code: "const runtime = await createEnterpriseCore({", highlight: "fn" },
  { line: 5, prefix: "05", code: '  studio: "ARMIA SYSTEMS",', highlight: "str" },
  { line: 6, prefix: "06", code: "  est: 2004,", highlight: "num" },
  { line: 7, prefix: "07", code: "  security: true, highConcurrency: true,", highlight: "bool" },
  { line: 8, prefix: "08", code: '  cluster: "NODE_US_EAST_01",', highlight: "str" },
  { line: 9, prefix: "09", code: "});", highlight: "fn" },
  { line: 10, prefix: "10", code: "", highlight: "empty" },
  { line: 11, prefix: "11", code: "await runtime.hydrateViewport(); // [ARMIA KERNEL MOUNTED]", highlight: "comment" },
];

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeLineCount, setActiveLineCount] = useState(1);

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
      const progressFraction = Math.min(1, elapsed / TOTAL_DURATION_MS);
      const currentPct = Math.min(100, Math.floor(progressFraction * 100));
      setProgress(currentPct);

      // Typing code line-by-line according to progress
      const linesVisible = Math.max(
        1,
        Math.min(CODE_LINES.length, Math.floor(progressFraction * CODE_LINES.length) + 1)
      );
      setActiveLineCount(linesVisible);

      if (elapsed < TOTAL_DURATION_MS) {
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="coding-screen-loader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.85, ease: EASING_CINEMATIC },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0a0a0c] text-[#f3f3f0] select-none overflow-hidden p-6 md:p-12 font-mono"
        >
          {/* Subtle Cybernetic Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />

          {/* Top IDE Header / Terminal Tab Bar */}
          <div className="relative z-10 w-full max-w-[1920px] mx-auto flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              {/* Traffic light terminal dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="h-3 w-[1px] bg-white/20 mx-1" />
              <span className="text-[10px] md:text-[11px] text-white/80 font-medium tracking-wide">
                armia_kernel.ts &bull; compilation
              </span>
            </div>

            <div className="flex items-center gap-6 text-[9.5px] md:text-[10.5px] tracking-widest text-white/40 uppercase">
              <span className="hidden sm:inline text-white/30">V8_TURBOPACK 16.3</span>
              <span className="text-[#ff5a00] font-bold">READY: {progress}%</span>
            </div>
          </div>

          {/* Center Coding Terminal Box & ARMIA Assembly */}
          <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col justify-center">
            {/* Terminal Window Frame */}
            <div className="relative rounded-none border border-white/[0.1] bg-[#111114]/90 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
              {/* ARMIA Watermark in Background */}
              <div className="absolute right-6 bottom-4 pointer-events-none opacity-[0.03] select-none text-[clamp(4rem,10vw,8rem)] font-bold tracking-tight text-white">
                ARMIA
              </div>

              {/* Code Streams */}
              <div className="space-y-1.5 md:space-y-2 text-[12px] md:text-[14px] leading-relaxed font-mono">
                {CODE_LINES.slice(0, activeLineCount).map((item) => (
                  <div key={item.line} className="flex items-start gap-4 md:gap-6">
                    <span className="text-white/25 select-none w-6 shrink-0 text-right text-[11px]">
                      {item.prefix}
                    </span>
                    <span className="flex-1 whitespace-pre-wrap">
                      {item.highlight === "keyword" && (
                        <>
                          <span className="text-[#ff7b72]">import</span>
                          <span className="text-white">{" { "}</span>
                          <span className="text-[#79c0ff]">createEnterpriseCore</span>
                          <span className="text-white">{" } "}</span>
                          <span className="text-[#ff7b72]">from</span>
                          <span className="text-[#a5d6ff]"> &quot;@armia/systems&quot;;</span>
                        </>
                      )}
                      {item.highlight === "import" && (
                        <>
                          <span className="text-[#ff7b72]">import</span>
                          <span className="text-white">{" { "}</span>
                          <span className="text-[#d2a8ff]">scalableArchitecture</span>
                          <span className="text-white">, </span>
                          <span className="text-[#d2a8ff]">aiModules</span>
                          <span className="text-white">{" } "}</span>
                          <span className="text-[#ff7b72]">from</span>
                          <span className="text-[#a5d6ff]"> &quot;@/kernel&quot;;</span>
                        </>
                      )}
                      {item.highlight === "fn" && (
                        <>
                          <span className="text-[#ff7b72]">const </span>
                          <span className="text-[#79c0ff]">runtime </span>
                          <span className="text-[#ff7b72]">= await </span>
                          <span className="text-[#d2a8ff]">createEnterpriseCore</span>
                          <span className="text-white">({"{"}</span>
                          {item.code.includes("});") && <span className="text-white">{"});"}</span>}
                        </>
                      )}
                      {item.highlight === "str" && (
                        <>
                          <span className="text-[#7ee787] pl-4">{item.code}</span>
                        </>
                      )}
                      {item.highlight === "num" && (
                        <>
                          <span className="text-[#79c0ff] pl-4">{item.code}</span>
                        </>
                      )}
                      {item.highlight === "bool" && (
                        <>
                          <span className="text-[#ff7b72] pl-4">{item.code}</span>
                        </>
                      )}
                      {item.highlight === "comment" && (
                        <span className="text-[#ff5a00] font-semibold">
                          {item.code}
                        </span>
                      )}
                      {item.highlight === "empty" && <span className="inline-block h-3" />}
                    </span>
                  </div>
                ))}

                {/* Blinking Cursor */}
                <div className="flex items-center gap-4 md:gap-6 pl-10">
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-2.5 h-4 bg-[#ff5a00]"
                  />
                </div>
              </div>

              {/* Live Status Bar inside Terminal */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] md:text-[11px] text-white/50">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a00] animate-pulse" />
                  <span className="text-white/80">COMPILING ENTERPRISE MODULES</span>
                </div>
                <span className="text-[#ff5a00] font-bold tabular-nums">
                  [{String(progress).padStart(3, "0")}%]
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Progress % & Thin Orange Progress Line */}
          <div className="relative z-10 w-full max-w-[1920px] mx-auto flex flex-col gap-3">
            <div className="flex items-center justify-between text-[9px] md:text-[10px] tracking-[0.24em] text-white/40 uppercase">
              <span>INITIALIZING DIGITAL ARCHITECTURE</span>
              <span className="text-[#ff5a00] font-semibold tabular-nums">{progress}% COMPLETE</span>
            </div>

            {/* Orange Progress Bar Line (scaleX) */}
            <div className="relative w-full h-[2px] bg-white/[0.08] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#ff5a00] shadow-[0_0_10px_#ff5a00]"
                style={{
                  width: "100%",
                  transformOrigin: "left",
                  scaleX: progress / 100,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
