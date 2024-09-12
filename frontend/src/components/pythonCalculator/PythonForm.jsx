import React, { useState } from "react";
import { Button, DatePicker, Input, Radio, Select, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const STRATEGIES = [
  { label: "VAM", value: "VAM" },
  { label: "VAM + SL", value: "VAM + SL" },
  { label: "SF", value: "SF" },
  { label: "Short Flat + 1 ITM CE", value: "Short Flat + 1 ITM CE" },
  { label: "VAM + SL + 1M Churn", value: "VAM + SL + 1M Churn" },
  {
    label: "NIFTY ALPHA LOW VOLATLITY 30",
    value: "NIFTY ALPHA LOW VOLATLITY 30",
  },
  { label: "QGF", value: "QGF" },
  { label: "Qode Low Vol", value: "Qode Low Vol" },
  { label: "Cash 7%", value: "Cash 7%" },
  { label: "Gold Bees", value: "Gold Bees" },
];

const DEBTFUNDS = [
  { label: "VAM", value: "VAM" },
  { label: "VAM + SL", value: "VAM + SL" },
  { label: "SF", value: "SF" },
  { label: "Short Flat + 1 ITM CE", value: "Short Flat + 1 ITM CE" },
  { label: "VAM + SL + 1M Churn", value: "VAM + SL + 1M Churn" },
  {
    label: "NIFTY ALPHA LOW VOLATLITY 30",
    value: "NIFTY ALPHA LOW VOLATLITY 30",
  },
  { label: "QGF", value: "QGF" },
  { label: "Qode Low Vol", value: "Qode Low Vol" },
  { label: "Cash 7%", value: "Cash 7%" },
];

function StyledPortfolioCalculatorForm({ onSubmit, loading, columns }) {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    invest_amount: 0,
    cash_percent: 0,
    frequency: "daily",
    selected_systems: [],
    selected_debtfunds: [],
  });
  console.log(columns);

  const columnList = columns.map((column) => ({
    label: column.trim(), // Removing any trailing spaces
    value: column.trim(),
    isJsonColumn: true,
  }));

  const combinedStrategies = [...STRATEGIES, ...columnList];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (selectedValues) => {
    const equalWeightage = calculateEqualWeightage(selectedValues.length);
    const updatedSystems = selectedValues.map((value) => ({
      system: value,
      weightage: equalWeightage,
      leverage: 1,
      column: "", // Add a column field for each system
    }));
    setFormData((prev) => ({ ...prev, selected_systems: updatedSystems }));
  };

  const handleSystemInputChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.selected_systems];
      updatedSystems[index] = {
        ...updatedSystems[index],
        [field]: field === "weightage" ? parseFloat(value) : value,
      };
      return { ...prev, selected_systems: updatedSystems };
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
      const updatedDebtFunds = [...prev.selected_debtfunds];
      updatedDebtFunds[index] = {
        ...updatedDebtFunds[index],
        [field]: field === "weightage" ? parseFloat(value) : value,
      };
      return { ...prev, selected_debtfunds: updatedDebtFunds };
    });
  };

  const calculateEqualWeightage = (count) => {
    if (count === 0) return 0;
    return (100 / count).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.start_date ||
      !formData.end_date ||
      formData.invest_amount <= 0
    ) {
      message.error("Please fill in all required fields correctly.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Portfolio Calculator
      </h2>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Investment Period
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
        <label className="block text-xs font-medium text-gray-700">
          Investment Amount
        </label>
        <Input
          type="decimal"
          value={formData.invest_amount}
          onChange={(e) =>
            handleInputChange("invest_amount", parseFloat(e.target.value))
          }
          className="w-full"
          min={0}
          prefix="₹"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Cash Percentage
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
          suffix="%"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Rebalance Frequency
        </label>
        <Radio.Group
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          value={formData.frequency}
          className="flex flex-wrap gap-4"
        >
          <Radio.Button value="no">No Rebalance</Radio.Button>
          <Radio.Button value="daily">Daily</Radio.Button>
          <Radio.Button value="weekly">Weekly</Radio.Button>
          <Radio.Button value="monthly">Monthly</Radio.Button>
          <Radio.Button value="yearly">Yearly</Radio.Button>
        </Radio.Group>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Select System Groups
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={combinedStrategies}
          value={formData.selected_systems.map((s) => s.system)}
          onChange={handleSystemChange}
          className="w-full"
          placeholder="Choose strategies"
          optionRender={(option) => (
            <span
              style={{
                color: option.data.isJsonColumn ? "#1890ff" : "inherit",
                fontWeight: option.data.isJsonColumn ? "bold" : "normal",
              }}
            >
              {option.data.isJsonColumn ? `📊 ${option.label}` : option.label}
            </span>
          )}
        />
      </div>

      {formData.selected_systems.map((system, index) => (
        <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-700">{system.system}</h3>
          <div className="flex gap-4">
            <Input
              type="decimal"
              placeholder="Weightage"
              value={system.weightage}
              onChange={(e) =>
                handleSystemInputChange(index, "weightage", e.target.value)
              }
              className="w-1/3"
              min={0}
              max={100}
              suffix="%"
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
              className="w-1/3"
              min={0}
              step={0.1}
            />
            <Select
              className="w-1/3"
              placeholder="Select column"
              value={system.column}
              onChange={(value) =>
                handleSystemInputChange(index, "column", value)
              }
              options={columns.map((col) => ({ label: col, value: col }))}
            />
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Select Debt Funds
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={DEBTFUNDS}
          value={formData.selected_debtfunds.map((s) => s.debtfund)}
          onChange={handleDebtFundChange}
          className="w-full"
          placeholder="Choose debt funds"
        />
      </div>

      {formData.selected_debtfunds.map((debtfund, index) => (
        <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-700">{debtfund.debtfund}</h3>
          <div className="flex gap-4">
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
              className="w-1/2"
              min={0}
              max={100}
              suffix="%"
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
              className="w-1/2"
              min={0}
              step={0.1}
            />
          </div>
        </div>
      ))}

      <Button
        type="primary"
        htmlType="submit"
        className="w-full h-10"
        loading={loading}
      >
        Calculate Portfolio
      </Button>

      <div className="text-xs text-gray-500 flex items-center mt-4">
        <InfoCircleOutlined className="mr-2" />
        <span>
          Fill in all required fields to calculate your portfolio performance.
        </span>
      </div>
    </form>
  );
}

export default StyledPortfolioCalculatorForm;
