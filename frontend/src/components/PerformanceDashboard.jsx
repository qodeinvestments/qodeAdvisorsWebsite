import React from 'react';
import Text from './common/Text';

/* Helper Functions */
const calculateReturns = (values) => {
  const returns = [];
  for (let i = 1; i < values.length; i++) {
    const current = parseFloat(values[i]);
    const previous = parseFloat(values[i - 1]);

    if (!isNaN(current) && !isNaN(previous) && previous !== 0) {
      returns.push((current - previous) / previous);
    }
  }
  return returns;
};

const calculateSharpe = (returns, riskFreeRate = 0.07) => {
  console.log("All returns:", returns);

  if (!returns || returns.length === 0) return 0;

  const validReturns = returns.filter(r => !isNaN(r));

  if (validReturns.length === 0) {
    // If no valid returns, return 0 for Sharpe ratio
    return 0;
  }

  // Calculate daily mean
  const dailyMean = validReturns.reduce((sum, r) => sum + r, 0) / validReturns.length;

  // Annualize mean return
  const annualMean = dailyMean * 252; // Assuming 252 trading days in a year

  // Log daily mean and annual mean for debugging
  console.log("Daily Mean Return:", dailyMean);
  console.log("Annualized Mean Return:", annualMean);

  // Calculate daily variance
  const dailyVariance = validReturns.reduce((acc, r) => acc + Math.pow(r - dailyMean, 2), 0) / validReturns.length;

  // Annualize variance (assuming independent daily returns)
  const annualVariance = dailyVariance * 252;

  // Calculate standard deviations from variances
  const dailyStdDev = Math.sqrt(dailyVariance);
  const annualStdDev = Math.sqrt(annualVariance);

  // Log standard deviations for debugging
  console.log("Daily Standard Deviation:", dailyStdDev);
  console.log("Annualized Standard Deviation:", annualStdDev);

  // Compute excess return (annualized)
  const excessReturn = annualMean - riskFreeRate;

  // Log excess return for debugging
  console.log("Excess Return:", excessReturn);

  // If annual standard deviation is zero, avoid division by zero
  if (annualStdDev === 0) return 0;

  // Return the annualized Sharpe ratio
  const sharpeRatio = excessReturn / annualStdDev;
  console.log("Sharpe Ratio:", sharpeRatio);

  return sharpeRatio;
};



const calculateStdDev = (returns) => {
  if (returns.length === 0) return 0;

  const validReturns = returns.filter(r => !isNaN(r));
  if (validReturns.length === 0) return 0;

  const mean = validReturns.reduce((a, b) => a + b, 0) / validReturns.length;
  const variance =
    validReturns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / validReturns.length;
  // Annualize based on ~252 trading days/year
  return Math.sqrt(variance || 0) * Math.sqrt(252) * 100;
};

const calculateMaxDrawdown = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;

  // Convert entries to floats and filter out invalid numbers
  const validValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
  if (validValues.length === 0) return 0;

  let peak = validValues[0];
  let maxDrawdown = 0; // Track the largest observed drawdown as a positive value internally

  for (const value of validValues) {
    if (value > peak) {
      peak = value; // Update to new peak if found
    } else {
      // Calculate drawdown relative to the peak
      const drawdown = ((peak - value) / peak) * 100;
      // Update maxDrawdown if this drawdown is larger than the current one
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
  }

  // Return the maximum drawdown as a negative percentage
  return -maxDrawdown;
};



const calculateMetrics = (
  data,
  strategyKey = 'total_portfolio_nav',
  benchmarkKey = 'benchmark_values'
) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      sharpeRatio: { portfolio: 0, benchmark: 0 },
      stdDev: { portfolio: 0, benchmark: 0 },
      maxDrawdown: { portfolio: 0, benchmark: 0 }
    };
  }

  const portfolioValues = data
    .map(d => parseFloat(d[strategyKey]))
    .filter(v => !isNaN(v));
  const benchmarkValues = data
    .map(d => parseFloat(d[benchmarkKey]))
    .filter(v => !isNaN(v));

  const portfolioReturns = calculateReturns(portfolioValues);
  const benchmarkReturns = calculateReturns(benchmarkValues);

  return {
    sharpeRatio: {
      portfolio: calculateSharpe(portfolioReturns),
      benchmark: calculateSharpe(benchmarkReturns)
    },
    stdDev: {
      portfolio: calculateStdDev(portfolioReturns),
      benchmark: calculateStdDev(benchmarkReturns)
    },
    maxDrawdown: {
      portfolio: calculateMaxDrawdown(portfolioValues),
      benchmark: calculateMaxDrawdown(benchmarkValues)
    }
  };
};

