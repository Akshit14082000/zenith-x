"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue, motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function EarbudScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress for the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 scroll to 0-(totalFrames-1)
    const totalFrames = 41;
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < totalFrames; i++) {
                const p = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Match file format: ezgif-frame-001.png (1-based index)
                    const frameNumber = (i + 1).toString().padStart(3, '0');
                    img.src = `/images/earbuds/ezgif-frame-${frameNumber}.png`;
                    img.onload = () => {
                        loadedImages[i] = img; // Preserves order
                        resolve();
                    };
                    img.onerror = () => {
                        // Resolve anyway to prevent full crash if just one frame fails, 
                        // or better yet, verify if user uploaded. 
                        // For now, strict reject might be better to show loading error if empty.
                        console.warn(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(p);
            }

            try {
                await Promise.all(promises);
                // Filter out undefined if any failed
                const validImages = loadedImages.filter(img => img !== undefined);
                if (validImages.length > 0) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error("Failed to load images", error);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = () => {
            const currentIndex = Math.min(
                totalFrames - 1,
                Math.max(0, Math.floor(frameIndex.get()))
            );

            const img = images[currentIndex];
            if (!img) return;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            const isMobile = canvasWidth < 768;

            if (isMobile) {
                drawHeight = canvasHeight * 0.9;
                drawWidth = drawHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
                drawWidth = img.width * scale;
                drawHeight = img.height * scale;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [isLoaded, images, frameIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <div className="animate-spin h-8 w-8 border-4 border-current border-t-transparent rounded-full" />
                        <span className="ml-3 font-light tracking-widest uppercase text-sm">Loading Earbuds</span>
                    </div>
                )}

                <TextOverlays progress={scrollYProgress} />
            </div>
        </div>
    );
}

function TextOverlays({ progress }: { progress: MotionValue<number> }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart({
            id: "zenith-air-earbuds",
            name: "Zenith Air Earbuds",
            price: 249,
            image: "/images/earbuds/ezgif-frame-001.png",
        });
        router.push("/cart");
    };

    const opacity1 = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.2], [0, -50]);

    const opacity2 = useTransform(progress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const y2 = useTransform(progress, [0.25, 0.35, 0.45], [50, 0, -50]);

    const opacity3 = useTransform(progress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const y3 = useTransform(progress, [0.55, 0.65, 0.75], [50, 0, -50]);

    const opacity4 = useTransform(progress, [0.85, 0.95, 1], [0, 1, 1]);
    const y4 = useTransform(progress, [0.85, 0.95, 1], [50, 0, 0]);

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10 w-full h-full">
            <div className="absolute text-center max-w-4xl px-6">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">Zenith Air</h1>
                    <p className="text-xl md:text-2xl text-white/60 tracking-[0.2em] uppercase font-light">True Wireless</p>
                </motion.div>
            </div>

            <div className="absolute w-full px-12 md:px-24">
                <motion.div style={{ opacity: opacity2, y: y2 }} className="text-left w-full md:w-1/2">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-2">Featherlight.</h2>
                    <p className="text-lg text-white/50 max-w-md">Designed to disappear. You'll forget you're wearing them.</p>
                </motion.div>
            </div>

            <div className="absolute w-full px-12 md:px-24 flex justify-end">
                <motion.div style={{ opacity: opacity3, y: y3 }} className="text-right w-full md:w-1/2">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-2">Studio Quality.</h2>
                    <p className="text-lg text-white/50 max-w-md ml-auto">11mm dynamic drivers delivering punchy bass and crystal highs.</p>
                </motion.div>
            </div>

            <div className="absolute text-center">
                <motion.div style={{ opacity: opacity4, y: y4 }} className="flex flex-col items-center gap-6">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Unbound.</h2>
                    <Magnetic>
                        <button
                            onClick={handleAddToCart}
                            className="pointer-events-auto px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                        >
                            Add to Cart - $249
                        </button>
                    </Magnetic>
                </motion.div>
            </div>
        </div>
    );
}
