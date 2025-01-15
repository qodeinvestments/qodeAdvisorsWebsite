import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchStrategyNavField from '../hooks/useFetchStrategyNavData';

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

    // Sort each array by date ascending (just to be safe)
    const sortedQaw = [...dataQaw].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedNifty = [...dataNifty].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Merge them by matching 'date'
    return sortedQaw.map(qItem => {
      const matchingNifty = sortedNifty.find(nItem => nItem.date === qItem.date);
      return {
        ...qItem,
        [benchmarkKey]: matchingNifty ? matchingNifty[benchmarkKey] : null
      };
    });
  }, [dataQaw, dataNifty, benchmarkKey]);

  // A helper to find the earliest entry in 'data' where date >= targetDate
  const findEarliestOnOrAfter = (data, targetDate) => {
    // data is sorted ascending by date
    // Return the first row whose date >= targetDate
    return data.find(item => new Date(item.date) >= targetDate) || null;
  };

  // Function to calculate outperformance for a given holding period (in years)
  const calculateOutperformance = (period, data) => {
    if (!data || data.length === 0) {
      return { outperform: 0, underperform: 0 };
    }

    // We assume data is already sorted ascending by date
    let outperformCount = 0;
    let totalPeriods = 0;

    for (let i = 0; i < data.length; i++) {
      const currentDate = new Date(data[i].date);
      const targetDate = new Date(currentDate);
      targetDate.setFullYear(currentDate.getFullYear() + period);

      const endPoint = findEarliestOnOrAfter(data, targetDate);
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

  // Calculate probabilities for different holding periods using memo
  const { oneYear, threeYear, fiveYear } = useMemo(() => {
    if (!combinedData || combinedData.length === 0) {
      return {
        oneYear: { outperform: 0, underperform: 0 },
        threeYear: { outperform: 0, underperform: 0 },
        fiveYear: { outperform: 0, underperform: 0 }
      };
    }
    return {
      oneYear: calculateOutperformance(1, combinedData),
      threeYear: calculateOutperformance(3, combinedData),
      fiveYear: calculateOutperformance(5, combinedData)
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
    series: [
      {
        name: 'Probability',
        data: [
          { name: 'Outperform', y: periodData.outperform, color: '#fee9d6' },
          { name: 'Underperform', y: periodData.underperform, color: '#d1a47b' }
        ]
      }
    ]
  });

  // Handle loading & error states
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
          Error loading chart data: {error.message || String(error)}
        </div>
      </div>
    );
  }

  // Render the pie charts
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">
        Probability of Outperformance for Different Holding Periods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={createChartOptions('1 Year', oneYear)}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={createChartOptions('3 Years', threeYear)}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={createChartOptions('5 Years', fiveYear)}
        />
      </div>
    </div>
  );
};

export default ProbabilityOutperformance;
