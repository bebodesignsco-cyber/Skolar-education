import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Skolar aligned with my specific state curriculum?",
    answer: "Yes! Skolar is explicitly built for the Australian curriculum. We support VCE (VCAA), HSC (NESA), QCE (QCAA), SACE, and WACE. Every question and feedback loop is mapped to the relevant study design or syllabus."
  },
  {
    question: "How does the AI marking work?",
    answer: "Our AI is trained on state-specific marking rubrics and thousands of examiner reports. It doesn't just give a grade; it breaks down exactly where you earned marks and where you missed them, providing commentary in the style of an ATAR examiner."
  },
  {
    question: "Is this considered 'cheating' or 'academic shortcuts'?",
    answer: "Absolutely not. Skolar is designed for learning, not just answers. We focus on showing you the 'why' behind correct responses and helping you build the skills needed for your actual exams."
  },
  {
    question: "Can teachers and schools use Skolar?",
    answer: "Yes, we have a dedicated School Enterprise version that includes a Teacher Dashboard, Classroom Pulse analytics, and student progress tracking. Contact us for a demo."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! You can try Skolar for free to experience the AI feedback and practice questions. No credit card is required to start."
  }
];

export const FAQ = () => {
  return (
    <section className="container mx-auto px-4 py-24 max-w-3xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about Skolar.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-b py-2">
            <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
