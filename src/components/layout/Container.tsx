import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  clean?: boolean;
}

export function Container({ children, className, clean = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto max-w-[1600px]",
        clean ? "" : "px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}
