import React, { useState, useEffect } from 'react';
import { Container } from '../components';
import Section from '../components/container/Section';
import Button from '../components/common/Button';
import Heading from '../components/common/Heading';
import Text from '../components/common/Text';

const SchemeD = () => {
    // State to hold data for all schemas
    const [performanceData, setPerformanceData] = useState({
        sarla_performance: {},
        sarla_performance_batch1: {},
        sarla_performance_batch2: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSchema, setSelectedSchema] = useState('sarla_performance');
    const [lastUpdated, setLastUpdated] = useState({
        sarla_performance: '',
        sarla_performance_batch1: '',
        sarla_performance_batch2: '',
    });

    // API URL based on environment
    const API_URL =
        import.meta.env.MODE === "production"
            ? import.meta.env.VITE_BACKEND_PROD_URL
            : import.meta.env.VITE_BACKEND_DEV_URL;

    // Fetch data for all schemas when component mounts
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/sarlaPerformance`);
                if (!response.ok) throw new Error('Network response was not ok');
                const fetchedData = await response.json();
                setPerformanceData(fetchedData);
                
                // Extract last updated dates for each schema
                // Adjust based on your backend's response structure
                setLastUpdated({
                    sarla_performance: fetchedData.sarla_performance?.last_updated || '20/12/2024',
                    sarla_performance_batch1: fetchedData.sarla_performance_batch1?.last_updated || '20/12/2024',
                    sarla_performance_batch2: fetchedData.sarla_performance_batch2?.last_updated || '20/12/2024',
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Sarla Performance data:', error);
                setError('Failed to load performance data. Please try again later.');
                setLoading(false);
            }
        };

        fetchAllData();
    }, [API_URL]);

    // Helper formatting functions
    const formatPercentage = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? '' : `${(num * 100).toFixed(2)}%`;
    };

    const formatCurrency = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? '' : new Intl.NumberFormat('en-IN', { 
            style: 'currency', 
            currency: 'INR' 
        }).format(num);
    };

    const formatDate = (value) => {
        if (!value || value === 'NaN') return '';
        const date = new Date(value);
        return isNaN(date) ? '' : date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Field type definitions
    const percentageFields = [
        'pnl_percentage', 'nifty_percentage', 'put_protection', 'covered_calls',
        'long_options', 'profit_percentage', 'cost_percentage', 'cost_recovered',
        'realised_percentage', 'unrealised_percentage', 'total_pnl',
        'net_amount_to_be_recovered_percentage', 'total_percentage','dynamic_puts'
    ];

    const currencyFields = [
        'amount', 'profit', 'entry_price', 'current_price', 'profit_and_loss',
        'exposure', 'cost', 'cost_recovered', 'net_amount_to_be_recovered',
        'realised', 'unrealised', 'total'
    ];

    // Columns that should always have a faded red background
    const alwaysRedColumns = ['cost_percentage'];

    // Columns that should have conditional background colors based on their value
    const conditionalBgColors = [
        'total', 
        'total_percentage', 
        'cost_recovered',
        'dynamic_puts' // If 'dynamic_puts' should also be conditionally colored
    ];


    const dateFields = ['date'];

    // Function to render a table
    // Function to render a table
// Function to render a table
const renderTable = (tableData, tableName) => {
    if (!tableData || tableData.length === 0) return null;

    const columns = Object.keys(tableData[0]).filter(column => 
        column.toLowerCase() !== 'id'
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
                                        // Format the value based on its type
                                        if (percentageFields.includes(column)) {
                                            displayValue = formatPercentage(item[column]);
                                        } else if (currencyFields.includes(column)) {
                                            displayValue = formatCurrency(item[column]);
                                        } else if (dateFields.includes(column)) {
                                            displayValue = formatDate(item[column]);
                                        } else {
                                            displayValue = String(item[column]);
                                        }

                                        // Apply always red background if the column is in alwaysRedColumns
                                        if (alwaysRedColumns.includes(column)) {
                                            bgColorClass = 'bg-red-100';
                                        }
                                        // Else if the column is in conditionalBgColors, apply conditional coloring
                                        else if (conditionalBgColors.includes(column)) {
                                            const numericValue = parseFloat(item[column]);
                                            if (!isNaN(numericValue)) {
                                                if (numericValue > 0) {
                                                    bgColorClass = 'bg-green-100';
                                                } else if (numericValue < 0) {
                                                    bgColorClass = 'bg-red-100';
                                                }
                                                // Optionally, handle zero or neutral values
                                                // else {
                                                //     bgColorClass = 'bg-yellow-100';
                                                // }
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



    // Table groups configuration for each schema
    const tableGroupsOrdered = {
        "Net Profit And Loss Report": ['t9', 't10' , 't8'],
        "Overview": ['t1', 't2'],
        "Monthly PnL": ['t3', 't4'],
        "Current Open Positions": ['t5'],
        "Strategy-wise Report": ['t6', 't7' ],
    };

    // Function to render a group of tables for a given schema
    const renderSchemaTables = (schemaName, schemaData) => {
        if (!schemaData) return null;

        return (
            <div key={schemaName} className="mb-8">
                <Text className=" playFair-scheme-page italic mb-2 text-brown font-heading text-[1.6rem] capitalize">
                    {schemaName.replace(/_/g, ' ')}
                </Text>
                {Object.entries(tableGroupsOrdered).map(([groupHeader, tables]) => {
                    const validTables = tables.filter(tableName => 
                        schemaData[tableName] && schemaData[tableName].length > 0
                    );

                    return validTables.length > 0 && (
                        <div key={groupHeader} className="mb-2">
                            <Text className=" playFair-scheme-page text-brown font-heading text-[1.2rem]   capitalize">
                                {groupHeader}
                            </Text>
                            <div className="flex flex-col sm:flex-row flex-wrap">
                                {validTables.map((tableName) => 
                                    renderTable(schemaData[tableName], tableName)
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className="mt-4">
                    <Text className="text-right text-sm text-gray-600">
                        Last Updated Date: <strong>{lastUpdated[schemaName]}</strong>
                    </Text>
                </div>
            </div>
        );
    };

    // Function to render the selected schema's tables
    const renderSelectedSchemaTables = () => {
        const schemaData = performanceData[selectedSchema];
        if (!schemaData) return null;

        return (
            <div>
                {renderSchemaTables(selectedSchema, schemaData)}
            </div>
        );
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
                        {/* Schema Selection Controls */}
                        <div className="sm:flex justify-between items-center mb-4">
                            <div className="flex ml-1 items-center space-x-2">
                                <Button
                                    onClick={() => setSelectedSchema('sarla_performance')}
                                    className={`px-[10px] py-[10px] ${
                                        selectedSchema === 'sarla_performance'
                                            ? 'bg-beige text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    Demo (1 CR)
                                </Button>
                                <Button
                                    onClick={() => setSelectedSchema('sarla_performance_batch1')}
                                    className={`px-[10px] py-[10px] ${
                                        selectedSchema === 'sarla_performance_batch1'
                                            ? 'bg-beige text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    Batch 1
                                </Button>
                                <Button
                                    onClick={() => setSelectedSchema('sarla_performance_batch2')}
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

                        {/* Render the selected schema's tables */}
                        {renderSelectedSchemaTables()}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default SchemeD;
