import React from 'react';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

const AreaChart = () => {
  const series = [
    {
      name: 'Quant Momentum',
      data: [0, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Nifty 50',
      data: [0, 32, 45, 32, 34, 52, 41]
    }
  ];

  const options = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#008000','rgb(239, 44, 44)']

    },
    
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      },
      colors: ['#A8FF8F','rgb(239, 140, 140)']

    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: true
    },
    grid: {
      show: false
    }
  };
  return (
    <div id="chart">
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default AreaChart;