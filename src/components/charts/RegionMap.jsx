import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { GeoChart } from "chartjs-chart-geo";

const RegionMap = ({ data, title, subtitle, colorMap }) => {
  const [worldData, setWorldData] = useState(null);

  // Dynamically import world-atlas from the CDN
  useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/world.js")
      .then((module) => {
        setWorldData(module); // This is the world data from the CDN
      })
      .catch((error) => {
        console.error("Error loading world data:", error);
      });
  }, []);

  // Ensure worldData is loaded before rendering the map
  if (!worldData) {
    return <div>Loading...</div>;
  }

  // Function to fetch data for each country
  const getCountryData = (countryCode) => {
    return (
      data[countryCode] || {
        newOrder: 0,
        orderSent: 0,
        delivered: 0,
        cancelled: 0,
      }
    );
  };

  // Set up map chart data
  const mapChartData = {
    labels: ["newOrder", "orderSent", "delivered", "cancelled"],
    datasets: [
      {
        label: "Order Data",
        data: Object.keys(worldData.countries).map((countryCode) => {
          const countryData = getCountryData(countryCode);
          return {
            feature: worldData.countries[countryCode],
            value: countryData.newOrder, // Color based on newOrder for simplicity
          };
        }),
        backgroundColor: (context) => {
          const { dataIndex } = context;
          const countryData = Object.values(data)[dataIndex] || {};
          const newOrder = countryData.newOrder || 0;
          return newOrder > 100
            ? colorMap.newOrder
            : newOrder > 50
            ? colorMap.orderSent
            : newOrder > 30
            ? colorMap.delivered
            : colorMap.cancelled;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 my-1 h-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-gray-600">{subtitle}</div>
      </div>

      <div className="h-96 w-full">
        <GeoChart type="choropleth" data={mapChartData} options={options} />
      </div>
    </div>
  );
};

export default RegionMap;
