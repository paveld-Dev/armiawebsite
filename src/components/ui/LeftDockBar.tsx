"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Briefcase,
  Users,
  Trophy,
  HelpCircle,
  FileText,
  Compass,
} from "lucide-react";

interface SectionDockItem {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: SectionDockItem[] = [
  { id: "hero", name: "Overview", badge: "01", icon: Sparkles },
  { id: "engineering", name: "Credibility", badge: "02", icon: Zap },
  { id: "services", name: "AI & Engineering", badge: "03", icon: Cpu },
  { id: "process", name: "Process", badge: "04", icon: Layers },
  { id: "portfolio", name: "Case Studies", badge: "05", icon: Briefcase },
  { id: "testimonials", name: "Partners", badge: "06", icon: Users },
  { id: "awards", name: "Recognition", badge: "07", icon: Trophy },
  { id: "faq", name: "FAQ", badge: "08", icon: HelpCircle },
  { id: "blog", name: "Insights", badge: "09", icon: FileText },
  { id: "footer", name: "Contact", badge: "10", icon: Compass },
];

export function LeftDockBar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDockHovered, setIsDockHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportMiddle = scrollY + window.innerHeight * 0.42;

      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMiddle >= top && viewportMiddle < top + height) {
            current = section.id;
            break;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = useMemo(() => {
    return SECTIONS.findIndex((s) => s.id === activeId);
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section Dock"
      onMouseEnter={() => setIsDockHovered(true)}
      onMouseLeave={() => {
        setIsDockHovered(false);
        setHoveredId(null);
      }}
      className="fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center select-none"
    >
      {/* 
        Minimalist "Ghost" Dock:
        Almost invisible when idle (subtle 1px spine & tiny quiet pips),
        gently wakes up when cursor approaches the left margin.
      */}
      <div className="relative py-3 px-1.5 flex flex-col items-center gap-2 transition-opacity duration-500">
        
        {/* Subtle, hair-thin track spine */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px bg-white/[0.07] pointer-events-none" />

        {/* Dynamic active line progress */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-px bg-brand-accent/50 transition-all duration-300 pointer-events-none"
          style={{
            height: `${((activeIndex + 0.5) / SECTIONS.length) * 100}%`,
          }}
        />

        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          const isHovered = hoveredId === section.id;
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Minimal Gamified Square Node:
                  Idle: tiny 6px x 6px square pip.
                  Active: expands to 22px filled square badge with icon.
                  Hover: expands smoothly with soft glow.
              */}
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Jump to ${section.name}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex items-center justify-center transition-all duration-300 ease-out focus:outline-none ${
                  isActive
                    ? "w-6 h-6 rounded-[5px] bg-brand-accent text-white shadow-[0_0_12px_rgba(255,90,0,0.6)]"
                    : isHovered
                    ? "w-6 h-6 rounded-[5px] bg-white/20 text-white backdrop-blur-sm scale-110"
                    : isDockHovered
                    ? "w-2.5 h-2.5 rounded-[2px] bg-white/30 hover:bg-white/70"
                    : "w-1.5 h-1.5 rounded-[1px] bg-white/20"
                }`}
              >
                {/* Icon displays only when node is active or hovered */}
                {(isActive || isHovered) && (
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                )}
              </button>

              {/* Ultra-sleek Ghost Tooltip Tag */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -4, filter: "blur(2px)" }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-white shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
                  >
                    <span className="font-mono text-[9px] text-brand-accent font-semibold tracking-wider">
                      {section.badge}
                    </span>
                    <span className="text-[11px] font-sans font-medium text-neutral-300">
                      {section.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
