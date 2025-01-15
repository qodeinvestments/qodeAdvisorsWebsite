import { useEffect, useState, useCallback } from "react";

const useFetchStrategyNavField = (fieldNames) => {
  // Convert fieldNames to array if it's not already
  const normalizedFieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStrategyNavData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/strategyNavs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strategyData = await response.json();

      // For each row, pick out just the fields in normalizedFieldNames,
      // parse them as floats, and also parse the date
      let processedData = strategyData.map((item) => {
        const newItem = { date: new Date(item.date) }; // Store as Date object
        normalizedFieldNames.forEach((field) => {
          if (field in item) {
            const parsedValue = parseFloat(item[field]);
            newItem[field] = isNaN(parsedValue) ? null : parsedValue;
          }
        });
        return newItem;
      });

      // ---  Align the starting date if more than one field is requested ---
      if (normalizedFieldNames.length > 1) {
        // For each field, find the earliest date where that field is non-null
        const earliestDates = normalizedFieldNames
          .map((field) => {
            // Find the first row where this field is not null
            const rowWithValue = processedData.find((row) => row[field] !== null);
            return rowWithValue ? rowWithValue.date : null;
          })
          .filter((d) => d !== null);

        // If at least one field had valid data, compute the max of those earliest dates
        if (earliestDates.length > 0) {
          const maxEarliestDate = earliestDates.reduce((acc, cur) => (cur > acc ? cur : acc), earliestDates[0]);
          // Filter out rows older than maxEarliestDate
          processedData = processedData.filter((row) => row.date >= maxEarliestDate);
        }
      }

      // Normalize all fields to 1000 at their first non-null value
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

      // Filter out data beyond Dec 31, 2024
      const targetDate = new Date(2024, 11, 31); // months are 0-based; 11 => December
      processedData = processedData.filter((row) => row.date <= targetDate);

      // Sort by ascending date
      processedData.sort((a, b) => a.date - b.date);

      // Check if last item is strictly before Dec 31, 2024
      if (processedData.length > 0) {
        const lastItem = processedData[processedData.length - 1];
        if (lastItem.date < targetDate) {
          // Create a new item for 31/12/2024, copying the last item's values
          const newFinalItem = { ...lastItem, date: new Date(targetDate) };
          processedData.push(newFinalItem);
        }
      } else {
        // If we have no data after filtering, add a single item on 31/12/2024 with null fields
        const emptyItem = { date: new Date(targetDate) };
        normalizedFieldNames.forEach((field) => {
          emptyItem[field] = null;
        });
        processedData.push(emptyItem);
      }

      // Convert the date back to a string in YYYY-MM-DD format
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
  }, [normalizedFieldNames]);

  // Fetch once on mount
  useEffect(() => {
    fetchStrategyNavData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};

export default useFetchStrategyNavField;