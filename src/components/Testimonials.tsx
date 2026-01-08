"use client";

import { motion } from "framer-motion";

const reviews = [
    {
        name: "Alex M.",
        role: "Audiophile",
        text: "The soundstage is impossibly wide for earbuds. Zenith has done it again."
    },
    {
        name: "Sarah K.",
        role: "Producer",
        text: "My go-to reference monitors for on-the-go mixing. Flat, accurate, perfect."
    },
    {
        name: "James R.",
        role: "Musician",
        text: "The ANC is witchcraft. I can't hear my own drums when these are in."
    },
    {
        name: "Elena T.",
        role: "Designer",
        text: "Finally, tech that looks as good as it sounds. The aesthetic is unmatched."
    },
    {
        name: "David W.",
        role: "Tech Reviewer",
        text: "Best in class battery life and comfort. A no-brainer for 2024."
    }
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-black overflow-hidden border-t border-white/5">
            <div className="text-center mb-16 px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted by Pros.</h2>
                <p className="text-white/50">Join thousands of obsessed listeners.</p>
            </div>

            <div className="relative flex w-full">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                        <div
                            key={idx}
                            className="w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl flex-shrink-0 whitespace-normal"
                        >
                            <p className="text-lg text-white mb-6 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-500 rounded-full" />
                                <div>
                                    <p className="font-bold text-white">{review.name}</p>
                                    <p className="text-sm text-white/40">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
