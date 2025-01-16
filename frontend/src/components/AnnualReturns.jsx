import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * calculateAnnualReturns
 * Given an array of data objects (with at least { date, [valueKey] }),
 * it groups them by calendar year and calculates that year's return
 * from the year's first value (startValue) to the year's last value (endValue).
 */
function calculateAnnualReturns(data, valueKey) {
  if (!data || data.length === 0) return [];

  // 1) Group data by year
  const dataByYear = data.reduce((acc, cur) => {
    const year = new Date(cur.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push({
      ...cur,
      [valueKey]: parseFloat(cur[valueKey])
    });
    return acc;
  }, {});

  // 2) For each year, sort by date asc, compute (endValue / startValue - 1) * 100
  return Object.keys(dataByYear)
    .sort()
    .map((year) => {
      const yearlyData = dataByYear[year].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const startValue = yearlyData[0][valueKey];
      const endValue = yearlyData[yearlyData.length - 1][valueKey];

      if (startValue && startValue > 0) {
        const yearlyReturn = ((endValue / startValue - 1) * 100).toFixed(2);
        return {
          year: parseInt(year, 10),
          returnValue: Number(yearlyReturn)
        };
      }
      return null;
    })
    .filter(Boolean); // remove any null entries
}

/**
 * calculateCAGR
 * Given an array of data, calculates the CAGR from the earliest date’s value
 * to the latest date’s value for the specified `valueKey`.
 */
function calculateCAGR(data, valueKey) {
  if (!data || data.length < 2) return null;

  // 1) Sort by date ascending
  const sorted = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const firstVal = parseFloat(sorted[0][valueKey]);
  const lastVal = parseFloat(sorted[sorted.length - 1][valueKey]);

  if (isNaN(firstVal) || isNaN(lastVal) || firstVal <= 0) return null;

  // 2) Compute # years
  const startDate = new Date(sorted[0].date);
  const endDate = new Date(sorted[sorted.length - 1].date);
  const years = (endDate - startDate) / (365.25 * 24 * 60 * 60 * 1000);

  // 3) CAGR formula
  const cagr = (Math.pow(lastVal / firstVal, 1 / years) - 1) * 100;
  return Number(cagr.toFixed(2));
}

/**
 * AnnualReturns Component
 * 
 * Displays a comparative bar chart (one bar per year) of:
 *  - `strategyKey` (e.g. "qaw")
 *  - `benchmarkKey` (e.g. "nifty_50")
 * 
 * @param {Object} props
 * @param {Array}  props.data           - Array of historical data. Must have { date, strategyKey, benchmarkKey }.
 * @param {String} props.strategyKey    - Field name for your strategy in `data`.
 * @param {String} props.benchmarkKey   - Field name for the benchmark in `data`.
 * @param {String} props.title          - Chart title.
 */
const AnnualReturns = ({
  data = [],
  strategyKey = "qaw",
  benchmarkKey = "nifty_50",
  strategyName = "Strategy",
  benchmarkName = "Benchmark",
  title = "",
}) => {
  const chartData = useMemo(() => {
    if (!data.length) {
      return {
        categories: [],
        series: [],
        plotLines: [],
      };
    }

    const strategyReturns = calculateAnnualReturns(data, strategyKey);
    const benchmarkReturns = calculateAnnualReturns(data, benchmarkKey);

    const allYears = [
      ...new Set([
        ...strategyReturns.map((r) => r.year),
        ...benchmarkReturns.map((r) => r.year),
      ]),
    ].sort();

    const strategySeriesData = allYears.map((yr) => {
      const found = strategyReturns.find((r) => r.year === yr);
      return found ? found.returnValue : null;
    });

    const benchmarkSeriesData = allYears.map((yr) => {
      const found = benchmarkReturns.find((r) => r.year === yr);
      return found ? found.returnValue : null;
    });

    const cagrStrategy = calculateCAGR(data, strategyKey);
    const cagrBenchmark = calculateCAGR(data, benchmarkKey);

    const plotLines = [];
    if (cagrStrategy !== null) {
      plotLines.push({
        value: cagrStrategy,
        color: "blue",
        dashStyle: "ShortDash",
        width: 2,
        label: {
          text: `${strategyName} CAGR: ${cagrStrategy}%`,
          style: { color: "blue" },
        },
      });
    }
    if (cagrBenchmark !== null) {
      plotLines.push({
        value: cagrBenchmark,
        color: "red",
        dashStyle: "ShortDash",
        width: 2,
        label: {
          text: `${benchmarkName} CAGR: ${cagrBenchmark}%`,
          style: { color: "red" },
        },
      });
    }

    return {
      categories: allYears,
      series: [
        {
          name: strategyName,
          color: "#945c39",
          data: strategySeriesData,
        },
        {
          name: benchmarkName,
          color: "#d1a47b",
          data: benchmarkSeriesData,
        },
      ],
    };
  }, [data, strategyKey, benchmarkKey, strategyName, benchmarkName]);

  const options = useMemo(() => {
    return {
      chart: {
        type: "column",
        height: window.innerWidth < 768 ? 400 : 600,
        backgroundColor: "#ffffff",
        style: {
          fontFamily: "DM Sans, sans-serif",
        },
      },
      title: {
        text: title,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        categories: chartData.categories,
        title: { text: "Year" },
      },
      yAxis: {
        title: { text: "" },
        plotLines: chartData.plotLines,
        labels: {
          format: "{value}%",
        },
      },
      tooltip: {
        shared: true,
        valueDecimals: 2,
        valueSuffix: "%",
      },
      plotOptions: {
        column: {
          grouping: true,
          shadow: false,
          borderWidth: 0,
          pointPadding: 0, // No gap between columns in the same group
          groupPadding: 0.2, // Slight gap between groups (strategy vs benchmark)
        },
      },
      series: chartData.series,
      credits: { enabled: false },
      legend: {
        enabled: true,
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
      },
    };
  }, [chartData, title]);

  if (!chartData.series.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">No data available for the chart</div>
      </div>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};


export default AnnualReturns;
