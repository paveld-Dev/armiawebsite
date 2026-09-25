"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type HeroVariant = "hero1" | "hero2" | "hero3";

interface HeroContextType {
  activeHero: HeroVariant;
  setActiveHero: (variant: HeroVariant) => void;
}

const HeroContext = createContext<HeroContextType>({
  activeHero: "hero1",
  setActiveHero: () => {},
});

export function HeroProvider({ children }: { children: ReactNode }) {
  const [activeHero, setActiveHero] = useState<HeroVariant>("hero2");

  return (
    <HeroContext.Provider value={{ activeHero, setActiveHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroVariant() {
  return useContext(HeroContext);
}
