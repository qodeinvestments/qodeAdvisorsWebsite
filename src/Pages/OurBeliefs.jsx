import React from "react";
import { motion } from "framer-motion";

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
    <div className="bg-white graphik-font-regular text-gray-900 min-h-screen">
      <motion.div
        className="bg-gray-100 text-black py-24 px-4 sm:px-6 lg:px-8 text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-4xl  mb-4">Our Beliefs and Values</h1>
        <p className="max-w-3xl mx-auto text-xl">
          At Qode, we're an investment firm leveraging quantitative models to
          drive informed and strategic investment decisions.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl  mb-4">Our Belief and Mission</h2>
            <p>
              We believe finance is a vital aspect of everyone's life,
              simplifying and enhancing daily living. Our mission is to make
              wealth creation a simple, achievable, and repeatable process
              accessible to all. By combining data with time, we ensure that
              wealth generation is straightforward and attainable.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl  mb-4">Transparency</h2>
            <p>
              We use clear, factual communication to help clients understand
              opportunities and risks realistically, ensuring transparency.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl  mb-4">Fundamental Research</h2>
            <p>
              Our research is more than just numbers. We don't stop at
              spreadsheets and site visits. Year over year, we get to know the
              people who make the company work.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            variants={tileVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl  mb-4">Distinctive Investing Approach</h2>
            <p>
              Our system prioritizes consistent and repeatable investment
              results.
            </p>
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
                  <h2 className="text-2xl  mb-4">Long-term View</h2>
                  <p className="mb-4">
                    Because time is more important than timing, we focus on
                    long-term growth and sustainability.
                  </p>
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
