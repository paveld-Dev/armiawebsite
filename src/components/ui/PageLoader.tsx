// src/components/ui/PageLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

/**
 * A minimum-duration loader — not tied to real asset loading (which can be
 * unpredictably slow or fast), so it's always fast and always dismisses.
 * ~900ms is enough to register as an intentional "moment," not a stall.
 * Respects prefers-reduced-motion by skipping straight to dismissed.
 */
const MIN_DURATION_MS = 900;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / MIN_DURATION_MS) * 100);
      setProgress(pct);
      if (elapsed < MIN_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setVisible(false);
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
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE_CUSTOM } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#090909] select-none"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_CUSTOM }}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/80 mb-6"
          >
            ARMIA <span className="text-brand-accent">SYSTEMS</span>
          </motion.div>

          <div className="relative h-[2px] w-[160px] bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-accent"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 font-mono text-[9px] tracking-[0.2em] text-white/40 tabular-nums">
            {String(Math.round(progress)).padStart(2, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
