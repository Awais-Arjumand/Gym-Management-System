"use client";
import React from 'react'
import { motion } from 'framer-motion';

interface MealsInfoProps {
  fontSize: string
  fontColor: string
  label: string
  details?: string
}

const MealsInfo = ({fontSize, fontColor, label, details}: MealsInfoProps) => {
  return (
    <motion.div 
      className='w-full h-fit flex flex-col gap-y-4'
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.h1 
        className={`font-bold ${fontSize}`}
        whileHover={{ color: "#3b82f6" }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.h1>
      {details && (
        <motion.h1 
          className={`font-normal ${fontColor} text-base md:text-lg`}
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {details}
        </motion.h1>
      )}
    </motion.div>
  )
}

export default MealsInfo