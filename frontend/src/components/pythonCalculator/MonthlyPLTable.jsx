import React from "react";
import Text from "../common/Text";

function MonthlyPLTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center text-brown">No data available</p>;
  }

  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsFull = [
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
    const cellValue = value !== null ? `${value}%` : "0%";
    const isHighlighted = value !== null && Number(value) > 4;
    return (
      <td
        className={`text-center text-sm p-18 border border-brown ${isHighlighted ? "bg-green-400 font-semibold" : ""}`}
      >
        {cellValue}
      </td>
    );
  };

  return (
    <>
      <Text className="font-subheading mt-6 text-brown text-subheading mb-2">
        Monthly PL Table (%)
      </Text>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-brown">
          <thead>
            <tr className="bg-lightBeige">
              <th className="p-18 text-sm sm:text-body font-body text-center border border-brown font-semibold">
                Year
              </th>
              {monthsShort.map((month) => (
                <th
                  key={month}
                  className="p-18 text-sm sm:text-body font-body text-center border border-brown font-semibold"
                >
                  {month}
                </th>
              ))}
              <th className="p-18 text-sm sm:text-body font-body text-center border border-brown font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-18 border border-brown bg-lightBeige text-center font-semibold">
                  {row.Year}
                </td>
                {monthsFull.map((month) => renderCell(row[month]))}
                {renderCell(row.Total)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MonthlyPLTable;
