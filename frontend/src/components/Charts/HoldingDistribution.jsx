import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Heading from "../common/Heading";

const HoldingDistribution = ({ strategy }) => {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/qgfAllocation.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        // Filter data based on strategy
        if (strategy == "qmf" || strategy == "QMF") {
          strategy = "Momentum";
        }
        const filteredData = jsonData.Sheet1.filter(
          (item) => item.Strategy === strategy
        );
        // console.log(filteredData);

        const totals = filteredData.reduce(
          (acc, item) => {
            const marketCap = parseFloat(item["Market Cap"]);

            if (marketCap > 20000) {
              acc.large += marketCap;
            } else if (marketCap >= 5000 && marketCap <= 20000) {
              acc.mid += marketCap;
            } else if (marketCap < 5000) {
              acc.small += marketCap;
            }
            acc.total += marketCap;
            return acc;
          },
          { large: 0, mid: 0, small: 0, total: 0 }
        );

        const percentages = {
          large: parseFloat((totals.large / totals.total) * 100).toFixed(2),
          mid: parseFloat((totals.mid / totals.total) * 100).toFixed(2),
          small: parseFloat((totals.small / totals.total) * 100).toFixed(2),
        };

        setChartOptions({
          chart: {
            type: "bar",
            height: 160,
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
          title: {
            text: null,
          },
          xAxis: {
            categories: [strategy],
            labels: {
              enabled: false,
            },
            lineWidth: 0,
            minorGridLineWidth: 0,
            minorTickLength: 0,
            tickLength: 0,
          },
          yAxis: {
            min: 0,
            max: 100,
            title: {
              text: null,
            },
            labels: {
              enabled: false,
            },
            gridLineWidth: 0,
          },
          legend: {
            reversed: true,
            enabled: false,
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            itemStyle: {
              color: "#333333",
              fontWeight: "normal",
            },
          },
          plotOptions: {
            series: {
              stacking: "percent",
            },
            bar: {
              dataLabels: {
                enabled: true,
                useHTML: true, // Enable HTML in labels
                format:
                  '<span style="font-size: 14px;">{y}%</span><br><span style="font-size: 14px;">{series.name}</span>', // Custom HTML format
                align: "center",
                verticalAlign: "middle",
                inside: true,
                style: {
                  textOutline: "none",
                  color: "#000",
                },
              },
            },
          },
          tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b>",
          },
          series: [
            {
              name: "Large Cap",
              data: [parseFloat(percentages.large)],
              color: "#58A992", // Soft mint green
              borderColor: "#000",
            },
            {
              name: "Mid Cap",
              data: [parseFloat(percentages.mid)],
              color: "#7BCBA5", // Light seafoam green
              borderColor: "#000",
            },
            {
              name: "Small Cap",
              data: [parseFloat(percentages.small)],
              color: "#A3E4B6", // Pale spring green
              borderColor: "#000",
            },
          ],

          credits: {
            enabled: false,
          },
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };
    fetchData();
  }, [strategy]);

  let strategyName;
  if (strategy == "QGF") {
    strategyName = "Quality Fund";
  } else if (strategy == "QMF") {
    strategyName = "High Return & Churn Fund";
  }

  if (!chartOptions) {
    return (
      <div className="text-center flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-[#fafafa] p-36 justify-center ">
      <div className="flex flex-col justify-between  text-start pb-0 items-start gap-2">
        <Heading
          level={2}
          className="md:text-subheading sm:text-3xl font-bold text-[#151E28] mb-2"
        >
          Holding Distribution
        </Heading>
        <Text className="text-base sm:md:text-subheading text-black">
          Our {strategyName} Strategy's asset allocation.
        </Text>
        <div className="text-start">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
      <div className="border p-10 ">
        <Heading className="md:text-subheading mb-10">
          Our Stock Holdings
        </Heading>
        <div className="relative text-center flex items-center justify-center bg-beige/20  ">
          <table className="border-collapse w-full blur-sm   ">
            <thead>
              <tr>
                <th className=" px-4 py-2">Company</th>
                <th className=" px-4 py-2">Quantity</th>
                <th className=" px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" px-4 py-2">Company A</td>
                <td className=" px-4 py-2">100</td>
                <td className=" px-4 py-2">$10,000</td>
              </tr>
              <tr>
                <td className=" px-4 py-2">Company B</td>
                <td className=" px-4 py-2">200</td>
                <td className=" px-4 py-2">$20,000</td>
              </tr>
              <tr>
                <td className=" px-4 py-2">Company C</td>
                <td className=" px-4 py-2">300</td>
                <td className=" px-4 py-2">$30,000</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-1 gap-4">
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 flex flex-col justify-center items-center">
              <div className="w-full">Sign Up to see view our holdings</div>
              <Button to="https://dashboard.qodeinvest.com">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingDistribution;
