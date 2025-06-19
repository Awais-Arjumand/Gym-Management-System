"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { SignInButton, useUser } from "@clerk/nextjs";

const EndSection = () => {
  const { isSignedIn } = useUser();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          {isSignedIn ? "Continue Your Fitness Journey" : "Ready to Transform Your Fitness?"}
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
          {isSignedIn
            ? "Keep pushing your limits and achieve even greater results with our app."
            : "Join thousands of users who have already achieved their fitness goals with our app."}
        </p>
        {isSignedIn ? (
          <Link
            href="/meals"
            className="inline-block transition-all duration-300 bg-white px-4 py-2 sm:px-5 sm:py-3 rounded-2xl sm:rounded-3xl !text-black border-2 border-transparent hover:border-white hover:bg-black hover:!text-white text-sm sm:text-base font-medium"
          >
            Go to Meals Info
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="inline-block transition-all duration-300 bg-white px-4 py-2 sm:px-5 sm:py-3 rounded-2xl sm:rounded-3xl !text-black border-2 border-transparent hover:border-white hover:bg-black hover:!text-white text-sm sm:text-base font-medium">
              Sign In Now
            </button>
          </SignInButton>
        )}
      </div>
    </motion.section>
  );
};

export default EndSection;