import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import PropTypes from "prop-types";

// register plugins needed
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

// const lineDatasets = useMemo(() => (data ? [
//   { label: "Price",
//     data: data.map((d) => d.value),
//     borderColor: "black",
//     fill: true,
//     borderWidth: 1,
//   }] : []), [data]);

// const labelData = useMemo(() => (data ?
//   data.map((d) => {
//     const date = new Date(d.date);
//     const month = date.toLocaleString('default', {month:'long'}).substring(0,3);
//     const year = date.getFullYear().toString().substring(2,);
//     return `${month}${year}`;
//   }) : []), [data]);

// useEffect(() => {
//     setChartData(() => (
//       data ? {
//         labels: labelData,
//         datasets: lineDatasets,
//       } : { labels: [], datasets: [] }), []);
//   }, [data, labelData, lineDatasets]);

const LineChart = ({ view, data }) => {
  if (!data) return <p>No data available</p>;

  const chartLabels = data.map((r) => r["Date"]);
  const chartValues = data.map((r) => r["Value"]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `test`,
        data: chartValues,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: view.toUpperCase() },
      legend: { display: false },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Yearly",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Stat value",
          font: { size: 14, weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

LineChart.propTypes = {
  view: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LineChart;
