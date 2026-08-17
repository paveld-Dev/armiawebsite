"use client";

import React, { useRef } from "react";
import { EngineeringStatement } from "@/components/engineering/EngineeringStatement";
import { GridLines } from "@/components/ui/GridLines";

/**
 * Section 02: EngineeringIntro
 *
 * Viewport: 80vh clean single screen with snap alignment (.snap-section).
 * Zero unwanted trailing scroll space or unpinned blank scroll gap.
 */
export function EngineeringIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full h-[80vh] min-h-[80vh] max-h-[864px] bg-white text-foreground select-none snap-section flex flex-col justify-between overflow-hidden"
      aria-label="Mission Statement"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <GridLines light />
      </div>
      <div className="relative z-10 mx-auto w-full h-full flex flex-col justify-between">
        <EngineeringStatement />
      </div>
    </section>
  );
}