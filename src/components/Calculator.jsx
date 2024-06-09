import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const Calculator = () => {
  const [startOfMonthData, setStartOfMonthData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [futureInvestmentValue, setFutureInvestmentValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
  
        // Calculate the date from investmentPeriod years ago from today
        const periodStartDate = new Date();
        periodStartDate.setFullYear(periodStartDate.getFullYear() - investmentPeriod);
  
        const filteredData = jsonData.Sheet1.filter((entry) => {
          const date = new Date(entry.Date);
  
          // Ensure the date is valid, is the first of the month, and falls within the investment period
          return !isNaN(date.getTime()) && date.getDate() === 1 && date >= periodStartDate;
        });
  
        console.log(filteredData);  // Log the filtered data to the console
        setStartOfMonthData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [investmentPeriod]); // Add investmentPeriod to the dependency array
  

  useEffect(() => {
    if (startOfMonthData.length > 0) {
        calculatePresentInvestmentValue();
    }
  }, [investmentAmount, investmentFrequency, investmentPeriod, startOfMonthData]);

  const calculatePresentInvestmentValue = () => {
    console.log(investmentPeriod)
    const months = investmentFrequency === "monthly" ? investmentPeriod * 12 : investmentPeriod;
    // console.log(months)
    let totalInvestmentValue = 0;
  
    for (let i = 0; i < months && i < startOfMonthData.length; i++) {
        console.log(startOfMonthData)
      const volAdjustedMomentum = startOfMonthData[i]["Vol Adjusted Momentum"];
      console.log("monthly data",volAdjustedMomentum)
      const shares = investmentAmount / volAdjustedMomentum;
      console.log("shares",shares)
      const investmentValue = shares * volAdjustedMomentum;
      totalInvestmentValue += investmentValue; // This line calculates the current value of the investment made each month or year.
    console.log(totalInvestmentValue);
    }  
    setFutureInvestmentValue(totalInvestmentValue.toFixed(2));
  };
  

  const handleInvestmentAmountChange = (e) => {
    setInvestmentAmount(parseInt(e.target.value));
  };

  const handleInvestmentFrequencyChange = (frequency) => {
    setInvestmentFrequency(frequency);
  };

  const handleInvestmentPeriodChange = (action) => {
    setInvestmentPeriod(prev => action === "increment" ? prev + 1 : Math.max(1, prev - 1));
  };

  return (
    <div className="w-full md:w-1/4 lg:w-2/6 flex flex-col space-y-7 border bg-white rounded-md p-4">
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
      <div className="text-center px-10 py-3 border">
        <FontAwesomeIcon icon={faChartLine} />
        <p className="mb-3">
          Projected future value of your investments based on historical
          performance:
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
  );
};

export default Calculator;
