import React, { useState } from "react";
import axios from "axios";
import { Table, Spin, message, Button } from "antd"; // Import Button from Ant Design
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import MonthlyPLTable from "../components/pythonCalculator/MonthlyPLTable";
import CAGRBarChart from "../components/pythonCalculator/CagrBarChart";
import MaxPeakToPeakTable from "../components/pythonCalculator/PeakToPeak";
import StyledPortfolioCalculatorForm from "../components/pythonCalculator/PythonForm";
import FileUpload from "../components/pythonCalculator/FileUpload";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import "../components/components.css";
import Text from "../components/common/Text";
import useMobileWidth from "../components/hooks/useMobileWidth.jsx";
import OptimizedChart from "./PortfolioChart.jsx";
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

function PythonCalculator() {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]); // State to hold columns from uploaded Excel
  const [buttonLink, setButtonLink] = useState(null); // Add state for button link

  const handleFileUpload = (uploadedColumns) => {
    setColumns(uploadedColumns);
  };

  const { isMobile } = useMobileWidth();

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          const date = new Date(this.value);
          return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Value",
        },
        height: "60%",
        min: 0,
        tickAmount: 4,
      },
      {
        title: {
          text: "Drawdown (%)",
        },
        opposite: false,
        top: "60%",
        height: "40%",
        left: "6%",
      },
    ],
    series: [
      {
        name: "NAV",
        data: [],
        color: "#d1a47b", // Updated color
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5,
            },
          },
        },
        type: "line",
        yAxis: 0,
        animation: { duration: 2000 }, // Explicit animation duration
      },
      {
        name: "Drawdown",
        data: [],
        color: "rgba(250, 65, 65, 1)", // Updated color
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(0, 0, 0, 0.2)"], // Updated gradient color
            [1, "rgba(0, 0, 0, 0.9)"], // Updated gradient color
          ],
        },
        type: "line",
        yAxis: 1,
        threshold: 0,
        animation: { duration: 2000 }, // Explicit animation duration
      },
    ],
    chart: {
      backgroundColor: "none",
      zoomType: "x",
      marginLeft: isMobile ? 0 : 0,
      marginRight: isMobile ? 0 : 0,
    },
    tooltip: {
      shared: true,
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: !isMobile,
    },
    plotOptions: {
      series: {
        animation: { duration: 2000 }, // Explicit animation duration for entire series
        states: {
          hover: {
            enabled: true,
            lineWidthPlus: 1,
          },
        },
      },
    },
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
  });

  const updateChartOptions = (chartData, drawdownData) => {
    console.log(chartData);

    const roundData = (data) =>
      data.map(([timestamp, value]) => [timestamp, Math.round(value)]);

    const roundedChartData = roundData(chartData);
    const roundedDrawdownData = roundData(drawdownData);

    return {
      ...chartOptions,
      xAxis: {
        ...chartOptions.xAxis,
        tickPositions: [
          0,
          Math.floor(chartData.length / 2),
          chartData.length - 1,
        ],
      },
      series: [
        {
          ...chartOptions.series[0],
          name: "NAV",
          data: roundedChartData,
        },
        {
          ...chartOptions.series[1],
          name: "Drawdown",
          data: roundedDrawdownData,
        },
      ],
      tooltip: {
        shared: true,
        formatter: function () {
          let tooltipHtml = `<b>${Highcharts.dateFormat("%Y-%m-%d", this.x)}</b><br/>`;
          this.points.forEach((point) => {
            tooltipHtml += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${Math.round(point.y)}</b><br/>`;
          });
          return tooltipHtml;
        },
      },
    };
  };

  const handleSubmit = async (formData) => {
    if (
      !formData.start_date ||
      !formData.end_date ||
      formData.invest_amount <= 0
    ) {
      message.error("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/calculate_portfolio`,
        formData
      );
      console.log(response);
      
      const data = response.data.result;
      const buttonLink = response.data.download_link;
      setButtonLink(buttonLink)
      console.log(data);
      setResultData(data);

      if (data && data.equity_curve_data && data.drawdown_data) {
        const chartData = data.equity_curve_data.map((point) => {
          const [day, month, year] = point.Date.split("-");
          const date = Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );

          return [date, point.NAV];
        });

        const drawdownData = data.drawdown_data.map((point) => {
          const [day, month, year] = point.Date.split("-");
          const date = Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          return [date, point.Drawdown];
        });

        setChartOptions(updateChartOptions(chartData, drawdownData));
      } else {
        console.error("Missing required data in the response");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      message.error("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${API_URL}/download-excel`, {
        responseType: "blob", // Important to receive file as blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "portfolio_data.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success("Excel file downloaded successfully.");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      message.error("Failed to download Excel file.");
    }
  };

  const renderMetrics = () => {
    if (
      !resultData ||
      !resultData.equity_curve_data ||
      resultData.equity_curve_data.length < 2
    )
      return null;

    // Get the first and last dates from equity_curve_data
    const dates = resultData.equity_curve_data.map(
      (point) => new Date(point.Date.split("-").reverse().join("-"))
    );
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    // Calculate the date range in days
    const dateRangeInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const isLessThanOneYear = dateRangeInDays <= 365;

    const metrics = [
      {
        key: isLessThanOneYear ? "Absolute Returns" : "CAGR",
        value: resultData.car.toFixed(1) + "%",
      },
      { key: "Max Drawdown", value: resultData.max_dd.toFixed(1) + "%" },
      { key: "Avg Drawdown", value: resultData.avg_dd.toFixed(1) + "%" },
      { key: "CAR/MDD", value: resultData.carbymdd.toFixed(1) },
      { key: "Max Gain / Day", value: resultData.max_gain.toFixed(1) + "%" },
      { key: "Max Loss / Day", value: resultData.max_loss.toFixed(1) + "%" },
    ];

    return (
      <>
        <Heading isItalic className="font-semibold my-5 text-brown  text-start">
          Performance Metrics
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-1 ">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className=" py-2 shadow-sm flex flex-col items-center justify-center border border-brown"
            >
              <p className="text-black  text-sm sm:text-body">{metric.key}</p>
              <p className="font-subheading text-subheading text-beige">
                {metric.value !== null ? metric.value : "0%"}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const calculateDaysBetween = (date1, date2) => {
    const d1 = new Date(date1.split("-").reverse().join("-"));
    const d2 = new Date(date2.split("-").reverse().join("-"));
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderDrawdownsTable = () => {
    if (
      !resultData?.top_10_worst_drawdowns ||
      resultData.top_10_worst_drawdowns.length === 0
    ) {
      return <p className="text-center text-gray-500"></p>;
    }

    return (
      <>
        <Text className="font-subheading mt-6  text-brown text-subheading mb-2">
          Top 10 Worst Drawdowns
        </Text>
        <div className="overflow-x-auto">
          {" "}
          {/* Makes table horizontally scrollable */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-body font-body text-center table-auto border-collapse border border-brown">
              <thead>
                <tr className="bg-lightBeige">
                  <th className="border border-brown p-18">Drawdown</th>
                  <th className="border border-brown p-18">Peak Date</th>
                  <th className="border border-brown p-18">Drawdown Date</th>
                  <th className="border border-brown p-18">Recovery Date</th>
                  <th className="border border-brown p-18">Days to Recover</th>
                </tr>
              </thead>
              <tbody>
                {resultData.top_10_worst_drawdowns.map((row, index) => (
                  <tr key={index} className="hover:bg-lightBeige">
                    <td className="border border-brown p-18">
                      {row.Drawdown.toFixed(1)}%
                    </td>
                    <td className="border border-brown text-nowrap p-18">
                      {row.Peak_Date}
                    </td>
                    <td className="border border-brown text-nowrap p-18">
                      {row.Drawdown_Date}
                    </td>
                    <td className="border border-brown text-nowrap p-18">
                      {row.Recovery_Date}
                    </td>
                    <td className="border border-brown p-18">
                      {row.Recovery_Date !== "Not Recovered"
                        ? calculateDaysBetween(row.Peak_Date, row.Recovery_Date)
                        : "Not Recovered"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <Section padding="none" className="mt-8 mb-6">
      <Heading
        isItalic
        className="text-mobileHeading sm:text-heading text-brown text-center mb-4 font-heading"
      >
        Portfolio Visualizer
      </Heading>
      {/* <div className="  text-black sm:p-4 text-sm sm:text-body  font-body" role="alert">
        <p className="sm:text-subheading text-mobileSubHeading font-subheading mb-1">
          Upload Requirements
        </p>
        <p className="mb-18">
          Please ensure your file meets the following criteria:
        </p>
        <ul className="list-disc sm:pl-5 pl-2">
          <li>Only CSV file formats are supported.</li>
          <li>
            Daily series must include two columns:
            <ul className="list-decimal sm:pl-5 pl-2">
              <li>
                First column for the date (Supported formats: DD-MM-YYYY).
              </li>
              <li>Second column for daily return or index value</li>
            </ul>
          </li>
        </ul>
      </div> */}
      {/* <Text className="sm:text-subheading text-mobileSubHeading mt-5 mb-2 font-subheading">
        Dataset
      </Text> */}

      <FileUpload onColumnsUpdate={handleFileUpload} />

      <StyledPortfolioCalculatorForm
        onSubmit={handleSubmit}
        loading={loading}
        columns={columns}
      />

      {loading ? (
        <div className="flex justify-center py-4">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {resultData && (
            <>
              {/* <Button type="primary" onClick={handleDownloadExcel} className="mb-4">
                Download Excel
              </Button> */}
              <>
                {buttonLink && (
                  <Button
                    type="primary"
                    onClick={() => window.open(`${API_URL}${buttonLink}`, "_blank")}

                    className="mb-4"
                  >
                    Download Report
                  </Button>
                )}
                <Text className="font-subheading mt-6  text-brown text-subheading mb-2">
                  Equity Curve
                </Text>
                <OptimizedChart
                  data={{
                    navData: resultData.equity_curve_data.map((point) => [
                      Date.UTC(
                        parseInt(point.Date.split("-")[2]),
                        parseInt(point.Date.split("-")[1]) - 1,
                        parseInt(point.Date.split("-")[0])
                      ),
                      point.NAV,
                    ]),
                    drawdownData: resultData.drawdown_data.map((point) => [
                      Date.UTC(
                        parseInt(point.Date.split("-")[2]),
                        parseInt(point.Date.split("-")[1]) - 1,
                        parseInt(point.Date.split("-")[0])
                      ),
                      point.Drawdown,
                    ]),
                  }}
                />
              </>
            </>
          )}
          {renderMetrics()}
          {renderDrawdownsTable()}
          <MonthlyPLTable data={resultData?.monthly_pl_table || []} />
          {resultData?.cagrData && (
            <CAGRBarChart cagrData={resultData.cagrData} />
          )}
          {/* {resultData?.peak_to_peak_data && (
            <MaxPeakToPeakTable data={resultData?.peak_to_peak_data || []} />
          )} */}
        </>
      )}
    </Section>
  );
}

export default PythonCalculator;
