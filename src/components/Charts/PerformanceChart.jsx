import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DiscreteChart from "./DiscreteChart";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Calculator from "../Calculator";
const PerformanceChart = () => {
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

        console.log(filteredData);

        updateChartOptions(filteredData, timeRange);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    console.log(timeRange);

    fetchData();
  }, [timeRange, startDate, endDate]);

  const normalizeData = (data) => {
    const initialMomentum = data[0]["Vol Adjusted Momentum"];

    return data.map((item) => ({
      ...item,
      normalizedMomentum:
        (item["Vol Adjusted Momentum"] / initialMomentum) * 100,
    }));
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

    const normalizedData = normalizeData(filteredData);

    const dates = normalizedData.map((item) => item.Date);
    const momentum = normalizedData.map((item) =>
      Math.trunc(item.normalizedMomentum)
    );

    let maxValue = 0;
    const drawdown = normalizedData.map((item) => {
      const value = item.normalizedMomentum;
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
          name: "Momentum",
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
          lineWidth: 0,
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
    <div className="flex flex-col md:flex-row  gap-4">
      <div className="w-full md:w-3/4 lg:w-[70%]      sm:pb-10 rounded-lg">
        <Tabs value="chart1">
          <div className="flex flex-col sm:flex-row items-center justify-between p-2">
            <TabsHeader className="bg-gray-200 border-gray-300  border  p-1">
              <Tab className="text-sm" key="chart1" value="chart1">
                Trailing
              </Tab>
              <Tab className="text-sm" key="chart2" value="chart2">
                Discrete
              </Tab>
              <Tab className="text-sm" key="chart3" value="chart3">
                Rolling
              </Tab>
            </TabsHeader>

            <div className="flex gap-2">
              {["YTD", "6M", "1Y", "5Y"].map((range) => (
                <button
                  key={range}
                  className={`bg-white py-1 px-3 text-sm rounded ${
                    activeButton === range ? "bg-[#151e28] text-white" : ""
                  }`}
                  onClick={() => {
                    setTimeRange(range);
                    setActiveButton(range);
                    // Optionally fetch data or reset dates based on range
                    if (range !== "ALL") {
                      setStartDate(null);
                      setEndDate(null);
                    }
                  }}
                >
                  {range}
                </button>
              ))}
              <input
                type="date"
                value={startDate || ""} // Fallback to empty string if null
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white text-gray-600 text-sm py-1 px-2 rounded"
              />
              <input
                type="date"
                value={endDate || ""} // Fallback to empty string if null
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white text-gray-600 text-sm py-1 px-2 rounded"
              />

              <button
                className={`bg-white py-1 px-2 text-sm rounded ${
                  activeButton === "ALL" ? "bg-[#151e28] text-white" : ""
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
          </div>
          <TabsBody>
            <TabPanel key="chart1" value="chart1">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
            <TabPanel key="chart2" value="chart2">
              {<DiscreteChart />}
            </TabPanel>
            <TabPanel key="chart3" value="chart3">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full md:w-1/4 lg:w-[30%]  flex flex-col space-y-7 border bg-white rounded-md p-4">
        <Calculator />
      </div>
    </div>
  );
};

export default PerformanceChart;
