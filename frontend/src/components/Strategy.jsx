import React, { useState } from "react";
import { Blogs, Container, GrayContainer } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import PerformanceChart from "./Charts/PerformanceChart";
import HoldingDistribution from "./Charts/HoldingDistribution";
import RelatedArticles from "./RelatedArticles";
import TrailingReturns from "./TrailingReturns";
import { Modal } from "bootstrap";
import ModalButton from "./ModalButton";
import { Link } from "react-router-dom";

const StrategyComponent = ({ strategyData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {
    title,
    description,
    strategyCode,
    strategySlug,
    pptLink,
    whitePaperLink,
    steps,
    faqItems,
  } = strategyData;

  return (
    // <Container>
    <div className="mx-auto sophia-pro-font mt-10">
      <Container>
        <div className="bg-white rounded-b-3xl  ">
          <div className="flex flex-col sm:flex-row justify-between items-start mx-auto px-4 sm:px-6 lg:px-6">
            <div className="pt-16 w-full">
              <h2 className="text-lg sm:text-4xl sophia-pro-font font-bold  mb-2 text-primary-dark text-center ">
                <span className="block">{title}</span>
              </h2>
              <div
                className="text-center text-lg  lg:px-32"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </div>
      </Container>

      <div className=" my-12 ">
        <PerformanceChart strategy={strategyCode} />
      </div>
      <Container>
        <div className="bg-[#fafafa]  p-8 sm:p-20  text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Not sure which strategy is right for you?
          </h2>
          <p className="text-md mb-6 minion-pro-font text-black">
            Sign Up to track our live portfolio.
          </p>
          <Link target="_blank" to="https://dashboard.qodeinvest.com">
            <button className="bg-red-600 text-white text-md font-medium py-3 px-8 -full hover:bg-red-700 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </Container>

      <Container>
        <div className="mx-auto ">
          <h2 className="text-lg sm:text-lg md:text-md lg:text-3xl font-black text-[#151E28] text-center mb-4 sm:mb-8">
            How Our Strategy Works
          </h2>
          <p className="text-center text-gray-600 px-2 sm:px-10 md:px-20 mb-6 sm:mb-10 text-base lg:text-md">
            Understand the step-by-step process we use to identify promising
            investment opportunities and manage your portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 minion-pro-font gap-4 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-[#fafafa] p-4 sm:p-14">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 mb-4">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="text-lg sm:text-lg text-[#151E28]"
                  />
                </div>
                <h3 className="text-lg sm:text-lg font-bold sophia-pro-font  text-[#151E28] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-md ">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* <div className="my-20 rounded-lg lg:p-6 flex lg:flex-row flex-col items-center justify-between">
          <div>
            <h3 className="text-md  text-[#151E28] mb-2">
              Download Strategy PPT
            </h3>
            <p className="text-gray-600">
              Click the link below to download the PowerPoint presentation for
              the entire strategy.
            </p>
          </div>
          <div className="flex lg:flex-row flex-col mt-5 sm:mt-0 justify-between gap-10">
            <a
              href={pptLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-md hover:bg-[#3a536e]"
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                PPT
              </span>
            </a>
            <a
              href={whitePaperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-md hover:bg-[#3a536e]"
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                White Paper
              </span>
            </a>
          </div>
        </div> */}
      <div className="my-20 ">
        <ModalButton />
      </div>
      <div className="my-20">
        <GrayContainer>
          <Container>
            <Blogs />
          </Container>
        </GrayContainer>
      </div>
      <Container>
        <div className="mb-20">
          <h2 className="text-lg sm:text-lg md:text-3xl font-black sophia-pro-font text-[#151E28] text-center mb-4 sm:mb-8">
            FAQ's
          </h2>
          <div className="space-y-2 sm:space-y-4 mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className=" bg-white border">
                <div
                  className="flex justify-between  items-center p-3 sm:p-4 cursor-pointer"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <h3 className="text-base sophia-pro-font font-medium sm:text-md md:text-md text-[#151E28] pr-4">
                    {item.question}
                  </h3>
                  <span
                    className={`text-[#151E28] text-lg sm:text-lg  transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  >
                    &#8744;
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="p-3 sm:p-4 bg-[#fafafa] minion-pro-font text-black text-sm sm:text-md">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* <RelatedArticles strategySlug={strategySlug} limit={3} /> */}
    </div>
    // {/* </Container> */}
  );
};

export default StrategyComponent;
