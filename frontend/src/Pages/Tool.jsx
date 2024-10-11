import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Button from "../components/common/Button";

const Tool = () => {
  const [file, setFile] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_PROD_URL
      : import.meta.env.VITE_BACKEND_DEV_URL;

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const calculateDrawdown = (data) => {
    if (data.every((val) => val === null)) return Array(data.length).fill(null);

    const validData = data.filter((val) => val !== null);
    if (validData.length === 0) return Array(data.length).fill(null);

    let peak = validData[0];
    return data.map((value) => {
      if (value === null) return null;
      if (value > peak) peak = value;
      return ((value - peak) / peak) * 100;
    });
  };

  const normalizeData = (data) => {
    if (data.every((val) => val === null)) return Array(data.length).fill(null);

    const validData = data.filter((val) => val !== null);
    if (validData.length === 0) return Array(data.length).fill(null);

    const firstValue = validData[0];
    return data.map((value) =>
      value === null ? null : (value / firstValue) * 100
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) return;

    const url = `${API_URL}/uploads`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);

    axios
      .post(url, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        const parsedData = response.data;
        setRawData(parsedData);
        updateChart(parsedData);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  };

  const updateChart = (data) => {
    const filteredData = data.filter((row) => {
      const rowDate = new Date(row.Date);
      return (
        (!startDate || rowDate >= new Date(startDate)) &&
        (!endDate || rowDate <= new Date(endDate))
      );
    });

    const categories = filteredData.map((row) =>
      new Date(row.Date).getFullYear()
    );

    // Get all columns except Date
    const dataColumns = Object.keys(filteredData[0]).filter(
      (key) => key !== "Date"
    );

    // Prepare color palette
    const colors = [
      "#7cb5ec",
      "#434348",
      "#90ed7d",
      "#f7a35c",
      "#8085e9",
      "#f15c80",
      "#e4d354",
      "#2b908f",
      "#f45b5b",
      "#91e8e1",
    ];

    // Create series data for each column
    const allSeries = dataColumns.flatMap((column, index) => {
      const columnData = filteredData.map((row) => {
        const value = parseFloat(row[column]);
        return isNaN(value) ? null : value;
      });

      const normalizedData = normalizeData(columnData);
      const drawdownData = calculateDrawdown(columnData);

      return [
        {
          name: column,
          data: normalizedData,
          type: "line",
          yAxis: 0,
          color: colors[index % colors.length],
          animation: { duration: 2000 },
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 5,
              },
            },
          },
        },
        {
          name: `${column} Drawdown`,
          data: drawdownData,
          type: "line",
          yAxis: 1,
          color: colors[index % colors.length],
          animation: { duration: 2000 },
          marker: {
            enabled: false,
          },
        },
      ];
    });

    setChartOptions({
      title: {
        text: "Multi-Series Chart",
        style: {
          fontSize: "18px",
        },
      },
      xAxis: {
        categories,
        labels: {
          formatter: function () {
            return this.value;
          },
          rotation: -360, // Rotate labels for better readability
          style: {
            fontSize: "11px", // Smaller font size for x-axis labels
          },
        },
        tickInterval: Math.ceil(categories.length / 10), // Show fewer x-axis labels
      },
      yAxis: [
        {
          title: {
            text: "Value",
            style: {
              fontSize: "13px",
            },
          },
          height: "55%",
          min: 0,
          labels: {
            style: {
              fontSize: "11px",
            },
          },
        },
        {
          title: {
            text: "Drawdown (%)",
            style: {
              fontSize: "13px",
            },
          },
          opposite: false,
          height: "45%",
          top: "55%",
          max: 0,
          labels: {
            style: {
              fontSize: "11px",
            },
          },
        },
      ],
      series: allSeries.map((series) => ({
        ...series,
        lineWidth: 1, // Thinner lines
        marker: {
          enabled: false, // Disable markers for less clutter
          states: {
            hover: {
              enabled: true, // Show markers on hover
            },
          },
        },
      })),
      chart: {
        backgroundColor: "none",
        zoomType: "x",
        height: 700,
        spacing: [10, 10, 15, 10], // Adjust chart margins [top, right, bottom, left]
      },
      tooltip: {
        shared: true,
        formatter: function () {
          let tooltipText = `<b>${this.x}</b><br/>`;
          this.points.forEach((point) => {
            if (point.y !== null) {
              tooltipText += `${point.series.name}: ${point.y.toFixed(2)}%<br/>`;
            }
          });
          return tooltipText;
        },
      },
      legend: {
        enabled: true,
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
        itemStyle: {
          fontSize: "11px", // Smaller font in legend
        },
        itemDistance: 8, // Reduce space between legend items
        maxHeight: 60, // Limit legend height
        navigation: {
          // Add navigation if legend is too long
          activeColor: "#3E576F",
          animation: true,
          arrowSize: 12,
          inactiveColor: "#CCC",
          style: {
            fontWeight: "bold",
            color: "#333",
            fontSize: "12px",
          },
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          animation: { duration: 1000 }, // Faster animation
          states: {
            hover: {
              enabled: true,
              lineWidthPlus: 1,
            },
          },
          connectNulls: false,
          turboThreshold: 0, // Force boost module for better performance
        },
      },
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
      boost: {
        enabled: true, // Enable boost module for better performance
        useGPUTranslations: true,
      },
    });
  };

  useEffect(() => {
    if (rawData.length > 0) {
      updateChart(rawData);
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col items-center justify-center p-1 mt-9">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <div className="flex items-center border space-x-4">
          <label className="cursor-pointer bg-brown text-white px-1 py-1 shadow hover:bg-brown">
            Select File
            <input type="file" onChange={handleChange} className="hidden" />
          </label>
          {file && <span className="text-gray-600">{file.name}</span>}
          <Button type="submit" disabled={!file}>
            Upload
          </Button>
        </div>
      </form>

      {chartOptions && (
        <div className="mt-5 w-full max-w-7xl bg-white p-6 rounded-lg shadow">
          <div className="mb-4 flex justify-start space-x-1">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="mb-2 text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-18 border rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="mb-2 text-gray-600">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-18 border rounded-lg"
              />
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Tool;
