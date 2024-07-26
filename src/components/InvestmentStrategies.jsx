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
      <Container>
        <p className="uppercase text-[12px] text-center pt-10 inter-font tracking-widest  text-gray-400">
          Qode Your Future: Data-Driven Decisions for a Quantum Leap.
        </p>
        <div className=" border-black graphik-font-regular mt-10 mb-32 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 border border-black px-4 lg:px-3 mb-8 lg:mb-0">
            <h2 className="text-3xl lg:text-5xl  mt-8 py-4 playfair-display-font text-start text-dark">
              Strategies
            </h2>
            <p className="text-primary text-start text-base lg:text-lg font-medium text-md mx-auto mb-8">
              For Consistent Growth
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 ">
              <div className="bg-white  border border-black p-5">
                <h3 className="text-2xl font-bold mb-4">Quant Growth Fund </h3>
                <p className="mb-6">
                  The <span className="font-bold">Quant Growth Fund</span> seeks
                  high-growth potential with data-driven precision. We leverage
                  quantitative analysis to identify companies poised for
                  significant expansion.
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-5xl">
                    23.4%
                    <span className="text-sm ml-2">CAGR</span>
                  </p>
                  <p className="text-5xl">
                    10%
                    <span className="text-sm ml-2">MDD</span>
                  </p>
                  <Link
                    to={"/strategies/quant-growth-fund"}
                    className=" py-3    mt-5 text-center w-32  border border-black font-medium hover:bg-white/10 transition duration-300 text-black hover:before:bg-black  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10">Know more</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white  border border-black p-5">
                <h3 className="text-2xl font-bold mb-4">
                  Quant Growth Momentum
                </h3>
                <p className="mb-6">
                  Harnessing market trends, Qode's{" "}
                  <span className="font-bold">Quant Growth Momentum </span>
                  fund utilizes data-driven algorithms to identify and
                  capitalize on securities with upward momentum.
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-5xl">
                    28.5%
                    <span className="text-sm ml-2">CAGR</span>
                  </p>
                  <p className="text-5xl">
                    10%
                    <span className="text-sm ml-2">MDD</span>
                  </p>
                  <Link
                    to={"/strategies/quant-growth-momentum"}
                    className=" py-3    mt-5 text-center w-32  border border-black font-medium hover:bg-white/10 transition duration-300 text-black hover:before:bg-black  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10">Know more</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white  border border-black p-5">
                <h3 className="text-2xl font-bold mb-4">Low Vol Momentum</h3>
                <p className="mb-6">
                  Harnessing market trends, Qode's{" "}
                  <span className="font-bold">Quant Growth Momentum </span>
                  fund utilizes data-driven algorithms to identify and
                  capitalize on securities with upward momentum.
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-5xl">
                    23%
                    <span className="text-sm ml-2">CAGR</span>
                  </p>
                  <p className="text-5xl">
                    10%
                    <span className="text-sm ml-2">MDD</span>
                  </p>
                  <Link
                    to={"/strategies/quant-growth-fund"}
                    className=" py-3    mt-5 text-center w-32  border border-black font-medium hover:bg-white/10 transition duration-300 text-black hover:before:bg-black  relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10">Know more</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </GrayContainer>
  );
};

export default InvestmentStrategies;
