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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InvestmentStrategies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  return (
    <>
      <div className="sophia-pro-font flex justify-center py-8 sm:py-10 md:py-12 lg:py-16 flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold mt-4 md:mt-6 lg:mt-8 text-dark">
              Strategies
            </h2>
            <p className="my-2 text-sm sm:text-md md:text-lg">
              View all our strategies.{" "}
              <Link to={"/strategies"} className="text-red-600">
                <span className="text-red-600">
                  Here &nbsp; <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            </p>
          </div>

          <Link to={"/strategies/quant-growth-fund"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-16 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-xl">
                  Qode Growth Fund
                </h3>
                <p className="text-sm sm:text-md md:text-lg">
                  <span className="text-xs sm:text-sm md:text-base">
                    Invest in quality business. Get quality results.
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-6 lg:py-8 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-red-600">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>

          <Link to={"/strategies/quant-growth-momentum"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-16 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-xl">
                  Qode Momentum Fund
                </h3>
                <p className="text-sm sm:text-md md:text-lg">
                  <span className="text-xs sm:text-sm md:text-base">
                    Buy high sell higher
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-6 lg:py-8 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-red-600">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>

          <Link to={"/strategies/low-vol-momentum"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-16 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-xl">
                  Steady Fund
                </h3>
                <p className="text-sm sm:text-md md:text-lg">
                  <span className="text-xs sm:text-sm md:text-base">
                    Qode Low Volatility Fund
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-6 lg:py-8 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-red-600">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InvestmentStrategies;
