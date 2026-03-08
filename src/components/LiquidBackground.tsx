"use client";

import { useEffect, useRef } from "react";

type Point2D = {
  x: number;
  y: number;
};

type RibbonGeometry = {
  top: Point2D[];
  bottom: Point2D[];
  center: Point2D[];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type RibbonLayerStyle = {
  amplitudeScale: number;
  widthScale: number;
  frequencyScale: number;
  noiseScale: number;
  opacity: number;
  blur: number;
  colors: { stop: number; color: string }[];
};

/**
 * LiquidBackground Component
 * 
 * A bold animated ribbon background that appears behind all page content.
 * This component renders a canvas with an oscillating ribbon that flows diagonally
 * from the bottom-left to the top-right of the screen so it covers the full page.
 * 
 * The animation:
 * - Creates a diagonal ribbon path from bottom-left to top-right
 * - Uses multiple layered fills plus a highlight line and droplets
 * - Oscillates smoothly while keeping a ribbon-like silhouette
 * - Respects user's reduced motion preferences
 * - Automatically resizes with the viewport
 */
export default function LiquidBackground({ position = "fixed" }: { position?: "fixed" | "absolute" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const pixelRatioRef = useRef(1);
  const lastTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const gradientsRef = useRef<CanvasGradient[] | null>(null);
  const boundsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ribbonConfig = {
      baseAmplitude: 160,
      baseWidth: 420,
      waveFrequency: 4.5,
      speed: 1.36, // 70% faster than the previous 0.8 speed
      startXPercent: -0.15,
      startYPercent: 1.1,
      endXPercent: 1.1,
      endYPercent: -0.05,
    };

    const ribbonLayers: RibbonLayerStyle[] = [
      {
        amplitudeScale: 1.2,
        widthScale: 1.3,
        frequencyScale: 0.95,
        noiseScale: 0.35,
        opacity: 0.35, // Increased from 0.25
        blur: 45,
        colors: [
          { stop: 0, color: "#D1D5DB" }, // Cool Grey 300
          { stop: 0.5, color: "#9CA3AF" }, // Cool Grey 400
          { stop: 1, color: "#818CF8" }, // Indigo 400 tint
        ],
      },
      {
        amplitudeScale: 1,
        widthScale: 1,
        frequencyScale: 1,
        noiseScale: 0.25,
        opacity: 0.5, // Increased from 0.4
        blur: 22,
        colors: [
          { stop: 0, color: "#E5E7EB" }, // Cool Grey 200
          { stop: 0.35, color: "#BFDBFE" }, // Blue 200
          { stop: 0.7, color: "#D1D5DB" }, // Cool Grey 300
          { stop: 1, color: "#C084FC" }, // Purple 400
        ],
      },
      {
        amplitudeScale: 0.85,
        widthScale: 0.75,
        frequencyScale: 1.15,
        noiseScale: 0.18,
        opacity: 0.75, // Increased from 0.6
        blur: 10,
        colors: [
          { stop: 0, color: "#FFFFFF" },
          { stop: 0.5, color: "#DBEAFE" }, // Blue 100 tint
          { stop: 1, color: "#E0E7FF" }, // Indigo 100 tint
        ],
      },
    ];

    const highlightConfig = {
      offset: 0.12, // relative to ribbon width so it stays closer to the ribbon core
      lineWidth: 2,
      shadowBlur: 22,
    };

    const droplets = Array.from({ length: 8 }, () => ({
      baseProgress: Math.random(),
      offset: (Math.random() - 0.5) * 0.6,
      radius: 2 + Math.random() * 2.5,
      speed: 0.12 + Math.random() * 0.1,
    }));

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    // Set canvas size to match viewport
    function setCanvasBounds() {
      if (!canvas || !ctx) return;

      pixelRatioRef.current = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      boundsRef.current = { width, height };

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = width * pixelRatioRef.current;
      canvas.height = height * pixelRatioRef.current;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatioRef.current, pixelRatioRef.current);

      gradientsRef.current = ribbonLayers.map((layer) => {
        const gradient = ctx.createLinearGradient(
          width * ribbonConfig.startXPercent,
          height * ribbonConfig.startYPercent,
          width * ribbonConfig.endXPercent,
          height * ribbonConfig.endYPercent
        );
        layer.colors.forEach((stop) => gradient.addColorStop(stop.stop, stop.color));
        return gradient;
      });
    }

    function buildRibbonGeometry(
      width: number,
      height: number,
      time: number,
      layerStyle: RibbonLayerStyle
    ): RibbonGeometry | null {
      if (!ctx) return null;

      const startX = width * ribbonConfig.startXPercent;
      const startY = height * ribbonConfig.startYPercent;
      const endX = width * ribbonConfig.endXPercent;
      const endY = height * ribbonConfig.endYPercent;

      const dx = endX - startX;
      const dy = endY - startY;
      const pathLength = Math.sqrt(dx * dx + dy * dy);
      if (pathLength === 0) {
        return null;
      }

      const angle = Math.atan2(dy, dx);
      const perpAngle = angle + Math.PI / 2;
      const pointSpacing = width < 768 ? 3.6 : 3.1;
      const numPoints = Math.max(200, Math.floor(pathLength / pointSpacing));

      const top: Point2D[] = [];
      const bottom: Point2D[] = [];
      const center: Point2D[] = [];

      for (let i = 0; i <= numPoints; i++) {
        const progress = i / numPoints;
        const distance = progress * pathLength;

        const baseX = startX + Math.cos(angle) * distance;
        const baseY = startY + Math.sin(angle) * distance;

        const amplitude = ribbonConfig.baseAmplitude * layerStyle.amplitudeScale;
        const waveFrequency =
          ribbonConfig.waveFrequency * layerStyle.frequencyScale;

        const primary =
          Math.sin(progress * waveFrequency * Math.PI + time * ribbonConfig.speed) *
          amplitude;
        const secondary =
          Math.cos(
            progress * waveFrequency * 0.6 * Math.PI - time * ribbonConfig.speed * 0.8
          ) *
          amplitude *
          0.5;
        const shimmer =
          Math.sin(time * 1.8 + progress * 7) *
          amplitude *
          layerStyle.noiseScale;

        const totalOffset = primary + secondary + shimmer;

        const centerX = baseX + Math.cos(perpAngle) * totalOffset;
        const centerY = baseY + Math.sin(perpAngle) * totalOffset;
        center.push({ x: centerX, y: centerY });

        const widthVariation = 0.85 + Math.sin(progress * Math.PI) * 0.5;
        const currentHalfWidth =
          (ribbonConfig.baseWidth * layerStyle.widthScale * widthVariation) / 2;

        const topX = centerX + Math.cos(perpAngle) * currentHalfWidth;
        const topY = centerY + Math.sin(perpAngle) * currentHalfWidth;
        const bottomX = centerX - Math.cos(perpAngle) * currentHalfWidth;
        const bottomY = centerY - Math.sin(perpAngle) * currentHalfWidth;

        top.push({ x: topX, y: topY });
        bottom.push({ x: bottomX, y: bottomY });
      }

      return { top, bottom, center, startX, startY, endX, endY };
    }

    function drawRibbonLayer(
      geometry: RibbonGeometry | null,
      layerStyle: RibbonLayerStyle,
      layerIndex: number
    ) {
      if (!ctx || !geometry) return;

      ctx.save();
      ctx.globalAlpha = layerStyle.opacity;
      ctx.filter = `blur(${layerStyle.blur}px)`;
      ctx.beginPath();

      ctx.moveTo(geometry.top[0].x, geometry.top[0].y);
      for (let i = 1; i < geometry.top.length; i++) {
        ctx.lineTo(geometry.top[i].x, geometry.top[i].y);
      }
      for (let i = geometry.bottom.length - 1; i >= 0; i--) {
        ctx.lineTo(geometry.bottom[i].x, geometry.bottom[i].y);
      }
      ctx.closePath();
      const gradient = gradientsRef.current?.[layerIndex];
      if (gradient) {
        ctx.fillStyle = gradient;
      } else {
        const fallback = ctx.createLinearGradient(
          geometry.startX,
          geometry.startY,
          geometry.endX,
          geometry.endY
        );
        layerStyle.colors.forEach((stop) => fallback.addColorStop(stop.stop, stop.color));
        ctx.fillStyle = fallback;
      }
      ctx.fill();
      ctx.restore();
    }

    function drawHighlight(geometry: RibbonGeometry | null) {
      if (!ctx || !geometry) return;

      ctx.save();
      ctx.beginPath();

      for (let i = 0; i < geometry.center.length; i++) {
        const point = geometry.center[i];
        const topPoint = geometry.top[i];
        const bottomPoint = geometry.bottom[i];
        const normalX = topPoint.x - bottomPoint.x;
        const normalY = topPoint.y - bottomPoint.y;
        const length = Math.sqrt(normalX * normalX + normalY * normalY) || 1;
        const nx = normalX / length;
        const ny = normalY / length;

        const offset = ribbonConfig.baseWidth * highlightConfig.offset;
        const hx = point.x + nx * offset;
        const hy = point.y + ny * offset;

        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }

      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = highlightConfig.lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255,255,255,0.7)";
      ctx.shadowBlur = highlightConfig.shadowBlur;
      ctx.stroke();
      ctx.restore();
    }

    function samplePoint(points: Point2D[], progress: number): Point2D {
      const clamped = Math.max(0, Math.min(1, progress));
      const maxIndex = points.length - 1;
      const exactIndex = clamped * maxIndex;
      const lowerIndex = Math.floor(exactIndex);
      const upperIndex = Math.min(maxIndex, Math.ceil(exactIndex));
      const t = exactIndex - lowerIndex;
      const lower = points[lowerIndex];
      const upper = points[upperIndex];
      return {
        x: lower.x + (upper.x - lower.x) * t,
        y: lower.y + (upper.y - lower.y) * t,
      };
    }

    function drawDroplets(geometry: RibbonGeometry | null, time: number) {
      if (!ctx || !geometry) return;

      ctx.save();
      droplets.forEach((drop) => {
        const travel = (drop.baseProgress + time * drop.speed) % 1;
        const centerPoint = samplePoint(geometry.center, travel);
        const topPoint = samplePoint(geometry.top, travel);
        const bottomPoint = samplePoint(geometry.bottom, travel);

        const normalX = topPoint.x - bottomPoint.x;
        const normalY = topPoint.y - bottomPoint.y;
        const length = Math.sqrt(normalX * normalX + normalY * normalY) || 1;
        const nx = normalX / length;
        const ny = normalY / length;

        const offset =
          drop.offset * (ribbonConfig.baseWidth * 0.4) +
          Math.sin(time * 3 + travel * 12) * 6;
        const dropX = centerPoint.x + nx * offset;
        const dropY = centerPoint.y + ny * offset;

        const gradient = ctx.createRadialGradient(
          dropX,
          dropY,
          0,
          dropX,
          dropY,
          drop.radius * 4
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.75)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dropX, dropY, drop.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // Draw a complete frame
    function drawFrame(time: number) {
      if (!canvas || !ctx) return;

      lastTimeRef.current = time;
      const { width, height } = boundsRef.current;

      ctx.clearRect(0, 0, width, height);

      const geometries = ribbonLayers
        .map((layer, index) => ({
          geometry: buildRibbonGeometry(width, height, time, layer),
          layer,
          index,
        }))
        .filter(
          (entry): entry is {
            geometry: RibbonGeometry;
            layer: RibbonLayerStyle;
            index: number;
          } => Boolean(entry.geometry)
        );

      geometries.forEach(({ geometry, layer, index }) =>
        drawRibbonLayer(geometry, layer, index)
      );

      const featureGeometry =
        geometries[Math.floor(geometries.length / 2)]?.geometry ??
        geometries[0]?.geometry ??
        null;

      drawHighlight(featureGeometry);
      drawDroplets(featureGeometry, time);
    }

    // Start the animation loop
    function shouldAnimate() {
      return (
        !prefersReducedMotion.matches &&
        document.visibilityState === "visible" &&
        isVisibleRef.current
      );
    }

    function stopAnimation() {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    }

    function startAnimation() {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (!shouldAnimate()) {
        drawFrame(lastTimeRef.current);
        return;
      }

      const render = (now: number) => {
        if (!shouldAnimate()) {
          stopAnimation();
          return;
        }
        drawFrame(now * 0.001);
        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);
    }

    // Initialize
    setCanvasBounds();
    startAnimation();

    // Handle window resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCanvasBounds();
        drawFrame(lastTimeRef.current);
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (isVisibleRef.current) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05, rootMargin: "200px" }
    );

    observer.observe(canvas);

    // Handle reduced motion preference changes
    const handleMotionChange = () => {
      startAnimation();
    };

    prefersReducedMotion.addEventListener("change", handleMotionChange);

    // Cleanup on unmount
    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      prefersReducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${position} inset-0 w-full h-full -z-10 pointer-events-none`}
      aria-hidden="true"
      style={{ opacity: 0.65 }}
    />
  );
}

