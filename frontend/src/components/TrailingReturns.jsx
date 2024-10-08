import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import useCalculateCagr from "./hooks/useCalculateCagr";
import { Spinner } from "@material-tailwind/react";

const TrailingReturns = ({ strategy, isLoading, error, data }) => {
  const [returns, setReturns] = useState({
    "10D": {},
    "1W": {},
    "1M": {},
    "3M": {},
    "6M": {},
    "1Y": {},
    "3Y": {},
    "5Y": {},
    "Since Inception": {}, // Changed from All to "Since Inception"
  });
  const [drawdowns, setDrawdowns] = useState({
    latest: {},
    lowest: {},
  });

  const { calculateCAGR } = useCalculateCagr();

  useEffect(() => {
    if (data && data.length > 0) {
      calculateReturns(data);
      calculateDrawdowns(data);
    }
  }, [data, calculateCAGR]);

  const calculateReturns = (data) => {
    const periods = {
      "1Y": "1Y",
      "3Y": "3Y",
      "5Y": "5Y",
      "Since Inception": "ALL", // Changed display text while keeping calculation logic
    };

    const calculatedReturns = {};

    for (const [period, cagrPeriod] of Object.entries(periods)) {
      calculatedReturns[period] = {
        [strategy]: calculateCAGR(data, cagrPeriod, "total_portfolio_nav"),
        [data[0].benchmark]: calculateCAGR(
          data,
          cagrPeriod,
          "benchmark_values"
        ),
      };
    }

    // Handle custom periods (10D and 1W)
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const latestDate = new Date(sortedData[sortedData.length - 1].date);

    ["10D", "1W"].forEach((period) => {
      const days = period === "10D" ? 10 : 7;
      const startDate = new Date(
        latestDate.getTime() - days * 24 * 60 * 60 * 1000
      );
      const filteredData = sortedData.filter(
        (item) => new Date(item.date) >= startDate
      );

      calculatedReturns[period] = {
        [strategy]: calculateCAGR(
          filteredData,
          "Custom",
          "total_portfolio_nav"
        ),
        [data[0].benchmark]: calculateCAGR(
          filteredData,
          "Custom",
          "benchmark_values"
        ),
      };
    });

    setReturns(calculatedReturns);
  };
  const calculateDrawdowns = (data) => {
    const benchmark = data[0]?.benchmark || "Default Benchmark";
    const strategies = [strategy, benchmark];
    const calculatedDrawdowns = {
      latest: {},
      lowest: {},
    };

    strategies.forEach((strat) => {
      const values = data.map((item) =>
        parseFloat(
          strat === strategy ? item.total_portfolio_nav : item.benchmark_values
        )
      );

      let peaks = [values[0]];
      let drawdowns = [0];

      for (let i = 1; i < values.length; i++) {
        peaks[i] = Math.max(peaks[i - 1], values[i]);
        drawdowns[i] = ((values[i] - peaks[i]) / peaks[i]) * 100;
      }

      calculatedDrawdowns.latest[strat] = drawdowns[drawdowns.length - 1];
      calculatedDrawdowns.lowest[strat] = Math.min(...drawdowns);
    });

    setDrawdowns(calculatedDrawdowns);
  };
  // Rest of the component remains the same until the return statement

  if (isLoading)
    return (
      <div className="text-start flex justify-center items-center">
        <Spinner className="text-brown" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const benchmark = data[0]?.benchmark || "Default Benchmark";
  const strategies = [strategy, benchmark];
  const periods = ["1Y", "3Y", "5Y", "Since Inception"]; // Updated display text

  return (
    <div className="overflow-x-auto sm:p-4 p-18">
      <Heading
        isItalic
        className="sm:text-subheading text-mobileSubHeading font-subheading text-brown mb-18"
      >
        Trailing Returns
      </Heading>
      <Text className="sm:text-body text-sm font-body text-black mb-4">
        Trailing returns are annualised returns from the specified period till
        today. "Since Inception" represents returns since the strategy began.
      </Text>
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black border-l md:border-none border-brown">
        <div className="sm:w-full min-sm:w-[640px]">
          <table className="sm:w-full border-collapse table-fixed">
            <thead>
              <tr className="sm:text-body text-sm font-body">
                <th className="sticky left-0 z-10  p-18 font-body text-start sm:text-body text-sm text-black sm:bg-white bg-lightBeige border border-brown border-l-0 sm:border-l ">
                  Strategy
                </th>
                {periods.map((period) => (
                  <th
                    key={period}
                    className="p-18 font-body text-start sm:text-body text-sm text-black border border-brown "
                  >
                    {period}
                  </th>
                ))}
                <th className=" p-18 text-start font-body sm:text-body text-sm text-black border border-brown ">
                  DD
                </th>
                <th className=" p-18 text-start font-body sm:text-body text-sm text-black border border-brown ">
                  MDD
                </th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strat) => (
                <tr key={strat} className="text-black text-start">
                  <td className="sticky left-0 z-10  p-18 font-body sm:text-body text-sm sm:bg-white bg-lightBeige border border-brown border-l-0 sm:border-l text-start ">
                    {strat}
                  </td>
                  {periods.map((period) => (
                    <td
                      key={period}
                      className=" p-18 text-black border font-body sm:text-body text-sm border-brown "
                    >
                      {returns[period] && returns[period][strat]
                        ? returns[period][strat]
                        : "N/A"}
                    </td>
                  ))}
                  <td className=" p-18 text-start font-body sm:text-body text-sm text-black border border-brown ">
                    {drawdowns.latest[strat]
                      ? `${drawdowns.latest[strat].toFixed(1)}%`
                      : "N/A"}
                  </td>
                  <td className=" p-18 text-start text-black border border-brown ">
                    {drawdowns.lowest[strat]
                      ? `${drawdowns.lowest[strat].toFixed(1)}%`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Text className="text-beige sm:text-body text-sm font-body mt-1">
        *MDD(Maximum Drawdown) is how much money an investment loses from its
        highest point to its lowest point before it starts going up again.
      </Text>
    </div>
  );
};

export default TrailingReturns;
