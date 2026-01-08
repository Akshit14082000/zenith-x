"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Magnetic from "./Magnetic";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { itemCount } = useCart();

    const links = [
        { name: "Features", href: "#features" },
        { name: "Specs", href: "#specs" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/10"
        >
            <div className="text-xl font-bold tracking-tighter text-white">
                ZENITH X
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                    Earbuds
                </Link>
                <Link href="/headphones" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                    Headphones
                </Link>

                <Link href="/cart" className="relative group">
                    <ShoppingBag className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </Link>


            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Drawer */}
            {/* Mobile Drawer */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white tracking-widest hover:text-white/70 transition-colors">
                        EARBUDS
                    </Link>
                    <Link href="/headphones" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white tracking-widest hover:text-white/70 transition-colors">
                        HEADPHONES
                    </Link>
                    <Link href="/cart" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white tracking-widest hover:text-white/70 transition-colors">
                        CART ({itemCount})
                    </Link>

                    <div className="w-12 h-px bg-white/20 my-4" />

                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-white/50 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
}
