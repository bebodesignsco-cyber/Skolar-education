import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { studentFeatures } from "@/lib/features-data";

export function generateStaticParams() {
  return studentFeatures.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const feature = studentFeatures.find((f) => f.slug === slug);
  if (!feature) return {};
  return {
    title: `${feature.title} | Skolar Education`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const feature = studentFeatures.find((f) => f.slug === slug);

  if (!feature) {
    notFound();
  }

  const Icon = feature.icon;
  const otherFeatures = studentFeatures.filter((f) => f.slug !== slug);

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text side */}
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Feature Spotlight
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                {feature.title}
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
                {feature.tagline}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="h-13 px-8 text-base font-bold">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base font-bold"
                  asChild
                >
                  <Link href="/#features">See All Features</Link>
                </Button>
              </div>
            </div>

            {/* Image side */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-white shadow-xl shadow-primary/5">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative blob */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Benefits Grid ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Key Benefits
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to study smarter, built right in.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            {feature.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-primary/[0.03] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              {feature.howItWorks.length} simple steps to get started.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6">
            {feature.howItWorks.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-6 rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="pt-2 text-lg font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Other Features ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Explore More Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover everything Skolar has to offer.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherFeatures.map((f) => {
              const OtherIcon = f.icon;
              return (
                <Link
                  key={f.slug}
                  href={`/features/${f.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <OtherIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold group-hover:text-primary transition-colors">
                      {f.title}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {f.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-center text-white md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Ready to try {feature.title}?
              </h2>
              <p className="mx-auto max-w-md text-lg text-white/80">
                Join thousands of Australian students already studying smarter with Skolar.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-base font-bold"
              >
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
