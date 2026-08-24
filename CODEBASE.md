# Armia Systems Website Codebase

This document contains the complete codebase files for Claude.

## File: package.json

`json
{
  "name": "armiawebsite",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^13.1.0",
    "lucide-react": "^1.31.0",
    "next": "16.3.0",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

`

---

## File: tsconfig.json

`json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

`

---

## File: next.config.ts

`tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

`

---

## File: src/app/globals.css

`css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --surface-dark: #101010;
  --surface-deep: #090909;

  --foreground: #111111;
  --foreground-muted: #6f6f6f;
  --foreground-on-dark: #f5f5f5;
  --foreground-dark-muted: #969696;

  --accent: #ff5a00;
  --accent-hover: #ff4500;

  --border-light: rgba(0, 0, 0, 0.10);
  --border-dark: rgba(255, 255, 255, 0.10);
}

@theme inline {
  --color-background: var(--background);
  --color-surface-dark: var(--surface-dark);
  --color-surface-deep: var(--surface-deep);

  --color-foreground: var(--foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-foreground-on-dark: var(--foreground-on-dark);
  --color-foreground-dark-muted: var(--foreground-dark-muted);

  --color-brand-accent: var(--accent);
  --color-brand-accent-hover: var(--accent-hover);

  --color-border-light: var(--border-light);
  --color-border-dark: var(--border-dark);

  --font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}

html {
  background-color: var(--surface-deep);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-snap-type: y mandatory;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
}

@media (pointer: fine) {
  *, *::before, *::after, html, body, a, button, input, select, textarea {
    cursor: none !important;
  }
}

::selection {
  background-color: #ff5a00;
  color: #ffffff;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #090909;
}

::-webkit-scrollbar-thumb {
  background: #262626;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff5a00;
}

:focus-visible {
  outline: 2px solid #ff5a00;
  outline-offset: 3px;
}

/* Scroll Snap Architecture */
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Shared Section Content Inset */
.content-inset {
  padding-left: clamp(34px, 3vw, 58px);
  padding-right: clamp(40px, 5vw, 90px);
}
`

---

## File: src/app/layout.tsx

`tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorFollower } from "@/components/effects/CursorFollower";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollToTopOnReload } from "@/components/utils/ScrollToTopOnReload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armia Systems | Software Engineering & Digital Product Development",
  description:
    "Armia Systems helps businesses design, engineer and scale high-performance digital products through software engineering, AI, cloud and product expertise.",
  keywords: [
    "Software Engineering",
    "Digital Product Development",
    "Enterprise Software",
    "AI Engineering",
    "Cloud DevOps",
    "Armia Systems",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-surface-deep font-sans text-foreground selection:bg-brand-accent selection:text-white"
      >
        <ScrollToTopOnReload />
        <PageLoader />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}


`

---

## File: src/app/page.tsx

`tsx
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { EngineeringIntro } from "@/components/sections/EngineeringIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioServicesSection } from "@/components/sections/PortfolioServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-surface-deep overflow-x-hidden">
      {/* Top Header Overlay */}
      <Header />

      {/* 1. Hero Section (includes pinned Partner Ticker at bottom) */}
      <HeroSection />

      {/* 2. Section 02 — 24+ Years Engineering Credibility */}
      <EngineeringIntro />

      {/* 3. Section 03 — AI-Powered Engineering Solutions */}
      <ServicesSection />

      {/* 4. Section 04 — Delivery Framework Process */}
      <ProcessSection />

      {/* 5. Section 05 — Portfolio Services Progression */}
      <PortfolioServicesSection />

      {/* 6. Section 06 — Trusted by Engineering Leaders */}
      <TestimonialsSection />

      {/* 7. Section 07 — Awards & Industry Recognition */}
      <AwardsSection />

      {/* 8. Section 08 — Frequently Asked Questions */}
      <FAQSection />

      {/* 9. Section 09 — Insights & Engineering Blog */}
      <BlogSection />

      {/* 10. Section 10 — Global Offices & Footer */}
      <FooterSection />
    </main>
  );
}

`

---

## File: src/types/index.ts

`tsx
export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ProofItem {
  avatars: string[];
  label: string;
  sublabel?: string;
}

`

---

## File: src/lib/motion.ts

`tsx
// src/lib/motion.ts
// Shared easing + reusable Framer Motion variants.
// Import EASE_CUSTOM / variants here instead of redefining transitions
// inline in every section — keeps motion consistent and easy to retune.

// Corrected to match the easing curve already used in FAQItem.tsx and
// BlogCard.tsx ([0.22, 1, 0.36, 1]) — that's your project's real custom
// ease, not a guess. (An earlier pass used [0.16, 0.8, 0.24, 1] before
// those files were available; this replaces it everywhere.)
export const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

/** Simple fade + rise. Good default for headings / paragraphs. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Fade + rise, smaller travel distance — for tight list items (FAQ rows, links). */
export const fadeUpSmall = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

/** Soft scale-in — good for cards (testimonials, blog cards). */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_CUSTOM },
  },
};

/** Horizontal slide from the left — for left-column copy blocks. */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Horizontal slide from the right — for right-column/media blocks. */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Clip-path wipe reveal — distinctive "unveil" effect, good for imagery. */
export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_CUSTOM },
  },
};

/**
 * Parent wrapper — stagger children's entrance.
 * Usage: <motion.div variants={staggerContainer()} initial="hidden" whileInView="show">
 */
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Standard viewport config so "once" / trigger margin stays consistent site-wide. */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px -10% 0px" };

export const maskedLine = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};

export const revealFromBottom = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  show: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.85,
      ease: EASE_CUSTOM,
    },
  },
};

export const revealFromLeft = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};


`

---

## File: src/lib/utils.ts

`tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

`

---

## File: src/data/navigation.ts

`tsx
import { NavItem } from "@/types";

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "COMPANY", href: "#company" },
  { label: "SERVICES", href: "#services" },
  { label: "WORK", href: "#work" },
  { label: "INSIGHTS", href: "#insights" },
];

export const HERO_STRIP_ITEMS: NavItem[] = [
  { label: "SERVICES", href: "#services" },
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "AI & ML", href: "#ai" },
  { label: "CLOUD", href: "#cloud" },
  { label: "DEVOPS", href: "#devops" },
  { label: "PRODUCT", href: "#product" },
  { label: "CONTACT", href: "#contact" },
];

`

---

## File: src/data/faqs.ts

`tsx
export interface FAQItemData {
  id: string;
  number: string;
  question: string;
  answer: string[];
}

export const FAQS_DATA: FAQItemData[] = [
  {
    id: "faq-01",
    number: "01",
    question: "WHAT INDUSTRIES DO YOU SPECIALIZE IN?",
    answer: [
      "Armia Systems works with technology, fintech, healthcare, and enterprise teams. We focus on clarity, speed, and systems that scale.",
      "We prioritize clean architecture, fast delivery, and handoffs that make ongoing maintenance straightforward.",
    ],
  },
  {
    id: "faq-02",
    number: "02",
    question: "HOW DO YOU HANDLE PROJECT SCOPE CHANGES?",
    answer: [
      "Our agile delivery framework incorporates iterative milestone check-ins, allowing scope adjustments without stalling momentum.",
      "Any required pivot is documented with clear timeline and resource impacts before execution.",
    ],
  },
  {
    id: "faq-03",
    number: "03",
    question: "WHAT IS YOUR TYPICAL PROJECT TIMELINE?",
    answer: [
      "Timeline depends on complexity: rapid modernizations typically complete in 4 to 8 weeks, while full enterprise platforms range from 3 to 6 months.",
      "We provide granular roadmap commitments during our initial technical blueprinting phase.",
    ],
  },
  {
    id: "faq-04",
    number: "04",
    question: "DO YOU OFFER POST-LAUNCH SUPPORT?",
    answer: [
      "Yes. We offer 24/7 proactive infrastructure monitoring, security patch management, and dedicated SLA-backed engineering support packages.",
      "Our team seamlessly transitions into long-term system optimization and feature development.",
    ],
  },
  {
    id: "faq-05",
    number: "05",
    question: "HOW DO YOU ENSURE CODE QUALITY?",
    answer: [
      "We enforce automated CI/CD testing pipelines, peer code reviews, static security analysis, and strict adherence to architectural design patterns.",
      "Every release undergoes rigorous compliance and performance benchmarks prior to production deployment.",
    ],
  },
  {
    id: "faq-06",
    number: "06",
    question: "HOW DO WE START A PROJECT?",
    answer: [
      "Starting is seamless: book an initial architectural discovery call with our senior technical leads.",
      "We audit your current requirements and deliver a comprehensive proposal with transparent milestones within 48 hours.",
    ],
  },
];

`

---

## File: src/data/blog.ts

`tsx
export interface BlogArticle {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image: string;
  aspectRatioClass: string;
  href: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-01",
    date: "JUN 24, 2026",
    category: "ENGINEERING",
    title: "Building HIPAA-Compliant Systems at Scale",
    description: "How we built a compliant healthcare platform handling 50K+ concurrent users.",
    image: "/images/blog1.png",
    aspectRatioClass: "aspect-square",
    href: "#article-01",
  },
  {
    id: "blog-02",
    date: "MAY 30, 2025",
    category: "DESIGN",
    title: "How We Reduced Cloud Costs by 40% for Enterprise Clients",
    description: "Strategic cloud optimization that delivered measurable ROI for enterprise systems.",
    image: "/images/blog2.png",
    aspectRatioClass: "aspect-[0.72/1]",
    href: "#article-02",
  },
  {
    id: "blog-03",
    date: "APR 7, 2026",
    category: "DEVELOPMENT",
    title: "The Future of AI-Powered Development Workflows",
    description: "A practical look at responsive layouts, clean components & the CMS structure.",
    image: "/images/blog3.png",
    aspectRatioClass: "aspect-square",
    href: "#article-03",
  },
  {
    id: "blog-04",
    date: "MAR 23, 2026",
    category: "BRANDING",
    title: "Creating A Digital Presence That Feels Clear",
    description: "How strong messaging, consistent visuals, and a focused website experience.",
    image: "/images/blog4.png",
    aspectRatioClass: "aspect-[0.75/1]",
    href: "#article-04",
  },
];


`

---

## File: src/hooks/useRotator.ts

`tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface UseRotatorReturn<T> {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  activeItem: T;
  next: () => void;
  prev: () => void;
  total: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  autoAdvance: boolean;
  intervalMs: number;
  timerKey: number;
}

export interface UseRotatorOptions {
  initialIndex?: number;
  autoAdvance?: boolean;
  intervalMs?: number; // In milliseconds, default: 4500
}

export function useRotator<T>(
  items: T[],
  optionsOrInitialIndex: number | UseRotatorOptions = 0
): UseRotatorReturn<T> {
  const initialIndex =
    typeof optionsOrInitialIndex === "number"
      ? optionsOrInitialIndex
      : optionsOrInitialIndex.initialIndex ?? 0;

  const autoAdvanceOption =
    typeof optionsOrInitialIndex === "object"
      ? optionsOrInitialIndex.autoAdvance ?? false
      : false;

  const intervalMs =
    typeof optionsOrInitialIndex === "object"
      ? optionsOrInitialIndex.intervalMs ?? 4500
      : 4500;

  const reducedMotion = useReducedMotion();
  const autoAdvance = autoAdvanceOption && !reducedMotion;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
        setTimerKey((k) => k + 1); // Fresh countdown on manual selection
      }
    },
    [items.length]
  );

  const next = useCallback(
    () => {
      setActiveIndex((prev) => (prev + 1) % items.length);
      setTimerKey((k) => k + 1);
    },
    [items.length]
  );

  const prev = useCallback(
    () => {
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      setTimerKey((k) => k + 1);
    },
    [items.length]
  );

  // Auto-advance timer: runs when enabled, pauses on interaction, restarts fresh interval on resume/selection
  useEffect(() => {
    if (!autoAdvance || isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
      setTimerKey((k) => k + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoAdvance, isPaused, items.length, intervalMs, timerKey]);

  return {
    activeIndex,
    setActiveIndex: goTo,
    activeItem: items[activeIndex] ?? items[0],
    next,
    prev,
    total: items.length,
    isPaused,
    setIsPaused: (paused: boolean) => {
      setIsPaused(paused);
      if (!paused) {
        setTimerKey((k) => k + 1); // Restart from fresh intervalMs on resume
      }
    },
    autoAdvance,
    intervalMs,
    timerKey,
  };
}

`

