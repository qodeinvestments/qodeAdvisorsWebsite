import React from "react";
import quant from "../../assets/quant-model.png";
import data from "../../assets/data.png";
const OurFocus = () => {
  return (
    <div className="relative text-center inter-font bg-[#f8f9f9] sm:h-1/2 p-5 sm:px-44 mb-72 sm:pb-0 ">
      <p className="uppercase text-[12px] tracking-widest font-bold text-gray-400">
        Our Focus
      </p>
      <h2 className="text-4xl text-[#151E28] font-black mt-4">
        We are <span className="text-red-600">committed</span> to make financial{" "}
        <br /> investment more reliable
      </h2>

      {/* Card Container */}
      <div className="relative top-28 flex flex-col sm:flex-row gap-10 justify-around">
        {/* Card 1 */}
        <div className=" bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col items-center">
          {/* Icon */}
          <div className="bg-gray-200 h-20 w-20 rounded-full p-4">
            {/* Replace with your icon */}
            <img src={data} alt="" />
          </div>
          {/* Card Title */}
          <h3 className="text-lg font-bold mt-4">Data and technology driven</h3>
          {/* Card Content */}
          <p className="text-gray-600 mt-2">
            Our data and technology models utilise cutting edge analytics anf
            machine learning to transform raw data into actionable investment
            insights by intgrating sophesticated technology we enhance decision
            making and optimize porfolio performance.
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
          <h3 className="text-lg font-bold mt-4">Quant Model</h3>
          {/* Card Content */}
          <p className="text-gray-600 mt-2">
            Our quant models leverage advanced algorithms and statistical
            techniques to identify investment opportunity. By analysing vast
            amount of data these models provide objective insights to drive our
            investment strategies.
          </p>
        </div>
      </div>

      <p className="relative top-48 text-2xl">
        Find out more about{" "}
        <a href="">
          <span className="arrow-link cursor-pointer font-black">
            Quant Investing
          </span>
        </a>
      </p>
    </div>
  );
};

export default OurFocus;
