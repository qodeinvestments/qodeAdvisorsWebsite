import React, { useState, useEffect } from "react";
import banImg from "../assets/banner1-removebg.png";
import backgroundImage from "../assets/bg-halftone@2x.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
const Banner = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 200; // Typing speed in milliseconds
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
    <div
      className="flex flex-col md:flex-row items-center graphik-font-regular justify-between mt-20 px-4 md:px-10 py-10"
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full md:w-2/3 md:px-20 mb-8 md:mb-0">
        <h1 className="text-3xl text-[#171E27] md:text-5xl font-black graphik-font-medium">
          The best investments are <br /> {"{"}
          <span className="text-red-500 italic">{currentText}</span>
          {"}"}
        </h1>
        <p className="text-lg md:text-2xl  text-gray-600 font-medium mt-4 md:mt-10">
          We're an investment firm leveraging quantitative models to drive
          informed and strategic investment decisions.
        </p>
        <div className="">
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates:
          </p>
          <form className="flex">
            <input
              type="email"
              className="sm:w-1/2 px-4 py-2 rounded-l bg-gray-200 text-gray-400 border border-gray-600"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-r"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img
          className="h-auto max-w-full mx-auto"
          src={banImg}
          alt="Banner Image"
        />
      </div>
    </div>
  );
};

export default Banner;
