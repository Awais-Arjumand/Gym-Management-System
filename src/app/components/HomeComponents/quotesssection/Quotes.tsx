"use client";
import React from "react";
import { motion } from "framer-motion";

interface QuoteData {
  q: string;
  a: string;
}

interface QuotesProps {
  quote: QuoteData;
  colorClass: string;
  textColor: string;
}

const Quotes = ({ quote, colorClass, textColor }: QuotesProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`w-full h-48 sm:h-56 md:h-64 p-4 sm:p-5 md:p-6 rounded-lg ${colorClass} ${textColor} transition-all duration-300 cursor-pointer flex flex-col justify-between`}
    >
      <blockquote className="text-base sm:text-lg md:text-xl italic font-medium mb-3 md:mb-4 !text-black">
        &apos;{quote.q}&apos;
      </blockquote>
      <p className="text-right font-semibold text-sm sm:text-base opacity-90 !text-black">
        — {quote.a || "Unknown"}
      </p>
    </motion.div>
  );
};

export default Quotes;
