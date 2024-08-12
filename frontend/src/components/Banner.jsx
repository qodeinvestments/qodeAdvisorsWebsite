import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/bannImage.png";
import { BackgroundSVG } from "./ui/Background-SVG";
import Container from "./container/Container";

const Banner = () => {
  // ... previous state and useEffect code ...
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data.",
    "objective and emotion-free.",
    "carried out by Qode.",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  return (
    <div className="relative min-h-[70vh] flex justify-start p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden sophia-pro-bold-font">
      <div className="py-10 sm:py-14 md:py-16 lg:py-24 text-start">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-6"
        >
          The best investments are <br />
          <div className="h-[1.2em] sm:h-[1.4em] md:h-[1.2em] lg:h-[1.5em] mb-4 sm:mb-6">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </motion.h1>

        <hr
          style={{
            color: "#cccccc",
            backgroundColor: "#cccccc",
          }}
          className="flex-grow max-w-[15rem] sm:max-w-[20rem] lg:max-w-[25rem] my-8 sm:my-12 lg:my-20"
        />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-xl md:text-2xl lg:text-4xl text-gray-900 mb-4 sm:mb-6 md:mb-8"
        >
          We manage wealth for Individuals, Families & Businesses.
        </motion.h1>

        <div className="flex flex-col md:flex-row minion-pro-font items-center md:items-start mt-8 sm:mt-10 md:mt-16 lg:mt-20 gap-4 sm:gap-6 md:gap-14">
          <hr
            style={{
              color: "#cccccc",
              backgroundColor: "#cccccc",
            }}
            className="flex-grow max-w-[4rem] w-12 sm:w-16 md:w-32 mt-2 mb-4 md:mb-0"
          />
          <p className="text-sm sm:text-md text-black max-w-xs sm:max-w-sm">
            To help you build wealth in the long term, we've made data-driven
            investment strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
