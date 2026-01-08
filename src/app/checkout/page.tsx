"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-3xl text-center"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                            <CheckCircle size={40} />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                        <p className="text-white/60 mb-8">
                            Thank you for your purchase. You will receive an email confirmation shortly.
                        </p>
                        <Link href="/" className="block w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Cart is Empty</h1>
                        <Link href="/" className="text-white/60 hover:text-white underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-black rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-white/50">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-8">Checkout Details</h2>
                        <form onSubmit={handlePayment} className="space-y-8">

                            {/* Shipping Address */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white/80 border-b border-white/10 pb-2">1. Shipping Address</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">First Name</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">Last Name</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 ml-2">Email Address</label>
                                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 ml-2">Street Address</label>
                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="123 Music Lane" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">City</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">State / Province</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="NY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">Zip Code</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="10001" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white/80 border-b border-white/10 pb-2">2. Payment Method</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="cursor-pointer border border-white/20 bg-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors">
                                        <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-white" />
                                        <span className="font-semibold">Credit Card</span>
                                    </label>
                                    <label className="cursor-pointer border border-white/10 bg-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors opacity-50">
                                        <input type="radio" name="payment" disabled className="w-5 h-5 accent-white" />
                                        <span className="font-semibold">PayPal (Coming Soon)</span>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 ml-2">Card Number</label>
                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="0000 0000 0000 0000" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">Expiry</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 ml-2">CVC</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors" placeholder="123" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ${total.toFixed(2)} <ArrowRight />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
