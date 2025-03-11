import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

// Components
import { DataTable, PageHeader, SearchInput } from "../../components";
import OrderInfoModal from "./OrderDetailPage"; // Correct Import

// Sample order data
const initialOrdersData = [
  {
    id: 101,
    customer: "John Doe",
    total: "$250.00",
    status: "Processing",
    date: "2025-03-12",
    address: "123 Main St, Los Angeles, CA",
    barcode: "1234567890",
    progress: 20,
  },
  {
    id: 102,
    customer: "Sarah Smith",
    total: "$99.99",
    status: "Shipped",
    date: "2025-03-11",
    address: "45 Elm St, New York, NY",
    barcode: "9876543210",
    progress: 60,
  },
  {
    id: 103,
    customer: "David Johnson",
    total: "$400.00",
    status: "Delivered",
    date: "2025-03-10",
    address: "77 Oak Ave, Miami, FL",
    barcode: "1122334455",
    progress: 100,
  },
];

const OrderListPage = () => {
  const words = useSelector((state) => state.lang.words);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState(initialOrdersData);

  // Order Status Styling
  const statusStyles = {
    Processing: "bg-yellow-200 text-yellow-800",
    Shipped: "bg-yellow-200 text-yellow-800",
    Delivered: "bg-green-200 text-green-800",
    Canceled: "bg-red-200 text-red-800",
  };

  // Status Options for Dropdown
  const statusOptions = [
    { value: "Processing", label: words["Processing"] || "Processing" },
    { value: "Shipped", label: words["Shipped"] || "Shipped" },
    { value: "Delivered", label: words["Delivered"] || "Delivered" },
    { value: "Canceled", label: words["Canceled"] || "Canceled" },
  ];

  // Update Status Function
  const handleStatusChange = (orderId, newStatus) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Open Order Details Modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Action Button for Viewing Order Details
  const handleActions = (row) => (
    <button
      onClick={() => handleViewOrder(row)}
      className="text-blue-400 hover:text-blue-500 border-blue-400 hover:border-blue-500 rounded-md p-2 border-2"
    >
      <FaEye />
    </button>
  );

  return (
    <div className="container mx-auto">
      <PageHeader
        title={words["Order List"] || "Order List"}
        breadcrumbs={[
          { label: words["Home"] || "Home", link: "/home/dashboard" },
          { label: words["Orders"] || "Orders", link: "/home/orders" },
        ]}
      />
      <div className="bg-white p-4 shadow-lg rounded-lg mt-3">
        <div className="flex justify-between mb-4">
          <SearchInput
            className="w-72"
            placeholder={words["Search Order"] || "Search Order..."}
          />
        </div>

        <DataTable
          tableHeader={[
            { key: "id", label: words["Order ID"] || "Order ID" },
            { key: "customer", label: words["Customer"] || "Customer" },
            { key: "total", label: words["Total"] || "Total" },
            { key: "status", label: words["Status"] || "Status" },
            { key: "date", label: words["Date"] || "Date" },
            {
              key: "statusDropdown",
              label: words["Change Status"] || "Change Status",
            },
          ]}
          tableData={ordersData.map((order) => ({
            ...order,
            status: (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[order.status]
                }`}
              >
                {words[order.status] || order.status}
              </span>
            ),
            statusDropdown: (
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ),
          }))}
          buttons={handleActions}
          searchColumn="customer"
          rowsPerPage={5}
        />
      </div>

      {/* Order Info Modal */}
      {selectedOrder && (
        <OrderInfoModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderListPage;
