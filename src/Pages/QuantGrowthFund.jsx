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

const QuantGrowthFund = () => {
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
      title: "Factor Investing",
      description:
        "Factor Investing- Factor investing is an investment strategy that goes beyond just picking individual stocks or bonds. Instead, it focuses on targeting certain characteristics, or factors, that are believed to influence investment returns.",
      icon: faList,
    },
    {
      title: "Growth Stocks",
      description: `Growth stocks are shares in companies that are anticipated to experience above-average growth in earnings and sales compared to the overall market. Investors are attracted to these stocks for the potential for significant capital appreciation, which means the stock price will increase substantially`,
      icon: faBolt,
    },
    {
      title: "Starting small",
      description:
        "Typically represent companies that are in the growth phase, offering potential for significant returns but also carrying higher risks compared to large cap stocks. These companies are usually more agile and have the potential for rapid expansion, though they might also be more susceptible to market volatility and economic downturns.",
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
              <h2 className="text-3xl graphik-font-medium text-171E27 sm:text-5xl">
                <span className="block">Quant Growth Fund</span>
              </h2>
              <ul className="mt-10 text-lg " style={{ padding: 0 }}>
                <li style={listItemStyle}>
                  Classic Growth Investing Approach: Focuses on high-quality
                  businesses that have strong competitive advantages and are
                  skilled in capital allocation.
                </li>
                <li style={listItemStyle}>
                  Automated Stock Selection: Uses a fully automated, objective
                  process to eliminate human errors and capitalize on market
                  mispricing.
                </li>
                <li style={listItemStyle}>
                  Proprietary Algorithm: Employs a multi-faceted algorithm to
                  rank businesses based on capital efficiency, cash flow
                  generation, and liquidity.
                </li>
              </ul>
              <div>
                <button className="bg-primary-dark text-[#fff] font-extrabold sm:w-1/2 mt-10 mx-auto rounded-md py-2">
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
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-normal">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button className="mt-4 px-2 py-1 rounded-md text-white bg-primary-dark w-max">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </GrayContainer>
      <div className="px-4 sm:px-44">
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
                    ensure these chosen stocks are actively traded. This means
                    they have sufficient buying and selling volume, making it
                    easier to enter and exit positions.
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
                    A profitability screener is a tool used to filter stocks
                    based on their financial performance, specifically focusing
                    on profitability. It helps identify companies that are
                    generating profits and ideally, those profits are growing at
                    a healthy rate. It removes companies losing money and
                    focuses on those with high profit growth. Common metrics
                    used are profit margin, net profit margin, ROE, ROA, PAT/EPS
                    growth.
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
                    After putting all the companies through our profitability
                    filter, we find a composite rank for all the remaining
                    companies, we identify the 30 strongest performers. These
                    top contenders are then weighted equally to create a
                    diversified portfolio.
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
                    stays on track. Imagine your portfolio weights stocks and
                    bonds differently than you originally planned. Rebalancing
                    involves buying or selling assets to get those weights back
                    in line with your goals and risk tolerance. It helps
                    maintain your investment strategy and potentially capture
                    market opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </GrayContainer>
      <Container>
        <div className="my-20 rounded-lg  p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg  font-semibold text-[#151E28] mb-2">
              Download Strategy PPT
            </h3>
            <p className="text-gray-600">
              Click the link below to download the PowerPoint presentation for
              the entire strategy.
            </p>
          </div>
          <div className="flex justify-between gap-10">
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
    </div>
  );
};

export default QuantGrowthFund;
