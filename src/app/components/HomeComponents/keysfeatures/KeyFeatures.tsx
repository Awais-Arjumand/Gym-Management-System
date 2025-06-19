import React from "react";
import { FaDumbbell, FaRegHeart } from "react-icons/fa";
import { LuCommand } from "react-icons/lu";
import KeyFeaturesCards from "./KeyFeaturesCards";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  const keyFeaturesData = [
    {
      icon: <FaRegHeart className="text-white text-xl" />,
      label: "Workout Tracking",
      paragragh:
        "Log your workouts with detailed metrics and track your progress over time.",
    },
    {
      icon: <FaDumbbell className="text-white text-xl" />,
      label: "Personalized Plans",
      paragragh:
        "Receive customized workout plans tailored to your fitness level and goals.",
    },
    {
      icon: <LuCommand className="text-white text-xl" />,
      label: "Nutrition Monitoring",
      paragragh:
        "Monitor your daily calorie intake and nutritional balance with ease.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-10 md:py-20 h-fit flex flex-col gap-y-6 md:gap-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full h-fit flex flex-col justify-center gap-y-2 md:gap-y-3 text-center md:text-left"
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Key Features
        </h1>
        <p className="font-normal text-sm sm:text-base w-full md:w-[650px] mx-auto md:mx-0">
          Explore the powerful features designed to help you stay motivated and
          achieve your fitness goals.
        </p>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
        {keyFeaturesData.map((item, key) => (
          <KeyFeaturesCards
            icon={item.icon}
            label={item.label}
            paragragh={item.paragragh}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
