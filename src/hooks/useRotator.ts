"use client";

import { useState, useCallback } from "react";

export function useRotator<T>(items: T[], initialIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setActiveIndex(index);
    }
  }, [items.length]);

  return {
    activeIndex,
    setActiveIndex: goTo,
    activeItem: items[activeIndex],
    next,
    prev,
    total: items.length,
  };
}
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
