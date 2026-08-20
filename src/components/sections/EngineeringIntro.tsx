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
      className="relative z-10 w-full h-[75vh] bg-white text-foreground select-none"
      aria-label="Mission Statement"
    >
      {/* Sticky Fullscreen Viewport that stays locked while scrolling */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden">
        <EngineeringStatement />
      </div>
    </section>
  );
}