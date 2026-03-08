"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  BookOpen,
  Layout,
  SquareStack,
  MessageSquare,
  TrendingUp, 
  Timer, 
  Target, 
  Calendar, 
  Bot,
  BarChart3,
  ShieldCheck,
  ClipboardCheck,
  Users
} from "lucide-react";
import { RiveMascot } from "@/components/hero/RiveMascot";

const studentFeatures = [
  {
    title: "Unlimited AI practice question",
    description: "Create and practice with unlimited AI-generated questions tailored to your course material.",
    icon: Brain,
    image: "/features/Unlimited_questions.png",
  },
  {
    title: "Infinite canvas mindmapping",
    description: "Visualise complex concepts with our AI-powered infinite canvas for brainstorming and mindmapping.",
    icon: Layout,
    image: "/features/infinite canvas.png",
  },
  {
    title: "Flash cards",
    description: "Generate comprehensive flashcards from your notes and study materials with a single click.",
    icon: SquareStack,
    image: "/features/flashcards.jpeg",
  },
  {
    title: "Notes Bank",
    description: "Store, organise, and revisit your notes in one searchable library.",
    icon: BookOpen,
    image: "/features/Notes_bank.png",
  },
  {
    title: "Examiner-style feedback",
    description: "Get detailed, examiner-style feedback on your practice answers to understand how to improve.",
    icon: MessageSquare,
    image: "/features/Examinar-style feedback.png",
  },
  {
    title: "Progress tracking",
    description: "Monitor your learning journey with detailed analytics and insights into your academic performance.",
    icon: TrendingUp,
    image: "/features/progress_tracking.jpeg",
  },
  {
    title: "Exam simulation",
    description: "Practice under real exam conditions with timed simulations designed to build confidence.",
    icon: Timer,
    image: "/features/exam_simulation.png",
  },
  {
    title: "Targeted weak-point testing",
    description: "Identify and focus on your knowledge gaps with AI-driven targeted testing and practice.",
    icon: Target,
    image: "/features/Targeted_weakpoint_testing.png",
  },
  {
    title: "Personalised Study planner",
    description: "Get a custom-built study schedule that adapts to your pace and academic goals.",
    icon: Calendar,
    image: "/features/study_planner.png",
  },
  {
    title: "AI-tutor support",
    description: "Chat with your personal AI tutor anytime to get help with difficult concepts or questions.",
    icon: Bot,
    image: "/features/AI_tutor.png",
  },
];

const schoolFeatures = [
  {
    title: "Actionable Classroom intelligence",
    description: "Gain deep insights into student performance and engagement to inform teaching strategies.",
    icon: BarChart3,
    image: "https://placehold.co/600x400/3b82f6/white?text=Classroom+Intelligence",
  },
  {
    title: "Curriculum-Aligned AI (You can Trust)",
    description: "Safe and secure AI grounded in the Australian curriculum to support teacher and student needs.",
    icon: ShieldCheck,
    image: "https://placehold.co/600x400/3b82f6/white?text=Curriculum-Aligned+AI",
  },
  {
    title: "Assessment and Reporting tools",
    description: "Streamline grading and generate comprehensive reports with AI-assisted assessment tools.",
    icon: ClipboardCheck,
    image: "https://placehold.co/600x400/3b82f6/white?text=Assessment+Tools",
  },
  {
    title: "School-Wide Oversight",
    description: "Manage and monitor AI usage and academic progress across your entire school community.",
    icon: Users,
    image: "https://placehold.co/600x400/3b82f6/white?text=School-Wide+Oversight",
  },
];

const FeatureCard = ({ feature }: { feature: typeof studentFeatures[0] }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      className="group cursor-pointer rounded-2xl bg-white p-5 border border-primary/5 shadow-sm transition-all hover:shadow-md hover:border-primary/20 flex gap-5 items-start"
      whileHover={{ y: -2 }}
    >
      <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-primary/5 flex items-center justify-center border border-primary/10">
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback to icon if image fails
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement?.classList.add('bg-primary/10');
          }}
        />
        {/* Fallback Icon (always rendered but hidden if image is present) */}
        <Icon className="absolute h-10 w-10 text-primary opacity-0 group-has-[img[style*='display: none']]:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 flex flex-col gap-1.5 pt-1">
        <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

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
