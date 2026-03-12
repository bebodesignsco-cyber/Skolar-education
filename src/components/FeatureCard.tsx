"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    slug?: string;
  };
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <motion.div
      className="group cursor-pointer rounded-2xl bg-white p-5 border border-primary/5 shadow-sm transition-all hover:shadow-md hover:border-primary/20 flex gap-5 items-start"
      whileHover={{ y: -2 }}
    >
      <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-primary/5 flex items-center justify-center border border-primary/10">
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback to icon if image fails
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement?.classList.add('bg-primary/10');
          }}
        />
        {/* Fallback Icon (always rendered but hidden if image is present) */}
        <Icon className="absolute h-10 w-10 text-primary opacity-0 group-has-[img[style*='display: none']]:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 flex flex-col gap-1.5 pt-1">
        <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};
