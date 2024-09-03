import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RollingReturns = ({ strategy }) => {
  const [timeRange, setTimeRange] = useState("5");
  const [chartOptions, setChartOptions] = useState(null);
  const [rollingReturns, setRollingReturns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        const filteredData = jsonData.Sheet1.filter(
          (item) => new Date(item.Date).getDate() === 1
        );

        const processedData = chartData(filteredData, timeRange);
        const options = createChartOptions(processedData);
        setChartOptions(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [timeRange]);

  const chartData = (data) => {
    let filteredData = data;

    const rollingReturnsData = cagrCalc(filteredData.reverse());
    return rollingReturnsData;
  };

  function cagrCalc(data) {
    const resultArray = [];
    for (let i = 0; i < data.length; i++) {
      const currentElement = data[i];
      const currentValue = currentElement[strategy];
      const currentNiftyValue = currentElement["Nifty 50"];
      const currentDate = new Date(currentElement["Date"]);

      const fiveYearsAgoDate = new Date(
        currentDate.getFullYear() - timeRange,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const fiveYearsAgoFormattedDate = fiveYearsAgoDate.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      const fiveYearsAgoIndex = data.findIndex(
        (item) => item["Date"] === fiveYearsAgoFormattedDate
      );

      if (fiveYearsAgoIndex !== -1) {
        const fiveYearsAgoValue = data[fiveYearsAgoIndex][strategy];
        const niftyValue = data[fiveYearsAgoIndex]["Nifty 50"];
        const cagr =
          Math.pow(currentValue / fiveYearsAgoValue, 1 / timeRange) - 1;
        const nifty =
          Math.pow(currentNiftyValue / niftyValue, 1 / timeRange) - 1;
        resultArray.push({
          // current: currentDate.toLocaleDateString(),
          pastDate: fiveYearsAgoFormattedDate,
          date: formattedDate,
          cagr: cagr * 100,
          niftyValue: nifty * 100,
        });
      } else {
      }
    }
    // // console.log(resultArray);
    return resultArray;
  }

  const createChartOptions = (rollingReturnsData) => {
    rollingReturnsData.reverse();
    const chartOptions = {
      title: { text: "" },
      xAxis: {
        type: "category",
        labels: {
          formatter: function () {
            return rollingReturnsData[this.value].date;
          },
        },
      },
      yAxis: { title: { text: "" } },
      tooltip: {
        formatter: function () {
          const date = rollingReturnsData[this.point.x].date;
          const cagr = this.point.y.toFixed(2);
          return `Date: ${date}<br>CAGR: ${cagr}%`;
        },
      },
      series: [
        {
          type: "line",
          color: "rgba(26,175,86)",
          name: "Rolling Returns",
          data: rollingReturnsData.map((data, index) => [index, data.cagr]),
          // fillColor: {
          //   linearGradient: {
          //     x1: 0,
          //     y1: 0,
          //     x2: 0,
          //     y2: 1,
          //   },
          //   stops: [
          //     [0, "rgba(26,175,86, 0.6)"], // Light blue at the top
          //     [1, "rgba(26,175,86, 0.2)"], // Transparent blue at the bottom
          //   ],
          // },
          marker: {
            enabled: false,
          },
        },
        {
          type: "line",
          name: "Nifty 50",
          color: "rgba(250, 65, 65)",
          data: rollingReturnsData.map((data, index) => [
            index,
            data.niftyValue,
          ]),
          // fillColor: {
          //   linearGradient: {
          //     x1: 0,
          //     y1: 0,
          //     x2: 0,
          //     y2: 1,
          //   },
          //   stops: [
          //     [0, "rgba(250, 65, 65, 0.6)"], // Light blue at the top
          //     [1, "rgba(250, 65, 65, 0.1)"], // Transparent blue at the bottom
          //   ],
          // },
          marker: {
            enabled: false,
          },
        },
      ],
    };
    return chartOptions;
  };

  return (
    <div>
      <div className="flex gap-5 mb-10">
        <button
          className={`px-3 py-1 rounded-md transition-colors duration-300 ${
            timeRange === "1"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setTimeRange("1")}
        >
          1Y
        </button>
        <button
          className={`px-3 py-1 rounded-md transition-colors duration-300 ${
            timeRange === "3"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setTimeRange("3")}
        >
          3Y
        </button>
        <button
          className={`px-3 py-1 rounded-md transition-colors duration-300 ${
            timeRange === "5"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setTimeRange("5")}
        >
          5Y
        </button>
      </div>
      {chartOptions && (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </div>
  );
};

export default RollingReturns;
