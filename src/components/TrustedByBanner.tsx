"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Marquee } from "./Marquee";

const logos = [
  { src: "/logos/logo_vic.svg", alt: "VCAA (VIC)" },
  { src: "/logos/logo-qcaa.png", alt: "QCAA (QLD)" },
  { src: "/logos/logo-sace-certificate-block.svg", alt: "SACE (SA)" },
  { src: "/logos/logo.png", alt: "SCSA (WA)" },
  { src: "/logos/logo.svg", alt: "NESA (NSW)" },
];

export const TrustedByBanner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.twinkleSpeed = Math.random() * 0.008 + 0.003;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.twinkleSpeed;

        if (this.opacity > 0.6 || this.opacity < 0.1) {
          this.twinkleSpeed *= -1;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(88, 80, 236, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        particles = Array.from({ length: 40 }, () => new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full border-b border-gray-100 bg-white py-14 lg:py-20 overflow-hidden -mt-px">
      {/* Background Canvas Effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-sm font-semibold tracking-[0.05em] text-slate-500 uppercase sm:text-base"
        >
          SKOLAR is built for Australian senior secondary — trusted across…
        </motion.p>

        {/* Logos Marquee with edge fade mask */}
        <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <Marquee className="py-4 [--gap:5rem] lg:[--gap:10rem]">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center grayscale opacity-40 mix-blend-multiply transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain lg:h-12 max-w-[180px]"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
