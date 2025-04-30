import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchStrategyNavField from "../../../hooks/useFetchStrategyNavData";

function calculateDrawdowns(data, key) {
  if (!data.length) return [];
  
  let peak = parseFloat(data[0][key]);
  let currentDrawdown = 0;
  
  return data.map((point) => {
    const value = parseFloat(point[key]);
    if (value > peak) {
      peak = value;
      currentDrawdown = 0;
    } else {
      currentDrawdown = ((value - peak) / peak) * 100;
    }
    return {
      date: point.date,
      drawdown: currentDrawdown,
    };
  });
}

const MultiIndexDrawdownLine = () => {
  const fieldNames = useMemo(
    () => [
      "nifty_midcap_150_momentum_50",
      "nifty_alpha_50",
      "nifty_200_quality_30",
      "nifty_low_volatility_50",
      "nifty_500_value_50",
    ],
    []
  );

  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames);

  // Updated to a brown/beige palette
  const indices = [
    { key: "nifty_midcap_150_momentum_50",  name: "NSE 500 Momentum 50",     color: "#fa8c00" }, // Sienna
    { key: "nifty_low_volatility_50", name: "NIFTY LOW VOLATILITY 50", color: "#ffca76" }, // SaddleBrown
    { key: "nifty_200_quality_30",    name: "NIFTY200 QUALITY 30",     color: "#c4c4c4" }, // Camel
    { key: "nifty_alpha_50",          name: "NIFTY ALPHA 50",          color: "#474747" }, // BurlyWood
    { key: "nifty_500_value_50",      name: "NIFTY500 VALUE 50",       color: "#969696" }, // Wheat
  ];

  const processedSeries = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Filter out points where at least one index value is valid.
    const validData = sortedData.filter((d) =>
      indices.some(
        (index) => d[index.key] !== null && !isNaN(parseFloat(d[index.key]))
      )
    );

    return indices.map((index) => {
      const drawdownData = calculateDrawdowns(validData, index.key).map(
        (item) => [
          new Date(item.date).getTime(),
          parseFloat(item.drawdown.toFixed(2)),
        ]
      );
      return {
        name: index.name,
        data: drawdownData,
        color: index.color,
        lineWidth: 2,
        type: "line",
      };
    });
  }, [data, indices]);

  const options = useMemo(
    () => ({
      chart: {
        type: "line",
        backgroundColor: "#ffffff",
        style: { fontFamily: 'DM Sans, sans-serif' },
        height: window.innerWidth < 768 ? 400 : 600,
      },
      title: {
        text: "",
        style: {
          color: "#333333",
          fontSize: "18px",
        },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 3 * 365 * 24 * 3600 * 1000, // one year
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
      yAxis: {
        title: {
          text: "",
          style: {
            color: "#333333",
          },
        },
        max: 0,
        min: -90,
        tickInterval: 10,
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
          return (
            `<b>Date:</b> ${Highcharts.dateFormat("%b %e, %Y", this.x)}<br>` +
            this.points
              .map(
                (point) =>
                  `<b>${point.series.name}:</b> ${point.y.toFixed(2)}%`
              )
              .join("<br>")
          );
        },
      },
      series: processedSeries,
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: "#333333",
        },
      },
    }),
    [processedSeries]
  );

  if (isLoading) return <p>Loading chart data...</p>;
  if (error) return <p>Error loading chart data: {error}</p>;

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MultiIndexDrawdownLine;
