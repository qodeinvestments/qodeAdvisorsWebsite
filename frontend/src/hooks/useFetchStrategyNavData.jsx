import { useEffect, useState, useCallback } from "react";

const useFetchStrategyNavField = (fieldNames) => {
  const normalizedFieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine the backend URL based on the environment
  const backendUrl = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

  const fetchStrategyNavData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${backendUrl}/strategyNavs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strategyData = await response.json();

      let processedData = strategyData.map((item) => {
        const newItem = { date: new Date(item.date) };
        normalizedFieldNames.forEach((field) => {
          if (field in item) {
            const parsedValue = parseFloat(item[field]);
            newItem[field] = isNaN(parsedValue) ? null : parsedValue;
          }
        });
        return newItem;
      });

      if (normalizedFieldNames.length > 1) {
        const earliestDates = normalizedFieldNames
          .map((field) => {
            const rowWithValue = processedData.find((row) => row[field] !== null);
            return rowWithValue ? rowWithValue.date : null;
          })
          .filter((d) => d !== null);

        if (earliestDates.length > 0) {
          const maxEarliestDate = earliestDates.reduce((acc, cur) => (cur > acc ? cur : acc), earliestDates[0]);
          processedData = processedData.filter((row) => row.date >= maxEarliestDate);
        }
      }

      const startValues = {};
      normalizedFieldNames.forEach((field) => {
        const firstValueRow = processedData.find((row) => row[field] !== null);
        if (firstValueRow) {
          startValues[field] = firstValueRow[field];
        }
      });

      processedData = processedData.map((row) => {
        const normalizedRow = { date: row.date };
        normalizedFieldNames.forEach((field) => {
          if (row[field] !== null && startValues[field]) {
            normalizedRow[field] = (row[field] / startValues[field]) * 1000;
          } else {
            normalizedRow[field] = null;
          }
        });
        return normalizedRow;
      });

      const targetDate = new Date(2024, 11, 31);
      processedData = processedData.filter((row) => row.date <= targetDate);

      processedData.sort((a, b) => a.date - b.date);

      if (processedData.length > 0) {
        const lastItem = processedData[processedData.length - 1];
        if (lastItem.date < targetDate) {
          const newFinalItem = { ...lastItem, date: new Date(targetDate) };
          processedData.push(newFinalItem);
        }
      } else {
        const emptyItem = { date: new Date(targetDate) };
        normalizedFieldNames.forEach((field) => {
          emptyItem[field] = null;
        });
        processedData.push(emptyItem);
      }

      processedData = processedData.map((item) => {
        const dateString = item.date.toISOString().split("T")[0];
        return { ...item, date: dateString };
      });

      setData(processedData);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error fetching StrategyNav data:", err);
      setIsLoading(false);
      setError(err.message || "Failed to fetch data");
    }
  }, [normalizedFieldNames, backendUrl]);

  useEffect(() => {
    fetchStrategyNavData();
  }, [fetchStrategyNavData]);

  return { data, isLoading, error };
};

export default useFetchStrategyNavField;
