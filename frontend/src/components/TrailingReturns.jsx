import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";
import useCalculateCagr from "./hooks/useCalculateCagr";
import { Spinner } from "@material-tailwind/react";

const TrailingReturns = ({
  /** Required props **/
  data,
  strategy,         // e.g. "qaw"
  name,             // e.g. "Qode All Weather"
  /** Optional props for dynamic usage **/
  benchmark = "nifty_50", // default benchmark if none provided
  benchmarkName = "Nifty 50", // Display name for benchmark
  startDates,
  endDates,

  /** Loading & Error states **/
  isLoading,
  error,
}) => {
  const { calculateCAGR } = useCalculateCagr();
  const [returns, setReturns] = useState({
    "10D": {},
    "1W": {},
    "1M": {},
    "3M": {},
    "6M": {},
    "1Y": {},
    "3Y": {},
    "5Y": {},
    Inception: {},
  });
  const [drawdowns, setDrawdowns] = useState({
    latest: {},
    lowest: {},
  });

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
      Inception: "Inception",
    };

    const calculatedReturns = {};

    // Calculate for 1Y, 3Y, 5Y, Inception using your `calculateCAGR` hook
    for (const [period, cagrPeriod] of Object.entries(periods)) {
      calculatedReturns[period] = {
        [strategy]: calculateCAGR(data, cagrPeriod, strategy),
        [benchmark]: calculateCAGR(data, cagrPeriod, benchmark),
      };
    }

    // Handle custom shorter periods (10D, 1W)
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const latestDate = new Date(sortedData[sortedData.length - 1].date);

    ["10D", "1W"].forEach((period) => {
      const days = period === "10D" ? 10 : 7;
      const startDate = new Date(latestDate.getTime() - days * 24 * 60 * 60 * 1000);
      const filteredData = sortedData.filter(
        (item) => new Date(item.date) >= startDate
      );

      calculatedReturns[period] = {
        [strategy]: calculateCAGR(filteredData, "Custom", strategy),
        [benchmark]: calculateCAGR(filteredData, "Custom", benchmark),
      };
    });

    setReturns(calculatedReturns);
  };

  const calculateDrawdowns = (data) => {
    const strategies = [strategy, benchmark];
    const calculatedDrawdowns = {
      latest: {},
      lowest: {},
    };

    strategies.forEach((strat) => {
      const values = data.map((item) => parseFloat(item[strat]) || 0);

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

  if (isLoading) {
    return (
      <div className="text-start flex justify-center items-center">
        <Spinner className="text-brown" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Example periods to display
  const periods = ["1Y", "3Y", "5Y", "Inception"];

  const getDisplayName = (stratKey) => {
    if (stratKey === strategy) return name;
    if (stratKey === benchmark) return benchmarkName;
    return stratKey;
  };

  const ResponsiveTable = () => (
    <div className="overflow-x-auto">
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black">
        <table className="w-full min-w-[640px] border-collapse">
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
                  <div className="absolute inset-y-0 right-0 bg-brown" />
                  {period}
                </th>
              ))}
              <th className="p-18 text-center font-body border-l text-black border border-brown">
                MDD
              </th>
            </tr>
          </thead>
          <tbody>
            {[strategy, benchmark].map((strat) => (
              <tr key={strat} className="text-black text-start border-b border-brown">
                <td className="sticky border border-brown border-r-0 w-44 text-nowrap left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                  <span className="break-word-mobile">
                    {getDisplayName(strat)}
                  </span>
                </td>
                {periods.map((period) => (
                  <td
                    key={period}
                    className="relative p-18 text-black text-center font-body text-sm sm:text-body border-b border-brown"
                  >
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {returns[period] && returns[period][strat]
                      ? `${parseFloat(returns[period][strat]).toFixed(2)}%`
                      : "0.00%"}
                  </td>
                ))}
                <td className="p-18 text-center border-l text-black border border-brown">
                  {drawdowns.lowest[strat]
                    ? `${drawdowns.lowest[strat].toFixed(2)}%`
                    : "0.00%"}
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
      <div className="flex justify-between flex-col sm:flex-row">
        <Text className="text-xs text-right sm:text-xs font-body mb-18 text-brown italic">
          *Data from {startDates} to {endDates}
        </Text>
      </div>

      <ResponsiveTable />

      <Text className="text-beige text-sm sm:text-body font-body mt-2 sm:mt-18">
        MDD (Maximum Drawdown) refers to the maximum loss an investment can
        incur from its highest point.
      </Text>
    </>
  );
};

export default TrailingReturns;