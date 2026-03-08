"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, GraduationCap, BookOpenCheck } from "lucide-react";

const states = [
  {
    id: "vce",
    name: "VCE (Victoria)",
    description: "Fully aligned with VCAA study designs for all major subjects.",
    features: ["VCAA Rubric Integration", "Past Exam Patterns", "Study Design Alignment"],
  },
  {
    id: "hsc",
    name: "HSC (NSW)",
    description: "Built for NESA syllabus requirements and examiner standards.",
    features: ["NESA Syllabus Mapping", "Band 6 Model Answers", "Examiner Insight"],
  },
  {
    id: "qce",
    name: "QCE (QLD)",
    description: "Tailored for the QCAA assessment system and cognitive verbs.",
    features: ["QCAA Cognitive Verbs", "ISMG Alignment", "Subject Matter Mastery"],
  },
  {
    id: "sace",
    name: "SACE (SA)",
    description: "Meeting the specific performance standards of South Australia.",
    features: ["Performance Standards", "SACE Assessment types", "Skills Development"],
  },
  {
    id: "wace",
    name: "WACE (WA)",
    description: "Aligning with the WA School Curriculum and Standards Authority.",
    features: ["SCSA Alignment", "ATAR Exam Preparation", "Course Content Focus"],
  },
];

export const StateTabs = () => {
  return (
    <section className="container mx-auto px-4 py-24 bg-primary/[0.02] rounded-[3rem]">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">State-specific excellence</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Skolar isn&apos;t a generic AI. We&apos;ve mapped every prompt and feedback loop to your specific state curriculum.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <Tabs defaultValue="vce" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-muted/50">
            {states.map((state) => (
              <TabsTrigger
                key={state.id}
                value={state.id}
                className="py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                {state.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {states.map((state) => (
            <TabsContent key={state.id} value={state.id} className="mt-8">
              <Card className="border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{state.name} Alignment</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {state.description} Our AI is trained on thousands of pages of {state.id.toUpperCase()} specific examiners&apos; reports and marking guidelines.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {state.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-12">
                      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-primary/5 border border-primary/5">
                        <GraduationCap className="h-8 w-8 text-primary mb-4" />
                        <h4 className="font-bold">ATAR Focused</h4>
                        <p className="text-xs text-muted-foreground mt-1">Every response is optimized for maximal mark capture.</p>
                      </div>
                      <div className="rounded-3xl bg-primary text-white p-6 shadow-xl shadow-primary/20">
                        <BookOpenCheck className="h-8 w-8 mb-4" />
                        <h4 className="font-bold">Rubric Aware</h4>
                        <p className="text-xs text-white/80 mt-1">Directly referencing your state marking criteria.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="aspect-[4/5] rounded-3xl bg-muted/50 flex items-center justify-center border-2 border-dashed border-muted overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                         <span className="text-muted-foreground font-bold text-center p-4">Subject-level specific fine-tuning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
