import React from "react";
import { Table } from "antd";
// import "antd/dist/antd.css"; // Ant Design styles
// import "tailwindcss/tailwind.css"; // Tailwind CSS

function MonthlyPLTable({ data }) {
  // Check if data is available and not empty
  console.log(data);

  if (!data || data.length === 0) {
    return <p className="text-center text-brown">No data available</p>;
  }

  // Format the data to include years and monthly PL values
  const formattedData = data.map((entry, index) => ({
    key: index, // Unique key for each row
    year: entry.Year, // Assuming the years start from 2016
    ...entry,
  }));

  // Define the columns for the Ant Design Table
  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      className: "text-left font-semibold", // Tailwind CSS for styling
    },
    {
      title: "January",
      dataIndex: "January",
      key: "January",
      render: (value) => (value !== null ? `${value}%` : "N/A"), // Display "N/A" for missing data
      className: "text-center",
    },
    {
      title: "February",
      dataIndex: "February",
      key: "February",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "March",
      dataIndex: "March",
      key: "March",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "April",
      dataIndex: "April",
      key: "April",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "May",
      dataIndex: "May",
      key: "May",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "June",
      dataIndex: "June",
      key: "June",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "July",
      dataIndex: "July",
      key: "July",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "August",
      dataIndex: "August",
      key: "August",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "September",
      dataIndex: "September",
      key: "September",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "October",
      dataIndex: "October",
      key: "October",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "November",
      dataIndex: "November",
      key: "November",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "December",
      dataIndex: "December",
      key: "December",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
      render: (value) => (value !== null ? `${value}%` : "N/A"),
      className: "text-center font-semibold", // Tailwind CSS for styling
    },
  ];

  return (
    <div className="my-8 p-4 bg-white shadow-md rounded-lg">
      <h3 className=" font-bold text-center mb-4">Monthly PL Table (%)</h3>
      <Table
        dataSource={formattedData}
        columns={columns}
        pagination={false}
        bordered
        className="overflow-x-auto" // Tailwind CSS for responsiveness
      />
    </div>
  );
}

export default MonthlyPLTable;
