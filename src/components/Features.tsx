"use client";

import { motion } from "framer-motion";
import { Battery, Bluetooth, Cpu, Zap } from "lucide-react";

export const headphoneFeatures = [
    {
        title: "Active Noise Cancellation",
        description: "Silence the world. Immerse in the music.",
        icon: <Zap className="w-6 h-6 text-white" />,
        colSpan: "md:col-span-2",
    },
    {
        title: "40hr Battery Life",
        description: "All day, all night. Power that lasts.",
        icon: <Battery className="w-6 h-6 text-white" />,
        colSpan: "md:col-span-1",
    },
    {
        title: "Spatial Audio",
        description: "360° soundstage for cinematic listening.",
        icon: <Cpu className="w-6 h-6 text-white" />,
        colSpan: "md:col-span-1",
    },
    {
        title: "Seamless Connectivity",
        description: "Instant pairing with Bluetooth 5.3.",
        icon: <Bluetooth className="w-6 h-6 text-white" />,
        colSpan: "md:col-span-2",
    },
];

export interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    colSpan: string;
}

interface FeaturesProps {
    features: Feature[];
}

export default function Features({ features }: FeaturesProps) {
    return (
        <section id="features" className="py-24 px-6 md:px-12 bg-[#050505] relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Beyond Listening.</h2>
                    <p className="text-white/50 text-lg max-w-xl">Advanced technology meets premium aesthetics. Designed for the audiophile.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between h-[300px] ${feature.colSpan}`}
                        >
                            <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-white/60">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
