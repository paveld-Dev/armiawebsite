"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HERO_STRIP_ITEMS } from "@/data/navigation";

export function HeroNavStrip() {
  return (
    <div className="w-full bg-white border-b border-border-light text-foreground select-none relative z-20">
      <Container clean className="px-0">
        <div className="flex flex-wrap md:flex-nowrap items-stretch divide-x divide-border-light border-x border-border-light">
          {HERO_STRIP_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex-1 min-w-[120px] md:min-w-0 py-4 md:py-5 px-4 text-center font-mono text-[11px] xl:text-xs tracking-[0.14em] uppercase text-foreground transition-colors duration-300 hover:bg-surface-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <span className="relative z-10">{item.label}</span>
              {/* Subtle top indicator line on hover */}
              <span className="absolute top-0 left-0 h-0.5 w-full scale-x-0 bg-brand-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
