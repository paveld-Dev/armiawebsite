"use client";

import { useEffect } from "react";

export function ScrollToTopOnReload() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration so it doesn't restore previous scroll offset
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Immediately scroll to top
    window.scrollTo(0, 0);

    // Also handle beforeunload/pagehide to ensure smooth reload reset
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
