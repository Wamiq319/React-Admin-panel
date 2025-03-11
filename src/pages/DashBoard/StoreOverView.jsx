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
  // Fetching words from Redux store for language switching
  const words = useSelector((state) => state.lang.words);

  /** ------------------------------
   * 📌 DASHBOARD CARDS DATA
   * ------------------------------ */
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
        { icon: FaClock, LABEL: words["Pending"], Value: 20, color: "green" },
        { icon: FaBan, LABEL: words["Cancelled"], Value: 80, color: "red" },
        { icon: FaTag, LABEL: words["New"], Value: 20, color: "blue" },
      ],
    },
    {
      Title: {
        icon: FaMoneyBillWaveAlt,
        LABEL: words["Sales"],
        Value: "$5000",
        color: "orange",
      },
      INFO: [
        {
          icon: FaTag,
          LABEL: words["Total Revenue"],
          Value: "$3000",
          color: "blue",
        },
        {
          icon: FaCheckCircle,
          LABEL: words["Profit"],
          Value: "$1200",
          color: "green",
        },
        {
          icon: FaTag,
          LABEL: words["Discounts Given"],
          Value: "$800",
          color: "orange",
        },
      ],
    },
  ];

  /** ------------------------------
   * 📌 REVENUE & CUSTOMER CHART DATA
   * ------------------------------ */
  const revenueChartData2 = {
    xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    header: {
      title: words["Revenue"],
      subTitle: words["Sales"],
      value: "$4800",
    },
    datasets: [
      {
        label: words["Profit"],
        data: [15, 22, 40, 65, 50, 70, 85, 72],
        color: "blue",
      },
      {
        label: words["Revenue"],
        data: [30, 45, 60, 80, 75, 85, 95, 90],
        color: "yellow",
      },
    ],
  };

  const customerData = {
    xlabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    header: {
      title: words["Customer Insights"],
      subTitle: words["Active Customers"],
      value: "300",
    },
    datasets: [
      {
        label: words["New Customers"],
        data: [120, 150, 130, 160],
        color: "blue",
        type: "bar",
      },
      {
        label: words["Returning Customers"],
        data: [90, 110, 135, 170],
        color: "orange",
        type: "bar",
      },
      {
        label: words["Total Sales"],
        data: [210, 320, 330, 420],
        color: "green",
        type: "line",
      },
    ],
  };

  /** ------------------------------
   * 📌 TABLE DATA FOR ORDERS
   * ------------------------------ */
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
      status: words["Complete"],
    },
    {
      id: "#675878",
      name: "Williams John",
      product: "Handphone",
      date: "23-09-2018",
      price: "$108.00",
      status: words["Pending"],
    },
    {
      id: "#547876",
      name: "Alex Martin",
      product: "Laptop",
      date: "26-09-2018",
      price: "$118.00",
      status: words["Complete"],
    },
    {
      id: "#657899",
      name: "John Andre",
      product: "Headset",
      date: "27-09-2018",
      price: "$100.00",
      status: words["Canceled"],
    },
    {
      id: "#675644",
      name: "Henderson",
      product: "Tablet",
      date: "30-09-2018",
      price: "$111.00",
      status: words["Complete"],
    },
  ];

  /** ------------------------------
   * 📌 STATUS CARD DATA
   * ------------------------------ */
  const statusCounts = tableData.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const totalOrders = tableData.length;

  const statusCardData = [
    {
      title: words["Completed"],
      progress: Math.round(
        ((statusCounts[words["Complete"]] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts[words["Complete"]] || 0} ${
        words["orders completed"]
      }`,
      Icon: FaCheckCircle,
      Color: "green",
    },
    {
      title: words["Pending Orders"],
      progress: Math.round(
        ((statusCounts[words["Pending"]] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts[words["Pending"]] || 0} ${words["orders pending"]}`,
      Icon: FaBoxes,
      Color: "yellow",
    },
    {
      title: words["Canceled Orders"],
      progress: Math.round(
        ((statusCounts[words["Canceled"]] || 0) / totalOrders) * 100
      ),
      info: `${statusCounts[words["Canceled"]] || 0} ${
        words["orders canceled"]
      }`,
      Icon: FaBoxes,
      Color: "red",
    },
  ];

  return (
    <div className="Dashboard-Wrapper bg-none">
      {/* 📌 PAGE HEADER */}
      <PageHeader
        title={words["Store Overview"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Overview"], link: "/home/dashboard" },
        ]}
      />

      {/* 📌 DASHBOARD CARDS */}
      <div className="flex flex-wrap mt-4 justify-between sm:flex-col md:flex-row">
        {dashboardcardData.map((card, index) => (
          <DashboardCard key={index} Title={card.Title} INFO={card.INFO} />
        ))}
      </div>

      {/* 📌 CHARTS */}
      <div className="flex flex-wrap mt-4 w-full justify-between sm:flex-col md:flex-row">
        <div className="md:w-[60%]">
          <DataBarChart data={customerData} />
        </div>
        <div className="md:w-[38%] md:m-0 mt-2">
          <DataLineChart data={revenueChartData2} />
        </div>
      </div>

      {/* 📌 TABLE & STATUS CARDS */}
      <div className="flex flex-wrap justify-between py-4">
        <div className="bg-white lg:w-[74%] hidden sm:block w-full p-3 rounded-lg shadow-lg">
          <h4 className="text-orange-500 font-bold text-lg mb-4">
            {words["Orders"]}
          </h4>
          <DataTable
            tableData={tableData}
            tableHeader={tableHeader}
            rowsPerPage={5}
          />
        </div>
        <div className="w-full lg:w-[25%] flex flex-col">
          {statusCardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreOverViewPage;
