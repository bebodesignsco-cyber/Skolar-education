"use client";

import React from "react";
import { motion } from "framer-motion";
import { studentFeatures } from "@/lib/features-data";
import { FeatureCard } from "@/components/FeatureCard";
import { RiveMascot } from "@/components/hero/RiveMascot";
import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              For Students
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl">
              Master your ATAR with <span className="text-primary">AI-powered</span> learning.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Skolar provides unlimited practice questions, instant feedback, and personalized study plans to help you achieve your best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentFeatures.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </section>

      {/* Mascot Section */}
      <section className="container px-4 md:px-6 py-12">
        <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-48 h-48 flex-shrink-0">
            <RiveMascot className="w-full h-full" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold">Your Personal AI Study Companion</h2>
            <p className="text-lg text-muted-foreground">
              Never study alone. Our AI mascot guides you through difficult concepts, keeps you motivated, and helps track your progress every step of the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
