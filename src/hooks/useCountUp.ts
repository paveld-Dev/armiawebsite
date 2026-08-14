// src/hooks/useCountUp.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a numeric stat string ("98%", "185+", "4.92") counting up from 0
 * once it scrolls into view. Non-numeric strings (like "24/7") pass through
 * unchanged — no broken animation, just a plain reveal via the parent's
 * fadeUp variant.
 */
export function useCountUp(value: string, duration = 1.2) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value.replace(/[\d.]/g, "0"));

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = value.slice(match[1].length);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      setDisplay(`${decimals > 0 ? current.toFixed(decimals) : Math.round(current)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return { ref, display };
}
