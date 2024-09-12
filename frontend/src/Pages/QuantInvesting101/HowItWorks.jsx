import React from "react";
import QuantInvesting101Process from "../../assets/QuantInvesting101_2.png"; // Placeholder image path
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";

const HowItWorks = () => {
  return (
    <div className="bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Heading
          level={1}
          className="md:text-subheading  text-gray-800 mb-8 text-center"
        >
          How Quantitative Investing Works
        </Heading>

        <Text className="text-body text-gray-700 mb-8 text-center">
          Quantitative investing involves using mathematical models to make
          investment decisions. Let's break down the typical steps involved in
          the quant investing process:
        </Text>

        {/* <div className="mb-12">
          <img
            src={QuantInvesting101Process}
            alt="Quantitative Investing Process Illustration"
            className="rounded-lg shadow-md h-96 mx-auto w-auto"
          />
        </div> */}

        <div className="space-y-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <Heading
              level={3}
              className="md:text-subheading  text-gray-800 mb-4"
            >
              Steps in the Quant Investing Process
            </Heading>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">■</span>
                <span>Developing hypotheses based on market behavior</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">■</span>
                <span>Creating algorithms to test these hypotheses</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">■</span>
                <span>Backtesting strategies with historical data</span>
              </li>
              <li className="flex items-center">
                <span className="text-brown mr-2">■</span>
                <span>Implementing the strategies in live trading</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <Heading
              level={3}
              className="md:text-subheading  text-gray-800 mb-4"
            >
              Key Considerations
            </Heading>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-purple-500 mr-2">●</span>
                <span>Risk management and optimization</span>
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 mr-2">●</span>
                <span>Continuous monitoring and adjustment of strategies</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">●</span>
                <span>Scalability and execution efficiency</span>
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 mr-2">●</span>
                <span>Regulatory compliance and operational integrity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
