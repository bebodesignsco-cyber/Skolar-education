"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Rocket, BookOpen, Calendar, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Practice Questions",
    description: "AI-powered feedback with rubric alignment.",
    icon: BookOpen,
    href: "/features/practice-questions",
  },
  {
    title: "Learning Visuals",
    description: "The Learning Hexagon and topic-level heatmaps.",
    icon: Rocket,
    href: "/features/learning-visuals",
  },
  {
    title: "Planner & Calendar",
    description: "Reminders and completion tracking.",
    icon: Calendar,
    href: "/features/planner",
  },
  {
    title: "Teacher Analytics",
    description: "Classroom Pulse and student comparison views.",
    icon: BarChart3,
    href: "/features/teacher-analytics",
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState<"student" | "school">("student");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logos/Skolar Logo.png"
            alt="Skolar Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">SKOLAR</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-4">
              <div className="grid gap-4">
                {features.map((feature) => (
                  <DropdownMenuItem key={feature.title} asChild>
                    <Link
                      href={feature.href}
                      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{feature.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {feature.description}
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Student/School Toggle */}
          <div className="flex items-center rounded-full bg-muted p-1">
            <button
              onClick={() => setUserType("student")}
              className={cn(
                "rounded-full px-4 py-1 text-xs font-medium transition-all",
                userType === "student" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              )}
            >
              Students
            </button>
            <button
              onClick={() => setUserType("school")}
              className={cn(
                "rounded-full px-4 py-1 text-xs font-medium transition-all",
                userType === "school" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              )}
            >
              Schools
            </button>
          </div>

          <Button size="sm">Try Skolar Free</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Features
            </div>
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.title}</span>
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/pricing"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full">Try Skolar Free</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
