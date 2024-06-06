import React from "react";
import quantGrowth from "../assets/quantGrowth.png";
import quantGrowthImg from "../assets/whiteCode.png";
import quantMomentumImg from "../assets/banner.png";
import quantMomentum from "../assets/quantMomentum.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Tilt } from "react-tilt";
import AreaChart from "./Charts/AreaChart";
import { Link } from "react-router-dom";
const InvestmentStrategies = () => {
  return (
    <div className="text-center inter-font bg-[#f8f9f9] p-5 sm:px-24 sm:py-10">
      <p className="uppercase text-[12px] tracking-widest font-bold text-gray-400 ">
        Qode Your Future: Data-Driven Decisions for a Quantum Leap.
      </p>
      <h2 className="text-4xl font-bold mt-4 text-[#151E28]">
        Our Investment Strategies
      </h2>
      <p className="text-gray-400 font-medium mt-4 text-md mx-auto max-w-4xl">
        With the help of our team, data and technology we design models that
        help us make investment decisions. Through our{" "}
        <span className="text-red-500 font-bold">
          Portfolio Management Service (PMS)
        </span>
        , we invest your money in Indian Equity.
      </p>
      <div className="flex flex-col lg:flex-row justify-center mt-8 relative">
        <Tilt
          options={{
            max: 5,
            scale: 1,
            speed: 450,
          }}
          className="bg-white flex flex-col rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full lg:w-2/5"
        >
          <div className="p-6 relative">
            <img src={quantGrowth} alt="Logo 1" className="w-10 h-10 mr-4" />
            <div className="absolute top-4 right-4 flex space-x-2">
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Equity
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Long Short
              </span>
            </div>
          </div>
          <p className="text-gray-400 px-6 font-thin text-start mb-2">
            The{" "}
            <span className="font-black text-[#151E28] text-lg">
              Quant Growth Fund
            </span>{" "}
            seeks high-growth potential with data-driven precision. We leverage
            quantitative analysis to identify companies poised for significant
            expansion. This approach aims to deliver strong returns while
            managing risk through a statistically rigorous selection process.
          </p>
          <div className="text-start px-6 py-2 mb-10">
            <a href="/" className="arrow-link text-lg">
              View details
            </a>
          </div>
          <div className="relative w-full  flex sm:flex-row flex-col justify-end">
            <div className="sm:w-1/2 w-full sm:h-64 md:h-72 lg:h-96">
              <AreaChart />
            </div>
            <div className="sm:w-1/2 w-full px-2">
              <div className="w-full flex flex-col space-y-4">
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-semibold mb-4">Risk Ratio</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Std Deviation:</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Sharpe Ratio:</span>
                    <span className="font-bold">1.50%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Beta:</span>
                    <span className="font-bold">0.88%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Std Deviation:</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Sharpe Ratio:</span>
                    <span className="font-bold">1.50%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Beta:</span>
                    <span className="font-bold">0.88%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Std Deviation:</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Sharpe Ratio:</span>
                    <span className="font-bold">1.50%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Beta:</span>
                    <span className="font-bold">0.88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>

        <Tilt
          options={{
            max: 5,
            scale: 1,
            speed: 450,
            transition: true, // Set a transition on enter/exit.
            axis: null, // What axis should be disabled. Can be X or Y.
            reset: true, // If the tilt effect has to be reset on exit.
            easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
          }}
          className="bg-white flex flex-col rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full lg:w-2/5 "
        >
          <div className="p-6 relative">
            <img src={quantMomentum} alt="Logo 1" className="w-10 h-10 mr-4" />
            <div className="absolute top-4 right-4 flex space-x-2">
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Equity
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Long Short
              </span>
            </div>
          </div>
          <p className="text-gray-400 px-6 font-thin text-start mb-2">
            Harnessing market trends, Qode's{" "}
            <span className="font-black text-[#151E28] text-lg">
              Quant Growth Momentum
            </span>{" "}
            fund utilizes data-driven algorithms to identify and capitalize on
            securities with upward momentum. This systematic approach aims to
            capture short-term gains while managing risk through rigorous
            quantitative analysis.
          </p>
          <div className="text-start px-6 py-2 mb-10">
            <Link
              to={"/strategies/quant-growth-momentum"}
              className="arrow-link text-lg"
            >
              View details
            </Link>
          </div>

          <div className="relative w-full rounded-md flex justify-start px-2">
            <Carousel
              autoPlay
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              duration={1000}
              infiniteLoop
            >
              <div>
                <img
                  className="rounded-lg "
                  src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Carousel Image "
                />
              </div>
              <div>
                <img
                  className="rounded-lg"
                  src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Carousel Image"
                />
              </div>
              <div>
                <img
                  className="rounded-lg"
                  src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Carousel Image"
                />
              </div>
            </Carousel>
          </div>
        </Tilt>
      </div>
    </div>
  );
};
2;

export default InvestmentStrategies;
