import React from "react";
import quantGrowth from "../assets/quantGrowth.png";
import quantGrowthImg from "../assets/whiteCode.png";
import quantMomentumImg from "../assets/banner.png";
import quantMomentum from "../assets/quantMomentum.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tilt } from "react-tilt";
import AreaChart from "./Charts/AreaChart";
import Container from "./container/Container";
import GrayContainer from "./container/GrayContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Heading from "./common/Heading";
import Text from "./common/Text";
import CustomLink from "./common/CustomLink";

const InvestmentStrategies = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-1 md:gap-2 lg:gap-3">
        <div className="text-center md:text-left">
          <Text className="text-xs sm:text-body">
            WE'VE MADE DATA-DRIVEN STRATEGIES THAT HAVE THE HIGHEST PROBABILITY
            OF REACHING YOUR FINANCIAL GOAL OVER THE LONG TERM
          </Text>
        </div>

        <CustomLink to={"/strategies/quant-growth-fund"} className="text-black">
          <div className="bg-white border border-brown  transition-all p-1 md:p-2 group overflow-hidden relative">
            <div className="transition-all duration-300 transform group-hover:-translate-y-2">
              <Heading
                level={3}
                className="font-bold mb-1 sm:mb-2 text-body sm:text-subheading"
              >
                Qode Growth Fund
              </Heading>
              <Text className="text-xs sm:text-body">
                Invest in quality business. Get quality results.
              </Text>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1 md:py-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <span className="relative z-10 text-brown">
                Explore <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </CustomLink>

        <CustomLink
          to={"/strategies/quant-growth-momentum"}
          className="text-black"
        >
          <div className="bg-white border border-brown  transition-all p-1 md:p-2 group overflow-hidden relative">
            <div className="transition-all duration-300 transform group-hover:-translate-y-2">
              <Heading
                level={3}
                className="font-bold mb-1 sm:mb-2 text-body sm:text-subheading"
              >
                Qode Momentum Fund
              </Heading>
              <Text className="text-xs sm:text-body">Buy high sell higher</Text>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1 md:py-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <span className="relative z-10 text-brown">
                Explore <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </CustomLink>

        <CustomLink to={"/strategies/low-vol-momentum"} className="text-black">
          <div className="bg-white border border-brown  transition-all p-1 md:p-2 group overflow-hidden relative">
            <div className="transition-all duration-300 transform group-hover:-translate-y-2">
              <Heading
                level={3}
                className="font-bold mb-1 sm:mb-2 text-body sm:text-subheading"
              >
                Steady Fund
              </Heading>
              <Text className="text-xs sm:text-body">
                Qode Low Volatility Fund
              </Text>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1 md:py-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <span className="relative z-10 text-brown">
                Explore <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </CustomLink>
      </div>
    </div>
  );
};

export default InvestmentStrategies;
