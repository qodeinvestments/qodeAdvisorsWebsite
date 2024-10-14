import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import useCalculateCagr from "./hooks/useCalculateCagr";
import { Spinner } from "@material-tailwind/react";

const TrailingReturns = ({ strategy, isLoading, error, data, name }) => {
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
    All: {}, // Changed from All to "All"
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
      All: "ALL", // Changed display text while keeping calculation logic
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
  const periods = ["1Y", "3Y", "5Y", "All"]; // Updated display text

  const ResponsiveTable = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[640px] relative">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th className="sticky border border-brown border-r-0 left-0 z-10 p-18 font-semibold text-start text-black bg-lightBeige">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                Strategy
              </th>
              {periods.map((period) => (
                <th
                  key={period}
                  className="relative p-18 font-semibold text-start text-black border-t border-b border-brown"
                >
                  <div className="absolute inset-y-0 right-0  bg-brown" />
                  {period}
                </th>
              ))}
              <th className="p-18 text-start font-body border-l text-black border border-brown">
                MDD
              </th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strat, index) => (
              <tr key={strat} className="text-black text-start">
                <td className="sticky border border-brown border-r-0 left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                  {strat === strategy ? name : strat}
                </td>
                {periods.map((period) => (
                  <td
                    key={period}
                    className={`relative p-18 text-black font-body text-sm sm:text-body ${
                      index === strategies.length - 1
                        ? "border border-l-0 border-r-0 border-brown"
                        : ""
                    }`}
                  >
                    <div className="absolute  inset-y-0 right-0  bg-brown" />
                    {returns[period] && returns[period][strat]
                      ? `${parseFloat(returns[period][strat]).toFixed(1)}%`
                      : "N/A"}
                  </td>
                ))}
                <td
                  className={`p-18 text-start border-l text-black border border-brown ${
                    index === strategies.length - 1 ? "border-b" : ""
                  }`}
                >
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
  );

  return (
    <div className="p-18 sm:p-18">
      <Heading
        isItalic
        className="text-mobileSubHeading sm:text-subheading font-subheading text-brown mb-18"
      >
        Trailing Returns
      </Heading>
      <Text className="text-sm sm:text-body font-body text-black mb-4">
        Trailing returns are annualised returns from the specified period till
        today.
      </Text>
      <ResponsiveTable />
      <Text className="text-beige text-sm sm:text-body font-body mt-4">
        MDD (Maximum Drawdown) is the percentage an investment loses from its
        highest point to its lowest point.
      </Text>
    </div>
  );
};

export default TrailingReturns;
