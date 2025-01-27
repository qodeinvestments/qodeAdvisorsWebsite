import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Section from '../components/container/Section';
import Button from '../components/common/Button';
import Text from '../components/common/Text';

const SchemeD = () => {
  const [performanceData, setPerformanceData] = useState({
    sarla_performance: {},
    sarla_performance_batch1: {},
    sarla_performance_batch2: {},
  });

  const [allChartOptions, setAllChartOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState('sarla_performance');
  const [lastUpdated, setLastUpdated] = useState({
    sarla_performance: '',
    sarla_performance_batch1: '',
    sarla_performance_batch2: '',
  });
  const [chartKey, setChartKey] = useState(0);

  const handleSchemaChange = (schema) => {
    setSelectedSchema(schema);
    setChartKey(prevKey => prevKey + 1);
  };

  const API_URL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_BACKEND_PROD_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

  const findLatestDate = (schemaData) => {
    if (!schemaData?.strategyDailyPnl?.length) return '';
    
    const dates = schemaData.strategyDailyPnl.map(item => new Date(item.date));
    const latestDate = new Date(Math.max(...dates));
    
    return latestDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/sarlaPerformance`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const newChartOptions = {};
        const newLastUpdated = {};
        const schemaKeys = [
          'sarla_performance',
          'sarla_performance_batch1',
          'sarla_performance_batch2',
        ];

        schemaKeys.forEach((schemaKey) => {
          const schemaData = data[schemaKey];
          if (schemaData) {
            newLastUpdated[schemaKey] = findLatestDate(schemaData);
            const processedData = processDataForChart(schemaData);
            
            const options = {
              chart: {
                type: 'line',
                zoomType: 'x',
              },
              title: '',
              xAxis: {
                type: 'datetime',
                labels: {
                  format: '{value:%d/%m}',
                },
                startOnTick: true,
                endOnTick: true,
                minTickInterval: 24 * 3600 * 1000,
              },
              yAxis: {
                title: {
                  text: 'PnL Value (₹)',
                },
                labels: {
                  formatter: function () {
                    return (this.value / 1000).toFixed(0) + 'K';
                  },
                },
              },
              tooltip: {
                shared: true,
                crosshairs: true,
                formatter: function () {
                  let tooltip = '<b>' + Highcharts.dateFormat('%d/%m/%Y', this.x) + '</b><br/>';
                  this.points.forEach((point) => {
                    tooltip += `${point.series.name}: <b>₹${point.y.toFixed(2)}</b><br/>`;
                  });
                  return tooltip;
                },
              },
              plotOptions: {
                line: {
                  marker: {
                    enabled: false,
                  },
                },
                series: {
                  connectNulls: true,
                },
              },
              series: processedData,
              legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
              },
              colors: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'],
              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 500,
                    },
                    chartOptions: {
                      legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal',
                      },
                    },
                  },
                ],
              },
            };

            newChartOptions[schemaKey] = options;
          }
        });

        setPerformanceData(data);
        setAllChartOptions(newChartOptions);
        setLastUpdated(newLastUpdated);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load chart data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const processDataForChart = (schemaData) => {
    const strategies = ['put_protection', 'covered_calls', 'long_options', 'total', 'dynamic_puts'];
    const seriesData = {};
  
    strategies.forEach((strategy) => {
      seriesData[strategy] = [];
    });
  
    const strategyPnLData = schemaData.strategyDailyPnl || [];
  
    strategyPnLData.forEach((item) => {
      if (strategies.includes(item.derivative_strategy)) {
        const date = new Date(item.date);
        const utcDate = Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0, 0, 0
        );
        
        const value = parseFloat(item.daily_value);
  
        if (!isNaN(utcDate) && !isNaN(value)) {
          seriesData[item.derivative_strategy].push([utcDate, value]);
        }
      }
    });
  
    return strategies.map((strategy) => ({
      name: strategy.replace(/_/g, ' ').toUpperCase(),
      data: seriesData[strategy].sort((a, b) => a[0] - b[0]),
    }));
  };

  const percentageFields = [
    'pnl_percentage',
    'nifty_percentage',
    'put_protection',
    'covered_calls',
    'long_options',
    'profit_percentage',
    'cost_percentage',
    'cost_recovered',
    'realised_percentage',
    'unrealised_percentage',
    'total_pnl',
    'net_amount_to_be_recovered_percentage',
    'total_percentage',
    'dynamic_puts',
  ];

  const currencyFields = [
    'amount',
    'profit',
    'entry_price',
    'current_price',
    'profit_and_loss',
    'exposure',
    'cost',
    'cost_recovered',
    'net_amount_to_be_recovered',
    'realised',
    'unrealised',
    'total',
  ];

  const alwaysRedColumns = ['cost_percentage'];

  const conditionalBgColors = [
    'total',
    'total_percentage',
    'cost_recovered',
    'dynamic_puts',
  ];

  const dateFields = ['date'];

  const formatPercentage = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : `${(num * 100).toFixed(2)}%`;
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num)
      ? ''
      : new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(num);
  };

  const formatDate = (value) => {
    if (!value || value === 'NaN') return '';
    const date = new Date(value);
    return isNaN(date)
      ? ''
      : date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
  };

  const renderTable = (tableData, tableName) => {
    if (!tableData || tableData.length === 0) return null;

    const columns = Object.keys(tableData[0]).filter(
      (column) => column.toLowerCase() !== 'id'
    );

    return (
      <div className="w-full lg:w-1/2 p-1" key={tableName}>
        <div className="overflow-x-auto">
          <table className="border-collapse border-brown w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-brown">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border border-brown px-[6px] py-[6px] text-xs bg-lightBeige text-left whitespace-nowrap"
                    scope="col"
                  >
                    {column.replace(/_/g, ' ').toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-b text-xs border-brown">
                  {columns.map((column) => {
                    let displayValue = '';
                    let bgColorClass = '';

                    if (item[column] != null && item[column] !== 'NaN') {
                      if (percentageFields.includes(column)) {
                        displayValue = formatPercentage(item[column]);
                      } else if (currencyFields.includes(column)) {
                        displayValue = formatCurrency(item[column]);
                      } else if (dateFields.includes(column)) {
                        displayValue = formatDate(item[column]);
                      } else {
                        displayValue = String(item[column]);
                      }

                      if (alwaysRedColumns.includes(column)) {
                        bgColorClass = 'bg-red-100';
                      }
                      else if (conditionalBgColors.includes(column)) {
                        const numericValue = parseFloat(item[column]);
                        if (!isNaN(numericValue)) {
                          if (numericValue > 0) {
                            bgColorClass = 'bg-green-100';
                          } else if (numericValue < 0) {
                            bgColorClass = 'bg-red-100';
                          }
                        }
                      }
                    }

                    return (
                      <td
                        key={column}
                        className={`border text-xs border-brown px-[12px] py-[6px] whitespace-nowrap ${bgColorClass}`}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tableGroupsOrdered = {
    'Net Profit And Loss Report': ['t9', 't10', 't8'],
    Overview: ['t1', 't2'],
    'Monthly PnL': ['t3', 't4'],
    'Current Open Positions': ['t5'],
    'Strategy-wise Report': ['t6', 't7'],
  };

  const renderSchemaTables = (schemaName, schemaData) => {
    if (!schemaData) return null;

    return (
      <div key={schemaName} className="mb-8">
        <Text className="playFair-scheme-page italic mb-2 text-brown font-heading text-[1.6rem] capitalize">
          {schemaName.replace(/_/g, ' ')}
        </Text>
        {Object.entries(tableGroupsOrdered).map(([groupHeader, tables]) => {
          const validTables = tables.filter(
            (tableName) => schemaData[tableName] && schemaData[tableName].length > 0
          );

          return (
            validTables.length > 0 && (
              <div key={groupHeader} className="mb-2">
                <Text className="playFair-scheme-page text-brown font-heading text-[1.2rem] capitalize">
                  {groupHeader}
                </Text>
                <div className="flex flex-col sm:flex-row flex-wrap">
                  {validTables.map((tableName) =>
                    renderTable(schemaData[tableName], tableName)
                  )}
                </div>
              </div>
            )
          );
        })}
        <div className="mt-4">
          <Text className="text-right text-sm text-gray-600">
            Last Updated Date: <strong>{lastUpdated[selectedSchema]}</strong>
          </Text>
        </div>
      </div>
    );
  };

  const renderSelectedSchemaTables = () => {
    const schemaData = performanceData[selectedSchema];
    if (!schemaData) return null;
    return <div>{renderSchemaTables(selectedSchema, schemaData)}</div>;
  };

  return (
    <Section>
      <div className="mt-9">
        {loading ? (
          <p className="mb-4 px-2">Loading Sarla Performance data...</p>
        ) : error ? (
          <p className="mb-4 px-2 text-red-500">{error}</p>
        ) : (
          <div>
            <div className="sm:flex justify-between items-center mb-4">
              <div className="flex ml-1 items-center space-x-2">
                <Button
                  onClick={() => handleSchemaChange('sarla_performance')}
                  className={`px-[10px] py-[10px] ${
                    selectedSchema === 'sarla_performance'
                      ? 'bg-beige text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Demo (1 CR)
                </Button>
                <Button
                  onClick={() => handleSchemaChange('sarla_performance_batch1')}
                  className={`px-[10px] py-[10px] ${
                    selectedSchema === 'sarla_performance_batch1'
                      ? 'bg-beige text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Batch 1
                </Button>
                <Button
                  onClick={() => handleSchemaChange('sarla_performance_batch2')}
                  className={`px-[10px] py-[10px] ${
                    selectedSchema === 'sarla_performance_batch2'
                      ? 'bg-beige text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Batch 2
                </Button>
              </div>
            </div>

            <div className="mb-4 px-2">
              {allChartOptions[selectedSchema] && (
                <HighchartsReact
                key={chartKey}
                highcharts={Highcharts}
                options={allChartOptions[selectedSchema]}
              />
            )}
          </div>

          {renderSelectedSchemaTables()}
        </div>
      )}
    </div>
  </Section>
);
};

export default SchemeD;