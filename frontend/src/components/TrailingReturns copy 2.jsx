import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import Text from "../../common/Text";
import useCalculateCagr from "../../hooks/useCalculateCagr";
import useFetchStrategyNavField from "../../../hooks/useFetchStrategyNavData";

const TrailingReturns = () => {
  const strategy = "qaw"; // Define strategy key
  const { data, isLoading, error } = useFetchStrategyNavField('qaw');
  const memoizedData = React.useMemo(() => data, [data]);
  
  const benchmarkField = "nifty_50";
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

  const { calculateCAGR } = useCalculateCagr();

  // Dummy date range extraction logic
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract date range (example logic)
      const dates = data.map(item => new Date(item.date));
      setStartDate(new Date(Math.min(...dates)).toLocaleDateString());
      setEndDate(new Date(Math.max(...dates)).toLocaleDateString());

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

    for (const [period, cagrPeriod] of Object.entries(periods)) {
      calculatedReturns[period] = {
        [strategy]: calculateCAGR(data, cagrPeriod, strategy),
        [benchmarkField]: calculateCAGR(data, cagrPeriod, benchmarkField),
      };
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const latestDate = new Date(sortedData[sortedData.length - 1].date);

    ["10D", "1W"].forEach((period) => {
      const days = period === "10D" ? 10 : 7;
      const startDate = new Date(latestDate.getTime() - days * 24 * 60 * 60 * 1000);
      const filteredData = sortedData.filter(item => new Date(item.date) >= startDate);

      calculatedReturns[period] = {
        [strategy]: calculateCAGR(filteredData, "Custom", strategy),
        [benchmarkField]: calculateCAGR(filteredData, "Custom", benchmarkField),
      };
    });

    setReturns(calculatedReturns);
  };

  const calculateDrawdowns = (data) => {
    const strategies = [strategy, benchmarkField];
    const calculatedDrawdowns = { latest: {}, lowest: {} };

    strategies.forEach((strat) => {
      const values = data.map(item => parseFloat(item[strat]) || 0);
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

  if (isLoading)
    return (
      <div className="text-start flex justify-center items-center">
        <Spinner className="text-brown" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const strategies = [strategy, benchmarkField];
  const periods = ["1Y", "3Y", "5Y", "Inception"];

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
            {strategies.map((strat) => (
              <tr key={strat} className="text-black text-start border-b border-brown">
                <td className="sticky border border-brown border-r-0 w-44 text-nowrap left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                  <span className="break-word-mobile">
                    {strat === strategy ? "Qode All Weather" : strat}
                  </span>
                </td>
                {periods.map((period) => (
                  <td
                    key={period}
                    className="relative p-18 text-black text-center font-body text-sm sm:text-body border-b border-brown"
                  >
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {returns[period] && returns[period][strat]
                      ? `${parseFloat(returns[period][strat]).toFixed(1)}%`
                      : "0%"}
                  </td>
                ))}
                <td className="p-18 text-center border-l text-black border border-brown">
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
      <div className="flex justify-between flex-col sm:flex-row">
        <Text className="text-sm sm:text-body font-body text-black mb-18">
          Returns as of {endDate}.
        </Text>
        <Text className="text-xs text-right sm:text-xs font-body mb-18 text-brown italic">
          *Data from {startDate} to {endDate}.
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
