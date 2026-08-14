"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { EngineeringStatement } from "@/components/engineering/EngineeringStatement";
import { GridLines } from "@/components/ui/GridLines";

/**
 * Mission section — scroll-scene (not snap-section).
 *
 * Height = 155vh  →  section stays sticky for 55vh of extra scroll.
 * useScroll tracks from outer section start-start to end-end.
 * scrollYProgress is passed into EngineeringStatement for word reveal.
 *
 * Progress budget:
 *   0.00–0.08  settle / eyebrow fade
 *   0.08–0.82  word-by-word reveal
 *   0.82–0.94  orange rule draws / last-word hold
 *   0.94–1.00  release — next section takes over
 */
export function EngineeringIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="scroll-scene section-mission relative w-full bg-white text-foreground select-none"
      style={{ height: "155vh" }}
    >
      {/* Sticky visual — always fills viewport for the full 155vh of scroll */}
      <div className="sticky top-0 w-full h-[100svh] bg-white flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <GridLines light />
        </div>
        <div className="relative z-10 mx-auto w-full h-full flex flex-col justify-center">
          <EngineeringStatement scrollProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
