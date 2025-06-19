"use client";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../Supplements/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CartProps {
  onClose: () => void;
  isOpen: boolean;
}

const cartVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Cart = ({ onClose, isOpen }: CartProps) => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const total = getTotalPrice();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            ref={cartRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cartVariants}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md z-50 overflow-y-auto bg-primary shadow-xl"
          >
            <div className="p-4 sm:p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Cart</h1>
                <button
                  onClick={onClose}
                  className="text-xl focus:outline-none"
                  aria-label="Close cart"
                >
                  <IoClose className="cursor-pointer text-2xl text-white" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-10 flex-grow text-white flex items-center justify-center">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <motion.div
                  className="flex-grow"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <div className="mb-6 sm:mb-8">
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      <h2 className="col-span-2 text-sm sm:text-base font-semibold text-white">Product</h2>
                      <h2 className="text-sm sm:text-base font-semibold text-white text-center">Qty</h2>
                      <h2 className="text-sm sm:text-base font-semibold text-white text-center">Price</h2>
                      <h2 className="text-sm sm:text-base font-semibold text-white text-center">Subtotal</h2>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-5 gap-2 items-center border-b pb-3"
                          >
                            <div className="col-span-2 flex gap-3 items-center">
                              {item.src && (
                                <Image
                                  src={item.src}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="rounded-md object-cover w-12 h-12"
                                />
                              )}
                              <div>
                                <p className="text-white text-sm font-medium">{item.name}</p>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-xs cursor-pointer text-red-400 hover:text-red-600 mt-1"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <span className="text-center text-white text-sm">x{item.quantity}</span>
                            <span className="text-center text-white text-sm">{item.price}</span>
                            <span className="text-center text-white text-sm">
                              ₹
                              {parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                                item.quantity}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <motion.div layout className="border-t pt-4 sm:pt-6">
                    <h2 className="text-base sm:text-lg text-white font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-2 text-white text-sm sm:text-base mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <motion.span layout>₹{total.toFixed(2)}</motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <span>₹0.00</span>
                      </div>
                    </div>

                    <motion.div
                      layout
                      className="flex justify-between text-white font-bold text-base sm:text-lg border-t pt-3 sm:pt-4 mb-4 sm:mb-6"
                    >
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </motion.div>

                    <div className="w-full flex flex-col gap-2 sm:gap-3 py-4 sm:py-6">
                      <button
                        className="w-full bg-black text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                      >
                        Checkout
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full border border-gray-800 text-white hover:bg-gray-100 hover:text-black py-2 sm:py-3 rounded-lg font-medium transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
