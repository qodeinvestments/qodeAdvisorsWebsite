import React from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import { Link } from "react-router-dom";
import Button from "./common/Button";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="44"
    height="44"
    className="mx-auto sm:mx-0"
  >
    <path
      d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
      fill="currentColor"
    />
  </svg>
);

const StrategyCard = ({ title, description, link }) => (
  <Link to={link} className="text-black w-full group">
    <div className="p-1 transition-all duration-300 h-[180px] hover:bg-beige group-hover:text-black bg-lightBeige border border-brown hover:shadow-2xl relative flex flex-col sm:flex-row justify-between sm:items-center items-start  md:h-[160px] xl:h-full">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        <div className="">
          <Heading className="font-heading playfair-font-display md:text-subheading text-mobileSubHeading group-hover:text-black text-brown font-bold mb-1 relative overflow-hidden text-ellipsis">
            {title}
          </Heading>
          <p className="text-body">{description}</p>
        </div>
        <div className="absolute  bottom-1  right-18 sm:hidden sm:items-center sm:justify-center sm:ml-4   sm:self-center">
          <ArrowIcon />
        </div>
      </div>
      <div className="hidden sm:block">
        <ArrowIcon />
      </div>
    </div>
  </Link>
);

const InvestmentStrategies = () => {
  const strategies = [
    {
      title: "Qode All Weather",
      description: "Lower risk need not mean lower returns",
      link: "/strategies/qode-all-weather",
    },
    {
      title: "Qode Growth Fund",
      description: "Investing in quality businesses for long-term growth.",
      link: "/strategies/qode-growth-fund",
    },
    {
      title: "Qode Tactical Fund",
      description: "Capturing the market’s growth.",
      link: "/strategies/qode-tactical-fund",
    },
    {
      title: "Qode Future Horizons",
      description: "Precision stock picking using data-driven models.",
      link: "/strategies/qode-future-horizons",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <Heading
          isItalic
          className="text-center text-heading sm:text-left group-hover:text-black text-brown"
        >
          Strategies
        </Heading>
        <div className="text-center sm:text-start lg:w-1/2 pl-1">
          <Text className="sm:mt-1 mt-3 mb-5">
            We've created data-driven strategies that have the highest
            probability of helping you reach your investment goals over the long
            term.
          </Text>
        </div>
      </div>
      <div className=" mx-auto ">
        <div className="grid lg:grid-cols-2 gap-4 items-center  justify-center lg:justify-between">
          {strategies.map((strategy, index) => (
            <StrategyCard key={index} {...strategy} />
          ))}
        </div>
      </div>
      {/* <div className="text-center mt-6">
        <Button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/Qode Presentation.pdf"; // Update this path to your PDF file
            link.download = "Qode Presentation.pdf";
            link.click();
          }}
        >
          Download Strategies Presentation
        </Button>
      </div> */}
    </>
  );
};

export default InvestmentStrategies;
