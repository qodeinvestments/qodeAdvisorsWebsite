import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * LogPerformanceChart displays a log-scale performance chart for a given strategy & benchmark,
 * normalized so both series start from the same value (e.g., 100).
 *
 * @param {Array}   data           Array of data points like: [ { date, qaw, nifty_50 }, ... ]
 * @param {string}  strategyKey    The key in the data object for your strategy’s value (e.g. "qaw")
 * @param {string}  benchmarkKey   The key in the data object for your benchmark’s value (e.g. "nifty_50")
 * @param {string}  strategyName   Display name for the strategy
 * @param {string}  benchmarkName  Display name for the benchmark
 * @param {boolean} isLoading      Loading state
 * @param {string}  error          Error message, if any
 */
const LogPerformanceChart = ({
  data,
  strategyKey = "qaw",
  benchmarkKey = "nifty_50",
  strategyName = "Strategy",
  benchmarkName = "NIFTY 50",
  isLoading = false,
  error = null,
}) => {
  // 1) Handle loading & error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-600">
          Error loading chart data: {error}
        </div>
      </div>
    );
  }

  // 2) Build the chart options
  const chartOptions = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Sort data by ascending date
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get the earliest (first) values
    const earliestStrategy = sortedData[0][strategyKey];
    const earliestBenchmark = sortedData[0][benchmarkKey];

    // Safeguard against 0 or missing values
    if (!earliestStrategy || !earliestBenchmark) return null;

    // Build normalized series (base = 100)
    const strategySeries = sortedData.map((point) => [
      new Date(point.date).getTime(),
      (point[strategyKey] / earliestStrategy) * 100,
    ]);
    const benchmarkSeries = sortedData.map((point) => [
      new Date(point.date).getTime(),
      (point[benchmarkKey] / earliestBenchmark) * 100,
    ]);

    return {
      chart: {
        type: "line",
        height: 600,
        zoomType: "x",
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      title: {
        text: `${strategyName} vs ${benchmarkName}`,
        align: "left",
        style: { fontSize: "16px" },
      },
      xAxis: {
        type: "datetime",
        labels: {
          format: "{value:%Y-%m-%d}",
        },
      },
      yAxis: {
        type: "logarithmic",
        title: {
          text: "",
        },
        gridLineWidth: 1,
        gridLineColor: "#E5E7EB",
      },
      // Brown + Beige:
      colors: ["#A0522D", "#d1a47b"], 
      legend: {
        enabled: true,
        align: "right",
        verticalAlign: "top",
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        pointFormat: "{series.name}: <b>{point.y:.2f}</b><br/>",
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              lineWidth: 2,
            },
          },
        },
      },
      series: [
        {
          name: strategyName,
          data: strategySeries,
        },
        {
          name: benchmarkName,
          data: benchmarkSeries,
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }, [data, strategyKey, benchmarkKey, strategyName, benchmarkName]);

  if (!chartOptions) {
    return (
      <div className="flex justify-center items-center h-[400px] text-gray-500">
        No data available
      </div>
    );
  }

  // 3) Render the chart
  return (
      <div className="w-full h-[600px]">
        {typeof window !== "undefined" && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </div>
  );
};

export default LogPerformanceChart;
