import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/bannImage.png";
import { BackgroundSVG } from "./ui/Background-SVG";
import Container from "./container/Container";
import Heading from "./common/Heading";
import Text from "./common/Text";

const Banner = () => {
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
    <div className="flex justify-start overflow-hidden ">
      <div className="text-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            level={1}
            className="text-2xl sm:text-2xl md:text-3xl lg:text-7xl text-brown mb-4 sm:mb-6"
          >
            The best investments are <br />
            <div className="h-[1.2em] sm:h-[1.4em] md:h-[1.2em] lg:h-[1.5em] mb-4 sm:mb-6">
              {currentText} <span className="animate-blink">|</span>
            </div>
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            level={2}
            className="text-2xl sm:text-heading md:text-2xl lg:text-4xl text-brown mb-4 sm:mb-6 md:mb-8"
          ></Heading>
        </motion.div>
        {/* // Example adjustments in the Banner component */}
        <div className="flex flex-col md:flex-row items-center md:items-start mt-4 md:mt-6 gap-2 md:gap-3">
          <hr
            style={{
              color: "#cccccc",
              backgroundColor: "#cccccc",
            }}
            className="flex-grow max-w-[4rem] w-12 sm:w-16 md:w-32 mt-1 mb-2 md:mb-0"
          />
          <Text className="text-xs sm:text-body text-black max-w-xs sm:max-w-sm">
            We manage wealth for Individuals, Families & Businesses. To help you
            build wealth in the long term, we've made data-driven investment
            strategies.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Banner;
