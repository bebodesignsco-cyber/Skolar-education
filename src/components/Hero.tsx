"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import LiquidBackground from "@/components/LiquidBackground";
import { FloatingIcons } from "@/components/FloatingIcons";

const badges = ["VCE (VCAA)", "HSC (NESA)", "QCE", "SACE", "WACE"];

export const Hero = () => {
  const [hasPlayedSummon, setHasPlayedSummon] = React.useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/animations/octopus.riv",
    stateMachines: "octopus",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const summonInput = useStateMachineInput(rive, "octopus", "Summon");
  const idlingInput = useStateMachineInput(rive, "octopus", "Idling");
  const thinkingInput = useStateMachineInput(rive, "octopus", "Thinking");
  const correctInput = useStateMachineInput(rive, "octopus", "Correct");
  const incorrectInput = useStateMachineInput(rive, "octopus", "Incorrect");

  // Play summon on initial load, then transition to idling
  React.useEffect(() => {
    if (summonInput && idlingInput && !hasPlayedSummon) {
      summonInput.fire();
      setHasPlayedSummon(true);
      // After summon animation completes, go to idle (adjust timing based on animation length)
      const timer = setTimeout(() => {
        idlingInput.fire();
      }, 2000); // Adjust this timing to match your summon animation duration
      return () => clearTimeout(timer);
    }
  }, [summonInput, idlingInput, hasPlayedSummon]);

  const handleClick = () => {
    const animations = [
      { input: incorrectInput, name: "incorrect" },
      { input: correctInput, name: "correct" },
      { input: thinkingInput, name: "thinking" },
    ].filter((a) => a.input !== null);

    if (animations.length === 0) return;

    const randomIndex = Math.floor(Math.random() * animations.length);
    const selected = animations[randomIndex];

    if (selected.input) {
      selected.input.fire();

      // If thinking was selected, go back to idle after one loop
      if (selected.name === "thinking" && idlingInput) {
        setTimeout(() => {
          idlingInput.fire();
        }, 3000); // Adjust timing to match thinking animation duration
      }
    }
  };

  return (
    <div className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      <LiquidBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now available for 2026 cohort
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Australia&apos;s most <span className="text-primary">intelligent</span> AI study companion.
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Curriculum-aligned practice, examiner-style feedback and real learning, not shortcuts. Built specifically for ATAR students.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20">
                Try Skolar Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                For schools and teachers
              </Button>
            </div>

          </div>

          {/* Right Column: Animation */}
          <div 
            className="relative h-[500px] w-full lg:h-[750px] cursor-pointer flex items-center justify-center"
            onClick={handleClick}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -z-10 blur-3xl" />
            <FloatingIcons />
            <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] relative z-10">
              <RiveComponent className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Marquee */}
      <div className="mt-24 border-y bg-white/50 backdrop-blur-sm py-8">
        <div className="container mx-auto mb-6 px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Built specifically for Australian senior secondary curriculum
          </p>
        </div>
        <Marquee className="py-4">
          {badges.concat(badges).map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border bg-white px-8 py-4 shadow-sm transition-all hover:border-primary/50"
            >
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-lg font-bold tracking-tight">{badge}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
