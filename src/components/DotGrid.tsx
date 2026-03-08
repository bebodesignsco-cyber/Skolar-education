import React from "react";
import { cn } from "@/lib/utils";

interface DotGridProps {
  className?: string;
}

export const DotGrid = ({ className }: DotGridProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full dot-grid opacity-40",
        className
      )}
    />
  );
};
