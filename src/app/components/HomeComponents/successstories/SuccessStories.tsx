"use client";
import { SuccessStoriesInfoData } from "@/app/utils/data";
import React from "react";
import SuccessStoriesInfo from "./SuccessStoriesInfo";
import { motion } from "framer-motion";

const SuccessStories = () => {
  return (
    <div className="w-full h-fit px-4 sm:px-8 md:px-16 py-10 md:py-14 flex flex-col gap-y-6 md:gap-y-10">
      
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full h-fit text-center md:text-left"
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Success Stories</h1>
      </motion.div>

      {/* Animated grid */}
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {SuccessStoriesInfoData.map((item, key) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: key * 0.2 }}
          >
            <SuccessStoriesInfo
              src={item.src}
              label={item.label}
              paragragh={item.paragragh}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
