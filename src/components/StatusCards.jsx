import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ title, progress, info, Icon, Color, options }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Predefine Tailwind color styles to avoid dynamic class name issues
  const iconBgClass = `bg-${Color}-300`; // Background color of icon
  const iconTextClass = `text-${Color}-500`; // Text color for icon
  const progressBgClass = `bg-${Color}-300`; // Progress bar background color
  const progressBarClass = `bg-${Color}-500`; // Progress bar color

  return (
    <div className="bg-white mr-6 p-2 w-full rounded-lg shadow-lg relative">
      <div className="flex justify-between align-top w-full ">
        <div className=" flex justify-start">
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBgClass} bg-opacity-50`}>
              <Icon size={30} className={`${iconTextClass}`} />
            </div>
          )}
          <span className="flex flex-col">
            <h2 className={`font-bold text-lg  mx-3 ${iconTextClass}`}>
              {title}
            </h2>
            <h4 className="text-gray-600  mx-3 ">{info}</h4>
          </span>
        </div>
        {/* Dropdown menu options */}
        {options && options.length > 0 && (
          <div className="relative group">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className={`focus:outline-none ${iconTextClass}`}
            >
              <FaEllipsisV />
            </button>

            <div
              className={`absolute z-50 right-0 top-10 bg-white border rounded-lg shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                dropdownVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <ul>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link to={option.route} className="text-black">
                      {option.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
