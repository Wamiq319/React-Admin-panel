// React & Redux
import React from "react";
import { useSelector } from "react-redux";

// Icons
import { FaStar, FaStarHalfAlt, FaRegStar, FaEye } from "react-icons/fa";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

// Components
import { DataTable, PageHeader, Button, SearchInput } from "../../components";

// Assets
import {
  WirelessHeadphone,
  GamingLapTop,
  HeadSet,
  IphoneX,
  Watch,
  LapTop,
} from "../../assets";

const ProductListPage = () => {
  // ===========================
  // Redux & State Slices
  // ===========================
  const words = useSelector((state) => state.lang.words);

  // ===========================
  // Helper Functions
  // ===========================
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  const handleActions = (row) => {
    return (
      <div className="flex space-x-2">
        <button className="text-white bg-green-400 hover:bg-green-500 p-2 rounded-md">
          <FaPencilAlt />
        </button>
        <button className="text-red-400 hover:text-red-500 border-red-400 hover:border-red-500 rounded-md p-2 border-2">
          <FaTrashAlt />
        </button>
        <button className="text-blue-400 hover:text-blue-500 border-blue-400 hover:border-blue-500 rounded-md p-2 border-2">
          <FaEye />
        </button>
      </div>
    );
  };

  // ===========================
  // Mock Data
  // ===========================
  const productData = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: WirelessHeadphone,
      price: "$99.99",
      category: "Electronics",
      rating: 4.5,
      status: "Available",
    },
    {
      id: 2,
      name: "Smartphone",
      image: IphoneX,
      price: "$699.99",
      category: "Mobile Phones",
      rating: 4.0,
      status: "Out of Stock",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      image: GamingLapTop,
      price: "$1299.99",
      category: "Computers",
      rating: 3.5,
      status: "Available",
    },
    {
      id: 4,
      name: "HeadSet",
      image: HeadSet,
      price: "$1599.99",
      category: "Computers",
      rating: 5.0,
      status: "Available",
    },
    {
      id: 5,
      name: "LapTop",
      image: LapTop,
      price: "$1299.99",
      category: "Computers",
      rating: 3.5,
      status: "Available",
    },
    {
      id: 6,
      name: "Swis Watch",
      image: Watch,
      price: "$1699.99",
      category: "Accesories",
      rating: 3.5,
      status: "Out of Stock",
    },
  ];

  // ===========================
  // JSX Render
  // ===========================
  return (
    <div className="container mx-auto">
      {/* Page Header */}
      <PageHeader
        title={words["Product List"] || "Product List"}
        breadcrumbs={[
          { label: words["Home"] || "Home", link: "/home/dashboard" },
          { label: words["Products"] || "Products", link: "/home/products" },
        ]}
      />

      {/* Product List Section */}
      <div className="sm:bg-white mt-3 w-full sm:p-3 bg-none p-0 rounded-lg  sm:shadow-lg">
        {/* Header and Search Bar */}
        <div className="flex justify-between">
          <SearchInput
            className="w-72"
            placeholder={"Search Prodcut by name"}
          />

          <Button
            type="button"
            text="Add Product"
            className="px-4 bg-green-500 hover:bg-green-600 sm:flex hidden"
          />
        </div>

        {/* DataTable */}
        <DataTable
          tableHeader={[
            { key: "image", label: "Image" },
            { key: "name", label: "Product Name" },
            { key: "price", label: "Price" },
            { key: "category", label: "Category" },
            { key: "rating", label: "Rating" },
          ]}
          hasStatusColumn={true}
          tableData={productData.map((product) => ({
            ...product,
            rating: renderStars(product.rating),
          }))}
          buttons={handleActions}
          searchColumn="name"
          sortKey="id"
          actionsColumnName="Actions"
          sortDirection="ascending"
          rowsPerPage={5}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
