import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  DatePicker,
  Input,
  Radio,
  Table,
  Select,
  Spin,
  message,
} from "antd";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import MonthlyPLTable from "../components/pythonCalculator/MonthlyPLTable";
import CAGRBarChart from "../components/pythonCalculator/CagrBarChart";
import MaxPeakToPeakTable from "../components/pythonCalculator/PeakToPeak";

const { RangePicker } = DatePicker;

const STRATEGIES = [
  { label: "Select All Systems", value: "all" },
  { label: "Descrip_1(VAM)", value: "VAM" },
  { label: "Descrip_1(VAM + SL)", value: "VAM + SL" },
  { label: "Descrip_1(SF)", value: "SF" },
  { label: "Descrip_1(Short Flat + 1 ITM CE)", value: "Short Flat + 1 ITM CE" },
  {
    label: "Descrip_1(VAM + SL + 1M Churn)",
    value: "VAM + SL + 1M Churn",
  },
  {
    label: "Descrip_1(NIFTY ALPHA LOW VOLATLITY 30)",
    value: "NIFTY ALPHA LOW VOLATLITY 30",
  },
  { label: "Descrip_1(QGF)", value: "QGF" },
  { label: "Descrip_1(Qode Low Vol)", value: "Qode Low Vol" },
  { label: "Descrip_1(Cash 7%)", value: "Cash 7%" },
  { label: "Descrip_1(Gold Bees)", value: "Gold Bees" },
  { label: "Descrip_4(BN_Acc)", value: "BN_Acc" },
  { label: "Descrip_4(NF_Acc)", value: "NF_Acc" },
  { label: "Descrip_4(FN_Acc)", value: "FN_Acc" },
  { label: "Descrip_4(Long Options)", value: "Long_Options" },
  { label: "Descrip_4(Psar)", value: "Psar" },
];

const DEBTFUNDS = [
  { label: "Select All Systems", value: "all" },
  { label: "Descrip_1(VAM)", value: "VAM" },
  { label: "Descrip_1(VAM + SL)", value: "VAM + SL" },
  { label: "Descrip_1(SF)", value: "SF" },
  { label: "Descrip_1(Short Flat + 1 ITM CE)", value: "Short Flat + 1 ITM CE" },
  {
    label: "Descrip_1(VAM + SL + 1M Churn)",
    value: "VAM + SL + 1M Churn",
  },
  {
    label: "Descrip_1(NIFTY ALPHA LOW VOLATLITY 30)",
    value: "NIFTY ALPHA LOW VOLATLITY 30",
  },
  { label: "Descrip_1(QGF)", value: "QGF" },
  { label: "Descrip_1(Qode Low Vol)", value: "Qode Low Vol" },
  { label: "Descrip_1(Cash 7%)", value: "Cash 7%" },
  { label: "Descrip_1(Gold Bees)", value: "Gold Bees" },
  { label: "Descrip_4(BN_Acc)", value: "BN_Acc" },
  { label: "Descrip_4(NF_Acc)", value: "NF_Acc" },
  { label: "Descrip_4(FN_Acc)", value: "FN_Acc" },
  { label: "Descrip_4(Long Options)", value: "Long_Options" },
  { label: "Descrip_4(Psar)", value: "Psar" },
];

