"use client";

import { useEffect } from "react";

export function DebugHeights() {
  useEffect(() => {
    const logHeights = () => {
      const results: Array<{ id: string; computedHeight: number; windowHeight: number; diff: number; pass: boolean }> = [];
      const sections = document.querySelectorAll("section, footer");
      sections.forEach((el, index) => {
        let name = "Unknown";
        if (index === 0) name = "HeroSection";
        else if (index === 1) name = "EngineeringIntro";
        else if (index === 2) name = "ServicesSection";
        else if (index === 3) name = "ProcessSection";
        else if (index === 4) name = "PortfolioServicesSection";
        else if (index === 5) name = "TestimonialsSection";
        else if (index === 6) name = "FAQSection";
        else if (index === 7) name = "BlogSection";
        else if (index === 8) name = "FooterSection";
        
        results.push({
          name: name,
          height: Math.round(el.getBoundingClientRect().height),
          scrollHeight: el.scrollHeight
        });
      });
      console.log("HEIGHT_REPORT:" + JSON.stringify({
        width: window.innerWidth,
        height: window.innerHeight,
        sections: results
      }));
    };

    const t = setTimeout(logHeights, 1000);
    window.addEventListener("resize", logHeights);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", logHeights);
    };
  }, []);

  return null;
}
