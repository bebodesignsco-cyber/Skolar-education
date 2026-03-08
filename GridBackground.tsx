"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface GridBackgroundProps {
    dotColor?: string;
    glowColor?: string;
    spacing?: number;
}

/**
 * GridBackground Component
 * 
 * Renders a dotted grid background with a glowing cursor effect.
 * Inspired by FloraFauna.ai, adapted for Light Mode.
 * 
 * Behavior:
 * - Renders on all pages EXCEPT the Dashboard.
 * - Draws a grid of subtle dots.
 * - Cursor acts as a light source, making dots near it glow with the primary brand color.
 */
export default function GridBackground({
    dotColor = "#cbd5e1", // Slate-300 (Subtler Grey)
    glowColor = "#b1a8ff", // Primary Blue glow
    spacing = 20, // Tighter spacing
}: GridBackgroundProps) {
    const pathname = usePathname();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    // Don't render on the dashboard (it has its own liquid background)
    const isDashboard = pathname === "/student/dashboard";

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Helper to convert hex to rgb
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    useEffect(() => {
        if (!canvasRef.current || isDashboard) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Pre-calculate RGB values for interpolation
        const baseRgb = hexToRgb(dotColor) || { r: 148, g: 163, b: 184 }; // Fallback
        const glowRgb = hexToRgb(glowColor) || { r: 66, g: 85, b: 255 }; // Fallback

        let animationFrameId: number;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grid settings
            const rows = Math.ceil(canvas.height / spacing);
            const cols = Math.ceil(canvas.width / spacing);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * spacing;
                    const y = i * spacing;

                    // Calculate distance from mouse
                    const dx = mousePos.x - x;
                    const dy = mousePos.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let alpha = 0.3; // Base opacity
                    let r = baseRgb.r;
                    let g = baseRgb.g;
                    let b = baseRgb.b;

                    const glowRadius = 300; // Wider glow radius for smoother feathering

                    if (distance < glowRadius) {
                        // Calculate normalized distance (0 to 1, where 1 is center)
                        const normDist = 1 - (distance / glowRadius);
                        
                        // Use smoothstep for smoother feathering: t * t * (3 - 2 * t)
                        const intensity = normDist * normDist * (3 - 2 * normDist);

                        // Interpolate Alpha
                        alpha = 0.3 + (intensity * 0.5); // 0.3 -> 0.8

                        // Interpolate Color
                        r = baseRgb.r + (glowRgb.r - baseRgb.r) * intensity;
                        g = baseRgb.g + (glowRgb.g - baseRgb.g) * intensity;
                        b = baseRgb.b + (glowRgb.b - baseRgb.b) * intensity;
                    }

                    ctx.beginPath();
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2); // Radius 1.5
                    ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, 1)`;
                    ctx.globalAlpha = alpha;
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [mousePos, isDashboard, dotColor, glowColor, spacing]);

    if (!isClient || isDashboard) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-opacity duration-500 ease-in-out opacity-100"
        />
    );
}
