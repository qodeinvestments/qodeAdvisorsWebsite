import React, { useState, useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Tabs, TabsBody, TabPanel, Spinner } from "@material-tailwind/react";
import Button from "../common/Button";
import Text from "../common/Text";
import CustomLink from "../common/CustomLink";
import Section from "../container/Section";
import useCustomTimeRange from "../hooks/useCustomTimeRange";
import useMobileWidth from "../hooks/useMobileWidth";
import useChartData from "../hooks/useChartOptions";
import useCalculateCagr from "../hooks/useCalculateCagr";
import filterDataByCustomRange from "../utils/filterDataByTimeRange";
import boost from "highcharts/modules/boost";
boost(Highcharts);
const PerformanceChart = ({
  data,
  strategy,
  blogUrl,
  error,
  isLoading,
  name,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const customDateRef = useRef(null);
  const customButtonRef = useRef(null);
  const {
    timeRange,
    startDate,
    endDate,
    activeButton,
    isCustomDateOpen,
    setCustomDateRange,
    handleCustomDateClick,
    handleTimeRangeChange,
  } = useCustomTimeRange();

  const { isMobile } = useMobileWidth();

  const { chartOptions, prepareChartData, updateChartOptions } = useChartData(
    strategy,
    isMobile,
    name
  );

  const { calculateCAGR } = useCalculateCagr();

  // const { data, isLoading, error } = useFetchStrategyData(strategy);
  if (error) {
    console.error(error);
    return null;
  }

  const filterData = useMemo(() => {
    if (!isLoading && data.length > 0) {
      const latestDate = data.reduce((latest, current) => {
        const currentDate = new Date(current.date);
        return currentDate > new Date(latest.date) ? current : latest;
      }, data[0]);

      const filteredData = filterDataByCustomRange(
        data,
        timeRange,
        startDate,
        endDate,
        latestDate.date
      );

      return filteredData;
    }
    return [];
  }, [data, isLoading, timeRange, startDate, endDate]);

  useEffect(() => {
    if (filterData.length > 0) {
      const chartData = prepareChartData(filterData, strategy);
      setLoading(true);
      updateChartOptions(chartData);
      setLoading(false);
      setFilteredData(filterData);
    }
  }, [filterData, strategy, prepareChartData, updateChartOptions]);

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

  const strategyCagr = useMemo(
    () => calculateCAGR(filteredData, timeRange, "total_portfolio_nav"),
    [calculateCAGR, filteredData, timeRange]
  );

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
                    value={startDate}
                    onChange={(e) => {
                      const newStartDate = e.target.value;
                      setCustomDateRange(newStartDate, endDate); // Call the custom setter
                    }}
                    className="mt-1 block w-full border border-brown shadow-sm p-18"
                    aria-label="Start Date" // Provides an accessible label for screen readers
                    aria-required="true" // Indicates that this field is required (if applicable)
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
                    onChange={(e) => {
                      const newEndDate = e.target.value;
                      setCustomDateRange(startDate, newEndDate); // Call the custom setter
                    }}
                    className="mt-1 block w-full border border-brown shadow-sm p-18"
                    aria-label="End Date" // Provides an accessible label for screen readers
                    aria-required="true" // Indicates that this field is required (if applicable)
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
    <div className="flex flex-col justify-center ">
      {" "}
      {/* Adjusted gap spacing */}
      <div className="w-full ">
        <Tabs value="chart1">
          {" "}
          <div className="flex justify-between flex-col lg:flex-row items-center">
            <div className="flex flex-wrap  justify-center items-center   gap-18">
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
            {" "}
            {startDate && (
              <Text className="text-center text-xs mb-3">
                Showing data from{" "}
                {new Date(startDate).toLocaleDateString("en-GB")} to{" "}
                {new Date(endDate).toLocaleDateString("en-GB")}
              </Text>
            )}
            {/* Adjusted margin */}
            <TabPanel className="p-0" key="chart1" value="chart1">
              {loading ? (
                <Spinner className="mx-auto text-brown flex justify-center items-center" />
              ) : (
                chartOptions && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                )
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      {/* <Text className="text-beige text-sm sm:text-body font-body mt-1 italic">
        *The results shown above are based on backtested data and are shared to
        highlight the strategy’s past performance.
      </Text>
      <Text className="sm:text-subheading text-mobileSubHeading font-subheading text-center my-2 mt-6 sm:mt-4 ">
        How does this Strategy work & <br className="sm:visible hidden" />  how
        was it made to get the expected returns with the highest certainty?
      </Text>
      <CustomLink
        to={`/blogs${blogUrl}`}
        className="p-1  border-brown border transition-all justify-between items-center  flex duration-500 hover:bg-beige hover:text-black  hover:shadow-xl group"
      >
        <div className="text-black">
          <Text className="lg:text-subheading text-mobileSubHeading font-subheading">
            Read Here
          </Text>
        </div>
        <div className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="44"
            height="44"
            fill="currentColor"
            className="ml-2"
          >
            <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
          </svg>
        </div>
      </CustomLink> */}
      {/* <Button className="" to={`/blogs${blogUrl}`}>
          Read Here
        </Button> */}
    </div>
  );
};

export default PerformanceChart;
