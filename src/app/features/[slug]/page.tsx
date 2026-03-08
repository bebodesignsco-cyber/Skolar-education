import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ShieldCheck, GraduationCap, Laptop } from "lucide-react";
import Image from "next/image";

// Dummy data for features
const featuresData = {
  "practice-questions": {
    title: "Practice Questions",
    tagline: "AI-powered feedback with rubric alignment.",
    description: "Get examiner-grade feedback on every response. Our AI breaks down exactly where marks are earned and where you can improve, aligned directly to your state curriculum.",
    atarOutcome: "Improve mark capture and build exam confidence by practicing with questions that mirror actual ATAR assessments.",
    howItWorks: [
      "Select your subject and topic area.",
      "Attempt a question using our interactive interface.",
      "Receive instant, detailed feedback with mark breakdowns.",
      "Refine your answer based on examiner commentary."
    ],
    stateAlignment: "Mapped to VCE, HSC, QCE, SACE, and WACE study designs."
  },
  "learning-visuals": {
    title: "Learning Visuals",
    tagline: "The Learning Hexagon and topic-level heatmaps.",
    description: "Visualize your progress like never before. See exactly where you stand in every subject with our proprietary Learning Hexagon model.",
    atarOutcome: "Identify and close knowledge gaps before they become exam-day problems.",
    howItWorks: [
      "Complete practice sets and assessments.",
      "Skolar maps your performance across 6 key cognitive dimensions.",
      "View heatmaps to see which topics need urgent attention.",
      "Track your mastery progression over time."
    ],
    stateAlignment: "Uses cognitive verbs and performance standards from your state's syllabus."
  }
};

export default async function FeaturePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const feature = featuresData[slug as keyof typeof featuresData];

  if (!feature) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-24 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="bg-primary/5 text-primary">Feature Spotlight</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{feature.title}</h1>
          <p className="text-xl text-muted-foreground">{feature.tagline}</p>
          <div className="pt-6">
            <Button size="lg" className="h-14 px-10 text-lg font-bold">
              Try {feature.title} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="bg-white/50 backdrop-blur-sm border-y py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Why it matters for your ATAR</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.atarOutcome}
                </p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <div className="flex items-center gap-3 text-primary font-bold mb-2">
                  <ShieldCheck className="h-5 w-5" />
                  Built for Australia
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.stateAlignment}
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-[2rem] bg-muted/50 border-2 border-dashed border-muted flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Visual Walkthrough Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">How it works</h2>
            <p className="text-muted-foreground">Four simple steps to mastery.</p>
          </div>
          
          <div className="grid gap-8">
            {feature.howItWorks.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {i + 1}
                </div>
                <p className="text-lg font-medium pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-muted/30 rounded-[3rem] p-12 text-center space-y-8">
          <h2 className="text-3xl font-bold">Start using {feature.title} today</h2>
          <Button size="lg" className="h-14 px-10 text-lg font-bold">
            Get Started for Free
          </Button>
        </div>
      </section>
    </div>
  );
}
