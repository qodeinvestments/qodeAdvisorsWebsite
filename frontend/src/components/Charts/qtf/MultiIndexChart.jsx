import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchStrategyNavField from '../../../hooks/useFetchStrategyNavData';

// Import required Highcharts modules
import Draggable from 'highcharts/modules/draggable-points';
import HighchartsBoost from 'highcharts/modules/boost';

// Initialize Highcharts modules
if (typeof Highcharts === 'object') {
  Draggable(Highcharts);
  HighchartsBoost(Highcharts);
}

const calculateCAGR = (startValue, endValue, years) => {
  if (!startValue || !endValue || years <= 0) return null;
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

const MultiIndexChart = () => {
  const fieldNames = useMemo(
    () => [
      'nifty_500_momentum_50',
      'nifty_alpha_50',
      'nifty_200_quality_30',
      'nifty_low_volatility_50',
      'nifty_500_value_50',
    ],
    []
  );

  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames);

  const processChartData = () => {
    if (!data || data.length === 0) return { categories: [], series: [], performanceData: {} };

    const categories = data.map(point => point.date);
    const seriesConfig = [
      {
      field: 'nifty_500_momentum_50',
      name: 'Momentum 50',
      color: '#A0522D',
      },
      {
      field: 'nifty_alpha_50',
      name: 'Alpha 50',
      color: 'orange',
      },
      {
      field: 'nifty_200_quality_30',
      name: 'Quality 30',
      color: '#c19a6b',
      },
      {
      field: 'nifty_low_volatility_50',
      name: 'Low Volatility 50',
      color: '#DEB887',
      },
      {
      field: 'nifty_500_value_50',
      name: 'Value 50',
      color: '#F5DEB3',
      },
    ];

    const performanceData = {};

    const series = seriesConfig.map(({ field, name, color }) => {
      const validData = data.filter(point => {
        const value = parseFloat(point[field]);
        return value !== null && !isNaN(value);
      });

      if (validData.length === 0) return null;

      const baseValue = parseFloat(validData[0][field]);
      const latestValue = parseFloat(validData[validData.length - 1][field]);
      const years = (new Date(validData[validData.length - 1].date) - new Date(validData[0].date)) / (365 * 24 * 60 * 60 * 1000);

      performanceData[name] = calculateCAGR(baseValue, latestValue, years);

      const normalizedData = validData.map(point => {
        const value = parseFloat(point[field]);
        const date = new Date(point.date).getTime();
        return [date, (value / baseValue) * 100];
      });

      return {
        name,
        data: normalizedData,
        color,
        marker: { enabled: false },
        lineWidth: 2,
        states: {
          hover: { lineWidth: 3 },
        },
      };
    }).filter(Boolean);

    return { categories, series, performanceData };
  };

  const { categories, series, performanceData } = processChartData();

  const options = {
    chart: {
      type: 'spline',
      height: 600,
      zoomType: 'xy',
      panning: {
        enabled: true,
        type: 'xy',
      },
      panKey: 'shift',
    },
    title: {
      text: '',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      title: {
        text: 'Normalized Value',
        style: { fontSize: '14px' },
      },
      labels: {
        formatter: function() {
          // Ensure full numeric values without abbreviation
          return this.value;
        },
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltip = `<b>${Highcharts.dateFormat('%b %Y', this.x)}</b><br/>`;
        this.points.forEach(point => {
          tooltip += `<span style="color:${point.series.color}">●</span>
            ${point.series.name}: <b>${point.y.toFixed(2)}</b><br/>`;
        });
        return tooltip;
      },
    },
    legend: {
      enabled: true,
      itemStyle: { fontSize: '12px' },
    },
    plotOptions: {
      spline: {
        marker: { enabled: false },
        states: { hover: { enabled: true, lineWidth: 3 } },
      },
    },
    series,
  };

  if (isLoading) return <p>Loading chart data...</p>;
  if (error) return <p>Error loading chart data: {error}</p>;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '600px', width: '100%' } }}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse mt-6">
          <thead>
            <tr className="text-sm sm:text-body font-body">
              <th className="sticky border border-brown border-r-0 left-0 z-10 p-18 font-semibold text-start text-black bg-lightBeige">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                Metric
              </th>
              {Object.keys(performanceData).map(index => (
                <th
                  key={index}
                  className="relative p-18 font-semibold text-center text-black border-t border-b border-brown"
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-black text-start border-b border-brown">
              <td className="sticky border border-brown border-r-0 w-44 text-nowrap left-0 z-10 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                CAGR
              </td>
              {Object.keys(performanceData).map(index => (
                <td
                  key={index}
                  className="relative p-18 text-black text-center font-body text-sm sm:text-body border-b border-brown"
                >
                  {performanceData[index]
                    ? `${performanceData[index].toFixed(2)}%`
                    : 'NA'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiIndexChart;
