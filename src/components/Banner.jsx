import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/newBanner1.jpg";

import { faEnvelope, faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { BackgroundBeams } from "./ui/background-beams";
import { BackgroundSVG } from "./ui/Background-SVG";

const Banner = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 250; // Typing speed in milliseconds
  const deletingSpeed = 90; // Deleting speed in milliseconds
  const delayBetweenTexts = 1000; // Delay between texts in milliseconds
  const textArray = [
    "driven by data",
    "objective and emotion free",
    "carried out by Qode",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      // Typing effect
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, wait and then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      // Deleting effect
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to the next text
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  return (
    <div className="flex flex-col bg-[#171E27] rounded-b-[3rem] md:flex-row items-center graphik-font-regular h-screen justify-center text-center px-4 md:px-10 py-10">
      <div className="w-full md:w-3/4 z-10 md:px-20 mb-8 md:mb-0">
        <h1 className="text-3xl text-white md:text-6xl  font-black graphik-font-semibold">
          The best investments are <br /> {"{"}
          <span className="text-red-500 codingFont font-black">
            {currentText}
          </span>
          {"}"}
        </h1>
        <p className="text-lg md:text-2xl  text-gray-400 font-medium mt-4 md:mt-10">
          We're an investment firm leveraging quantitative models to drive
          informed and strategic investment decisions.
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <BackgroundSVG />
      </div>
    </div>
  );
};

export default Banner;
