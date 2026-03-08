import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

export const Marquee = ({ children, className, reverse = false }: MarqueeProps) => {
  return (
    <div className={cn("group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]", className)}>
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
          reverse && "animate-marquee-reverse"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
