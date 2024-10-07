// src/components/MaxPeakToPeakTable.js
import React from "react";
import { Table } from "antd";

const MaxPeakToPeakTable = ({ data }) => {
  // Define columns for the table
  const columns = [
    {
      title: "Rank",
      dataIndex: "Rank",
      key: "Rank",
      className: "text-center font-semibold",
      sorter: (a, b) => a.Rank - b.Rank,
    },
    {
      title: "Max Peak to Peak",
      dataIndex: "Max peak to peak",
      key: "MaxPeakToPeak",
      className: "text-center",
      sorter: (a, b) => a["Max peak to peak"] - b["Max peak to peak"],
    },
  ];

  return (
    <>
      <h3 className=" font-semibold mb-4 text-gray-800 text-center">
        Max Peak to Peak Data
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                Rank
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Max Peak to Peak
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.Rank} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {row.Rank}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {row["Max peak to peak"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MaxPeakToPeakTable;
