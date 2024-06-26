import React, { useState, useEffect } from "react";
import { AreaChart, Container, GrayContainer } from "../components";
import {
  faList,
  faBolt,
  faChartLine,
  faMoneyBillWave,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerformanceChart from "../components/Charts/PerformanceChart";
import bannerImage from "../assets/MomentumBanner.png";
import { faCheckCircle, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import HoldingDistribution from "../components/Charts/HoldingDistribution";
import { useParams } from "react-router-dom";
import RelatedArticles from "../components/RelatedArticles";
import TrailingReturns from "../components/TrailingReturns";

const MomentumTabs = () => {
  const listItemStyle = {
    listStyleType: "disc", // Remove default bullets
    // background:
    //   "url(https://www.tickertape.in/images/digitalgold/heroSection/star.webp) no-repeat",
    backgroundPosition: "0px 5px", // Position the background
    backgroundSize: "22px 22px", // Size of the background
    paddingLeft: "30px", // Padding to separate text from background
    marginBottom: "px", // Space between items
    lineHeight: "2", // Line height for better readability
  };
  const [activeTab, setActiveTab] = useState("Features");
  const tabs = ["Features", "Working", "Performance", "Calculator", "FAQ"];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const features = [
    {
      title: "The Universe",
      description:
        "We have created a list of 500 companies out of all listed companies on the National Stock Exchange NSE. ",
      icon: faList,
    },
    {
      title: "Momentum",
      description: `The idea of using momentum to generate higher returns has been around for well over 100 years.`,
      icon: faBolt,
    },
    {
      title: "Volatility",
      description:
        "This is the base case where we buy top 30 stocks based on ROC ranking.",
      icon: faChartLine,
    },
    {
      title: "Shifting to Cash",
      description:
        "Stocks tend to rise in value most of the time, historically around 70%. ",
      icon: faMoneyBillWave,
    },
  ];
  const faqItems = [
    {
      question: `When is it a good time to invest in the Quant Growth Momentum?`,
      answer: `There isn't a perfect moment to jump into a Quant Growth Momentum strategy. Instead, a Systematic Investment Plan (SIP) is your best bet.  By consistently investing smaller amounts at regular intervals, you average out market fluctuations. This approach, historically, has helped investors outperform the benchmark and achieve superior long-term returns.`,
    },
    {
      question:
        "How does the Quant Growth Momentum differ from traditional funds?",
      answer:
        "Unlike traditional funds, Quant Growth Momentum focuses on growth potential and not just company size. It actively buys and sells (high churn) based on quantitative signals, aiming to capture rising trends and avoid falling ones (opposite of traditional value investing). This strategy can be more volatile but has the potential for outperformance",
    },
    {
      question: "Is Quant Growth Momentum suitable for all investors?",
      answer: `Quant Growth Momentum might not be ideal for everyone. Investors who dislike high volatility or frequent portfolio changes (churn) may find this strategy stressful. It's best suited for those comfortable with potential ups and downs and a long-term investment horizon`,
    },
    {
      question:
        "What is the risk level associated with a Quant Growth Momentum Fund?",
      answer: "High Risk Fund ",
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mx-auto graphik-font-regular mt-10">
      <Container>
        <div className="bg-[#fff] rounded-b-[3rem] py-12 md:py-20 ">
          <div className="flex flex-col sm:flex-row justify-between items-start mx-auto px-4 sm:px-6 lg:px-6">
            <div className="pt-16">
              <h2 className="text-3xl graphik-font-medium font-bold mb-10 text-center text-primary-dark sm:text-5xl">
                <span className="block">Quant Momentum Fund</span>
              </h2>
              <div className="text-center text-md lg:px-32">
                Momentum is the most researched strategy in financial markets
                around the world. In developed markets where there are long
                periods of data available we have seen that momentum has
                consistently been able to outperform the index or a benchmark
                across markets, assets and different periods of time.
              </div>
              <div className="text-center">
                <button className="bg-primary-dark text-[#fff] font-extrabold px-10 sm:px-0 sm:w-1/2 mt-10 mx-auto rounded-md py-2">
                  Start Investing
                </button>
              </div>
            </div>
            {/* <div className="sm:w-1/3   h-auto">
            <img src={bannerImage} alt="" />
          </div> */}
          </div>
        </div>
      </Container>
      <GrayContainer>
        <Container>
          <div className="py-12">
            <h2 className="text-3xl text-[#151E28]  font-bold text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg  duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-4">
                      {/* <FontAwesomeIcon icon={feature.icon} /> */}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-normal">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    {/* <button className="mt-4 px-2 py-1 rounded-md text-white bg-primary-dark w-max">
                      Learn More
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </GrayContainer>
      <Container>
        <TrailingReturns />
      </Container>
      <Container>
        <div className="py-10">
          <HoldingDistribution strategy="Momentum" />
        </div>
      </Container>
      <div className="px-4 lg:px-44">
        <div className="py-4 sm:py-12">
          <h2 className="text-3xl font-bold text-center text-[#151E28]">
            Performance
          </h2>
        </div>
        <div className="mb-10">
          <PerformanceChart strategy="Vol Adjusted Momentum" />
        </div>
      </div>
      <GrayContainer>
        <Container>
          <div className=" py-10">
            <div className="container mx-auto sm:px-4">
              <h2 className="text-3xl font-bold text-[#151E28] text-center mb-8">
                How Our Strategy Works
              </h2>
              <p className="text-center text-gray-600 sm:px-20 mb-10 text-xl">
                Understand the step-by-step process we use to identify promising
                investment opportunities and manage your portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg  p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-2xl text-[#151E28]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151E28] mb-2">
                    Step 1: Screening of the stocks
                  </h3>
                  <p className="text-gray-600">
                    We first look at the six months average rolling market cap
                    and turnover for each security. We then use composite
                    ranking of 50% weightage to each factor and choose the top
                    500 for the back test.
                  </p>
                </div>
                <div className="bg-white rounded-lg  p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="text-2xl text-[#151E28]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151E28] mb-2">
                    Step 2: How do we use momentum?
                  </h3>
                  <p className="text-gray-600">
                    Rate of Change is essentially the simplest form of momentum
                    indicator which tells how much has a particular stock given
                    return in a particular period of time. We ideally want to
                    buy stocks that are in momentum and among them the one that
                    have the highest momentum. This is used to compare stocks in
                    the universe and rank based on pure momentum.
                  </p>
                </div>
                <div className="bg-white rounded-lg  p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                    <FontAwesomeIcon
                      icon={faBolt}
                      className="text-2xl text-[#151E28]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151E28] mb-2">
                    Step 3: How do we use volatility?
                  </h3>
                  <p className="text-gray-600">
                    This is a variation to the naive momentum where aim to buy
                    stocks which have a high momentum but a lower volatility.
                    The method used for this is to divided the rate of change of
                    a particular stock with it’s standard deviation during the
                    same lookback period. All stocks are ranked based on this
                    parameter and we buy the top 30 stocks.
                  </p>
                </div>
                <div className="bg-white rounded-lg  p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-2xl text-[#151E28]"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151E28] mb-2">
                    Step 4: Risk Management
                  </h3>
                  <p className="text-gray-600">
                    Risk management is a crucial step where we ensure the
                    portfolio is balanced and diversified. We regularly review
                    the stocks and make adjustments as necessary to maintain
                    optimal risk levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </GrayContainer>
      <Container>
        <div className="my-20 rounded-lg  lg:p-6 flex lg:flex-row flex-col items-center justify-between">
          <div>
            <h3 className="text-lg  font-semibold text-[#151E28] mb-2">
              Download Strategy PPT
            </h3>
            <p className="text-gray-600">
              Click the link below to download the PowerPoint presentation for
              the entire strategy.
            </p>
          </div>
          <div className="flex lg:flex-row flex-col mt-5 sm:mt-0 justify-between gap-10">
            <a
              href="/path-to-your-ppt-file.pptx"
              download
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-lg hover:bg-[#3a536e]"
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                PPT
              </span>
            </a>
            <a
              className="flex-1 relative bg-primary-dark text-white py-2 px-10 rounded-md overflow-hidden transition-all duration-300 text-lg hover:bg-[#3a536e]"
              href=""
            >
              <span className="relative z-10 flex whitespace-nowrap items-center justify-center w-full h-full">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                White Paper
              </span>
            </a>
          </div>
        </div>
      </Container>
      <GrayContainer>
        <Container>
          <h2 className="text-3xl font-bold text-[#151E28] text-center mb-8">
            Got Questions? We've Got Answers.
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-md  bg-white">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <h3 className="text-lg font-semibold text-[#151E28]">
                    {item.question}
                  </h3>
                  <span
                    className={`text-[#151E28] font-black transition-transform duration-300 ${
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
      </GrayContainer>

      <Container>
        <RelatedArticles strategySlug="quant-growth-momentum" limit={3} />
      </Container>
    </div>
  );
};

export default MomentumTabs;
