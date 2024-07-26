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
        <p className="uppercase text-[12px] text-center pt-10 inter-font tracking-widest font-bold text-gray-400">
          Qode Your Future: Data-Driven Decisions for a Quantum Leap.
        </p>
        <div className="text-center graphik-font-regular mt-10 mb-32 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 px-4 lg:px-0 mb-8 lg:mb-0">
            <h2 className="text-3xl lg:text-5xl font-bold mt-8 py-4 playfair-display-font text-start text-dark">
              Strategies
            </h2>
            <p className="text-primary text-start text-base lg:text-lg font-medium text-md mx-auto mb-8">
              Through our{" "}
              <span className="text-primary-dark font-bold">
                Portfolio Management Service (PMS)
              </span>
              , we invest your money in Indian Equity.
            </p>
            <div className="flex justify-start mt-8 lg:mt-20 space-x-4">
              <button
                onClick={handlePrevSlide}
                className="bg-primary rounded-full text-white p-2 lg:p-4 hover:bg-primary-dark transition-colors duration-300 flex items-center"
              >
                <svg
                  className="h-4 lg:h-5 w-4 lg:w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="bg-primary rounded-full text-white p-2 lg:p-4 hover:bg-primary-dark transition-colors duration-300 flex items-center"
              >
                <svg
                  className="h-4 lg:h-5 w-4 lg:w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Carousel
              autoPlay={false}
              infiniteLoop
              showStatus={false}
              showThumbs={false}
              selectedItem={currentSlide}
              renderIndicator={false}
              showArrows={false}
            >
              <Tilt
                options={{
                  max: 5,
                  scale: 1,
                  speed: 450,
                }}
                className="flex flex-col py-6 lg:py-10 bg-black/70 rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full"
              >
                <div className="p-4 lg:p-6 relative">
                  <h3 className="text-xl lg:text-2xl playfair-display-font text-white text-left font-bold mt-4">
                    Quant Growth Fund
                  </h3>
                </div>
                <p className="text-white px-4 lg:px-6 text-base lg:text-xl font-light text-start mb-2">
                  The{" "}
                  <span className="font-black text-base lg:text-xl text-white">
                    Quant Growth Fund
                  </span>{" "}
                  seeks high-growth potential with data-driven precision. We
                  leverage quantitative analysis to identify companies poised
                  for significant expansion.
                </p>
                <div className="text-start px-4 lg:px-6 py-2 mb-4 lg:mb-10">
                  <Link
                    to={"/strategies/quant-growth-fund"}
                    className="text-white text-base lg:text-lg"
                  >
                    View details
                  </Link>
                </div>
              </Tilt>

              <Tilt
                options={{
                  max: 5,
                  scale: 1,
                  speed: 450,
                  transition: true,
                  axis: null,
                  reset: true,
                  easing: "cubic-bezier(.03,.98,.52,.99)",
                }}
                className="bg-white flex py-6 lg:py-10 flex-col rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full"
              >
                <div className="p-4 lg:p-6 relative">
                  <h3 className="text-xl lg:text-2xl playfair-display-font text-left font-bold mt-4">
                    Quant Growth Momentum
                  </h3>
                </div>
                <p className="text-primary-dark px-4 lg:px-6 text-base lg:text-xl font-light text-start mb-2">
                  Harnessing market trends, Qode's{" "}
                  <span className="font-black text-[#151E28] text-base lg:text-xl">
                    Quant Growth Momentum
                  </span>{" "}
                  fund utilizes data-driven algorithms to identify and
                  capitalize on securities with upward momentum.
                </p>
                <div className="text-start px-4 lg:px-6 py-2 mb-4 lg:mb-10">
                  <Link
                    to={"/strategies/quant-growth-momentum"}
                    className="arrow-link text-base lg:text-lg"
                  >
                    View details
                  </Link>
                </div>
              </Tilt>
            </Carousel>
          </div>
        </div>
      </Container>
    </GrayContainer>
  );
};

export default InvestmentStrategies;
