import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchStrategyNavField from '../../../hooks/useFetchStrategyNavData';

const ProbabilityOutperformance = () => {
  const strategyKey = "qaw";
  const benchmarkKey = "nifty_50";

  // Fetch data for both strategy and benchmark separately
  const { data: dataQaw, isLoading: isLoadingQaw, error: errorQaw } = useFetchStrategyNavField(strategyKey);
  const { data: dataNifty, isLoading: isLoadingNifty, error: errorNifty } = useFetchStrategyNavField(benchmarkKey);

  // Combine loading and error states
  const isLoading = isLoadingQaw || isLoadingNifty;
  const error = errorQaw || errorNifty;

  // Combine data by matching dates
  const combinedData = useMemo(() => {
    if (!dataQaw || !dataNifty) return null;

    // For each record in dataQaw, attach corresponding nifty_50 value if date matches
    return dataQaw.map(qItem => {
      const matchingNifty = dataNifty.find(nItem => nItem.date === qItem.date);
      return {
        ...qItem,
        [benchmarkKey]: matchingNifty ? matchingNifty[benchmarkKey] : null
      };
    });
  }, [dataQaw, dataNifty, benchmarkKey]);

  // Function to calculate outperformance for a given period (in years)
  const calculateOutperformance = (period, data) => {
    if (!data || data.length === 0) return { outperform: 0, underperform: 0 };

    let outperformCount = 0;
    let totalPeriods = 0;

    for (let i = 0; i < data.length; i++) {
      const currentDate = new Date(data[i].date);
      const targetDate = new Date(currentDate);
      targetDate.setFullYear(currentDate.getFullYear() + period);

      // Find the data point at or after the target date
      const endPoint = data.find(d => new Date(d.date) >= targetDate);
      if (endPoint) {
        const strategyValue = parseFloat(endPoint[strategyKey]);
        const benchmarkValue = parseFloat(endPoint[benchmarkKey]);

        if (!isNaN(strategyValue) && !isNaN(benchmarkValue) && strategyValue > benchmarkValue) {
          outperformCount++;
        }
        totalPeriods++;
      }
    }

    const outperformPct = totalPeriods > 0 ? (outperformCount / totalPeriods) * 100 : 0;
    return {
      outperform: outperformPct,
      underperform: 100 - outperformPct
    };
  };

  // Calculate probabilities for different holding periods using memoization
  const { oneYear, threeYear, fiveYear } = useMemo(() => {
    const data = combinedData;
    return {
      oneYear: calculateOutperformance(1, data),
      threeYear: calculateOutperformance(3, data),
      fiveYear: calculateOutperformance(5, data)
    };
  }, [combinedData]);

  // Function to create chart options for Highcharts pie chart
  const createChartOptions = (title, periodData) => ({
    chart: {
      type: 'pie',
      height: 300
    },
    title: {
      text: title,
      style: { fontSize: '16px' }
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
          style: { fontSize: '12px' }
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
      name: 'Probability',
      data: [
        { name: 'Outperform', y: periodData.outperform, color: '#fee9d6' },
        { name: 'Underperform', y: periodData.underperform, color: '#d1a47b' }
      ]
    }]
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-600">
          Error loading chart data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">
        Probability of Outperformance for Different Holding Periods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('1 Year', oneYear)} />
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('3 Years', threeYear)} />
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('5 Years', fiveYear)} />
      </div>
    </div>
  );
};

export default ProbabilityOutperformance;
