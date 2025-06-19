import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface AboutUsImagesTypes {
  src: string;
}

const AboutUsImages = ({ src }: AboutUsImagesTypes) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full h-[180px] cursor-pointer xs:h-[200px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[350px] relative border border-white/30 bg-[#131b1c] overflow-hidden rounded-lg group hover:border-white/50 transition-all duration-300"
    >
      <Image
        src={src}
        alt="About our company"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 50vw"
        priority={false}
      />
    </motion.div>
  );
};

export default AboutUsImages;
