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
    <div className="my-8 p-4 bg-white rounded-lg shadow-lg">
      <h3 className=" font-semibold mb-4 text-gray-800 text-center">
        Max Peak to Peak Data
      </h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="Rank"
        bordered
        className="overflow-x-auto"
      />
    </div>
  );
};

export default MaxPeakToPeakTable;
