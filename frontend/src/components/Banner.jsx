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
    <div className="relative min-h-screen md:p-14 flex items-center justify-center overflow-hidden sophia-pro-bold-font">
      <div className="  mx-auto px-4 py-16 md:py-24 lg:py-32  md:text-start">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl mt-10 lg:text-5xl text-gray-900 mb-6"
        >
          The best investments are <br />
          <div className="h-[1.5em] md:h-[1.2em] lg:h-[1.5em] mb-6">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </motion.h1>
        {/* <div className="flex flex-col md:flex-row  items-center md:items-start  gap-6 md:gap-14">
          <hr
            style={{
              color: "#cccccc",
              backgroundColor: "#cccccc",
            }}
            className="flex-grow max-w-[4rem] w-16 md:w-32 mt-3 mb-4 md:mb-0"
          />
          <p className="text-lg md:text-xl text-black max-w-xs md:max-w-sm">
            {currentText}
            <span className="animate-blink">|</span>
          </p>
        </div> */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="h-12 md:h-16 lg:h-20 mb-6 overflow-hidden"
        >
          <div className="text-xl minion-pro-font md:text-2xl lg:text-3xl font-bold text-primary-dark bg-gray-100 py-2 px-4 rounded inline-block">
            {currentText}
            <span className="animate-blink">|</span>
          </div>
        </motion.div> */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-900 mt-20 mb-6 md:mb-8"
        >
          We manage wealth for Individuals, Families & Businesses.
        </motion.h1>

        <div className="flex flex-col md:flex-row minion-pro-font items-center md:items-start mt-10 md:mt-20 gap-6 md:gap-14">
          <hr
            style={{
              color: "#cccccc",
              backgroundColor: "#cccccc",
            }}
            className="flex-grow max-w-[4rem] w-16 md:w-32 mt-3 mb-4 md:mb-0"
          />
          <p className="text-lg md:text-xl text-black max-w-xs md:max-w-sm">
            To help you build wealth in the long term, we've made data-driven
            investment strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
