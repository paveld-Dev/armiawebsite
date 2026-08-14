"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM } from "@/lib/motion";

const statementText =
  "24+ years engineering enterprise software. We eliminate the speed vs. reliability compromise — 98% of projects delivered on time and on budget.";

const words = statementText.split(" ");

/**
 * Progress budget received from EngineeringIntro's outer section:
 *   0.00–0.08   settle / eyebrow appears
 *   0.08–0.82   word-by-word reveal (74% of the scroll distance)
 *   0.82–0.94   orange rule draws, last word hold
 *   0.94–1.00   release window — nothing visible changes
 */
const REVEAL_START = 0.08;
const REVEAL_END = 0.82;
const REVEAL_RANGE = REVEAL_END - REVEAL_START; // 0.74

interface EngineeringStatementProps {
  scrollProgress: MotionValue<number>;
}

export function EngineeringStatement({ scrollProgress }: EngineeringStatementProps) {
  return (
    <div className="relative flex flex-col justify-between h-full pt-[10vh] pb-[6vh] pl-[clamp(34px,3vw,58px)] pr-[clamp(40px,5vw,90px)] select-none">

      {/* 1. Top Meta Bar — fades in on settle phase */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.6, ease: EASE_CUSTOM }}
        className="flex items-center justify-between"
      >
        <SectionEyebrow number="02" label="MISSION" className="!mb-0" />
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-foreground-muted">©2004–2026</span>
      </motion.div>

      {/* 2. Main Statement — scroll-driven word reveal mapped to 0.08→0.82 */}
      <div className="mt-8 mb-auto max-w-[720px] xl:max-w-[760px]">
        <h2 className="font-sans text-[clamp(2.8rem,3.25vw,4.4rem)] font-medium tracking-[-0.035em] leading-[1.08] text-left flex flex-wrap gap-x-[0.25em]">
          {words.map((word, index) => {
            // Each word gets an equal share of the 0.08→0.82 range
            const wordFraction = index / words.length;
            const wordStart = REVEAL_START + wordFraction * REVEAL_RANGE;
            const wordEnd = wordStart + (REVEAL_RANGE / words.length) * 1.5; // slight overlap for smoothness

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const wordColor = useTransform(
              scrollProgress,
              [wordStart, Math.min(wordEnd, REVEAL_END)],
              ["#aaaaaa", "#111111"]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const wordOpacity = useTransform(
              scrollProgress,
              [wordStart, Math.min(wordEnd, REVEAL_END)],
              [0.18, 1]
            );

            return (
              <motion.span
                key={index}
                style={{ color: wordColor, opacity: wordOpacity }}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
      </div>

      {/* 3. Orange Rule — draws after most words are revealed (0.82→0.94) */}
      <div className="w-full space-y-3 pt-4">
        <motion.div
          style={{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            scaleX: useTransform(scrollProgress, [REVEAL_END, 0.94], [0, 1]),
            transformOrigin: "left",
          }}
          className="h-[2px] w-[46%] bg-brand-accent"
        />
        <motion.div
          style={{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            opacity: useTransform(scrollProgress, [REVEAL_END + 0.04, 0.94], [0, 1]),
          }}
          className="flex items-center justify-between font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-foreground-muted"
        >
          <span>/01 PROJECTS</span>
          <span className="h-1.5 w-1.5 bg-brand-accent" />
        </motion.div>
      </div>
    </div>
  );
}
