// src/components/CAGRBarChart.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Text from "../common/Text";
import useMobileWidth from "../hooks/useMobileWidth";

const CAGRBarChart = ({ cagrData }) => {
  // Extracting max and min values for each period
  const { isMobile } = useMobileWidth();

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
      height: isMobile ? 500 : 520, // Adjusted based on mobile
      backgroundColor: "none",
      zoomType: "x",
      marginLeft: isMobile ? 0 : 50,
      marginRight: isMobile ? 0 : 50,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories, // Use your array of categories here
      title: {
        text: "CAGR Periods", // Title for the x-axis
        margin: 20, // Adjust margin below the title
      },
      labels: {
        rotation: 0, // Control the rotation of labels (optional, set to 0 for horizontal)
        style: {
          fontSize: "12px", // Optional, customize the font size of the labels
        },
      },
      tickLength: 5, // Optional, length of the tick marks (can be adjusted)
      lineWidth: 1, // Optional, width of the x-axis line (default is 1)
    },
    yAxis: {
      min: Math.min(...minValues), // Set minimum y-axis value slightly below the smallest min value
      title: {
        text: "",
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
        color: "#4ade80", // Green color for max values
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
              align: "top",
              verticalAlign: "bottom",
              y: 0, // Reset to 0 for mobile view
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Text className="font-subheading mt-6 text-brown text-subheading mb-2">
        CAGR (%)
      </Text>
      <div className="">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </>
  );
};

export default CAGRBarChart;
