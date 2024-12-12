import React, { useContext, useState } from "react";
import { FaBell } from "react-icons/fa"; // Importing the bell icon
import { MdAddShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { SidebarContext } from "../../context/SidebarContext";
import { FaChevronDown } from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher";
import SearchInput from "../Search";

function Header() {
  const { toggleSidebar, isSidebarCollapsed } = useContext(SidebarContext);

  return (
    <div className="bg-none text-slate-950 p-4 flex items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-4 w-56 max-w-xs ">
        <button className="flex items-center justify-center w-12 h-12 rounded-md bg-white text-slate-900 hover:text-slate-900 transition duration-200">
          <MdAddShoppingCart className="text-2xl font-black text-orange-400" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 hover:text-orange-400 transition duration-200">
          SHOPIX +
        </h1>
      </div>
      {/* Search and Sidebar Toggle */}
      <div className="flex items-center justify-start flex-grow ml-3">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 p-1 bg-gray-200 rounded-full shadow-lg text-orange-500 transition duration-200"
        >
          {isSidebarCollapsed ? <MdMenu size={25} /> : <MdClose size={25} />}
        </button>
        <SearchInput className="w-72 mx-5" />
      </div>
      {/* Notification and Profile Section */}
      <div className="relative flex items-center mx-4  cursor-pointer">
        <LanguageSwitcher />
        <button className="flex items-center justify-center w-10 h-10 mx-4 rounded-full bg-gray-200 shadow-lg text-orange-400 transition duration-200">
          <FaBell size={25} />
        </button>

        <img
          src=""
          alt="Profile"
          className="w-12 h-12 rounded-full bg-white shadow-lg"
        />
        <div className="flex flex-col ml-2">
          <span className="text-slate-900">Profile Name</span>
          <span className="text-slate-900">@email.com</span>
        </div>
        {/* Arrow Icon */}
        <div className="group">
          <FaChevronDown className="w-4 h-4 mt-7 text-slate-900 ml-1  group-hover:text-orange-400 transition" />
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-12 w-48 bg-slate-800 text-white rounded-md shadow-lg z-10 hidden group-hover:block  duration-200 ease-in-out">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                My Account
              </li>
              <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                Reset Password
              </li>
              <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
