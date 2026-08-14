"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "minimal";
  showIcon?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  showIcon = true,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-between font-mono text-xs tracking-wider uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-brand-accent text-white hover:bg-white hover:text-foreground px-5 py-3.5 border border-brand-accent",
    secondary:
      "bg-foreground text-foreground-on-dark hover:bg-brand-accent hover:text-white px-5 py-3.5 border border-foreground",
    outline:
      "bg-transparent text-white border border-border-dark hover:border-brand-accent hover:text-brand-accent px-5 py-3.5",
    minimal:
      "bg-transparent text-white hover:text-brand-accent px-0 py-2 border-b border-border-dark hover:border-brand-accent",
  };

  return (
    <MagneticButton strength={0.2}>
      <button className={cn(baseStyles, variants[variant], className)} {...props}>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
        </span>
        {showIcon && (
          <ArrowUpRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-accent" />
        )}
      </button>
    </MagneticButton>
  );
}
