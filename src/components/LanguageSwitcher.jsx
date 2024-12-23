import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/langSlice";

import { usflag, pakflag } from "../assets";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    dispatch(setLanguage(lang));
    document.documentElement.setAttribute(
      "dir",
      lang === "urd" ? "rtl" : "ltr"
    );
  };

  return (
    <div className="relative inline-block group">
      <span className="flex items-center px-1 py-2  rounded text-orange-500">
        {/* Display Flag instead of Globe */}
        <span className="w-9 h-9 mx-1  rounded-full shadow-lg  bg-white">
          <img
            src={selectedLanguage === "eng" ? usflag : pakflag}
            alt="Language Flag"
          />
        </span>
        <span className="hidden sm:flex">
          {selectedLanguage === "eng" ? "Eng" : "اردو"}
        </span>
      </span>
      <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
