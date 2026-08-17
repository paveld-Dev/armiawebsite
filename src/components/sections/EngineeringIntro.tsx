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