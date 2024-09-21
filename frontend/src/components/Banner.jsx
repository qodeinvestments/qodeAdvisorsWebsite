import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/bannImage.png";
import { BackgroundSVG } from "./ui/Background-SVG";
import Container from "./container/Container";
import Heading from "./common/Heading";
import Text from "./common/Text";
import CustomLink from "./common/CustomLink";

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
    <div className="flex justify-start overflow-hidden">
      <div className="text-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          {/* <Heading className="text-mobileHeading sm:text-heading  text-brown sm:mb-4">
            We started with growing our's & our family business wealth in the
            stock market
          </Heading>
          <div className="group">
            <CustomLink
              to={
                "/blogs/we-wanted-to-grow-our-10cr-to-80cr-within-10-years-with-the-highest-probability-how-did-we-do-it"
              }
              className="flex flex-col sm:flex-row justify-between border items-center border-brown transition-all duration-300 hover:bg-beige text-black hover:shadow-xl p-1"
            >
              <Text className="flex-1 group-hover:text-black ">
                We wanted to grow our{" "}
                <strong className="text-beige group-hover:text-black">
                  ₹10 CR to ₹80 CR within 10 years{" "}
                </strong>
                with the highest probability. Read to know how we did it.
              </Text>
              <div className=" self-end  text-right font-black group-hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="52"
                  height="52"
                >
                  <path
                    d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </CustomLink>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
