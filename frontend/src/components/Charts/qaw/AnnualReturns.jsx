import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchStrategyNavField from "../../../hooks/useFetchStrategyNavData";

function calculateAnnualReturns(data, valueKey) {
  if (!data || !data.length) return [];
  
  const dataByYear = data.reduce((acc, cur) => {
    const year = new Date(cur.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push({
      ...cur,
      [valueKey]: parseFloat(cur[valueKey])
    });
    return acc;
  }, {});

  return Object.keys(dataByYear)
    .sort()
    .map(year => {
      const yearlyData = dataByYear[year].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const startValue = yearlyData[0][valueKey];
      const endValue = yearlyData[yearlyData.length - 1][valueKey];

      return startValue > 0 ? {
        year: parseInt(year, 10),
        returnValue: Number(((endValue / startValue - 1) * 100).toFixed(2))
      } : null;
    })
    .filter(Boolean);
}

function calculateCAGR(data, valueKey) {
  if (!data || data.length < 2) return null;

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const first = parseFloat(sortedData[0][valueKey]);
  const last = parseFloat(sortedData[sortedData.length - 1][valueKey]);
  
  if (first <= 0) return null;

  const startDate = new Date(sortedData[0].date);
  const endDate = new Date(sortedData[sortedData.length - 1].date);
  const numYears = (endDate - startDate) / (365.25 * 24 * 60 * 60 * 1000);

  const cagr = (Math.pow(last / first, 1 / numYears) - 1) * 100;
  return Number(cagr.toFixed(2));
}

const AnnualReturns = ({ propData, strategyKey = "qaw", title = "Annual Returns Comparison" }) => {
  // Separate fetches for qaw and nifty_50
  const { data: dataQaw, isLoading: isLoadingQaw, error: errorQaw } = useFetchStrategyNavField("qaw");
  const { data: dataNifty, isLoading: isLoadingNifty, error: errorNifty } = useFetchStrategyNavField("nifty_50");

  // Combine loading and error states
  const isLoading = isLoadingQaw || isLoadingNifty;
  const error = errorQaw || errorNifty;

  const combinedData = useMemo(() => {
    if (!dataQaw || !dataNifty) return null;

    // Assuming both datasets are arrays of objects with a 'date' key.
    // Merge data by matching dates.
    return dataQaw.map(qItem => {
      const matchingNifty = dataNifty.find(nItem => nItem.date === qItem.date);
      return {
        ...qItem,
        nifty_50: matchingNifty ? matchingNifty.nifty_50 : null
      };
    });
  }, [dataQaw, dataNifty]);

  const chartData = useMemo(() => {
    const data = propData || combinedData;
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        categories: [],
        series: [],
        plotLines: []
      };
    }

    const strategyReturns = calculateAnnualReturns(data, strategyKey);
    const benchmarkReturns = calculateAnnualReturns(data, "nifty_50");

    const allYears = [
      ...new Set([
        ...strategyReturns.map(x => x.year),
        ...benchmarkReturns.map(x => x.year)
      ])
    ].sort();

    const strategyData = allYears.map(year => {
      const found = strategyReturns.find(r => r.year === year);
      return found ? found.returnValue : null;
    });

    const benchmarkData = allYears.map(year => {
      const found = benchmarkReturns.find(r => r.year === year);
      return found ? found.returnValue : null;
    });

    const cagrStrategy = calculateCAGR(data, strategyKey);
    const cagrBenchmark = calculateCAGR(data, "nifty_50");

    const plotLines = [];
    if (cagrStrategy !== null) {
      plotLines.push({
        value: cagrStrategy,
        color: "blue",
        dashStyle: "ShortDash",
        width: 2,
        label: {
          text: `Strategy CAGR: ${cagrStrategy.toFixed(2)}%`,
          style: { color: "blue" }
        }
      });
    }
    if (cagrBenchmark !== null) {
      plotLines.push({
        value: cagrBenchmark,
        color: "red",
        dashStyle: "ShortDash",
        width: 2,
        label: {
          text: `Nifty 50 CAGR: ${cagrBenchmark.toFixed(2)}%`,
          style: { color: "red" }
        }
      });
    }

    return {
      categories: allYears,
      series: [
        {
          name: "Strategy",
          color: "#fee9d6",
          data: strategyData
        },
        {
          name: "Nifty 50",
          color: "#d1a47b",
          data: benchmarkData
        }
      ],
      plotLines
    };
  }, [propData, combinedData, strategyKey]);

  const options = useMemo(() => ({
    chart: {
      type: "column",
      height: 600,
      backgroundColor: "#ffffff"
    },
    title: {
      text: title,
      style: {
        fontSize: "20px",
        fontWeight: "bold"
      }
    },
    xAxis: {
      categories: chartData.categories,
      title: { text: "Year" }
    },
    yAxis: {
      title: { text: "Return (%)" },
      plotLines: chartData.plotLines,
      labels: {
        format: "{value}%"
      }
    },
    tooltip: {
      shared: true,
      valueDecimals: 2,
      valueSuffix: "%"
    },
    plotOptions: {
      column: {
        grouping: true,
        shadow: false,
        borderWidth: 0
      }
    },
    series: chartData.series,
    credits: { enabled: false },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal"
    }
  }), [chartData, title]);

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
