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
