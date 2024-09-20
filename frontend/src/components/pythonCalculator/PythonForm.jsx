import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Radio, Select, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Section from "../container/Section";
import Heading from "../common/Heading";
import axios from "axios";
import moment from "moment/moment";
const { RangePicker } = DatePicker;
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
const STRATEGIES = [
  { label: "QGFLong", value: "QGFLong" },
  { label: "Shortflat", value: "Shortflat" },
  { label: "LongOpt", value: "LongOpt" },
  { label: "Allweather", value: "Allweather" },
];

const DEBTFUNDS = [
  { label: "QGFLong", value: "QGFLong" },
  { label: "Shortflat", value: "Shortflat" },
  { label: "LongOpt", value: "LongOpt" },
  { label: "Allweather", value: "Allweather" },
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

  const [dateRange, setDateRange] = useState({ minDate: null, maxDate: null });
  const [rangePickerValue, setRangePickerValue] = useState([null, null]);
  useEffect(() => {
    const fetchDateRange = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_date_range`);

        const { min_date, max_date } = response.data;

        const minDate = moment(min_date, "DD-MM-YYYY");
        const maxDate = moment(max_date, "DD-MM-YYYY");

        setDateRange({ minDate, maxDate });
        setRangePickerValue([minDate, maxDate]);

        setFormData((prev) => ({
          ...prev,
          start_date: min_date,
          end_date: max_date,
        }));
      } catch (error) {
        console.error("Error fetching date range:", error);
        message.error("Failed to fetch date range.");
      }
    };

    fetchDateRange();
  }, []);

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
    <form onSubmit={handleSubmit} className="space-y-4  max-w-7xl mx-auto">
      {/* <Heading className="sm:text-semiheading text-mobileSemiHeading font-subheading text-brown ">
          Portfolio
        </Heading> */}
      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Choose strategies
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={combinedStrategies}
          value={formData.selected_systems.map((s) => s.system)}
          onChange={handleSystemChange}
          className="w-full border-brown border rounded-none "
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
        <div key={index} className="space-y-18 p-2 border border-brown ">
          <h3 className="font-body text-black">{system.system}</h3>
          <div className="flex gap-4">
            <Input
              type="decimal"
              placeholder="Weightage"
              value={system.weightage}
              onChange={(e) =>
                handleSystemInputChange(index, "weightage", e.target.value)
              }
              className="w-1/2"
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
              className="w-1/2"
              min={0}
              step={0.1}
            />
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Choose Debt Funds
        </label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          options={DEBTFUNDS}
          value={formData.selected_debtfunds.map((s) => s.debtfund)}
          onChange={handleDebtFundChange}
          className="w-full border-brown border rounded-none"
          placeholder="Choose debt funds"
        />
      </div>
      {formData.selected_debtfunds.map((debtfund, index) => (
        <div key={index} className="space-y-2 p-4 bg-lightBeige ">
          <h3 className="font-body text-black">{debtfund.debtfund}</h3>
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
              className="w-1/2 "
              min={0}
              step={0.1}
            />
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
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
            setRangePickerValue(dates); // Update the selected value in state
          }}
          disabledDate={(current) =>
            (dateRange.minDate && current < dateRange.minDate) ||
            (dateRange.maxDate && current > dateRange.maxDate)
          }
          className="w-full border-brown border rounded-none p-18"
        />
      </div>
      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Investment Amount
        </label>
        <Input
          type="decimal"
          value={formData.invest_amount}
          onChange={(e) =>
            handleInputChange("invest_amount", parseFloat(e.target.value))
          }
          className="w-full border-brown border rounded-none p-18"
          min={0}
          prefix="₹"
        />
      </div>

      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Cash Percentage
        </label>
        <Input
          type="decimal"
          value={formData.cash_percent}
          onChange={(e) =>
            handleInputChange("cash_percent", parseFloat(e.target.value))
          }
          className="w-full border-brown border rounded-none p-18"
          min={0}
          max={100}
          suffix="%"
        />
      </div>

      <div className="space-y-2">
        <label className="block sm:text-subheading text-mobileSubHeading font-subheading text-black">
          Rebalance Frequency
        </label>
        <Radio.Group
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          value={formData.frequency}
          className="flex flex-wrap gap-4"
        >
          <Radio.Button
            className={`border border-brown hover:border-brown hover:text-black border-l-2 rounded-none ${
              formData.frequency === "no"
                ? "bg-brown text-white"
                : "bg-lightbeige text-black"
            }`}
            value="no"
          >
            No Rebalance
          </Radio.Button>
          <Radio.Button
            className={`border border-brown rounded-none ${
              formData.frequency === "daily"
                ? "bg-brown text-white"
                : "bg-lightbeige text-black"
            }`}
            value="daily"
          >
            Daily
          </Radio.Button>
          <Radio.Button
            className={`border border-brown rounded-none ${
              formData.frequency === "weekly"
                ? "bg-brown text-white"
                : "bg-lightbeige text-black"
            }`}
            value="weekly"
          >
            Weekly
          </Radio.Button>
          <Radio.Button
            className={`border border-brown rounded-none ${
              formData.frequency === "monthly"
                ? "bg-brown text-white"
                : "bg-lightbeige text-black"
            }`}
            value="monthly"
          >
            Monthly
          </Radio.Button>
          <Radio.Button
            className={`border border-brown rounded-none ${
              formData.frequency === "yearly"
                ? "bg-brown text-white"
                : "bg-lightbeige text-black"
            }`}
            value="yearly"
          >
            Yearly
          </Radio.Button>
        </Radio.Group>
      </div>

      <div className="text-center">
        <Button
          htmlType="submit"
          className=" border-none bg-brown text-lightBeige  px-3 py-1 text-body rounded-none h-2"
          loading={loading}
        >
          Calculate Portfolio
        </Button>
      </div>

      <div className="text-body text-gray-500 flex items-center mt-4">
        <InfoCircleOutlined className="mr-2" />
        <span>
          Fill in all required fields to calculate your portfolio performance.
        </span>
      </div>
    </form>
  );
}

export default StyledPortfolioCalculatorForm;
