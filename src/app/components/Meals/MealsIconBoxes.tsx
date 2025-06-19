"use client";
import React from 'react'
import { motion } from 'framer-motion';

interface MealsIconBoxesProps {
    icon: React.ReactNode;
    label: string;
    detail?: string;
}

const MealsIconBoxes = ({icon, label, detail}: MealsIconBoxesProps) => {
  return (
    <motion.div 
      className='w-full h-fit flex gap-x-4 items-center justify-start p-4 md:p-6 rounded-xl bg-[#1E2329] hover:bg-[#2B3036] transition-all duration-300 shadow-md hover:shadow-lg'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className='w-12 h-12 md:w-14 md:h-14 rounded-lg text-2xl bg-[#2B3036] flex justify-center items-center text-white'
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        {icon}
      </motion.div>
      <div className='w-fit h-fit flex flex-col gap-y-1 justify-center'>
        <motion.h1 
          className='text-white font-medium text-base md:text-lg'
          whileHover={{ color: "#3b82f6" }}
        >
          {label}
        </motion.h1>
        {detail && (
          <motion.h1 
            className='text-[#A3ABB2] font-normal text-sm md:text-base'
            whileHover={{ color: "#ffffff" }}
          >
            {detail}
          </motion.h1>
        )}
      </div>
    </motion.div>
  )
}

export default MealsIconBoxes