import { useEffect, useState, useCallback } from "react";

const useFetchStrategyNavField = (fieldNames) => {
  const normalizedFieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded strategy start dates
  const STRATEGY_START_DATES = {
    qgf: '2018-01-01',
    qaw: '2011-02-23',
    qtf: '2011-02-23'
  };

  // Strategy to benchmark mapping
  const STRATEGY_BENCHMARKS = {
    qgf: 'nifty_smallcap_100',
    qaw: 'nifty_50',
    qtf: 'nifty_midcap_150_momentum_50'
  };

  const backendUrl = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

  const fetchStrategyNavData = useCallback(async () => {
    try {
      setIsLoading(true);
      //console.log("🚀 Starting data fetch for fields:", normalizedFieldNames);
      
      const response = await fetch(`${backendUrl}/strategyNavs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strategyData = await response.json();
      //console.log(`📥 Received raw data with ${strategyData.length} entries`);

      // Find the strategy field and its corresponding benchmark
      let strategy = null;
      let startDate = null;

      // First try to find a strategy field
      strategy = normalizedFieldNames.find(field => Object.keys(STRATEGY_START_DATES).includes(field));

      // If no strategy field is found, check if we're dealing with benchmark-only data
      if (!strategy) {
        // Find if any of the fields is a benchmark value
        const benchmarkField = normalizedFieldNames.find(field => 
          Object.values(STRATEGY_BENCHMARKS).includes(field)
        );
        
        if (benchmarkField) {
          // Find the strategy that corresponds to this benchmark
          strategy = Object.entries(STRATEGY_BENCHMARKS).find(
            ([_, benchmark]) => benchmark === benchmarkField
          )?.[0];
        }
      }

      if (!strategy) {
        throw new Error("No valid strategy or corresponding benchmark found in requested fields");
      }

      startDate = new Date(STRATEGY_START_DATES[strategy]);
      //console.log(`Using start date for ${strategy}: ${startDate.toISOString()}`);

      // Process data
      let processedData = strategyData.map((item) => {
        const newItem = { date: new Date(item.date) };
        normalizedFieldNames.forEach((field) => {
          const parsedValue = parseFloat(item[field]);
          newItem[field] = isNaN(parsedValue) ? null : parsedValue;
        });
        return newItem;
      });

      // Sort and filter data
      processedData.sort((a, b) => a.date - b.date);
      processedData = processedData.filter(item => item.date >= startDate);

      // Calculate base values and normalize
      const startValues = {};
      normalizedFieldNames.forEach((field) => {
        const firstValueRow = processedData.find((row) => row[field] !== null);
        if (firstValueRow) {
          startValues[field] = firstValueRow[field];
          //console.log(`📊 Base value for ${field}: ${startValues[field]}`);
        }
      });

      // Normalize to 1000
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

      // Format dates
      processedData = processedData.map((item) => ({
        ...item,
        date: item.date.toISOString().split("T")[0],
      }));

      // Fill gaps
      for (let i = 1; i < processedData.length; i++) {
        normalizedFieldNames.forEach((field) => {
          if (processedData[i][field] === null) {
            processedData[i][field] = processedData[i - 1][field];
          }
        });
      }

      // Remove invalid entries at start
      let validDataStartIndex = 0;
      while (validDataStartIndex < processedData.length) {
        const hasAllValues = normalizedFieldNames.every(
          field => processedData[validDataStartIndex][field] !== null
        );
        if (hasAllValues) break;
        validDataStartIndex++;
      }
      processedData = processedData.slice(validDataStartIndex);

      //console.log(`✅ Final dataset has ${processedData.length} entries starting from ${processedData[0]?.date}`);
      setData(processedData);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error("❌ Error processing data:", err);
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