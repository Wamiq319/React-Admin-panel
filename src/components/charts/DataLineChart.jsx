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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const DataLineChart = ({ data }) => {
  const chartData = {
    labels: data.xlabels,
    datasets: [
      {
        label: data.legend1,
        data: data.data1,
        borderColor: "rgba(37, 99, 235, 1)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
        fill: "start",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(256, 256, 256, 1)",
        pointBorderWidth: 0,
      },
      {
        label: data.legend2,
        data: data.data2,
        borderColor: "rgba(251, 191, 36, 1)",
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        tension: 0.4,
        fill: "start",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(256, 256, 256, 1)",
        pointBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: false,
        min: data.ylabel.start,
        stepSize: data.ylabel.step,

        grid: {
          display: false,
        },
        ticks: {
          display: true,
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 6, // Adjust the radius when hovered
        hoverBackgroundColor: "rgba(37, 99, 235, 1)", // Change the point color when hovered
        hoverBorderWidth: 0,
        pointStyle: "circle",
      },
    },
    // Custom code to show the value of the point when hovered
    tooltips: {
      enabled: false, // Disable tooltip
    },
    annotation: {
      annotations: data.xlabels.map((label, index) => ({
        type: "label",
        xValue: label,
        yValue: data.data1[index], // or you can use data.data2[index] for the second line
        backgroundColor: "rgba(37, 99, 235, 1)",
        color: "#fff",
        content: `${data.data1[index]}`, // Or `${data.data2[index]}` for the second dataset
        font: {
          size: 12,
        },
        xAdjust: 0,
        yAdjust: -10, // Adjust vertical position of the label
      })),
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4  my-1 h-full ">
      <div className="flex justify-between">
        <h2 className="mx-2 text-xl font-bold">Analytics</h2>
        <div className="sm:flex hidden">
          <div className="mx-2 bg-yellow-600 w-5 h-5 rounded-full"></div>
          <h1>{data.legend1}</h1>
          <div className="mx-2 bg-blue-600 w-5 h-5 rounded-full"></div>
          <h1>{data.legend2}</h1>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DataLineChart;
