import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DiscreteChart from "./DiscreteChart";
import RollingReturns from "./RollingReturns";
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
  const [timeRange, setTimeRange] = useState("ALL"); // State to manage selected time range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeButton, setActiveButton] = useState("ALL");
  const [activeTab, setActiveTab] = useState("chart1");

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        if (!jsonData.Sheet1) {
          throw new Error("No data found in the JSON response");
        }

        const filteredData = jsonData.Sheet1.filter((item) => {
          const itemDate = new Date(item.Date);
          return itemDate.getDay() === 1; // Monday is the start of the week (0 for Sunday)
        });

        // console.log(filteredData);

        updateChartOptions(filteredData, timeRange);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // console.log(timeRange);

    fetchData();
  }, [timeRange, startDate, endDate]);

  const normalizeData = (data, strategy) => {
    const strategyKey = getStrategyKey(strategy);
    const initialValue = data[0][strategyKey];
    return data.map((item) => ({
      ...item,
      normalizedValue: (item[strategyKey] / initialValue) * 100,
    }));
  };
  const getStrategyKey = (strategy) => {
    switch (strategy) {
      case "Vol Adjusted Momentum":
        return "Vol Adjusted Momentum";
      case "Naive Momentum":
        return "Naive Momentum";
      case "Nifty 50":
        return "Nifty 50";
      case "QGF":
        return "QGF";
      case "Short Flat":
        return "Short Flat";
      case "QGF + Short Flat":
        return "QGF + Short Flat";
      default:
        throw new Error(`Invalid strategy: ${strategy}`); // Provide the invalid strategy value in the error message
    }
  };

  const updateChartOptions = (data, range) => {
    let filteredData = data;

    if (startDate && endDate) {
      filteredData = data.filter(
        (item) =>
          new Date(item.Date) >= new Date(startDate) &&
          new Date(item.Date) <= new Date(endDate)
      );
    } else if (range !== "ALL") {
      const now = new Date();
      let filteredDates;

      switch (range) {
        case "YTD":
          filteredDates = new Date(now.getFullYear(), 0, 1);
          break;
        case "6M":
          filteredDates = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case "1Y":
          filteredDates = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        case "5Y":
          filteredDates = new Date(now.setFullYear(now.getFullYear() - 5));
          break;
        default:
          filteredDates = new Date(0);
      }

      filteredData = data.filter(
        (item) => new Date(item.Date) >= filteredDates
      );
    }

    const normalizedData = normalizeData(filteredData, strategy);

    const dates = normalizedData.map((item) => item.Date);
    const momentum = normalizedData.map((item) =>
      Math.trunc(item.normalizedValue)
    );

    let maxValue = 0;
    const drawdown = normalizedData.map((item) => {
      const value = item.normalizedValue;
      const dd = maxValue > value ? (value / maxValue - 1) * 100 : 0;
      maxValue = Math.max(maxValue, value);
      return Math.trunc(dd);
    });
    const options = {
      title: {
        text: "",
      },

      xAxis: {
        categories: dates,
        labels: {
          enabled: true,
          formatter: function () {
            const date = new Date(this.value);
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return monthNames[date.getMonth()] + " " + date.getFullYear();
          },
        },
        tickPositions: [0, Math.floor(dates.length / 2), dates.length - 1], // Custom tick positions
      },
      // yAxis: [
      //   {
      //     // Options for the first y-axis (Momentum and Nifty 50)
      //     title: {
      //       text: "",
      //     },
      //   },
      //   {
      //     title: {
      //       text: "",
      //     },
      //     opposite: true,
      //     startOnTick: false,
      //     endOnTick: false,
      //     min: -80,
      //     max: 0,
      //     tickPositions: [-80, -80, -60, -40, -20, 0],
      //   },
      // ],
      yAxis: [
        {
          title: {
            text: "",
          },
          gridLineWidth: 0,
          height: "60%",
        },
        {
          title: {
            text: "",
          },
          top: "60%",
          height: "40%",
          gridLineWidth: 0,
          offset: 0,
          opposite: false,
          min: -60,
          max: 0,
          tickPositions: [-60, -40, -20, 0],
        },
      ],
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.x +
            "</b><br/>" +
            this.series.name +
            ": " +
            this.y +
            "<br/>" +
            "Total: " +
            this.point.stackTotal
          );
        },
        positioner: function (boxWidthAndHeight, point) {
          var tooltipX = point.plotX + 20;
          var tooltipY = point.plotY - 30;
          return {
            x: tooltipX,
            y: tooltipY,
          };
        },
      },
      series: [
        {
          name: getStrategyKey(strategy),
          data: momentum,
          color: "rgba(26,175,86)",
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          type: "area",
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(26,175,86, 0.9)"], // Light blue at the top
              [1, "rgba(26,175,86, 0)"], // Transparent blue at the bottom
            ],
          },
        },
        {
          name: "Drawdown",
          data: drawdown,
          color: "rgba(250, 65, 65)",
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(250, 65, 65, 0.3)"], // Light blue at the top
              [1, "rgba(250, 65, 65, 0.9)"], // Transparent blue at the bottom
            ],
          },
          type: "area", // Set the type to 'area' for the drawdown series
          yAxis: 1,
        },
      ],
      legend: {
        enabled: false,
      },
      chart: {
        type: "line",
        zoomType: "x",
        height: 600,
        backgroundColor: "none",
      },
      tooltip: {
        shared: true,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    };

    setChartOptions(options);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-[70%] sm:pb-10 rounded-lg">
        <Tabs value="chart1">
          <div className="flex flex-col lg:flex-row gap-2  sm:items-center justify-between lg:p-2">
            <TabsHeader className="bg-[#f0eeee] border-gray-300 border p-1 mb-4 sm:mb-0">
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
            </TabsHeader>

            {activeTab === "chart1" && (
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {["YTD", "6M", "1Y", "5Y"].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setTimeRange(range);
                        setActiveButton(range);
                        if (range !== "ALL") {
                          setStartDate(null);
                          setEndDate(null);
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded ${
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
                        className="bg-[#f7f5f5] text-gray-900 text-xs sm:text-sm py-2 px-3 rounded w-full"
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
                        className="bg-[#f7f5f5] text-gray-900 text-xs sm:text-sm py-2 px-3 rounded w-full"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className={`bg-[#f7f5f5] py-2 sm:py-1 px-2 text-xs sm:text-sm rounded ${
                    activeButton === "ALL" ? "bg-primary-dark text-white" : ""
                  }`}
                  onClick={() => {
                    setTimeRange("ALL");
                    setStartDate("");
                    setEndDate("");
                    setActiveButton("ALL");
                    fetchData();
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
            <TabPanel key="chart2" value="chart2">
              {<DiscreteChart strategy={strategy} />}
            </TabPanel>
            <TabPanel key="chart3" value="chart3">
              {chartOptions && <RollingReturns strategy={strategy} />}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full lg:w-[30%] flex flex-col space-y-7 border bg-white rounded-md p-4">
        <Calculator strategy={strategy} />
      </div>
    </div>
  );
};

export default PerformanceChart;
