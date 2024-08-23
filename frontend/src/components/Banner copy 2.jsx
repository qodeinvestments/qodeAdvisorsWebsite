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
    <div className="relative min-h-screen sophia-pro-font flex mt-10 items-center justify-center overflow-hidden">
      <Container className="flex-grow flex items-center justify-center">
        <div className="w-full   py-32     mx-auto  text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:text-lg md:text-lg lg:text-7xl sophia-pro-font text-primary-dark mb-28"
          >
            We manage wealth for Individuals, Families & Businesses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:md:text-lg  max-w-3xl mx-auto  text-primary-dark my-10"
          >
            Driven by data and crafted to be objective and emotion-free, our
            investment strategies are designed to help you build long-term
            wealth. Every decision is meticulously carried out by Qode to ensure
            your financial success.
          </motion.p>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-16 mb-10"
          >
            <p className="md:text-lg md:text-lg lg:md:text-lg text-primary-dark">
              {currentText}
              <span className="animate-blink">|</span>
            </p>
          </motion.div> */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-dark text-white py-3 px-8 rounded-full shadow-2xl hover:bg-[#696969] transition duration-300 text-base md:text-lg"
          >
            Get Started
          </motion.button> */}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
