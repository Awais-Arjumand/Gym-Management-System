import { FooterlinksData } from "@/app/utils/data";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full h-fit flex flex-col gap-y-4 md:gap-y-8 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 pt-10 pb-5 bg-primary"
    >
      <div className="w-full h-fit flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {FooterlinksData.map((item, key) => (
          <Link
            href={item.href}
            key={key}
            className="text-[#A3ABB2] hover:text-white transition-all duration-300 font-normal text-sm sm:text-base text-center sm:text-left"
          >
            {item.link}
          </Link>
        ))}
      </div>
      <h1 className="!text-[#A3ABB2] text-xs sm:text-sm text-center">
        © 2024 FitTrack. All rights reserved.
      </h1>
    </motion.div>
  );
};

export default Footer;
