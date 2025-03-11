import React from "react";
import { useSelector } from "react-redux";

// Importing UI Components
import {
  DataTable,
  Card,
  PageHeader,
  DashboardCard,
  DataBarChart,
  DataLineChart,
  DataPieChart,
  DataRadarChart,
} from "../../components";

// Importing Icons from react-icons
import {
  FaMoneyBillWaveAlt,
  FaTag,
  FaChartLine,
  FaStore,
  FaUsers,
  FaDollarSign,
  FaBoxes,
  FaCheckCircle,
} from "react-icons/fa";

const SalesAnalyticsPage = () => {
  // Fetching translated words from Redux store
  const words = useSelector((state) => state.lang.words);

  // Sales Dashboard Data (Cards at the top)
  const salesDashboardData = [
    {
      Title: {
        icon: FaDollarSign,
        LABEL: words["Total Sales"],
        Value: "$50,000",
        color: "green",
      },
      INFO: [
        {
          icon: FaChartLine,
          LABEL: words["Monthly Growth"],
          Value: "10%",
          color: "blue",
        },
        {
          icon: FaUsers,
          LABEL: words["New Customers"],
          Value: "150",
          color: "orange",
        },
        {
          icon: FaStore,
          LABEL: words["Total Stores"],
          Value: "25",
          color: "red",
        },
      ],
    },
    {
      Title: {
        icon: FaMoneyBillWaveAlt,
        LABEL: words["Total Revenue"],
        Value: "$35,000",
        color: "blue",
      },
      INFO: [
        {
          icon: FaTag,
          LABEL: words["Discounts Given"],
          Value: "$5,000",
          color: "red",
        },
        {
          icon: FaTag,
          LABEL: words["Discount"],
          Value: "$4,500",
          color: "orange",
        },
        {
          icon: FaStore,
          LABEL: words["Total Stores"],
          Value: "25",
          color: "green",
        },
      ],
    },
  ];

  // Order Status Data (Middle Cards)
  const statusCardData = [
    {
      title: words["Completed"],
      progress: 88,
      info: `90 ${words["orders completed"]}`,
      Icon: FaCheckCircle,
      Color: "green",
    },
    {
      title: words["Pending Orders"],
      progress: 88,
      info: `9 ${words["orders pending"]}`,
      Icon: FaBoxes,
      Color: "yellow",
    },
    {
      title: words["Canceled Orders"],
      progress: 98,
      info: `8 ${words["orders canceled"]}`,
      Icon: FaBoxes,
      Color: "red",
    },
    {
      title: words["New Orders"],
      progress: 90,
      info: `9 ${words["orders new"]}`,
      Icon: FaBoxes,
      Color: "blue",
    },
  ];

  // Pie Chart Data (Sales Overview)
  const pieChartData = {
    header: {
      title: words["Sales Overview"],
    },
    datasets: [
      { label: "Product A", color: "red", data: [30, 20, 50] },
      { label: "Product B", color: "green", data: [15, 35, 50] },
      { label: "Product C", color: "blue", data: [40, 30, 30] },
      { label: "Product D", color: "yellow", data: [60, 20, 20] },
    ],
  };

  // Line Chart Data (Sales Performance Over Time)
  const salesChartData = {
    xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    header: {
      title: words["Performance"],
      subTitle: words["Total Sales"],
      value: "$50,000",
    },
    datasets: [
      {
        label: words["Revenue"],
        data: [5000, 8000, 7500, 12000, 15000, 11000, 13000, 16000],
        color: "yellow",
      },
      {
        label: words["Profit"],
        data: [1000, 1500, 2500, 3000, 3500, 4000, 4200, 4500],
        color: "green",
      },
    ],
  };

  // Radar Chart Data (Overall Business Performance)
  const radarData = {
    header: { title: words["Performance"] },
    labels: ["Sales", "AOV", "Units", "CAC", "SGR"],
    datasets: [
      { label: "Q1", borderColor: "orange", data: [70, 84, 57, 100, 50] },
      { label: "Q2", borderColor: "green", data: [60, 90, 53, 85, 65] },
      { label: "Q3", borderColor: "blue", data: [50, 60, 45, 80, 99] },
      { label: "Q4", borderColor: "purple", data: [50, 60, 45, 95, 60] },
    ],
  };

  return (
    <div className="Dashboard-Wrapper bg-none">
      {/* Page Header with Breadcrumbs */}
      <PageHeader
        title={words["Sales Dashboard"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Sales"], link: "/sales/sales-analytics" },
        ]}
      />

      {/* Sales Dashboard Cards Section */}
      <div className="flex flex-wrap mt-4 justify-between sm:flex-col md:flex-row">
        {salesDashboardData.map((card, index) => (
          <DashboardCard key={index} Title={card.Title} INFO={card.INFO} />
        ))}
        <div className="w-full md:w-[32%]">
          <DataLineChart data={salesChartData} />
        </div>
      </div>

      {/* Order Status Cards Section */}
      <div className="flex flex-col md:flex-row justify-between">
        {statusCardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            progress={card.progress}
            info={card.info}
            Icon={card.Icon}
            Color={card.Color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap mt-2 w-full justify-between gap-4 items-start">
        <div className="w-full md:w-[48%] h-[28rem]">
          <DataRadarChart data={radarData} />
        </div>
        <div className="w-full md:w-[48%] h-[28rem]">
          {/* Add another chart here if needed */}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;
