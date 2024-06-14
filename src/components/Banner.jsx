import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/Investment data-amico.svg";
import { BackgroundSVG } from "./ui/Background-SVG";

const Banner = () => {
  // ... previous state and useEffect code ...
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data",
    "objective and emotion-free",
    "carried out by Qode",
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
    <div className="relative rounded-b-[3rem] h-[90vh] graphik-font-regular flex items-center overflow-hidden">
      {/* Background SVG */}

      {/* Container for content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col  gap-10 md:flex-row items-center">
          <div className="w-full md:w-2/3 text-center md:text-left mb-10 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000] mb-6"
            >
              The best investments are <br />{" "}
              <span className="text-[#48B4EA]  px-2 rounded">
                {"{"}
                <span className="font-mono">{currentText}</span>
                {"}"}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 mb-10"
            >
              We're an investment firm leveraging quantitative models to drive
              informed and strategic investment decisions.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#48B4EA] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#1374A4] transition duration-300"
            >
              Get Started
            </motion.button>
          </div>
          {/* <div className="w-full md:w-1/2">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -1, 0, 1, 0],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0,
              }}
              className="filter drop-shadow-xl"
            >
              <img
                src={bannerImage}
                alt="Data-driven investments"
                className="w-3/4  h-auto object-cover rounded-lg"
              />
            </motion.div>
          </div> */}
        </div>
      </div>
      {/* <BackgroundSVG className="absolute top-0 left-0 inset-0 w-full h-full" /> */}
    </div>
  );
};

export default Banner;
