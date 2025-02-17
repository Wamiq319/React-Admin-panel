import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ title, progress, info, Icon, Color }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Predefine Tailwind color styles to avoid dynamic class name issues
  const iconBgClass = `bg-${Color}-300`; // Background color of icon
  const iconTextClass = `text-${Color}-500`; // Text color for icon
  const progressBgClass = `bg-${Color}-300`; // Progress bar background color
  const progressBarClass = `bg-${Color}-500`; // Progress bar color

  return (
    <div className="bg-white mx-2 my-2 p-2 w-full rounded-lg shadow-lg relative">
      <div className="flex justify-between align-top w-full ">
        <div className="flex justify-start">
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBgClass} bg-opacity-50`}>
              <Icon size={30} className={`${iconTextClass}`} />
            </div>
          )}
          <span className="flex flex-col">
            <h2 className={`font-bold text-lg mx-3 ${iconTextClass}`}>
              {title}
            </h2>
            {/* Info with truncation if too long */}
            <h4 className="text-gray-600 mx-3 w-full truncate">{info}</h4>
          </span>
        </div>
      </div>

      <div className="mt-2 flex">
        <div
          className={`h-2 w-full rounded-full ${progressBgClass} bg-opacity-50 relative`}
        >
          <div
            className={`h-2 ${progressBarClass} rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
