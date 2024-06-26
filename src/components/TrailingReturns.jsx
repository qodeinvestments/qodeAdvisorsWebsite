import React, { useState, useEffect } from "react";

const TrailingReturns = () => {
  const [returns, setReturns] = useState({
    "10D": {},
    "1W": {},
    "1M": {},
    "3M": {},
    "6M": {},
    "1Y": {},
    "3Y": {},
    "5Y": {},
    YTD: {},
  });

  useEffect(() => {
    fetchData();
  }, []);

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

      calculateReturns(jsonData.Sheet1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateReturns = (data) => {
    const sortedData = data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    const latestDate = new Date(sortedData[sortedData.length - 1].Date);

    const periods = {
      "10D": 10,
      "1W": 7,
      "1M": 30,
      "3M": 91,
      "6M": 182,
      "1Y": 365,
      "3Y": 3 * 365,
      "5Y": 5 * 365,
      YTD:
        latestDate.getFullYear() === new Date().getFullYear()
          ? (latestDate - new Date(latestDate.getFullYear(), 0, 1)) /
            (1000 * 60 * 60 * 24)
          : (new Date(latestDate.getFullYear(), 11, 31) -
              new Date(latestDate.getFullYear(), 0, 1)) /
            (1000 * 60 * 60 * 24),
    };

    const calculatedReturns = {};

    for (const [period, days] of Object.entries(periods)) {
      const startIndex = sortedData.findIndex((item) => {
        const itemDate = new Date(item.Date);
        const diffDays = (latestDate - itemDate) / (1000 * 60 * 60 * 24);
        return diffDays <= days;
      });

      if (startIndex !== -1) {
        const startValues = sortedData[startIndex];
        const endValues = sortedData[sortedData.length - 1];

        calculatedReturns[period] = {
          "Vol Adjusted Momentum": calculateReturn(
            startValues["Vol Adjusted Momentum"],
            endValues["Vol Adjusted Momentum"]
          ),
          "Nifty 50": calculateReturn(
            startValues["Nifty 50"],
            endValues["Nifty 50"]
          ),
        };
      }
    }

    setReturns(calculatedReturns);
  };

  const calculateReturn = (startValue, endValue) => {
    return ((endValue - startValue) / startValue) * 100;
  };

  const strategies = ["Vol Adjusted Momentum", "Nifty 50"];
  const periods = ["10D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD"];

  return (
    <div className="mt-5 rounded-2xl ">
      <h2 className="text-3xl font-bold text-[#151E28] my-3">
        Trailing Returns
      </h2>
      <table
        className=" border-b-[1px] border-black/10"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            {periods.map((period) => (
              <th key={period} style={tableHeaderStyle}>
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy) => (
            <tr className="border-b-[1px] border-black/10" key={strategy}>
              <td style={tableCellStyle}>{strategy}</td>
              {periods.map((period) => (
                <td key={period} style={tableCellStyle}>
                  {returns[period][strategy]
                    ? `${returns[period][strategy].toFixed(2)}%`
                    : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  textAlign: "left",
};

const tableCellStyle = {
  //   border: "1px solid #ddd",
  padding: "8px",
};

export default TrailingReturns;
