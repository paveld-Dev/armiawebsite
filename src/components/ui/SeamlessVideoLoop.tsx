"use client";

import React, { useRef, useEffect, useState } from "react";

/**
 * SeamlessVideoLoop
 * Plays two instances of the video with cross-fading so when one video
 * is about to reach the end, the second starts playing and fades in smoothly,
 * eliminating the harsh jump/stutter at loop boundaries.
 * Includes poster fallback and multi-browser autoplay resilience for iOS/Safari/Android.
 */
export function SeamlessVideoLoop({
  src,
  poster,
  crossFadeDuration = 1.0,
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  isActive = true,
}: {
  src: string;
  poster?: string;
  crossFadeDuration?: number;
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: "center" | "right" | "left";
  isActive?: boolean;
}) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (!isActive) {
      v1.pause();
      v2.pause();
      return;
    }

    // Explicitly enforce muted properties on DOM nodes (critical for mobile WebKit & autoplay)
    v1.muted = true;
    v1.defaultMuted = true;
    v2.muted = true;
    v2.defaultMuted = true;

    const safePlay = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser policy or Low Power Mode blocked initial autoplay:
          // Resume on the first user interaction (touch/click/scroll)
          const resumeOnInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", resumeOnInteraction);
            window.removeEventListener("pointerdown", resumeOnInteraction);
            window.removeEventListener("click", resumeOnInteraction);
            window.removeEventListener("scroll", resumeOnInteraction);
          };
          window.addEventListener("touchstart", resumeOnInteraction, { once: true, passive: true });
          window.addEventListener("pointerdown", resumeOnInteraction, { once: true, passive: true });
          window.addEventListener("click", resumeOnInteraction, { once: true });
          window.addEventListener("scroll", resumeOnInteraction, { once: true, passive: true });
        });
      }
    };

    if (v1.readyState >= 2) {
      safePlay(v1);
    } else {
      const handleCanPlay = () => {
        safePlay(v1);
        v1.removeEventListener("canplay", handleCanPlay);
        v1.removeEventListener("loadeddata", handleCanPlay);
      };
      v1.addEventListener("canplay", handleCanPlay);
      v1.addEventListener("loadeddata", handleCanPlay);
      safePlay(v1);
    }

    setActiveVideo(1);
  }, [src, isActive]);

  useEffect(() => {
    if (!isActive) return;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.muted = true;
    v1.defaultMuted = true;
    v2.muted = true;
    v2.defaultMuted = true;

    let animId: number;

    const checkCrossfade = () => {
      if (activeVideo === 1 && v1.duration && v1.currentTime > 0) {
        const timeLeft = v1.duration - v1.currentTime;
        if (timeLeft <= crossFadeDuration && v1.currentTime > 0.5) {
          v2.currentTime = 0;
          v2.muted = true;
          v2.defaultMuted = true;
          v2.play().catch(() => {});
          setActiveVideo(2);
        }
      } else if (activeVideo === 2 && v2.duration && v2.currentTime > 0) {
        const timeLeft = v2.duration - v2.currentTime;
        if (timeLeft <= crossFadeDuration && v2.currentTime > 0.5) {
          v1.currentTime = 0;
          v1.muted = true;
          v1.defaultMuted = true;
          v1.play().catch(() => {});
          setActiveVideo(1);
        }
      }
      animId = requestAnimationFrame(checkCrossfade);
    };

    animId = requestAnimationFrame(checkCrossfade);

    return () => cancelAnimationFrame(animId);
  }, [activeVideo, crossFadeDuration, isActive]);

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const posClass =
    objectPosition === "right"
      ? "object-right"
      : objectPosition === "left"
      ? "object-left"
      : "object-center";

  return (
    <div className={`relative h-full w-full overflow-hidden flex items-center justify-center ${className}`}>
      {/* Video 1 */}
      <video
        ref={video1Ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        // @ts-expect-error defaultMuted is recognized by React DOM
        defaultMuted={true}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        disablePictureInPicture
        preload={isActive ? "auto" : "none"}
        className={`absolute inset-0 h-full w-full ${fitClass} ${posClass} transition-opacity duration-1000 ease-in-out ${
          activeVideo === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      />

      {/* Video 2 */}
      <video
        ref={video2Ref}
        src={src}
        poster={poster}
        muted
        // @ts-expect-error defaultMuted is recognized by React DOM
        defaultMuted={true}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        disablePictureInPicture
        preload={isActive ? "auto" : "none"}
        className={`absolute inset-0 h-full w-full ${fitClass} ${posClass} transition-opacity duration-1000 ease-in-out ${
          activeVideo === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      />
    </div>
  );
}
