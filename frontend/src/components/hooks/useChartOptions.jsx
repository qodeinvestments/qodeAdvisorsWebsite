import { useCallback, useState, useMemo, useRef } from "react";

const useChartData = (strategy, isMobile) => {
  const [chartOptions, setChartOptions] = useState(null);
  const prevDataLength = useRef(0);

  const prepareChartData = useCallback((data) => {
    const strategyKey = "total_portfolio_nav";
    const initialStrategyValue = parseFloat(data[0][strategyKey]);
    const initialNiftyValue = parseFloat(
      data[0]["Nifty 50"] || data[0]["nifty"]
    );

    return data.map((item) => ({
      date: item.date,
      strategyValue:
        (parseFloat(item[strategyKey]) / initialStrategyValue) * 100,
      niftyValue:
        (parseFloat(item["Nifty 50"] || item["nifty"]) / initialNiftyValue) *
        100,
    }));
  }, []);

  const updateChartOptions = useCallback(
    (data) => {
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
              return `${date.getFullYear()}`; // Ensures the labels are formatted correctly
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
              enabled: false,
              states: {
                hover: {
                  enabled: true,
                  radius: 5,
                },
              },
            },
            type: "line",
            animation: { duration: 2000 }, // Explicitly define animation duration
          },
          {
            name: "Nifty 50",
            data: niftyValues,
            color: "#000",
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
            animation: { duration: 2000 }, // Explicitly define animation duration
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
            animation: { duration: 2000 }, // Explicitly define animation for the entire series
            states: {
              hover: {
                enabled: true,
                lineWidthPlus: 1,
              },
            },
          },
        },
      };

      // Apply the new options with animation
      setChartOptions(options);
    },
    [strategy, isMobile]
  );

  return {
    chartOptions,
    prepareChartData,
    updateChartOptions,
  };
};

export default useChartData;
