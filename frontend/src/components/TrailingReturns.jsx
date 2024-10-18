import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import useCalculateCagr from "./hooks/useCalculateCagr";
import { Spinner } from "@material-tailwind/react";

const TrailingReturns = ({
  strategy,
  isLoading,
  error,
  data,
  name,
  startDates,
  endDates,
}) => {
  console.log(name);

  const [returns, setReturns] = useState({
    "10D": {},
    "1W": {},
    "1M": {},
    "3M": {},
    "6M": {},
    "1Y": {},
    "3Y": {},
    "5Y": {},
    Inception: {}, // Changed from All to "All"
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
      Inception: "Inception", // Changed display text while keeping calculation logic
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
  const periods = ["1Y", "3Y", "5Y", "Inception"]; // Updated display text

  const ResponsiveTable = () => (
    <div className="overflow-x-auto">
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th className="sticky border border-brown border-r-0 left-0 z-10 p-18 font-semibold text-start text-black bg-lightBeige">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                Strategy
              </th>
              {periods.map((period) => (
                <th
                  key={period}
                  className="relative p-18 font-semibold text-center text-black border-t border-b border-brown"
                >
                  <div className="absolute inset-y-0 right-0  bg-brown" />
                  {period}
                </th>
              ))}
              <th className="p-18 text-center font-body border-l text-black border border-brown">
                MDD
              </th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strat, index) => (
              <tr key={strat} className="text-black text-start">
                <td className="sticky border border-brown w-44 border-r-0 text-nowrap left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                  <span className="break-word-mobile">
                    {strat === strategy ? name : strat}
                  </span>
                </td>
                {periods.map((period) => (
                  <td
                    key={period}
                    className={`relative p-18 text-black text-center font-body text-sm sm:text-body ${
                      index === strategies.length - 1
                        ? "border border-l-0 border-r-0 border-brown"
                        : ""
                    }`}
                  >
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {returns[period] && returns[period][strat]
                      ? `${parseFloat(returns[period][strat]).toFixed(1)}%`
                      : "0%"}
                  </td>
                ))}
                <td
                  className={`p-18 text-center border-l text-black border border-brown ${
                    index === strategies.length - 1 ? "border-b" : ""
                  }`}
                >
                  {drawdowns.lowest[strat]
                    ? `${drawdowns.lowest[strat].toFixed(1)}%`
                    : "0%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <Heading
        isItalic
        className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
      >
        Trailing Returns
      </Heading>
      <div className="flex justify-between flex-col sm:flex-row">
        <Text className="text-sm sm:text-body font-body text-black mb-18">
          Trailing returns indicate an investment's performance over a fixed
          past period, ending at a specific date.
        </Text>

        <Text className="text-xs text-right sm:text-xs font-body mb-18 text-brown italic ">
          *Data from {startDates} to {endDates}.
        </Text>
      </div>
      <ResponsiveTable />
      <Text className="text-beige text-sm sm:text-body font-body mt-2 sm:mt-18  ">
        MDD (Maximum Drawdown) is the percentage an investment loses from its
        highest point to its lowest point.
      </Text>
    </>
  );
};

export default TrailingReturns;
