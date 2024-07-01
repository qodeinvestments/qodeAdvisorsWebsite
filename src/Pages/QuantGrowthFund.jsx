import React, { useState, useEffect } from "react";
import { AreaChart, Blogs, Container, GrayContainer } from "../components";
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
import RelatedArticles from "../components/RelatedArticles";
import TrailingReturns from "../components/TrailingReturns";

const QuantGrowthFund = () => {

  const [activeTab, setActiveTab] = useState("Features");
  const tabs = ["Features", "Working", "Performance", "Calculator", "FAQ"];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const features = [
    {
      title: "Factor Investing",
      description:
        " An investment strategy that goes beyond just picking individual stocks or bonds. ",
      icon: faList,
    },
    {
      title: "Growth Stocks",
      description: `Shares in companies that are anticipated to experience above-average growth in earnings and sales compared to the overall market. `,
      icon: faBolt,
    },
    {
      title: "Starting small",
      description:
        "Typically represent companies that are in the growth phase, offering potential for significant returns but also carrying higher risks compared to large cap stocks.",
      icon: faChartLine,
    },
    // {
    //   title: "Shifting to Cash",
    //   description:
    //     "Stocks tend to rise in value most of the time, historically around 70%. ",
    //   icon: faMoneyBillWave,
    // },
  ];
  const faqItems = [
    {
      question: ` What is the type of stocks in which quant growth fund invests?`,
      answer: `Quant growth funds typically invest in stocks of companies with strong growth potential.`,
    },
    {
      question: "What are the market cap of stocks held?",
      answer:
        "The market capitalization of stocks held in a quant growth fund typically ranges from 500 crore to 20,000 crore.",
    },
    {
      question:
        " Are there any sectors or types of companies Quant Growth fund avoids?",
      answer: `Quant growth funds skip volatile sectors like trading, banking and financials, and focuses on profitable companies with long-term growth potential.`,
    },
    {
      question: "How does the Quant Growth Fund differ from traditional funds?",
      answer: "Quant growth funds are driven by algorithms and data ",
    },
    {
      question: "What are the benefits of investing in the Quant Growth Fund?",
      answer:
        "Quant Growth Fund, a successful and diversified investment option, offers consistent winners and outperformance. By focusing on annual rebalancing, it maintains diversification and lowers costs, making it an attractive choice for investors. ",
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
              <h2 className="text-3xl graphik-font-medium font-bold text-primary-dark text-center mb-10 sm:text-5xl">
                <span className="block">Quant Growth Fund</span>
              </h2>
              <div className="text-center text-md lg:px-32">
                The Quantitative Growth Fund uses a classic growth investing
                approach, focusing on high-quality businesses with strong moats
                and capital allocation skills.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {/* <div className="mt-auto">
                    <button className="mt-4 px-2 py-1 rounded-md text-white bg-primary-dark w-max">
                      Learn More
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </GrayContainer>
      <Container>
        <TrailingReturns strategy="QGF" />
      </Container>
      <Container>
        <HoldingDistribution strategy="QGF" />
      </Container>
      <div className="px-4 2xl:px-24 3xl:px-44">
        <div className="py-4 sm:py-12">
          <h2 className="text-3xl font-bold text-center text-[#151E28]">
            Performance
          </h2>
        </div>
        <div className="mb-10">
          <PerformanceChart strategy="QGF" />
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
                    Step 1: Universe of the Stocks
                  </h3>
                  <p className="text-gray-600">
                    The investible universe defines all the stocks you can
                    potentially choose from. Here, it's narrowed to small and
                    mid-cap companies. Liquidity screens are then applied to
                    ensure these chosen stocks are actively traded.
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
                    Step 2: Profitability Screener
                  </h3>
                  <p className="text-gray-600">
                    A tool used to filter stocks based on their financial
                    performance, focusing on profitability.
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
                    Step 3: Selecting top performers
                  </h3>
                  <p className="text-gray-600">
                    After applying our profitability filter to all the
                    companies, we determine a composite rank for each. From
                    these rankings, we identify the 30 strongest performers.
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
                    Step 4: Annual Rebalancing
                  </h3>
                  <p className="text-gray-600">
                    Portfolio rebalancing is like course correction for your
                    investments. Done annually, it ensures your asset allocation
                    stays on track.
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
              href="/Quant Growth Fund Feb.pdf"
              target="_blank"
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
        <RelatedArticles strategySlug="quant-growth-fund" limit={3} />
      </Container>
      {/* <Container> */}
      {/* </Container> */}
    </div>
  );
};

export default QuantGrowthFund;
