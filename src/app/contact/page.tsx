"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiFacebook, CiLocationOn, CiTwitter } from "react-icons/ci";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import ContactBoxes from "../components/ContactUs/ContactBoxes";
import ContactLinks from "../components/ContactUs/ContactLinks";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form submitted:", data);
    toast.success("Message sent successfully!");
    reset();
  };

  const ContactUsIconData = [
    {
      icon: <IoMailOutline />,
      label: "Email",
      detail: "support@fittrack.com",
    },
    {
      icon: <IoCallOutline />,
      label: "Phone",
      detail: "+1 (555) 123-4567",
    },
    {
      icon: <CiLocationOn />,
      label: "Address",
      detail: "123 Health Street, Fitness City, 10001",
    },
  ];

  const ContactUsLinksIconData = [
    {
      icon: <CiTwitter />,
      label: "Twitter",
      href: "https://twitter.com/fittrack",
    },
    {
      icon: <CiFacebook />,
      label: "Facebook",
      href: "https://facebook.com/fittrack",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/fittrack",
    },
  ];

  return (
    <div className="w-full min-h-screen text-white bg-primary py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-fit flex flex-col gap-y-4"
      >
        <div className="w-fit h-fit flex flex-col gap-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Contact Us</h1>
          <h1 className="text-sm sm:text-base font-normal text-[#A3ABB2]">
            We&apos;re here to help! Reach out to us with any questions or feedback
            you may have.
          </h1>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-fit flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Field */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              placeholder="Your Name"
              className="w-full md:w-2/3 lg:w-1/2 rounded-xl px-4 py-3 sm:py-4 text-[#A3ABB2] placeholder:text-[#A3ABB2] outline-none border border-[#40474f] bg-[#1F2124]"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-400 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="Your Email"
              className="w-full md:w-2/3 lg:w-1/2 rounded-xl px-4 py-3 sm:py-4 text-[#A3ABB2] placeholder:text-[#A3ABB2] outline-none border border-[#40474f] bg-[#1F2124]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Subject Field */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="font-semibold" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              placeholder="Subject"
              className="w-full md:w-2/3 lg:w-1/2 rounded-xl px-4 py-3 sm:py-4 text-[#A3ABB2] placeholder:text-[#A3ABB2] outline-none border border-[#40474f] bg-[#1F2124]"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <span className="text-red-400 text-sm">{errors.subject.message}</span>
            )}
          </div>

          {/* Message Field */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="w-full md:w-2/3 lg:w-1/2 rounded-xl px-4 py-3 sm:py-4 text-[#A3ABB2] placeholder:text-[#A3ABB2] h-40 sm:h-64 outline-none border border-[#40474f] bg-[#1F2124]"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <span className="text-red-400 text-sm">{errors.message.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto self-end rounded-3xl bg-white text-black hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out px-6 py-2 font-semibold cursor-pointer mt-4"
          >
            Submit
          </button>
        </motion.form>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full h-fit flex flex-col gap-y-8 mt-8"
        >
          <h1 className="font-bold text-lg sm:text-xl text-white">Contact Information</h1>
          <div className="w-fit h-fit flex flex-col gap-y-4">
            {ContactUsIconData.map((item, key) => (
              <ContactBoxes
                icon={item.icon}
                label={item.label}
                details={item.detail}
                key={key}
              />
            ))}
          </div>

          {/* Social Links */}
          <h1 className="font-bold text-lg sm:text-xl text-white">Follow Us</h1>
          <div className="w-fit h-fit flex flex-wrap gap-4 sm:gap-7">
            {ContactUsLinksIconData.map((item, key) => (
              <ContactLinks
                icon={item.icon}
                label={item.label}
                key={key}
                href={item.href}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Page;
