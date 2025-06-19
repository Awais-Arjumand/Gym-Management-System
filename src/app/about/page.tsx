"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  AboutUsImagesData,
  AboutUsInfoData,
  AboutUsInfoData2,
} from "../utils/data";
import AboutUsDetails from "../components/AboutUs/AboutUsDetails";
import AboutUsImages from "../components/AboutUs/AboutUsImages";
import SocialLinks from "../components/AboutUs/SocialLinks";
import { CiTwitter } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const AboutUs = () => {
  const SocialLinksData = [
    {
      icon: <CiTwitter className="text-2xl" />,
      label: "Twitter",
      href: "https://twitter.com/yourpage",
    },
    {
      icon: <FaFacebook className="text-2xl" />,
      label: "Facebook",
      href: "https://facebook.com/yourpage",
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      label: "Instagram",
      href: "https://instagram.com/yourpage",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-primary py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-10"
    >
      {/* Main content sections */}
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-10">
        {AboutUsInfoData.map((item, index) => (
          <motion.div
            key={`info-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <AboutUsDetails
              label={item.label}
              paragraph={item.paragragh}
              fontSize={item.fontSize}
            />
          </motion.div>
        ))}
      </div>

      {/* Image grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 my-6 sm:my-8 md:my-10">
        {AboutUsImagesData.map((item, index) => (
          <motion.div
            key={`image-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <AboutUsImages src={item.src} />
          </motion.div>
        ))}
      </div>

      {/* Secondary content sections */}
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-10">
        {AboutUsInfoData2.map((item, index) => (
          <motion.div
            key={`info2-${index}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <AboutUsDetails
              label={item.label}
              paragraph={item.paragragh}
              fontSize={item.fontSize}
            />
          </motion.div>
        ))}
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-fit flex self-start md:self-center mt-8 sm:mt-10 md:mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-8 md:gap-x-10">
          {SocialLinksData.map((item, index) => (
            <motion.div
              key={`social-${index}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SocialLinks
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
