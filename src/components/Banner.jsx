import React, { useState, useEffect, useRef } from "react";
import banImg from "../assets/landing.png";

const Banner = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 200; // Typing speed in milliseconds
  const deletingSpeed = 90; // Deleting speed in milliseconds
  const delayBetweenTexts = 1000; // Delay between texts in milliseconds
  const textArray = [
    "an investment house",
    "a wealth management firm",
    "not stock tip provider",
    "focused on growth, research driven",
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-3xl mx-auto">
        <img
          className="w-full max-h-96  object-contain"
          src={banImg}
          alt="Banner Image"
        />
        <div className="text-center mt-4">
          <h1 className="text-3xl md:text-5xl font-bold typewriter-font">
            We are {"{"}
            <span>{currentText}</span>
            {"}"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;