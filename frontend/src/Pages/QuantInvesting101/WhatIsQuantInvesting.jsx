import React from "react";
import QuantInvesting101 from "../../assets/QuantInvesting101_1.png";
import Heading from "../../components/common/Heading";
const WhatIsQuantInvesting = () => {
  return (
    <div className="bg-white  p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="md:text-subheading  text-gray-800 mb-8">
          What is Quantitative Investing?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <div>
            <img
              src={QuantInvesting101}
              alt="Quantitative Investing Illustration"
              className="rounded-lg shadow-md"
            />
          </div> */}
          <div className="space-y-4">
            <p className="text-body text-gray-700">
              Quantitative investing, also known as quant investing, is an
              investment approach that relies on mathematical models and
              statistical analysis to identify potential trading opportunities
              and make investment decisions.
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <Heading
                level={3}
                className="md:text-subheading  text-gray-800 mb-2"
              >
                Key Features
              </Heading>
              <ul className="list-disc list-inside space-y-2">
                <li>Systematic and rule-based</li>
                <li>Data-driven and automated</li>
                <li>Leverages advanced quantitative techniques</li>
                <li>Aims to minimize human biases and emotions</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <Heading
                level={3}
                className="md:text-subheading  text-gray-800 mb-2"
              >
                Benefits
              </Heading>
              <ul className="list-disc list-inside space-y-2">
                <li>Consistent and disciplined approach</li>
                <li>Ability to process large amounts of data</li>
                <li>Potential for higher returns and risk management</li>
                <li>Diversification across strategies and asset classes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsQuantInvesting;
