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
  const [timeString, setTimeString] = useState("10:30 AM");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 w-full bg-transparent py-6 md:py-8 text-white select-none">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
          >
            <div className="relative h-10 w-28 md:h-12 md:w-52 flex items-center">
              <Image
                src="/images/armialogo.svg"
                alt="Armia Systems"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] tracking-wider uppercase text-white/90">
            <span className="font-semibold text-white">Kochi,</span>
            <span className="text-white/70">India</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-wider uppercase text-white/90">
            <span className="font-semibold text-white">{timeString}</span>
            <span className="text-white/60">LOCAL TIME</span>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className="group flex items-center h-[38px] md:h-[42px] bg-[#111111] text-white font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="px-5 md:px-7 font-medium">MENU</span>
              <div className="flex items-center justify-center h-full w-[38px] md:w-[42px] bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
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
