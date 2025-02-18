import { useCallback } from "react";

const useCalculateCagr = () => {
  const calculateCAGR = useCallback(
    (data, timeRange = "Inception", portfolioType) => {
      // Ensure portfolioType is provided
      if (!portfolioType) {
        console.error("Portfolio type is required for CAGR calculation.");
        return "0%";
      }

      const parseDate = (dateString) => new Date(dateString);
      // Sort data by date ascending
      const sortedData = [...data].sort(
        (a, b) => parseDate(a.date) - parseDate(b.date)
      );

      // Filter out records with invalid portfolio values for the given strategy
      const validData = sortedData.filter(
        (d) => d[portfolioType] !== null && !isNaN(parseFloat(d[portfolioType]))
      );

      if (validData.length < 2) return "Loading...";

      // Use the most recent valid data record for calculations
      const latestData = validData[validData.length - 1];
      const latestDate = parseDate(latestData.date);
      let startDate = new Date(latestDate);

      // Determine the start date based on the specified time range
      if (timeRange === "Custom") {
        startDate = parseDate(validData[0].date);
      } else {
        switch (timeRange) {
          case "1M":
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "3M":
            startDate.setMonth(startDate.getMonth() - 3);
            break;
          case "6M":
            startDate.setMonth(startDate.getMonth() - 6);
            break;
          case "1Y":
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
          case "2Y":
            startDate.setFullYear(startDate.getFullYear() - 2);
            break;
          case "3Y":
            startDate.setFullYear(startDate.getFullYear() - 3);
            break;
          case "5Y":
            startDate.setFullYear(startDate.getFullYear() - 5);
            break;
          case "7Y":
            startDate.setFullYear(startDate.getFullYear() - 7);
            break;
          case "Inception":
            startDate = parseDate(validData[0].date);
            break;
          case "YTD":
            startDate.setMonth(0, 1);
            break;
          default:
            return "Invalid time range";
        }
      }

      // Find the first valid record on or after the computed start date
      const startIndex = validData.findIndex(
        (d) => parseDate(d.date) >= startDate
      );
      if (startIndex === -1) return "0%";

      const startValue = parseFloat(validData[startIndex][portfolioType]);
      const endValue = parseFloat(latestData[portfolioType]);

      if (isNaN(startValue) || isNaN(endValue)) return "0%";

      const days =
        (latestDate - parseDate(validData[startIndex].date)) /
        (24 * 60 * 60 * 1000);
      const years = days / 365;

      if (years <= 0) return "Invalid date range";

      // For periods less than a year, use simple return
      if (years < 1) {
        const simpleReturn = ((endValue - startValue) / startValue) * 100;
        return simpleReturn.toFixed(1) + "%";
      }

      // For periods of a year or more, use CAGR formula
      const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
      return cagr.toFixed(1) + "%";
    },
    []
  );

  return {
    calculateCAGR,
  };
};

export default useCalculateCagr;
