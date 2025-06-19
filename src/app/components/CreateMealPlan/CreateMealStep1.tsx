import React from "react";
import { GiWeight } from "react-icons/gi";
import { motion } from "framer-motion";

type CreateMealStep1Props = {
  weight: string;
  setWeight: (weight: string) => void;
  error: string;
  setError: (error: string) => void;
};

const CreateMealStep1 = ({
  weight,
  setWeight,
  error,
  setError,
}: CreateMealStep1Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value);
    if (value.trim()) {
      setError("");
    }
  };

  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-fit h-fit ">
        <h1 className="text-2xl sm:text-3xl font-bold text-white  flex gap-x-5 items-center">
          What&apos;s Your Current Weight?
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <GiWeight />
          </motion.span>
        </h1>
      </div>
      <div className="w-full h-fit flex flex-col gap-y-3">
        <label
          className="text-white font-medium text-sm"
          htmlFor="weight-input"
        >
          Your Current Weight:
        </label>
        <motion.input
          id="weight-input"
          value={weight}
          onChange={handleChange}
          placeholder="What's Your Current Weight?"
          className={`w-full rounded-xl px-4 py-3 text-[#A3ABB2] placeholder:text-[#A3ABB2] outline-none border ${
            error ? "border-red-500" : "border-[#40474f]"
          } bg-[#1F2124] focus:border-white transition-colors`}
          whileFocus={{ scale: 1.01 }}
        />
        {error && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CreateMealStep1;
