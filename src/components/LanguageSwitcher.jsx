import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/langSlice";
import { FiGlobe } from "react-icons/fi";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    dispatch(setLanguage(lang));
    document.documentElement.setAttribute(
      "dir",
      lang === "urd" ? "rtl" : "ltr"
    );
    setIsDropdownOpen(false); // Close dropdown after language change
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center px-1 py-2 bg-gray-200 rounded  text-orange-500"
        onClick={toggleDropdown}
      >
        <FiGlobe className="w-5 h-5 mx-1 text-orange-500" />
        {selectedLanguage === "eng" ? "Eng" : "اردو"}
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            <li
              onClick={() => handleLanguageChange("eng")}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              English
            </li>
            <li
              onClick={() => handleLanguageChange("urd")}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              اردو
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
