import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import Button from "./common/Button";

const Calculator = ({ data, strategy }) => {
  const [startOfMonthData, setStartOfMonthData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(0);
  const [maxInvestmentPeriod, setMaxInvestmentPeriod] = useState(Infinity);

  useEffect(() => {
    //console.log(data);

    if (data && data.length > 0) {
      const oldestDate = new Date(data[0].date);
      const newestDate = new Date(data[data.length - 1].date);
      const maxYears = newestDate.getFullYear() - oldestDate.getFullYear();
      setMaxInvestmentPeriod(maxYears);

      updateStartOfMonthData();
    }
  }, [data, investmentPeriod]);

  useEffect(() => {
    if (data && data.length > 0) {
      calculatePresentInvestmentValue();
    }
  }, [
    investmentAmount,
    investmentFrequency,
    investmentPeriod,
    data,
    startOfMonthData,
  ]);

  const updateStartOfMonthData = () => {
    if (!data || data.length === 0) return;
    const periodStartDate = new Date(data[data.length - 1].date);
    periodStartDate.setFullYear(
      periodStartDate.getFullYear() - investmentPeriod
    );

    const filteredData = data.filter((entry) => {
      const date = new Date(entry.date);
      return (
        !isNaN(date.getTime()) &&
        date.getDate() === 1 &&
        date >= periodStartDate
      );
    });
    setStartOfMonthData(filteredData);
  };

  const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const calculatePresentInvestmentValue = () => {
    if (!data || data.length === 0) {
      console.error("Insufficient data for calculation");
      setFutureInvestmentValue(0);
      return;
    }

    try {
      if (investmentFrequency === "one-time") {
        const currentDate = new Date(data[data.length - 1].date);
        const investmentDate = new Date(currentDate);
        investmentDate.setFullYear(
          currentDate.getFullYear() - investmentPeriod
        );

        const investmentEntry = data.find((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate && entryDate >= investmentDate;
        });

        if (investmentEntry) {
          const strategyValue = safeParseFloat(
            investmentEntry.total_portfolio_nav
          );
          const shares = investmentAmount / strategyValue;
          const currentPrice = safeParseFloat(
            data[data.length - 1].total_portfolio_nav
          );
          const futureValue = shares * currentPrice;
          setFutureInvestmentValue(futureValue);
        } else {
          setFutureInvestmentValue(0);
        }
      } else {
        const totalMonths = investmentPeriod * 12;
        let totalShares = 0;

        for (let i = 0; i < totalMonths; i++) {
          const monthIndex = i % startOfMonthData.length;
          const strategyValue = safeParseFloat(
            startOfMonthData[monthIndex].total_portfolio_nav
          );
          //console.log(strategyValue);

          const shares = investmentAmount / strategyValue;
          totalShares += shares;
        }

        const finalPrice =
          totalShares *
          safeParseFloat(data[data.length - 1].total_portfolio_nav);
        setFutureInvestmentValue(finalPrice);
      }
    } catch (error) {
      console.error("Error in calculation:", error);
      setFutureInvestmentValue(0);
    }
  };

  const handleInvestmentAmountChange = (e) => {
    setInvestmentAmount(parseInt(e.target.value));
  };

  const handleInvestmentFrequencyChange = (frequency) => {
    setInvestmentFrequency(frequency);
  };

  const handleInvestmentPeriodChange = (action) => {
    setInvestmentPeriod((prev) => {
      if (action === "increment") {
        return Math.min(prev + 1, maxInvestmentPeriod);
      } else {
        return Math.max(1, prev - 1);
      }
    });
  };

  function numberWithCommas(x) {
    return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatInvestmentPeriod = () => {
    switch (investmentFrequency) {
      case "monthly":
        return `₹${investmentAmount} every month for ${investmentPeriod} years`;
      case "one-time":
        return `₹${investmentAmount} ${investmentPeriod} years ago`;
      default:
        return `₹${investmentAmount} ${investmentPeriod} years ago`;
    }
  };

  const calculateTotalInvestment = () => {
    let periods = 0;
    if (investmentFrequency === "monthly") {
      periods = investmentPeriod * 12;
    } else if (investmentFrequency === "one-time") {
      periods = 1;
    }
    return investmentAmount * periods;
  };

  return (
    <>
      <Heading
        isItalic
        className="sm:text-semiheading text-mobileSemiHeading text-brown font-heading mb-2 sm:mb-2"
      >
        Returns Calculator
      </Heading>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:gap-4 justify-between items-center">
          <Text className="text-body sm:text-body mb-1 sm:mb-0 w-full sm:w-3/5">
            Investment Amount (₹)
          </Text>
          <input
            type="number"
            name="investmentamount"
            placeholder="1000"
            value={investmentAmount}
            onChange={handleInvestmentAmountChange}
            className="w-full h-2 py-2 px-2 border border-brown text-start"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <Text className="text-body sm:text-body mb-1 sm:mb-0 w-full sm:w-3/5">
            Investment Frequency
          </Text>
          <div className="flex flex-row justify-between space-x-2 w-full">
            {["Monthly", "One-time"].map((freq) => (
              <Button
                key={freq}
                className={`text-center md:text-sm xl:text-body flex-grow ${
                  investmentFrequency === freq.toLowerCase()
                    ? "bg-beige text-black"
                    : "bg-white border border-brown text-black"
                }`}
                onClick={() =>
                  handleInvestmentFrequencyChange(freq.toLowerCase())
                }
              >
                {freq}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <Text className="text-body sm:text-body mb-1 sm:mb-0 w-full sm:w-3/5">
            Investment Period (Years)
          </Text>
          <div className="flex flex-row w-full h-[53px] border border-brown overflow-hidden">
            <Button
              data-action="decrement"
              className="text-brown h-full w-1/4 cursor-pointer outline-none flex items-center justify-center"
              onClick={() => handleInvestmentPeriodChange("decrement")}
            >
              <span className="text-body">−</span>
            </Button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-1/2 bg-white hover:text-black focus:text-black text-body cursor-default flex items-center text-gray-700"
              name="custom-input-number"
              value={investmentPeriod}
              readOnly
            />
            <Button
              data-action="increment"
              className={`text-brown h-full w-1/4 cursor-pointer flex items-center justify-center ${
                investmentPeriod >= maxInvestmentPeriod
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleInvestmentPeriodChange("increment")}
              disabled={investmentPeriod >= maxInvestmentPeriod}
            >
              <span className="text-body">+</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 px-1 sm:px-2">
        <Text className="text-subheading text-brown text-mobileSubHeadingmt-2 font-subheading">
          ₹{numberWithCommas(futureInvestmentValue)}
        </Text>
        <Text className="text-body text-black">
          Invested: ₹{numberWithCommas(calculateTotalInvestment())}
        </Text>
      </div>
      <Text className="text-sm text-center sm:sm:mt-1 mt-3">
        Figures are based on historical returns and backtest.{" "}
        <br className="sm:visible hidden" /> They do not guarantee future
        results.*
      </Text>
    </>
  );
};

export default Calculator;
