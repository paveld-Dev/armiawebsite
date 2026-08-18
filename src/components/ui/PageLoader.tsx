// src/components/ui/PageLoader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dispatchAppReady } from "@/hooks/useAppReady";

const MIN_DURATION_MS = 1450;
const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

// Matrix rain characters focused on Armia Systems
const ARMIA_LETTERS = "ARMIA SYSTEMS 2004 01 AI ENTERPRISE CLOUD ARCHITECTURE KERNEL <>{}[]=+#*~:;.";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Full-screen pure falling Armia Matrix stream
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const fontSize = 14;
    const columns = Math.ceil(width / fontSize);

    // Each column drops letters of ARMIA
    const drops = Array.from({ length: columns }, () => ({
      y: Math.floor(Math.random() * -60),
      speed: 0.95 + Math.random() * 0.95,
      length: 12 + Math.floor(Math.random() * 18),
    }));

    let lastDraw = 0;
    const fpsInterval = 1000 / 30;

    const drawMatrix = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(drawMatrix);
      const elapsed = timestamp - lastDraw;
      if (elapsed < fpsInterval) return;
      lastDraw = timestamp - (elapsed % fpsInterval);

      // Deep dark trail fade
      ctx.fillStyle = "rgba(9, 9, 9, 0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "SF Mono", "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize;
        const headY = Math.floor(drop.y) * fontSize;

        const char = ARMIA_LETTERS.charAt(
          Math.floor(Math.random() * ARMIA_LETTERS.length)
        );

        // 1. Head character: Glowing White or Armia Orange (#FF5A00)
        if (Math.random() > 0.75) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#FF5A00";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "#FF7A29";
          ctx.shadowColor = "#FF5A00";
          ctx.shadowBlur = 8;
        }
        ctx.fillText(char, x, headY);

        // 2. Trailing characters in Armia Orange & Translucent Mono White
        const trailChar = ARMIA_LETTERS.charAt(
          Math.floor(Math.random() * ARMIA_LETTERS.length)
        );
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255, 90, 0, 0.75)";
        ctx.fillText(trailChar, x, headY - fontSize);

        const tailChar = ARMIA_LETTERS.charAt(
          Math.floor(Math.random() * ARMIA_LETTERS.length)
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
        ctx.fillText(tailChar, x, headY - fontSize * 3);

        drop.y += drop.speed;

        if (headY > height + drop.length * fontSize && Math.random() > 0.96) {
          drop.y = Math.floor(Math.random() * -20);
          drop.speed = 0.95 + Math.random() * 0.95;
        }
      }
    };

    animationFrameId = requestAnimationFrame(drawMatrix);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      if (elapsed < MIN_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        dispatchAppReady();
      }
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="armia-matrix-transition-loader"
          initial={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: [1, 1, 0.9, 0],
            transition: {
              duration: 0.9,
              ease: EASE_CINEMATIC,
            },
          }}
          className="fixed inset-0 z-[999] overflow-hidden select-none bg-[#090909]"
        >
          {/* Pure Full-Screen Falling ARMIA Matrix Rain Stream */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-95"
          />

          {/* Background vertical hairlines matching the site grid */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[4]">
            {[12, 32, 50, 68, 88].map((left, i) => (
              <motion.div
                key={left}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  transformOrigin: "top",
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>

          {/* Subtle Orange Light Curtain Sweep at the bottom curtain edge on exit */}
          <motion.div
            initial={{ opacity: 0 }}
            exit={{
              opacity: [0, 0.85, 0],
              transition: { duration: 0.85, ease: "easeOut" },
            }}
            className="absolute inset-x-0 bottom-0 h-1 bg-[#FF5A00] shadow-[0_0_24px_4px_#FF5A00] z-10 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
