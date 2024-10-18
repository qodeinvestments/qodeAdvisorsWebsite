import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OptimizedChart = ({ data, isMobile }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const optimizeData = (rawData, maxPoints = 1000) => {
      if (rawData.length <= maxPoints) return rawData;

      const skipFactor = Math.ceil(rawData.length / maxPoints);
      return rawData.filter((_, index) => index % skipFactor === 0);
    };

    const optimizedNavData = optimizeData(data.navData);
    const optimizedDrawdownData = optimizeData(data.drawdownData);

    setChartOptions({
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            const date = new Date(this.value);
            return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
          },
        },
      },
      yAxis: [
        {
          title: {
            text: "Value",
          },
          height: "60%",
          min: 0,
          tickAmount: 4,
        },
        {
          title: {
            text: "",
          },
          opposite: false,
          top: "60%",
          height: "40%",
        },
      ],
      series: [
        {
          name: "NAV",
          data: optimizedNavData,
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
          yAxis: 0,
          animation: { duration: 2000 },
        },
        {
          name: "Drawdown",
          data: optimizedDrawdownData,
          color: "rgba(250, 65, 65, 1)",
          lineWidth: 2,
          marker: {
            enabled: false,
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(0, 0, 0, 0.2)"],
              [1, "rgba(0, 0, 0, 0.9)"],
            ],
          },
          type: "line",
          yAxis: 1,
          threshold: 0,
          animation: { duration: 2000 },
        },
      ],
      chart: {
        height: isMobile ? 500 : 720,
        backgroundColor: "none",
        zoomType: "x",
        marginLeft: isMobile ? 0 : 0,
        marginRight: isMobile ? 0 : 0,
      },
      tooltip: {
        shared: true,
        formatter: function () {
          let tooltipHtml = `<b>${Highcharts.dateFormat("%Y-%m-%d", this.x)}</b><br/>`;
          this.points.forEach((point) => {
            tooltipHtml += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${Math.round(point.y)}</b><br/>`;
          });
          return tooltipHtml;
        },
      },
      legend: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: !isMobile,
      },
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
        area: {
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    });
  }, [data, isMobile]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default OptimizedChart;
