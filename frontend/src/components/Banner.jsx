import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import banImageNew from "../assets/websiteBanner.jpg";
import SectionContent from "./container/SectionContent";
import Button from "./common/Button";
import SendEmailForm from "./SendEmailForm";

const Banner = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data.",
    "objective and emotion-free.",
    "carried out by Qode.",
  ];

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const handleFormSuccess = () => {
    // Show success message
    setShowSuccessMessage(true);

    // Close the success message and slider after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsSliderOpen(false);
    }, 3000);
  };

  useEffect(() => {
    // Prevent body scroll when slider is open
    document.body.style.overflow = isSliderOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSliderOpen]);

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
      className="relative px-18 sm:px-0 flex justify-center items-center overflow-hidden h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${banImageNew})`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content */}
      <div className="relative text-center z-10 flex justify-center items-center gap-4 h-full">
        <SectionContent className="text-center max-w-[1066px] mt-9 lg:mt-auto m-auto text-lightBeige">
          <Heading className="sm:text-semiheading italic text-mobileSemiHeading font-subheading mb-8">
            We grow wealth for individuals, families, and businesses.
          </Heading>
          <Button
            isGlassmorphism={true}
            onClick={toggleSlider}
            className="sm:mt-1 mt-3 border border-beige"
          >
            Grow your money with Qode
          </Button>
        </SectionContent>
      </div>

      {/* Success Message Modal (Above everything) */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
          <div className="bg-lightBeige p-2 rounded-lg text-center max-w-sm  sm:max-w-md">
            <h3 className="text-black text-2xl font-bold mb-4">
              Success!
            </h3>
            <p className="text-black text-lg mb-1">
              Your message has been sent. We'll get back to you soon!
            </p>
          </div>
        </div>
      )}

      {/* Scrollable Slider */}
      <div
  className={`fixed inset-0 bg-black bg-opacity-90 z-50 transform transition-transform duration-500 ease-in-out ${isSliderOpen ? "translate-y-0" : "-translate-y-full"} overflow-y-auto`}
  onClick={toggleSlider}
>
  <div
    className="relative max-w-7xl mx-auto py-2"
    onClick={(e) => e.stopPropagation()}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        console.log("Close button clicked");
        toggleSlider();
      }}
      className="absolute top-2 right-2 sm:top-4 md:right-4 p-2 text-beige text-md cursor-pointer z-[100] "
    >
      ✕
    </button>
    <SendEmailForm
      onClose={toggleSlider}
      onFormSuccess={handleFormSuccess}
    />
  </div>
</div>
    </div>
  );
};

export default Banner;