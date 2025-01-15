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

const calculateSharpe = (returns, riskFreeRate = 0.02) => {
  if (returns.length === 0) return 0;
  
  const validReturns = returns.filter(r => !isNaN(r));
  if (validReturns.length === 0) return 0;
  
  const meanReturn = validReturns.reduce((a, b) => a + b, 0) / validReturns.length;
  const variance = validReturns.reduce((a, b) => a + Math.pow(b - meanReturn, 2), 0) / validReturns.length;
  const stdDev = Math.sqrt(variance || 0);
  
  return stdDev === 0 ? 0 : (meanReturn - riskFreeRate) / stdDev;
};

const calculateStdDev = (returns) => {
  if (returns.length === 0) return 0;
  
  const validReturns = returns.filter(r => !isNaN(r));
  if (validReturns.length === 0) return 0;
  
  const mean = validReturns.reduce((a, b) => a + b, 0) / validReturns.length;
  const variance = validReturns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / validReturns.length;
  return Math.sqrt(variance || 0) * Math.sqrt(252) * 100;
};

const calculateMaxDrawdown = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;
  
  const validValues = values.filter(v => !isNaN(parseFloat(v)));
  if (validValues.length === 0) return 0;
  
  let maxDrawdown = 0;
  let peak = validValues[0];

  for (const value of validValues) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = peak !== 0 ? ((peak - value) / peak) * 100 : 0;
    maxDrawdown = Math.min(maxDrawdown, drawdown);
  }

  return maxDrawdown;
};

const calculateMetrics = (data, strategyKey = 'total_portfolio_nav', benchmarkKey = 'benchmark_values') => {
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

const calculateRollingReturns = (
  data,
  period,
  strategyKey = 'qtf',
  benchmarkKey = 'nse_500_momentum_50'
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

  const totalDays = period * 252;
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
      const portReturn = ((portEnd - portStart) / portStart) * 100;
      const benchReturn = ((benchEnd - benchStart) / benchStart) * 100;

      if (!isNaN(portReturn) && !isNaN(benchReturn)) {
        portfolioReturns.push(portReturn);
        benchmarkReturns.push(benchReturn);
      }
    }
  }

  if (portfolioReturns.length === 0) {
    return defaultResults;
  }

  portfolioReturns.sort((a, b) => a - b);
  benchmarkReturns.sort((a, b) => a - b);

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
const MetricsTable = React.memo(({ data, strategyKey, benchmarkKey }) => {
  const metrics = React.useMemo(
    () => calculateMetrics(data, strategyKey, benchmarkKey),
    [data, strategyKey, benchmarkKey]
  );

  return (
    <>
      <Text className="text-xl font-semibold mt-2 mb-1">Key Metrics</Text>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th className="sticky left-0 z-10 p-18 font-semibold text-start text-black bg-lightBeige border border-brown">
                Metric
              </th>
              <th className="p-18 font-semibold text-center border-r text-black border-t border-b border-brown">
                Portfolio
              </th>
              <th className="p-18 font-semibold text-center border-r text-black border-t border-b border-brown">
                Benchmark
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brown">
              <td className="sticky left-0 z-10 p-18 font-semibold text-sm bg-lightBeige border border-brown">
                Sharpe Ratio
              </td>
              <td className="p-18 text-center border-b border-r border-brown">
                {metrics.sharpeRatio.portfolio.toFixed(2)}
              </td>
              <td className="p-18 text-center border-b border-r border-brown">
                {metrics.sharpeRatio.benchmark.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-brown">
              <td className="sticky left-0 z-10 p-18 font-semibold text-sm bg-lightBeige border border-brown">
                Annualized Std Dev (%)
              </td>
              <td className="p-18 text-center border-b border-r border-brown">
                {metrics.stdDev.portfolio.toFixed(2)}
              </td>
              <td className="p-18 text-center border-b border-r border-brown">
                {metrics.stdDev.benchmark.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="sticky left-0 z-10 p-18 font-semibold border-r text-sm bg-lightBeige border border-brown">
                Max Drawdown (%)
              </td>
              <td className="p-18 text-center border-r border-brown border-b">
                {metrics.maxDrawdown.portfolio.toFixed(2)}
              </td>
              <td className="p-18 text-center border-r border-brown border-b">
                {metrics.maxDrawdown.benchmark.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});

const RollingReturnsTable = React.memo(({ data, strategyKey, benchmarkKey }) => {
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
      <Text className="text-xl font-semibold mt-2 mb-1">Rolling Returns (%)</Text>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th
                className="sticky left-0 z-10 p-18 font-semibold text-start text-black bg-lightBeige border border-brown"
                rowSpan="2"
              >
                Period (Years)
              </th>
              <th
                className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown"
                colSpan="2"
              >
                Worst
              </th>
              <th
                className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown"
                colSpan="2"
              >
                Median
              </th>
              <th
                className="p-18 font-semibold text-center text-black border-t border-r border-b border-brown"
                colSpan="2"
              >
                Best
              </th>
            </tr>
            <tr className="text-sm sm:text-body font-body border-brown">
              <th className="p-18 text-center border-b border-r border-brown">Port</th>
              <th className="p-18 text-center border-b border-r border-brown">Bench</th>
              <th className="p-18 text-center border-b border-r border-brown">Port</th>
              <th className="p-18 text-center border-b border-r border-brown">Bench</th>
              <th className="p-18 text-center border-b border-r border-brown">Port</th>
              <th className="p-18 text-center border-b border-r border-brown">Bench</th>
            </tr>
          </thead>
          <tbody>
            {periods.map(year => (
              <tr key={year} className="border-b border-brown text-sm sm:text-body">
                <td className="sticky left-0 z-10 p-18 font-semibold bg-lightBeige border border-brown">
                  {year}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].worst.portfolio.toFixed(1)}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].worst.benchmark.toFixed(1)}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].median.portfolio.toFixed(1)}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].median.benchmark.toFixed(1)}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].best.portfolio.toFixed(1)}
                </td>
                <td className="p-18 text-center border-b border-r border-brown">
                  {returns[year].best.benchmark.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

const PerformanceDashboard = React.memo(({ data, strategyKey, benchmarkKey }) => {
  return (
    <>
      <MetricsTable data={data} strategyKey={strategyKey} benchmarkKey={benchmarkKey} />
      <RollingReturnsTable data={data} strategyKey={strategyKey} benchmarkKey={benchmarkKey} />
    </>
  );
});

export default PerformanceDashboard;