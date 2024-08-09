import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({ chartSeries, chartOptions }) => {
  return (
    <div>
      <Chart
        type="donut"
        series={chartSeries}
        options={chartOptions}
        width="400"
        height="500"
      />
    </div>
  );
};

export default ChartComponent;