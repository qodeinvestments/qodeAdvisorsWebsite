import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * Computes annual drawdown for a given valueKey.
 * Drawdown (%) = ((current - peakSoFar) / peakSoFar) * 100
 */
function computeAnnualDrawdowns(data, valueKey) {
  if (!data || data.length === 0) return [];

  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const groupedByYear = {};

  for (const item of sorted) {
    const year = new Date(item.date).getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(item);
  }

  const results = [];
  for (const yearStr of Object.keys(groupedByYear).sort()) {
    const year = parseInt(yearStr, 10);
    const yearData = groupedByYear[yearStr].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let maxDrawdown = 0;
    let runningPeak = yearData[0][valueKey];

    for (const point of yearData) {
      const currentValue = point[valueKey];
      if (currentValue > runningPeak) {
        runningPeak = currentValue;
      }
      if (runningPeak && runningPeak !== 0) {
        const currentDrawdown =
          ((currentValue - runningPeak) / runningPeak) * 100;
        maxDrawdown = Math.min(maxDrawdown, currentDrawdown);
      }
    }

    results.push({
      year,
      drawdown: maxDrawdown !== 0 ? maxDrawdown : null,
    });
  }

  return results;
}

const AnnualCalendarDrawdown = ({
  data = [],
  strategyKey = "qaw",
  benchmarkKey = "nifty_50",
  strategyName = "Strategy",
  benchmarkName = "Benchmark",
  isLoading = false,
  error = null,
}) => {
  const { categories, series } = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return { categories: [], series: [] };
    }

    const strategyDD = computeAnnualDrawdowns(data, strategyKey);
    const benchmarkDD = computeAnnualDrawdowns(data, benchmarkKey);

    const allYearsSet = new Set([
      ...strategyDD.map((x) => x.year),
      ...benchmarkDD.map((x) => x.year),
    ]);
    const allYears = [...allYearsSet].sort((a, b) => a - b);

    const portfolioData = allYears.map((yr) => {
      const found = strategyDD.find((r) => r.year === yr);
      return found?.drawdown ?? null;
    });
    const benchmarkData = allYears.map((yr) => {
      const found = benchmarkDD.find((r) => r.year === yr);
      return found?.drawdown ?? null;
    });

    const chartSeries = [
      {
        name: `${strategyName} Drawdown`,
        color: "#807f7f",
        data: portfolioData,
      },
      {
        name: `${benchmarkName} Drawdown`,
        color: "#e2e2e2",
        data: benchmarkData,
      },
    ];

    return {
      categories: allYears,
      series: chartSeries,
    };
  }, [data, strategyKey, benchmarkKey, strategyName, benchmarkName]);

  const options = useMemo(
    () => ({
      chart: {
        type: "column",
        height: 600,
        backgroundColor: "#ffffff",
      },
      title: {
        text: '',
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        categories,
        title: {
          text: "Year",
          style: { fontSize: "14px" },
        },
        labels: {
          style: { fontSize: "12px" },
          rotation: 0,
        },
      },
      yAxis: {
        title: {
          text: "Drawdown (%)",
          style: { fontSize: "14px" },
        },
        labels: {
          formatter: function () {
            return `${this.value.toFixed(1)}%`;
          },
          style: { fontSize: "12px" },
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}%</b><br/>',
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
      series,
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        itemStyle: {
          fontSize: "12px",
        },
      },
    }),
    [categories, series, strategyName, benchmarkName]
  );

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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};



export default AnnualCalendarDrawdown;
