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
      <Heading className="text-center text-brown">Strategies</Heading>
      <div className="text-center">
        <Text className="sm:mt-1 mt-3 mb-5">
          We've created data-driven strategies that have the highest probability{" "}
          <br className="sm:visible hidden" /> of helping you reach your
          financial goals over the long term.
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-1 md:gap-2 lg:gap-2">
        <CustomLink to={"/strategies/quant-growth-fund"} className="text-black">
          <div className="border border-brown p-1 md:p-3 transition-all duration-300 hover:bg-white hover:border-none hover:shadow-xl">
            <div className="flex sm:flex-row flex-col justify-between sm:items-center">
              <div>
                <Text className="sm:text-subheading text-mobileSubHeading  font-subheading">
                  Qode Growth Fund
                </Text>
                <Text className="text-body">
                  Invest in quality business. Get quality results.
                </Text>
              </div>
              <div className="self-end sm:text-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="44"
                  height="44"
                >
                  <path
                    d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CustomLink>

        <CustomLink
          to={"/strategies/quant-growth-momentum"}
          className="text-black"
        >
          <div className="border border-brown p-1 md:p-3 transition-all duration-300 hover:bg-white hover:border-none hover:shadow-xl">
            <div className="flex sm:flex-row flex-col justify-between sm:items-center">
              <div>
                <Text className="sm:text-subheading text-mobileSubHeading font-subheading">
                  Qode Momentum Fund
                </Text>
                <Text className="text-body">Buy high sell higher</Text>
              </div>
              <div className="self-end sm:text-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="44"
                  height="44"
                >
                  <path
                    d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CustomLink>

        <CustomLink to={"/strategies/low-vol-momentum"} className="text-black">
          <div className="border border-brown p-1 md:p-3 transition-all duration-300 hover:bg-white hover:border-none hover:shadow-xl">
            <div className="flex sm:flex-row flex-col justify-between sm:items-center">
              <div>
                <Text className="sm:text-subheading text-mobileSubHeading font-subheading">
                  Steady Fund
                </Text>
                <Text className="text-body">Qode Low Volatility Fund</Text>
              </div>
              <div className="self-end sm:text-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="44"
                  height="44"
                >
                  <path
                    d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CustomLink>
      </div>
    </div>
  );
};

export default InvestmentStrategies;
