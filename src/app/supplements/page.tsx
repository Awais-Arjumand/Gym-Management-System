"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { NutrationOptionsData } from "../utils/data";
import NutrationChips from "../components/Supplements/NutrationChips";
import OtherProducts from "../components/Supplements/OtherProducts";
import { IoCart } from "react-icons/io5";
import Cart from "../components/Supplements/Cart";
import { motion } from "framer-motion";

const OurProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <motion.div
        className="w-full min-h-screen bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header Section */}
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-full flex flex-col gap-y-3 sm:gap-y-4">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Supplements
              </h1>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-fit h-fit px-3 sm:px-4 text-white py-1.5 sm:py-2 rounded-lg bg-[#2B3036] cursor-pointer flex gap-x-2 items-center justify-center sm:justify-start"
                onClick={() => setIsCartOpen(true)}
              >
                <h1 className="text-sm sm:text-base font-medium">Cart</h1>
                <IoCart className="text-lg sm:text-xl" />
              </motion.div>
            </div>
            <h1 className="text-sm sm:text-base font-normal text-[#A3ABB2]">
              Fuel your fitness journey with our curated selection of high-quality
              supplements.
            </h1>
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <IoIosSearch className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
            <motion.input
              type="text"
              name="Search Supplements"
              className="w-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 outline-none bg-[#2B3036] rounded-xl sm:rounded-2xl text-gray-400 placeholder:text-gray-400 text-sm sm:text-base"
              placeholder="Search Supplements"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(26, 120, 229, 0.8)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="w-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2">
          {NutrationOptionsData.map((item, key) => (
            <motion.div
              key={key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: key * 0.05 }}
            >
              <NutrationChips
                label={item.label}
                active={selectedCategory === item.label}
                onClick={() => handleCategorySelect(item.label)}
              />
            </motion.div>
          ))}
        </div>

        {/* Product Display Area */}
        <motion.div
          className="w-full mt-4 sm:mt-6 md:mt-8"
          key={selectedCategory || "empty"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedCategory ? (
            <OtherProducts category={selectedCategory} searchQuery={searchQuery} />
          ) : (
            <div className="text-center text-gray-400 text-sm sm:text-base">
              Please select a category to view products
            </div>
          )}
        </motion.div>
      </motion.div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default OurProduct;
