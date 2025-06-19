"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import markdownToHtml from "../../../lib/markdownToHtml";

function MyMealsContent() {
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const formData = {
      weight: searchParams.get("weight") || "",
      goal: searchParams.get("goal") || "",
      gender: searchParams.get("gender") || "",
      mealPlanType: searchParams.get("mealPlanType") || "",
      workoutDecision: searchParams.get("workoutDecision") || "",
      age: searchParams.get("age") || "",
    };

    const generatePlans = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/generate-meal-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Generation failed");
        }

        const planSections = data.mealPlans.split("## Option").slice(1);

        const formattedPlans = await Promise.all(
          planSections.map(
            async (plan: string) => await markdownToHtml(`## Option${plan}`)
          )
        );

        setPlans(formattedPlans);

        // Save meal plans to JSON server
        if (userId) {
          await fetch("/api/save-meal-plan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mealPlans: formattedPlans,
            }),
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    generatePlans();
  }, [searchParams, userId]);

  if (loading) {
    return (
      <div className="w-full min-h-screen text-white bg-primary justify-center items-center py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4 flex justify-center items-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Creating your personalized meal plans...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen text-white justify-center items-center bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
        <div className="bg-red-900/30 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black rounded-full font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white justify-center items-center bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gray-900/30 p-6 rounded-lg max-w-4xl w-full"
          dangerouslySetInnerHTML={{ __html: plan }}
        />
      ))}
    </div>
  );
}

export default function MyMealsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen text-white bg-primary justify-center items-center py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4 flex justify-center items-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading...
          </motion.p>
        </div>
      }
    >
      <MyMealsContent />
    </Suspense>
  );
}
