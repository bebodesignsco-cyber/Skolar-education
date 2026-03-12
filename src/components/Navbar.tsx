"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { studentFeatures } from "@/lib/features-data";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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
            <DropdownMenuContent align="start" className="w-[420px] p-4 max-h-[70vh] overflow-y-auto">
              <div className="grid gap-2">
                {studentFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <DropdownMenuItem key={feature.slug} asChild>
                      <Link
                        href={`/features/${feature.slug}`}
                        className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">{feature.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {feature.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/students"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Students
          </Link>
          <Link
            href="/teachers"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Teachers
          </Link>
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
          <Button
            size="sm"
            onClick={() => {
              const heroSection = document.getElementById("hero-section");
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Join Waitlist
          </Button>
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
        <div className="border-t bg-background p-4 md:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Features
            </div>
            {studentFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.slug}
                  href={`/features/${feature.slug}`}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.title}</span>
                </Link>
              );
            })}
            <hr className="my-2" />
            <Link
              href="/students"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Students
            </Link>
            <Link
              href="/teachers"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Teachers
            </Link>
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
              <Button
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  const heroSection = document.getElementById("hero-section");
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
