import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Registering the chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

// Color map for the chart
const colorMap = {
  red: "rgba(239, 68, 68, 0.6)",
  green: "rgba(34, 197 ,94, 0.6)",
  orange: "rgba(249 ,115 ,22, 0.6)",
  yellow: "rgba(234, 179, 8, 0.6)",
  blue: "rgba(59, 130 ,246 , 0.6)",
  default: "rgba(249 ,115 ,22, 0.6)",
};

// DataLineChart component
const DataLineChart = ({ data }) => {
  {
    /* ===========================
    Data preparation for chart
  =========================== */
  }
  const Options = ["weekly,monthly,yearly"];
  const datasets = data.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data,
    borderColor: colorMap[dataset.color] || colorMap.default,
    backgroundColor:
      dataset.color === "blue"
        ? "rgba(37, 99, 235, 0.2)"
        : "rgba(251, 191, 36, 0.2)",
    tension: 0.4,
    fill: "start",
    borderWidth: 2,
    pointRadius: 4,
    pointBackgroundColor: "rgba(256, 256, 256, 1)",
    pointBorderWidth: 0,
  }));

  const chartData = {
    labels: data.xlabels,
    datasets: datasets,
  };

  {
    /* ===========================
    Chart options configuration
  =========================== */
  }
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    hover: { mode: "nearest", intersect: true },
    scales: {
      y: {
        beginAtZero: false,

        grid: { display: false },
        ticks: { display: true, stepSize: 20 },
      },
      x: { grid: { display: false }, ticks: { color: "#9CA3AF" } },
    },
    elements: {
      point: {
        hoverRadius: 6,
        hoverBackgroundColor: "rgba(37, 99, 235, 1)",
        hoverBorderWidth: 0,
        pointStyle: "circle",
      },
    },
    tooltips: { enabled: false },
    annotation: {
      annotations: data.xlabels.map((label, index) => ({
        type: "label",
        xValue: label,
        yValue: data.datasets[0].data[index],
        backgroundColor: colorMap[data.datasets[0].color] || colorMap.default,
        color: "#fff",
        content: `${data.datasets[0].data[index]}`,
        font: { size: 12 },
        xAdjust: 0,
        yAdjust: -10,
      })),
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 my-1 h-[98%]">
      {/* ===========================
        Header Section
      =========================== */}
      <div className="flex justify-between">
        <h2 className="mx-1 text-xl font-bold">{data.header.title}</h2>

        {/* ===========================
          Legends
        =========================== */}
        <div className="sm:flex hidden">
          {data.datasets.map((dataset, index) => (
            <div
              key={index}
              style={{
                color: colorMap[dataset.color] || colorMap.default,
              }}
              className="flex items-center space-x-2"
            >
              <div
                className={`mx-2 w-4 h-4 rounded-full`}
                style={{
                  backgroundColor: colorMap[dataset.color] || colorMap.default,
                }}
              ></div>
              <h1>{dataset.label}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* ===========================
        Header Subtitle Section
      =========================== */}
      <div className=" flex">
        <h2 className="mx-1  font-bold">{data.header.subTitle}</h2>
        <h2 className="text-orange-500  font-bold">{data.header.value}</h2>
      </div>

      {/* ===========================
        Graph Chart
      =========================== */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DataLineChart;
