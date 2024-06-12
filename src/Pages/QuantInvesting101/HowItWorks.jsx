import React from "react";
import QuantInvesting101Process from "../../assets/QuantInvesting101_2.png"; // Placeholder image path

const HowItWorks = () => {
  return (
    <div className="bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          How Quantitative Investing Works
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={QuantInvesting101Process}
              alt="Quantitative Investing Process Illustration"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Quantitative investing involves using mathematical models to make
              investment decisions. Here’s a breakdown of the typical steps
              involved in the quant investing process:
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Steps in the Quant Investing Process
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Developing hypotheses based on market behavior</li>
                <li>Creating algorithms to test these hypotheses</li>
                <li>Backtesting strategies with historical data</li>
                <li>Implementing the strategies in live trading</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Key Considerations
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Risk management and optimization</li>
                <li>Continuous monitoring and adjustment of strategies</li>
                <li>Scalability and execution efficiency</li>
                <li>Regulatory compliance and operational integrity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
