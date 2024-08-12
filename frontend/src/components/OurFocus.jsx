import React from "react";
import quant from "../assets/quant-model.png";
import data from "../assets/data.png";
import GrayContainer from "./container/GrayContainer";
import Container from "./container/Container";
const OurFocus = () => {
  return (
    <GrayContainer>
      <Container>
        <div className="relative hover:shadow-xl hover:-translate-y-2 transition duration-300  text-center sophia-pro-font sm:h-1/2 p-5 sm:px-20 mb-72 rounded-2xl sm:pb-0 ">
          <p className="uppercase text-[12px] inter-font tracking-widest  text-gray-400">
            Our Focus
          </p>
          <h2 className="md:text-lg text-primary-dark sophia-pro-font  mt-4">
            We are <span className="text-primary-dark ">committed</span> to make
            financial <br /> investment more reliable
          </h2>

          {/* Card Container */}
          <div className="flex flex-col mt-10 sm:flex-row gap-10 justify-around">
            {/* Card 1 */}
            <div className=" bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col items-center">
              {/* Icon */}
              <div className="bg-gray-200 h-20 w-20 rounded-full p-4">
                {/* Replace with your icon */}
                <img src={data} alt="" />
              </div>
              {/* Card Title */}
              <h3 className="text-md sophia-pro-font  mt-4">
                Data and technology driven
              </h3>
              {/* Card Content */}
              <p className="text-gray-600 mt-2">
                Our data and technology models utilize cutting edge analytics
                and machine learning to transform raw data into actionable
                investment insights. By integrating sophisticated technology we
                enhance decision making and optimize portfolio performance.
              </p>
            </div>

            {/* Card 2 */}
            <div className=" bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col items-center">
              {/* Icon */}
              <div className="bg-gray-200 h-20 w-20 rounded-full p-4">
                {/* Replace with your icon */}
                <img src={quant} alt="" />
              </div>
              {/* Card Title */}
              <h3 className="text-md sophia-pro-font  mt-4">Quant Model</h3>
              {/* Card Content */}
              <p className="text-gray-600 mt-2">
                Our quant models leverage advanced algorithms and statistical
                techniques to identify investment opportunities. By analyzing
                vast amount of data these models provide objective insights to
                drive our investment strategies.
              </p>
            </div>
          </div>

          <p className="relative top-48 md:text-lg">
            Find out more about{" "}
            <a href="">
              <span className="arrow-link sophia-pro-font cursor-pointer ">
                Quant Investing
              </span>
            </a>
          </p>
        </div>
      </Container>
    </GrayContainer>
  );
};

export default OurFocus;
