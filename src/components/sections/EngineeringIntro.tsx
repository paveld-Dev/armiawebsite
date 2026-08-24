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
      data-theme="white"
      className="relative z-10 w-full h-[10svh] min-h-[85svh] bg-white text-foreground select-none snap-section flex flex-col justify-center overflow-hidden"
      aria-label="Mission Statement"
    >
      <EngineeringStatement />
    </section>
  );
}