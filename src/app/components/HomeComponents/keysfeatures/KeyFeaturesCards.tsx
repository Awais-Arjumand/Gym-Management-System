import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface KeyFeaturesCardsProps {
  icon: ReactNode;
  label: string;
  paragragh: string;
}

const KeyFeaturesCards: React.FC<KeyFeaturesCardsProps> = ({
  icon,
  label,
  paragragh,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-fit bg-[#1f2124] rounded-xl py-6 sm:py-8 md:py-10 px-5 sm:px-6 md:px-7 flex flex-col justify-center gap-y-3 md:gap-y-4"
    >
      {icon}
      <h1 className="text-white font-bold text-sm sm:text-base">{label}</h1>
      <p className="text-[#A3ABB2] font-normal text-xs sm:text-sm w-full md:w-[265px]">
        {paragragh}
      </p>
    </motion.div>
  );
};

export default KeyFeaturesCards;
