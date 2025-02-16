import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Import the BarElement component for the Bar chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ Title, INFO }) => {
  // Destructure Title prop for easy access to its parts
  const {
    icon: TitleIcon,
    LABEL: TitleLabel,
    Value: TitleValue,
    color: TitleColor,
  } = Title;

  // Function to extract numeric value from a string
  const extractNumericValue = (value) => {
    if (typeof value === "string") {
      const numericValue = value.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
      return parseFloat(numericValue); // Convert to float
    }
    return value; // Return value as is if it's already a number
  };

  // Color mapping: dynamically associate colors with specific names
  const colorMap = {
    red: "rgba(239, 68, 68, 1)",
    green: "rgba(34, 197 ,94, 1)",
    orange: "rgba(249 ,115 ,22, 1)",
    yellow: "rgba(234, 179, 8, 1)",
    yellow: "rgba(59, 130 ,246 , 1)",
    default: "rgba(249 ,115 ,22, 0.6)", // Fallback color
  };

  // Prepare data for the small Bar Graph on the title section
  const barChartData = {
    labels: INFO.map((item) => item.LABEL), // Labels for each INFO item
    datasets: [
      {
        label: "Info Values",
        data: INFO.map((item) => extractNumericValue(item.Value)), // Convert string values to numeric
        backgroundColor: INFO.map(
          (item) => colorMap[item.color] || colorMap.default
        ), // Dynamic color mapping
      },
    ],
  };

  return (
    <div className="bg-white  sm:m-0 my-1  p-2 rounded-lg shadow-lg relative">
      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {TitleIcon && (
            <div
              className={`p-2 rounded-lg bg-${TitleColor}-300 bg-opacity-50 mr-2`}
            >
              <TitleIcon size={30} className={`text-${TitleColor}-500`} />
            </div>
          )}

          <div className="flex flex-col">
            <h2
              className={`font-bold text-xl text-${TitleColor}-500 flex items-center`}
            >
              {TitleLabel}
            </h2>
            <div className="text-lg font-bold text-gray-800 mt-1">
              {TitleValue}
            </div>
          </div>
        </div>

        {/* Small Bar Chart in the right corner */}
        <div className="w-24 h-20 hidden md:block">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false }, // Hide the legend
                tooltip: {
                  enabled: true, // Enable tooltip on hover
                  mode: "index", // Tooltip appears for bars on hover
                },
              },
              scales: {
                x: {
                  ticks: { display: false }, // Hide X axis labels
                  grid: { display: false }, // Remove grid lines on X axis
                },
                y: {
                  ticks: { display: false }, // Hide Y axis labels
                  grid: { display: false }, // Remove grid lines on Y axis
                },
              },
            }}
          />
        </div>
      </div>

      {/* Separator Line */}
      <div className="m-2 border-t border-gray-300" />

      {/* INFO Section */}
      <div className={`grid grid-cols-3 gap-4`}>
        {INFO.map((item, index) => {
          // Destructure INFO item for easy access
          const {
            icon: ItemIcon,
            LABEL: ItemLabel,
            Value: ItemValue,
            color: ItemColor,
          } = item;

          return (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
            >
              {/* Icon and Value */}
              <div className={`text-2xl font-bold text-${ItemColor}-500`}>
                <ItemIcon className=" mr-2 hidden md:block" /> {ItemValue}
              </div>
              {/* Label Text */}
              <div className="text-sm text-gray-600 text-nowrap">
                {ItemLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCard;
