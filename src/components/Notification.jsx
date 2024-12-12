// Notification.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/slices/notificationslice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, visible, duration, className, autoHide } = useSelector(
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

  return (
    <div
      style={{ zIndex: "999" }}
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg z-50 w-auto max-w-md flex items-center justify-between bg-orange-500 text-white transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-2" : "-translate-y-full"
      } ${className}`}
    >
      <span>{message}</span>
      <button
        onClick={() => dispatch(hideNotification())}
        className="ml-4 text-xl font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
