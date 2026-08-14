import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export function SectionLabel({
  children,
  className,
  dotColor = "bg-brand-accent",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-foreground-dark-muted select-none",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-none", dotColor)} />
      <span>{children}</span>
    </div>
  );
}
