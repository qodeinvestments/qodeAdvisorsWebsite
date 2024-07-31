import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const Calculator = ({ strategy }) => {
  const [startOfMonthData, setStartOfMonthData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(0);
  const [data, setData] = useState([]);
  console.log(strategy);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/mainData.json");
        const jsonData = await response.json();

        // Assuming strategy is something like "momentum", "qgf", or "lowvol"
        if ((strategy = "qgm")) {
          strategy = "momentum";
        }
        const strategyData = jsonData[strategy];
        console.log(jsonData);

        if (!strategyData) {
          console.error(`No data found for strategy: ${strategy}`);
          return;
        }

        setData(strategyData);
        console.log("data", strategyData);

        if (strategyData && strategyData.length > 0) {
          const periodStartDate = new Date(
            strategyData[strategyData.length - 1].Date
          );
          console.log(periodStartDate);
          periodStartDate.setFullYear(
            periodStartDate.getFullYear() - investmentPeriod
          );

          const filteredData = strategyData.filter((entry) => {
            const date = new Date(entry.Date);
            return (
              !isNaN(date.getTime()) &&
              date.getDate() === 1 &&
              date >= periodStartDate
            );
          });

          setStartOfMonthData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [investmentPeriod, strategy]);

  useEffect(() => {
    if (startOfMonthData.length > 0) {
      calculatePresentInvestmentValue();
    }
  }, [
    investmentAmount,
    investmentFrequency,
    investmentPeriod,
    startOfMonthData,
    strategy,
  ]);

  const calculatePresentInvestmentValue = () => {
    if (investmentFrequency === "one-time") {
      const investmentDate = new Date(data[data.length - 1].Date);
      investmentDate.setFullYear(
        investmentDate.getFullYear() - investmentPeriod
      );

      const investmentDateFormatted =
        (investmentDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        investmentDate.getDate().toString().padStart(2, "0") +
        "/" +
        investmentDate.getFullYear();

      const investmentEntry = data.find(
        (entry) => entry.Date === investmentDateFormatted
      );

      if (investmentEntry) {
        const strategyValue = investmentEntry["Total Portfolio NAV"];
        const shares = investmentAmount / strategyValue;
        const currentPrice = data[data.length - 1]["Total Portfolio NAV"];
        const futureValue = shares * currentPrice;
        console.log("Future value:", futureValue);
        setFutureInvestmentValue(futureValue.toFixed(2));
      } else {
        console.log("No exact match for investment date found in data.");
        setFutureInvestmentValue(0);
      }
    } else {
      const months =
        investmentFrequency === "monthly"
          ? investmentPeriod * 12
          : investmentPeriod;
      let totalShares = 0;
      for (let i = 0; i < months && i < startOfMonthData.length; i++) {
        const strategyValue = startOfMonthData[i]["Total Portfolio NAV"];
        const shares = investmentAmount / strategyValue;
        totalShares += shares;
      }
      const finalPrice =
        totalShares * data[data.length - 1]["Total Portfolio NAV"];
      setFutureInvestmentValue(finalPrice.toFixed(2));
    }
  };

  const handleInvestmentAmountChange = (e) => {
    setInvestmentAmount(parseInt(e.target.value));
  };

  const handleInvestmentFrequencyChange = (frequency) => {
    setInvestmentFrequency(frequency);
  };

  const handleInvestmentPeriodChange = (action) => {
    setInvestmentPeriod((prev) =>
      action === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  function numberWithCommas(x) {
    const num = parseInt(x).toString();
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  }

  const formatInvestmentPeriod = () => {
    switch (investmentFrequency) {
      case "monthly":
        return `₹${investmentAmount} every month for ${investmentPeriod} years`;
      case "yearly":
        return `₹${investmentAmount} every year for ${investmentPeriod} years`;
      case "one-time":
        return `₹${investmentAmount} ${investmentPeriod} years ago`;
      default:
        return `₹${investmentAmount} ${investmentPeriod} years ago`;
    }
  };

  const calculateTotalInvestment = () => {
    let periods = 0;
    if (investmentFrequency === "monthly") {
      periods = investmentPeriod * 12; // 12 months per year
    } else if (investmentFrequency === "yearly") {
      periods = investmentPeriod;
    } else if (investmentFrequency === "one-time") {
      periods = 1;
    }
    return investmentAmount * periods;
  };

  return (
    <>
      <h1 className="text-xl  md:text-2xl">Calculate & Decide</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="text-gray-500 mb-2 sm:mb-0 w-full sm:w-auto">
          Investment Amount (₹)
        </p>
        <input
          type="number"
          name="investmentamount"
          placeholder="1000"
          value={investmentAmount}
          onChange={handleInvestmentAmountChange}
          className="active:border-1 py-2 text-center  border w-full sm:w-48"
        />
      </div>
      <p className="text-gray-500 mb-2">Investment Frequency</p>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <button
          className={` py-2 text-center  w-full sm:w-1/3 ${
            investmentFrequency === "monthly"
              ? "bg-primary-dark text-white"
              : "bg-white border border-gray-300 text-black"
          }`}
          onClick={() => handleInvestmentFrequencyChange("monthly")}
        >
          Monthly
        </button>
        <button
          className={` py-2 text-center w-full sm:w-1/3 ${
            investmentFrequency === "yearly"
              ? "bg-primary-dark text-white"
              : "bg-white border border-gray-300 text-black"
          }`}
          onClick={() => handleInvestmentFrequencyChange("yearly")}
        >
          Yearly
        </button>
        <button
          className={` py-2 text-center  w-full sm:w-1/3 ${
            investmentFrequency === "one-time"
              ? "bg-primary-dark text-white"
              : "bg-white border border-gray-300 text-black"
          }`}
          onClick={() => handleInvestmentFrequencyChange("one-time")}
        >
          One-time
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="text-gray-500 mb-2 sm:mb-0 w-full sm:w-auto">
          Investment Period (Years)
        </p>
        <div className="custom-number-input h-10 w-full sm:w-48">
          <div className="flex flex-row h-10 w-full  relative bg-transparent mt-1 border">
            <button
              data-action="decrement"
              className="text-gray-600 h-full w-20  cursor-pointer outline-none"
              onClick={() => handleInvestmentPeriodChange("decrement")}
            >
              <span className="m-auto text-md font-thin">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-full bg-white  text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
              name="custom-input-number"
              value={investmentPeriod}
              readOnly
            />
            <button
              data-action="increment"
              className="text-gray-600 h-full w-20  cursor-pointer"
              onClick={() => handleInvestmentPeriodChange("increment")}
            >
              <span className="m-auto text-md font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mb-4">
        Figures are calculated based on historical returns
      </p>
      <div className="text-center px-5 py-3 border  mb-4">
        <FontAwesomeIcon icon={faChartLine} />
        <p className="mb-3 text-xs text-gray-400">
          If you had invested <strong>{formatInvestmentPeriod()}</strong>, your
          investments would be worth
        </p>
        <p className="text-lg">
          <strong>₹{numberWithCommas(futureInvestmentValue)}</strong>
        </p>
        <p className="text-xs text-gray-400">
          Total Amount Invested:{" "}
          <strong>₹{numberWithCommas(calculateTotalInvestment())}</strong>
        </p>
      </div>
      <div className="text-center">
        <button className="bg-primary-dark text-white w-full  py-2">
          Invest Now
        </button>
      </div>
    </>
  );
};

export default Calculator;
