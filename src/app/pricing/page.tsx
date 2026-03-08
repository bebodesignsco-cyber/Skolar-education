"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, Building2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const studentPlans = [
  {
    name: "Free",
    price: "$0",
    period: undefined,
    description: "Experience the power of Skolar AI.",
    features: [
      "5 Practice Questions per day",
      "Basic AI Feedback",
      "VCE/HSC/QCE Alignment",
      "Limited Study Planner",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Everything you need for ATAR success.",
    features: [
      "Unlimited Practice Questions",
      "Examiner-Grade AI Marking",
      "Learning Hexagon Visuals",
      "Priority AI Support",
      "Advanced Study Planner",
      "Timed Exam Simulations",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Yearly",
    price: "$249",
    period: "/year",
    description: "Best value for the full school year.",
    features: [
      "Everything in Pro",
      "Save 30% vs Monthly",
      "Offline Mode Access",
      "Parental Progress Reports",
    ],
    cta: "Select Yearly",
    popular: false,
  },
];

const schoolPlans = [
  {
    name: "Small School",
    price: "Custom",
    period: undefined,
    description: "For small cohorts and single departments.",
    features: [
      "Up to 100 students",
      "Teacher Dashboard",
      "Classroom Pulse Analytics",
      "Department-level insights",
    ],
    cta: "Contact Sales",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: undefined,
    description: "Full institutional rollout with integrations.",
    features: [
      "Unlimited students",
      "LMS Integration (Canvas/Moodle)",
      "Dedicated Success Manager",
      "Custom reporting & analytics",
      "Professional Development for staff",
    ],
    cta: "Contact Sales",
    popular: true,
  },
];

export default function PricingPage() {
  const [userType, setUserType] = useState<"student" | "school">("student");
  
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

  React.useEffect(() => {
    if (summonInput && idlingInput && !hasPlayedSummon) {
      summonInput.fire();
      setHasPlayedSummon(true);
      const timer = setTimeout(() => {
        idlingInput.fire();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [summonInput, idlingInput, hasPlayedSummon]);

  const handleMascotClick = () => {
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

      if (selected.name === "thinking" && idlingInput) {
        setTimeout(() => {
          idlingInput.fire();
        }, 3000);
      }
    }
  };

  const plans = userType === "student" ? studentPlans : schoolPlans;

  return (
    <div className="flex flex-col gap-24 py-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Simple, transparent pricing.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your study needs and start mastering your ATAR today.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center rounded-2xl bg-muted p-1.5 border">
            <button
              onClick={() => setUserType("student")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold transition-all",
                userType === "student" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GraduationCap className="h-4 w-4" />
              For Students
            </button>
            <button
              onClick={() => setUserType("school")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold transition-all",
                userType === "school" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Building2 className="h-4 w-4" />
              For Schools
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 relative">
        {/* Mascot for Recommended Plan */}
        {userType === "student" && (
           <div 
             className="absolute top-0 right-[25%] hidden xl:block w-48 h-48 -translate-y-full translate-x-12 cursor-pointer"
             onClick={handleMascotClick}
           >
             <div className="relative w-full h-full">
               <RiveComponent />
               <div className="absolute -bottom-4 right-0 bg-white border rounded-2xl p-3 shadow-lg text-xs font-bold whitespace-nowrap">
                 Most students choose this!
               </div>
             </div>
           </div>
        )}

        <div className={cn(
          "grid gap-8 max-w-6xl mx-auto",
          userType === "student" ? "md:grid-cols-3" : "md:grid-cols-2 max-w-4xl"
        )}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col p-8 rounded-[2.5rem] border-2 bg-white transition-all",
                plan.popular ? "border-primary shadow-2xl shadow-primary/10 scale-105 z-10" : "border-border hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" /> Recommended
                </div>
              )}

              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "default" : "outline"} 
                size="lg" 
                className={cn(
                  "w-full h-14 rounded-2xl text-lg font-bold",
                  plan.popular ? "shadow-lg shadow-primary/20" : ""
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison or Proof Section */}
      <section className="container mx-auto px-4 py-12 text-center max-w-3xl">
        <p className="text-muted-foreground">
          All plans include 256-bit encryption for your data security. 
          School plans include dedicated onboarding and implementation support.
        </p>
      </section>
    </div>
  );
}
