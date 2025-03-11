import React, { useState, useEffect } from "react";
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

const OrderInfoPage = ({ order, onClose, updatedStatus }) => {
  const words = useSelector((state) => state.lang.words);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  useEffect(() => {
    if (updatedStatus) {
      setCurrentStatus(updatedStatus);
    }
  }, [updatedStatus]);

  // Order steps with unique icon colors & light backgrounds
  const steps = [
    {
      key: "Processing",
      icon: <FaClipboardList />,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      key: "Ready",
      icon: <FaPencilRuler />,
      color: "text-gray-600",
      bg: "bg-gray-200",
    },
    {
      key: "Shipped",
      icon: <FaShippingFast />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      key: "En Route",
      icon: <FaTruck />,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      key: "Delivered",
      icon: <FaHome />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

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

          {/* Status */}
          <p>
            <strong>{words["Status"] || "Status"}:</strong>
            <span className="ml-2 px-2 py-1 text-white rounded">
              {currentStatus}
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

            {/* Progress Steps */}
            <div className="flex justify-between items-center mt-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border ${step.bg}`}
                  >
                    <span className={step.color}>{step.icon}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium">
                    {words[step.key] || step.key}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-300 h-4 mt-2 rounded-full">
              <div
                className="absolute top-0 left-0 h-4 rounded-full"
                style={{
                  width: `${order.progress}%`,
                  opacity: 0.7,
                  backgroundColor:
                    order.progress === 100
                      ? "green"
                      : order.progress >= 75
                      ? "blue"
                      : order.progress >= 50
                      ? "orange"
                      : "yellow",
                }}
              ></div>
              {/* Progress Number */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
                {order.progress}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
