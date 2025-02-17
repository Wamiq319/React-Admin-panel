import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/slices/notificationslice";
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, visible, duration, type, autoHide } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (visible && autoHide) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, autoHide, duration, dispatch]);

  if (!visible) return null;

  // Icon and styles based on notification type
  const icon =
    type === "success" ? (
      <MdCheckCircle className="text-green-500 text-2xl mr-2" />
    ) : type === "error" ? (
      <MdError className="text-red-500 text-2xl mr-2" />
    ) : (
      <MdInfo className="text-blue-500 text-2xl mr-2" />
    );

  const barColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      style={{
        zIndex: 999,
        backgroundColor: "white",
      }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 w-auto max-w-md flex flex-col items-start justify-between transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-2" : "-translate-y-full"
      }`}
    >
      {/* Message with Icon */}
      <div className="flex items-center">
        {icon}
        <span className="text-slate-900">{message}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} `}
          style={{
            width: "100%",
            animation: `progress ${duration}ms linear forwards`,
          }}
        ></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => dispatch(hideNotification())}
        className="absolute top-2 right-2 text-xl font-bold"
      >
        &times;
      </button>

      {/* Add animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;
