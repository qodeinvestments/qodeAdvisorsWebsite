import React, { useState, useEffect, useMemo, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Tabs, TabsBody, TabPanel } from "@material-tailwind/react";
import Calculator from "../Calculator";
import fetchStrategyData from "../api/getData";
import HoldingDistribution from "./HoldingDistribution";
import Modal from "../Modal";
import BookAMeet from "../../Pages/BookAMeet";
import { Link } from "react-router-dom";
import Container from "../container/Container";

const PerformanceChart = ({ strategy }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeButton, setActiveButton] = useState("ALL");
  const [filteredData, setFilteredData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchStrategyData(
        strategy,
        timeRange,
        startDate,
        endDate
      );
      const chartData = prepareChartData(data, strategy);
      updateChartOptions(chartData);
      setFilteredData(data);
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  }, [strategy, timeRange, startDate, endDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const calculateCAGR = useCallback(
    (data, timeRange = "3Y", portfolioType = "total_portfolio_nav") => {
      const parseDate = (dateString) => new Date(dateString);

      const sortedData = [...data].sort(
        (a, b) => parseDate(a.date) - parseDate(b.date)
      );

      if (sortedData.length < 2) return "Loading...";

      const latestData = sortedData[sortedData.length - 1];
      const latestDate = parseDate(latestData.date);
      let startDate = new Date(latestDate);

      switch (timeRange) {
        case "1M":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "3M":
          startDate.setMonth(startDate.getMonth() - 3);
          break;
        case "6M":
          startDate.setMonth(startDate.getMonth() - 6);
          break;
        case "1Y":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        case "3Y":
          startDate.setFullYear(startDate.getFullYear() - 3);
          break;
        case "5Y":
          startDate.setFullYear(startDate.getFullYear() - 5);
          break;
        case "ALL":
          startDate = parseDate(sortedData[0].date);
          break;
        case "YTD":
          startDate.setMonth(0, 1);
          break;
        default:
          return "Invalid time range";
      }

      const startIndex = sortedData.findIndex(
        (d) => parseDate(d.date) >= startDate
      );
      if (startIndex === -1) return "N/A";

      const startValue = parseFloat(sortedData[startIndex][portfolioType]);
      const endValue = parseFloat(latestData[portfolioType]);

      if (isNaN(startValue) || isNaN(endValue)) return "N/A";

      const years =
        (latestDate - parseDate(sortedData[startIndex].date)) /
        (365 * 24 * 60 * 60 * 1000);
      const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;

      return cagr.toFixed(2) + "%";
    },
    []
  );

  const strategyCagr = useMemo(
    () => calculateCAGR(filteredData, timeRange, "total_portfolio_nav"),
    [calculateCAGR, filteredData, timeRange]
  );

  const prepareChartData = useCallback((data, strategy) => {
    const strategyKey = "total_portfolio_nav";
    const initialStrategyValue = parseFloat(data[0][strategyKey]);
    const initialNiftyValue = parseFloat(
      data[0]["Nifty 50"] || data[0]["nifty"]
    );
    return data.map((item) => ({
      date: item.date,
      strategyValue:
        (parseFloat(item[strategyKey]) / initialStrategyValue) * 100,
      niftyValue:
        (parseFloat(item["Nifty 50"] || item["nifty"]) / initialNiftyValue) *
        100,
    }));
  }, []);

  // const prepareChartData = (data, strategy) => {
  //   const strategyKey = "total_portfolio_nav";
  //   const initialStrategyValue = parseFloat(data[0][strategyKey]);
  //   const initialNiftyValue = parseFloat(
  //     data[0]["Nifty 50"] || data[0]["nifty"]
  //   );
  //   return data.map((item) => ({
  //     date: item.date,
  //     strategyValue:
  //       (parseFloat(item[strategyKey]) / initialStrategyValue) * 100,
  //     niftyValue:
  //       (parseFloat(item["Nifty 50"] || item["nifty"]) / initialNiftyValue) *
  //       100,
  //   }));
  // };

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
      ],
      series: [
        {
          name: strategy,
          data: strategyValues,
          color: "#9ddd55",
          lineWidth: 1,
          marker: { enabled: false },
          type: "line",
        },
        {
          name: "Nifty 50",
          data: niftyValues,
          color: "#000",
          lineWidth: 2,
          marker: { enabled: false },
          type: "line",
        },
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

  const handleTimeRangeChange = useCallback((range) => {
    setTimeRange(range);
    setActiveButton(range);
    if (range !== "ALL") {
      setStartDate(null);
      setEndDate(null);
    }
  }, []);

  return (
    <div className="mx-auto ">
      <div className="flex flex-col px-2 lg:flex-row gap-2">
        {/* Chart Section */}
        <div className="lg:w-2/3 ">
          <div className="p-6">
            <Tabs value="chart1">
              <div className="flex gap-4">
                {/* Time Range Buttons */}
                <div className="flex  flex-wrap items-center justify-between gap-2">
                  {["YTD", "1M", "3M", "6M", "1Y", "3Y", "5Y", "ALL"].map(
                    (range) => (
                      <button
                        key={range}
                        onClick={() => handleTimeRangeChange(range)}
                        className={`px-5 h-2/7 border py-2 text-sm ${
                          activeButton === range
                            ? "bg-red-600 text-white"
                            : "bg-white text-black "
                        }`}
                      >
                        {range}
                      </button>
                    )
                  )}
                </div>

                {/* Date Inputs and CAGR */}
                <div className="flex flex-col sm:flex-row sophia-pro-font items-center justify-between gap-32">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border  px-3 py-2 text-sm w-full sm:w-auto"
                    />
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border  px-3 py-2 text-sm w-full sm:w-auto"
                    />
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-3xl  text-gray-800">{strategyCagr}</p>
                    <p className="text-sm text-gray-600">{timeRange} CAGR</p>
                  </div>
                </div>
              </div>

              <TabsBody className="mt-6">
                <TabPanel className="p-0" key="chart1" value="chart1">
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
        </div>

        {/* Calculator Section */}
        <div className="lg:w-1/3 border">
          <div className="bg-white p-6">
            {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Calculator
            </h2> */}
            <Calculator strategy={strategy} />
          </div>
        </div>
      </div>

      {/* Sign Up Section */}
    </div>
  );
};

export default PerformanceChart;
