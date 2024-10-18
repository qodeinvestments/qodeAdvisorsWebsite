// hooks/useStrategyData.js

import { useState, useEffect } from "react";
import fetchStrategyData from "../api/getData";

export function useStrategyData(strategy) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const strategyAlias = strategy === "qgm" ? "momentum" : strategy;
        const strategyData = await fetchStrategyData(
          strategyAlias,
          "Inception"
        );

        if (!Array.isArray(strategyData) || strategyData.length === 0) {
          throw new Error("Invalid data received from API");
        }

        setData(strategyData);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [strategy]);

  return { data, error, loading };
}
