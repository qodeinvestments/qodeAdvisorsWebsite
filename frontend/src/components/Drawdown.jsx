import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Drawdown = ({ data = [], strategyKey = "qaw", benchmarkKey = "nifty_50", strategyName }) => {
  const defaultStrategyName = "QAW";
  const defaultBenchmarkName = "Nifty 50";

  const calculateDrawdowns = (data, key) => {
    if (!data.length) return [];
    
    let peak = data[0][key];
    let drawdowns = [];
    
    data.forEach(item => {
      const value = parseFloat(item[key]);
      if (value > peak) {
        peak = value;
      }
      const drawdown = ((value - peak) / peak) * 100;
      drawdowns.push([
        new Date(item.date).getTime(),
        parseFloat(drawdown.toFixed(2))
      ]);
    });
    
    return drawdowns;
  };

  const processedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return { strategy: [], benchmark: [] };
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      strategy: calculateDrawdowns(sortedData, strategyKey),
      benchmark: calculateDrawdowns(sortedData, benchmarkKey)
    };
  }, [data, strategyKey, benchmarkKey]);

  const options = useMemo(() => {
    const strategySeriesName = strategyName || defaultStrategyName;
    const benchmarkSeriesName = defaultBenchmarkName;

    return {
      chart: {
        type: "area",
        backgroundColor: "#ffffff",
        style: {
          fontFamily: "Arial, sans-serif",
        },
        height: 600,
      },
      title: {
        text: "Drawdown Chart",
        style: {
          color: "#333333",
          fontSize: "18px",
        },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 365 * 24 * 3600 * 1000, // Interval for 1 year in milliseconds
        dateTimeLabelFormats: {
          year: "%Y", // Display only the year
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
      
      yAxis: {
        title: {
          text: "Drawdown (%)",
          style: {
            color: "#333333",
          },
        },
        max: 0,
        min: -40,
        tickInterval: 5,
        labels: {
          format: "{value}%",
          style: {
            color: "#333333",
          },
        },
        gridLineColor: "#e0e0e0",
      },
      tooltip: {
        shared: true,
        backgroundColor: "#ffffff",
        borderColor: "#d1a47b",
        style: {
          color: "#333333",
        },
        formatter: function () {
          return `<b>Date:</b> ${Highcharts.dateFormat('%b %e, %Y', this.x)}<br>` +
            this.points
              .map(point => `<b>${point.series.name}:</b> ${point.y.toFixed(2)}%`)
              .join("<br>");
        },
      },
      series: [
      
        {
          name: benchmarkSeriesName,
          data: processedData.benchmark,
          color: "#f4e4d4",
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "#fee9d6"],
            ],
          },
          lineWidth: 0,
          type: "area",
        },
        {
          name: strategySeriesName,
          data: processedData.strategy,
          color: "#b87c4c",
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "#d1a47b"],
            ],
          },
          lineWidth: 0,
          type: "area",
        },
      ],
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: "#333333",
        },
      },
    };
  }, [processedData, strategyName]);

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Drawdown;