import React from "react";
import { DataTable, PageHeader } from "../../components";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar, FaEye } from "react-icons/fa";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { WirelessHeadphone } from "../../assets";

const ProductListPage = () => {
  const words = useSelector((state) => state.lang.words);

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
        <button className="text-red-400 hover:text-red-500  border-red-400 hover:border-red-500 rounded-md  p-2 border-2  ">
          <FaTrashAlt />
        </button>
        <button className="text-blue-400 hover:text-blue-500  border-blue-400 hover:border-blue-500 rounded-md  p-2 border-2  ">
          <FaEye />
        </button>
      </div>
    );
  };

  const productData = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: WirelessHeadphone, // Replace with actual image URL
      price: "$99.99",
      category: "Electronics",
      rating: 4.5,
      status: "Available",
    },
    {
      id: 2,
      name: "Smartphone",
      image: "https://via.placeholder.com/100",
      price: "$699.99",
      category: "Mobile Phones",
      rating: 4.0,
      status: "Out of Stock",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      image: "https://via.placeholder.com/100",
      price: "$1299.99",
      category: "Computers",
      rating: 3.5,
      status: "Available",
    },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto ">
      <PageHeader
        title={words["Product List"] || "Product List"}
        breadcrumbs={[
          { label: words["Home"] || "Home", link: "/home/dashboard" },
          { label: words["Products"] || "Products", link: "/home/products" },
        ]}
      />

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
  );
};

export default ProductListPage;
