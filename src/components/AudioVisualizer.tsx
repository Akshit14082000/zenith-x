"use client";

import { useEffect, useRef } from "react";

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const render = () => {
            time += 0.05;
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            // Draw multiple waves
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.lineWidth = 2;

                // Opacity varies by wave
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + i * 0.2})`;

                for (let x = 0; x < width; x++) {
                    // Sine wave logic with per-layer offset
                    const y = height / 2 +
                        Math.sin(x * 0.01 + time + i) * 50 * Math.sin(time * 0.5) +
                        Math.sin(x * 0.03 + time * 2) * 20;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            animationId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            canvas.width = canvas.parentElement?.clientWidth || 300;
            canvas.height = canvas.parentElement?.clientHeight || 200;
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full h-64 bg-black/50 overflow-hidden relative border-y border-white/5">
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div className="absolute top-4 left-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Live Signal</span>
                </div>
            </div>
        </div>
    );
}
