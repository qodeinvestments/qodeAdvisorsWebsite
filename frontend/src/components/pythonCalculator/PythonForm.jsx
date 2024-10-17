import React, { useEffect, useState } from "react";
import { DatePicker, Input, Radio, Select, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment/moment";
import Button from "../common/Button";

const { RangePicker } = DatePicker;

const STRATEGIES = [
  { label: "NSE Momentum Index", value: "NSE Momentum Index" },
  { label: "Equity + Puts", value: "Equity + Puts" },
  { label: "Equity + Puts + Calls", value: "Equity + Puts + Calls" },
  { label: "Gold Bees", value: "Gold Bees" },
  { label: "Qode All Weather", value: "QAW" },
  { label: "Qode Growth Fund", value: "QGF" },
  { label: "Qode Velocity Fund", value: "QVF" },
  // { label: "QGFLong", value: "QGFLong" },
  // { label: "Shortflat", value: "Shortflat" },
  // { label: "Long Options", value: "LongOpt" },
  // { label: "Qode Growth Fund+Derivatives", value: "QGF+Derivatives" },
];

const DEBTFUNDS = [
  { label: "QGFLong", value: "QGFLong" },
  { label: "Shortflat", value: "Shortflat" },
  { label: "LongOpt", value: "LongOpt" },
  { label: "QGF+Derivatives", value: "QGF+Derivatives" },
  { label: "QGF", value: "QGF" },
  { label: "QAW", value: "QAW" },
  { label: "QVF", value: "QVF" },
];

function StyledPortfolioCalculatorForm({ onSubmit, loading, columns }) {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    invest_amount: "",
    cash_percent: "",
    frequency: "daily",
    selected_systems: [],
    selected_debtfunds: [],
  });

  const columnList = columns.map((column) => ({
    label: column.trim(),
    value: column.trim(),
    isJsonColumn: true,
  }));

  const combinedStrategies = [...STRATEGIES, ...columnList];
  const combinedDebtFunds = [...DEBTFUNDS, ...columnList];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (selectedValues) => {
    const equalWeightage = calculateEqualWeightage(selectedValues.length);
    const updatedSystems = selectedValues.map((value) => ({
      system: value,
      weightage: equalWeightage,
      leverage: "1",
      column: "",
    }));
    setFormData((prev) => ({ ...prev, selected_systems: updatedSystems }));
  };

  const handleSystemInputChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.selected_systems];
      updatedSystems[index] = {
        ...updatedSystems[index],
        [field]: value,
      };
      return { ...prev, selected_systems: updatedSystems };
    });
  };

  const handleDebtFundChange = (selectedValues) => {
    const equalWeightage = calculateEqualWeightage(selectedValues.length);
    const updatedDebtFunds = selectedValues.map((value) => ({
      debtfund: value,
      weightage: equalWeightage,
      leverage: "1",
    }));
    setFormData((prev) => ({ ...prev, selected_debtfunds: updatedDebtFunds }));
  };

  const handleDebtFundInputChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedDebtFunds = [...prev.selected_debtfunds];
      updatedDebtFunds[index] = {
        ...updatedDebtFunds[index],
        [field]: value,
      };
      return { ...prev, selected_debtfunds: updatedDebtFunds };
    });
  };

  const calculateEqualWeightage = (count) => {
    if (count === 0) return "";
    return (100 / count).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.start_date ||
      !formData.end_date ||
      !formData.invest_amount ||
      parseFloat(formData.invest_amount) <= 0
    ) {
      message.error("Please fill in all required fields correctly.");
      return;
    }

    // Convert string values to numbers before submitting
    const submittedData = {
      ...formData,
      invest_amount: parseFloat(formData.invest_amount),
      cash_percent: formData.cash_percent
        ? parseFloat(formData.cash_percent)
        : 0,
      selected_systems: formData.selected_systems.map((system) => ({
        ...system,
        weightage: parseFloat(system.weightage) || 0,
        leverage: parseFloat(system.leverage) || 1,
      })),
      selected_debtfunds: formData.selected_debtfunds.map((debtfund) => ({
        ...debtfund,
        weightage: parseFloat(debtfund.weightage) || 0,
        leverage: parseFloat(debtfund.leverage) || 1,
      })),
    };

    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1 max-w-7xl mx-auto">
      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Choose strategies *
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={combinedStrategies}
          value={formData.selected_systems.map((s) => s.system)}
          onChange={handleSystemChange}
          className="w-full border-brown border rounded-none"
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
        <div key={index} className="space-y-18 sm:p-2">
          <h3 className="font-body text-black">{system.system}</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="">Weightage</label>

            <Input
              type="text"
              placeholder="Weightage"
              value={system.weightage}
              onChange={(e) =>
                handleSystemInputChange(index, "weightage", e.target.value)
              }
              className="w-full sm:w-1/2"
              suffix="%"
            />
            {/* <label htmlFor="">Leverage</label>

            <Input
              type="text"
              placeholder="Leverage"
              value={system.leverage}
              onChange={(e) =>
                handleSystemInputChange(index, "leverage", e.target.value)
              }
              className="w-full sm:w-1/2"
            /> */}
          </div>
        </div>
      ))}
      {/* <div className="space-y-1">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Choose Debt Funds
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={combinedDebtFunds}
          value={formData.selected_debtfunds.map((s) => s.debtfund)}
          onChange={handleDebtFundChange}
          className="w-full border-brown border rounded-none"
          placeholder="Choose debt funds"
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
      </div> */}
      {/* {formData.selected_debtfunds.map((debtfund, index) => (
        <div key={index} className="space-y-1 sm:p-2 ">
          <h3 className="font-body text-black">{debtfund.debtfund}</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="">Weightage</label>
            <Input
              type="text"
              placeholder="Weightage"
              value={debtfund.weightage}
              onChange={(e) =>
                handleDebtFundInputChange(index, "weightage", e.target.value)
              }
              className="w-full sm:w-1/2"
              suffix="%"
            />
            <label htmlFor="">Leverage</label>

            <Input
              type="text"
              placeholder="Leverage"
              value={debtfund.leverage}
              onChange={(e) =>
                handleDebtFundInputChange(index, "leverage", e.target.value)
              }
              className="w-full sm:w-1/2"
            />
          </div>
        </div>
      ))} */}
      <div className="space-y-1">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Investment Period *
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
          className="w-full border-brown border rounded-none p-18"
          disabledDate={(current) => {
            // Disable dates before 01-04-2005 and after 01-10-2024
            const startDate = moment("01-04-2005", "DD-MM-YYYY");
            const endDate = moment("01-10-2024", "DD-MM-YYYY");
            return (
              current &&
              (current.isBefore(startDate) || current.isAfter(endDate))
            );
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Investment Amount *
        </label>
        <Input
          type="text"
          value={formData.invest_amount}
          onChange={(e) => handleInputChange("invest_amount", e.target.value)}
          className="w-full border-brown border rounded-none p-18"
          prefix="₹"
        />
      </div>
      {/* <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Cash Percentage
        </label>
        <Input
          type="text"
          value={formData.cash_percent}
          onChange={(e) => handleInputChange("cash_percent", e.target.value)}
          className="w-full border-brown border rounded-none p-18"
          suffix="%"
        />
      </div> */}
      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Rebalance Frequency *
        </label>
        <Radio.Group
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          value={formData.frequency}
          className="flex flex-wrap gap-1"
        >
          {["no", "daily", "weekly", "monthly", "yearly"].map((freq) => (
            <Radio.Button
              key={freq}
              className={`flex-grow sm:flex-grow-0 text-center hover:border-brown hover:text-black border-l-2 rounded-none ${
                formData.frequency === freq
                  ? "bg-brown text-white"
                  : "bg-lightbeige text-black"
              }`}
              value={freq}
            >
              {freq === "no"
                ? "No Rebalance"
                : freq.charAt(0).toUpperCase() + freq.slice(1)}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div className="text-center">
        <Button
          type="submit"
          className="border-none bg-beige hover:bg-beige text-black px-3 py-1 text-body rounded-none "
          loading={loading}
        >
          Calculate Portfolio
        </Button>
      </div>
    </form>
  );
}

export default StyledPortfolioCalculatorForm;
