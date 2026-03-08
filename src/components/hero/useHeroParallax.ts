"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useCallback, RefObject, useRef } from "react";

export const useHeroParallax = (ref?: RefObject<HTMLElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  // Smooth out the mouse values with a premium lag feel
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    let x = 0;
    let y = 0;

    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      x = ((e.clientX - rect.left) / rect.width) - 0.5;
      y = ((e.clientY - rect.top) / rect.height) - 0.5;
    } else {
      // Fallback to window-relative
      const { innerWidth, innerHeight } = window;
      x = (e.clientX / innerWidth) - 0.5;
      y = (e.clientY / innerHeight) - 0.5;
    }
    
    pendingRef.current = { x, y };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (pendingRef.current) {
          mouseX.set(pendingRef.current.x);
          mouseY.set(pendingRef.current.y);
        }
        rafRef.current = null;
      });
    }
  }, [mouseX, mouseY, ref]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handlePointerMove]);

  // Stage transforms (slight overall movement)
  const stageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const stageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const stageRotate = useTransform(smoothX, [-0.5, 0.5], [-1, 1]);

  // Mascot transforms (shallow depth)
  const mascotX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const mascotY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Cards transforms (deep depth - they move more)
  const cardsX = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const cardsY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);

  return {
    stageX,
    stageY,
    stageRotate,
    mascotX,
    mascotY,
    cardsX,
    cardsY,
  };
};
