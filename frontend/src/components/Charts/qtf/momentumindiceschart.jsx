import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetchStrategyNavField from '../../../hooks/useFetchStrategyNavData';

const calculateCAGR = (startValue, endValue, years) => {
  if (!startValue || !endValue || years <= 0) return null;
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

const MomentumIndicesChart = () => {
  const fieldNames = useMemo(
    () => ['nifty_500_momentum_50', 'nifty_50', 'nifty_midcap_100', 'nifty_smallcap_100'],
    []
  );

  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const seriesConfig = useMemo(
    () => [
      {
        key: 'nifty_500_momentum_50',
        name: 'Nifty 500 Momentum 50',
        color: '#A0522D',
      },
      {
        key: 'nifty_50',
        name: 'Nifty 50',
        color: '#FFA500',
      },
      {
        key: 'nifty_midcap_100',
        name: 'Nifty Midcap 100',
        color: '#d1a47b',
      },
      {
        key: 'nifty_smallcap_100',
        name: 'Nifty Smallcap 100',
        color: '#DEB887',
      },
    ],
    []
  );

  const { chartOptions, hasData, performanceData } = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { chartOptions: {}, hasData: false, performanceData: {} };
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstDate = new Date(sortedData[0]?.date);
    const performanceMetrics = {};

    const series = seriesConfig.map(({ key, name, color }) => {
      const validData = sortedData.filter(point =>
        point[key] !== null &&
        point[key] !== undefined &&
        !isNaN(parseFloat(point[key]))
      );

      if (validData.length === 0) return null;

      const baseValue = parseFloat(validData[0][key]);
      const latestValue = parseFloat(validData[validData.length - 1][key]);
      const values = validData.map(point => parseFloat(point[key]));

      const years = (new Date(validData[validData.length - 1].date) - firstDate) / (365 * 24 * 60 * 60 * 1000);

      performanceMetrics[key] = {
        CAGR: calculateCAGR(baseValue, latestValue, years),
      };

      const processedData = validData.map((point, index) => {
        const date = new Date(point.date).getTime();
        const normalizedValue = ((parseFloat(point[key]) / baseValue) * 100).toFixed(2);
        return [date, parseFloat(normalizedValue)];
      });

      return {
        name,
        data: processedData,
        color,
        marker: { enabled: false },
        lineWidth: 2,
      };
    }).filter(Boolean);

    return {
      hasData: series.length > 0,
      performanceData: performanceMetrics,
      chartOptions: {
        chart: {
          type: 'line',
          height: 600,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Year',
          },
        },
        yAxis: {
          title: {
            text: 'Indexed Value',
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
            if (!this.points) return '';
            let tooltip = `<b>${Highcharts.dateFormat('%b %Y', this.x)}</b><br/>`;
            this.points.forEach(point => {
              if (point.y !== null) {
                tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y.toFixed(2)}</b><br/>`;
              }
            });
            return tooltip;
          },
        },
        plotOptions: {
          series: {
            connectNulls: true,
          },
        },
        series,
        credits: { enabled: false },
      },
    };
  }, [data, seriesConfig]);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>Error loading chart: {error}</div>;
  }

  if (!hasData) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            {seriesConfig.map(({ name }) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CAGR</td>
            {seriesConfig.map(({ key }) => (
              <td key={key}>
                {performanceData[key]?.CAGR !== null
                  ? `${performanceData[key].CAGR.toFixed(2)}%`
                  : 'NA'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MomentumIndicesChart;
