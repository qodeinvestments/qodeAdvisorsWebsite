import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Container } from "../components";
const MomentumTabs = () => {
  const [activeTab, setActiveTab] = useState("Features");
  const tabs = ["Features", "Working", "Performance", "Calculator", "FAQ"];

  const tabData = {
    Features: [
      `The Universe: We have created a list of 500 companies out of all listed companies on the National Stock Exchange NSE. This list is created by a proprietary formula which takes its origin from the NSE 500 methodology. They are created using a volume and market cap based ranking system;`,
      `Momentum: The idea of using momentum to generate higher returns has been around for well over 100 years. It's one of the most studied factors in quantitative investing, attracting interest from both academics and investment professionals. The concept gained significant traction in 1993 with a groundbreaking paper by professors Narasimhan and Titman from UCLA, titled "Returns to buying winners and selling losers: Implications for stock market efficiency." Since then, numerous studies have been conducted on momentum investing. Notably, a comprehensive analysis by the quantitative hedge fund AQR, titled "Fact, Fiction and Momentum Investing," explored the effectiveness of momentum strategies across various asset classes and countries over the past two centuries.`,
      `Volatility: This is the base case where we buy top 30 stocks based on ROC ranking. This is pure vanilla momentum strategy we tested using momentum. `,
      `Shifting to Cash: Stocks tend to rise in value most of the time, historically around 70%. However, they can experience significant downturns, sometimes dropping by 50% or more. While no investment strategy is completely immune to these corrections, a strategy that minimizes downside risk to a level close to or even slightly better than the market average has a strong chance of outperforming in the long run. This approach involves using specific criteria to select stocks. In real-world market conditions, these criteria have proven effective in reducing exposure to stocks during broad market corrections. This means the strategy automatically holds fewer stocks when the market is weakest, potentially limiting losses.`,
    ],
    Working: [
      `We first look at the six months average rolling market cap and turnover for each security. We then use composite ranking of 50% weightage to each factor and choose the top 500 for the back test.`,
      `Rate of Change is essentially the simplest form of momentum indicator which tells how much has a particular stock given return in a particular period of time. We ideally want to buy stocks that are in momentum and among them the one that have the highest momentum. This is used to compare stocks in the universe and rank based on pure momentum.`,
      `This is a variation to the naive momentum where aim to buy stocks which have a high momentum but a lower volatility. The method used for this is to divided the rate of change of a particular stock with it’s standard deviation during the same lookback period. All stocks are ranked based on this parameter and we buy the top 30 stocks.`,
    ],
    Performance: [
      "Links to download pdfs for- equity curve comparing Nifty 50/benchmarks, drawdown curve for the same, yearly/quarterly/monthly returns, days in drawdowns.",
      "Interactive graphs to show why momentum is working (of different indices) and current holdings (can only be viewed by premium members post subscription).",
    ],
    Calculator: [
      "SIP, Lumpsum reference- https://groww.in/calculators/sip-calculator",
    ],
    FAQ: [""],
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [chartSeries, setChartSeries] = useState(
    tabs.map(() => 1 / tabs.length)
  );
  const [chartOptions, setChartOptions] = useState({
    labels: tabs,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    colors: tabs.map((tab) => (tab === activeTab ? "#ff0000" : "#cccccc")),
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => opts.w.config.labels[opts.seriesIndex],
    },
    events: {
      dataPointSelection: (event, chartContext, config) => {
        const selectedTabIndex = config.dataPointIndex;
        const selectedTab = tabs[selectedTabIndex];
        handleTabChange(selectedTab);
      },
    },
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      colors: tabs.map((tab) => (tab === activeTab ? "#ff0000" : "#cccccc")),
    }));
  }, [activeTab, tabs]);

  return (
    <div className="mx-auto inter-font">
      <div className=" bg-primarypy-12 md:py-20 inter-font">
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
        <Tabs value={activeTab}>
          <TabsHeader className="mb-4 p-2 bg-gray-200">
            {tabs.map((tab) => (
              <Tab key={tab} value={tab} onClick={() => handleTabChange(tab)}>
                {tab}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabs.map((tab) => (
              <TabPanel key={tab} value={tab}>
                {activeTab === tab && (
                  <div className="flex flex-row-reverse gap-6">
                    <div className="">
                      <Chart
                        type="donut"
                        series={chartSeries}
                        options={chartOptions}
                        width="400"
                        height="500"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {activeTab}
                      </h3>
                      <ul className="list-decimal space-y-5 ">
                        {tabData[activeTab].map((value, index) => (
                          <li key={index} className=" text-start">
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Container>
    </div>
  );
};

export default MomentumTabs;
