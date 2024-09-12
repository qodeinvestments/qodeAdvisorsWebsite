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
    <>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div className="text-center md:text-left">
            <Heading
              level={2}
              className="text-body sm:text-subheading md:text-heading lg:text-2xl font-bold mt-2 md:mt-3 lg:mt-4 text-dark"
            >
              Strategies
            </Heading>
            <Text className="my-1 text-xs sm:text-body">
              View all our strategies.{" "}
              <CustomLink to={"/strategies"} className="text-brown">
                <span className="text-brown">
                  Here &nbsp; <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </CustomLink>
            </Text>
          </div>

          <CustomLink
            to={"/strategies/quant-growth-fund"}
            className="text-black"
          >
            <div className="bg-white hover:shadow-xl transition-all px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <Heading
                  level={3}
                  className="font-bold mb-1 sm:mb-2 md:mb-3 text-body sm:text-subheading md:text-heading"
                >
                  Qode Growth Fund
                </Heading>
                <Text className="text-xs sm:text-body md:text-subheading">
                  <span className="text-xs sm:text-xs md:text-base">
                    Invest in quality business. Get quality results.
                  </span>
                </Text>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
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
            <div className="bg-white hover:shadow-xl transition-all px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <Heading
                  level={3}
                  className="font-bold mb-1 sm:mb-2 md:mb-3 text-body sm:text-subheading md:text-heading"
                >
                  Qode Momentum Fund
                </Heading>
                <Text className="text-xs sm:text-body md:text-subheading">
                  <span className="text-xs sm:text-xs md:text-base">
                    Buy high sell higher
                  </span>
                </Text>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-brown">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </CustomLink>

          <CustomLink
            to={"/strategies/low-vol-momentum"}
            className="text-black"
          >
            <div className="bg-white hover:shadow-xl transition-all px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 h-[180px] sm:h-[200px] md:h-[220px] group overflow-hidden relative">
              <div className="transition-all duration-300 transform group-hover:-translate-y-5">
                <Heading
                  level={3}
                  className="font-bold mb-1 sm:mb-2 md:mb-3 text-body sm:text-subheading md:text-heading"
                >
                  Steady Fund
                </Heading>
                <Text className="text-xs sm:text-body md:text-subheading">
                  <span className="text-xs sm:text-xs md:text-base">
                    Qode Low Volatility Fund
                  </span>
                </Text>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="relative z-10 text-brown">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </CustomLink>
        </div>
      </div>
    </>
  );
};

export default InvestmentStrategies;
