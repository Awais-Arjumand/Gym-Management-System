"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Quotes from "./Quotes";
import { motion } from "framer-motion";

interface QuoteData {
  q: string;
  a: string;
}

const MotivationalQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);

  const colorClasses = [
    "bg-blue-100",
    "bg-purple-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-indigo-100",
    "bg-amber-100",
    "bg-emerald-100",
    "bg-cyan-100",
  ];

  const textColors = [
    "text-blue-800",
    "text-purple-800",
    "text-green-800",
    "text-yellow-800",
    "text-pink-800",
    "text-indigo-800",
    "text-amber-800",
    "text-emerald-800",
    "text-cyan-800",
  ];

  const fallbackQuotes = [
    {
      q: "The only limit to our realization of tomorrow is our doubts of today.",
      a: "Franklin D. Roosevelt",
    },
    {
      q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      a: "Winston Churchill",
    },
    { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  ];

  const fetchQuotesWithRetry = async (retries = 3) => {
    const CORS_PROXY = "https://corsproxy.io/";
    const QUOTES_API = "https://zenquotes.io/api/quotes";

    for (let i = 0; i < retries; i++) {
      try {
        setLoading(true);
        const response = await axios.get(`${CORS_PROXY}?${QUOTES_API}`, {
          timeout: 5000, // 5 second timeout
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data) {
          const data = Array.isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          const shuffled = data.sort(() => 0.5 - Math.random());
          setQuotes(shuffled.slice(0, 3));
          return;
        }
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        if (i === retries - 1) {
          console.log("Using fallback quotes after all retries failed");
          setQuotes(fallbackQuotes);
        }
      } finally {
        setLoading(false);
      }

      // Wait before retrying (exponential backoff)
      if (i < retries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  };

  useEffect(() => {
    fetchQuotesWithRetry();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 md:px-14 py-10 md:py-16 flex flex-col gap-y-6 md:gap-y-10">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full text-center md:text-left"
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Motivational Quotes
        </h1>
      </motion.div>

      {/* Animated Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {loading ? (
          <>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          </>
        ) : (
          quotes.map((quote, idx) => {
            const colorIndex = Math.floor(Math.random() * colorClasses.length);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <Quotes
                  quote={quote}
                  colorClass={colorClasses[colorIndex]}
                  textColor={textColors[colorIndex]}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MotivationalQuotes;
