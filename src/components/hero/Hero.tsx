"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { RiveMascot } from "./RiveMascot";
import { useHeroParallax } from "./useHeroParallax";
import LiquidBackground from "@/components/LiquidBackground";

import { TrustedByBanner } from "../TrustedByBanner";

const floatingCards = [
  { 
    title: "AI Study Notes", 
    description: "Generate notes from any material",
    icon: "📝", 
    top: "15%", 
    left: "10%", 
    delay: 0.8,
    floatDuration: 4.2,
    floatAmount: 12
  },
  { 
    title: "Practice Exams", 
    description: "Personalized tests for you",
    icon: "✍️", 
    top: "20%", 
    right: "8%", 
    delay: 1.0,
    floatDuration: 3.8,
    floatAmount: 14
  },
  { 
    title: "Smart Flashcards", 
    description: "Active recall made easy",
    icon: "🗂️", 
    bottom: "18%", 
    left: "12%", 
    delay: 1.2,
    floatDuration: 5.1,
    floatAmount: 10
  },
  { 
    title: "24/7 AI Tutor", 
    description: "Get answers instantly",
    icon: "🤖", 
    bottom: "22%", 
    right: "10%", 
    delay: 0.9,
    floatDuration: 4.6,
    floatAmount: 13
  },
];

const decorativeDots = [
  { top: "10%", left: "40%", size: 4, delay: 1.4 },
  { top: "40%", right: "20%", size: 6, delay: 1.5 },
  { bottom: "30%", left: "25%", size: 5, delay: 1.6 },
  { top: "70%", right: "45%", size: 4, delay: 1.7 },
];

export const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { 
    stageX, stageY, stageRotate, 
    mascotX, mascotY, 
    cardsX, cardsY 
  } = useHeroParallax(containerRef);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const floatMultiplier = isMobile ? 0.6 : 1;

  return (
    <>
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-0 lg:pt-32 lg:pb-0">
      {/* Background Decor with Diagonal Mask */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(170deg, black 30%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(170deg, black 30%, transparent 70%)'
        }}
      >
        <LiquidBackground position="absolute" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Next-gen AI Study Platform</span>
            </motion.div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1]">
              Australia&apos;s most <span className="text-primary">intelligent</span> AI study companion.
            </h1>
            
            <p className="mt-6 max-w-xl text-lg text-gray-600 sm:text-xl leading-relaxed">
              Unlock your academic potential with our AI-powered study companion. 
              Built to help you master any subject with personalized feedback and practice.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 rounded-2xl w-full sm:w-auto transition-all hover:scale-[1.02] active:scale-[0.98]">
                Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold rounded-2xl w-full sm:w-auto hover:bg-gray-50 transition-all">
                See how it works
              </Button>
            </div>

          </motion.div>

          {/* Right Column: Animated Stage */}
          <div ref={containerRef} className="relative flex items-center justify-center min-h-[500px] lg:min-h-[650px] w-full">
            <motion.div 
              style={{ 
                x: stageX, 
                y: stageY, 
                rotate: stageRotate 
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl opacity-60 -z-10" />

              {/* Decorative Dots */}
              {decorativeDots.map((dot, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: dot.delay, duration: 0.4 }}
                  className="absolute bg-primary/20 rounded-full"
                  style={{ 
                    ...dot,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}

              {/* Floating UI Cards */}
              {floatingCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: card.delay, 
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  style={{
                    top: card.top,
                    left: card.left,
                    right: card.right,
                    bottom: card.bottom,
                    x: cardsX,
                    y: cardsY,
                  }}
                  className="absolute z-20"
                >
                  <motion.div
                    animate={{
                      y: [0, -card.floatAmount * floatMultiplier, 0],
                      rotate: [-1, 1, -1],
                    }}
                    transition={{
                      duration: card.floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 flex items-start gap-4 min-w-[180px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-inner">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{card.title}</h3>
                      <p className="text-[10px] text-gray-500 font-medium">{card.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Central Mascot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{
                  x: mascotX,
                  y: mascotY,
                }}
                className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] aspect-square"
              >
                <motion.div
                  animate={{
                    y: [0, -12 * floatMultiplier, 0],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full"
                >
                  <RiveMascot 
                    src="/animations/octopus.riv"
                    stateMachine="octopus"
                    className="w-full h-full"
                  />
                </motion.div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
    <TrustedByBanner />
    </>
  );
};
