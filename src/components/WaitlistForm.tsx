"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistFormProps {
  className?: string;
  variant?: "default" | "minimal";
}

export const WaitlistForm = ({ className, variant = "default" }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl border border-green-200", className)}
      >
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        <p className="font-medium text-sm">You're on the list! We'll be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form onSubmit={handleSubmit} className={cn("relative flex flex-col sm:flex-row gap-3", variant === "minimal" && "flex-col")}>
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="h-12 sm:h-14 px-5 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white transition-all shadow-sm text-base"
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === "loading"}
          size="lg"
          className="h-12 sm:h-14 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm text-red-500 font-medium ml-1"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
      
      {variant === "default" && status !== "error" && (
        <p className="mt-3 text-sm text-muted-foreground ml-1">
          Join <span className="font-semibold text-foreground">2,000+ students</span> waiting for early access.
        </p>
      )}
    </div>
  );
};
