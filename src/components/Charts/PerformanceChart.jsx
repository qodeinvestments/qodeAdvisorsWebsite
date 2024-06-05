import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const PerformanceChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL"); // State to manage selected time range

  const portfolioHoldings = [
    {
      name: "Apple Inc.",
      shares: "10% of portfolio",
    },
    {
      name: "Microsoft Corp.",
      shares: "10% of portfolio",
    },
    {
      name: "Amazon.com Inc.",
      shares: "10% of portfolio",
    },
    {
      name: "Tesla Inc.",
      shares: "10% of portfolio",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        const jsonData = await response.json();
        updateChartOptions(jsonData.Sheet1, timeRange); // Call updateChartOptions with initial data and time range
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [timeRange]);

  const normalizeData = (data) => {
    const initialMomentum = data[0]["Vol Adjusted Momentum"];
    const initialNifty = data[0]["Nifty 50"];

    return data.map((item) => ({
      ...item,
      normalizedMomentum: ((item["Vol Adjusted Momentum"] / initialMomentum) * 100),
      normalizedNifty: ((item["Nifty 50"] / initialNifty) * 100),
    }));
  };

  const updateChartOptions = (data, range) => {
    let filteredData = data;

    if (range !== "ALL") {
      const now = new Date();
      let filteredDates;

      switch (range) {
        case "YTD":
          filteredDates = new Date(now.getFullYear(), 0, 1);
          break;
        case "6M":
          filteredDates = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case "1Y":
          filteredDates = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        case "5Y":
          filteredDates = new Date(now.setFullYear(now.getFullYear() - 5));
          break;
        default:
          filteredDates = new Date(0);
      }

      filteredData = data.filter((item) => new Date(item.Date) >= filteredDates);
    }

    const normalizedData = normalizeData(filteredData);

    const dates = normalizedData.map((item) => item.Date);
    const momentum = normalizedData.map((item) => Math.trunc(item.normalizedMomentum));
    const nifty = normalizedData.map((item) => Math.trunc(item.normalizedNifty));

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
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/4 lg:w-4/6 bg-white border sm:p-10 rounded-lg">
        <Tabs value="chart1">
          <div className="flex flex-col sm:flex-row items-center justify-between p-2">
            <TabsHeader className="bg-gray-200 p-1">
              <Tab key="chart1" value="chart1">
                Trailing
              </Tab>
              <Tab key="chart2" value="chart2">
                Discrete
              </Tab>
              <Tab key="chart3" value="chart3">
                Rolling
              </Tab>
            </TabsHeader>
            <div className="flex gap-2">
              <button
                className="bg-gray-200 py-1 px-2 rounded"
                onClick={() => setTimeRange("YTD")}
              >
                YTD
              </button>
              <button
                className="bg-gray-200 py-2 px-4 rounded"
                onClick={() => setTimeRange("6M")}
              >
                6M
              </button>
              <button
                className="bg-gray-200 py-2 px-4 rounded"
                onClick={() => setTimeRange("1Y")}
              >
                1Y
              </button>
              <button
                className="bg-gray-200 py-2 px-4 rounded"
                onClick={() => setTimeRange("5Y")}
              >
                5Y
              </button>
              <button
                className="bg-gray-200 py-2 px-4 rounded"
                onClick={() => setTimeRange("ALL")}
              >
                ALL
              </button>
            </div>
          </div>
          <TabsBody>
            <TabPanel key="chart1" value="chart1">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
            <TabPanel key="chart2" value="chart2">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
            <TabPanel key="chart3" value="chart3">
              {chartOptions && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full md:w-1/4 lg:w-2/6 flex flex-col space-y-4">
        <div className="rounded-lg border bg-white p-4">
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
        <div className="rounded-lg border bg-white p-4">
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
