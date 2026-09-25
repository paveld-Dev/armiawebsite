"use client";

import React from "react";
import { useHeroVariant } from "@/context/HeroContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroSection2 } from "@/components/sections/HeroSection2";
import { HeroSection3 } from "@/components/sections/HeroSection3";

export function HeroSectionWrapper() {
  const { activeHero } = useHeroVariant();

  if (activeHero === "hero2") return <HeroSection2 />;
  if (activeHero === "hero3") return <HeroSection3 />;
  return <HeroSection />;
}
