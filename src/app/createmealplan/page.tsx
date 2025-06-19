"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardBackspace } from "react-icons/md";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CreateMealStep1 from "../components/CreateMealPlan/CreateMealStep1";
import CreateMealStep2 from "../components/CreateMealPlan/CreateMealStep2";
import CreateMealStep3, {
  OptionType,
} from "../components/CreateMealPlan/CreateMealStep3";
import CreateMealStep4 from "../components/CreateMealPlan/CreateMealStep4";
import CreateMealStep5, {
  OptionType as OptionType5,
} from "../components/CreateMealPlan/CreateMealStep5";
import CreateMealStep6 from "../components/CreateMealPlan/CreateMealStep6";
import CreateMealStep7 from "../components/CreateMealPlan/CreateMealStep7";

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");

  const [goal, setGoal] = useState<OptionType | null>(null);
  const [goalError, setGoalError] = useState("");

  const [gender, setGender] = useState<OptionType | null>(null);
  const [genderError, setGenderError] = useState("");

  const [mealPlanType, setMealPlanType] = useState<OptionType | null>(null);
  const [mealPlanError, setMealPlanError] = useState("");

  const [workoutDecision, setWorkoutDecision] = useState<OptionType5 | null>(
    null
  );
  const [workoutDecisionError, setWorkoutDecisionError] = useState("");

  const [age, setage] = useState<OptionType5 | null>(null);
  const [ageError, setageError] = useState("");

  const steps = [
    {
      component: (
        <CreateMealStep1
          weight={weight}
          setWeight={setWeight}
          error={weightError}
          setError={setWeightError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep2
          goal={goal}
          setGoal={setGoal}
          error={goalError}
          setError={setGoalError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep3
          gender={gender}
          setGender={setGender}
          error={genderError}
          setError={setGenderError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep4
          mealPlanType={mealPlanType}
          setMealPlanType={setMealPlanType}
          error={mealPlanError}
          setError={setMealPlanError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep5
          workoutDecision={workoutDecision}
          setWorkoutDecision={setWorkoutDecision}
          error={workoutDecisionError}
          setError={setWorkoutDecisionError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep6
          age={age}
          setage={setage}
          error={ageError}
          setError={setageError}
        />
      ),
    },
    {
      component: (
        <CreateMealStep7
          formData={{
            weight,
            goal: goal?.value || "",
            gender: gender?.value || "",
            mealPlanType: mealPlanType?.value || "",
            workoutDecision: workoutDecision?.value || "",
            age: age?.value || "",
          }}
        />
      ),
    },
  ];

  const handleBackClick = () => {
    setDirection(-1);
    if (currentStep === 1) {
      router.push("/meals");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    setDirection(1);
    if (currentStep === 1 && !weight.trim()) {
      setWeightError("Please enter your current weight.");
      return;
    }
    if (currentStep === 2 && !goal) {
      setGoalError("Please select a goal.");
      return;
    }
    if (currentStep === 3 && !gender) {
      setGenderError("Please select your gender.");
      return;
    }
    if (currentStep === 4 && !mealPlanType) {
      setMealPlanError("Please select your meal plan type.");
      return;
    }
    if (currentStep === 5 && !workoutDecision) {
      setWorkoutDecisionError("Please select your workout decision.");
      return;
    }
    if (currentStep === 6 && !age) {
      setageError("Please select your age.");
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full min-h-screen text-white bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col justify-center items-center gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
      <motion.div
        className="w-full max-w-2xl border border-[#40474f] rounded-lg py-4 bg-[#1a1d20]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex p-4 items-center relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
          >
            <MdKeyboardBackspace className="text-2xl text-white cursor-pointer" />
          </motion.button>
          <div className="flex flex-1 justify-center items-center">
            <div className="flex items-center">
              <Image
                src="/images/NavBar_Images/img1.svg"
                alt="FitTrack"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="ml-2 font-bold text-lg">FitTrack</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <div className="w-full bg-[#40474f] rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="w-full h-fit flex justify-center items-center p-4 min-h-[300px] sm:min-h-[350px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {steps[currentStep - 1].component}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between p-4">
          {currentStep < steps.length && (
            <motion.button
              onClick={handleNextClick}
              className="px-6 py-3 bg-white cursor-pointer text-black rounded-full ml-auto font-medium hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