---

## File: src/hooks/useMousePosition.ts

`tsx
"use client";

import { useEffect, useState } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return pos;
}

`

---

## File: src/hooks/useReducedMotion.ts

`tsx
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

`

---

## File: src/hooks/useAppReady.ts

`tsx
"use client";

import { useSyncExternalStore } from "react";

let isReady = false;
const listeners = new Set<() => void>();

export function dispatchAppReady() {
  if (!isReady) {
    isReady = true;
    listeners.forEach((listener) => listener());
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return isReady;
}

function getServerSnapshot() {
  return false;
}

export function useAppReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

`

---

## File: src/components/layout/Header.tsx

`tsx
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
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 select-none ${
          isHero
            ? "bg-transparent py-6 md:py-8 text-white"
            : isWhite
            ? "bg-white py-4 md:py-5 text-[#111111]"
            : "bg-black py-4 md:py-5 text-white"
        }`}
      >
        {/* Subtle Noise Texture Overlay - Only in Hero mode */}
        {isHero && (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]"
          />
        )}

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
          >
            <div className="relative h-11 w-32 md:h-14 md:w-60 flex items-center transition-all duration-300">
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

`

---

## File: src/components/layout/Container.tsx

`tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  clean?: boolean;
}

export function Container({ children, className, clean = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto max-w-[1600px]",
        clean ? "" : "px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}

`

---

## File: src/components/ui/SectionEyebrow.tsx

`tsx
// src/components/ui/SectionEyebrow.tsx
"use client";

import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

interface SectionEyebrowProps {
  /** Two-digit section index, e.g. "06" */
  number: string;
  /** Section label, e.g. "TESTIMONIALS" */
  label: string;
  /** Use on dark-background sections (footer) */
  dark?: boolean;
  className?: string;
}

/**
 * Every section was rolling its own eyebrow markup with slightly different
 * font sizes, tracking, and number/label formatting:
 *   - Testimonials: "06" and "TESTIMONIALS" as two separate spans, text-[9px]/[10px]
 *   - FAQ:          "07 FAQ" as ONE combined string, text-[8px]/[9px]
 *   - Blog:         "08 BLOG" as ONE combined string, text-[8px]/[9px]
 *   - Footer:       no number at all, despite page.tsx labeling it "Section 09"
 *
 * This component is the single source of truth going forward — same size,
 * same tracking, same dot, same two-span structure, on every section.
 */
export function SectionEyebrow({
  number,
  label,
  dark = false,
  className = "",
}: SectionEyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_CUSTOM }}
      className={`flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.16em] uppercase mb-8 ${
        dark ? "text-white/60" : "text-[#6f6f6f]"
      } ${className}`}
    >
      <span className="h-[5px] w-[5px] bg-brand-accent inline-block" />
      <span>{number}</span>
      <span>{label}</span>
    </motion.div>
  );
}

`

---

## File: src/components/ui/SectionLabel.tsx

`tsx
import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export function SectionLabel({
  children,
  className,
  dotColor = "bg-brand-accent",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-foreground-dark-muted select-none",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-none", dotColor)} />
      <span>{children}</span>
    </div>
  );
}

`

---

## File: src/components/ui/GridLines.tsx

`tsx
"use client";

import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

interface GridLinesProps {
  light?: boolean;
  animate?: boolean;
  animationMode?: "all" | "center" | "none";
  className?: string;
}

const POSITIONS = [
  { left: "10.8%", hideOnMobile: false },
  { left: "30.3%", hideOnMobile: true },
  { left: "49.8%", hideOnMobile: false },
  { left: "69.3%", hideOnMobile: true },
  { left: "88.8%", hideOnMobile: false },
];

export function GridLines({
  light = false,
  animate = false,
  animationMode = "none",
  className = ""
}: GridLinesProps) {
  const color = light ? "bg-black/[0.05]" : "bg-white/[0.035]";

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <div className="relative h-full w-full max-w-[1920px] mx-auto">
        {POSITIONS.map((pos, i) => {
          let shouldAnimate = false;
          if (animate) {
            if (animationMode === "all") shouldAnimate = true;
            else if (animationMode === "center" && i > 0 && i < 4) shouldAnimate = true;
          }

          return (
            <motion.div
              key={pos.left}
              initial={shouldAnimate ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
              whileInView={shouldAnimate ? { scaleY: 1, opacity: 1 } : undefined}
              viewport={shouldAnimate ? { once: true } : undefined}
              transition={shouldAnimate ? { duration: 0.8, delay: i * 0.05, ease: EASE_CUSTOM } : undefined}
              style={{ left: pos.left, transformOrigin: "top" }}
              className={`absolute top-0 bottom-0 w-px ${color} ${pos.hideOnMobile ? "hidden md:block" : ""
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}

`

---

## File: src/components/ui/RotatorTabStrip.tsx

`tsx
"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

export interface RotatorTabItem {
  id: string | number;
  label?: string;
}

interface RotatorTabStripProps {
  items: RotatorTabItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  scrollYProgress?: MotionValue<number>;
  layoutIdPrefix?: string;
  className?: string;
  dark?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  timerKey?: number;
  isPaused?: boolean;
}

export function RotatorTabStrip({
  items,
  activeIndex,
  onSelect,
  scrollYProgress,
  layoutIdPrefix = "rotator-tab",
  className = "",
  dark = false,
  autoAdvance = false,
  intervalMs = 4500,
  timerKey = 0,
  isPaused = false,
}: RotatorTabStripProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Square 48×48 Stroke Buttons */}
      <div className="flex items-center gap-2 md:gap-3" role="tablist">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const label =
            item.label ||
            (typeof item.id === "number"
              ? `/${String(item.id + 1).padStart(2, "0")}`
              : String(item.id).startsWith("/")
              ? String(item.id)
              : `/${String(item.id).padStart(2, "0")}`);

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(idx)}
              className={`relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center font-mono text-[11px] md:text-xs tracking-wider border transition-colors duration-200 cursor-pointer select-none rounded-none overflow-hidden ${
                dark
                  ? isActive
                    ? "border-[#FF5C00] text-[#FF5C00] font-bold"
                    : "border-white/16 text-white/45 hover:border-[#FF5C00]/60 hover:text-white"
                  : isActive
                  ? "border-[#FF5C00] text-[#111111] font-bold"
                  : "border-black/16 text-black/45 hover:border-[#FF5C00]/60 hover:text-[#111111]"
              }`}
            >
              {/* Active-tab timed progress fill at bottom of button */}
              {isActive && autoAdvance && (
                <motion.div
                  key={`${activeIndex}-${timerKey}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused ? undefined : 1 }}
                  transition={{
                    duration: intervalMs / 1000,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-[#FF5C00] z-20 pointer-events-none"
                />
              )}

              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* 1px Scroll / Overall Tab Indicator Line */}
      <div
        className={`relative w-full max-w-[240px] md:max-w-[280px] h-[1px] ${
          dark ? "bg-white/15" : "bg-black/15"
        } overflow-hidden`}
      >
        {scrollYProgress ? (
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full w-full bg-[#FF5C00]"
          />
        ) : (
          <motion.div
            animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.35, ease: EASE_CUSTOM }}
            className="h-full bg-[#FF5C00]"
          />
        )}
      </div>
    </div>
  );
}

`

---

## File: src/components/ui/Button.tsx

`tsx
"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "minimal";
  showIcon?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  showIcon = true,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-between font-mono text-xs tracking-wider uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-brand-accent text-white hover:bg-white hover:text-foreground px-5 py-3.5 border border-brand-accent",
    secondary:
      "bg-foreground text-foreground-on-dark hover:bg-brand-accent hover:text-white px-5 py-3.5 border border-foreground",
    outline:
      "bg-transparent text-white border border-border-dark hover:border-brand-accent hover:text-brand-accent px-5 py-3.5",
    minimal:
      "bg-transparent text-white hover:text-brand-accent px-0 py-2 border-b border-border-dark hover:border-brand-accent",
  };

  return (
    <MagneticButton strength={0.2}>
      <button className={cn(baseStyles, variants[variant], className)} {...props}>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
        </span>
        {showIcon && (
          <ArrowUpRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-accent" />
        )}
      </button>
    </MagneticButton>
  );
}

`

---

## File: src/components/ui/MagneticButton.tsx

`tsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

`

---

## File: src/components/ui/PageLoader.tsx

`tsx
// src/components/ui/PageLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { dispatchAppReady } from "@/hooks/useAppReady";

const TOTAL_DURATION_MS = 2000;

