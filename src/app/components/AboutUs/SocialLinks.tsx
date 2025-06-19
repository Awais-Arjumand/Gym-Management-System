import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface SocialLinksProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SocialLinks = ({ icon, label, href }: SocialLinksProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={href}
        className="flex items-center gap-x-2 text-white hover:text-blue-400 transition duration-200 px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/10"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <span className="text-lg sm:text-xl">{icon}</span>
        <span className="text-sm sm:text-base">{label}</span>
      </Link>
    </motion.div>
  );
};

export default SocialLinks;
