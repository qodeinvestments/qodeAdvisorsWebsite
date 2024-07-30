const fetchStrategyData = async (strategy, timeRange, startDate, endDate) => {
  console.log(timeRange);
  try {
    const response = await fetch("/data/mainData.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonData = await response.json();
    console.log(jsonData);
    if (!jsonData[strategy.toLowerCase()]) {
      throw new Error(`No data found for strategy: ${strategy}`);
    }

    const data = jsonData[strategy.toLowerCase()];
    // Find the latest date in the data to use as the reference for filtering
    const latestDate = data.reduce((latest, current) => {
      const currentDate = new Date(current.Date);
      return currentDate > new Date(latest.Date) ? current : latest;
    }, data[0]);

    const filteredData = filterDataByTimeRange(
      data,
      timeRange,
      startDate,
      endDate,
      latestDate.Date // Pass the latest date from your data
    );
    console.log("filteredData", filteredData);
    return filteredData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const filterDataByTimeRange = (data, range, start, end, latestDataDate) => {
  const latestDate = new Date(latestDataDate);

  if (start && end) {
    return data.filter(
      (item) =>
        new Date(item.Date) >= new Date(start) &&
        new Date(item.Date) <= new Date(end)
    );
  }

  let filterDate = new Date(latestDate);

  switch (range) {
    case "YTD":
      filterDate = new Date(latestDate.getFullYear(), 0, 1);
      break;
    case "6M":
      filterDate = new Date(latestDate.setMonth(latestDate.getMonth() - 6));
      break;
    case "1Y":
      filterDate = new Date(
        latestDate.setFullYear(latestDate.getFullYear() - 1)
      );
      break;
    case "5Y":
      filterDate = new Date(
        latestDate.setFullYear(latestDate.getFullYear() - 5)
      );
      break;
    case "3M":
      filterDate = new Date(latestDate.setMonth(latestDate.getMonth() - 3));
      break;
    case "1M":
      filterDate = new Date(latestDate.setMonth(latestDate.getMonth() - 1));
      break;
    default:
      return data; // "ALL" case or undefined time range
  }

  return data.filter((item) => new Date(item.Date) >= filterDate);
};

export default fetchStrategyData;
