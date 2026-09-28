"use client";

import React, { useState, useRef, useEffect } from "react";
import { useHeroVariant } from "@/context/HeroContext";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroSwitcherProps {
  isWhiteHeader?: boolean;
}

export function HeroSwitcher({ isWhiteHeader }: HeroSwitcherProps) {
  const { activeHero, setActiveHero } = useHeroVariant();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left mr-3 md:mr-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`group flex items-center gap-2 h-[38px] md:h-[42px] px-3.5 md:px-4 font-mono text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
          isWhiteHeader
            ? "bg-white hover:bg-neutral-100 text-neutral-900 border-neutral-300 hover:border-brand-accent shadow-[0_0_15px_rgba(255,90,0,0)] hover:shadow-[0_0_20px_rgba(255,90,0,0.12)]"
            : "bg-[#111111] hover:bg-[#181818] text-neutral-200 border-white/20 hover:border-brand-accent shadow-[0_0_15px_rgba(255,90,0,0)] hover:shadow-[0_0_20px_rgba(255,90,0,0.18)]"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
        <span className="font-medium">
          {activeHero === "hero1" ? "Hero 1" : activeHero === "hero2" ? "Hero 2" : "Hero 3"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand-accent" : "text-neutral-400 group-hover:text-neutral-200"
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-1.5 w-44 rounded-none bg-[#111111] border border-white/15 shadow-2xl py-1 z-50 backdrop-blur-md"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500 border-b border-white/10">
            Switch Hero
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setActiveHero("hero1");
              setIsOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 text-xs font-mono tracking-wider flex items-center justify-between transition-colors ${
              activeHero === "hero1"
                ? "bg-brand-accent/15 text-brand-accent font-semibold"
                : "text-neutral-300 hover:bg-white/5"
            }`}
          >
            <span>Hero 1 (Current)</span>
            {activeHero === "hero1" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            )}
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setActiveHero("hero2");
              setIsOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 text-xs font-mono tracking-wider flex items-center justify-between transition-colors ${
              activeHero === "hero2"
                ? "bg-brand-accent/15 text-brand-accent font-semibold"
                : "text-neutral-300 hover:bg-white/5"
            }`}
          >
            <span>Hero 2 (Mechanical)</span>
            {activeHero === "hero2" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            )}
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setActiveHero("hero3");
              setIsOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 text-xs font-mono tracking-wider flex items-center justify-between transition-colors ${
              activeHero === "hero3"
                ? "bg-brand-accent/15 text-brand-accent font-semibold"
                : "text-neutral-300 hover:bg-white/5"
            }`}
          >
            <span>Hero 3 (Butterfly)</span>
            {activeHero === "hero3" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
