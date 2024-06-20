import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RollingReturns = ({ strategy }) => {
  const [timeRange, setTimeRange] = useState("5Y"); // Initialize with default value
  const [chartOptions, setChartOptions] = useState(null);
  const [rollingReturns, setRollingReturns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/data/test2.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        const filteredData = jsonData.Sheet1.filter(
          (item) => new Date(item.Date).getDate() === 1
        );
        chartData(filteredData, timeRange); // Call chartData with initial timeRange
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Remove timeRange from the dependency array

  const chartData = (data, timeRange) => {
    const now = new Date();
    let filteredData = data;
    let filteredDates;

    switch (timeRange) {
      case "5Y":
        filteredDates = new Date(now.setFullYear(now.getFullYear() - 10));
        break;
      case "3Y":
        filteredDates = new Date(now.setFullYear(now.getFullYear() - 6));
        break;
      case "1Y":
        filteredDates = new Date(now.setFullYear(now.getFullYear() - 2));
        break;
      default:
        filteredDates = new Date(0);
    }

    filteredData = data.filter((item) => new Date(item.Date) >= filteredDates);

    if (filteredData.length === 0) {
      setError(`No data available for the selected time range: ${timeRange}`);
      setRollingReturns([]);
      setChartOptions(null);
      return;
    }

    cagrCalc(filteredData.reverse());
    setChartOptions(createChartOptions(rollingReturns));
  };

  function cagrCalc(data) {
    const resultArray = [];
    for (let i = 0; i < data.length; i++) {
      const currentElement = data[i];
      const currentValue = currentElement["QGF"];
      const currentDate = new Date(currentElement["Date"]);

      const fiveYearsAgoDate = new Date(
        currentDate.getFullYear() - 5,
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
        const fiveYearsAgoValue = data[fiveYearsAgoIndex]["QGF"];
        const cagr = Math.pow(currentValue / fiveYearsAgoValue, 1 / 5) - 1;
        resultArray.push({
          date: formattedDate,
          cagr: cagr * 100,
        });
      } else {
        // console.log(
        //   `No data found for ${fiveYearsAgoDate.toISOString().slice(0, 10)}`
        // );
      }
    }
    setRollingReturns(resultArray);
  }

  const createChartOptions = (rollingReturnsData) => {
    const chartOptions = {
      title: { text: "Rolling Returns" },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: { day: "%b %e, %Y" },
      },
      yAxis: { title: { text: "Rolling Returns (%)" } },
      series: [
        {
          name: "Rolling Returns",
          data: rollingReturnsData.map((data) => [
            new Date(data.date).getTime(),
            data.cagr,
          ]),
        },
      ],
    };
    return chartOptions;
  };

  const memoizedChartOptions = useMemo(
    () => createChartOptions(rollingReturns),
    [rollingReturns]
  );

  const handleTimeRangeToggle = async (range) => {
    setTimeRange(range);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/data/test2.json");
      if (!response.ok) throw new Error("Failed to fetch data");
      const jsonData = await response.json();
      const filteredData = jsonData.Sheet1.filter(
        (item) => new Date(item.Date).getDate() === 1
      );
      chartData(filteredData, range);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Rolling Returns</h1>
      <div>
        <button
          className="bg-black text-white p-2 mr-10"
          onClick={() => handleTimeRangeToggle("5Y")}
        >
          5Y
        </button>
        <button
          className="bg-black text-white p-2 mr-10"
          onClick={() => handleTimeRangeToggle("3Y")}
        >
          3Y
        </button>
        <button
          className="bg-black text-white p-2 mr-10"
          onClick={() => handleTimeRangeToggle("1Y")}
        >
          1Y
        </button>
      </div>
      {error && <p>{error}</p>}
      {chartOptions && (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </div>
  );
};

export default RollingReturns;
