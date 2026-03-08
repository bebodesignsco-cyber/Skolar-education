"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calculator, BookOpen } from "lucide-react";

const floatingIcons = [
  {
    icon: Calculator,
    className: "bg-sky-400/20 text-sky-100",
    style: { top: "6%", right: "42%" },
    delay: 0,
  },
  {
    icon: Award,
    className: "bg-rose-400/20 text-rose-100",
    style: { top: "2%", right: "8%" },
    delay: 0.6,
  },
  {
    icon: BookOpen,
    className: "bg-emerald-400/20 text-emerald-100",
    style: { top: "34%", right: "-60px" },
    delay: 1.1,
  },
];

export const FeaturesGrid = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-animate py-24 lg:py-32">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 animated-aurora opacity-70 z-0" />
      <div className="absolute top-0 left-0 right-0 bottom-[-400px] bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15),transparent_50%)] z-0" />
      
      <div className="container relative mx-auto px-4 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.45fr] gap-10 lg:gap-12 items-start">
          
          {/* Left Side: Text */}
          <div className="relative space-y-8 text-white z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-xl">
                <span className="block text-[40px]">Stop studying longer.</span>
                <span className="block text-[40px] text-white/90 w-[450px]">Start studying smarter.</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-md font-medium leading-relaxed">
                Students save an average of 5+ hours every week by focusing only on what moves their ATAR.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Image Scene */}
          <div className="relative flex items-start justify-center lg:justify-center z-0">
            {/* Spinning Shine Effect */}
            <div className="absolute top-24 right-4 w-[480px] sm:w-[560px] lg:w-[640px] aspect-square -z-10 pointer-events-none">
              <div className="w-full h-full opacity-40 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.45),transparent,rgba(255,255,255,0.45),transparent)] blur-3xl rounded-full" />
            </div>

            <div className="relative w-full max-w-[1360px] lg:max-w-[1520px] lg:pr-4 mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative z-30"
              >
                <img
                  src="/octopus study smarter image.png"
                  alt="Study smarter scene"
                  className="w-[760px] max-w-none h-auto object-contain scale-[1.75] origin-top-left -translate-x-[440px] -translate-y-[120px]"
                  style={{ color: "rgba(17, 24, 39, 1)" }}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Floating Decorative Icons */}
              {floatingIcons.map((icon, index) => {
                const Icon = icon.icon;
                return (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: icon.delay,
                    }}
                    className={`absolute z-40 flex h-16 w-16 items-center justify-center rounded-[1.25rem] shadow-xl backdrop-blur-md border border-white/30 ${icon.className}`}
                    style={icon.style}
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
