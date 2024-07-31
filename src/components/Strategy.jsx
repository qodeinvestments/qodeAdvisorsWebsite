import React, { useState } from "react";
import { Container, GrayContainer } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import PerformanceChart from "../components/Charts/PerformanceChart";
import HoldingDistribution from "../components/Charts/HoldingDistribution";
import RelatedArticles from "../components/RelatedArticles";
import TrailingReturns from "../components/TrailingReturns";

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
    <div className="mx-auto graphik-font-regular mt-10">
      <Container>
        <div className="bg-white rounded-b-3xl py-12 md:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start mx-auto px-4 sm:px-6 lg:px-6">
            <div className="pt-16 w-full">
              <h2 className="text-4xl sm:text-6xl graphik-  text-primary-dark text-center ">
                <span className="block">{title}</span>
              </h2>
              <div
                className="text-center text-4xl  lg:px-32"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-20 2xl:px-24 3xl:px-44">
          <div className="mb-10 ">
            <PerformanceChart strategy={strategyCode} />
          </div>
        </div>

        <HoldingDistribution strategy={strategyCode} />

        <GrayContainer>
          <div className="py-10">
            <div className="container mx-auto sm:px-4">
              <h2 className="text-3xl  text-[#151E28] text-center mb-8">
                How Our Strategy Works
              </h2>
              <p className="text-center text-gray-600 sm:px-20 mb-10 text-xl">
                Understand the step-by-step process we use to identify promising
                investment opportunities and manage your portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="text-2xl text-[#151E28]"
                      />
                    </div>
                    <h3 className="text-lg  text-[#151E28] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GrayContainer>

        <div className="my-20 rounded-lg lg:p-6 flex lg:flex-row flex-col items-center justify-between">
          <div>
            <h3 className="text-lg  text-[#151E28] mb-2">
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
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-lg hover:bg-[#3a536e]"
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
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-lg hover:bg-[#3a536e]"
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                White Paper
              </span>
            </a>
          </div>
        </div>

        <Container>
          <h2 className="text-3xl  text-[#151E28] text-center mb-8">
            Got Questions? We've Got Answers.
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-md bg-white">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <h3 className="text-lg  text-[#151E28]">{item.question}</h3>
                  <span
                    className={`text-[#151E28]  transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  >
                    &#8744;
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="p-4 bg-gray-100 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>

        <RelatedArticles strategySlug={strategySlug} limit={3} />

        <div className="text-center">
          <button className="bg-primary-dark text-white font-extrabold px-10 sm:px-0 sm:w-1/2 mt-10 mx-auto py-2">
            Schedule a Call
          </button>
        </div>
      </Container>
    </div>
  );
};

export default StrategyComponent;
