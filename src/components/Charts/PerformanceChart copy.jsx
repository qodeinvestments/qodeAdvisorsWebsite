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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
const PerformanceChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL"); // State to manage selected time range
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [historicalInvestmentAmount, setHistoricalInvestmentAmount] =
    useState(1000);
  const [historicalInvestmentPeriod, setHistoricalInvestmentPeriod] =
    useState(1);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(0);
  const [startOfMonthData, setStartOfMonthData] = useState([]);

  const handleInvestmentAmountChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
        const filteredData = jsonData.filter((entry) => {
          const date = new Date(entry.date);
          return date.getDate() === 1;
        });
        setStartOfMonthData(filteredData);
        calculateFutureInvestmentValue(
          historicalInvestmentAmount,
          historicalInvestmentPeriod,
          filteredData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [historicalInvestmentAmount, historicalInvestmentPeriod]);

  const calculateFutureInvestmentValue = (amount, period, data) => {
    const sharesBought = [];
    for (let i = 0; i < period * 12; i++) {
      const currentMonth = data[i];
      if (currentMonth) {
        const shares =
          investmentFrequency === "monthly"
            ? amount / currentMonth.nav
            : investmentFrequency === "yearly"
            ? (amount * 12) / currentMonth.nav
            : amount / currentMonth.nav;
        sharesBought.push(shares);
      }
    }

    let totalShares = 0;
    let currentValue = 0;
    for (let i = 0; i < sharesBought.length; i++) {
      totalShares += sharesBought[i];
      const lastMonthNav = data[data.length - 1].nav;
      currentValue = totalShares * lastMonthNav;
    }

    const calculatedValue = currentValue - amount * period * 12;
    setFutureInvestmentValue(calculatedValue.toFixed(2));
  };

  const handleInvestmentFrequencyChange = (frequency) => {
    setInvestmentFrequency(frequency);
    calculateFutureInvestmentValue(
      historicalInvestmentAmount,
      historicalInvestmentPeriod,
      startOfMonthData
    );
  };

  const handleInvestmentPeriodChange = (action) => {
    if (action === "increment") {
      setInvestmentPeriod(investmentPeriod + 1);
      setHistoricalInvestmentPeriod(investmentPeriod + 1);
      calculateFutureInvestmentValue(
        historicalInvestmentAmount,
        investmentPeriod + 1,
        startOfMonthData
      );
    } else if (action === "decrement" && investmentPeriod > 1) {
      setInvestmentPeriod(investmentPeriod - 1);
      setHistoricalInvestmentPeriod(investmentPeriod - 1);
      calculateFutureInvestmentValue(
        historicalInvestmentAmount,
        investmentPeriod - 1,
        startOfMonthData
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
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
          <button className="bg-[#48B4EA] text-white w-full rounded-md py-2">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
