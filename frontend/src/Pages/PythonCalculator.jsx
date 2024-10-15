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
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

function PythonCalculator() {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]); // State to hold columns from uploaded Excel

  const handleFileUpload = (uploadedColumns) => {
    setColumns(uploadedColumns);
  };

  const { isMobile } = useMobileWidth();

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Equity Curve",
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
      height: isMobile ? 300 : 520, // Adjusted based on mobile
      backgroundColor: "none",
      zoomType: "x",
      marginLeft: isMobile ? 0 : 50,
      marginRight: isMobile ? 0 : 50,
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
      area: {
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
  });

  const updateChartOptions = (chartData, drawdownData) => {
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
          data: chartData,
        },
        {
          ...chartOptions.series[1],
          data: drawdownData,
        },
      ],
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
      const data = response.data;
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
    if (!resultData) return null;

    const metrics = [
      { key: "CAGR", value: resultData.car.toFixed(2) + "%" },
      { key: "Max Drawdown", value: resultData.max_dd.toFixed(2) + "%" },
      { key: "Avg Drawdown", value: resultData.avg_dd.toFixed(2) + "%" },
      { key: "CAR/MDD", value: resultData.carbymdd.toFixed(2) },
      { key: "Max Gain / Day", value: resultData.max_gain.toFixed(2) + "%" },
      { key: "Max Loss", value: resultData.max_loss.toFixed(2) + "%" },
    ];

    return (
      <>
        <h3 className="font-semibold mb-4 text-gray-800 text-center">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 shadow-sm flex flex-col items-center justify-center border border-gray-200"
            >
              <p className="text-gray-500 text-xs">{metric.key}</p>
              <p className="font-bold text-gray-700">
                {metric.value !== null ? metric.value : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderDrawdownsTable = () => {
    if (
      !resultData?.top_10_worst_drawdowns ||
      resultData.top_10_worst_drawdowns.length === 0
    ) {
      return (
        <p className="text-center text-gray-500">No drawdown data available</p>
      );
    }

    return (
      <>
        <h3 className="font-semibold mb-2">Top 10 Worst Drawdowns</h3>
        <div className="overflow-x-auto">
          {" "}
          {/* Makes table horizontally scrollable */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-1 py-1 text-left">
                    Drawdown
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-left">
                    Peak Date
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-left">
                    Drawdown Date
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-left">
                    Recovery Date
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-left">
                    Days between Drawdown and Recovery Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.top_10_worst_drawdowns.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-1 py-1">
                      {row.Drawdown}
                    </td>
                    <td className="border border-gray-300 text-nowrap px-1 py-1">
                      {row.Peak_Date}
                    </td>
                    <td className="border border-gray-300 text-nowrap px-1 py-1">
                      {row.Drawdown_Date}
                    </td>
                    <td className="border border-gray-300 text-nowrap px-1 py-1">
                      {row.Recovery_Date}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {row["Days between Drawdown and Recovery Date"]}
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
    <Section padding="extralarge" className="mt-5">
      <Heading
        isItalic
        className="text-mobileHeading sm:text-heading text-brown text-center mb-4 font-heading"
      >
        Portfolio Visualizer
      </Heading>
      {/* <div className="  text-black sm:p-4 text-body  font-body" role="alert">
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

      {/* <FileUpload onColumnsUpdate={handleFileUpload} /> */}

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
              <div
                className={`chart-container ${isMobile ? "mobile-chart" : ""}`}
              >
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </div>
            </>
          )}
          {renderMetrics()}
          {renderDrawdownsTable()}
          <MonthlyPLTable data={resultData?.monthly_pl_table || []} />
          {resultData?.cagrData && (
            <CAGRBarChart cagrData={resultData.cagrData} />
          )}
          {resultData?.peak_to_peak_data && (
            <MaxPeakToPeakTable data={resultData?.peak_to_peak_data || []} />
          )}
        </>
      )}
    </Section>
  );
}

export default PythonCalculator;
