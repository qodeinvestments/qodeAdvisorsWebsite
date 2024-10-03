import { useCallback, useEffect, useState } from "react";
import filterDataByTimeRange from "../utils/filterDataByTimeRange";

const useFetchStrategyData = (strategy) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchStrategyData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${strategy}`);
        const strategyData = await response.json();
        setData(strategyData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchStrategyData();
  }, [strategy]);
  console.log(data);

  return { data, isLoading, error };
};
export default useFetchStrategyData;
