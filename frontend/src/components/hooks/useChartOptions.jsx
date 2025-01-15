import { useCallback, useState, useRef } from "react";

const useChartData = (strategy, isMobile, name, showDrawdown = false) => {
  const [chartOptions, setChartOptions] = useState(null);
  const prevDataLength = useRef(0);

  /**
   * Sort the data by date and ensure both series start from the same date with valid data.
   * Both series will be normalized to start at 1000.
   */
  const prepareChartData = useCallback(
    (data) => {
      if (!data || data.length === 0) return [];

      const strategyKey = strategy;      // e.g., "qaw"
      const benchmarkKey = "nifty_50";   // or adapt to your benchmark

      // 1) Sort by date ascending
      const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      // 2) Find earliest valid strategy index
      const earliestStrategyIndex = sortedData.findIndex((item) => {
        const val = parseFloat(item[strategyKey]);
        return !isNaN(val) && val !== 0;
      });

      // 3) Find earliest valid benchmark index
      const earliestBenchmarkIndex = sortedData.findIndex((item) => {
        const val = parseFloat(item[benchmarkKey]);
        return !isNaN(val) && val !== 0;
      });

      // If either series has no valid data, return empty
      if (earliestStrategyIndex === -1 || earliestBenchmarkIndex === -1) {
        return [];
      }

      // 4) Use the LATER of the two indexes (so both lines start together)
      const commonStartIndex = Math.max(
        earliestStrategyIndex,
        earliestBenchmarkIndex
      );

      // Get initial values for normalization
      const initialStrategyValue = parseFloat(sortedData[commonStartIndex][strategyKey]);
      const initialBenchmarkValue = parseFloat(sortedData[commonStartIndex][benchmarkKey]);

      // For drawdown calculation
      let maxNormalizedStrategyVal = 1000; // Start at 1000

      // 5) Slice from the common start onward and normalize
      const preparedData = sortedData.slice(commonStartIndex).map((item) => {
        // Normalize both series to start at 1000
        const curStrategyVal = parseFloat(item[strategyKey]) || 0;
        const normalizedStrategyVal = (curStrategyVal / initialStrategyValue) * 1000;

        const curBenchmarkVal = parseFloat(item[benchmarkKey]) || 0;
        const normalizedBenchmarkVal = (curBenchmarkVal / initialBenchmarkValue) * 1000;

        // Update max value for drawdown calculation using normalized value
        if (normalizedStrategyVal > maxNormalizedStrategyVal) {
          maxNormalizedStrategyVal = normalizedStrategyVal;
        }

        const drawdown =
          maxNormalizedStrategyVal > 0
            ? ((normalizedStrategyVal - maxNormalizedStrategyVal) / maxNormalizedStrategyVal) * 100
            : 0;

        return {
          date: item.date,
          strategyValue: normalizedStrategyVal,
          niftyValue: normalizedBenchmarkVal,
          drawdown,
          benchmark: item.benchmark,
        };
      });

      return preparedData;
    },
    [strategy]
  );

  /**
   * Build chart options from the prepared data.
   */
  const updateChartOptions = useCallback(
    (data) => {
      if (!data || data.length === 0) {
        setChartOptions(null);
        return;
      }

      const dates = data.map((item) => item.date);
      const strategyValues = data.map((item) => item.strategyValue);
      const niftyValues = data.map((item) => item.niftyValue);
      const drawdownValues = data.map((item) => item.drawdown);
      const benchmarkName = data[0]?.benchmark || "Benchmark";

      const mainYAxis = {
        title: { text: "Normalized Value (Starting at 1000)" },
        height: showDrawdown ? "70%" : "100%",
        labels: {
          formatter: function() {
            // Ensure full numeric values without abbreviation
            return this.value;
          },
        },
      };

      const drawdownYAxis = {
        title: { text: "Drawdown %" },
        top: "75%",
        height: "25%",
        offset: 0,
        opposite: true,
        reversed: true,
      };

      const series = [
        {
          name: name,
          data: strategyValues,
          color: "#945c39",
          lineWidth: 2,
          marker: {
            enabled: false,
            symbol: "circle",
            states: { hover: { enabled: true, radius: 5 } },
          },
          type: "line",
          animation: { duration: 2000 },
        },
        {
          name: benchmarkName,
          data: niftyValues,
          color: "#d1a47b",
          lineWidth: 2,
          marker: {
            enabled: false,
            symbol: "circle",
            states: { hover: { enabled: true, radius: 5 } },
          },
          type: "line",
          animation: { duration: 2000 },
        },
      ];

      if (showDrawdown) {
        series.push({
          name: "Drawdown",
          data: drawdownValues,
          color: "#FF0000",
          lineWidth: 1,
          yAxis: 1,
          type: "area",
          fillOpacity: 0.3,
          animation: { duration: 2000 },
        });
      }

      const options = {
        lang: {
          numericSymbols: []  // Disable abbreviations like "k", "M", etc.
        },
        title: "",
        xAxis: {
          type: "datetime",
          tickInterval: 365 * 24 * 3600 * 1000,
          dateTimeLabelFormats: {
            year: "%Y",
          },
          title: {
            text: "Year",
            style: {
              color: "#333333",
            },
          },
          labels: {
            style: {
              color: "#333333",
            },
          },
          gridLineColor: "#e0e0e0",
        },
        yAxis: showDrawdown ? [mainYAxis, drawdownYAxis] : [mainYAxis],
        series,
        chart: {
          height: isMobile ? 300 : showDrawdown ? 620 : 520,
          backgroundColor: "none",
          zoomType: "x",
          marginLeft: isMobile ? 50 : 80,  // Increase margin for non-mobile screens
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
            animation: { duration: 2000 },
            states: {
              hover: {
                enabled: true,
                lineWidthPlus: 1,
              },
            },
          },
        },
      };

      setChartOptions(options);
    },
    [isMobile, showDrawdown, name]
  );

  return {
    chartOptions,
    prepareChartData,
    updateChartOptions,
  };
};

export default useChartData;