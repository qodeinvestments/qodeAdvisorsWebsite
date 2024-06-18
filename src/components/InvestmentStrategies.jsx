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
import Container from "./container/Container";
import GrayContainer from "./container/GrayContainer";
const InvestmentStrategies = () => {
  return (
    <GrayContainer>
      <Container>
        <div className="text-center graphik-font-regular my-32">
          <p className="uppercase text-[12px] inter-font tracking-widest font-bold text-gray-400 ">
            Qode Your Future: Data-Driven Decisions for a Quantum Leap.
          </p>
          <h2 className="text-4xl font-bold mt-4 py-4 text-dark">
            Our Investment Strategies
          </h2>
          <p className="text-primary font-medium mt-4 text-md mx-auto max-w-4xl">
            With the help of our team, data and technology we design models that
            help us make investment decisions. Through our{" "}
            <span className="text-primary-dark font-bold">
              Portfolio Management Service (PMS)
            </span>
            , we invest your money in Indian Equity.
          </p>
          <div className="flex flex-col lg:flex-row justify-between mt-8 relative">
            <Tilt
              options={{
                max: 5,
                scale: 1,
                speed: 450,
              }}
              className=" flex flex-col bg-black/70 rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full lg:w-1/2"
            >
              <div className="p-6 relative">
                {/* <img
                  src={quantGrowth}
                  alt="Logo 1"
                  className="w-10 h-10 mr-4"
                /> */}
                <h3 className="text-2xl text-white text-left font-bold mt-4">
                  Quant Growth Fund
                </h3>
                {/* <div className="absolute top-4 right-4 flex space-x-2">
                  <span className="bg-primary-dark text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Equity
                  </span>
                  <span className="bg-primary-dark text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Long Short
                  </span>
                </div> */}
              </div>
              <p className="text-white  px-6 font-light  text-start mb-2">
                The{" "}
                <span className="font-black text-white text-lg">
                  Quant Growth Fund
                </span>{" "}
                seeks high-growth potential with data-driven precision. We
                leverage quantitative analysis to identify companies poised for
                significant expansion.
                {/* This approach aims to deliver strong
                returns while managing risk through a statistically rigorous
                selection process. */}
              </p>
              <div className="text-start px-6 py-2 mb-10">
                <Link
                  to={"/strategies/quant-growth-fund"}
                  className="text-white text-lg"
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
                transition: true, // Set a transition on enter/exit.
                axis: null, // What axis should be disabled. Can be X or Y.
                reset: true, // If the tilt effect has to be reset on exit.
                easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
              }}
              className="bg-white flex flex-col rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-8 w-full lg:w-1/2"
            >
              <div className="p-6 relative">
                <h3 className="text-lg text-left font-bold mt-4">
                  Quant Growth Momentum
                </h3>
                {/* <img
                  src={quantMomentum}
                  alt="Logo 1"
                  className="w-10 h-10 mr-4"
                /> */}
                {/* <div className="absolute top-4 right-4 flex space-x-2">
                  <span className="bg-primary-dark text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Equity
                  </span>
                  <span className="bg-primary-dark  text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Long Short
                  </span>
                </div> */}
              </div>
              <p className="text-primary-dark px-6 font-light  text-start mb-2">
                Harnessing market trends, Qode's{" "}
                <span className="font-black text-[#151E28] text-lg">
                  Quant Growth Momentum
                </span>{" "}
                fund utilizes data-driven algorithms to identify and capitalize
                on securities with upward momentum.
                {/* This systematic approach
                aims to capture short-term gains while managing risk through
                rigorous quantitative analysis. */}
              </p>
              <div className="text-start px-6 py-2 mb-10">
                <Link
                  to={"/strategies/quant-growth-momentum"}
                  className="arrow-link text-lg"
                >
                  View details
                </Link>
              </div>

              {/* <div className="relative w-full rounded-md flex justify-start p-2">
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
          </div> */}
            </Tilt>
          </div>
        </div>
      </Container>
    </GrayContainer>
  );
};
2;

export default InvestmentStrategies;
