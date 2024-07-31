import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spinner } from "@material-tailwind/react";

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
        console.log(filteredData);

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

        console.log(`Market Cap Distribution for ${strategy}:`, percentages);

        setChartOptions({
          chart: {
            type: "bar",
            height: 150,
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
            enabled: true,
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
                format: "{y}%",
                color: "#000",
                style: {
                  textOutline: "none",
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
              color: "#1995AD", // A bright red for a strong presence
            },
            {
              name: "Mid Cap",
              data: [parseFloat(percentages.mid)],
              color: "#A1D6E2", // A vivid orange-saffron for visibility
            },
            {
              name: "Small Cap",
              data: [parseFloat(percentages.small)],
              color: "#F1F1F2 ", // A lively teal to contrast with the reds and oranges
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

  if (!chartOptions) {
    return (
      <div className="text-center flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border border-black p-6 sm:p-8 md:p-10 my-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl  text-[#151E28] mb-2">
            Holding Distribution
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            Our {strategy} Strategy's asset allocation.
          </p>
        </div>

        <div className="w-full lg:w-1/2 border border-black p-4 ">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default HoldingDistribution;
