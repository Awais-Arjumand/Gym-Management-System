"use client";
import React from "react";
import { MealsInfoData, MealsInfoData2 } from "../utils/data";
import MealsInfo from "../components/Meals/MealsInfo";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiCookingPotDuotone, PiLightbulb } from "react-icons/pi";
import MealsIconBoxes from "../components/Meals/MealsIconBoxes";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";

const Page = () => {
  const MealsIconBoxesBulkingData = [
    {
      icon: <TfiMenuAlt />,
      label: "Sample Meal Plan",
      detail: "High-calorie, protein-rich meals",
    },
    {
      icon: <PiCookingPotDuotone />,
      label: "Recipes",
      detail: "Delicious and nutritious recipes",
    },
    {
      icon: <PiLightbulb />,
      label: "Tips",
      detail: "Tips for maximizing muscle growth",
    },
  ];

  const MealsIconBoxesWeightLossData = [
    {
      icon: <TfiMenuAlt />,
      label: "Sample Meal Plan",
      detail: "Low-calorie, nutrient-dense meals",
    },
    {
      icon: <PiCookingPotDuotone />,
      label: "Recipes",
      detail: "Healthy and satisfying recipes",
    },
    {
      icon: <PiLightbulb />,
      label: "Tips",
      detail: "Strategies for effective weight loss",
    },
  ];

  const MealsIconBoxesLeanData = [
    {
      icon: <TfiMenuAlt />,
      label: "Sample Meal Plan",
      detail: "Balanced meals for lean gains",
    },
    {
      icon: <PiCookingPotDuotone />,
      label: "Recipes",
      detail: "Recipes for lean muscle development",
    },
    {
      icon: <PiLightbulb />,
      label: "Tips",
      detail: "Advice for building lean muscle mass",
    },
  ];

  const MealsIconGenralMealData = [
    {
      icon: <IoCheckmarkOutline />,
      label: "Plan your meals ahead of time to avoid impulsive unhealthy choices.",
      detail: "",
    },
    {
      icon: <IoCheckmarkOutline />,
      label: "Focus on whole, unprocessed foods like fruits, vegetables, and lean proteins.",
      detail: "",
    },
    {
      icon: <IoCheckmarkOutline />,
      label: "Stay hydrated by drinking plenty of water throughout the day.",
      detail: "",
    },
    {
      icon: <IoCheckmarkOutline />,
      label: "Limit sugary drinks and processed snacks.",
      detail: "",
    },
    {
      icon: <IoCheckmarkOutline />,
      label: "Listen to your body's hunger cues and avoid overeating.",
      detail: "",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen text-white bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16"
    >
      <motion.div 
        className="w-full h-fit flex flex-col gap-y-8 md:gap-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {MealsInfoData.map((meal, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MealsInfo
              fontSize={meal.fontSize}
              fontColor={meal.fontColor}
              label={meal.label}
              details={meal.details}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="w-full h-fit flex flex-col gap-y-10 md:gap-y-14"
        variants={containerVariants}
      >
        <motion.div className="w-full h-fit flex flex-col gap-y-7 md:gap-y-9" variants={itemVariants}>
          <MealsInfo
            fontSize={MealsInfoData2[0].fontSize}
            fontColor={MealsInfoData2[0].fontColor}
            label={MealsInfoData2[0].label}
            details={MealsInfoData2[0].details}
          />
          <div className="w-full md:w-fit h-fit grid grid-cols-1 cursor-pointer gap-4  md:gap-6">
            {MealsIconBoxesBulkingData.map((meal, index) => (
              <MealsIconBoxes
                icon={meal.icon}
                label={meal.label}
                detail={meal.detail}
                key={index}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div className="w-full h-fit flex flex-col gap-y-7 md:gap-y-9" variants={itemVariants}>
          <MealsInfo
            fontSize={MealsInfoData2[1].fontSize}
            fontColor={MealsInfoData2[1].fontColor}
            label={MealsInfoData2[1].label}
            details={MealsInfoData2[1].details}
          />
          <div className="w-full md:w-fit h-fit cursor-pointer grid grid-cols-1 gap-4 md:gap-6">
            {MealsIconBoxesWeightLossData.map((meal, index) => (
              <MealsIconBoxes
                icon={meal.icon}
                label={meal.label}
                detail={meal.detail}
                key={index}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div className="w-full h-fit flex flex-col gap-y-7 md:gap-y-9" variants={itemVariants}>
          <MealsInfo
            fontSize={MealsInfoData2[2].fontSize}
            fontColor={MealsInfoData2[2].fontColor}
            label={MealsInfoData2[2].label}
            details={MealsInfoData2[2].details}
          />
          <div className="w-full md:w-fit h-fit cursor-pointer grid grid-cols-1 gap-4 md:gap-6">
            {MealsIconBoxesLeanData.map((meal, index) => (
              <MealsIconBoxes
                icon={meal.icon}
                label={meal.label}
                detail={meal.detail}
                key={index}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div className="w-full h-fit flex flex-col gap-y-7 md:gap-y-9" variants={itemVariants}>
          <MealsInfo
            fontSize={MealsInfoData2[3].fontSize}
            fontColor={MealsInfoData2[3].fontColor}
            label={MealsInfoData2[3].label}
            details={MealsInfoData2[3].details}
          />
          <div className="w-full h-fit cursor-pointer grid grid-cols-1 gap-4 md:gap-6">
            {MealsIconGenralMealData.map((meal, index) => (
              <MealsIconBoxes
                icon={meal.icon}
                label={meal.label}
                detail={meal.detail}
                key={index}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="w-full h-fit flex justify-center items-center py-8 md:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          href={"/createmealplan"} 
          className="bg-white px-6 py-3 md:px-8 md:py-4 hover:bg-gray-700 hover:text-white transition-all duration-300 text-black rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Create Your Own Meal Plan
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Page;