"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Pencil, 
  Clapperboard, 
  Presentation, 
  Mic, 
  Gamepad2, 
  Layers
} from "lucide-react";

const iconsData = [
  { Icon: Clapperboard, color: "bg-[#4D96FF]" }, // Top
  { Icon: Presentation, color: "bg-[#FFD93D]" }, // Top-Right
  { Icon: Mic, color: "bg-[#C084FC]" },          // Bottom-Right
  { Icon: Gamepad2, color: "bg-[#FF71B3]" },     // Bottom
  { Icon: Layers, color: "bg-[#4ADE80]" },       // Bottom-Left
  { Icon: Pencil, color: "bg-[#FF5C35]" },       // Top-Left
];

export const FloatingIcons = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  // Sizes and radius tuned to match the proportions in the dog image
  const radius = isMobile ? 160 : 320;
  const iconSize = isMobile ? "w-16 h-16" : "w-32 h-32";
  const iconInnerSize = isMobile ? 28 : 52;
  const iconCount = iconsData.length;
  const rotationDuration = 30; 

  return (
    <div className="absolute inset-0 pointer-events-none -z-5 overflow-visible flex items-center justify-center">
      {/* The rotating container */}
      <motion.div
        className="relative w-0 h-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {iconsData.map((item, index) => {
          const angle = (index * 360) / iconCount;
          
          return (
            <div
              key={index}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px)`,
              }}
            >
              {/* Counter-rotate the icon container to keep it upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* 
                  The Selection Cycle:
                  Icons pulse sequentially to create the "active" scanning effect
                */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    filter: [
                      "brightness(1)",
                      "brightness(1.1) drop-shadow(0 0 25px rgba(255,255,255,0.4))",
                      "brightness(1)"
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: (rotationDuration / iconCount) * (iconCount - 1) + (rotationDuration / iconCount - 2),
                    delay: (index * rotationDuration) / iconCount,
                    ease: "easeInOut",
                  }}
                  className={`${iconSize} rounded-full ${item.color} shadow-2xl flex items-center justify-center text-white border-[6px] border-white`}
                >
                  <item.Icon size={iconInnerSize} strokeWidth={2.5} />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
};
