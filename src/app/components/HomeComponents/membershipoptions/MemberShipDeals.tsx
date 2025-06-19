"use client";
import Link from "next/link";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";

interface MemberShipDealsTypes {
  PaymentTitle: string;
  Price: string;
  ButtonText: string;
  features: string[];
  isFree: boolean;
  isSignedIn?: boolean;
}

const MemberShipDeals = ({
  PaymentTitle,
  Price,
  features,
  isFree,
  isSignedIn
}: MemberShipDealsTypes) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-xs sm:max-w-none px-5 py-6 sm:px-6 sm:py-7 md:px-7 md:py-8 flex flex-col gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#40474f] group cursor-pointer duration-300 hover:border-[#1A78E5]"
    >
      <div className="flex flex-col gap-y-4 sm:gap-y-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{PaymentTitle}</h3>
        <h1 className="font-black text-3xl sm:text-4xl">
          {Price} <span className="font-bold text-sm sm:text-base">/month</span>
        </h1>

        <div className="w-full h-fit flex flex-col gap-y-2 sm:gap-y-3 min-h-[200px] sm:min-h-[260px] pt-3 sm:pt-5">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-x-2 sm:gap-x-3 items-start">
              <IoMdCheckmark className="text-lg sm:text-xl text-[#1A78E5] mt-[2px]" />
              <span className="font-normal text-xs sm:text-sm text-[#A3ABB2]">{feature}</span>
            </div>
          ))}
        </div>

        {isFree ? (
          isSignedIn ? (
            <Link
              href="/supplements"
              className={`w-full py-2 sm:py-3 text-center font-bold rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base ${
                "bg-[#2B3036] hover:bg-[#3a424a]"
              }`}
            >
              Access Supplements Section
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className={`w-full py-2 sm:py-3 text-center font-medium cursor-pointer rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base ${
                "bg-[#2B3036] hover:bg-[#3a424a]"
              }`}>
                Get Started
              </button>
            </SignInButton>
          )
        ) : (
          isSignedIn ? (
            <Link
              href="/payment"
              className={`w-full py-2 sm:py-3 text-center cursor-pointer font-medium rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base ${
                "bg-[#1A78E5] hover:bg-[#1364c1]"
              }`}
            >
              Upgrade Now
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className={`w-full py-2 sm:py-3 text-center cursor-pointer font-medium rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base ${
                "bg-[#1A78E5] hover:bg-[#1364c1]"
              }`}>
                Sign Up to Upgrade
              </button>
            </SignInButton>
          )
        )}
      </div>
    </motion.div>
  );
};

export default MemberShipDeals;