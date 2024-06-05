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
import { faCheckCircle, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

const MomentumTabs = () => {
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
    <div className="mx-auto inter-font">
      <div className="bg-gray-800 py-12 md:py-20 inter-font">
        <div className="container mx-auto px-4 sm:px-6 lg:px-36">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Welcome to</span>
            <span className="block">Quant Growth Momentum</span>
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-300">
            Experience the power of quantitative analysis and growth strategies.
          </p>
        </div>
      </div>
      <Container>
        {/* Overview Section */}
        <div className="bg-white inter-font py-12 md:py-20">
          <div className="">
            <div className="lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Overview</span>
              </h2>
            </div>
            <div className="mt-8 lg:mt-16">
              <p className="text-gray-600">
                Momentum is the most researched strategy in financial markets
                around the world. In developed markets where there are long
                periods of data available we have seen that momentum has
                consistently been able to outperform the index or a benchmark
                across markets, assets and different periods of time.{" "}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <GrayContainer>
        <Container>
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8">
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
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                  <div className="mt-auto">
                    <button className="mt-4 px-3 py-2 rounded-md text-white bg-gray-800 w-max">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </GrayContainer>
      <div className="px-4 sm:px-10">
        <div className="py-4 sm:py-12">
          <h2 className="text-3xl font-bold text-center ">Performance</h2>
        </div>
        <div className="mb-10">
          <PerformanceChart />
        </div>
      </div>
      <GrayContainer>
        <Container>
          <div className=" py-10">
            <div className="container mx-auto sm:px-4">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
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
                      className="text-2xl text-gray-800"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                      className="text-2xl text-gray-800"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                      className="text-2xl text-gray-800"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                      className="text-2xl text-gray-800"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
        <div className="my-20 rounded-lg  p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Download Strategy PPT
            </h3>
            <p className="text-gray-600">
              Click the link below to download the PowerPoint presentation for
              the entire strategy.
            </p>
          </div>
          <a
            href="/path-to-your-ppt-file.pptx"
            download
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download PPT
          </a>
        </div>
      </Container>
      <GrayContainer>
        <Container>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Got Questions? We've Got Answers.
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-md  bg-white">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </h3>
                  <span
                    className={`text-gray-800 transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  >
                    &darr;
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

export default MomentumTabs;