function PythonCalculator() {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    invest_amount: 0,
    cash_percent: 0,
    frequency: "daily",
    selected_systems: [],
    selected_debtfunds: [],
  });

  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartOptions, setChartOptions] = useState({
    chart: { type: "line" },
    title: { text: "Equity Curve" },
    xAxis: {
      type: "datetime",
      labels: { format: "{value:%d-%m-%Y}" },
    },
    yAxis: { title: { text: "Value" } },
    series: [{ name: "NAV", data: [] }],
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (selectedValues) => {
    const equalWeightage = calculateEqualWeightage(selectedValues.length);
    const updatedSystems = selectedValues.map((value) => ({
      system: value,
      weightage: equalWeightage,
      leverage: 1,
    }));
    setFormData((prev) => ({ ...prev, selected_systems: updatedSystems }));
  };

  const handleSystemInputChange = (index, field, value) => {
    setFormData((prev) => {
      if (field === "weightage") {
        const updatedSystems = redistributeWeightage(
          prev.selected_systems,
          index,
          Number(value)
        );
        return { ...prev, selected_systems: updatedSystems };
      } else {
        const updatedSystems = [...prev.selected_systems];
        updatedSystems[index] = { ...updatedSystems[index], [field]: value };
        return { ...prev, selected_systems: updatedSystems };
      }
    });
  };

  const handleDebtFundChange = (selectedValues) => {
    const equalWeightage = calculateEqualWeightage(selectedValues.length);
    const updatedDebtFunds = selectedValues.map((value) => ({
      debtfund: value,
      weightage: equalWeightage,
      leverage: 1,
    }));
    setFormData((prev) => ({ ...prev, selected_debtfunds: updatedDebtFunds }));
  };

  const handleDebtFundInputChange = (index, field, value) => {
    setFormData((prev) => {
      if (field === "weightage") {
        const updatedDebtFunds = redistributeWeightage(
          prev.selected_debtfunds,
          index,
          Number(value)
        );
        return { ...prev, selected_debtfunds: updatedDebtFunds };
      } else {
        const updatedDebtFunds = [...prev.selected_debtfunds];
        updatedDebtFunds[index] = {
          ...updatedDebtFunds[index],
          [field]: value,
        };
        return { ...prev, selected_debtfunds: updatedDebtFunds };
      }
    });
  };

  const calculateEqualWeightage = (count) => {
    if (count === 0) return 0;
    return 100 / count;
  };

  const redistributeWeightage = (items, changedIndex, newWeightage) => {
    const totalOtherWeightage = 100 - newWeightage;
    const otherItems = items.length - 1;
    return items.map((item, index) => {
      if (index === changedIndex) {
        return { ...item, weightage: newWeightage };
      } else {
        return { ...item, weightage: totalOtherWeightage / otherItems };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.start_date ||
      !formData.end_date ||
      formData.invest_amount <= 0
    ) {
      message.error("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      console.log(formData);
      const response = await axios.post(
        "https://calculator.qodeinvest.com:5080/calculate_portfolio",
        formData
      );
      const data = response.data;
      setResultData(data);
      console.log(data);
      if (data && data.equity_curve_data) {
        const chartData = data.equity_curve_data.map((point) => {
          const [day, month, year] = point.Date.split("-");
          const date = Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          return [date, point.NAV];
        });

        setChartOptions((prev) => ({
          ...prev,
          series: [{ name: "NAV", data: chartData }],
        }));
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderMetrics = () => {
    if (!resultData) return null;

    const metrics = [
      { key: "CAR", value: resultData.car },
      { key: "Max Drawdown", value: resultData.max_dd },
      { key: "Avg Drawdown", value: resultData.avg_dd },
      { key: "CAR/MDD", value: resultData.carbymdd },
      { key: "Max Gain", value: resultData.max_gain },
      { key: "Max Loss", value: resultData.max_loss },
    ];

    return (
      <div className="metrics-container my-6 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-md shadow-sm flex flex-col items-center justify-center border border-gray-200"
            >
              <p className="text-gray-500 text-sm">{metric.key}</p>
              <p className="text-lg font-bold text-gray-700">
                {metric.value !== null ? metric.value : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDrawdownsTable = () => {
    if (
      !resultData?.top_10_worst_drawdowns ||
      resultData.top_10_worst_drawdowns.length === 0
    ) {
      return (
        <p className="text-center text-gray-500">No drawdown data available</p>
      );
    }

    const columns = [
      { title: "Drawdown", dataIndex: "Drawdown", key: "Drawdown" },
      { title: "Peak Date", dataIndex: "Peak_Date", key: "Peak_Date" },
      {
        title: "Drawdown Date",
        dataIndex: "Drawdown_Date",
        key: "Drawdown_Date",
      },
      {
        title: "Recovery Date",
        dataIndex: "Recovery_Date",
        key: "Recovery_Date",
      },
      {
        title: "Days between Drawdown and Recovery Date",
        dataIndex: "Days between Drawdown and Recovery Date",
        key: "Days between Drawdown and Recovery Date",
      },
    ];

    return (
      <div className="drawdowns-table my-6 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Top 10 Worst Drawdowns</h3>
        <Table
          dataSource={resultData.top_10_worst_drawdowns}
          columns={columns}
          pagination={false}
          bordered
          className="overflow-x-auto"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 my-12 mt-20 max-w-6xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Select Start and End Dates:
          </label>
          <RangePicker
            format="DD-MM-YYYY"
            onChange={(dates) => {
              handleInputChange(
                "start_date",
                dates ? dates[0].format("DD-MM-YYYY") : ""
              );
              handleInputChange(
                "end_date",
                dates ? dates[1].format("DD-MM-YYYY") : ""
              );
            }}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Enter the amount you want to invest:
          </label>
          <Input
            type="decimal"
            value={formData.invest_amount}
            onChange={(e) =>
              handleInputChange("invest_amount", parseFloat(e.target.value))
            }
            className="w-full"
            min={0}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Enter the percentage you want to set aside as cash:
          </label>
          <Input
            type="decimal"
            value={formData.cash_percent}
            onChange={(e) =>
              handleInputChange("cash_percent", parseFloat(e.target.value))
            }
            className="w-full"
            min={0}
            max={100}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Do you want to Frequency Rebalance?
          </label>
          <Radio.Group
            onChange={(e) => handleInputChange("frequency", e.target.value)}
            value={formData.frequency}
            className="flex space-x-4"
          >
            <Radio value="no">No</Radio>
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
            <Radio value="yearly">Yearly</Radio>
          </Radio.Group>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Select System Groups:
          </label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={STRATEGIES}
            value={formData.selected_systems.map((s) => s.system)}
            onChange={handleSystemChange}
            className="w-full"
          />
        </div>
        {formData.selected_systems.map((system, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium">
              System: {system.system}
            </label>
            <Input
              type="decimal"
              placeholder="Weightage"
              value={system.weightage}
              onChange={(e) =>
                handleSystemInputChange(
                  index,
                  "weightage",
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
              min={0}
            />
            <Input
              type="decimal"
              placeholder="Leverage"
              value={system.leverage}
              onChange={(e) =>
                handleSystemInputChange(
                  index,
                  "leverage",
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
              min={0}
            />
          </div>
        ))}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select Debtfunds:</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={DEBTFUNDS}
            value={formData.selected_debtfunds.map((s) => s.debtfund)}
            onChange={handleDebtFundChange}
            className="w-full"
          />
        </div>
        {formData.selected_debtfunds.map((debtfund, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium">
              Debtfund: {debtfund.debtfund}
            </label>
            <Input
              type="decimal"
              placeholder="Weightage"
              value={debtfund.weightage}
              onChange={(e) =>
                handleDebtFundInputChange(
                  index,
                  "weightage",
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
              min={0}
            />
            <Input
              type="decimal"
              placeholder="Leverage"
              value={debtfund.leverage}
              onChange={(e) =>
                handleDebtFundInputChange(
                  index,
                  "leverage",
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
              min={0}
            />
          </div>
        ))}
        <Button type="primary" htmlType="submit" className="mt-4 w-full">
          Calculate Equity Curve
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {resultData && (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
          {renderMetrics()}
          {renderDrawdownsTable()}
          <MonthlyPLTable data={resultData?.monthly_pl_table || []} />
          {resultData?.cagrData && (
            <CAGRBarChart cagrData={resultData.cagrData} />
          )}
          {resultData?.peak_to_peak_data && (
            <MaxPeakToPeakTable data={resultData?.peak_to_peak_data || []} />
          )}
        </>
      )}
    </div>
  );
}

export default PythonCalculator;
