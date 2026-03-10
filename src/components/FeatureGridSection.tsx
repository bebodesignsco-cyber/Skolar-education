"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentFeatures, schoolFeatures } from "@/lib/features-data";
import { FeatureCard } from "@/components/FeatureCard";
import { RiveMascot } from "@/components/hero/RiveMascot";

export const FeatureGridSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 bg-primary/[0.02] rounded-[3rem] relative overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          <span>What Skolar Can Do</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          Features built for <span className="text-primary">Success</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Skolar isn't just another AI. It's a comprehensive learning ecosystem designed specifically for the Australian curriculum.
        </p>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <Tabs defaultValue="students" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-primary/10 p-1.5 h-auto rounded-2xl">
              <TabsTrigger 
                value="students" 
                className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 font-bold"
              >
                For Students
              </TabsTrigger>
              <TabsTrigger 
                value="schools" 
                className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 font-bold"
              >
                For Schools
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="students" className="mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {studentFeatures.map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="schools" className="mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {schoolFeatures.map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mascot bottom integration */}
      <div className="mt-20 flex items-center justify-center gap-8 bg-white/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-primary/5 max-w-3xl mx-auto relative z-10">
        <div className="w-32 h-32 flex-shrink-0">
          <RiveMascot className="w-full h-full" />
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-bold mb-2">Need a hand?</h4>
          <p className="text-muted-foreground leading-relaxed">
            Our Skolar mascot isn't just for show – it's your personal AI companion, ready to guide you through every feature and study session.
          </p>
        </div>
      </div>
    </section>
  );
};
