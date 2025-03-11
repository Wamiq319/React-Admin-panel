import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  Tooltip,
  Legend,
  RadarController,
} from "chart.js";

// Register necessary ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  RadarController,
  Tooltip,
  Legend
);

const colorMap = {
  orange: "rgba(239, 68, 68, 0.6)", // Red
  green: "rgba(34, 197, 94, 0.6)", // Green
  blue: "rgba(249, 115, 22, 0.6)", // Orange
  purple: "rgba(129, 140, 248, 0.6)", // Purple
  yellow: "rgba(253, 230, 138, 0.6)", // Yellow
};

const DataRadarChart = ({ data }) => {
  const datasets = data.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data,
    borderColor: colorMap[dataset.borderColor] || colorMap.blue,
    backgroundColor: (colorMap[dataset.borderColor] || colorMap.blue).replace(
      "0.6",
      "0.15"
    ),
    pointBackgroundColor: colorMap[dataset.borderColor] || colorMap.blue,
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: colorMap[dataset.borderColor] || colorMap.blue,
    borderWidth: 0,
  }));

  const chartData = {
    labels: data.labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: { color: "rgba(0, 0, 0, 0.2)" },
        grid: { color: "rgba(0, 0, 0, 0.1)", circular: false },
        ticks: { display: true, color: "black" },
        pointLabels: { font: { size: 10, weight: "bold" }, color: "black" },
        borderColor: "transparent",
      },
    },
    elements: {
      point: { radius: 4, hoverRadius: 6 },
    },
  };

  return (
    <div className="bg-white h-[98%] rounded-lg shadow-lg   my-1 flex flex-col justify-center items-center">
      {/* ===========================
           Header Section
         =========================== */}

      {/* ===========================
           Chart Section
         =========================== */}

      <div className="md:w-3/4 w-full flex  justify-between items-center">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DataRadarChart;
