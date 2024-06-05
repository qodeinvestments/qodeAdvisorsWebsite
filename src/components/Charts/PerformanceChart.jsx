import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PerformanceChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const portfolioHoldings = [
    {
      name: "Apple Inc.",
      //   symbol: "AAPL",
      shares: "10% of portfolio",
      //   value: "$7,500",
    },
    {
      name: "Microsoft Corp.",
      //   symbol: "MSFT",
      shares: "10% of portfolio",
      //   value: "$6,000",
    },
    {
      name: "Amazon.com Inc.",
      //   symbol: "AMZN",
      shares: "10% of portfolio",
      //   value: "$3,500",
    },
    {
      name: "Tesla Inc.",
      //   symbol: "TSLA",
      shares: "10% of portfolio",
      //   value: "$4,000",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
        const dates = jsonData.Sheet1.map((item) => item.Date);
        const momentum = jsonData.Sheet1.map((item) =>
          Math.trunc(item["Vol Adjusted Momentum"])
        );
        const nifty = jsonData.Sheet1.map((item) =>
          Math.trunc(item["Nifty 50"])
        );

        const options = {
          title: {
            text: "",
          },
          xAxis: {
            categories: dates,
            labels: {
              enabled: true,
              formatter: function () {
                const date = new Date(this.value);
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                return monthNames[date.getMonth()] + " " + date.getFullYear();
              },
            },
            tickPositions: [0, Math.floor(dates.length / 2), dates.length - 1], // Custom tick positions
          },
          yAxis: {
            title: {
              text: "",
            },
          },
          series: [
            {
              name: "Momentum",
              data: momentum,
              color: "rgba(75,192,192,1)",
              lineWidth: 2,
              marker: {
                enabled: false,
              },
            },
            {
              name: "Nifty 50",
              data: nifty,
              color: "rgba(192,75,192,1)",
              lineWidth: 2,
              marker: {
                enabled: false,
              },
            },
          ],
          legend: {
            enabled: false,
          },
          chart: {
            type: "line",
            zoomType: "x",
          },
          tooltip: {
            shared: true,
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
          },
          navigation: {
            buttonOptions: {
              enabled: true,
            },
          },
        };

        setChartOptions(options);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      <div className="w-full md:w-3/4 lg:w-4/6  bg-white border sm:p-10 rounded-lg">
        {chartOptions && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </div>
      <div className="w-full md:w-1/4 lg:w-2/6 flex flex-col space-y-4">
        <div className="rounded-lg border bg-white p-4 ">
          <h3 className="text-lg font-semibold mb-4">Risk Ratio</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Std Deviation:</span>
            <span className="font-bold">15%</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Sharpe Ratio:</span>
            <span className="font-bold">1.50%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Beta:</span>
            <span className="font-bold">0.88%</span>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 ">
          <h3 className="text-lg font-semibold mb-4">Portfolio Holdings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {portfolioHoldings.map((holding, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 items-start bg-gray-200 p-5 rounded-lg"
              >
                <div>
                  <span className="font-semibold">{holding.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">{holding.shares} shares</div>
                  <div className="font-bold">{holding.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
