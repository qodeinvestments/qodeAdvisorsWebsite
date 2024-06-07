import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PerformanceChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL"); // State to manage selected time range
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [historicalInvestmentAmount, setHistoricalInvestmentAmount] =
    useState(10000);
  const [historicalInvestmentPeriod, setHistoricalInvestmentPeriod] =
    useState(5);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(10000);

  const handleInvestmentAmountChange = (e) => {
    setInvestmentAmount(e.target.value);
    calculateFutureInvestmentValue();
  };
  const calculateFutureInvestmentValue = () => {
    const calculatedValue = investmentAmount * investmentPeriod * 1.05;
    setFutureInvestmentValue(calculatedValue.toFixed(2));
  };

  const totalAmountMade = (IA, IF, IP) => {};

  const fetchNumberOfSharesBought = () => {};

  const handleInvestmentFrequencyChange = (frequency) => {
    setInvestmentFrequency(frequency);
    calculateFutureInvestmentValue();
  };

  const handleInvestmentPeriodChange = (action) => {
    if (action === "decrement" && investmentPeriod > 0) {
      setInvestmentPeriod(investmentPeriod - 1);
    } else if (action === "increment") {
      setInvestmentPeriod(investmentPeriod + 1);
    }
    calculateFutureInvestmentValue();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
        updateChartOptions(jsonData.Sheet1, timeRange); // Call updateChartOptions with initial data and time range
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [timeRange]);

  const normalizeData = (data) => {
    const initialMomentum = data[0]["Vol Adjusted Momentum"];
    const initialNifty = data[0]["Nifty 50"];

    return data.map((item) => ({
      ...item,
      normalizedMomentum:
        (item["Vol Adjusted Momentum"] / initialMomentum) * 100,
      normalizedNifty: (item["Nifty 50"] / initialNifty) * 100,
    }));
  };

  const updateChartOptions = (data, range) => {
    let filteredData = data;

    if (range !== "ALL") {
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
    const nifty = normalizedData.map((item) =>
      Math.trunc(item.normalizedNifty)
    );

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
        gridLineWidth: 0, // Hide x-grid lines
      },
      yAxis: {
        title: {
          text: "",
        },
        gridLineWidth: 0, // Add this line to hide horizontal y-grid lines
      },
      series: [
        {
          name: "Momentum",
          data: momentum,
          type: "area",
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, "rgba(75,192,192,0.9)"],
              [1, "rgba(75,192,192,0)"],
            ],
          },
          lineColor: "rgb(56, 143, 143)", // Darker line color, remove alpha
          lineWidth: 2,
          marker: {
            enabled: false,
          },
        },
        // {
        //   name: "Nifty 50",
        //   data: nifty,
        //   type: "area",
        //   color: {
        //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //     stops: [
        //       [0, "rgba(192,75,192,0.8)"],
        //       [1, "rgba(192,75,192,0.2)"],
        //     ],
        //   },
        //   lineColor: "rgb(192,75,192)",
        //   lineWidth: 2,
        //   marker: {
        //     enabled: false,
        //   },
        // },
      ],
      legend: {
        enabled: false,
      },
      chart: {
        type: "area",
        zoomType: "x",
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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/4 lg:w-4/6 bg-white border sm:p-10 rounded-lg">
        <Tabs value="chart1">
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between p-2">
            <TabsHeader className="bg-gray-200 p-1">
              <Tab key="chart1" value="chart1">
                Trailing
              </Tab>
              <Tab key="chart2" value="chart2">
                Discrete
              </Tab>
              <Tab key="chart3" value="chart3">
                Rolling
              </Tab>
            </TabsHeader>
            <div className="flex gap-2">
              <button
                className="bg-gray-200 py-1 px-2 rounded"
                onClick={() => setTimeRange("YTD")}
              >
                YTD
              </button>
              <button
                className="bg-gray-200 py-1 px-4 rounded"
                onClick={() => setTimeRange("6M")}
              >
                6M
              </button>
              <button
                className="bg-gray-200 py-1 px-4 rounded"
                onClick={() => setTimeRange("1Y")}
              >
                1Y
              </button>
              <button
                className="bg-gray-200 py-1 px-4 rounded"
                onClick={() => setTimeRange("5Y")}
              >
                5Y
              </button>
              <button
                className="bg-gray-200 py-1 px-4 rounded"
                onClick={() => setTimeRange("ALL")}
              >
                ALL
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
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
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
      <div className="w-full md:w-1/4 lg:w-2/6 flex flex-col space-y-7 border bg-white rounded-md p-4">
        {/* ... */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Investment Amount (₹)</p>
          <input
            type="number"
            name="investmentamount"
            placeholder="1000"
            value={investmentAmount}
            onChange={handleInvestmentAmountChange}
            className="active:border-1 py-2 text-center rounded-lg border"
          />
        </div>
        <p className="text-gray-500">Investment Frequency</p>
        <div className="flex justify-between items-center">
          <button
            className={`px-10 py-2 text-center border rounded-md ${
              investmentFrequency === "monthly" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleInvestmentFrequencyChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-10 py-2 text-center border rounded-md ${
              investmentFrequency === "yearly" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleInvestmentFrequencyChange("yearly")}
          >
            Yearly
          </button>
          <button
            className={`px-10 py-2 text-center border rounded-md ${
              investmentFrequency === "one-time" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleInvestmentFrequencyChange("one-time")}
          >
            One-time
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Investment Period (Years)</p>
          <div className="custom-number-input h-10 w-32">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border">
              <button
                data-action="decrement"
                className="text-gray-600 h-full w-20 rounded-l cursor-pointer outline-none"
                onClick={() => handleInvestmentPeriodChange("decrement")}
              >
                <span className="m-auto text-md font-thin">−</span>
              </button>
              <input
                type="number"
                className="outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
                name="custom-input-number"
                value={investmentPeriod}
                readOnly
              />
              <button
                data-action="increment"
                className="text-gray-600 h-full w-20 rounded-r cursor-pointer"
                onClick={() => handleInvestmentPeriodChange("increment")}
              >
                <span className="m-auto text-md font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-center text-sm">
          Figures are calculated on basis of historical returns
        </p>
        <div className="text-center px-10 py-3 border">
          <FontAwesomeIcon icon={faChartLine} />
          <p className="mb-3">
            If you had invested{" "}
            <strong>
              ₹{historicalInvestmentAmount} {historicalInvestmentPeriod} years
              ago
            </strong>
            , your investments would be worth{" "}
          </p>
          <p>
            <strong>₹{futureInvestmentValue}</strong>
          </p>
        </div>
        <div className="text-center">
          <button className="bg-[#151E28] text-white w-full rounded-md py-2">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
