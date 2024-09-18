import React from "react";

function MonthlyPLTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center text-brown">No data available</p>;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCell = (value) => {
    const cellValue = value !== null ? `${value}%` : "N/A";
    const isHighlighted = value !== null && Number(value) > 4;
    return (
      <td
        className={`text-center text-sm ${isHighlighted ? "bg-green-600 font-semibold" : ""}`}
      >
        {cellValue}
      </td>
    );
  };

  return (
    <div className="my-1 p-1 bg-white shadow-md ">
      <h3 className="font-bold text-center mb-4">Monthly PL Table (%)</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left font-semibold">Year</th>
              {months.map((month) => (
                <th key={month} className="p-2 text-center font-semibold">
                  {month}
                </th>
              ))}
              <th className="p-2 text-center font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-1 text-left font-semibold">{row.Year}</td>
                {months.map((month) => renderCell(row[month]))}
                {renderCell(row.Total)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyPLTable;
