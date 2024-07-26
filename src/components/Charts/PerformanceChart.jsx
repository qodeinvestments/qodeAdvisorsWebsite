import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DiscreteChart from "./DiscreteChart";
import RollingReturns from "./RollingReturns";
import fetchStrategyData from "../api/getData";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Calculator from "../Calculator";
const PerformanceChart = ({ strategy }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeButton, setActiveButton] = useState("ALL");
  const [triggerFetch, setTriggerFetch] = useState(0);
  const [activeTab, setActiveTab] = useState("chart1");

  useEffect(() => {
    const loadData = async () => {
      try {
        const filteredData = await fetchStrategyData(
          strategy,
          timeRange,
          startDate,
          endDate
        );
        console.log("filteredData", filteredData);
        const chartData = prepareChartData(filteredData, strategy);
        updateChartOptions(chartData);
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    };

    loadData();
  }, [strategy, timeRange, startDate, endDate, triggerFetch]);

  const prepareChartData = (data, strategy) => {
    const strategyKey = strategy.toLowerCase();
    const initialValue = parseFloat(data[0][strategyKey]);
    const initialStrategyValue = parseFloat(data[0][strategyKey]);
    const initialNiftyValue = parseFloat(
      data[0]["Nifty 50"] || data[0]["Nifty"]
    );
    return data.map((item) => ({
      date: item.Date,
      strategyValue:
        (parseFloat(item[strategyKey]) / initialStrategyValue) * 100,
      niftyValue:
        (parseFloat(item["Nifty 50"] || item["Nifty"]) / initialNiftyValue) *
        100,
    }));
  };

  const updateChartOptions = (data) => {
    const dates = data.map((item) => item.date);
    const strategyValues = data.map((item) => Math.trunc(item.strategyValue));
    const niftyValues = data.map((item) => Math.trunc(item.niftyValue));

    let maxStrategyValue = 0;
    const drawdown = data.map((item) => {
      const value = item.strategyValue;
      const dd =
        maxStrategyValue > value ? (value / maxStrategyValue - 1) * 100 : 0;
      maxStrategyValue = Math.max(maxStrategyValue, value);
      return Math.trunc(dd);
    });

    const options = {
      title: "",
      xAxis: {
        categories: dates,
        labels: {
          formatter: function () {
            const date = new Date(this.value);
            return `${date.toLocaleString("default", {
              month: "short",
            })} ${date.getFullYear()}`;
          },
        },
        tickPositions: [0, Math.floor(dates.length / 2), dates.length - 1],
      },
      yAxis: [
        {
          title: { text: "Performance" },
          height: "100%",
        },
        // {
        //   title: { text: "Drawdown" },
        //   top: "65%",
        //   height: "35%",
        //   offset: 0,
        //   opposite: false,
        // },
      ],
      series: [
        {
          name: strategy,
          data: strategyValues,
          color: "rgba(26,175,86)",
          lineWidth: 1,
          marker: { enabled: false },
          type: "line",
        },
        {
          name: "Nifty 50",
          data: niftyValues,
          color: "rgba(70,130,180)",
          lineWidth: 2,
          marker: { enabled: false },
          type: "line",
        },
        // {
        //   name: "Drawdown",
        //   data: drawdown,
        //   color: "rgba(250, 65, 65)",
        //   lineWidth: 1,
        //   marker: { enabled: false },
        //   type: "area",
        //   yAxis: 1,
        //   fillColor: {
        //     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        //     stops: [
        //       [0, "rgba(250, 65, 65, 0.3)"],
        //       [1, "rgba(250, 65, 65, 0.9)"],
        //     ],
        //   },
        // },
      ],
      chart: {
        height: 600,
        backgroundColor: "none",
        zoomType: "x",
      },
      tooltip: { shared: true },
      legend: { enabled: false },
      credits: { enabled: false },
      exporting: { enabled: true },
    };

    setChartOptions(options);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-[70%] sm:pb-10 ">
        <Tabs value="chart1">
          <div className="flex flex-col lg:flex-row gap-2  sm:items-center justify-between lg:p-2">
            {/* <TabsHeader className="bg-[#f0eeee] border-gray-300 border p-1 mb-4 sm:mb-0">
              <Tab
                className="text-xs sm:text-sm"
                onClick={() => handleTabClick("chart1")}
                key="chart1"
                value="chart1"
              >
                Trailing
              </Tab>
              <Tab
                className="text-xs sm:text-sm"
                onClick={() => handleTabClick("chart2")}
                key="chart2"
                value="chart2"
              >
                Discrete
              </Tab>
              <Tab
                className="text-xs sm:text-sm"
                onClick={() => handleTabClick("chart3")}
                key="chart3"
                value="chart3"
              >
                Rolling
              </Tab>
            </TabsHeader> */}

            {activeTab === "chart1" && (
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {["YTD", "1M", "3M", "6M", "1Y", "5Y"].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setTimeRange(range);
                        setActiveButton(range);
                        if (range !== "ALL") {
                          setStartDate(null);
                          setEndDate(null);
                        }
                        setTriggerFetch((prev) => prev + 1); // Add this line
                      }}
                      className={`px-3 py-1 text-sm ${
                        activeButton === range
                          ? "bg-black text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="startDate"
                        className="text-sm md:hidden block text-gray-600 mb-1"
                      >
                        Start Date
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-[#f7f5f5] text-gray-900 text-xs sm:text-sm py-2 px-3 "
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="endDate"
                        className="text-sm  md:hidden block text-gray-600 mb-1"
                      >
                        End Date
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-[#f7f5f5] text-gray-900 text-xs sm:text-sm py-2 px-3 "
                      />
                    </div>
                  </div>
                </div>

                <button
                  className={`bg-[#f7f5f5] py-2 sm:py-1 px-2 text-xs sm:text-sm ${
                    activeButton === "ALL" ? "bg-primary-dark text-white" : ""
                  }`}
                  onClick={() => {
                    setTimeRange("ALL");
                    setStartDate("");
                    setEndDate("");
                    setActiveButton("ALL");
                    fetchStrategyData();
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          <TabsBody>
            <TabPanel className="p-0" key="chart1" value="chart1">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
            {/* <TabPanel key="chart2" value="chart2">
              {<DiscreteChart strategy={strategy} />}
            </TabPanel> */}
            {/* <TabPanel key="chart3" value="chart3">
              {chartOptions && <RollingReturns strategy={strategy} />}
            </TabPanel> */}
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full lg:w-[30%] flex flex-col space-y-7 border bg-white rounded-md p-4">
        <Calculator strategy={strategy.toLowerCase()} />
      </div>
    </div>
  );
};

export default PerformanceChart;
