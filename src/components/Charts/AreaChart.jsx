import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  const [series, setSeries] = useState([]); // Manage series separately

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#008000", "rgb(239, 44, 44)"], // Series and tooltip marker colors
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 1,
      curve: "smooth",
      colors: ["#008000", "rgb(239, 44, 44)"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 10, 10],
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
        theme: "dark", // Optional: Defines the theme of the tooltip
        marker: {
          show: false, // Ensures the color indicator is visible
        },
        x: {
          show: false,
        },
        y: {
          formatter: (val) => `${val.toFixed(2)}`, // Format tooltip values
          title: {
            formatter: (seriesName) => `${seriesName}: `, // Custom series name formatting
          },
        },
      },
    },
    grid: {
      show: false,
    },
  };

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
    // Calculate the date 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Filter the data to include only the past 6 months
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= sixMonthsAgo;
    });

    // Extracting series data for both 'Naive Momentum' and 'Vol Adjusted Momentum'
    const naiveMomentumSeries = filteredData.map((item) => ({
      x: new Date(item.Date), // Convert string Date to Date object
      y: item["Naive Momentum"], // Access the 'Naive Momentum' value
    }));

    const volAdjustedMomentumSeries = filteredData.map((item) => ({
      x: new Date(item.Date), // Convert string Date to Date object
      y: item["Vol Adjusted Momentum"], // Access the 'Vol Adjusted Momentum' value
    }));

    // Update the series state to include both data series
    setSeries([
      { name: "Naive Momentum", data: naiveMomentumSeries },
      // { name: "Vol Adjusted Momentum", data: volAdjustedMomentumSeries },
    ]);
  };

  return (
    <div id="chart">
      <Chart options={chartOptions} series={series} type="area" height={200} />
    </div>
  );
};

export default AreaChart;
