import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../components/common/Heading";

const OpenAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    uidNo: "",
    panNumber: "",
    eSign: null,
    panCard: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitForm = () => {
    // console.log("Form submitted", formData);
    // Handle form submission here
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && step < 3) nextStep();
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [step]);

  const renderStep = () => {
    const stepVariants = {
      hidden: { opacity: 0, x: "-100%" },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "100%" },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen  text-black p-6"
        >
          {step === 1 && (
            <>
              <Heading level={1} className="md:text-subheading  mb-16">
                Let's start with your name
              </Heading>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="firstName"
                  className="block md:text-subheading mb-4"
                >
                  1. Enter Your First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 md:text-subheading bg-transparent border-b-2 border-black focus:outline-none focus:border-yellow-300 text-black"
                />
              </div>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="lastName"
                  className="block md:text-subheading mb-4"
                >
                  2. Enter Your Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 md:text-subheading bg-transparent border-b-2 border-black focus:outline-none focus:border-yellow-300 text-black"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Heading level={1} className="md:text-subheading  mb-16">
                Your identification details
              </Heading>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="uidNo"
                  className="block md:text-subheading mb-4"
                >
                  3. Enter Your UID Number
                </label>
                <input
                  id="uidNo"
                  type="text"
                  name="uidNo"
                  value={formData.uidNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 md:text-subheading bg-transparent border-b-2 border-black focus:outline-none focus:border-yellow-300 text-black"
                />
              </div>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="panNumber"
                  className="block md:text-subheading mb-4"
                >
                  4. Enter Your PAN Number
                </label>
                <input
                  id="panNumber"
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 md:text-subheading bg-transparent border-b-2 border-black focus:outline-none focus:border-yellow-300 text-black"
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Heading level={1} className="md:text-subheading  mb-16">
                Upload your documents
              </Heading>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="eSign"
                  className="block md:text-subheading mb-4"
                >
                  5. Upload Your E-Sign
                </label>
                <input
                  id="eSign"
                  type="file"
                  name="eSign"
                  onChange={handleInputChange}
                  className="w-full md:text-subheading text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-body file:
                    file:bg-white file:text-black
                    hover:file:bg-violet-100"
                />
              </div>
              <div className="w-full max-w-3xl mb-16">
                <label
                  htmlFor="panCard"
                  className="block md:text-subheading mb-4"
                >
                  6. Upload Your PAN Card
                </label>
                <input
                  id="panCard"
                  type="file"
                  name="panCard"
                  onChange={handleInputChange}
                  className="w-full md:text-subheading text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-body file:
                    file:bg-white file:text-black
                    hover:file:bg-violet-100"
                />
              </div>
            </>
          )}
          <div className="flex justify-between w-full max-w-3xl">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-8 py-3 rounded-full bg-beige text-white  md:text-subheading hover:bg-gray-200 transition duration-300"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-8 py-3 rounded-full bg-beige text-white  md:text-subheading hover:bg-gray-200 transition duration-300 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitForm}
                className="px-8 py-3 rounded-full bg-beige text-white  md:text-subheading transition duration-300 ml-auto"
              >
                Submit
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return <div className="h-screen overflow-hidden ">{renderStep()}</div>;
};

export default OpenAccount;
