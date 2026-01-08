"use client";

import { motion } from "framer-motion";

export const headphoneSpecs = [
    { label: "Driver Unit", value: "40mm Bio-Diaphragm" },
    { label: "Frequency Response", value: "5Hz - 40kHz" },
    { label: "Sensitivity", value: "105 dB/mW" },
    { label: "Impedance", value: "32 Ohms" },
    { label: "Bluetooth", value: "v5.3 LE Audio" },
    { label: "Codec Support", value: "LDAC, aptX Lossless" },
];

interface SpecsProps {
    specs: { label: string; value: string }[];
    title?: string;
}

export default function Specs({ specs, title = "Technical Dominance." }: SpecsProps) {

    return (
        <section id="specs" className="py-24 px-6 md:px-12 bg-black relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                {/* Visual Focus - could be another image or just abstract shapes */}
                <div className="w-full md:w-1/2 h-[400px] bg-gradient-to-tr from-white/10 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                    <p className="text-white/20 font-bold text-6xl tracking-widest uppercase rotate-90 select-none">Specs</p>
                </div>

                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">{title}</h2>

                        <div className="space-y-6">
                            {specs.map((spec, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h4 className="text-white/60 font-medium">{spec.label}</h4>
                                    <p className="text-white font-semibold text-right">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
