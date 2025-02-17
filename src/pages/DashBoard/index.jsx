import React from "react";
import { useSelector } from "react-redux";

// Components
import DataTable from "../../components/DataTable";
import Card from "../../components/StatusCards";
import PageHeader from "../../components/PageHeader";
import DashboardCard from "../../components/DashboardCard";
import DataLineChart from "../../components/charts/DataLineChart";
import DataBarChart from "../../components/charts/DataBarChart";

// Icons from react-icons
import {
  FaBoxes,
  FaTag,
  FaCheckCircle,
  FaBan,
  FaClock,
  FaExclamationTriangle,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";

// DATA IMPORTS MOCK DATABASE
import { getProductSummary } from "../../Mock-DataBase/product";

const DashboardPage = () => {
  const words = useSelector((state) => state.lang.words);
  const tableData = getProductSummary();

  const productColumns = [
    { key: "id", label: words["ProductId"] },
    { key: "productImage", label: "Image" },
    { key: "productName", label: words["Name"] },
    { key: "price", label: words["Price"] },
    { key: "stockQuantity", label: words["Stock"] },
    { key: "productDescription", label: "Description" },
  ];

  // Storing The for Dahhboard Cards and charts
  const dashboardcardData = [
    {
      Title: {
        icon: FaBoxes,
        LABEL: words["Products"],
        Value: 120,
        color: "orange",
      },
      INFO: [
        { icon: FaBan, LABEL: words["Out of Stock"], Value: 20, color: "red" },
        {
          icon: FaExclamationTriangle,
          LABEL: words["Limited"],
          Value: 80,
          color: "blue",
        },
        { icon: FaTag, LABEL: words["On Sale"], Value: 20, color: "yellow" },
      ],
    },

    {
      Title: {
        icon: FaBoxes,
        LABEL: words["Orders"],
        Value: 150,
        color: "orange",
      },
      INFO: [
        {
          icon: FaClock,
          LABEL: words["Pending"],
          Value: 20,
          color: "green",
        },
        {
          icon: FaBan,
          LABEL: words["Cancelled"],
          Value: 80,
          color: "red",
        },
        {
          icon: FaTag,
          LABEL: words["New"],
          Value: 20,
          color: "blue",
        },
      ],
    },
    {
      Title: {
        icon: FaMoneyBillWaveAlt,
        LABEL: "Sales",
        Value: "$5000", // Total sales revenue
        color: "orange",
      },
      INFO: [
        { icon: FaTag, LABEL: "Total Revenue", Value: "$3000", color: "blue" }, // Total revenue from sales
        {
          icon: FaCheckCircle,
          LABEL: "Profit",
          Value: "$1200",
          color: "green",
        }, // Total profit
        {
          icon: FaTag,
          LABEL: "Discounts Given",
          Value: "$800",
          color: "orange",
        },
      ],
    },
  ];
  const statusCardData = [
    {
      title: "Card 1",
      progress: 50,
      info: "Some info about card ",
      Icon: FaBoxes, // Just as an example, you can replace it with any icon component
      Color: "blue",
    },
    {
      title: "Card 2",
      progress: 75,
      info: "Some info about card ",
      Icon: FaBoxes,
      Color: "green",
    },
  ];
  const revenueChartData = {
    legend1: "Expenses",
    legend2: "Revenue",
    xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    ylabel: { start: 10, step: 10 },
    data1: [20, 30, 50, 80, 23, 60, 75, 55],
    data2: [10, 25, 40, 70, 50, 40, 65, 45],
  };
  const customerData = {
    xlabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "New Customers",
        data: [150, 200, 180, 220],
        color: "blue",
        type: "bar",
      },
      {
        label: "Returning Customers",
        data: [100, 120, 130, 150],
        color: "orange",
        type: "bar",
      },
      {
        label: "sales",
        data: [250, 350, 310, 380],
        color: "green",
        type: "line",
      },
    ],
  };

  return (
    <div className="Dashboard-Wrapper bg-none">
      <PageHeader
        title={words["Admin"]}
        breadcrumbs={[
          { label: words["Home"], link: "/home/dashboard" },
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Dashboard"] },
        ]}
      />
      {/* PRODUCT CARDS */}
      <div className="flex flex-wrap mt-4  justify-between sm:flex-col md:flex-row">
        {dashboardcardData.map((card, index) => (
          <DashboardCard key={index} Title={card.Title} INFO={card.INFO} />
        ))}
      </div>

      {/* Datachart */}
      <div className="flex flex-wrap mt-4 w-full justify-between  sm:flex-col md:flex-row">
        <div className="md:w-[60%]   ">
          <DataBarChart data={customerData} />
        </div>
        <div className=" md:w-[38%]  md:m-0 mt-2">
          <DataLineChart data={revenueChartData} />
        </div>
      </div>

      {/* Bottom  */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 xl:w-3/4 p-3">
          <div className="bg-white mt-4 w-full p-3 rounded-lg shadow-lg">
            <h4 className="text-orange-500 font-bold text-lg mb-4">
              {words["Best Selling Product"]}
            </h4>
            <DataTable tableData={tableData} tableHeader={productColumns} />
          </div>
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/4 p-3">
          <div className="flex  flex-wrap ">
            {statusCardData.map((card, index) => (
              <Card
                title={card.title}
                progress={card.progress}
                info={card.info}
                Icon={card.Icon}
                Color={card.Color}
                options={card.options}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
