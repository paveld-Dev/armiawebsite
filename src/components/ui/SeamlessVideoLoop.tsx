"use client";

import React, { useRef, useEffect, useState } from "react";

/**
 * SeamlessVideoLoop
 * Plays two instances of the video with cross-fading so when one video
 * is about to reach the end, the second starts playing and fades in smoothly,
 * eliminating the harsh jump/stutter at loop boundaries.
 */
export function SeamlessVideoLoop({
  src,
  crossFadeDuration = 1.0,
  className = "",
  objectFit = "cover",
}: {
  src: string;
  crossFadeDuration?: number;
  className?: string;
  objectFit?: "cover" | "contain";
}) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Explicitly enforce muted programmatically (critical for mobile & production autoplay policies)
    v1.muted = true;
    v2.muted = true;
    v1.play().catch(() => {});

    let animId: number;

    const checkCrossfade = () => {
      if (activeVideo === 1 && v1.duration) {
        const timeLeft = v1.duration - v1.currentTime;
        if (timeLeft <= crossFadeDuration && v1.currentTime > 0.5) {
          v2.currentTime = 0;
          v2.play().catch(() => {});
          setActiveVideo(2);
        }
      } else if (activeVideo === 2 && v2.duration) {
        const timeLeft = v2.duration - v2.currentTime;
        if (timeLeft <= crossFadeDuration && v2.currentTime > 0.5) {
          v1.currentTime = 0;
          v1.play().catch(() => {});
          setActiveVideo(1);
        }
      }
      animId = requestAnimationFrame(checkCrossfade);
    };

    animId = requestAnimationFrame(checkCrossfade);

    return () => cancelAnimationFrame(animId);
  }, [activeVideo, crossFadeDuration]);

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black flex items-center justify-center ${className}`}>
      {/* Video 1 */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full ${fitClass} object-center transition-opacity duration-1000 ease-in-out ${
          activeVideo === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Video 2 */}
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full ${fitClass} object-center transition-opacity duration-1000 ease-in-out ${
          activeVideo === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
