import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HoldingDistribution = ({ strategy }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/qgfAllocation.json");
        if (!response.ok) {
          throw new Error("Failed");
        }
        const jsonData = await response.json();
        console.log(jsonData.sheet1);
      } catch (error) {}
    };
  }, [third]);

  const options = {
    chart: {
      type: "bar",
      height: 200, // Adjust this value to change the chart height
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [strategy],
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        stacking: "percent",
      },
      bar: {
        dataLabels: {
          enabled: true,
          format: "{y}%",
          color: "#000",
          style: {
            textOutline: "none",
          },
        },
      },
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.1f}%</b>",
    },
    series: [
      {
        name: "Large Cap",
        data: [50],
        color: "#d2fafd",
      },
      {
        name: "Mid Cap",
        data: [30],
        color: "#c9ffc7",
      },
      {
        name: "Small Cap",
        data: [20],
        color: "#ffcea5",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HoldingDistribution;
