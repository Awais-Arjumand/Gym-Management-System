"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface SuccessStoriesInfo {
  src: string;
  label: string;
  paragragh: string;
}

const SuccessStoriesInfo = ({ src, label, paragragh }: SuccessStoriesInfo) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full flex flex-col gap-3 sm:gap-4 group cursor-pointer"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
        <Image
          src={src}
          alt={`Success story: ${label}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 33vw"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1 sm:gap-2 px-1">
        <h3 className="text-base sm:text-lg font-semibold text-white">{label}</h3>
        <p className="text-sm sm:text-base !text-[#A3ABB2] leading-relaxed">
          &apos;{paragragh}&apos;
        </p>
      </div>
    </motion.div>
  );
};

export default SuccessStoriesInfo;
