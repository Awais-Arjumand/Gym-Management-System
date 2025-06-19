"use client";
import { linksData } from "@/app/utils/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import {
  ClerkLoaded,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-primary shadow-md shadow-white/20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/images/NavBar_Images/img1.svg"
                alt="FitTrack"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="ml-2 text-white font-bold text-lg">FitTrack</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {linksData.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-1 py-2 border-b-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "border-white text-white"
                      : "border-transparent text-[#A3ABB2] hover:text-white hover:border-gray-300"
                  }`}
                >
                  {item.link}
                </Link>
              ))}

              <div className="ml-4 flex items-center gap-2">
                <ClerkLoaded>
                  {isSignedIn ? (
                    <div className="flex items-center gap-3">
                      <SignOutButton>
                        <button className="text-sm font-medium text-white hover:underline">
                        </button>
                      </SignOutButton>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="bg-white cursor-pointer !text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                        Get Started
                      </button>
                    </SignInButton>
                  )}
                </ClerkLoaded>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              <ClerkLoaded>
                {isSignedIn ? (
                  <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="bg-white !text-black px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </ClerkLoaded>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md !text-[#A3ABB2] hover:text-white focus:outline-none"
                aria-label="Main menu"
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
                {linksData.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-normal ${
                      pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "!text-[#A3ABB2] hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.link}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default NavBar;
