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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Calculator from "../Calculator";
const PerformanceChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [timeRange, setTimeRange] = useState("ALL"); // State to manage selected time range
 

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
      normalizedMomentum:
        (item["Vol Adjusted Momentum"] / initialMomentum) * 100,
      normalizedNifty: (item["Nifty 50"] / initialNifty) * 100,
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

      filteredData = data.filter(
        (item) => new Date(item.Date) >= filteredDates
      );
    }

    const normalizedData = normalizeData(filteredData);

    const dates = normalizedData.map((item) => item.Date);
    const momentum = normalizedData.map((item) =>
      Math.trunc(item.normalizedMomentum)
    );
    const nifty = normalizedData.map((item) =>
      Math.trunc(item.normalizedNifty)
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
      <Calculator/>
    </div>
  );
};

export default PerformanceChart;
