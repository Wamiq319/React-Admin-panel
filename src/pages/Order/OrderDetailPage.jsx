import React from "react";
import { useSelector } from "react-redux";
import {
  FaTimes,
  FaClipboardList,
  FaPencilRuler,
  FaShippingFast,
  FaTruck,
  FaHome,
} from "react-icons/fa";
import Barcode from "react-barcode";

const OrderInfoPage = ({ order, onClose }) => {
  const words = useSelector((state) => state.lang.words);

  // Define status translations and colors
  const statusData = {
    Processing: {
      label: words["Processing"] || "Processing",
      color: "bg-yellow-500",
    },
    Shipped: { label: words["Shipped"] || "Shipped", color: "bg-blue-500" },
    Delivered: {
      label: words["Delivered"] || "Delivered",
      color: "bg-green-500",
    },
    Canceled: { label: words["Canceled"] || "Canceled", color: "bg-red-500" },
  };

  // Define order steps
  const steps = [
    { key: "Processing", icon: <FaClipboardList /> },
    { key: "Designing", icon: <FaPencilRuler /> },
    { key: "Shipped", icon: <FaShippingFast /> },
    { key: "En Route", icon: <FaTruck /> },
    { key: "Delivered", icon: <FaHome /> },
  ];

  // Get current step index based on progress
  const getCurrentStep = (progress) => {
    if (progress === 100) return 4;
    if (progress >= 75) return 3;
    if (progress >= 50) return 2;
    if (progress >= 25) return 1;
    return 0;
  };
  const currentStep = getCurrentStep(order.progress);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">
            {words["Order"] || "Order"} #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Order Details */}
        <div className="mt-4 space-y-2">
          <p>
            <strong>{words["Customer"] || "Customer"}:</strong> {order.customer}
          </p>
          <p>
            <strong>{words["Delivery Address"] || "Delivery Address"}:</strong>{" "}
            {order.address}
          </p>
          <p>
            <strong>{words["Total Amount"] || "Total Amount"}:</strong>{" "}
            {order.total}
          </p>
          <p>
            <strong>{words["Order Date"] || "Order Date"}:</strong> {order.date}
          </p>

          {/* Status Badge */}
          <p>
            <strong>{words["Status"] || "Status"}:</strong>
            <span
              className={`ml-2 px-2 py-1 text-white rounded ${
                statusData[order.status]?.color
              }`}
            >
              {statusData[order.status]?.label}
            </span>
          </p>

          {/* Barcode */}
          <div className="flex justify-center mt-4">
            <Barcode value={order.barcode} height={50} />
          </div>

          {/* Order Progress */}
          <div className="mt-6">
            <label className="text-sm font-semibold">
              {words["Order Progress"] || "Order Progress"}
            </label>
            <div className="relative flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                    ${
                      index <= currentStep
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium ${
                      index <= currentStep ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {words[step.key] || step.key}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Line */}
            <div className="w-full bg-gray-300 h-1 mt-2 relative">
              <div
                className="absolute top-0 left-0 h-1 bg-purple-600 transition-all duration-300"
                style={{ width: `${order.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
