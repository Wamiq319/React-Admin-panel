import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/slices/notificationslice";
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md";

const Notification = () => {
  const dispatch = useDispatch();
  const {
    message = "",
    visible = false,
    duration = 3000,
    type = "info",
    autoHide = true,
  } = useSelector((state) => state.notification);

  useEffect(() => {
    if (visible && autoHide) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, autoHide, duration, dispatch]);

  if (!visible) return null;

  // Select icon based on notification type
  const icon =
    type === "success" ? (
      <MdCheckCircle className="text-green-500 text-2xl mr-2" />
    ) : type === "error" ? (
      <MdError className="text-red-500 text-2xl mr-2" />
    ) : (
      <MdInfo className="text-blue-500 text-2xl mr-2" />
    );

  // Select progress bar color based on type
  const barColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg w-auto max-w-md flex flex-col items-start justify-between transition-transform duration-300 ease-in-out bg-white border border-gray-200 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
      style={{ zIndex: 999 }}
    >
      {/* Message with Icon */}
      <div className="flex items-center">
        {icon}
        <span className="text-slate-900 font-medium">{message}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{
            width: "100%",
            animation: `progress ${duration}ms linear forwards`,
          }}
        ></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => dispatch(hideNotification())}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl p-2"
      >
        &times;
      </button>

      {/* Animation for progress bar */}
      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Notification;