const calculateReturn = (startValue, endValue, years) => {
  if (startValue === 0 || !startValue || !endValue) return 0;

  if (years === 1) {
    // For 1 year, use simple return
    return ((endValue - startValue) / startValue) * 100;
  } else {
    // For longer periods, use CAGR
    const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
    return cagr;
  }
};

const calculateRollingReturns = (
  data,
  period,
  strategyKey,
  benchmarkKey
) => {
  const defaultResults = {
    worst: { portfolio: 0, benchmark: 0 },
    median: { portfolio: 0, benchmark: 0 },
    best: { portfolio: 0, benchmark: 0 }
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return defaultResults;
  }

  const portfolioReturns = [];
  const benchmarkReturns = [];

  const totalDays = period * 252; // ~252 trading days in a year
  if (data.length < totalDays) {
    return defaultResults;
  }

  for (let i = 0; i < data.length - totalDays; i++) {
    const start = data[i];
    const end = data[i + totalDays];

    const portStart = parseFloat(start[strategyKey]);
    const portEnd = parseFloat(end[strategyKey]);
    const benchStart = parseFloat(start[benchmarkKey]);
    const benchEnd = parseFloat(end[benchmarkKey]);

    if (
      !isNaN(portStart) && !isNaN(portEnd) && portStart !== 0 &&
      !isNaN(benchStart) && !isNaN(benchEnd) && benchStart !== 0
    ) {
      const portReturn = calculateReturn(portStart, portEnd, period);
      const benchReturn = calculateReturn(benchStart, benchEnd, period);

      if (!isNaN(portReturn) && !isNaN(benchReturn)) {
        portfolioReturns.push(portReturn);
        benchmarkReturns.push(benchReturn);
      }
    }
  }

  if (portfolioReturns.length === 0) {
    return defaultResults;
  }

  // Sort ascending
  portfolioReturns.sort((a, b) => a - b);
  benchmarkReturns.sort((a, b) => a - b);

  // Median index
  const medianIndex = Math.floor(portfolioReturns.length / 2);

  return {
    worst: {
      portfolio: portfolioReturns[0],
      benchmark: benchmarkReturns[0]
    },
    median: {
      portfolio: portfolioReturns[medianIndex],
      benchmark: benchmarkReturns[medianIndex]
    },
    best: {
      portfolio: portfolioReturns[portfolioReturns.length - 1],
      benchmark: benchmarkReturns[benchmarkReturns.length - 1]
    }
  };
};

