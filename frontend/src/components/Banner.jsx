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
    <div className="flex justify-start  overflow-hidden">
      <div className="text-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <Heading level={1} className="text-heading text-brown mb-2">
            WE STARTED WITH GROWING OUR'S & OUR FAMILY BUSINESS WEALTH IN THE
            STOCK MARKET
          </Heading>
          <Text className="border border-brown p-2">
            WE WANTED TO GROW OUR 1OCR TO 80CR WITHIN 10 YEARS WITH THE HIGHEST
            PROBABLITY. HOW WE DID IT?
          </Text>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
