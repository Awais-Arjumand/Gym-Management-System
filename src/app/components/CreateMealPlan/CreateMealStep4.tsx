import React from "react";
import Select, { StylesConfig } from "react-select";
import { motion } from "framer-motion";
import { GiMeal } from "react-icons/gi";

export type OptionType = {
  value: string;
  label: string;
};

type Props = {
  mealPlanType: OptionType | null;
  setMealPlanType: (goal: OptionType | null) => void;
  error: string;
  setError: (error: string) => void;
};

const options: OptionType[] = [
  { value: "Natural Diet", label: "Natural Diet" },
  { value: "Supplement + Natural Diet", label: "Supplement + Natural Diet" },
];

const customStyles = (error: boolean): StylesConfig<OptionType, false> => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1F2124",
    borderColor: error ? "red" : state.isFocused ? "#FFFFFF" : "#40474f",
    borderRadius: "0.75rem",
    padding: "2px",
    boxShadow: state.isFocused ? "0 0 0 1px #FFFFFF" : "none",
    "&:hover": {
      borderColor: error ? "red" : "#FFFFFF",
      cursor: "pointer",
    },
    transition: "border-color 0.2s ease",
  }),
  valueContainer: (base) => ({ ...base, padding: "0.75rem 1rem" }),
  singleValue: (base) => ({ ...base, color: "#A3ABB2" }),
  placeholder: (base) => ({ ...base, color: "#A3ABB2" }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1F2124",
    color: "#A3ABB2",
    borderRadius: "0.5rem",
    marginTop: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#2c2f33"
      : state.isFocused
      ? "#2a2d30"
      : "#1F2124",
    color: "#A3ABB2",
    padding: "10px 16px",
    "&:active": {
      backgroundColor: "#2c2f33",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#A3ABB2",
    paddingRight: "0.75rem",
    "&:hover": {
      color: "#FFFFFF",
    },
  }),
});

const CreateMealStep4 = ({ mealPlanType, setMealPlanType, error, setError }: Props) => {
  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-fit h-fit">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex gap-x-5 items-center">
          What Do You Want For Your Fitness Meal?
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <GiMeal />
          </motion.span>
        </h1>
      </div>
      <div className="w-full h-fit flex flex-col gap-y-3">
        <label className="text-white font-medium text-sm" htmlFor="meal-plan-select">
          Select Your Meal Nutrition:
        </label>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Select
            id="meal-plan-select"
            value={mealPlanType}
            onChange={(option) => {
              setMealPlanType(option);
              if (error) setError("");
            }}
            options={options}
            styles={customStyles(!!error)}
            placeholder="Choose your plan"
            isSearchable={false}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </motion.div>
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

export default CreateMealStep4;