/* Components */
const MetricsTable = React.memo(
  ({ data, strategyKey, benchmarkKey, strategyName, benchmarkName }) => {
    const metrics = React.useMemo(
      () => calculateMetrics(data, strategyKey, benchmarkKey),
      [data, strategyKey, benchmarkKey]
    );

    return (
      <>
        <Text className="text-xl font-semibold mt-2 mb-1">Key Metrics</Text>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-fixed border-collapse">
            <thead>
              <tr className="text-sm sm:text-body font-body">
                <th className="sticky left-0 z-10 p-18 font-semibold text-center text-black bg-lightBeige border border-brown w-1/3">
                  Metric
                </th>
                <th className="p-18 font-semibold text-center border-r text-black border-t border-b border-brown w-1/3">
                  {strategyName || 'Strategy'}
                </th>
                <th className="p-18 font-semibold text-center border-r text-black border-t border-b border-brown w-1/3">
                  {benchmarkName || 'Benchmark'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brown">
                <td className="sticky left-0 z-10 p-18 font-semibold  text-center text-sm bg-lightBeige border border-brown w-1/3">
                  Sharpe Ratio
                </td>
                <td className="p-18 text-center border-b border-r  border-brown w-1/3">
                  {metrics.sharpeRatio.portfolio.toFixed(2)}%
                </td>
                <td className="p-18 text-center border-b border-r  border-brown w-1/3">
                  {metrics.sharpeRatio.benchmark.toFixed(2)}%
                </td>
              </tr>
              <tr className="border-b border-brown">
                <td className="sticky left-0 z-10 p-18 text-center font-semibold text-sm bg-lightBeige border border-brown w-1/3">
                  Annualized Std Dev (%)
                </td>
                <td className="p-18 text-center border-b border-r border-brown w-1/3">
                  {metrics.stdDev.portfolio.toFixed(2)}%
                </td>
                <td className="p-18 text-center border-b border-r border-brown w-1/3">
                  {metrics.stdDev.benchmark.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="sticky left-0 z-10 p-18 text-center font-semibold border-r text-sm bg-lightBeige border border-brown w-1/3">
                  Max Drawdown (%)
                </td>
                <td className="p-18 text-center border-r border-brown border-b w-1/3">
                  {metrics.maxDrawdown.portfolio.toFixed(2)}%
                </td>
                <td className="p-18 text-center border-r border-brown border-b w-1/3">
                  {metrics.maxDrawdown.benchmark.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
);

const RollingReturnsTable = React.memo(
  ({ data, strategyKey, benchmarkKey, strategyName, benchmarkName }) => {
    const periods = [1, 3, 5, 7];
    const returns = React.useMemo(() => {
      const result = {};
      periods.forEach(period => {
        result[period] = calculateRollingReturns(data, period, strategyKey, benchmarkKey);
      });
      return result;
    }, [data, strategyKey, benchmarkKey]);

    return (
      <>
        <Text className="text-xl font-semibold mt-2 mb-1">
          Rolling Returns
        </Text>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-fixed border-collapse">
            <thead>
              <tr className="text-sm sm:text-body font-body">
                <th
                  className="sticky left-0 z-10 p-18 font-semibold text-center text-black bg-lightBeige border border-brown w-[14.28%]"
                  rowSpan="2"
                >
                  Period (Years)
                </th>
                <th
                  className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown w-[28.57%]"
                  colSpan="2"
                >
                  Worst
                </th>
                <th
                  className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown w-[28.57%]"
                  colSpan="2"
                >
                  Median
                </th>
                <th
                  className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown w-[28.57%]"
                  colSpan="2"
                >
                  Best
                </th>
              </tr>
              <tr className="text-sm sm:text-body font-body border-brown">
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {strategyName || 'Strategy'}
                </th>
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {benchmarkName || 'Benchmark'}
                </th>
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {strategyName || 'Strategy'}
                </th>
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {benchmarkName || 'Benchmark'}
                </th>
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {strategyName || 'Strategy'}
                </th>
                <th className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                  {benchmarkName || 'Benchmark'}
                </th>
              </tr>
            </thead>
            <tbody>
              {periods.map((year) => {
                const row = returns[year];
                return (
                  <tr key={year} className="border-b border-brown text-sm sm:text-body">
                    <td className="sticky left-0 z-10 p-18 font-semibold text-center bg-lightBeige border border-brown w-[14.28%]">
                      {year}
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.worst.portfolio.toFixed(2)}%
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.worst.benchmark.toFixed(2)}%
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.median.portfolio.toFixed(2)}%
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.median.benchmark.toFixed(2)}%
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.best.portfolio.toFixed(2)}%
                    </td>
                    <td className="p-18 text-center border-b border-r border-brown w-[14.28%]">
                      {row.best.benchmark.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
);

const PerformanceDashboard = React.memo(
  ({ data, strategyKey, benchmarkKey, strategyName, benchmarkName }) => {
    return (
      <>
        {strategyKey === 'qaw' && (
          <MetricsTable
            data={data}
            strategyKey={strategyKey}
            benchmarkKey={benchmarkKey}
            // strategyName={strategy}
            strategyName={strategyName}
            benchmarkName={benchmarkName}
          />
        )}
        {(strategyKey === 'qaw' || strategyKey === 'qtf' || strategyKey === 'qgf') && (
          <RollingReturnsTable
            data={data}
            strategyKey={strategyKey}
            benchmarkKey={benchmarkKey}
            strategyName={strategyName}
            benchmarkName={benchmarkName}
          />
        )}
      </>
    );
  }
);



export default PerformanceDashboard;
