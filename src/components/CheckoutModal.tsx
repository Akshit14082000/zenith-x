"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, X } from "lucide-react";
import Link from "next/link";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { total, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="overflow-y-auto p-8 md:p-12 custom-scrollbar">
                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-black"
                                    >
                                        <CheckCircle size={48} />
                                    </motion.div>
                                    <h2 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h2>
                                    <p className="text-white/60 mb-8 max-w-md mx-auto">
                                        Your order has been placed successfully. You will receive a confirmation email shortly.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold text-white mb-8">Checkout</h2>

                                    <form onSubmit={handlePayment} className="space-y-8">
                                        {/* Shipping Address */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-white/80 border-b border-white/10 pb-2">1. Shipping Address</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/60 ml-2">First Name</label>
                                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="John" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/60 ml-2">Last Name</label>
                                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="Doe" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-white/60 ml-2">Email Address</label>
                                                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="john@example.com" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-white/60 ml-2">Street Address</label>
                                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="123 Music Lane" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/60 ml-2">City</label>
                                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="New York" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/60 ml-2">State</label>
                                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="NY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/60 ml-2">Zip</label>
                                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="10001" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Method */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-white/80 border-b border-white/10 pb-2">2. Payment Method</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-colors ${paymentMethod === 'card' ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentMethod === 'card'}
                                                        onChange={() => setPaymentMethod('card')}
                                                        className="w-5 h-5 accent-white"
                                                    />
                                                    <span className="font-semibold text-white">Credit Card</span>
                                                </label>
                                                <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-colors ${paymentMethod === 'paypal' ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentMethod === 'paypal'}
                                                        onChange={() => setPaymentMethod('paypal')}
                                                        className="w-5 h-5 accent-white"
                                                    />
                                                    <span className="font-semibold text-white">PayPal</span>
                                                </label>
                                            </div>

                                            {paymentMethod === 'card' ? (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-white/60 ml-2">Card Number</label>
                                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="0000 0000 0000 0000" />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-white/60 ml-2">Expiry</label>
                                                            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="MM/YY" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-white/60 ml-2">CVC</label>
                                                            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/40 transition-colors text-white" placeholder="123" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-6 bg-[#003087]/20 border border-[#003087]/40 rounded-xl text-center animate-in fade-in slide-in-from-top-4 duration-300">
                                                    <p className="text-white/80 mb-2">You will be redirected to PayPal to complete your purchase securely.</p>
                                                    <div className="text-sm text-white/40">No card information needed here.</div>
                                                </div>
                                            )}
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
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
