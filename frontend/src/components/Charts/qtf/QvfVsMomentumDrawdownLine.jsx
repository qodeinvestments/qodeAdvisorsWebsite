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

const QvfVsMomentumDrawdownLine = () => {
  const fieldNames = useMemo(() => ["qtf", "nifty_midcap_150_momentum_50"], []);

  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames);

  // Updated to a brown/beige palette
  const seriesConfig = [
    { key: "qtf", name: "QTF", color: "#A0522D" }, // Brown
    { key: "nifty_midcap_150_momentum_50", name: "Nifty Midcap 150 Momentum 50", color: "#d1a47b" } // Beige
  ];

  const processedSeries = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Filter out points where at least one series has valid data
    const validData = sortedData.filter((d) =>
      seriesConfig.some(
        (config) => d[config.key] !== null && !isNaN(parseFloat(d[config.key]))
      )
    );

    return seriesConfig.map((config) => {
      const drawdownData = calculateDrawdowns(validData, config.key).map(
        (item) => [
          new Date(item.date).getTime(),
          parseFloat(item.drawdown.toFixed(2)),
        ]
      );
      return {
        name: config.name,
        data: drawdownData,
        color: config.color,
        lineWidth: 2,
        type: "line",
      };
    });
  }, [data]);

  const options = useMemo(
    () => ({
      chart: {
        type: "line",
        backgroundColor: "#ffffff",
        style: { fontFamily: 'DM Sans, sans-serif' },

        height: window.innerWidth < 768 ? 400 : 500,

      },
      title: {
        text: "",
        style: { color: "#333333", fontSize: "18px" },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 2* 365 * 24 * 3600 * 1000, // one year
        dateTimeLabelFormats: { year: "%Y" },
        title: {
          text: "Year",
          style: { color: "#333333" },
        },
        labels: { style: { color: "#333333" } },
        gridLineColor: "#e0e0e0",
      },
      yAxis: {
        title: {
          text: "",
          style: { color: "#333333" },
        },
        max: 0,
        min: -40,
        tickInterval: 10,
        labels: {
          format: "{value}%",
          style: { color: "#333333" },
        },
        gridLineColor: "#e0e0e0",
      },
      tooltip: {
        shared: true,
        backgroundColor: "#ffffff",
        borderColor: "#d1a47b",
        style: { color: "#333333" },
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
      credits: { enabled: false },
      legend: {
        enabled: true,
        itemStyle: { color: "#333333" },
      },
    }),
    [processedSeries]
  );

  if (isLoading) return <div className="w-full">Loading...</div>;
  if (error) return <div className="w-full">Error loading data: {error}</div>;

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default QvfVsMomentumDrawdownLine;
