import React from 'react';
import { Spinner } from "@material-tailwind/react";
import Text from "./common/Text";

const StressPeriodTable = ({
  data,
  strategy,
  benchmark = "nifty_50",
  isLoading,
  error
}) => {
  const stressPeriods = [
    {
      id: 1,
      startDate: "2020-02-01",
      endDate: "2020-03-31",
      label: {
        start: "Feb, 2020",
        end: "Mar, 2020"
      }
    },
    {
      id: 2,
      startDate: "2010-11-01",
      endDate: "2011-12-31",
      label: {
        start: "Nov, 2010",
        end: "Dec, 2011"
      }
    },
    {
      id: 3,
      startDate: "2015-02-01",
      endDate: "2016-02-29",
      label: {
        start: "Feb, 2015",
        end: "Feb, 2016"
      }
    },
    {
      id: 4,
      startDate: "2021-10-01",
      endDate: "2022-06-30",
      label: {
        start: "Oct, 2021",
        end: "Jun, 2022"
      }
    }
  ];

  /**
   * Calculate drawdown for a specific period and key.
   */
  const calculatePeriodDrawdown = (startDate, endDate, key) => {
    if (!data || data.length === 0) return 0;
  
    const filteredData = data.filter(item => {
      const date = new Date(item.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  
    if (filteredData.length === 0) return 0;
  
    let peak = parseFloat(filteredData[0][key]) || 0;
    let maxDrawdown = 0;
  
    for (const item of filteredData) {
      const value = parseFloat(item[key]) || 0;
      if (value > peak) {
        peak = value; // Update peak if current value is higher
      }
      const drawdown = peak > 0 ? ((value - peak) / peak) * 100 : 0;
      maxDrawdown = Math.min(maxDrawdown, drawdown); // Track maximum (negative) drawdown
    }
  
    return maxDrawdown.toFixed(2); // Return drawdown as a negative percentage with two decimal places
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

  return (
    <div className="overflow-x-auto mt-5">
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th className="sticky border border-brown border-r-0 left-0 z-10 p-18 font-semibold text-end text-black bg-lightBeige">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                Sr. No.
              </th>
              <th className="relative p-18 font-semibold text-right text-black border-t border-b border-brown">
                <div className="absolute inset-y-0 right-0 bg-brown" />
                Start Date
              </th>
              <th className="relative p-18 font-semibold text-right text-black border-t border-b border-brown">
                <div className="absolute inset-y-0 right-0 bg-brown" />
                End Date
              </th>
              <th className="relative p-18 font-semibold text-right text-black border-t border-b border-brown">
                <div className="absolute inset-y-0 right-0 bg-brown" />
                Nifty 50 (%)
              </th>
              <th className="p-18 text-right font-body border-l text-black border border-brown">
                QAW (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {stressPeriods.map((period) => {
              const benchmarkDrawdown = calculatePeriodDrawdown(period.startDate, period.endDate, benchmark);
              const strategyDrawdown = calculatePeriodDrawdown(period.startDate, period.endDate, strategy);

              return (
                <tr key={period.id} className="text-black text-end border-b border-brown">
                  <td className="sticky border border-brown border-r-0 w-24 text-nowrap left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                    <span className="break-word-mobile">
                      {period.id}
                    </span>
                  </td>
                  <td className="relative p-18 text-black text-right font-body text-sm sm:text-body border-b border-brown">
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {period.label.start}
                  </td>
                  <td className="relative p-18 text-black text-right font-body text-sm sm:text-body border-b border-brown">
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {period.label.end}
                  </td>
                  <td className="relative p-18 text-black text-right font-body text-sm sm:text-body border-b border-brown">
                    <div className="absolute inset-y-0 right-0 bg-brown" />
                    {benchmarkDrawdown}%
                  </td>
                  <td className="p-18 text-right border-l text-black border border-brown">
                    {strategyDrawdown}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StressPeriodTable;
