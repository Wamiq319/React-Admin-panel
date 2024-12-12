import React from "react";
import { useSelector } from "react-redux";

// Components
import DataTable from "../../components/DataTable";
import Card from "../../components/StatusCards";
import PageHeader from "../../components/PageHeader";
// Icons from react-icons
import {
  AiFillEye,
  AiOutlineEdit,
  AiFillDelete,
  AiFillAppstore,
} from "react-icons/ai";

import {
  GiCardboardBox,
  GiShoppingCart,
  GiCardboardBoxClosed,
} from "react-icons/gi";

import {
  MdDoNotDisturbOn,
  MdWarning,
  MdFiberNew,
  MdOutlineDoNotDisturbAlt,
} from "react-icons/md";

import { FaTags, FaParachuteBox } from "react-icons/fa";

import { HiDocumentText } from "react-icons/hi";

import { BsFillCheckCircleFill, BsFillBox2Fill } from "react-icons/bs";

import { RiRefundFill, RiBox1Line } from "react-icons/ri";
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

  const options = [{ title: "View Details", route: "/view-details" }, ,];

  return (
    <div className="Dashboard-Wrapper bg-none ">
      <PageHeader
        title={words["Admin"]}
        breadcrumbs={`${words["Home"]} ~ ${words["Admin"]} ~ ${words["Dashboard"]}`}
      />
      {/* PRODUCT CARDS */}
      <div className="flex justify-between mt-4 w-full">
        <Card
          title={words["All Products"]}
          progress={100}
          info={100 + " " + words["Products"]}
          Icon={AiFillAppstore}
          Color="orange"
          options={options}
        />
        <Card
          title={words["Out of Stock"]}
          progress={70}
          info={70 + " " + words["Products"]}
          Icon={GiCardboardBox}
          Color="red"
          options={options}
        />
        <Card
          title={words["Limited Stock"]}
          progress={70}
          info={70 + " " + words["Products"]}
          Icon={MdWarning}
          Color="blue"
          options={options}
        />
        <Card
          title={words["On Sale"]}
          progress={60}
          info={60 + " " + words["Products"]}
          Icon={FaTags}
          Color="yellow"
          options={options}
        />
      </div>
      {/* ORDERS CARDS  */}
      <div className="flex justify-between mt-4 w-full">
        <Card
          title={words["All Orders"]}
          progress={100}
          info={100 + " " + words["Orders"]}
          Icon={HiDocumentText}
          Color="orange"
          options={options}
        />
        <Card
          title={words["Pending Orders"]}
          progress={30}
          info={30 + " " + words["Orders"]}
          Icon={FaParachuteBox}
          Color="green"
          options={options}
        />
        <Card
          title={words["Cancelled Orders"]}
          progress={70}
          info={70 + " " + words["Orders"]}
          Icon={RiRefundFill}
          Color="red"
          options={options}
        />
        <Card
          title={words["New Orders"]}
          progress={60}
          info={60 + " " + words["Orders"]}
          Icon={RiBox1Line}
          Color="blue"
          options={options}
        />
      </div>
      {/* TABLE  */}
      <div className="bg-white mt-4 w-full   p-3  rounded-lg shadow-lg">
        <h4 className="text-orange-500 font-bold text-lg mb-4">
          {words["Best Selling Product"]}
        </h4>
        <DataTable tableData={tableData} tableHeader={productColumns} />
      </div>
    </div>
  );
};

export default DashboardPage;
