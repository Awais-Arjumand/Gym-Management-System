import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface TrainersInfo {
  src: string;
  label: string;
  paragragh: string;
  index?: number;
}

const TrainersInfo = ({ src, label, paragragh, index = 0 }: TrainersInfo) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full flex flex-col gap-3 sm:gap-4 group transition-all cursor-pointer duration-300 hover:scale-[1.02] mx-auto"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
        <Image 
          src={src} 
          alt={`Trainer ${label}`} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 30vw"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1 sm:gap-2 px-1">
        <h3 className="text-base sm:text-lg font-semibold text-white">{label}</h3>
        <p className="text-sm sm:text-base !text-[#A3ABB2] leading-relaxed">
          {paragragh}
        </p>
      </div>
    </motion.div>
  );
};

export default TrainersInfo;
