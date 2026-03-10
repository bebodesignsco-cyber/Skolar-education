"use client";

import React from "react";
import { motion } from "framer-motion";
import { schoolFeatures } from "@/lib/features-data";
import { FeatureCard } from "@/components/FeatureCard";
import { RiveMascot } from "@/components/hero/RiveMascot";
import { Button } from "@/components/ui/button";

export default function TeachersPage() {
  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              For Teachers & Schools
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl">
              Empower your classroom with <span className="text-primary">intelligent</span> insights.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Skolar simplifies grading, provides deep student analytics, and offers curriculum-aligned resources to enhance your teaching.
            </p>
             <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {schoolFeatures.map((feature, idx) => (
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
            <h2 className="text-3xl font-bold">Reliable AI Assistant</h2>
            <p className="text-lg text-muted-foreground">
              Trust in a system built for the Australian curriculum. Our AI helps you create content, assess work, and identify student needs with precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