// Exact SVG Vector Path for the Armia Logo 'A'
const ARMIA_A_PATH =
  "M359.998 0.709961C360.924 0.498184 362.469 0.453404 363.957 0.545898C364.694 0.591722 365.402 0.670192 365.994 0.773438C366.601 0.879248 367.039 1.0033 367.27 1.12109L367.273 1.12305C367.499 1.23579 367.816 1.47994 368.153 1.80957C368.482 2.13025 368.801 2.50365 369.041 2.84863C369.423 3.43703 369.602 3.78183 369.696 4.21973C369.796 4.68211 369.809 5.27608 369.775 6.37793V6.38281C369.727 8.63607 369.467 10.0912 368.377 11.8887C367.26 13.7305 365.269 15.9356 361.683 19.6377C355.17 26.3132 338.402 44.75 312.661 73.5615C307.166 79.6774 302.305 85.1251 301.788 85.6758V85.6768L300.84 86.6895L299.832 87.7666L301.287 87.5244L307.756 86.4463L307.755 86.4453C321.528 84.1928 340.104 82.0066 354.857 80.9297H354.863C356.401 80.7986 359.702 80.5044 362.218 80.2764L362.225 80.2754C364.719 80.0166 372.346 79.6579 379.212 79.4277L379.211 79.4268C411.723 78.4808 441.039 81.3236 462.308 87.4463L462.31 87.4473C465.424 88.3323 467.077 88.8229 467.954 89.1709C468.359 89.3314 468.543 89.4431 468.626 89.5127C468.28 89.5507 467.626 89.5235 466.374 89.4414H466.375C464.763 89.3095 460.312 89.0819 456.458 88.918H456.459C452.607 88.7231 446.715 88.4615 443.39 88.2979H443.391C427.072 87.4735 394.534 87.5705 374.71 88.499L372.832 88.5918C337.214 90.4551 312.042 94.5737 297.021 101.081C290.781 103.788 287.132 106.377 282.091 111.649L282.09 111.65C269.242 125.165 260.409 137.4 253.312 151.537L252.63 152.911C250.153 157.98 248.736 161.194 248.214 163.415C247.951 164.535 247.904 165.446 248.089 166.238C248.277 167.041 248.691 167.673 249.26 168.25L249.271 168.261C249.663 168.637 250.022 168.918 250.467 169.092C250.909 169.264 251.391 169.313 252.001 169.313C253.548 169.313 255.01 168.977 257.26 167.932C259.494 166.893 262.539 165.14 267.257 162.283L267.258 162.282C274.785 157.71 290.833 148.18 305.058 139.791C312.17 135.597 318.825 131.688 323.73 128.829C326.183 127.399 328.197 126.232 329.612 125.423C329.68 125.384 329.746 125.347 329.811 125.311C329.039 125.959 328.024 126.808 326.785 127.839C323.724 130.385 319.305 134.04 313.855 138.532C302.956 147.517 287.934 159.85 271.419 173.36C246.163 194.043 231.069 206.367 222.058 213.623C217.551 217.251 214.569 219.609 212.599 221.11C211.613 221.861 210.886 222.394 210.349 222.764C209.804 223.138 209.479 223.328 209.293 223.409H209.292C208.335 223.831 207.742 224.056 207.055 224.184C206.358 224.313 205.542 224.347 204.136 224.347C202.68 224.347 201.935 224.329 201.455 224.234C201.231 224.19 201.08 224.131 200.949 224.056C200.881 224.016 200.813 223.969 200.738 223.91L200.488 223.694C199.772 223.016 199.305 221.833 199.187 220.156C199.069 218.486 199.303 216.394 199.915 213.993C200.284 212.552 200.532 211.719 201.495 209.964C202.474 208.18 204.178 205.469 207.466 200.283C222.479 176.612 236.57 154.336 246.895 137.967C252.057 129.782 256.278 123.073 259.203 118.404C260.665 116.07 261.804 114.245 262.574 113C262.959 112.378 263.253 111.899 263.449 111.574C263.547 111.412 263.622 111.285 263.673 111.197C263.698 111.154 263.72 111.115 263.736 111.084C263.744 111.07 263.755 111.047 263.766 111.021C263.77 111.011 263.781 110.983 263.791 110.945C263.796 110.924 263.806 110.866 263.808 110.829C263.804 110.761 263.741 110.57 263.66 110.465L263.646 110.45L263.63 110.437C263.544 110.364 263.456 110.338 263.416 110.329C263.37 110.319 263.331 110.316 263.309 110.315C263.264 110.314 263.226 110.319 263.206 110.322C263.162 110.328 263.117 110.338 263.08 110.348C263.002 110.367 262.9 110.397 262.78 110.435C262.539 110.51 262.195 110.627 261.761 110.779C260.891 111.084 259.642 111.539 258.093 112.111C254.994 113.257 250.686 114.88 245.791 116.747C237.224 120.014 226.853 124.025 218 127.517L214.309 128.978C174.358 144.788 145.305 157.774 132.881 165.281C126.175 169.329 119.02 175.688 93.2686 200.652L87.8652 205.897C71.6551 221.633 52.4893 240.897 36.8281 257.028C28.9976 265.094 22.0414 272.377 16.7686 278.046C11.5108 283.698 7.89336 287.781 6.77246 289.42C6.36237 290.019 5.23308 291.439 4.28418 292.585C3.33924 293.725 1.98924 295.435 1.31836 296.44C1.05563 296.816 0.795779 297.158 0.574219 297.438C0.55793 297.18 0.543099 296.875 0.532227 296.528C0.49436 295.321 0.491005 293.655 0.517578 291.833C0.570774 288.186 0.742167 283.949 0.985352 281.554C3.95197 252.952 11.552 223.987 23.2305 196.487C26.3584 189.121 33.8634 173.983 37.6768 167.267C39.5535 164.02 41.6587 160.495 43.3838 157.693C44.2465 156.292 45.013 155.074 45.6074 154.163C45.9048 153.707 46.1574 153.331 46.3564 153.048C46.4604 152.9 46.5447 152.786 46.6094 152.702L46.7461 152.537C46.8503 152.433 47.0244 152.211 47.2275 151.94C47.4411 151.656 47.7132 151.284 48.0244 150.85C48.6474 149.981 49.4334 148.859 50.2354 147.697L50.2373 147.694C53.8223 142.414 58.8378 135.685 63.1045 130.276C65.2379 127.572 67.1805 125.203 68.6602 123.512C69.401 122.665 70.0197 121.996 70.4854 121.541C70.6214 121.408 70.7414 121.297 70.8447 121.207C70.7235 121.519 70.5598 121.933 70.3604 122.424C69.9122 123.528 69.2921 125.02 68.6064 126.635V126.636C59.4059 148.42 52.0001 167.972 47.1016 183.105C44.6526 190.671 42.8274 197.14 41.7188 202.235C41.1645 204.783 40.788 206.995 40.6025 208.833C40.441 210.434 40.421 211.778 40.5684 212.822L40.6416 213.251C40.8671 214.36 41.3122 215.355 41.876 216.086C42.427 216.8 43.161 217.343 43.9756 217.343C45.3837 217.343 47.0299 216.454 49.541 214.351C52.0792 212.224 55.608 208.76 60.8008 203.403C79.7266 183.866 94.7137 169.213 109.724 155.539L112.727 152.816C172.157 99.2946 239.683 54.0069 305.535 23.3838C309.685 21.4555 314.818 19.0361 316.978 17.9893L316.979 17.9883C321.501 15.7759 331.214 11.6822 340.335 8.02246C344.892 6.19382 349.296 4.47565 352.822 3.1582C356.367 1.83387 358.983 0.930543 359.993 0.710938L359.998 0.709961ZM314.316 38.8418C313.95 38.6826 313.452 38.6947 312.905 38.7754C311.772 38.9427 309.989 39.4814 307.443 40.3945C279.457 50.3454 250.437 65.8222 220.74 86.7217C204.847 97.8732 188.006 111.216 174.464 123.318C173.354 124.306 172.527 125.041 171.938 125.573C171.357 126.098 170.984 126.446 170.802 126.649C170.756 126.7 170.706 126.76 170.667 126.82C170.648 126.85 170.619 126.899 170.598 126.96C170.58 127.01 170.538 127.149 170.596 127.313C170.668 127.519 170.837 127.613 170.958 127.644C171.059 127.669 171.145 127.659 171.183 127.653C171.264 127.641 171.34 127.614 171.389 127.595C171.587 127.518 171.93 127.338 172.308 127.146C174.638 125.98 187.296 120.628 192.852 118.438C212.756 110.672 234.002 104.211 257.243 98.8906H257.244C261.653 97.8772 267.536 96.5371 270.315 95.8838L270.314 95.8828C271.711 95.5709 273.115 95.2106 274.254 94.8857C275.374 94.5664 276.288 94.2683 276.665 94.0801L276.669 94.0791C277.235 93.7909 277.962 93.1503 278.834 92.2285C279.719 91.2923 280.795 90.0194 282.062 88.4131C284.595 85.1991 287.91 80.6225 292.013 74.6729L292.014 74.6738C295.529 69.5887 301.192 61.1139 305.991 53.8311C308.391 50.1894 310.576 46.8437 312.17 44.3672C312.967 43.1293 313.617 42.1065 314.072 41.3721C314.3 41.0054 314.481 40.7074 314.607 40.4893C314.671 40.3807 314.723 40.287 314.762 40.2129C314.781 40.1763 314.799 40.1397 314.814 40.1055C314.82 40.0937 314.829 40.0726 314.839 40.0459L314.865 39.9521L314.867 39.9434C314.903 39.7466 314.903 39.5208 314.805 39.3057C314.702 39.0804 314.521 38.9305 314.316 38.8418Z";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      dispatchAppReady();
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progressFraction = Math.min(1, elapsed / (TOTAL_DURATION_MS - 150));
      // Fast, sleek cubic fill curve
      const curvedProgress = 1 - Math.pow(1 - progressFraction, 2);
      const currentPct = Math.min(100, Math.floor(curvedProgress * 100));

      setProgress(currentPct);

      if (elapsed < TOTAL_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          dispatchAppReady();
        }, 80);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="simple-logo-a-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.4, ease: EASE_CUSTOM },
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden select-none bg-[#090909]"
        >
          {/* Ambient Warm Backglow */}
          <div className="absolute w-[360px] h-[240px] rounded-full bg-[#FF5A00]/[0.15] blur-[80px] pointer-events-none" />

          {/* Compact Centered Armia Logo 'A' Container */}
          <div className="relative w-[210px] sm:w-[260px] md:w-[300px] aspect-[470/299] flex items-center justify-center">
            <svg
              viewBox="0 0 470 299"
              className="w-full h-full overflow-hidden select-none"
            >
              <defs>
                {/* SVG ClipPath strictly masking the fill to the 'A' shape */}
                <clipPath id="armia-a-fill-clip">
                  <path d={ARMIA_A_PATH} />
                </clipPath>

                {/* Smooth Gradient Fill */}
                <linearGradient id="armia-a-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#D93D00" />
                  <stop offset="60%" stopColor="#FF5A00" />
                  <stop offset="100%" stopColor="#FFA055" />
                </linearGradient>
              </defs>

              {/* 1. Underlying Outlined Stroke Track */}
              <path
                d={ARMIA_A_PATH}
                fill="none"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="2.2"
              />

              {/* 2. Pure Rising Color Fill (No line artifacts) */}
              <g clipPath="url(#armia-a-fill-clip)">
                <rect
                  x="0"
                  y={299 - (progress / 100) * 299}
                  width="470"
                  height="299"
                  fill="url(#armia-a-gradient)"
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

`

---

## File: src/components/effects/CursorFollower.tsx

`tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TrailLetter {
  id: number;
  x: number;
  y: number;
  char: string;
  createdAt: number;
}

const TRAIL_CHARS = "ARMIA SYSTEMS";

export function CursorFollower() {
  const reducedMotion = useReducedMotion();
  const [letters, setLetters] = useState<TrailLetter[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const letterIndexRef = useRef(0);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const idCounterRef = useRef(0);

  useEffect(() => {
    // Only enable on fine pointer desktop devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      setCursorPos({ x: currentX, y: currentY });

      const dx = currentX - lastPosRef.current.x;
      const dy = currentY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Spawn a new letter every ~16px of mouse travel
      if (dist >= 16) {
        lastPosRef.current = { x: currentX, y: currentY };
        const char = TRAIL_CHARS[letterIndexRef.current % TRAIL_CHARS.length];
        letterIndexRef.current += 1;
        idCounterRef.current += 1;

        const newLetter: TrailLetter = {
          id: idCounterRef.current,
          x: currentX,
          y: currentY,
          char: char === " " ? "•" : char,
          createdAt: Date.now(),
        };

        setLetters((prev) => [...prev.slice(-24), newLetter]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursorHover === "true"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Clean up expired letters smoothly
    const interval = setInterval(() => {
      const now = Date.now();
      setLetters((prev) => prev.filter((item) => now - item.createdAt < 750));
    }, 45);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(interval);
    };
  }, []);

  if (reducedMotion || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none hidden lg:block"
    >
      {/* ── Clean Geometric Arrow Cursor (Armia Brand Orange) ── */}
      <div
        style={{
          position: "fixed",
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-2px, -2px) scale(${isHovered ? 1.25 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
        className="pointer-events-none"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Crisp, solid geometric polygon arrow silhouette */}
          <polygon
            points="14,14 88,50 52,58 44,92"
            fill="#FF5A00"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Letter Trail Behind Cursor ── */}
      {letters.map((item) => {
        const age = Date.now() - item.createdAt;
        const progress = Math.min(Math.max(age / 750, 0), 1);
        const opacity = (1 - progress) * 0.85;
        const scale = 1 - progress * 0.35;
        const translateY = -progress * 12;

        return (
          <span
            key={item.id}
            style={{
              position: "fixed",
              left: `${item.x}px`,
              top: `${item.y}px`,
              opacity,
              transform: `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`,
              transition: "opacity 0.08s linear, transform 0.08s linear",
            }}
            className="font-mono text-[10px] md:text-[11px] font-bold tracking-widest text-[#FF5A00] mix-blend-difference pointer-events-none"
          >
            {item.char}
          </span>
        );
      })}
    </div>
  );
}

`

---

## File: src/components/effects/TypewriterText.tsx

`tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export type TypewriterTextProps = {
  text: string;
  speed?: number; // base speed per character in ms
  delay?: number; // initial delay before typing starts
  cursor?: boolean;
  once?: boolean;
  className?: string;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speed = 35,
  delay = 150,
  cursor = true,
  once = true,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once,
    margin: "-25% 0px", // Trigger when ~25-30% into viewport
  });
  
  const shouldReduceMotion = useReducedMotion();
  const [typedChars, setTypedChars] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedChars(text.length);
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    if (!isInView) {
      if (!once) {
        setTypedChars(0);
        setHasStarted(false);
        setIsDone(false);
        setIsTyping(false);
        setCursorVisible(false);
      }
      return;
    }

    if (hasStarted) return;
    setHasStarted(true);

    let timeoutId: NodeJS.Timeout;
    
    // Initial delay
    timeoutId = setTimeout(() => {
      setIsTyping(true);
      setCursorVisible(true);
      let currentIndex = 0;
      let lastTime = performance.now();
      
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const baseSpeed = isMobile ? Math.max(24, speed - 10) : speed;

      const typeNextChar = (time: number) => {
        if (currentIndex >= text.length) {
          setIsTyping(false);
          setIsDone(true);
          if (onComplete) onComplete();
          return;
        }

        const char = text[currentIndex];
        // Add a micro pause for punctuation
        const charSpeed = (char === "." || char === "?" || char === "!") ? baseSpeed + 80 : baseSpeed;

        if (time - lastTime >= charSpeed) {
          currentIndex++;
          setTypedChars(currentIndex);
          lastTime = time;
        }
        
        timeoutId = setTimeout(() => requestAnimationFrame(typeNextChar), 0);
      };

      requestAnimationFrame(typeNextChar);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isInView, text, speed, delay, once, hasStarted, shouldReduceMotion, onComplete]);

  // Cursor blinking logic
  useEffect(() => {
    if (!cursor) return;

    let blinkInterval: NodeJS.Timeout;
    let blinkTimeout: NodeJS.Timeout;

    if (isTyping) {
      // Blink while typing
      blinkInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 600); // 1 → 0 → 1 over ~600ms
    } else if (isDone) {
      // Blink a few times after done, then disappear
      let blinks = 0;
      setCursorVisible(true);
      blinkInterval = setInterval(() => {
        blinks++;
        setCursorVisible((prev) => !prev);
        if (blinks >= 5) { // 2-3 full blinks (on/off pairs)
          clearInterval(blinkInterval);
          setCursorVisible(false);
        }
      }, 600);
      
      // Failsafe hide
      blinkTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        setCursorVisible(false);
      }, 3000);
    }

    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, [isTyping, isDone, cursor]);

  const visibleText = text.slice(0, typedChars);

  if (shouldReduceMotion) {
    return (
      <div className={className} aria-label={text.replace(/\n/g, " ")}>
        {text}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} aria-label={text.replace(/\n/g, " ")}>
      {/* Invisible complete text to reserve layout dimensions and prevent shift */}
      <span aria-hidden="true" className="invisible whitespace-pre-line pointer-events-none select-none">
        {text}
      </span>

      {/* Absolutely positioned typing layer */}
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre-line">
        {visibleText}
        {cursor && (
          <span 
            style={{ 
              opacity: cursorVisible ? 1 : 0, 
              color: "#ff5a00", 
              display: "inline-block", 
              marginLeft: "0.08em",
              transition: "opacity 0ms" // Ensure strict steps(1) feel
            }}
          >
            _
          </span>
        )}
      </span>
    </div>
  );
}

