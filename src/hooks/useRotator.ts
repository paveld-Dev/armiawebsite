"use client";

import { useState, useCallback } from "react";

export interface UseRotatorReturn<T> {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  activeItem: T;
  next: () => void;
  prev: () => void;
  total: number;
}

export function useRotator<T>(
  items: T[],
  initialIndex = 0
): UseRotatorReturn<T> {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
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
    activeIndex,
    setActiveIndex: goTo,
    activeItem: items[activeIndex] ?? items[0],
    next,
    prev,
    total: items.length,
  };
}
