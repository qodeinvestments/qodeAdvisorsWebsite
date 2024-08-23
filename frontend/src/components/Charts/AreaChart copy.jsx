import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AreaChart = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
        updateChartSeries(jsonData.Sheet1);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const updateChartSeries = (data) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 26);

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= sixMonthsAgo;
    });

    const naiveMomentumSeries = filteredData.map((item) => ({
      x: new Date(item.Date).getTime(),
      y: item["Naive Momentum"],
    }));

    const volAdjustedMomentumSeries = filteredData.map((item) => ({
      x: new Date(item.Date).getTime(),
      y: item["Vol Adjusted Momentum"],
    }));

    let maxToNow = 0;
    const drawdownSeries = filteredData.map((item) => {
      const currentValue = item["Naive Momentum"];
      if (currentValue > maxToNow) {
        maxToNow = currentValue;
      }
      // const drawdown =
      //   maxToNow > 0 ? ((currentValue - maxToNow) / maxToNow) * 100 : 0;
      // return {
      //   x: new Date(item.Date).getTime(),
      //   y: drawdown,
      // };
    });

    setSeries([
      { name: "Naive Momentum", data: naiveMomentumSeries, type: "line" },
      {
        name: "Vol Adjusted Momentum",
        data: volAdjustedMomentumSeries,
        type: "line",
      },
      // { name: "Drawdown", data: drawdownSeries, yAxis: 1, type: "line" },
    ]);
  };

  const chartOptions = {
    chart: {
      zoomType: "x",
      type: "line",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: "",
        },
        // height: "60%",
      },
      // {
      //   title: {
      //     text: "",
      //   },
      //   top: "65%",
      //   height: "35%",
      //   offset: 0,
      //   opposite: false,
      //   min: -100,
      //   max: 0,
      // },
    ],
    tooltip: {
      shared: true,
      // formatter: function () {
      //   let s = `<b>${Highcharts.dateFormat("%Y-%m-%d", this.x)}</b>`;
      //   this.points.forEach((point) => {
      //     s += `<br/>${point.series.name}: ${point.y.toFixed(2)}`;
      //   });
      //   return s;
      // },
    },
    series: series,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default AreaChart;
