"use client";

import { useState } from "react";
import AudioVisualizer from "./AudioVisualizer";

export default function SoundLab() {
    const [bass, setBass] = useState(50);
    const [mids, setMids] = useState(50);
    const [treble, setTreble] = useState(50);

    return (
        <section className="py-24 px-6 md:px-12 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Visualizer Side */}
                <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
                    <AudioVisualizer />
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Sonic Signature</h3>
                        <p className="text-white/50">Visualize the Zenith sound curve in real-time.</p>
                    </div>
                </div>

                {/* Controls Side */}
                <div className="order-1 lg:order-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sound Lab.</h2>
                    <p className="text-lg text-white/60 mb-12 max-w-lg">
                        Customize your listening experience. Our 11mm drivers adapt to your preference instantly.
                    </p>

                    <div className="space-y-8">
                        {/* Bass Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium text-white/80">
                                <span>BASS</span>
                                <span>{bass}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={bass}
                                onChange={(e) => setBass(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>

                        {/* Mids Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium text-white/80">
                                <span>MIDS</span>
                                <span>{mids}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={mids}
                                onChange={(e) => setMids(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>

                        {/* Treble Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium text-white/80">
                                <span>TREBLE</span>
                                <span>{treble}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={treble}
                                onChange={(e) => setTreble(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
