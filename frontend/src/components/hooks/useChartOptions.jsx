import { useCallback, useState, useRef } from "react";

const useChartData = (strategy, isMobile, showDrawdown = false) => {
  const [chartOptions, setChartOptions] = useState(null);
  const prevDataLength = useRef(0);

  const prepareChartData = useCallback((data) => {
    const strategyKey = "total_portfolio_nav";
    const initialStrategyValue = parseFloat(data[0][strategyKey]);
    const initialNiftyValue = parseFloat(
      data[0]["benchmark_values"] || data[0]["benchmark_values"]
    );

    let maxStrategyValue = initialStrategyValue;
    return data.map((item) => {
      const currentValue = parseFloat(item[strategyKey]);
      const drawdown =
        maxStrategyValue > currentValue
          ? (currentValue / maxStrategyValue - 1) * 100
          : 0;
      maxStrategyValue = Math.max(maxStrategyValue, currentValue);

      return {
        date: item.date,
        strategyValue: (currentValue / initialStrategyValue) * 100,
        niftyValue:
          (parseFloat(item["benchmark_values"] || item["benchmark_values"]) /
            initialNiftyValue) *
          100,
        drawdown,
        benchmark: item.benchmark,
      };
    });
  }, []);

  const updateChartOptions = useCallback(
    (data) => {
      const dates = data.map((item) => item.date);
      const strategyValues = data.map((item) => Math.trunc(item.strategyValue));
      const niftyValues = data.map((item) => Math.trunc(item.niftyValue));
      const drawdownValues = data.map((item) => Math.trunc(item.drawdown));
      const benchmarkName = data[0].benchmark;

      const mainYAxis = {
        title: { text: "" },
        height: showDrawdown ? "70%" : "100%",
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
          animation: { duration: 2000 },
        },
        {
          name: benchmarkName,
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
        title: "",
        xAxis: {
          categories: dates,
          labels: {
            formatter: function () {
              const date = new Date(this.value);
              return `${date.getFullYear()}`;
            },
          },
          tickPositions: [0, Math.floor(dates.length / 2), dates.length - 1],
        },
        yAxis: showDrawdown ? [mainYAxis, drawdownYAxis] : [mainYAxis],
        series,
        chart: {
          height: isMobile ? 300 : showDrawdown ? 620 : 520,
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
    [strategy, isMobile, showDrawdown]
  );

  return {
    chartOptions,
    prepareChartData,
    updateChartOptions,
  };
};

export default useChartData;
