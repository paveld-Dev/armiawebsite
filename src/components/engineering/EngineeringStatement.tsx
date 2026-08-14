"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const statementText =
  "24+ years engineering enterprise software. We eliminate the speed vs. reliability compromise — 98% of projects delivered on time and on budget.";

const words = statementText.split(" ");

export function EngineeringStatement() {

  return (
    <div className="relative flex flex-col justify-between h-full pt-[10vh] pb-[6vh] pl-[clamp(34px,3vw,58px)] pr-[clamp(40px,5vw,90px)] select-none">

      {/* 1. Top Meta Bar */}
      <div className="flex items-center justify-between">
        <SectionEyebrow number="02" label="MISSION" className="!mb-0" />
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-foreground-muted">©2004–2026</span>
      </div>

      {/* 2. Main Large Editorial Statement (Restrained scale: clamp(2.8rem, 3.25vw, 4.4rem), max-width 720px) */}
      <div className="mt-8 mb-auto max-w-[720px] xl:max-w-[760px]">
        <motion.h2
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="font-sans text-[clamp(2.8rem,3.25vw,4.4rem)] font-medium tracking-[-0.035em] leading-[1.08] text-left flex flex-wrap gap-x-[0.25em]"
        >
          {words.map((word, index) => {
            const isEmphasized = index < 4; // Emphasize first phrase "24+ years engineering enterprise"

            return (
              <motion.span
                key={index}
                variants={fadeUp}
                className={isEmphasized ? "text-foreground" : "text-foreground-muted"}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h2>
      </div>

      {/* 3. Lower Orange Rule & Micro Metadata (Positioned so budget & rule remain fully visible within 80-82vh) */}
      <div className="w-full space-y-3 pt-4">
        {/* Animated Orange Horizontal Rule (width: 46%) */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE_CUSTOM }}
          className="h-[2px] w-[46%] bg-brand-accent origin-left"
        />

        {/* Lower Meta Row */}
        <div className="flex items-center justify-between font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-foreground-muted">
          <span>/01 PROJECTS</span>
          <span className="h-1.5 w-1.5 bg-brand-accent" />
        </div>
      </div>

    </div>
  );
}
        </motion.div >
      </div >
    </div >
  );
}
