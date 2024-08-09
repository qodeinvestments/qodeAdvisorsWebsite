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
      {/* <p className="uppercase text-[12px] text-center pt-10 inter-font tracking-widest  text-gray-400">
          Qode Your Future: Data-Driven Decisions for a Quantum Leap.
        </p> */}
      <div className="sophia-pro-font flex justify-center py-10 md:py-20 flex-col md:p-16 md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ">
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-lg lg:text-2xl font-bold mt-4 md:mt-8 text-dark">
              Strategies
            </h2>
            <p className="my-2 text-md md:text-lg">
              View all our strategies.{" "}
              <Link to={"/strategies"} className="text-red-600">
                <span className="text-red-600">
                  Here &nbsp; <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            </p>
          </div>
          <Link to={"/strategies/quant-growth-fund"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-8 md:px-10 lg:px-14 py-10 md:py-12 lg:py-16 h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 md:mb-4 text-lg md:text-lg lg:text-lg">
                  Quality Fund
                </h3>
                <p className="text-md md:text-lg lg:text-lg">
                  <span className="text-sm md:text-base lg:text-md">
                    Invest in quality business. Get quality results.
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-8 md:px-10 lg:px-14 py-4 md:py-6 lg:py-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-red-600">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>

          <Link to={"/strategies/quant-growth-momentum"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-8 md:px-10 lg:px-14 py-10 md:py-12 lg:py-16 h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 md:mb-4 text-lg md:text-lg lg:text-lg">
                  High-Return & Churn Fund
                </h3>
                <p className="text-md md:text-lg lg:text-lg">
                  <span className="text-sm md:text-base lg:text-md">
                    Buy high sell higher
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-8 md:px-10 lg:px-14 py-4 md:py-6 lg:py-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-red-600">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>

          <Link to={"/strategies/low-vol-momentum"} className="text-black">
            <div className="bg-white hover:shadow-xl transition-all px-8 md:px-10 lg:px-14 py-10 md:py-12 lg:py-16 h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <h3 className="font-bold mb-2 md:mb-4 text-lg md:text-lg lg:text-lg">
                  Steady Fund
                </h3>
                <p className="text-md md:text-lg lg:text-lg">
                  <span className="text-sm md:text-base lg:text-md">
                    Slow but Steady
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-8 md:px-10 lg:px-14 py-4 md:py-6 lg:py-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
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
