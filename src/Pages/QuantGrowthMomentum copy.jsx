import React, { useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const QuantGrowthMomentum = () => {
  const [activeTab, setActiveTab] = useState("features");
  const tabPanelRefs = useRef([]);

  const data = [
    {
      label: "Features",
      value: "features",
      desc: `1. The Universe: We have created a list of 500 companies out of all listed companies on the National Stock Exchange NSE. This list is created by a proprietary formula which takes its origin from the NSE 500 methodology. They are created using a volume and market cap based ranking system.
  
  2. Momentum: Many have tried to explain the logic of why momentum works but the most simple explanation is Frog in a Pan Hypothesis, Fundamental Disposition Effect, and Human Behavior.
  
  3. Volatility: This is the base case where we buy top 30 stocks based on ROC ranking. This is pure vanilla momentum strategy we tested using momentum.
  
  4. Shifting to Cash: (to be added by purnanad)`,
    },
    {
      label: "Working of the Strategy",
      value: "working-strategy",
      desc: `1. Screening of the stocks: We first look at the six months average rolling market cap and turnover for each security. We then use composite ranking of 50% weightage to each factor and choose the top 500 for the back test.
  
  2. How do we use momentum? Rate of Change is essentially the simplest form of momentum indicator which tells how much has a particular stock given return in a particular period of time. We ideally want to buy stocks that are in momentum and among them the one that have the highest momentum. This is used to compare stocks in the universe and rank based on pure momentum.
  
  3. How do we use volatility? This is a variation to the naive momentum where aim to buy stocks which have a high momentum but a lower volatility. The method used for this is to divided the rate of change of a particular stock with it's standard deviation during the same lookback period. All stocks are ranked based on this parameter and we buy the top 30 stocks.`,
    },
    {
      label: "Variables",
      value: "variables",
      desc: `We have five variables in this strategy. We have the results of the base case.
  
  1. Portfolio Size - 30 Stocks
  2. Lookback period - 365 Days
  3. Churn or Rebalance - Quarterly
  4. Transaction Cost - 1% on every churn.
  5. Start Date - 01/01/2002
  6. End Date - 01/04/2024`,
    },
    {
      label: "Performance",
      value: "performance",
      desc: `Links to download pdfs for- equity curve comparing Nifty 50/benchmarks, drawdown curve for the same, yearly/quarterly/monthly returns, days in drawdowns. Interactive graphs to show why momentum is working (of different indices) and current holdings (can only be viewed by premium members post subscription).`,
    },
    {
      label: "Calculator",
      value: "calculator",
      desc: `SIP, Lumpsum reference- https://groww.in/calculators/sip-calculator`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const tabPanelElements = tabPanelRefs.current;

      for (let i = 0; i < tabPanelElements.length; i++) {
        const tabPanelElement = tabPanelElements[i];
        const tabPanelTop = tabPanelElement.offsetTop - 100; // Adjust the offset value as needed
        const tabPanelBottom = tabPanelTop + tabPanelElement.offsetHeight;

        if (scrollPosition >= tabPanelTop && scrollPosition < tabPanelBottom) {
          setActiveTab(data[i].value);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <div>
      {/* Responsive Banner */}
      <div className=" bg-primarypy-12 md:py-20 inter-font">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Welcome to</span>
            <span className="block">Quant Growth Momentum</span>
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-300">
            Experience the power of quantitative analysis and growth strategies.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white inter-font py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg  text-gray-900">
                  Quantitative Analysis
                </h3>
                <p className="mt-2 text-gray-600">
                  Leverage powerful quantitative models to gain insights and
                  make informed decisions.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg  text-gray-900">
                  Growth Strategies
                </h3>
                <p className="mt-2 text-gray-600">
                  Implement proven growth strategies tailored to your business
                  needs.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg  text-gray-900">
                  Data-Driven Solutions
                </h3>
                <p className="mt-2 text-gray-600">
                  Leverage data-driven solutions to optimize processes and drive
                  growth.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-[#efefef] p-4 rounded-lg inter-font">
        <Tabs value={activeTab} className="w-full">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className="px-4 py-2 rounded-t-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="bg-white p-6 rounded-b-lg shadow-md">
            {data.map(({ value, desc }, index) => (
              <TabPanel
                key={value}
                value={value}
                className="text-gray-800 leading-relaxed"
                ref={(el) => (tabPanelRefs.current[index] = el)}
              >
                {desc.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default QuantGrowthMomentum;
