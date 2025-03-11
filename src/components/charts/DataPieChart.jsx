import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering the chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Color map for the chart
const colorMap = {
  red: "rgba(239, 68, 68, 0.6)",
  green: "rgba(34, 197 ,94, 0.6)",
  orange: "rgba(249 ,115 ,22, 0.6)",
  yellow: "rgba(234, 179, 8, 0.6)",
  blue: "rgba(59, 130 ,246 , 0.6)",
  default: "rgba(249 ,115 ,22, 0.6)",
};

// DataPieChart component
const DataPieChart = ({ data }) => {
  // ===========================
  // Data preparation for chart
  // ===========================
  const datasets = [
    {
      data: data.data,
      backgroundColor: data.datasets.map(
        (dataset) => colorMap[dataset.color] || colorMap.default
      ),
      hoverBackgroundColor: data.datasets.map(
        (dataset) => colorMap[dataset.color] || colorMap.default
      ),
    },
  ];

  const chartData = {
    labels: data.datasets.map((dataset) => dataset.label),
    datasets: datasets,
  };

  // ===========================
  // Chart options configuration
  // ===========================
  const options = {
    responsive: true,
    maintainAspectRatio: true, // Maintain aspect ratio
    cutoutPercentage: 80, // This will make the pie smaller by increasing the cutout percentage (hole in the middle)
    plugins: {
      legend: false,
    },
    hover: { mode: "nearest", intersect: true },
  };

  return (
    <div className="bg-white h-[99%] rounded-lg shadow-lg p-4 my-1  flex flex-col">
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
        Pie Chart
      =========================== */}
      <div className="w-full h-[95%] flex justify-center items-center  ">
        {" "}
        {/* Control the size here using Tailwind CSS */}
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DataPieChart;
