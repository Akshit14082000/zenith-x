"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue, motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function HeadphoneScroll() {
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
                    img.src = `/images/sequence/frame_${i}.png`;
                    img.onload = () => {
                        loadedImages[i] = img; // Preserves order
                        resolve();
                    };
                    img.onerror = reject;
                });
                promises.push(p);
            }

            try {
                await Promise.all(promises);
                setImages(loadedImages);
                setIsLoaded(true);
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

        // Use a render loop that reacts to scroll changes
        const render = () => {
            // Get current frame index (float) and round/floor it
            const currentIndex = Math.min(
                totalFrames - 1,
                Math.max(0, Math.floor(frameIndex.get()))
            );

            const img = images[currentIndex];
            if (!img) return;

            // Scaling logic: Contain with Mobile Zoom
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            // Simple mobile detection (width < 768px + portrait check)
            const isMobile = canvasWidth < 768;

            if (isMobile) {
                // Mobile: "Fit to Screen" means filling most of the height (Cover-like behavior)
                // Target 90% of screen height to ensure headphones are large and centered
                drawHeight = canvasHeight * 0.9;
                drawWidth = drawHeight * imgRatio;

                // Recenter
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                // Desktop: "Fit to Full Device Width" implies Cover behavior
                // We want to ensure the image covers the entire canvas
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

    // Handle Resize
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

                {/* Loading Spinner */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <div className="animate-spin h-8 w-8 border-4 border-current border-t-transparent rounded-full" />
                        <span className="ml-3 font-light tracking-widest uppercase text-sm">Loading Assets</span>
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
            id: "zenith-x-headphone",
            name: "Zenith X Headphones",
            price: 599,
            image: "/images/sequence/frame_0.png",
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
            {/* 0% - Title */}
            <div className="absolute text-center max-w-4xl px-6">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">Zenith X</h1>
                    <p className="text-xl md:text-2xl text-white/60 tracking-[0.2em] uppercase font-light">Pure Sound</p>
                </motion.div>
            </div>

            {/* 30% - Precision */}
            <div className="absolute w-full px-12 md:px-24">
                <motion.div style={{ opacity: opacity2, y: y2 }} className="text-left w-full md:w-1/2">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-2">Precision Engineering.</h2>
                    <p className="text-lg text-white/50 max-w-md">Every component crafted to the micron for zero-distortion audio delivery.</p>
                </motion.div>
            </div>

            {/* 60% - Titanium */}
            <div className="absolute w-full px-12 md:px-24 flex justify-end">
                <motion.div style={{ opacity: opacity3, y: y3 }} className="text-right w-full md:w-1/2">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-2">Titanium Drivers.</h2>
                    <p className="text-lg text-white/50 max-w-md ml-auto">Aerospace-grade materials meet acoustic perfection.</p>
                </motion.div>
            </div>

            {/* 90% - Hear Everything */}
            <div className="absolute text-center">
                <motion.div style={{ opacity: opacity4, y: y4 }} className="flex flex-col items-center gap-6">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Hear Everything.</h2>
                    <Magnetic>
                        <button
                            onClick={handleAddToCart}
                            className="pointer-events-auto px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                        >
                            Add to Cart - $599
                        </button>
                    </Magnetic>
                </motion.div>
            </div>
        </div>
    );
}
