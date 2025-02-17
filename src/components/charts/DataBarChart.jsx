import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

// Color Map (can be extended as needed)
const colorMap = {
  red: "rgba(239, 68, 68, 0.6)",
  green: "rgba(34, 197 ,94, 0.6)",
  orange: "rgba(249 ,115 ,22, 0.6)",
  yellow: "rgba(234, 179, 8, 0.6)",
  blue: "rgba(59, 130 ,246 , 0.6)",
  default: "rgba(249 ,115 ,22, 0.6)", // Fallback color
};

const DataBarChart = ({ data }) => {
  // Generate datasets dynamically without hardcoding any keys
  const datasets = data.datasets.map((dataset) => ({
    type: dataset.type || "bar", // Default to bar, but allow line as well
    label: dataset.label,
    data: dataset.data,
    backgroundColor:
      dataset.type === "line"
        ? "transparent"
        : colorMap[dataset.color] || colorMap.default,
    borderColor: colorMap[dataset.color] || colorMap.default,
    borderWidth: dataset.type === "line" ? 2 : 0,
    pointRadius: dataset.type === "line" ? 4 : 0,
    tension: dataset.type === "line" ? 0.3 : 0,
    barThickness:
      dataset.type === "line" ? undefined : 180 / dataset.data.length,
  }));

  // Chart Data
  const chartData = {
    labels: data.xlabels,
    datasets: datasets,
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          color: "#4B5563",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        barPercentage: 0.6,
        categoryPercentage: 0.4,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#4B5563",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full my-1 flex flex-col justify-end">
      {/* Chart */}
      <div className="flex justify-between">
        <div className="md:w-3/4 w-full">
          <Bar data={chartData} options={options} />
        </div>

        {/* Labels on the right */}
        <div className="sm:flex flex-col justify-start items-center space-y-2 w-1/4 hidden">
          {data.datasets.map((dataset, index) => (
            <div
              key={index}
              className="flex space-x-2 w-full items-center"
              style={{
                color: colorMap[dataset.color] || colorMap.default,
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    dataset.type === "line"
                      ? "transparent"
                      : colorMap[dataset.color] || colorMap.default,
                  border:
                    dataset.type === "line"
                      ? `2px solid ${
                          colorMap[dataset.color] || colorMap.default
                        }`
                      : "none",
                }}
              ></div>
              <span>{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataBarChart;
