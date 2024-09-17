import React, { useState, useEffect, useMemo, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Tabs,
  TabsBody,
  TabPanel,
  ButtonGroup,
} from "@material-tailwind/react";
import Calculator from "../Calculator";
import fetchStrategyData from "../api/getData";
import HoldingDistribution from "./HoldingDistribution";
import Modal from "../Modal";
import BookAMeet from "../../Pages/BookAMeet";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import Section from "../container/Section";
import Button from "../common/Button";
import Text from "../common/Text";
import Heading from "../common/Heading";
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
          title: { text: "" },
          height: "100%",
        },
      ],
      series: [
        {
          name: strategy,
          data: strategyValues,
          color: "#d1a47b",
          lineWidth: 2,
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
        height: 520,
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
    <div className="flex flex-col justify-center gap-4">
      {" "}
      {/* Adjusted gap spacing */}
      <div className="w-full p-7 border border-brown">
        <Tabs value="chart1">
          {" "}
          {/* Adjusted gap spacing */}
          {/* Time Range Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap   gap-18">
              {["1M", "6M", "1Y", "3Y", "5Y", "ALL"].map((range) => (
                <Button
                  onClick={() => handleTimeRangeChange(range)}
                  className={` text-xs border border-brown ${
                    activeButton === range
                      ? "bg-beige border-none text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {range}
                </Button>
              ))}
              {/* Adjusted gap spacing */}
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-1 w-full sm:w-auto"
              />
              {/* <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-1 w-full sm:w-auto"
            /> */}
            </div>
            <div className="text-center sm:text-right mt-1 sm:mt-0">
              <Text className="text-subheading font-subheading text-gray-800">
                {strategyCagr}
                <span className="text-xs ml-1">{timeRange} return</span>
              </Text>
            </div>
          </div>
          <TabsBody className="mt-3">
            {" "}
            {/* Adjusted margin */}
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
      <div className="w-full flex gap-4">
        {" "}
        {/* Adjusted margin */}
        <div className=" p-6  bg-white border border-brown w-3/5">
          {" "}
          {/* Adjusted padding */}
          <Calculator strategy={strategy} />
        </div>
        <div className="bg-black p-6 w-2/5">
          <Heading className="text-beige text-semiheading mb-4">
            Do you want to see the live portfolio performance?
          </Heading>
          <Button className="bg-beige text-black">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
