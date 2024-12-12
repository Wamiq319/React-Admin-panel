import React from "react";

const PageNav = ({ menuItems, activeTab, onTabClick, className = "" }) => {
  return (
    <ul className={`flex justify-center  ${className}`}>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={` mx-2 cursor-pointer font-bold text-lg px-3 rounded transition-colors duration-200 ${
            activeTab === item.key
              ? "text-orange-500 border-b-2 border-orange-500"
              : "hover:text-orange-500"
          } `}
          onClick={() => onTabClick(item.key)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default PageNav;
