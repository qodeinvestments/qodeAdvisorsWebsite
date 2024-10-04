import React, { useState, useEffect } from "react";
import Heading from "./common/Heading";
import Text from "./common/Text";

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
    YTD: {},
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
  }, [data]);

  const calculateReturns = (data) => {
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const latestDate = new Date(sortedData[sortedData.length - 1].date);

    const periods = {
      "10D": 10,
      "1W": 7,
      "1M": 30,
      "3M": 91,
      "6M": 182,
      "1Y": 365,
      "3Y": 3 * 365,
      "5Y": 5 * 365,
      YTD: Math.floor(
        (latestDate - new Date(latestDate.getFullYear(), 0, 1)) /
          (1000 * 60 * 60 * 24)
      ),
    };

    const calculatedReturns = {};

    for (const [period, days] of Object.entries(periods)) {
      const startIndex = sortedData.findIndex((item) => {
        const itemDate = new Date(item.date);
        const diffDays = (latestDate - itemDate) / (1000 * 60 * 60 * 24);
        return diffDays <= days;
      });

      if (startIndex !== -1) {
        const startValues = sortedData[startIndex];
        const endValues = sortedData[sortedData.length - 1];

        calculatedReturns[period] = {
          [strategy]: calculateReturn(
            parseFloat(startValues.total_portfolio_nav),
            parseFloat(endValues.total_portfolio_nav),
            period
          ),
          [startValues.benchmark]: calculateReturn(
            parseFloat(startValues.benchmark_values),
            parseFloat(endValues.benchmark_values),
            period
          ),
        };
      }
    }

    setReturns(calculatedReturns);
  };

  const calculateReturn = (startValue, endValue, period) => {
    if (period === "3Y" || period === "5Y") {
      const timeRange = period === "3Y" ? 3 : 5;
      return (Math.pow(endValue / startValue, 1 / timeRange) - 1) * 100;
    } else {
      return ((endValue - startValue) / startValue) * 100;
    }
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const benchmark = data[0]?.benchmark || "Default Benchmark";

  const strategies = [strategy, benchmark];
  const periods = ["10D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD"];

  return (
    <div className="overflow-x-auto sm:p-4 p-1">
      <Heading
        isItalic
        className="sm:text-subheading text-mobileSubHeading font-subheading text-brown mb-18"
      >
        Trailing Returns
      </Heading>
      <Text className="text-body font-body text-black mb-4">
        Trailing returns are annualised returns from the specified period till
        today.
      </Text>
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black border-l md:border-none border-brown">
        <div className="w-full min-w-[640px]">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="text-body font-body">
                <th className="sticky left-0 z-10 p-1 font-body text-start text-body  text-black sm:bg-white bg-lightBeige border border-brown border-l-0 sm:border-l w-32">
                  Strategy
                </th>
                {periods.map((period) => (
                  <th
                    key={period}
                    className="p-2 font-body text-center text-body text-black border border-brown w-24"
                  >
                    {period}
                  </th>
                ))}
                <th className="p-1 text-center font-body text-body text-black border border-brown w-20">
                  DD
                </th>
                <th className="p-1 text-center font-body text-body text-black border border-brown w-20">
                  MDD
                </th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strat) => (
                <tr key={strat} className="text-black text-center">
                  <td className="sticky left-0 z-10 p-1 sm:bg-white bg-lightBeige border border-brown border-l-0 sm:border-l text-start w-32">
                    {strat}
                  </td>
                  {periods.map((period) => (
                    <td
                      key={period}
                      className="p-1 text-black border border-brown w-24"
                    >
                      {returns[period] && returns[period][strat]
                        ? `${returns[period][strat].toFixed(1)}%`
                        : "0%"}
                    </td>
                  ))}
                  <td className="p-1 text-center text-black border border-brown w-20">
                    {drawdowns.latest[strat]
                      ? `${drawdowns.latest[strat].toFixed(1)}%`
                      : "0%"}
                  </td>
                  <td className="p-1 text-center text-black border border-brown w-20">
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

      <Text className="text-beige text-body font-body mt-1">
        *MDD(Maximum Drawdown) is how much money an investment loses from its
        highest point to its lowest point before it starts going up again.
      </Text>
    </div>
  );
};

export default TrailingReturns;
