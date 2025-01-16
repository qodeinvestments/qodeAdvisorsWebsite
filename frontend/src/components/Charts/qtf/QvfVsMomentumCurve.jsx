import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetchStrategyNavField from "../../../hooks/useFetchStrategyNavData";

const QvfVsMomentumCurve = () => {
  // We'll fetch two fields: QTF and Nifty 500 Momentum 50
  const fieldNames = useMemo(() => ["qtf", "nifty_500_momentum_50"], []);

  const { data, isLoading, error } = useFetchStrategyNavField(fieldNames);

  /**
   * Normalizes both series so that:
   * 1) We sort all data by date.
   * 2) Find the earliest index where QTF is valid, and earliest index where Momentum is valid.
   * 3) Use the later of those two indexes as the common start date.
   * 4) Baseline both series to 100 at that starting point.
   */
  const processedSeries = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    // 1) Sort the data by ascending date
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2) Find earliest valid index for each series
    const earliestQtfIndex = sortedData.findIndex((row) => {
      const val = parseFloat(row.qtf);
      return !isNaN(val) && val !== 0;
    });
    const earliestMoIndex = sortedData.findIndex((row) => {
      const val = parseFloat(row.nifty_500_momentum_50);
      return !isNaN(val) && val !== 0;
    });

    // If either series has no valid data, return empty
    if (earliestQtfIndex === -1 || earliestMoIndex === -1) {
      return [];
    }

    // 3) Common start index is the later of the two
    const commonStartIndex = Math.max(earliestQtfIndex, earliestMoIndex);

    // Get baseline values at that common start
    const baseQtf = parseFloat(sortedData[commonStartIndex].qtf);
    const baseMo = parseFloat(sortedData[commonStartIndex].nifty_500_momentum_50);

    // If either baseline is invalid, bail out
    if (isNaN(baseQtf) || isNaN(baseMo) || baseQtf === 0 || baseMo === 0) {
      return [];
    }

    // Build final arrays of [timestamp, normalizedValue]
    const qtfSeriesData = [];
    const moSeriesData = [];

    // 4) Normalize from the common start index forward
    for (let i = commonStartIndex; i < sortedData.length; i++) {
      const row = sortedData[i];
      const dateMs = new Date(row.date).getTime();

      const qtfVal = parseFloat(row.qtf);
      const moVal = parseFloat(row.nifty_500_momentum_50);

      const normalizedQtf = !isNaN(qtfVal) ? (qtfVal / baseQtf) * 100 : null;
      const normalizedMo = !isNaN(moVal) ? (moVal / baseMo) * 100 : null;

      qtfSeriesData.push([dateMs, normalizedQtf]);
      moSeriesData.push([dateMs, normalizedMo]);
    }

    // Return two series configured for Highcharts
    return [
      {
        name: "QTF",
        data: qtfSeriesData,
        color: "#A0522D", // Brown
        lineWidth: 2,
        type: "line",
      },
      {
        name: "Nifty 500 Momentum 50",
        data: moSeriesData,
        color: "#d1a47b", // Beige
        lineWidth: 2,
        type: "line",
      },
    ];
  }, [data]);

  // Highcharts configuration
  const options = useMemo(() => {
    // If no data was processed, skip rendering
    if (!processedSeries || processedSeries.length === 0) {
      return null;
    }

    return {
      chart: {
        type: "line",
        height: 400,
        zoomType: "x",
        backgroundColor: "#ffffff",
        style: { fontFamily: 'DM Sans, sans-serif' },
      },
      title: {
        text: "",
        style: { color: "#333333", fontSize: "18px" },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 365 * 24 * 3600 * 1000, // 1 year
        dateTimeLabelFormats: { year: "%Y" },
        title: {
          text: "",
          style: { color: "#333333" },
        },
        labels: { style: { color: "#333333" } },
        gridLineColor: "#e0e0e0",
      },
      yAxis: {
        type: "logarithmic", // <-- Make it log scale
        title: {
          text: "",
          style: { color: "#333333" },
        },
        gridLineWidth: 1,
        gridLineColor: "#e0e0e0",
        labels: { style: { color: "#333333" } },
        labels: {
          formatter: function() {
            // Ensure full numeric values without abbreviation
            return this.value;
          },
        },
      },
      tooltip: {
        shared: true,
        backgroundColor: "#ffffff",
        borderColor: "#d1a47b",
        style: { color: "#333333" },
        formatter: function () {
          let s = `<b>${Highcharts.dateFormat("%b %e, %Y", this.x)}</b>`;
          this.points.forEach((point) => {
            const val = point.y;
            s += `<br/><span style="color:${point.series.color}">\u25CF</span> ${
              point.series.name
            }: <b>${val ? val.toFixed(2) : "—"}</b>`;
          });
          return s;
        },
      },
      series: processedSeries,
      credits: { enabled: false },
      legend: {
        enabled: true,
        itemStyle: { color: "#333333" },
      },
      plotOptions: {
        line: {
          marker: { enabled: false },
          states: {
            hover: { lineWidth: 2 },
          },
        },
      },
    };
  }, [processedSeries]);

  if (isLoading) {
    return <p>Loading chart data...</p>;
  }
  if (error) {
    return <p>Error loading chart data: {error}</p>;
  }
  if (!options) {
    return <p>No data available</p>;
  }

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default QvfVsMomentumCurve;
