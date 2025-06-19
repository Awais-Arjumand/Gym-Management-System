"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface MeelsInfoType {
  src: string;
  label: string;
  WriterName: string;
}

const MeelsInfo = ({ src, label, WriterName }: MeelsInfoType) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full flex flex-col gap-3 sm:gap-4 group cursor-pointer"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <Image 
          src={src}
          alt={`Meal tip by ${WriterName}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 33vw"
        />
      </div>

      <div className="border border-white/30 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:border-white/50 transition-colors">
        <blockquote className="text-base sm:text-lg italic font-medium text-white">&apos;{label}&apos;</blockquote>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base !text-[#A3ABB2]">— {WriterName}</p>
      </div>
    </motion.div>
  );
};

export default MeelsInfo;
