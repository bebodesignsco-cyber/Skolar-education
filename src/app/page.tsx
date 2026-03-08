"use client";

import { Hero } from "@/components/hero/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { FeatureGridSection } from "@/components/FeatureGridSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, BookOpen, Atom, Globe, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const floatingIcons = [
    { Icon: Calculator, color: "bg-blue-400", delay: 0, x: -160, y: -60 },
    { Icon: BookOpen, color: "bg-emerald-400", delay: 0.5, x: 160, y: -80 },
    { Icon: Atom, color: "bg-purple-400", delay: 1, x: -140, y: 120 },
    { Icon: Globe, color: "bg-sky-400", delay: 1.5, x: 140, y: 100 },
    { Icon: FlaskConical, color: "bg-rose-400", delay: 2, x: 0, y: -180 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-24">
      <Hero />
      <FeaturesGrid />
      <InteractiveDemo />
      <FeatureGridSection />
      <FAQ />

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-600 opacity-50" />
          
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Ready to master your ATAR?
              </h2>
              <p className="text-xl text-white/80">
                Join thousands of students across Australia using Skolar to improve their results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Try Skolar Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white/40 hover:bg-white/10 text-white bg-transparent rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  For Schools
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center items-center h-[400px]">
              {/* Floating Icons */}
              {floatingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    y: [item.y, item.y - 15, item.y],
                    x: [item.x, item.x + 10, item.x]
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.5 + item.delay },
                    scale: { duration: 0.5, delay: 0.5 + item.delay },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: item.delay },
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay }
                  }}
                  className={`absolute z-20 p-3 rounded-2xl shadow-lg ${item.color} text-white`}
                  style={{ 
                    left: '50%',
                    top: '50%',
                    marginLeft: '-24px', // Half of icon width (approx)
                    marginTop: '-24px'   // Half of icon height (approx)
                  }}
                >
                  <item.Icon className="h-6 w-6" />
                </motion.div>
              ))}

              {/* Mascot */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-64 sm:w-80 h-auto"
              >
                <img 
                  src="/Mascot_static/meditation.png" 
                  alt="Skolar Mascot" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-blue-400/20 blur-[100px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
