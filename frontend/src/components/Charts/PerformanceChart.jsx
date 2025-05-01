import React, { useState, useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Tabs, TabsBody, TabPanel, Spinner } from "@material-tailwind/react";
import Button from "../common/Button";
import Text from "../common/Text";
import useCustomTimeRange from "../hooks/useCustomTimeRange";
import useMobileWidth from "../hooks/useMobileWidth";
import useChartData from "../hooks/useChartOptions";
import useCalculateCagr from "../hooks/useCalculateCagr";
import filterDataByCustomRange from "../utils/filterDataByTimeRange";
import accessibility from "highcharts/modules/accessibility";
import boost from "highcharts/modules/boost";

accessibility(Highcharts);
boost(Highcharts);

// Utility function to format date as DD/MM/YYYY
const formatDateToUK = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const PerformanceChart = ({ data, strategy, blogUrl, error, isLoading, name }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const customDateRef = useRef(null);
  const customButtonRef = useRef(null);

  // Determine the latest end date from data
  const endDate = useMemo(() => {
    if (data && data.length > 0) {
      const dates = data
        .map((item) => new Date(item.date))
        .filter((date) => !isNaN(date.getTime()));
      if (dates.length > 0) {
        const latestDate = new Date(Math.max(...dates));
        return latestDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      }
    }
    return "2025-04-30"; // Fallback
  }, [data]);

  const {
    timeRange,
    startDate,
    activeButton,
    isCustomDateOpen,
    setCustomDateRange,
    handleCustomDateClick,
    handleTimeRangeChange,
  } = useCustomTimeRange();

  const { isMobile } = useMobileWidth();
  const { chartOptions, prepareChartData, updateChartOptions } = useChartData(strategy, isMobile, name);
  const { calculateCAGR } = useCalculateCagr();

  if (error) {
    console.error("Chart error:", error);
    return <div className="text-red-500 text-center">Error loading chart: {error.message}</div>;
  }

  // Filter data using dynamic end date
  const filterData = useMemo(() => {
    if (!isLoading && data && data.length > 0) {
      try {
        const filteredData = filterDataByCustomRange(data, timeRange, startDate, endDate, endDate);
        return filteredData;
      } catch (err) {
        console.error("Error filtering data:", err);
        return [];
      }
    }
    return [];
  }, [data, isLoading, timeRange, startDate, endDate]);

  useEffect(() => {
    if (filterData.length > 0) {
      setLoading(true);
      try {
        const chartData = prepareChartData(filterData);
        updateChartOptions(chartData);
        setFilteredData(filterData);
      } catch (err) {
        console.error("Error preparing chart data:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [filterData, prepareChartData, updateChartOptions]);

  useEffect(() => {
    if (isCustomDateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCustomDateOpen]);

  const strategyCagr = useMemo(() => {
    try {
      return calculateCAGR(filteredData, timeRange, strategy);
    } catch (err) {
      console.error("Error calculating CAGR:", err);
      return 0;
    }
  }, [calculateCAGR, filteredData, timeRange, strategy]);

  const renderDateRangeButtons = () => {
    const ranges = ["1M", "6M", "1Y", "3Y", "5Y", "Inception"];
    return (
      <>
        {ranges.map((range) => (
          <Button
            key={range}
            onClick={() => handleTimeRangeChange(range)}
            className={`text-xs ${
              activeButton === range
                ? "bg-beige text-black"
                : "bg-white border border-brown text-black"
            }`}
          >
            {range}
          </Button>
        ))}
        <div className="relative" ref={customButtonRef}>
          <Button
            onClick={handleCustomDateClick}
            className={`text-xs ${
              activeButton === "Custom"
                ? "bg-beige border-none text-black"
                : "bg-white border border-brown text-black"
            }`}
          >
            Custom
          </Button>
          {isCustomDateOpen && (
            <div
              ref={customDateRef}
              className="fixed left-1/2 transform -translate-x-1/2 mt-18 p-2 sm:p-4 bg-white shadow-lg z-50"
              style={{
                top: `${customButtonRef.current?.getBoundingClientRect().bottom}px`,
                minWidth: "280px",
                maxWidth: "90vw",
              }}
            >
              <div className="flex flex-col gap-1 lg:flex-row sm:gap-4">
                <div className="w-full">
                  <label
                    htmlFor="start-date"
                    className="block text-sm font-medium text-brown"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate || ""}
                    onChange={(e) => {
                      const newStartDate = e.target.value;
                      setCustomDateRange(newStartDate, endDate);
                    }}
                    className="mt-1 block w-full border border-brown shadow-sm p-18"
                    aria-label="Start Date"
                    aria-required="true"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="end-date"
                    className="block text-sm font-medium text-brown"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    disabled
                    className="mt-1 block w-full border border-brown shadow-sm p-18 bg-gray-100"
                    aria-label="End Date"
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full">
        <Tabs value="chart1">
          <div className="flex justify-between flex-col lg:flex-row items-center">
            <div className="flex flex-wrap justify-center items-center gap-18">
              {renderDateRangeButtons()}
            </div>
            <div className="text-center sm:text-right mt-3 sm:mt-0">
              <Text className="sm:text-semiheading text-semiheading font-subheading text-beige">
                {parseFloat(strategyCagr).toFixed(1)}%
                <span className="text-body ml-1 text-black">
                  {["1Y", "1M", "6M"].includes(timeRange)
                    ? timeRange + " return"
                    : timeRange + " CAGR"}
                </span>
              </Text>
            </div>
          </div>
          <TabsBody className="mt-3">
            {startDate && endDate && (
              <Text className="text-center text-xs mb-3">
                Showing data from {formatDateToUK(startDate)} to {formatDateToUK(endDate)}
              </Text>
            )}
            <TabPanel className="p-0" key="chart1" value="chart1">
              {loading ? (
                <Spinner className="mx-auto text-brown flex justify-center items-center" />
              ) : filteredData.length === 0 ? (
                <Text className="text-center text-red-500">No data available for the selected range</Text>
              ) : (
                chartOptions && (
                  <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                )
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceChart;