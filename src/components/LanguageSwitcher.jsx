import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/langSlice";

import { usflag, pakflag, frflag, arflag } from "../assets"; // Import language flags

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle language change
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    dispatch(setLanguage(lang));
    document.documentElement.setAttribute(
      "dir",
      lang === "ar" || lang === "urd" ? "rtl" : "ltr" // Set RTL for Urdu and Arabic
    );
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine flag based on selected language
  const getFlag = (lang) => {
    switch (lang) {
      case "urd":
        return pakflag;
      case "fr":
        return frflag;
      case "ar":
        return arflag;
      default:
        return usflag;
    }
  };

  // Determine language label
  const getLanguageLabel = (lang) => {
    switch (lang) {
      case "urd":
        return "اردو";
      case "fr":
        return "Fr";
      case "ar":
        return "عربي";
      default:
        return "Eng";
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Language Selection Button */}
      <span
        className="flex items-center px-1 py-2 rounded text-orange-500 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="w-9 h-9 mx-1 rounded-full shadow-lg bg-white">
          <img src={getFlag(selectedLanguage)} alt="Language Flag" />
        </span>
        <span className="hidden sm:flex">
          {getLanguageLabel(selectedLanguage)}
        </span>
      </span>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            {[
              { lang: "eng", flag: usflag, label: "English" },
              { lang: "urd", flag: pakflag, label: "اردو" },
              { lang: "fr", flag: frflag, label: "Français" },
              { lang: "ar", flag: arflag, label: "عربي" },
            ].map(({ lang, flag, label }) => (
              <li
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={flag} alt={label} className="w-5 h-5 mr-2" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
