import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DiscreteChart = ({ strategy }) => {
  const [chartData, setChartData] = useState([]);
  // // console.log(strategy);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        if (!jsonData.Sheet1) {
          throw new Error("No data found in the JSON response");
        }

        const currentYear = new Date().getFullYear(); // Get the current year
        const allData = jsonData.Sheet1.map((item) => {
          const [month, day, year] = item.Date.split("/");
          return {
            ...item,
            dateObject: new Date(year, month - 1, day), // Adding a date object for sorting and filtering
          };
        }).sort((a, b) => a.dateObject - b.dateObject); // Ensure the data is sorted

        // Historical chart data
        const chartData = allData
          .filter(
            (item) =>
              item.dateObject.getMonth() === 0 &&
              item.dateObject.getDate() === 1
          )
          .map((item, index, array) => {
            const nextItem = array[index + 1];
            const strategyKey = getStrategyKey(strategy);
            // // console.log("next item", nextItem[strategyKey]);
            const momentumPercentage = nextItem
              ? (nextItem[strategyKey] / item[strategyKey] - 1) * 100
              : 0;
            const niftyPercentage = nextItem
              ? (nextItem["Nifty 50"] / item["Nifty 50"] - 1) * 100
              : 0;

            return {
              name: item.Date.split("/")[2], // Extract the year from the date
              momentum: momentumPercentage,
              nifty: niftyPercentage,
            };
          });

        // Current year special computation
        const currentYearData = allData.filter(
          (item) => item.dateObject.getFullYear() === currentYear
        );
        if (currentYearData.length) {
          const firstData = currentYearData[0]; // First data point of the year
          const lastData = currentYearData[currentYearData.length - 1]; // Last data point of the year
          const momentumPercentage =
            (lastData[strategy] / firstData[strategy] - 1) * 100;
          const niftyPercentage =
            (lastData["Nifty 50"] / firstData["Nifty 50"] - 1) * 100;

          chartData.push({
            name: currentYear.toString(),
            momentum: momentumPercentage,
            nifty: niftyPercentage,
          });
        }

        setChartData(chartData);
        // // console.log(chartData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const getStrategyKey = (strategy) => {
    switch (strategy) {
      case "Vol Adjusted Momentum":
        return "Vol Adjusted Momentum";
      case "Naive Momentum":
        return "Naive Momentum";
      case "Nifty 50":
        return "Nifty 50";
      case "QGF":
        return "QGF";
      case "Short Flat":
        return "Short Flat";
      case "QGF + Short Flat":
        return "QGF + Short Flat";
      default:
        throw new Error(`Invalid strategy: ${strategy}`); // Provide the invalid strategy value in the error message
    }
  };

  const chartOptions = {
    chart: {
      type: "column",
      backgroundColor: "none",
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      // Remove fixed height
      height: null,
    },
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
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Year",
      },
      labels: {
        formatter: function () {
          return this.value;
        },
        style: {
          fontSize: "11px",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      plotLines: [
        {
          color: "darkgray",
          width: 1,
          value: 0,
        },
      ],
      minRange: 0.1,
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: "none",
          format: "{y:.2f}%",
          style: {
            fontSize: "10px",
          },
        },
      },
    },
    series: [
      {
        name: getStrategyKey(strategy),
        data: chartData.map((item) => ({ name: item.name, y: item.momentum })),
        color: "rgba(255,133,3)",
      },
      {
        name: "Nifty 50",
        data: chartData.map((item) => ({ name: item.name, y: item.nifty })),
        color: "rgba(6,118,141)",
      },
    ],
    legend: {
      itemStyle: {
        fontSize: "11px",
      },
    },
  };

  useEffect(() => {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ",",
      },
    });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default DiscreteChart;
