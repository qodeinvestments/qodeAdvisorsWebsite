// src/components/CAGRBarChart.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CAGRBarChart = ({ cagrData }) => {
  // Extracting max and min values for each period
  const categories = ["1 yr CAGR", "3 yr CAGR", "5 yr CAGR"];
  const maxValues = categories.map(
    (category) => cagrData[category]?.top_5_max_values[0] || 0
  );
  const minValues = categories.map(
    (category) => cagrData[category]?.top_5_min_values[0] || 0
  );
  const avgValues = categories.map(
    (category) => cagrData[category]?.average_value || 0
  );

  // Chart options
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "CAGR",
    },
    xAxis: {
      categories: categories,
      title: {
        text: "CAGR Periods",
      },
    },
    yAxis: {
      min: Math.min(...minValues) - 10, // Set minimum y-axis value slightly below the smallest min value
      title: {
        text: "CAGR (%)",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        groupPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Max Values",
        data: maxValues,
        color: "#4CAF50", // Green color for max values
      },
      {
        name: "Min Values",
        data: minValues,
        color: "#F44336", // Red color for min values
      },
      {
        name: "Average Values",
        data: avgValues,
        color: "#2196F3", // Blue color for average values
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="my-8">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CAGRBarChart;
