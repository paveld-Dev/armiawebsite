"use client";

import React from "react";
import { EngineeringStatement } from "@/components/engineering/EngineeringStatement";
import { GridLines } from "@/components/ui/GridLines";

export function EngineeringIntro() {
  return (
    <section className="relative z-10 w-full h-[100svh] bg-white text-foreground flex flex-col justify-center snap-section">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <GridLines light />
      </div>
      <div className="relative z-10 mx-auto w-full h-full flex flex-col justify-center">
        <EngineeringStatement />
      </div>
    </section>
  );
}

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
