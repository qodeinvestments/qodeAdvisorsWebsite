import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Heading from "./common/Heading";
import Text from "./common/Text";

const Calculator = ({ strategy }) => {
  const [startOfMonthData, setStartOfMonthData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(0);
  const [data, setData] = useState([]);
  // console.log(strategy);
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
        // console.log(jsonData);

        if (!strategyData) {
          console.error(`No data found for strategy: ${strategy}`);
          return;
        }

        setData(strategyData);
        // console.log("data", strategyData);

        if (strategyData && strategyData.length > 0) {
          const periodStartDate = new Date(
            strategyData[strategyData.length - 1].Date
          );
          // console.log(periodStartDate);
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
        // console.log("Future value:", futureValue);
        setFutureInvestmentValue(futureValue.toFixed(2));
      } else {
        // console.log("No exact match for investment date found in data.");
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
      <div className="py-8 ">
        <Heading level={1} className="md:text-heading font-bold mb-4 sm:mb-14">
          Returns Calculator
        </Heading>

        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row gap-20  justify-between items-center">
            <Text className="text-body sm:text-body mb-2 sm:mb-0 w-full ">
              Investment Amount (₹)
            </Text>
            <input
              type="number"
              name="investmentamount"
              placeholder="1000"
              value={investmentAmount}
              onChange={handleInvestmentAmountChange}
              className="w-full  h-12 py-2 px-2 border text-start"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-10  justify-between items-center">
            <Text className="text-body sm:text-body mb-2 sm:mb-0 w-full sm:w-3/5  ">
              Investment Frequency
            </Text>
            <div className="flex flex-row justify-between space-x-2 w-full  ">
              {["Monthly", "One-time"].map((freq) => (
                <button
                  key={freq}
                  className={`h-12 py-2 px-2 border text-center flex-grow ${
                    investmentFrequency === freq.toLowerCase()
                      ? "bg-beige text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() =>
                    handleInvestmentFrequencyChange(freq.toLowerCase())
                  }
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Text className="text-body sm:text-body mb-2 sm:mb-0 w-full sm:w-1/2">
              Investment Period (Years)
            </Text>
            <div className="w-2/3  h-12">
              <div className="flex flex-row h-full w-full relative bg-transparent border ">
                <button
                  data-action="decrement"
                  className="text-gray-600 h-full w-1/4 cursor-pointer outline-none"
                  onClick={() => handleInvestmentPeriodChange("decrement")}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-1/2 bg-white text-body hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700"
                  name="custom-input-number"
                  value={investmentPeriod}
                  readOnly
                />
                <button
                  data-action="increment"
                  className="text-gray-600 h-full w-1/4 cursor-pointer"
                  onClick={() => handleInvestmentPeriodChange("increment")}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20  px-3 sm:px-5   ">
          {/* <Text className="mb-3 text-base sm:text-body text-black">
            If you had invested {formatInvestmentPeriod()}, <br /> your
            investments would be worth
          </Text> */}
          <Text className="md:text-heading  mt-10  font-bold">
            ₹{numberWithCommas(futureInvestmentValue)}
          </Text>
          <Text className="text-body sm:text-body text-black  ">
            Total Amount Invested: ₹
            {numberWithCommas(calculateTotalInvestment())}
          </Text>
        </div>
      </div>
      <Text className="text-base  sm:text-body text-center my-8  sm:mt-4 ">
        Figures are based on historical returns and do not guarantee future
        results.*
      </Text>
    </>
  );
};

export default Calculator;
