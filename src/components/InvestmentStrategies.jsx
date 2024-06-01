import React from "react";
import quantGrowth from "../assets/quantGrowth.png";
import quantMomentum from "../assets/quantMomentum.png";
const InvestmentStrategies = () => {
  return (
    <div className="text-center inter-font bg-[#f8f9f9] p-8">
      <p className="uppercase text-[12px] tracking-widest font-bold text-gray-400 ">
        Qode Your Future: Data-Driven Decisions for a Quantum Leap.
      </p>
      <h2 className="text-4xl font-bold mt-4">Our Investment Strategies</h2>
      <p className="text-gray-400 font-medium mt-4 text-md mx-auto max-w-4xl">
        With the help of our team, data and technology we design models that
        help us make investment decisions. Through our <span className="text-red-500">Portfolio Management Service (PMS)</span>, we invest your money in Indian Equity.
      </p>
      <div className="flex flex-col lg:flex-row justify-center mt-8">
        <div className="bg-white p-6 flex flex-col justify-between rounded-lg shadow-md mb-8 lg:mb-0 lg:mr-8 w-full lg:w-1/4">
          <div className="mb-4 ">
            <img src={quantGrowth} alt="Logo 1" className="w-10 h-10 mr-4" />
            <h3 className="text-xl text-start mt-10 font-semibold">
              Quant Growth Fund
            </h3>
          </div>
          <p className="text-gray-600 text-start">
            The Quant Growth Fund seeks high-growth potential with data-driven
            precision. We leverage quantitative analysis to identify companies
            poised for significant expansion. This approach aims to deliver
            strong returns while managing risk through a statistically rigorous
            selection process.
          </p>
          <button className="text-start bg-black rounded-lg w-fit text-white px-5 py-2 mt-5">View More</button>
        </div>
        <div className="bg-white p-6 rounded-lg flex flex-col justify-between shadow-md mb-8 lg:mb-0 lg:mr-8 w-full lg:w-1/4">
          <div className="mb-4 ">
            <img src={quantMomentum} alt="Logo 1" className="w-10 h-10 mr-4" />
            <h3 className="text-xl text-start mt-10 font-semibold">
              Quant Growth Momentum
            </h3>
          </div>
          <p className="text-gray-600 text-start">
            Harnessing market trends, Qode's quant momentum fund utilizes
            data-driven algorithms to identify and capitalize on securities with
            upward momentum. This systematic approach aims to capture short-term
            gains while managing risk through rigorous quantitative analysis.
          </p>
          <button className="text-start bg-black rounded-lg w-fit text-white px-5 py-2 mt-5">View More</button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStrategies;
