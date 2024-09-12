import React, { useState } from "react";
import axios from "axios";
import { Table, Spin, message } from "antd";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import MonthlyPLTable from "../components/pythonCalculator/MonthlyPLTable";
import CAGRBarChart from "../components/pythonCalculator/CagrBarChart";
import MaxPeakToPeakTable from "../components/pythonCalculator/PeakToPeak";
import StyledPortfolioCalculatorForm from "../components/pythonCalculator/PythonForm";
import FileUpload from "../components/pythonCalculator/FileUpload";

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
        tickAmount: 10,
      },
      {
        title: {
          text: "Drawdown (%)",
        },
        opposite: false,
        top: "60%",
        height: "40%",
        left: "8%",
      },
    ],
    series: [
      {
        name: "NAV",
        data: [],
        color: "#9ddd55",
        lineWidth: 1,
        marker: {
          enabled: false,
        },
        type: "line",
        yAxis: 0,
      },
      {
        name: "Drawdown",
        data: [],
        color: "rgba(250, 65, 65, 1)",
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
            [0, "rgba(250, 65, 65, 0.2)"],
            [1, "rgba(250, 65, 65, 0.9)"],
          ],
        },
        type: "area",
        yAxis: 1,
        threshold: 0,
      },
    ],
    chart: {
      height: 800,
      backgroundColor: "none",
      zoomType: "x",
    },
    tooltip: {
      shared: true,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    plotOptions: {
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
      setResultData(data);
      console.log(data);

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
  const renderMetrics = () => {
    if (!resultData) return null;

    const metrics = [
      { key: "CAR", value: resultData.car },
      { key: "Max Drawdown", value: resultData.max_dd },
      { key: "Avg Drawdown", value: resultData.avg_dd },
      { key: "CAR/MDD", value: resultData.carbymdd },
      { key: "Max Gain", value: resultData.max_gain },
      { key: "Max Loss", value: resultData.max_loss },
    ];

    return (
      <div className="metrics-container my-6 p-6 bg-white rounded-lg shadow-lg">
        <h3 className=" font-semibold mb-4 text-gray-800 text-center">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-md shadow-sm flex flex-col items-center justify-center border border-gray-200"
            >
              <p className="text-gray-500 text-xs">{metric.key}</p>
              <p className=" font-bold text-gray-700">
                {metric.value !== null ? metric.value : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
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

    const columns = [
      { title: "Drawdown", dataIndex: "Drawdown", key: "Drawdown" },
      { title: "Peak Date", dataIndex: "Peak_Date", key: "Peak_Date" },
      {
        title: "Drawdown Date",
        dataIndex: "Drawdown_Date",
        key: "Drawdown_Date",
      },
      {
        title: "Recovery Date",
        dataIndex: "Recovery_Date",
        key: "Recovery_Date",
      },
      {
        title: "Days between Drawdown and Recovery Date",
        dataIndex: "Days between Drawdown and Recovery Date",
        key: "Days between Drawdown and Recovery Date",
      },
    ];

    return (
      <div className="drawdowns-table my-6 p-4 bg-white rounded shadow">
        <h3 className=" font-semibold mb-4">Top 10 Worst Drawdowns</h3>
        <Table
          dataSource={resultData.top_10_worst_drawdowns}
          columns={columns}
          pagination={false}
          bordered
          className="overflow-x-auto"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 my-12 mt-20 max-w-6xl mx-auto px-4">
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <p className="font-bold">Upload Requirements</p>
        <p>Please ensure your file meets the following criteria:</p>
        <ul className="list-disc pl-5">
          <li>Only CSV file formats are supported.</li>
          <li>
            Daily series must include two columns:
            <ul className="list-decimal pl-5">
              <li>
                First column for the date (Supported formats: dd/mm/yyyy).
              </li>
              <li>Second column for daily return or index value</li>
            </ul>
          </li>
        </ul>
      </div>
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
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
    </div>
  );
}

export default PythonCalculator;
