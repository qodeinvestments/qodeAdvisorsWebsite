// src/components/MaxPeakToPeakTable.js
import React from "react";
import { Table } from "antd";
import Text from "../common/Text";

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
      <Text className="font-subheading mt-6 text-brown text-subheading mb-2">
        Max peak to peak
      </Text>
      <div className="overflow-x-auto">
        <table className="min-w-[200px]  table-auto border-collapse border border-brown">
          <thead>
            <tr className="bg-lightBeige">
              <th className="border border-brown p-18 text-center font-semibold">
                Rank
              </th>
              <th className="border border-brown p-18 text-center">
                Max Peak to Peak
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.Rank} className="hover:bg-lightBeige">
                <td className="border border-brown p-18 text-center">
                  {row.Rank}
                </td>
                <td className="border border-brown p-18 text-center">
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
