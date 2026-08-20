"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EASE_CUSTOM } from "@/lib/motion";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"hero" | "white" | "dark">("hero");

  useEffect(() => {
    // 1. Mark sections with explicit header themes
    const updateSectionTheme = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const heroThreshold = window.innerHeight * 0.7;

      if (scrollY < heroThreshold) {
        setHeaderTheme("hero");
        return;
      }

      // Check sections from document
      const sections = Array.from(document.querySelectorAll("section, footer"));
      const headerLineY = 50; // top position to sample

      // Find which section covers the header top line
      let matchedTheme: "white" | "dark" | null = null;
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        // Check if header line intersects this section
        if (rect.top <= headerLineY && rect.bottom > headerLineY) {
          const explicitTheme = sec.getAttribute("data-theme");
          const classList = sec.className || "";

          if (explicitTheme === "dark") {
            matchedTheme = "dark";
            break;
          }
          if (explicitTheme === "white") {
            matchedTheme = "white";
            break;
          }

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

          const bg = window.getComputedStyle(sec).backgroundColor;
          const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            matchedTheme = luminance > 140 ? "white" : "dark";
            break;
          }
        }
      }

      setHeaderTheme(matchedTheme || "white");
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
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 select-none ${
          isHero
            ? "bg-transparent py-6 md:py-8 text-white"
            : isWhite
            ? "bg-white py-4 md:py-5 text-[#111111]"
            : "bg-[#101010] py-4 md:py-5 text-white"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
          >
            <div className="relative h-9 w-24 md:h-11 md:w-48 flex items-center transition-all duration-300">
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
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className={`group flex items-center h-[36px] md:h-[40px] font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                isWhite
                  ? "bg-[#111111] text-white"
                  : "bg-[#1a1a1a] text-white"
              }`}
            >
              <span className="px-4 md:px-6 font-medium">MENU</span>
              <div className="flex items-center justify-center h-full w-[36px] md:w-[40px] bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
                <span className="text-white text-xs md:text-sm font-semibold" aria-hidden>
                  ›
                </span>
              </div>
            </button>
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
