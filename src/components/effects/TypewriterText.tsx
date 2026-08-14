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
