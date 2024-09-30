import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Tabs,
  TabsBody,
  TabPanel,
  ButtonGroup,
} from "@material-tailwind/react";
import Calculator from "../Calculator";
import fetchStrategyData from "../api/getData";
import Button from "../common/Button";
import Text from "../common/Text";
import Heading from "../common/Heading";

import image from "../../assets/livePerformance.jpg";
import CustomLink from "../common/CustomLink";
import SectionContent from "../container/SectionContent";
import Section from "../container/Section";
const PerformanceChart = ({ strategy, blogUrl }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeButton, setActiveButton] = useState("ALL");
  const [filteredData, setFilteredData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const customDateRef = useRef(null);
  const customButtonRef = useRef(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStrategyData(
        strategy,
        timeRange,
        timeRange === "Custom" ? startDate : null,
        timeRange === "Custom" ? endDate : null
      );
      if (!data || data.length === 0) {
        throw new Error("No data received from API");
      }
      const chartData = prepareChartData(data, strategy);
      updateChartOptions(chartData);
      setFilteredData(data);
    } catch (error) {
      console.error("Error loading data: ", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [strategy, timeRange, startDate, endDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isCustomDateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup to restore scroll behavior when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCustomDateOpen]);

  const calculateCAGR = useCallback(
    (data, timeRange = "ALL", portfolioType = "total_portfolio_nav") => {
      const parseDate = (dateString) => new Date(dateString);
      const sortedData = [...data].sort(
        (a, b) => parseDate(a.date) - parseDate(b.date)
      );

      if (sortedData.length < 2) return "Loading...";

      const latestData = sortedData[sortedData.length - 1];
      const latestDate = parseDate(latestData.date);
      let startDate = new Date(latestDate);

      if (timeRange === "Custom") {
        startDate = parseDate(sortedData[0].date);
      } else {
        switch (timeRange) {
          case "1M":
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "3M":
            startDate.setMonth(startDate.getMonth() - 3);
            break;
          case "6M":
            startDate.setMonth(startDate.getMonth() - 6);
            break;
          case "1Y":
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
          case "3Y":
            startDate.setFullYear(startDate.getFullYear() - 3);
            break;
          case "5Y":
            startDate.setFullYear(startDate.getFullYear() - 5);
            break;
          case "ALL":
            startDate = parseDate(sortedData[0].date);
            break;
          case "YTD":
            startDate.setMonth(0, 1);
            break;
          default:
            return "Invalid time range";
        }
      }

      const startIndex = sortedData.findIndex(
        (d) => parseDate(d.date) >= startDate
      );
      if (startIndex === -1) return "N/A";

      const startValue = parseFloat(sortedData[startIndex][portfolioType]);
      const endValue = parseFloat(latestData[portfolioType]);

      if (isNaN(startValue) || isNaN(endValue)) return "N/A";

      const days =
        (latestDate - parseDate(sortedData[startIndex].date)) /
        (24 * 60 * 60 * 1000);
      const years = days / 365;

      if (years <= 0) return "Invalid date range";

      // For periods less than a year, use simple return
      if (years < 1) {
        const simpleReturn = ((endValue - startValue) / startValue) * 100;
        return simpleReturn.toFixed(2) + "%";
      }

      // For periods of a year or more, use CAGR
      const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
      return cagr.toFixed(2) + "%";
    },
    []
  );

  const strategyCagr = useMemo(
    () => calculateCAGR(filteredData, timeRange, "total_portfolio_nav"),
    [calculateCAGR, filteredData, timeRange]
  );

  const prepareChartData = useCallback((data, strategy) => {
    const strategyKey = "total_portfolio_nav";
    const initialStrategyValue = parseFloat(data[0][strategyKey]);
    const initialNiftyValue = parseFloat(
      data[0]["Nifty 50"] || data[0]["nifty"]
    );
    console.log(data);

    return data.map((item) => ({
      date: item.date,
      strategyValue:
        (parseFloat(item[strategyKey]) / initialStrategyValue) * 100,
      niftyValue:
        (parseFloat(item["Nifty 50"] || item["nifty"]) / initialNiftyValue) *
        100,
    }));
  }, []);

  const updateChartOptions = (data) => {
    const dates = data.map((item) => item.date);

    const strategyValues = data.map((item) => Math.trunc(item.strategyValue));
    const niftyValues = data.map((item) => Math.trunc(item.niftyValue));

    let maxStrategyValue = 0;
    const drawdown = data.map((item) => {
      const value = item.strategyValue;
      const dd =
        maxStrategyValue > value ? (value / maxStrategyValue - 1) * 100 : 0;
      maxStrategyValue = Math.max(maxStrategyValue, value);
      return Math.trunc(dd);
    });

    const options = {
      title: "",
      xAxis: {
        categories: dates,
        labels: {
          formatter: function () {
            const date = new Date(this.value);
            return `${date.getFullYear()}`;
          },
        },
        tickPositions: [0, Math.floor(dates.length / 2), dates.length - 1],
      },
      yAxis: [
        {
          title: { text: "" },
          height: "100%",
        },
      ],
      series: [
        {
          name: strategy,
          data: strategyValues,
          color: "#d1a47b",
          lineWidth: 1,
          marker: {
            enabled: false, // Marker disabled by default
            states: {
              hover: {
                enabled: true, // Marker enabled on hover
                radius: 5, // You can adjust the radius of the marker on hover
              },
            },
          },
          type: "line",
        },
        {
          name: "Nifty 50",
          data: niftyValues,
          color: "#000",
          lineWidth: 1,
          marker: {
            enabled: false, // Marker disabled by default
            states: {
              hover: {
                enabled: true, // Marker enabled on hover
                radius: 5, // Adjust radius
              },
            },
          },
          type: "line",
        },
      ],
      chart: {
        height: isMobile ? 300 : 520,
        backgroundColor: "none",
        zoomType: "x",
        marginLeft: isMobile ? 0 : 40,
        marginRight: isMobile ? 0 : 40,
      },
      tooltip: {
        shared: true,
        outside: isMobile,
      },
      legend: { enabled: true },
      credits: { enabled: false },
      exporting: { enabled: !isMobile },
      plotOptions: {
        series: {
          animation: {
            duration: 2000,
          },
          states: {
            hover: {
              enabled: true, // Enable hover state on series
              lineWidthPlus: 1, // Optional: make the line thicker on hover
            },
          },
        },
      },
    };

    setChartOptions(options);
  };

  const handleTimeRangeChange = useCallback((range) => {
    setTimeRange(range);
    setActiveButton(range);
    if (range !== "ALL" && range !== "Custom") {
      setStartDate(null);
      setEndDate(null);
    }
    if (range === "YTD") {
      const currentDate = new Date();
      setStartDate(
        new Date(currentDate.getFullYear(), 0, 1).toISOString().split("T")[0]
      );
      setEndDate(currentDate.toISOString().split("T")[0]);
    }
    setIsCustomDateOpen(false);
  }, []);

  const handleCustomDateClick = () => {
    setIsCustomDateOpen(!isCustomDateOpen);
  };

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      setTimeRange("Custom");
      setActiveButton("Custom");
      setIsCustomDateOpen(false);
      loadData();
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const renderDateRangeButtons = () => {
    const ranges = ["1M", "6M", "1Y", "3Y", "5Y", "ALL"];
    return (
      <>
        {ranges.map((range) => (
          <Button
            key={range}
            onClick={() => handleTimeRangeChange(range)}
            className={`text-xs  ${
              activeButton === range
                ? "bg-beige  text-black"
                : "bg-white border border-brown text-black"
            }`}
          >
            {range}
          </Button>
        ))}
        <div className="relative" ref={customButtonRef}>
          <Button
            onClick={handleCustomDateClick}
            className={`text-xs  ${
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
              className="fixed left-1/2 transform -translate-x-1/2 mt-18 p-2 sm:p-4 bg-white  shadow-lg z-50"
              style={{
                top: `${customButtonRef.current?.getBoundingClientRect().bottom}px`,
                minWidth: "280px",
                maxWidth: "90vw",
              }}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
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
                      setStartDate(e.target.value);
                      setTimeRange("Custom");
                      setActiveButton("Custom");
                    }}
                    className="mt-1 block w-full border border-brown shadow-sm p-18"
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
                      setEndDate(e.target.value);
                      setTimeRange("Custom");
                      setActiveButton("Custom");
                    }}
                    className="mt-1 block w-full border border-brown shadow-sm p-18"
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
      <div className="w-full sm:p-7 p-2 ">
        <Tabs value="chart1">
          {" "}
          <div className="flex justify-between flex-col sm:flex-row items-center">
            <div className="flex flex-wrap  justify-center items-center   gap-18">
              {renderDateRangeButtons()}
            </div>
            <div className="text-center sm:text-right mt-3 sm:mt-0">
              <Text className="sm:text-semiheading text-semiheading font-subheading text-beige">
                {strategyCagr}
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
                Showing data from {startDate} to {endDate}
              </Text>
            )}
            {/* Adjusted margin */}
            <TabPanel className="p-0" key="chart1" value="chart1">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <Section padding="large" className="text-center">
        <Text className="sm:text-subheading text-mobileSubHeading font-subheading text-center mb-4 ">
          How this Strategy works & <br className="sm:visible hidden" /> how was
          it made to get the expected returns with highest certainty.
        </Text>
        <CustomLink
          to={`/blogs${blogUrl}`}
          className="p-2 relative border-brown border transition-all justify-between items-center  flex duration-500 hover:bg-beige hover:text-black  hover:shadow-xl group"
        >
          <div className="text-black">
            <Text className="sm:text-subheading text-mobileSubHeading font-subheading">
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
        </CustomLink>
        {/* <Button className="" to={`/blogs${blogUrl}`}>
          Read Here
        </Button> */}
      </Section>
      <div className="w-full flex sm:flex-row flex-col gap-4">
        {" "}
        {/* Adjusted margin */}
        <div className=" sm:p-6 p-3 border border-brown bg-white  sm:w-3/6">
          {" "}
          {/* Adjusted padding */}
          <Calculator strategy={strategy} />
        </div>
        <div
          className="relative  bg-cover flex justify-start items-start flex-col sm:p-6 p-2 sm:w-1/2"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Content that sits on top of the background and overlay */}
          <div className="relative z-10 text-start backdrop-blur-md bg-black bg-opacity-30 p-4 ">
            <Heading
              isItalic
              className="text-lightBeige sm:text-semiheading text-mobileSemiHeading mb-4"
            >
              Want to track the live portfolio performance?
            </Heading>
            <Button
              to={"https://dashboard.qodeinvest.com/"}
              target="_blank"
              isGlassmorphism
              className="text-lightBeige hover:text-black"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
