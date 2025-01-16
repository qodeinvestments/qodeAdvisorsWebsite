import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchStrategyNavField from '../../../hooks/useFetchStrategyNavData';

const QgfEquityCurve = () => {
  const fieldNames = useMemo(() => ['qgf', 'nifty_smallcap_100'], []);
  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames);

  const seriesConfig = useMemo(() => ([
    { key: 'qgf', name: 'QGF', color: '#945c39' },
    { key: 'nifty_smallcap_100', name: 'Nifty Smallcap 100', color: '#d1a47b' }
  ]), []);

  const { chartOptions, hasData } = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { chartOptions: {}, hasData: false };
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const categories = sortedData.map(point => new Date(point.date).getTime());

    const series = seriesConfig.map(({ key, name, color }) => {
      const firstValidValue = sortedData.find(point => !isNaN(parseFloat(point[key])));
      const baseValue = firstValidValue ? parseFloat(firstValidValue[key]) : 100;

      const processedData = sortedData.map(point => {
        const value = parseFloat(point[key]);
        return isNaN(value) ? null : Number(((value / baseValue) * 100).toFixed(2));
      });

      return {
        name,
        data: processedData.map((value, index) => [categories[index], value]),
        color,
        marker: { enabled: false },
        lineWidth: 2
      };
    });

    const options = {
      chart: { type: 'line', height: window.innerWidth < 768 ? 400 : 600 , style: { fontFamily: 'DM Sans, sans-serif' } },
      title: { text: '' },
      subtitle: { text: '' },
      xAxis: {
        type: 'datetime',
        tickInterval: 365 * 24 * 3600 * 1000, // 1-year interval in milliseconds
        labels: {
          format: '{value:%Y}', // Format to display only the year
        },
        title: { text: 'Year' },
      },
      yAxis: { title: { text: '' }, tickInterval: 50,max: 350, },
      tooltip: {
        shared: true,
        formatter: function () {
          let tooltip = `<b>${Highcharts.dateFormat('%b %e, %Y', this.x)}</b><br/>`;
          this.points?.forEach(point => {
            tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y.toFixed(2)}</b><br/>`;
          });
          return tooltip;
        }
      },
      plotOptions: { series: { connectNulls: true } },
      series,
      credits: { enabled: false }
    };

    return {
      chartOptions: options,
      hasData: true
    };
  }, [data, seriesConfig]);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-600">Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-red-50 rounded-lg">
        <p className="text-red-600">Error loading chart: {error}</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-yellow-50 rounded-lg">
        <p className="text-yellow-600">No data available for the chart</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HighchartsReact 
        highcharts={Highcharts} 
        options={chartOptions}
        containerProps={{ className: 'chart-container' }}
      />
    </div>
  );
};

export default QgfEquityCurve;
