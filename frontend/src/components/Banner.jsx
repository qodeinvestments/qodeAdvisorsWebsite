import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "./container/Container";
import Heading from "./common/Heading";
import Text from "./common/Text";
import CustomLink from "./common/CustomLink";
import banImageNew from "../assets/websiteBanner.jpg"; // Ensure the correct image path
import Modal from "./Modal";
import GrowMoney from "../Pages/GrowMoney";
import SectionContent from "./container/SectionContent";
import Button from "./common/Button";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div
      className="relative flex justify-center items-center overflow-hidden h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${banImageNew})`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content */}
      <div className="relative text-center z-10 flex justify-center items-center gap-4  h-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionContent className="text-center max-w-[1066px] m-auto text-lightBeige ">
            <Heading className="sm:text-semiheading italic text-mobileSemiHeading font-subheading mb-8 ">
              We manage and grow long-term wealth for high-net-worth
              individuals, their families, and businesses.
            </Heading>
            <Button
              isGlassmorphism={true}
              onClick={openModal}
              className="sm:mt-1 mt-3 text-lightBeige hover:bg-black hover:bg-opacity-45 hover:text-white border border-beige"
            >
              Grow your money with Qode
            </Button>
          </SectionContent>
        </motion.div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <GrowMoney />
        </Modal>
      )}
    </div>
  );
};

export default Banner;
