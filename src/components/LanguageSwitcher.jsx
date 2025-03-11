import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/langSlice";

import { usflag, pakflag, frflag, arflag } from "../assets"; // Add Arabic flag

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.lang);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    document.documentElement.setAttribute(
      "dir",
      lang === "ar" || lang === "urd" ? "rtl" : "ltr" // Set right-to-left (RTL) for Urdu and Arabic
    );
    setIsDropdownOpen(false); // Close dropdown after selecting a language
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <span
        className="flex items-center px-1 py-2 rounded text-orange-500 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {/* Display Flag instead of Globe */}
        <span className="w-9 h-9 mx-1 rounded-full shadow-lg bg-white">
          <img
            src={
              lang === "eng"
                ? usflag
                : lang === "urd"
                ? pakflag
                : lang === "fr"
                ? frflag
                : lang === "ar"
                ? arflag // Use Arabic flag if selected language is Arabic
                : usflag
            }
            alt="Language Flag"
          />
        </span>
        <span className="hidden sm:flex">
          {lang === "eng"
            ? "Eng"
            : lang === "urd"
            ? "اردو"
            : lang === "fr"
            ? "Fr"
            : lang === "ar"
            ? "عربي"
            : "Eng"}{" "}
          {/* Display selected language text */}
        </span>
      </span>
      {isDropdownOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            {/* Dropdown options */}
            <li
              onClick={() => handleLanguageChange("eng")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={usflag} alt="English" className="w-5 h-5 mr-2" />
              English
            </li>
            <li
              onClick={() => handleLanguageChange("urd")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={pakflag} alt="Urdu" className="w-5 h-5 mr-2" />
              اردو
            </li>
            <li
              onClick={() => handleLanguageChange("fr")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={frflag} alt="French" className="w-5 h-5 mr-2" />
              Français
            </li>
            <li
              onClick={() => handleLanguageChange("ar")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={arflag} alt="Arabic" className="w-5 h-5 mr-2" />{" "}
              {/* Add Arabic flag */}
              عربي
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
