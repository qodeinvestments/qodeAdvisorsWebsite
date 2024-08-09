import React, { useState } from "react";
import quantGrowth from "../assets/quantGrowth.png";
import quantGrowthImg from "../assets/whiteCode.png";
import quantMomentumImg from "../assets/banner.png";
import quantMomentum from "../assets/quantMomentum.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tilt } from "react-tilt";
import AreaChart from "./Charts/AreaChart";
import { Link } from "react-router-dom";
import Container from "./container/Container";
import GrayContainer from "./container/GrayContainer";

const InvestmentStrategies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  return (
    <GrayContainer>
      {/* <p className="uppercase text-[12px] text-center pt-10 inter-font tracking-widest  text-gray-400">
          Qode Your Future: Data-Driven Decisions for a Quantum Leap.
        </p> */}
      <div className=" border-black sophia-pro-font   flex  justify-start  p-10 flex-row">
        <div className="mb-8 mr-20 lg:mb-0 w-1/2">
          <h2 className=" text-4xl  mt-8   sophia-pro-font text-start text-dark">
            Strategies
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white   p-5">
            <h3 className="text-lg  mb-4">Quality Fund </h3>
            <p className="mb-6 text-lg">
              <span className="text-lg">
                Invest in quality business. Get quality results.
              </span>{" "}
              <br />
              <br />
              This strategy invests in 30 Quality businesses. (Quality Business
              - A company that generates a high return on invested capital).
              Principle - In the long run the stock price always matches the
              business performance
            </p>
            <div className="flex items-end justify-between">
              <p className="text-4xl">
                23.4%
                <span className="text-sm ml-2">CAGR</span>
              </p>

              <Link
                to={"/strategies/quant-growth-fund"}
                className=" py-3    mt-5 text-center w-32    hover:bg-white/10 transition duration-300 text-black hover:before:bg-red-600  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Know more</span>
              </Link>
            </div>
          </div>

          <div className="bg-white   p-5">
            <h3 className="text-lg  mb-4">High-Return & Churn Fund</h3>
            <p className="mb-6 text-lg">
              <span className="text-lg"> Buy high sell higher. </span>
              <br /> <br />
              This strategy invests in 30 businesses whose stock price has grown
              significantly and sells it before they start falling. Principle -
              The stock price tells the story before the actual story unfolds.
            </p>
            <div className="flex items-end justify-between">
              <p className="text-4xl">
                28.5%
                <span className="text-sm ml-2">CAGR</span>
              </p>

              <Link
                to={"/strategies/quant-growth-momentum"}
                className=" py-3    mt-5 text-center w-32    hover:bg-white/10 transition duration-300 text-black hover:before:bg-red-600  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Know more</span>
              </Link>
            </div>
          </div>

          <div className="bg-white   p-5">
            <h3 className="text-lg  mb-4">Steady Fund </h3>
            <p className="mb-6 text-lg">
              <span className="text-lg">Slow but Steady.</span> <br /> <br />
              This strategy invests in the 30 most stable stocks in the market.
              This strategy outperforms the Index with considerably lower risk.
            </p>
            <div className="flex items-end justify-between">
              <p className="text-4xl">
                23%
                <span className="text-sm ml-2">CAGR</span>
              </p>

              <Link
                to={"/strategies/low-vol-momentum"}
                className=" py-3    mt-5 text-center w-32    hover:bg-white/10 transition duration-300 text-black hover:before:bg-red-600  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Know more</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GrayContainer>
  );
};

export default InvestmentStrategies;
