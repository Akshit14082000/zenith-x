"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-12 tracking-tight"
                >
                    Your Cart
                </motion.h1>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center py-24 border border-white/10 rounded-3xl bg-white/5"
                    >
                        <p className="text-xl text-white/50 mb-8">Your cart is empty.</p>
                        <Link href="/" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
                            Browse Products <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl"
                                >
                                    <div className="w-full sm:w-32 h-32 bg-black rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                        <p className="text-white/60 mb-4">${item.price.toFixed(2)}</p>

                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center gap-3 bg-black/50 rounded-full px-3 py-1 border border-white/10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-white/70 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-white/70 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-500/70 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xl font-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 bg-white/5 border border-white/10 p-8 rounded-3xl">
                                <h3 className="text-2xl font-bold mb-8">Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-white/60">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-4" />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                    Checkout Now <ArrowRight size={20} />
                                </button>
                                <p className="text-center text-xs text-white/30 mt-4">Secure Checkout. Free Returns.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
