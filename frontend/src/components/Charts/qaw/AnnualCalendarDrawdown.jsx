import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchStrategyNavField from "../../../hooks/useFetchStrategyNavData";

/**
 * Computes annual drawdown for a given valueKey.
 * Simple version:
 *   drawdown(%) = ((endOfYear - startOfYear) / startOfYear) * 100
 *
 * If you need the "worst peak-to-trough" drawdown within the year,
 * adapt this logic.
 */
function computeAnnualDrawdowns(data, valueKey) {
  if (!data || data.length === 0) return [];

  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const groupedByYear = {};
  for (const item of sorted) {
    const year = new Date(item.date).getFullYear();
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(item);
  }

  const results = [];
  for (const yearStr of Object.keys(groupedByYear).sort()) {
    const year = parseInt(yearStr, 10);
    const yearData = groupedByYear[yearStr].sort((a, b) => new Date(a.date) - new Date(b.date));

    let maxDrawdown = 0;
    let runningPeak = yearData[0][valueKey];

    for (const point of yearData) {
      const currentValue = point[valueKey];
      if (currentValue > runningPeak) {
        runningPeak = currentValue;
      }
      if (runningPeak && runningPeak !== 0) {
        const currentDrawdown = ((currentValue - runningPeak) / runningPeak) * 100;
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
  strategyKey = "qaw",
  benchmarkKey = "nifty_50"
}) => {
  // Fetch data for the primary strategy. 
  // Assuming benchmark data is included in the same fetch as part of each record.
  const { data, isLoading, error } = useFetchStrategyNavField(strategyKey);
  
  const { categories, series } = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { categories: [], series: [] };
    }

    // Compute annual drawdowns for both strategy and benchmark
    const portfolioDD = computeAnnualDrawdowns(data, strategyKey);
    const benchmarkDD = computeAnnualDrawdowns(data, benchmarkKey);

    // Collect all distinct years from both series
    const allYearsSet = new Set([
      ...portfolioDD.map((x) => x.year),
      ...benchmarkDD.map((x) => x.year),
    ]);
    const allYears = [...allYearsSet].sort((a, b) => a - b);

    // Prepare data arrays for each year
    const portfolioData = allYears.map((yr) => {
      const found = portfolioDD.find((r) => r.year === yr);
      return found?.drawdown ?? null;
    });
    const benchmarkData = allYears.map((yr) => {
      const found = benchmarkDD.find((r) => r.year === yr);
      return found?.drawdown ?? null;
    });

    const chartSeries = [
      {
        name: "Portfolio Drawdown",
        color: "#fee9d6",
        data: portfolioData,
      },
      {
        name: "Benchmark Drawdown",
        color: "#d1a47b",
        data: benchmarkData,
      },
    ];

    return {
      categories: allYears,
      series: chartSeries,
    };
  }, [data, strategyKey, benchmarkKey]);

  const options = useMemo(
    () => ({
      chart: {
        type: "column",
        height: 600,
        backgroundColor: "#ffffff",
      },
      title: {
        text: "Annual Drawdowns Comparison with Averages",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        categories: categories,
        title: {
          text: "Year",
          style: { fontSize: "14px" },
        },
        labels: {
          style: { fontSize: "12px" },
          rotation: 0,
        },
        tickmarkPlacement: "between",
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
        headerFormat: '<span style="font-size:12px">{point.key}</span><br/>',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}%</b><br/>' +
          'Year: <b>{point.category}</b><br/>',
        shared: true,
        useHTML: true,
        style: {
          fontSize: "12px",
        },
      },
      plotOptions: {
        column: {
          grouping: true,
          shadow: false,
          borderWidth: 0,
          pointPadding: 0.1,
          pointPlacement: "between",
        },
      },
      series: series,
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
    [categories, series]
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
          Error loading chart data: {error.message}
        </div>
      </div>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default AnnualCalendarDrawdown;
