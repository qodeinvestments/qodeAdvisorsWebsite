import { useEffect, useState } from "react";

const useFetchStrategyNavQgfData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchStrategyNavData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/strategyNavs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const strategyData = await response.json();

        // Filter data to include only date and qgf fields
        const filteredData = strategyData.map(item => ({
          date: item.date,
          qgf: item.qgf
        }));

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching StrategyNav Qgf data: ", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStrategyNavData();
  }, []);

  return { data, isLoading, error };
};

export default useFetchStrategyNavQgfData;
