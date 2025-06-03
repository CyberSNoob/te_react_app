import { Bar } from "react-chartjs-2";
import Proptypes from "prop-types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins
);

const roundUpTo = (value, steps) => Math.ceil(value / steps) * steps;
const roundDownTo = (value, steps) => Math.floor(value / steps) * steps;

const calculateYAxis = (chartValues, padding = 500, stepSize = 1000) => {
  const minValue = Math.min(...chartValues);
  const maxValue = Math.max(...chartValues);
  const minYValue = roundDownTo(Math.min(0, minValue - padding), stepSize);
  const maxYValue = roundUpTo(Math.max(0, maxValue + padding), stepSize);
  return { minY: minYValue, maxY: maxYValue };
};

const barColors = (chartValues) =>
  chartValues.map((v) => (v >= 0 ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"));

const OneBarChart = ({ data, className }) => {
  let data_keys = Object.keys(data);
  let chartValues = data_keys
    .filter((k) => k.startsWith("q") && !k.endsWith("date"))
    .map((k) => data[k]);
  let chartLabels = data_keys
    .filter((k) => k.startsWith("q") && k.endsWith("date"))
    .map((k) => data[k]);
  let yearEndValues = data_keys
    .filter((k) => k.startsWith("Year"))
    .map((k) => data[k]);

  const yAxis = calculateYAxis(chartValues);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${data["Category"]}`,
        data: chartValues,
        backgroundColor: barColors(chartValues),
        borderRadius: 4,
      },
      {
        label: "Year end result",
        data: yearEndValues,
        backgroundColor: "#D3D3D3",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: data["Title"] || "Bar Chart",
        font: { size: 18, weight: "bold" },
      },
      subtitle: {
        display: true,
        text: `Date: ${data["LatestValueDate"]}, Latest value: ${data["LatestValue"]}`,
        font: { size: 12, weight: "italic" },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: data["Frequency"],
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: data["Unit"],
          font: { size: 14, weight: "bold" },
        },
        beginAtZero: true,
        min: yAxis.minY,
        max: yAxis.maxY,
        grid: {
          drawTicks: true,
          color: (context) => {
            return context.tick.value === 0 ? "#000" : "#ccc";
          },
          lineWidth: (context) => {
            return context.tick.value === 0 ? 2 : 1;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} className={className} />;
};

const BarChart = ({ data }) => {
  if (!data || typeof data !== "object") return <p>No data available</p>;

  return data.map((d, i) => (
    <OneBarChart key={`bar-${i}`} data={d} className="p-2 mb-12" />
  ));
};

BarChart.propTypes = { data: Proptypes.array.isRequired };
OneBarChart.propTypes = {
  data: Proptypes.array.isRequired,
  className: Proptypes.string.isRequired,
};

export default BarChart;
