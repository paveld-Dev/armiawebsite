"use client";

import { useState, useCallback, useRef } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

export interface UseRotatorReturn<T> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  activeItem: T;
  scrollYProgress: MotionValue<number>;
  next: () => void;
  prev: () => void;
  total: number;
}

/**
 * Progress mapping for scroll-driven rotators:
 *
 *  0.00 → RELEASE_START  items advance (tab 0 through tab N-1)
 *  RELEASE_START → 1.00  release window — last tab holds, sticky ends
 *
 * This prevents blank scroll distance after the last tab.
 */
const RELEASE_START = 0.94;

export function useRotator<T>(
  items: T[],
  initialIndex = 0
): UseRotatorReturn<T> {
  const [activeIndex, setActiveIndexState] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const isManualOverride = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isManualOverride.current || !items.length) return;
    // Map 0 → RELEASE_START to item indices; clamp at last item after that
    const clamped = Math.max(0, Math.min(latest, RELEASE_START));
    const normalized = clamped / RELEASE_START;
    const index = Math.min(
      Math.floor(normalized * items.length),
      items.length - 1
    );
    setActiveIndexState(index);
  });

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndexState(index);
        // Suppress scroll-driven updates briefly after a manual click
        isManualOverride.current = true;
        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
        manualTimeoutRef.current = setTimeout(() => {
          isManualOverride.current = false;
        }, 1200);
      }
    },
    [items.length]
  );

  const next = useCallback(
    () => goTo((activeIndex + 1) % items.length),
    [activeIndex, items.length, goTo]
  );

  const prev = useCallback(
    () => goTo((activeIndex - 1 + items.length) % items.length),
    [activeIndex, items.length, goTo]
  );

  return {
    containerRef,
    activeIndex,
    setActiveIndex: goTo,
    activeItem: items[activeIndex] ?? items[0],
    scrollYProgress,
    next,
    prev,
    total: items.length,
  };
}

/**
 * Calculate the outer section height (in vh) for a scroll-driven rotator.
 *
 *   scrollPerItem = vh of extra scroll per additional tab
 *   base          = minimum vh when there is only 1 item
 *
 * Example for 4 items at 45vh/item:  100 + (4-1)*45 = 235vh
 * Example for 5 items at 45vh/item:  100 + (5-1)*45 = 280vh
 */
export function rotatorSectionHeight(
  itemCount: number,
  scrollPerItem = 45,
  base = 100
): string {
  const vh = base + (itemCount - 1) * scrollPerItem;
  return `${vh}vh`;
}
