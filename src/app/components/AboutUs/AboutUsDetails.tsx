import React from 'react';
import { motion } from 'framer-motion';

interface AboutUsDetailsTypes {
  label: string;
  paragraph: string;
  fontSize: string;
}

const AboutUsDetails = ({ label, paragraph, fontSize }: AboutUsDetailsTypes) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='w-full h-fit flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4'
    >
      <h1 className={`${fontSize} font-bold text-white`}>{label}</h1>
      <p className='text-sm sm:text-base !text-[#A3ABB2] leading-relaxed sm:leading-loose'>
        {paragraph}
      </p>
    </motion.div>
  );
};

export default AboutUsDetails;
