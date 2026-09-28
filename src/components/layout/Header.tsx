"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EASE_CUSTOM } from "@/lib/motion";
import { HeroSwitcher } from "@/components/ui/HeroSwitcher";
import { useHeroVariant } from "@/context/HeroContext";

const NAV_ITEMS = [
  "SERVICES",
  "WORK",
  "ABOUT",
  "AI & ML",
  "CLOUD",
  "CAREERS",
  "CONTACT",
] as const;

export function Header() {
  const { activeHero } = useHeroVariant();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"hero" | "white" | "dark">("hero");

  useEffect(() => {
    // 1. Mark sections with explicit header themes
    const updateSectionTheme = () => {
      const headerLineY = 40; // top position where header sits
      const x = window.innerWidth / 2;
      
      // 1. First test elements directly under the center of the header line
      const elementsAtPoint = document.elementsFromPoint(x, headerLineY);
      let matchedTheme: "hero" | "white" | "dark" | null = null;

      for (const el of elementsAtPoint) {
        const sec = el.closest("section, footer");
        if (sec) {
          const explicitTheme = sec.getAttribute("data-theme") as "hero" | "white" | "dark" | null;
          if (explicitTheme) {
            matchedTheme = explicitTheme;
            break;
          }
          const classList = sec.className || "";
          if (
            classList.includes("bg-[#101010]") ||
            classList.includes("bg-[#0a0a0a]") ||
            classList.includes("bg-[#090909]") ||
            classList.includes("bg-surface-deep") ||
            sec.tagName.toLowerCase() === "footer"
          ) {
            matchedTheme = "dark";
            break;
          }
          if (classList.includes("bg-white")) {
            matchedTheme = "white";
            break;
          }
        }
      }

      // 2. Fallback to bounding rect check across all sections
      if (!matchedTheme) {
        const sections = Array.from(document.querySelectorAll("section, footer"));
        for (const sec of sections) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= headerLineY && rect.bottom > headerLineY) {
            const explicitTheme = sec.getAttribute("data-theme") as "hero" | "white" | "dark" | null;
            if (explicitTheme) {
              matchedTheme = explicitTheme;
              break;
            }
            const classList = sec.className || "";
            if (
              classList.includes("bg-[#101010]") ||
              classList.includes("bg-[#0a0a0a]") ||
              classList.includes("bg-[#090909]") ||
              classList.includes("bg-surface-deep") ||
              sec.tagName.toLowerCase() === "footer"
            ) {
              matchedTheme = "dark";
              break;
            }
            if (classList.includes("bg-white")) {
              matchedTheme = "white";
              break;
            }
          }
        }
      }

      setHeaderTheme(matchedTheme || "hero");
    };

    window.addEventListener("scroll", updateSectionTheme, { passive: true });
    window.addEventListener("resize", updateSectionTheme, { passive: true });
    
    const observer = new IntersectionObserver(
      () => {
        updateSectionTheme();
      },
      {
        root: null,
        rootMargin: "-20px 0px -80% 0px",
        threshold: [0, 0.1, 0.5, 0.9, 1],
      }
    );

    document.querySelectorAll("section, footer").forEach((sec) => observer.observe(sec));

    updateSectionTheme();

    return () => {
      window.removeEventListener("scroll", updateSectionTheme);
      window.removeEventListener("resize", updateSectionTheme);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const isHero = headerTheme === "hero";
  const isWhite = headerTheme === "white";
  const isDark = headerTheme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 select-none ${
          isHero
            ? "bg-transparent border-transparent py-5 md:py-6 text-white"
            : isWhite
            ? "backdrop-blur-md bg-white/70 text-[#111111] border-b border-neutral-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)] py-4 md:py-5"
            : "backdrop-blur-md bg-black/40 text-white border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4 md:py-5"
        }`}
      >

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="w-full flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
            >
              <div className="relative h-14 w-44 sm:h-16 sm:w-56 md:h-20 md:w-72 flex items-center transition-all duration-300">
                <Image
                  src="/images/armialogo.svg"
                  alt="Armia Systems"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <div className="flex items-center">
              <HeroSwitcher isWhiteHeader={isWhite} />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label="Open navigation menu"
                className={`group relative inline-flex items-center h-[38px] md:h-[42px] font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent border ${
                  isWhite
                    ? "border-neutral-300 hover:border-brand-accent shadow-[0_0_15px_rgba(255,90,0,0)] hover:shadow-[0_0_20px_rgba(255,90,0,0.15)]"
                    : "border-white/20 hover:border-brand-accent shadow-[0_0_15px_rgba(255,90,0,0)] hover:shadow-[0_0_20px_rgba(255,90,0,0.18)]"
                }`}
              >
                {/* Button Body with Animated Tech Lines */}
                <span
                  className={`relative overflow-hidden px-4 md:px-6 font-medium h-full flex items-center select-none transition-colors duration-300 ${
                    isWhite ? "bg-white text-neutral-900 group-hover:text-black" : "bg-[#111111] text-white"
                  }`}
                >
                  {/* 1. Subtle Circuit Grid Lines on Hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:8px_8px]"
                  />

                  {/* 1b. Slowly Drifting Architectural Tech Blocks */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  >
                    <span className="absolute top-[20%] left-[-20%] w-2.5 h-2 rounded-[1px] bg-white/10 border border-white/20 group-hover:translate-x-[180px] transition-transform duration-[4500ms] ease-linear" />
                    <span className="absolute top-[55%] left-[-25%] w-3.5 h-1.5 rounded-[1px] bg-[#FF5A00]/25 border border-[#FF5A00]/40 group-hover:translate-x-[190px] transition-transform duration-[3800ms] ease-linear delay-100" />
                    <span className="absolute top-[35%] left-[-15%] w-2 h-2 rounded-[1px] bg-white/15 border border-white/25 group-hover:translate-x-[180px] transition-transform duration-[5200ms] ease-linear delay-200" />
                  </span>

                  {/* 2. Cyber Horizontal Scanning Ray Beam */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 -left-[100%] w-[80%] bg-gradient-to-r from-transparent via-[#FF5A00]/25 to-transparent pointer-events-none -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-1000 ease-out"
                  />

                  {/* 3. Horizontal Micro Circuit Trace Lines */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
                  />

                  {/* Text Content */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:tracking-[0.18em]">
                    MENU
                  </span>
                </span>

                {/* Orange Indicator Block */}
                <div className="relative overflow-hidden flex items-center justify-center h-full w-[38px] md:w-[42px] bg-brand-accent transition-all duration-300 group-hover:bg-[#ff4500]">
                  <span
                    className="text-white text-xs md:text-sm font-semibold transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    ›
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: EASE_CUSTOM }}
            className="fixed inset-0 z-50 flex flex-col bg-surface-deep pt-28 pb-12 px-8 text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <span className="font-mono text-xs tracking-widest text-white/60 uppercase">
                NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest text-white uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
              >
                <span>CLOSE</span>
                <X className="h-4 w-4 text-brand-accent" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 max-w-xl">
              {NAV_ITEMS.map((label, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-sans text-3xl md:text-4xl font-normal tracking-tight text-white hover:text-brand-accent transition-colors focus:outline-none focus-visible:text-brand-accent"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
