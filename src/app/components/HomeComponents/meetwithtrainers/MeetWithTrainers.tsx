import React from "react";
import { TrainersInfoData } from "@/app/utils/data";
import TrainersInfo from "./TrainersInfo";
import { motion } from "framer-motion";

const MeetWithTrainers = () => {
  return (
    <div className="w-full h-fit px-4 sm:px-8 md:px-16 py-10 md:py-14 flex flex-col gap-y-6 md:gap-y-10">
      
      {/* Section Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full h-fit text-center md:text-left"
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Our Dream Team
        </h1>
      </motion.div>

      {/* Grid of Animated Cards */}
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {TrainersInfoData.map((item, key) => (
          <TrainersInfo
            key={key}
            src={item.src}
            label={item.label}
            paragragh={item.paragragh}
            index={key}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetWithTrainers;
