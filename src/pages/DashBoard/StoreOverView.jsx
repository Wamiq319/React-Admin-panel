import React from "react";
import { useSelector } from "react-redux";

// Components

import {
  DataTable,
  Card,
  PageHeader,
  DashboardCard,
  DataBarChart,
  DataLineChart,
} from "../../components";

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

const StoreOverViewPage = () => {
  const words = useSelector((state) => state.lang.words);

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

  const revenueChartData2 = {
    xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    header: { title: "Revenue", subTitle: "Sales:", value: "$4800" },
    datasets: [
      {
        label: "Profit",
        data: [15, 22, 40, 65, 50, 70, 85, 72],
        color: "blue",
      },
      {
        label: "Revenue",
        data: [30, 45, 60, 80, 75, 85, 95, 90],
        color: "yellow",
      },
    ],
  };

  const customerData = {
    xlabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    header: {
      title: words["Customer Insights"],
      subTitle: "Active Customers:",
      value: "300", // Updated to reflect total active or unique customers across the entire period.
    },
    datasets: [
      {
        label: words["New Customers"],
        data: [120, 150, 130, 160], // New customers in each week
        color: "blue",
        type: "bar",
      },
      {
        label: words["Returning Customers"],
        data: [90, 110, 135, 170], // Returning customers in each week
        color: "orange",
        type: "bar",
      },
      {
        label: words["Total Sales"],
        data: [210, 320, 330, 420], // Sales growth based on both new and returning customers
        color: "green",
        type: "line",
      },
    ],
  };

  const tableHeader = [
    { key: "id", label: words["ID Order"] },
    { key: "name", label: words["Name"] },
    { key: "product", label: words["Product"] },
    { key: "date", label: words["Date"] },
    { key: "price", label: words["Price"] },
  ];

  const tableData = [
    {
      id: "#567898",
      name: "Kusoy Kevin",
      product: "Notebook",
      date: "18-09-2018",
      price: "$120.00",
      status: "Complete",
    },
    {
      id: "#675878",
      name: "Williams John",
      product: "Handphone",
      date: "23-09-2018",
      price: "$108.00",
      status: "Pending",
    },
    {
      id: "#547876",
      name: "Alex Martin",
      product: "Laptop",
      date: "26-09-2018",
      price: "$118.00",
      status: "Complete",
    },
    {
      id: "#657899",
      name: "John Andre",
      product: "Headset",
      date: "27-09-2018",
      price: "$100.00",
      status: "Canceled",
    },
    {
      id: "#675644",
      name: "Henderson",
      product: "Tablet",
      date: "30-09-2018",
      price: "$111.00",
      status: "Complete",
    },
    {
      id: "#567898",
      name: "Kusoy Kevin",
      product: "Notebook",
      date: "18-09-2018",
      price: "$120.00",
      status: "Complete",
    },
    {
      id: "#675878",
      name: "Williams John",
      product: "Handphone",
      date: "23-09-2018",
      price: "$108.00",
      status: "Pending",
    },
    {
      id: "#547876",
      name: "Alex Martin",
      product: "Laptop",
      date: "26-09-2018",
      price: "$118.00",
      status: "Complete",
    },
    {
      id: "#657899",
      name: "John Andre",
      product: "Headset",
      date: "27-09-2018",
      price: "$100.00",
      status: "Canceled",
    },
    {
      id: "#675644",
      name: "Henderson",
      product: "Tablet",
      date: "30-09-2018",
      price: "$111.00",
      status: "Complete",
    },
    {
      id: "#567898",
      name: "Kusoy Kevin",
      product: "Notebook",
      date: "18-09-2018",
      price: "$120.00",
      status: "Complete",
    },
    {
      id: "#675878",
      name: "Williams John",
      product: "Handphone",
      date: "23-09-2018",
      price: "$108.00",
      status: "Pending",
    },
    {
      id: "#547876",
      name: "Alex Martin",
      product: "Laptop",
      date: "26-09-2018",
      price: "$118.00",
      status: "Complete",
    },
    {
      id: "#657899",
      name: "John Andre",
      product: "Headset",
      date: "27-09-2018",
      price: "$100.00",
      status: "Canceled",
    },
    {
      id: "#675644",
      name: "Henderson",
      product: "Tablet",
      date: "30-09-2018",
      price: "$111.00",
      status: "Complete",
    },
  ];

  // Count statuses
  const statusCounts = tableData.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Total orders for progress calculation
  const totalOrders = tableData.length;
  // Status card data
  const statusCardData = [
    {
      title: "Completed",
      progress: Math.round(
        ((statusCounts["Complete"] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts["Complete"] || 0} orders completed`,
      Icon: FaCheckCircle,
      Color: "green",
    },
    {
      title: "Pending Orders",
      progress: Math.round(
        ((statusCounts["Pending"] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts["Pending"] || 0} orders pending`,
      Icon: FaBoxes,
      Color: "yellow",
    },
    {
      title: "Canceled Orders",
      progress: Math.round(
        ((statusCounts["Canceled"] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts["Canceled"] || 0} orders canceled`,
      Icon: FaBoxes,
      Color: "red",
    },
    {
      title: "New Orders",
      progress: 90,
      info: `${totalOrders} new orders`,
      Icon: FaBoxes,
      Color: "blue",
    },
  ];

  return (
    <div className="Dashboard-Wrapper bg-none">
      <PageHeader
        title={words["Store Overview"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Overview"], link: "/home/dashboard" },
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
        <div className=" md:w-[38%]  md:m-0 mt-2 ">
          <DataLineChart data={revenueChartData2} />
        </div>
      </div>

      {/* Bottom  */}
      <div className="flex flex-wrap sjustify-between py-4">
        {/* Table Card */}

        <div className="bg-white lg:w-[74%] xl:w-[75%]  hidden sm:block  w-full p-3 rounded-lg shadow-lg">
          <h4 className="text-orange-500 font-bold text-lg mb-4">
            {words["Orders"]}
          </h4>
          <DataTable
            tableData={tableData}
            tableHeader={tableHeader}
            rowsPerPage={5}
          />
        </div>

        {/* Status Cards */}
        <div className="w-full lg:w-[25%] xl:w-[25%] flex flex-col  h-full">
          <div className="flex flex-col justify-between flex-1">
            {statusCardData.map((card, index) => (
              <Card
                key={index}
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

export default StoreOverViewPage;