`

---

## File: src/components/sections/HeroSection.tsx

`tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { useAppReady } from "@/hooks/useAppReady";

// Realistic Typewriter Effect with natural cadence and blinking cursor
function TypewriterEffect({
  text,
  delay = 0.5,
  baseSpeed = 24,
  showCursor = true,
  cursorClassName = "bg-[#FF5A00]",
  className = "",
  onComplete,
}: {
  text: string;
  delay?: number;
  baseSpeed?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const isAppReady = useAppReady();
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isAppReady) return;

    if (shouldReduceMotion) {
      setDisplayText(text);
      setIsTypingComplete(true);
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayText(text.slice(0, currentIndex));

          // Natural human cadence variation
          const nextChar = text[currentIndex - 1];
          let interval = baseSpeed + (Math.random() * 12 - 6);
          if (nextChar === "," || nextChar === ".") interval += 90;
          if (nextChar === " ") interval += 15;

          timeoutId = setTimeout(typeNextChar, interval);
        } else {
          setIsTypingComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    };

    timeoutId = setTimeout(startTyping, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [text, delay, baseSpeed, isAppReady, shouldReduceMotion, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block ml-1 align-baseline transition-opacity duration-150 ${cursorClassName} ${
            isTypingComplete ? "animate-pulse" : "opacity-100"
          }`}
          style={{
            width: "0.12em",
            height: "0.9em",
            transform: "translateY(0.08em)",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

import { useState } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x } = useMousePosition();
  const reducedMotion = useReducedMotion();
  const isAppReady = useAppReady();

  const bgScale = 1.02;
  const bgY = "0%";

  const mouseXOffset = reducedMotion
    ? 0
    : Math.max(
      -14,
      Math.min(
        14,
        (x / (typeof window !== "undefined" ? window.innerWidth : 1440) - 0.5) * 18
      )
    );

  const titleLetters = ["A", "R", "M", "I", "A"];

  const services = [
    { num: "/01", label: "CUSTOM SOFTWARE" },
    { num: "/02", label: "AI & MACHINE LEARNING" },
    { num: "/03", label: "CLOUD & DEVOPS" },
    { num: "/04", label: "PRODUCT & UX" },
  ];

  return (
    <section
      ref={containerRef}
      data-theme="hero"
      className="sticky top-0 z-0 w-full h-[100svh] overflow-hidden bg-surface-deep text-white select-none snap-section flex flex-col justify-between"
      aria-label="Hero"
    >
      {/* Ambient Video & Overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          scale: reducedMotion ? 1 : bgScale,
          y: reducedMotion ? 0 : bgY,
          x: mouseXOffset,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/orange.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 opacity-100 pointer-events-none">
          <Image
            src="/images/Overlay.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      <GridLines />

      {/* ── Main Hero Content Area (Aligned to 10.8% - 88.8% Grid) ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-0 pt-24 md:pt-28 flex-1 flex flex-col justify-center">
        <div className="w-full flex flex-col md:flex-row items-start">
          
          {/* ── Left Column: Starts at 10.8% Grid Line, Ends at 69.3% (Width: 58.5%) ── */}
          <div className="w-full md:w-[58.5%] md:ml-[10.8%] px-6 md:px-0 md:pr-10 flex flex-col">
            
            {/* Top Brand Name & Subtitle Header */}
            <div className="w-full">
              {/* Giant Spaced ARMIA Heading */}
              <div className="leading-none select-none w-full max-w-[660px] my-1 overflow-hidden">
                <h1 className="flex justify-between items-baseline w-full font-sans font-light text-[clamp(4.8rem,9.2vw,11.5rem)] tracking-[0.25em] leading-[0.82] text-white">
                  {titleLetters.map((char, index) => (
                    <span key={index} className="inline-block overflow-hidden py-1">
                      <motion.span
                        initial={{ y: "130%", opacity: 0, rotateX: 45, filter: "blur(8px)" }}
                        animate={
                          isAppReady
                            ? { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }
                            : { y: "130%", opacity: 0, rotateX: 45, filter: "blur(8px)" }
                        }
                        transition={{
                          duration: 1.1,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.15 + index * 0.06,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtitle: DIGITAL ENGINEERING with Smooth Typewriter Reveal */}
              <div className="font-mono text-[13px] md:text-[16px] tracking-[0.55em] text-[#FF5A00] font-bold uppercase mb-4 mt-1 flex items-center">
                <TypewriterEffect
                  text="DIGITAL ENGINEERING"
                  delay={0.4}
                  baseSpeed={30}
                  showCursor={true}
                  cursorClassName="bg-[#FF5A00] h-4 w-1"
                />
              </div>

              {/* Accent Orange Divider Line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isAppReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.55, ease: EASE_CUSTOM }}
                className="h-[1.5px] w-28 bg-[#FF5A00] origin-left mb-6 shadow-[0_0_12px_rgba(255,90,0,0.8)]"
              />
            </div>

            {/* Bottom Value Content */}
            <div className="w-full">
              {/* Primary Value Statement Headline with Natural Typewriter Reveal */}
              <h2 className="font-sans font-normal text-[clamp(1.6rem,2.6vw,2.8rem)] text-white leading-[1.18] tracking-tight max-w-[680px] mb-3 min-h-[70px] md:min-h-[90px]">
                <TypewriterEffect
                  text="We design and engineer custom software, AI products and cloud platforms for startups and enterprises."
                  delay={0.65}
                  baseSpeed={18}
                  showCursor={true}
                  cursorClassName="bg-white/80 h-7 md:h-8 w-1"
                />
              </h2>

              {/* Supporting Lifecycle Summary with Staggered Entrance */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.8, delay: 1.25, ease: EASE_CUSTOM }}
                className="font-sans text-[14px] md:text-[16px] text-white/75 leading-relaxed max-w-[580px] mb-8 font-light"
              >
                From strategy and UX to development, deployment and scale.
              </motion.p>

              {/* Interactive CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.8, delay: 1.4, ease: EASE_CUSTOM }}
                className="flex items-center gap-6"
              >
                <a
                  href="#contact"
                  className="group border border-[#FF5A00] bg-black/40 hover:bg-[#FF5A00] text-white font-mono text-[11px] md:text-[12.5px] tracking-[0.18em] uppercase px-6 py-3.5 flex items-center gap-3 transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,90,0,0.15)] hover:shadow-[0_0_25px_rgba(255,90,0,0.45)]"
                >
                  <span className="font-semibold">START A PROJECT</span>
                  <span className="text-[#FF5A00] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 font-bold">
                    ›
                  </span>
                </a>

                <a
                  href="#portfolio"
                  className="font-mono text-[11px] md:text-[12.5px] tracking-[0.18em] uppercase text-white hover:text-[#FF5A00] underline underline-offset-4 transition-colors font-medium"
                >
                  EXPLORE OUR WORK
                </a>
              </motion.div>
            </div>

          </div>

          {/* ── Right Column: Starts at 69.3% Grid Line, Ends at 88.8% (Width: 19.5%) ── */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 hidden md:flex flex-col pt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isAppReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE_CUSTOM }}
              className="w-full flex flex-col divide-y divide-white/10 border-t border-white/10"
            >
              {services.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isAppReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + idx * 0.08,
                    ease: EASE_CUSTOM,
                  }}
                  className="py-3.5 flex items-center gap-4 group cursor-pointer"
                >
                  <span className="font-mono text-[11px] md:text-[12px] text-[#FF5A00] font-bold">
                    {item.num}
                  </span>
                  <span className="font-mono text-[11px] md:text-[12.5px] tracking-[0.16em] uppercase text-white/90 group-hover:text-[#FF5A00] transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <div className="h-1.5 w-1.5 bg-[#FF5A00] mt-4" />
          </div>

        </div>
      </div>

      {/* Pinned Bottom Partner Ticker Bar */}
      <div className="relative z-20 w-full mt-auto">
        <PartnerTicker />
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/PartnerTicker.tsx

`tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const PARTNERS = [
  "ACTIVE NETWORK",
  "VERA BRADLEY",
  "ALICE",
  "AVANT",
  "FERRARA CANDY COMPANY",
  "8TO18",
  "AROUNDCAMPUS GROUP",
  "JUMPFORWARD",
  "COLLEGIATEPARENT"
];

export function PartnerTicker() {
  // Duplicate for seamless infinite loop
  const marqueeList = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className="relative w-full bg-white border-y border-black/[0.08] overflow-hidden select-none z-20">
      <div className="flex w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45,
          }}
          className="flex shrink-0 items-center divide-x divide-black/[0.08]"
        >
          {marqueeList.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-10 md:px-16 py-5 md:py-6"
            >
              <span className="font-mono text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-[#111111] uppercase whitespace-nowrap hover:text-brand-accent transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

`

---

## File: src/components/sections/EngineeringIntro.tsx

`tsx
"use client";

import React, { useRef } from "react";
import { EngineeringStatement } from "@/components/engineering/EngineeringStatement";
import { GridLines } from "@/components/ui/GridLines";

/**
 * Section 02: EngineeringIntro
 *
 * Viewport: 80vh clean single screen with snap alignment (.snap-section).
 * Zero unwanted trailing scroll space or unpinned blank scroll gap.
 */
export function EngineeringIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      data-theme="white"
      className="relative z-10 w-full h-[10svh] min-h-[85svh] bg-white text-foreground select-none snap-section flex flex-col justify-center overflow-hidden"
      aria-label="Mission Statement"
    >
      <EngineeringStatement />
    </section>
  );
}
`

---

## File: src/components/engineering/EngineeringStatement.tsx

`tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, VIEWPORT_ONCE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function EngineeringStatement() {
  const reducedMotion = useReducedMotion();

  // Motion variants for the spiral: Starts in the middle, rotates, scales down, and moves right
  const spiralVariants = {
    hidden: {
      left: "50%",
      x: "-50%",
      scale: 1.18,
      rotate: 0,
      opacity: 0.95,
    },
    visible: {
      left: "86%",
      x: "0%",
      scale: 0.62,
      rotate: 360,
      opacity: 0.9,
      transition: {
        duration: 2.8, // Decreased speed (longer duration) for a smoother, graceful motion
        ease: EASE_CUSTOM,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="relative flex flex-col justify-between h-full py-8 md:py-12 select-none overflow-hidden">

      {/* ── Background Spiral Ribbon Element (Starts Middle -> Rotates, Shrinks & Shifts Right) ── */}
      <motion.div
        aria-hidden="true"
        variants={reducedMotion ? undefined : spiralVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="pointer-events-none absolute top-[50%] -translate-y-1/2 z-0 w-[52vw] max-w-[600px] max-h-[600px] aspect-square"
        style={reducedMotion ? { left: "86%", x: "0%", scale: 0.65 } : undefined}
      >
        <div className="relative w-full h-full opacity-90 filter drop-shadow-[0_20px_50px_rgba(255,90,0,0.15)]">
          <Image
            src="/images/spiral-ribbon.png"
            alt=""
            fill
            sizes="(max-width: 768px) 70vw, 600px"
            className="object-contain object-center"
            priority
          />
        </div>
      </motion.div>

      {/* ── Upper Header / Eyebrow Row matching ServicesSection Grid Columns ── */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="02" label="MISSION" className="!mb-0" />
          </div>

          {/* Right Supporting Year: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] md:ml-[39.0%] px-6 md:px-0 pt-1 flex justify-start">
            <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#111111]">
              ©2004–2026
            </span>
          </div>
        </div>

        {/* ── Main Content Block (30.3% to 88.8% width: 58.5%) matching ServicesSection ── */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="max-w-[760px] xl:max-w-[820px] flex flex-col justify-center space-y-4 md:space-y-5">
            {/* Main Title Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_CUSTOM }}
              className="font-sans text-[clamp(2.3rem,3.4vw,4.1rem)] font-bold tracking-[-0.04em] leading-[1.04] text-[#111111]"
            >
              Trusted technology partner since 2004.
            </motion.h2>

            {/* Subheading / Bold Promise */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE_CUSTOM }}
              className="font-sans text-[clamp(1.05rem,1.35vw,1.45rem)] font-semibold tracking-[-0.02em] leading-[1.3] text-[#111111]"
            >
              For more than two decades, we’ve helped startups, growing businesses, enterprises and technology partners turn complex ideas into dependable digital products.
            </motion.p>

            {/* Body Detail Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_CUSTOM }}
              className="space-y-3 font-sans text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.6] text-[#444444] max-w-[680px]"
            >
              <p>
                Our strength lies in combining deep engineering expertise, continuous innovation and practical business understanding to deliver software that is built for real-world scale.
              </p>
              <p>
                From product strategy and custom software development to enterprise platforms, AI-enabled solutions and cloud infrastructure, we provide end-to-end engineering support across the full technology lifecycle.
              </p>
            </motion.div>

            {/* Orange Accent Underline Bar & Footer Note */}
            <div className="pt-2">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE_CUSTOM }}
                style={{ transformOrigin: "left" }}
                className="w-44 md:w-56 h-[3px] bg-[#FF5A00] mb-3"
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, delay: 0.85, ease: EASE_CUSTOM }}
                className="font-sans text-[12px] md:text-[13px] font-medium text-[#222222]"
              >
                20+ years of engineering experience. Built around skill, innovation and long-term partnerships.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
`

---

## File: src/components/sections/ServicesSection.tsx

`tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

// ─────────────────────────────────────────────────────────────────────────────
// Services Data
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  num: string;
  category: string;
  titleLines: string[];
  description: string;
  capabilities: string[];
  image: string;
  video: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    num: "/01",
    category: "ENGINEERING // ARCHITECTURE",
    titleLines: ["CUSTOM SOFTWARE", "DEVELOPMENT"],
    description:
      "Full-cycle custom web and enterprise application engineering built for reliability, scalability and complex business requirements.",
    capabilities: [
      "Full-stack web & mobile development",
      "Microservices & API architecture",
      "Legacy system modernization",
      "Cloud-native application design",
    ],
    image: "/images/Service1.png",
    video: "/images/service1.mp4",
  },
  {
    id: "02",
    num: "/02",
    category: "AI & ML LABS",
    titleLines: ["AI & MACHINE", "LEARNING"],
    description:
      "Enterprise AI integration, custom LLM solutions, predictive systems and intelligent automation designed for secure production environments.",
    capabilities: [
      "AI product development",
      "LLM & RAG applications",
      "Intelligent automation",
      "Predictive analytics",
    ],
    image: "/images/service_ai_intelligence.png",
    video: "/images/service2.mp4",
  },
  {
    id: "03",
    num: "/03",
    category: "CLOUD // DEVOPS",
    titleLines: ["CLOUD & DEVOPS", "INFRASTRUCTURE"],
    description:
      "Cloud infrastructure and DevOps systems engineered for performance, resilience, deployment speed and operational visibility.",
    capabilities: [
      "AWS & cloud architecture",
      "CI/CD pipelines",
      "Infrastructure automation",
      "Monitoring & optimization",
    ],
    image: "/images/service_cloud_devops.png",
    video: "/images/service3.mp4",
  },
  {
    id: "04",
    num: "/04",
    category: "UI // UX DESIGN",
    titleLines: ["PRODUCT & UX", "DESIGN SYSTEMS"],
    description:
      "Research-led digital product design focused on usability, clarity, business goals and scalable design systems.",
    capabilities: [
      "Product strategy",
      "UX research",
      "Interface design",
      "Design systems",
    ],
    image: "/images/service_brand_identity.png",
    video: "/images/service4.mp4",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_CUSTOM },
  },
};

const numberVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_CUSTOM },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_CUSTOM, delay: 0.05 },
  },
};

const capabilityItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ServicesSection Component
// ─────────────────────────────────────────────────────────────────────────────

export function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const currentService = hoveredIdx !== null ? servicesData[hoveredIdx] : servicesData[activeIdx];

  return (
    <section
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] h-[100svh] min-h-[100svh] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section border-t border-white/[0.08] select-none"
    >
      {/* Background Architectural GridLines & Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* ── Upper Section Header Row (Matching 10.8% / 30.3% / 69.3% Grid) ── */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-12 md:mb-16">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-4 md:mb-0">
            <SectionEyebrow number="03" label="SERVICES" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.1rem,3.0vw,3.8rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#6b6b6b]">ENGINEERING</span>
              <span className="block text-white font-medium">WHAT MATTERS.</span>
            </h2>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <p className="font-mono text-[12px] md:text-[14px] leading-[1.45] text-[#9a9a96] uppercase tracking-wider max-w-[280px]">
              END-TO-END DIGITAL ENGINEERING — FROM PRODUCT STRATEGY TO PRODUCTION.
            </p>
          </div>
        </div>

        {/* ── Main Showcase Row (10.8% to 88.8% -> width: 78.0%) ── */}
        <div className="w-full md:w-[78.0%] md:ml-[10.8%] px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Interactive Service Detail & Capabilities (~40% -> 5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Service Number & Category */}
                    <motion.div variants={numberVariants} className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm md:text-base font-semibold text-[#FF5A00] tracking-widest">
                        {currentService.num}
                      </span>
                      <span className="font-mono text-[11px] md:text-[13px] tracking-widest uppercase text-[#888888]">
                        {currentService.category}
                      </span>
                    </motion.div>

                    {/* Large Typography Heading with Mask Reveal */}
                    <div className="overflow-hidden pb-1 mb-3">
                      <motion.h3
                        variants={maskVariants}
                        className="font-sans text-[clamp(1.8rem,2.8vw,3.6rem)] font-bold tracking-[-0.04em] leading-[0.96] text-white uppercase"
                      >
                        {currentService.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </motion.h3>
                    </div>

                    {/* Description Paragraph */}
                    <motion.p
                      variants={descVariants}
                      className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#b0b0a8] max-w-[460px] mb-4 md:mb-5"
                    >
                      {currentService.description}
                    </motion.p>

                    {/* Editorial Capabilities Checklist */}
                    <ul className="space-y-2 mb-6">
                      {currentService.capabilities.map((cap, i) => (
                        <motion.li
                          key={i}
                          variants={capabilityItemVariants}
                          className="font-mono text-[13px] md:text-[14px] uppercase tracking-wider text-[#d0d0cc] flex items-center"
                        >
                          <span className="text-[#FF5A00] font-mono mr-3 text-sm font-bold select-none">
                            +
                          </span>
                          <span>{cap}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="font-mono text-[11px] md:text-[13px] text-[#FF5A00] hover:text-white tracking-widest uppercase transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>TALK TO A SOLUTIONS ARCHITECT</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: 4-Tile Video Mosaic (~60% -> 7 cols) */}
            <div className="md:col-span-7 grid grid-cols-12 gap-3 md:gap-3.5 h-full min-h-[340px] md:min-h-[400px]">
              {servicesData.map((item, idx) => {
                const isCurrent = (hoveredIdx !== null ? hoveredIdx : activeIdx) === idx;

                // Asymmetric editorial sizing matching reference:
                // Tile 01: 7 cols (~58%), Tile 02: 5 cols (~42%)
                // Tile 03: 5 cols (~42%), Tile 04: 7 cols (~58%)
                const colSpanClass =
                  idx === 0
                    ? "col-span-12 md:col-span-7 h-[170px] md:h-[195px]"
                    : idx === 1
                    ? "col-span-12 md:col-span-5 h-[170px] md:h-[195px]"
                    : idx === 2
                    ? "col-span-12 md:col-span-5 h-[170px] md:h-[195px]"
                    : "col-span-12 md:col-span-7 h-[170px] md:h-[195px]";

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`${colSpanClass} relative overflow-hidden cursor-pointer bg-black border transition-all duration-300 ${
                      isCurrent
                        ? "border-[#FF5A00] shadow-[0_0_20px_rgba(255,90,0,0.18)]"
                        : "border-white/[0.08] hover:border-white/30"
                    }`}
                  >
                    {/* Ambient Looping Video - No zoom on hover */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={item.image}
                      className="w-full h-full object-cover object-center pointer-events-none"
                    >
                      <source src={item.video} type="video/mp4" />
                      <Image
                        src={item.image}
                        alt={item.titleLines.join(" ")}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                    </video>

                    {/* Subtle Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        isCurrent
                          ? "bg-black/10"
                          : "bg-black/35 hover:bg-black/15"
                      }`}
                    />

                    {/* Corner Tag */}
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className={`font-mono text-[10px] md:text-[11px] px-1.5 py-0.5 font-bold transition-colors ${
                        isCurrent ? "bg-[#FF5A00] text-white" : "bg-black/75 text-white/75"
                      }`}>
                        {item.num}
                      </span>
                    </div>

                    {/* Title on Hover / Active */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                      <span className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-white/90 truncate drop-shadow-md">
                        {item.titleLines.join(" ")}
                      </span>
                      <span className={`text-[11px] transition-all duration-300 ${
                        isCurrent ? "text-[#FF5A00] font-bold" : "text-white/40 group-hover:text-white"
                      }`}>
                        ↗
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
`

---

## File: src/components/sections/ProcessSection.tsx

`tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useRotator } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

// ─────────────────────────────────────────────────────────────────────────────
// Phases Data
// ─────────────────────────────────────────────────────────────────────────────

interface PhaseItem {
  id: string;
  num: string;
  category: string;
  titleLines: string[];
  description: string;
  deliverables: string[];
  duration: string;
}

const phases: PhaseItem[] = [
  {
    id: "01",
    num: "/01",
    category: "PHASE 01 // STRATEGY",
    titleLines: ["STAKEHOLDER AUDIT", "& REQUIREMENTS"],
    description:
      "We align key stakeholders, audit existing systems, and establish technical architecture so delivery is risk-aware before coding starts.",
    deliverables: [
      "Technical architecture audit & scoping",
      "Security, SLA & compliance matrix",
      "Sprint roadmap & milestone plan",
    ],
    duration: "WEEKS 01 - 02",
  },
  {
    id: "02",
    num: "/02",
    category: "PHASE 02 // ARCHITECTURE",
    titleLines: ["RESEARCH-DRIVEN", "DESIGN SYSTEMS"],
    description:
      "We define user journeys and high-fidelity prototypes, validating UX clarity and creating atomic design systems for seamless engineering handoff.",
    deliverables: [
      "Interactive Figma tokens & prototypes",
      "Usability testing & feedback synthesis",
      "Developer handoff documentation",
    ],
    duration: "WEEKS 03 - 04",
  },
  {
    id: "03",
    num: "/03",
    category: "PHASE 03 // ASSURANCE",
    titleLines: ["SECURITY AUDITS", "& PERFORMANCE"],
    description:
      "Automated regression test suites, penetration testing, and load stress audits guarantee 99.99% resilience before going live.",
    deliverables: [
      "Automated regression test suites",
      "SOC2 / HIPAA compliance audits",
      "Sub-100ms load & stress profiling",
    ],
    duration: "WEEKS 05 - 06",
  },
  {
    id: "04",
    num: "/04",
    category: "PHASE 04 // EXECUTION",
    titleLines: ["AGILE SPRINTS", "& CI/CD BUILDS"],
    description:
      "Two-week agile sprints with continuous integration, automated code review gates, and zero-downtime database deployment pipelines.",
    deliverables: [
      "Microservices & cloud backend APIs",
      "Automated CI/CD build pipelines",
      "Transparent Jira sprint telemetry",
    ],
    duration: "WEEKS 07 - 10",
  },
  {
    id: "05",
    num: "/05",
    category: "PHASE 05 // SCALE",
    titleLines: ["ZERO-DOWNTIME", "24/7 MONITORING"],
    description:
      "Canary rollout with full telemetry dashboards, automated disaster recovery runbooks, and 24/7 SLA engineering support.",
    deliverables: [
      "Canary & blue-green deployments",
      "Real-time telemetry & latency alerts",
      "24/7 SLA enterprise support",
    ],
    duration: "CONTINUOUS",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_CUSTOM },
  },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ProcessSection Component
// ─────────────────────────────────────────────────────────────────────────────

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeIndex,
    setActiveIndex,
    activeItem: phase,
    setIsPaused,
    autoAdvance,
    intervalMs,
    timerKey,
    isPaused,
  } = useRotator(phases, { autoAdvance: true, intervalMs: 5000 });

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] h-[100svh] min-h-[100svh] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section border-t border-white/[0.08] select-none"
    >
      {/* Background GridLines & Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        
        {/* ── Upper Section Header Row (10.8% / 30.3% / 69.3% Grid) ── */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-4 md:mb-0">
            <SectionEyebrow number="04" label="PROCESS" dark className="!mb-0" />
          </div>

          {/* Heading Block */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.1rem,3.0vw,3.8rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#6b6b6b]">A PROVEN</span>
              <span className="block text-white font-medium">DELIVERY FRAMEWORK.</span>
            </h2>
          </div>

          {/* Right Supporting Copy */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <p className="font-mono text-[12px] md:text-[14px] leading-[1.45] text-[#9a9a96] uppercase tracking-wider max-w-[280px]">
              EVERY ENGAGEMENT FOLLOWS THE SAME RIGOROUS FIVE-PHASE PROCESS - REFINED OVER 20+ YEARS.
            </p>
          </div>
        </div>

        {/* ── Main Structured Showcase Panel (10.8% to 88.8% -> width: 78.0%) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full md:w-[78.0%] md:ml-[10.8%] px-6 md:px-0"
        >
          {/* Outer Bordered Framework Card */}
          <div className="border border-white/[0.1] bg-[#0c0c0c] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            
            {/* ── Left Column: Active Phase Deep Dive (7 cols) ── */}
            <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[380px] md:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Category & Timeline Badge */}
                    <motion.div variants={fadeVariants} className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#FF5A00] inline-block" />
                        <span className="font-mono text-[12px] md:text-[13.5px] tracking-widest uppercase text-[#FF5A00] font-semibold">
                          {phase.category}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] md:text-[13px] tracking-wider text-white/60 bg-white/[0.05] px-2.5 py-0.5 border border-white/[0.08]">
                        {phase.duration}
                      </span>
                    </motion.div>

                    {/* Title with Mask Reveal */}
                    <div className="overflow-hidden pb-1 mb-3">
                      <motion.h3
                        variants={maskVariants}
                        className="font-sans text-[clamp(1.6rem,2.4vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.05] text-white uppercase"
                      >
                        {phase.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </motion.h3>
                    </div>

                    {/* Description */}
                    <motion.p
                      variants={fadeVariants}
                      className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#a4a4a0] max-w-lg mb-6"
                    >
                      {phase.description}
                    </motion.p>

                    {/* Deliverables Checklist */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="font-mono text-[10px] md:text-[11.5px] tracking-widest text-[#777777] uppercase mb-2.5">
                        PHASE DELIVERABLES
                      </div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((del, i) => (
                          <motion.li
                            key={i}
                            variants={fadeVariants}
                            className="font-mono text-[13px] md:text-[14px] uppercase tracking-wider text-[#d0d0cc] flex items-center gap-2.5"
                          >
                            <span className="text-[#FF5A00] font-bold text-sm">✓</span>
                            <span>{del}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Numbered Controls Strip at bottom of phase */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <RotatorTabStrip
                      items={phases.map((p) => ({ id: p.id, label: p.id }))}
                      activeIndex={activeIndex}
                      onSelect={(idx) => {
                        setIsPaused(true);
                        setActiveIndex(idx);
                      }}
                      dark
                      autoAdvance={autoAdvance}
                      intervalMs={intervalMs}
                      timerKey={timerKey}
                      isPaused={isPaused}
                      layoutIdPrefix="process-steps-tab"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right Column: Engagement Action & Overview Box (5 cols) ── */}
            <div className="md:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-[#101010] relative overflow-hidden">
              {/* Subtle Ribbon Backdrop Graphic */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -right-8 w-[200px] aspect-square opacity-15 filter contrast-125 select-none"
              >
                <Image
                  src="/images/spiral-ribbon.png"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                <div className="font-mono text-[10px] md:text-[11.5px] tracking-widest text-[#FF5A00] uppercase mb-2">
                  // ENGAGEMENT MODEL
                </div>

                <h4 className="font-sans font-bold text-[clamp(1.3rem,1.8vw,1.9rem)] leading-[1.1] tracking-tight uppercase text-white mb-3">
                  HOW WE WORK
                  <br />
                  WITH YOUR TEAM.
                </h4>

                <p className="font-sans text-[15px] md:text-[16px] text-[#8e8e88] leading-[1.6] mb-5">
                  Direct Slack access to technical leads, weekly demo releases, and zero contract lock-in.
                </p>

                {/* Structured Highlights */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">01</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Dedicated Pod</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">Dedicated engineers &amp; sprint leads</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">02</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Sprint Cadence</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">2-week sprints with transparent Jira boards</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#FF5A00] font-bold">03</span>
                    <div>
                      <div className="font-mono text-[13px] md:text-[14px] text-white font-medium uppercase">Production Guarantee</div>
                      <div className="text-[12px] md:text-[13px] text-[#888888]">Automated testing &amp; 99.99% SLA uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08]">
                <a
                  href="#contact"
                  className="group bg-[#FF5A00] hover:bg-[#ff4500] text-white font-mono text-[11px] md:text-[13px] tracking-widest uppercase px-5 py-3.5 flex items-center justify-between transition-colors w-full"
                >
                  <span className="font-semibold">SCHEDULE A TECHNICAL AUDIT</span>
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

`

---

## File: src/components/sections/PortfolioServicesSection.tsx

`tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useRotator } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Data (5 Case Studies)
// ─────────────────────────────────────────────────────────────────────────────

interface CaseStudyItem {
  id: string;
  num: string;
  category: string;
  title: string;
  image: string;
  caption: string;
  capabilities: string[];
}

const servicesData: CaseStudyItem[] = [
  {
    id: "01",
    num: "/01",
    category: "LOGISTICS & SAAS PLATFORM",
    title: "Flexshft",
    image: "/images/Flexshft.png",
    caption:
      "Enterprise shift-scheduling and dynamic on-demand workforce management platform built for scale.",
    capabilities: [
      "Real-time shift dispatching & automated matching",
      "Multi-tenant cloud architecture on AWS",
      "High-concurrency mobile app for workers & admins",
      "Automated payroll & compliance tracking engines",
      "Instant push notifications & live GPS check-ins",
    ],
  },
  {
    id: "02",
    num: "/02",
    category: "ENTERPRISE COLLABORATION",
    title: "Ucollabit",
    image: "/images/Ucollabit.png",
    caption:
      "Unified workspace and collaborative project intelligence system for distributed enterprise teams.",
    capabilities: [
      "Real-time document sync & interactive whiteboards",
      "Role-based access control & enterprise security",
      "Automated sprint planning & workflow triggers",
      "Custom integrations with Slack, Jira & GitHub",
      "Sub-100ms WebSocket messaging infrastructure",
    ],
  },
  {
    id: "03",
    num: "/03",
    category: "TELECOM & NETWORKING",
    title: "Askonnect",
    image: "/images/Askonnect.png",
    caption:
      "Intelligent B2B communication and omni-channel customer engagement platform with automated CRM routing.",
    capabilities: [
      "VoIP telephony & unified inbox architecture",
      "AI-driven lead qualification & conversation triage",
      "Predictive dialer and agent monitoring console",
      "Omni-channel API gateway (SMS, WhatsApp, Voice)",
      "Zero-downtime microservices with 99.99% SLA",
    ],
  },
  {
    id: "04",
    num: "/04",
    category: "HEALTHCARE PLATFORM",
    title: "BCMCH",
    image: "/images/BCMCH.png",
    caption:
      "Comprehensive hospital management system, telehealth portal, and electronic medical records ecosystem.",
    capabilities: [
      "HIPAA-compliant patient portal & EHR integration",
      "Automated OPD booking & doctor schedule management",
      "Secure lab report generation & telemetry sync",
      "In-hospital pharmacy & billing automation",
      "High-availability disaster recovery architecture",
    ],
  },
  {
    id: "05",
    num: "/05",
    category: "EDTECH & INTERACTIVE MEDIA",
    title: "Mazeflower",
    image: "/images/Mazeflower.png",
    caption:
      "Interactive learning and creative content publishing platform with adaptive gamification engines.",
    capabilities: [
      "Gamified learning paths & progress telemetry",
      "Cross-platform responsive canvas rendering",
      "AI-driven dynamic curriculum recommendations",
      "Secure cloud asset pipeline & instant streaming",
      "Scalable multi-user collaborative experiences",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Content entrance variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.05 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_CUSTOM },
  },
};

const imageVariants = {
  hidden: { scale: 1.04, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PortfolioServicesSection Component
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeIndex,
    setActiveIndex,
    activeItem: service,
    setIsPaused,
    autoAdvance,
    intervalMs,
    timerKey,
    isPaused,
  } = useRotator(servicesData, { autoAdvance: true, intervalMs: 4500 });

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-white text-[#111111] h-[100svh] min-h-[100svh] py-8 md:py-12 flex flex-col justify-center overflow-hidden snap-section select-none border-t border-black/[0.08]"
    >
      <GridLines light />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        
        {/* ── Upper Header Row matching 10.8% / 30.3% / 69.3% Grid ── */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-4 md:mb-0">
            <SectionEyebrow number="05" label="PORTFOLIO" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.1rem,3.0vw,3.8rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#111111]">CASE</span>
              <span className="block text-[#6b6b6b] font-medium">STUDIES.</span>
            </h2>
          </div>

          {/* Right Supporting Copy / Link: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <a
              href="#contact"
              className="font-mono text-[12px] md:text-[14px] text-[#ff5a00] tracking-widest uppercase hover:text-[#111111] transition-colors"
            >
              ALL WORK →
            </a>
          </div>
        </div>

        {/* ── Main Showcase Grid (10.8% to 88.8% -> width: 78.0%) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full md:w-[78.0%] md:ml-[10.8%] px-6 md:px-0"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-center">
            
            {/* ── Left Column: Large Hero Case Study Image Showcase (7 cols) ── */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="w-full flex flex-col"
                >
                  {/* Category Eyebrow & Number */}
                  <motion.div variants={fadeUpVariants} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-[2px] w-[18px] bg-[#ff5a00] inline-block" />
                      <span className="font-mono text-[12px] md:text-[13.5px] tracking-widest text-[#5a6270] uppercase font-semibold">
                        {service.category}
                      </span>
                    </div>
                    <span className="font-mono text-sm md:text-base font-semibold text-[#ff5a00]">
                      {service.num}
                    </span>
                  </motion.div>

                  {/* Large High-Impact Case Study Device / Product Image */}
                  <motion.div
                    variants={imageVariants}
                    className="relative overflow-hidden w-full aspect-[16/10] bg-neutral-100 border border-black/[0.08] shadow-md group"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 750px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      priority
                    />
                  </motion.div>

                  {/* Caption under large image */}
                  <motion.p
                    variants={fadeUpVariants}
                    className="font-sans text-[15px] md:text-[16px] text-[#606775] mt-3 leading-[1.6]"
                  >
                    {service.caption}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right Column: Project Title, Impact Capabilities & Navigation (5 cols) ── */}
            <div className="md:col-span-5 flex flex-col justify-between h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="w-full flex flex-col justify-between"
                >
                  <div>
                    {/* Project Title */}
                    <div className="overflow-hidden pb-2 mb-4 border-b border-black/[0.08]">
                      <motion.h3
                        variants={maskVariants}
                        className="font-sans text-[clamp(2.2rem,3.2vw,4.0rem)] leading-[1.0] tracking-[-0.04em] font-medium text-[#111111]"
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    {/* Capabilities List */}
                    <div className="mb-6 md:mb-8">
                      <div className="font-mono text-[10px] md:text-[11.5px] tracking-widest text-[#777777] uppercase mb-3">
                        ENGINEERING HIGHLIGHTS
                      </div>
                      <ul className="space-y-2.5">
                        {service.capabilities.map((capability, i) => (
                          <motion.li
                            key={i}
                            variants={fadeUpVariants}
                            className="font-sans text-[14px] md:text-[15.5px] leading-[1.55] text-[#444b58] flex items-start"
                          >
                            <span className="text-[#ff5a00] font-mono mr-3 text-sm font-bold select-none">
                              +
                            </span>
                            <span>{capability}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 01 / 02 / 03 / 04 / 05 Rotator Numbered Controls Strip */}
                  <div className="pt-2">
                    <RotatorTabStrip
                      items={servicesData.map((s) => ({ id: s.id, label: s.num }))}
                      activeIndex={activeIndex}
                      onSelect={(idx) => {
                        setIsPaused(true);
                        setActiveIndex(idx);
                      }}
                      autoAdvance={autoAdvance}
                      intervalMs={intervalMs}
                      timerKey={timerKey}
                      isPaused={isPaused}
                      layoutIdPrefix="portfolio-case-tab"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/TestimonialsSection.tsx

`tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

const testimonialsData = [
  {
    id: "01",
    name: "Mark Henderson",
    role: "DIRECTOR OF ENGINEERING, ACTIVE NETWORK",
    quote:
      "Armia Systems delivered our mission-critical enterprise registration and payment infrastructure with zero downtime. Their architectural depth and adherence to high scalability standards made them an indispensable engineering partner.",
    image: "/images/avatar_jakub.png",
    companyLogo: "ACTIVE NETWORK",
    companySymbol: "▲",
  },
  {
    id: "02",
    name: "Sarah Jenkins",
    role: "VP OF TECHNOLOGY, JUMPFORWARD",
    quote:
      "Armia transformed our collegiate athletics compliance platform. Their engineers built high-concurrency microservices and real-time data sync that scaled effortlessly to hundreds of universities nationwide.",
    image: "/images/avatar_anna.png",
    companyLogo: "JUMPFORWARD",
    companySymbol: "◆",
  },
  {
    id: "03",
    name: "David Rosenthal",
    role: "HEAD OF PRODUCT, 8TO18 MEDIA",
    quote:
      "Working with Armia accelerated our product roadmap by months. From mobile app engineering to cloud backend modernization, their engineering quality and accountability are consistently top-tier.",
    image: "/images/avatar_david.png",
    companyLogo: "8TO18",
    companySymbol: "■",
  },
  {
    id: "04",
    name: "Diane Miller",
    role: "FOUNDER & CEO, COLLEGIATEPARENT",
    quote:
      "Armia is our trusted technology partner for over 8 years. They have architected our content syndication engines and custom digital platforms with unmatched reliability and strategic foresight.",
    image: "/images/avatar_anna.png",
    companyLogo: "COLLEGIATEPARENT",
    companySymbol: "●",
  },
];

const getTestimonialDelay = (index: number) => {
  const delays = [0, 0.08, 0.17, 0.25];
  return delays[index] || 0;
};

const testimonialReveal = (index: number) => ({
  hidden: { opacity: 0, clipPath: "inset(0 0 10% 0)", y: 8 },
  show: {
    opacity: 1,
    clipPath: "inset(0)",
    y: 0,
    transition: { duration: 0.7, ease: EASE_CUSTOM, delay: getTestimonialDelay(index) }
  }
});

export function TestimonialsSection() {
  return (
    <section className="relative z-20 w-full bg-white text-[#111111] py-10 md:py-14 border-t border-black/[0.08] overflow-hidden select-none snap-section h-[100svh] min-h-[100svh] flex flex-col justify-center">
      <GridLines light />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching ServicesSection Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="06" label="TESTIMONIALS" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left uppercase text-[#111111]"
            >
              <span className="block text-[#111111]">TRUSTED BY</span>
              <span className="block text-[#6b6b6b] font-medium">ENGINEERING LEADERS.</span>
            </motion.h2>

            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#6b6b6b] mt-4 md:mt-5 uppercase tracking-wide max-w-[280px]">
              A FEW WORDS FROM <strong className="text-[#111111] font-bold">ENGINEERING LEADERS</strong> WE&apos;VE HELPED.
            </p>
          </div>

          {/* Right Supporting Copy / Trust Rating: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_anna.png" alt="Anna Marek" fill className="object-cover" />
                  </div>
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_david.png" alt="David Klein" fill className="object-cover" />
                  </div>
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_jakub.png" alt="Jakub Horák" fill className="object-cover" />
                  </div>
                </div>
                <div className="font-mono uppercase">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-xs text-[#111111]">4.92</span>
                    <span className="text-[#6b6b6b] text-[10px]">/5</span>
                  </div>
                  <div className="text-[8.5px] text-[#6b6b6b] tracking-wider">
                    <strong className="text-[#111111]">122+ FOUNDERS</strong>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="font-mono text-[10px] md:text-[11px] text-[#FF5C00] tracking-widest uppercase hover:text-[#111111] transition-colors"
              >
                START PROJECT →
              </a>
            </div>
          </div>
        </div>

        {/* 2x2 Testimonials Grid (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {testimonialsData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={testimonialReveal(index)}
                className="relative group bg-white border border-black/[0.08] p-5 md:p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors duration-300 hover:border-black/[0.18]"
              >
                {index < 2 && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent origin-left scale-x-[0.92] transition-transform duration-500 group-hover:scale-x-100" />
                )}

                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xs bg-neutral-100 border border-black/[0.08] shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    </div>
                    <div className="font-sans text-xs font-bold tracking-tight text-[#111111] flex items-center gap-1.5 pt-1 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-brand-accent text-sm font-normal">{item.companySymbol}</span>
                      <span>{item.companyLogo}</span>
                    </div>
                  </div>

                  <div className="mb-2.5">
                    <h3 className="font-mono text-xs font-bold tracking-wider text-[#111111] uppercase">{item.name}</h3>
                    <p className="font-mono text-[8.5px] md:text-[9px] tracking-widest text-[#6b6b6b] uppercase mt-0.5">{item.role}</p>
                  </div>

                  <div className="flex gap-1 text-brand-accent mb-2.5 select-none">
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                  </div>

                  <p className="font-sans text-[12px] md:text-[13px] font-normal leading-[1.55] text-[#444444] tracking-tight">
                    {item.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/AwardsSection.tsx

`tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

const AWARDS_LIST = [
  { id: "1", name: "Clutch Global", image: "/images/awards/logo.png" },
  { id: "2", name: "Top Developers", image: "/images/awards/logo-1.png" },
  { id: "3", name: "GoodFirms", image: "/images/awards/logo-2.png" },
  { id: "4", name: "TechBehemoths", image: "/images/awards/logo-3.png" },
  { id: "5", name: "The Manifest", image: "/images/awards/logo-4.png" },
  { id: "6", name: "DesignRush", image: "/images/awards/logo-5.png" },
  { id: "7", name: "UpCity Excellence", image: "/images/awards/logo-6.png" },
  { id: "8", name: "Top App Firms", image: "/images/awards/logo-7.png" },
  { id: "9", name: "Software World", image: "/images/awards/logo-8.png" },
  { id: "10", name: "Selected Firm", image: "/images/awards/logo-9.png" },
  { id: "11", name: "Enterprise Leaders", image: "/images/awards/logo-10.png" },
];

export function AwardsSection() {
  return (
    <section className="relative z-20 w-full bg-white text-[#111111] py-10 md:py-14 border-t border-black/[0.08] select-none snap-section flex flex-col justify-center overflow-hidden h-[100svh] min-h-[100svh]">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="07" label="RECOGNITION" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.1rem,2.9vw,3.6rem)] font-normal tracking-[-0.04em] leading-[0.96] text-left uppercase text-[#111111]"
            >
              <span className="block text-[#111111]">AWARDS &amp;</span>
              <span className="block text-[#6b6b6b] font-medium">RECOGNITION.</span>
            </motion.h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#6b6b6b] mt-3 md:mt-4 uppercase tracking-wide max-w-[300px]">
              RECOGNIZED GLOBALLY BY LEADING RESEARCH AND ANALYST PLATFORMS.
            </p>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[12px] md:text-[13.5px] text-[#ff5a00] tracking-widest uppercase font-semibold">
                20+ YEARS OF EXCELLENCE
              </p>
              <p className="font-sans text-[15px] md:text-[16px] leading-relaxed text-[#555555] uppercase max-w-xs">
                GLOBAL RECOGNITION FOR ENGINEERING EXCELLENCE, PRODUCT DESIGN &amp; INNOVATION.
              </p>
            </div>
          </div>
        </div>

        {/* Compact Logo Grid (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="border-t border-l border-black/[0.08] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 bg-white">
            {AWARDS_LIST.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE_CUSTOM }}
                className="group relative flex flex-col items-center justify-center p-5 md:p-6 border-r border-b border-black/[0.08] hover:bg-black/[0.02] transition-all duration-300 min-h-[120px] md:min-h-[140px]"
              >
                {/* Logo Image */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-contain object-center drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}

            {/* Final Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.4, delay: AWARDS_LIST.length * 0.04, ease: EASE_CUSTOM }}
              className="flex flex-col items-center justify-center p-5 md:p-6 border-r border-b border-black/[0.08] bg-[#f8f8f8] min-h-[120px] md:min-h-[140px] text-center"
            >
              <span className="font-mono text-xl md:text-2xl font-bold text-[#ff5a00]">20+</span>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#666666] mt-1 font-semibold">
                YEARS LEGACY
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/FAQSection.tsx

`tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FAQS_DATA } from "@/data/faqs";
import { FAQItem } from "@/components/faq/FAQItem";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, fadeUpSmall, staggerContainer, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

export function FAQSection() {
  const [openId, setOpenId] = useState<string>("");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section h-[100svh] min-h-[100svh] select-none"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching ServicesSection Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="08" label="FAQ" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left uppercase"
            >
              <span className="block text-[#a4a4a2]">FREQUENTLY</span>
              <span className="block text-white font-medium">ASKED QUESTIONS.</span>
            </motion.h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#a4a4a2] mt-4 md:mt-5 uppercase tracking-wide max-w-[300px]">
              COMMON QUESTIONS ABOUT <br />
              <strong className="text-white font-semibold">ARMIA SYSTEMS</strong> &amp; ENGAGEMENTS.
            </p>
          </div>

          {/* Right Supporting Copy / Link: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <a
                href="#contact"
                className="font-mono text-[12px] md:text-[14px] text-[#ff5a00] tracking-widest uppercase hover:text-white transition-colors"
              >
                HAVE QUESTIONS? TALK TO US →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="relative w-full">
            {/* Accent line grows in left-to-right */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, ease: EASE_CUSTOM }}
              style={{ transformOrigin: "left" }}
              className="h-[2px] w-full bg-[#ff5a00]"
            />

            <motion.div
              initial={{ y: "15%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_CUSTOM }}
              viewport={VIEWPORT_ONCE}
              className="w-full"
            >
              {FAQS_DATA.map((faq) => (
                <div key={faq.id}>
                  <FAQItem
                    item={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/BlogSection.tsx

`tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLOG_ARTICLES } from "@/data/blog";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

export function BlogSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-white text-[#111111] h-[100svh] min-h-[100svh] border-t border-black/[0.08] select-none snap-section flex flex-col justify-between overflow-hidden py-10 md:py-14">
      <GridLines light />
      
      {/* ── Top Header Area (Matching 10.8% / 30.3% / 69.3% Grid) ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-0 shrink-0 mb-6 md:mb-8">
        <div className="relative w-full flex flex-col md:flex-row items-start">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="09" label="BLOG" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#111111]">LATEST</span>
              <span className="block text-[#6b6b6b] font-medium">INSIGHTS.</span>
            </h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#666666] mt-4 md:mt-5 uppercase tracking-wide max-w-[300px]">
              ENGINEERING ARCHITECTURE, AI SYSTEMS &amp; TECH STRATEGY.
            </p>
          </div>

          {/* Right Supporting Copy / Link: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <a
                href="#blog"
                className="font-mono text-[12px] md:text-[14px] text-[#ff5a00] tracking-widest uppercase hover:text-[#111111] transition-colors"
              >
                VIEW ALL ARTICLES →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Seamless 4-Column Editorial Magazine Grid (Aligns Top Meta & Flush Image Top) ── */}
      <div 
        className="relative z-10 w-full border-t border-b border-black/[0.08] flex-1 flex flex-col justify-start overflow-hidden"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08] h-full items-start">
          {BLOG_ARTICLES.map((article, idx) => {
            // Default pattern in design:
            // 01: square/landscape (shorter)
            // 02: tall portrait (extends lower)
            // 03: square/landscape (shorter)
            // 04: tall portrait (extends lower)
            const isDefaultTall = idx === 1 || idx === 3;
            const hasHover = hoveredIdx !== null;
            const isSelfHovered = hoveredIdx === idx;

            // Reciprocal logic:
            // When hovering:
            // - If hovering item 02 (tall) -> it shrinks to square, while 01 and 03 expand to tall!
            // - If hovering item 01 (short) -> it expands to tall, while 02 and 04 shrink to square!
            let isTall = isDefaultTall;
            if (hasHover) {
              const hoveredIsTall = hoveredIdx === 1 || hoveredIdx === 3;
              if (hoveredIsTall) {
                // Invert the layout!
                isTall = !isDefaultTall;
              } else {
                // Invert the layout!
                isTall = !isDefaultTall;
              }
            }

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_CUSTOM }}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group flex flex-col justify-start bg-white h-full relative"
              >
                {/* Meta Top Line: Date & Dots Icon (Aligned seamlessly at the top) */}
                <div className="flex items-center justify-between px-4 sm:px-5 lg:px-6 py-2.5 border-b border-black/[0.06] shrink-0 bg-white">
                  <span className="font-mono text-[9px] md:text-[9.5px] tracking-widest uppercase text-[#666666]">
                    {article.date}
                  </span>
                  <span className="font-mono text-xs text-[#999999] tracking-tighter select-none">
                    ▪▪▪
                  </span>
                </div>

                {/* Seamless Edge-to-Edge Cover Image starting immediately below Date line */}
                <Link
                  href={article.href}
                  className="block relative w-full overflow-hidden bg-neutral-100 shrink-0"
                >
                  <div
                    className={`relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isTall ? "h-[38vh] md:h-[42vh]" : "h-[22vh] md:h-[25vh]"
                    }`}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isSelfHovered ? "scale-105" : "scale-100"
                      }`}
                    />
                  </div>
                </Link>

                {/* Content Block strictly below each respective image */}
                <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-5 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Category Label with Square marker */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="h-1.5 w-1.5 bg-brand-accent inline-block shrink-0" />
                      <span className="font-mono text-[8.5px] md:text-[9px] tracking-widest uppercase text-[#555555]">
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={article.href} className="block group/title">
                      <h3 className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.3] tracking-tight text-[#111111] mb-1.5 group-hover/title:text-brand-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="font-sans text-[11px] md:text-[11.5px] leading-[1.38] text-[#666666] mb-3 line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  {/* Read Article link */}
                  <div>
                    <Link
                      href={article.href}
                      className="inline-flex items-center gap-1 font-mono text-[8.5px] md:text-[9px] font-semibold tracking-widest uppercase text-[#111111] hover:text-brand-accent transition-colors"
                    >
                      <span>READ ARTICLE</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

`

---

## File: src/components/sections/FooterSection.tsx

`tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, fadeUp, fadeUpSmall, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { TypewriterText } from "@/components/effects/TypewriterText";

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Thank you! Your message has been submitted.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <footer
      id="contact"
      data-theme="dark"
      className="relative w-full bg-black text-white pt-0 pb-12 overflow-hidden select-none border-t-[3px] border-brand-accent"
    >
      <GridLines />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

          {/* Left Column — Engineer Card, Info & Brand Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-4 p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full bg-black"
          >
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="relative w-full mb-10 overflow-hidden bg-neutral-900 border-t-[3px] border-brand-accent shadow-2xl group">
                  <div className="relative w-full aspect-[4/5] bg-neutral-800 overflow-hidden">
                    <Image
                      src="/images/engineering_team.png"
                      alt="Armia Leadership & Engineering"
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <a
                    href="mailto:hello@armiasystems.com"
                    className="flex items-center justify-between bg-[#111111] text-white h-[46px] px-5 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-black group-hover:bg-[#151515]"
                  >
                    <span className="font-medium text-white/90">
                      GET IN TOUCH <span className="text-white/40 font-light">\ ARMIA</span>
                    </span>
                    <div className="flex items-center justify-center h-full w-[46px] -mr-5 bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
                      <span className="text-white text-xs font-semibold">›</span>
                    </div>
                  </a>
                </div>

                <div className="border-t border-b border-white/10 py-6">
                  <div className="flex items-center justify-between mb-4 font-mono text-[9px] tracking-widest uppercase text-white/60">
                    <div className="flex items-center gap-1.5">
                      <span className="h-[4px] w-[4px] bg-brand-accent inline-block" />
                      <span>ARMIA</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/50 text-xs font-serif">
                      <span>𝕏</span>
                      <span>in</span>
                      <span>🌐</span>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-[9px] md:text-[10px] uppercase">
                    <div className="grid grid-cols-12 gap-2 text-white/60">
                      <span className="col-span-4 text-white/40">PROFESSION</span>
                      <span className="col-span-8 text-white font-medium">ENTERPRISE-GRADE ENGINEERING SINCE 2001.</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 text-white/60">
                      <span className="col-span-4 text-white/40">LOCATION</span>
                      <span className="col-span-8 text-white font-medium">KOCHI, INDIA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Logo */}
              <div className="pt-8 mt-auto border-t border-white/10">
                <div className="relative h-14 md:h-20 w-60 md:w-80 mb-6 flex items-center">
                  <Image
                    src="/images/armialogo.svg"
                    alt="Armia Systems Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest leading-relaxed">
                  <div>© {new Date().getFullYear()} ARMIA SYSTEMS INC. ALL RIGHTS RESERVED.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Contact Form & Links */}
          <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 flex flex-col justify-between bg-[#0a0a0a]">
            <div>
              {/* Section number 10 */}
              <SectionEyebrow number="10" label="CONTACT" dark />

              <div className="mb-8">
                <h2 className="font-sans text-[clamp(2.8rem,4.8vw,5.6rem)] font-bold tracking-[-0.04em] leading-[0.92] text-[#e5e5e5] uppercase max-w-3xl">
                  <span className="block">BUILD YOUR</span>
                  <span className="block">NEXT PROJECT</span>
                  <span className="block">WITH ARMIA.</span>
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: "15%" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, ease: EASE_CUSTOM, delay: 0.2 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 border-b border-white/10 pb-6"
              >
                <p className="font-mono text-[10px] md:text-[11px] tracking-wider text-white/60 uppercase leading-relaxed max-w-lg">
                  FROM FIRST CONCEPT TO FINAL BUILD, WE CREATE ENTERPRISE SOFTWARE WITH CLEAR ARCHITECTURE &amp; RELIABLE DELIVERY.
                </p>
                <div className="flex gap-1 text-brand-accent select-none">
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-white/20 inline-block" />
                </div>
              </motion.div>

              {/* Form fields reveal one after another instead of all at once */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_CUSTOM, delay: 1.0 }}
                viewport={VIEWPORT_ONCE}
                className="space-y-6 mb-12 max-w-4xl"
              >
                <div className="space-y-6 mb-10 max-w-4xl">
                  <div className="pt-2">
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>YOUR NAME</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>EMAIL ADDRESS</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hello@armiasystems.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>HOW CAN I HELP?</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project ..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 resize-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <motion.button
                    type="submit"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                    className="group/btn inline-flex items-center justify-between bg-brand-accent hover:bg-[#ff4500] text-white h-[48px] w-full md:w-auto min-w-[280px] pl-6 transition-colors duration-300"
                  >
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase font-bold">
                      {isFormValid ? "SEND MESSAGE" : "FORM INCOMPLETE"}
                    </span>
                    <div className="flex items-center justify-center h-full w-[48px] bg-white text-black transition-colors duration-300 group-hover/btn:bg-neutral-100">
                      <span className="text-black text-xs font-bold">›</span>
                    </div>
                  </motion.button>

                  <div className="font-mono text-[9px] text-white/40 tracking-wider">
                    By submitting, you agree to our <br className="hidden md:inline" />
                    <Link href="#terms" className="text-white/70 underline hover:text-white">Terms</Link> and{" "}
                    <Link href="#privacy" className="text-white/70 underline hover:text-white">Privacy Policy</Link>.
                  </div>
                </div>
              </motion.form>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12 font-mono text-[10px] tracking-wider uppercase">
                <div className="md:col-span-5 space-y-2.5">
                  <div><Link href="#products" className="text-white/70 hover:text-brand-accent transition-colors">PRODUCTS</Link></div>
                  <div><Link href="#services" className="text-white/70 hover:text-brand-accent transition-colors">SERVICES</Link></div>
                  <div><Link href="#solutions" className="text-white/70 hover:text-brand-accent transition-colors">SOLUTIONS</Link></div>
                  <div><Link href="#careers" className="text-white/70 hover:text-brand-accent transition-colors">CAREERS</Link></div>
                  <div><Link href="#contact" className="text-white/70 hover:text-brand-accent transition-colors">CONTACT</Link></div>
                  <div><Link href="#404" className="text-white/40 hover:text-brand-accent transition-colors">404</Link></div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="text-white/50 leading-relaxed font-sans normal-case text-xs">
                    3rd Floor, Jyothirmaya Building, <br />
                    Wing 1, Infopark Phase 2, Kochi, <br />
                    Kerala 682303
                  </div>

                  <div>
                    <a href="mailto:hello@armiasystems.com" className="font-mono font-bold text-sm text-white hover:text-brand-accent transition-colors tracking-widest">
                      HELLO@ARMIASYSTEMS.COM
                    </a>
                  </div>

                  <div>
                    <a href="#contact" className="group inline-flex items-center justify-between bg-[#181818] text-white h-[38px] px-4 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-neutral-800">
                      <span className="mr-3 font-medium">CONTACT ME</span>
                      <div className="flex items-center justify-center h-[26px] w-[26px] bg-brand-accent">
                        <span className="text-white text-xs font-semibold">›</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-[9px] text-white/40 tracking-widest uppercase">
                <Link href="#terms" className="hover:text-white transition-colors">TERMS</Link>
                <Link href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

`

---

