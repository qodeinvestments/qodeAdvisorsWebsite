import React from "react";
import { motion } from "framer-motion";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const OurBeliefsAndValues = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const tileVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="bg-white  text-gray-900 min-h-screen">
      <motion.div
        className="bg-gray-100 text-black py-24 px-4 sm:px-6 lg:px-8 text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <Heading level={1} className="md:text-subheading  mb-4">
          Our Beliefs and Values
        </Heading>
        <Text className="max-w-3xl mx-auto md:text-subheading">
          At Qode, we're an investment firm leveraging quantitative models to
          drive informed and strategic investment decisions.
        </Text>
      </motion.div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <Heading level={2} className="md:text-subheading  mb-4">
              Our Belief and Mission
            </Heading>
            <Text>
              We believe finance is a vital aspect of everyone's life,
              simplifying and enhancing daily living. Our mission is to make
              wealth creation a simple, achievable, and repeatable process
              accessible to all. By combining data with time, we ensure that
              wealth generation is straightforward and attainable.
            </Text>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <Heading level={2} className="md:text-subheading  mb-4">
              Transparency
            </Heading>
            <Text>
              We use clear, factual communication to help clients understand
              opportunities and risks realistically, ensuring transparency.
            </Text>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <Heading level={2} className="md:text-subheading  mb-4">
              Fundamental Research
            </Heading>
            <Text>
              Our research is more than just numbers. We don't stop at
              spreadsheets and site visits. Year over year, we get to know the
              people who make the company work.
            </Text>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <Heading level={2} className="md:text-subheading  mb-4">
              Distinctive Investing Approach
            </Heading>
            <Text>
              Our system prioritizes consistent and repeatable investment
              results.
            </Text>
          </motion.div>

          <motion.div
            className=" p-8 rounded-lg shadow-md md:col-span-2"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <div className="py-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                <div
                  className={`bg-white p-8 rounded-lg transition-opacity duration-1000 `}
                >
                  <Heading level={2} className="md:text-subheading  mb-4">
                    Long-term View
                  </Heading>
                  <Text className="mb-4">
                    Because time is more important than timing, we focus on
                    long-term growth and sustainability.
                  </Text>
                  <ul className="list-disc pl-5">
                    <li>Patience in investment strategies</li>
                    <li>Focus on sustainable business models</li>
                    <li>Emphasis on compounding returns over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurBeliefsAndValues;
