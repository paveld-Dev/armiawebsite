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
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden lg:block"
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
