// **Critical Note**: Set the direction globally for the entire app (in App.jsx), not just locally in this component.
// Ensure that the direction ('ltr' or 'rtl') is applied to the <div dir={direction}> in App.jsx to affect the whole layout.
// This component is used to switch between languages and set the direction based on the selected language.

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/langSlice";

import { usflag, pakflag, frflag, arflag } from "../assets"; // Add Arabic flag

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    dispatch(setLanguage(lang));
    console.log(lang);
    document.documentElement.setAttribute(
      "dir",
      lang === "ar" || lang === "urd" ? "rtl" : "ltr" // Set right-to-left (RTL) for Urdu and Arabic
    );
  };

  return (
    <div className="relative inline-block group">
      <span className="flex items-center px-1 py-2 rounded text-orange-500">
        {/* Display Flag instead of Globe */}
        <span className="w-9 h-9 mx-1 rounded-full shadow-lg bg-white">
          <img
            src={
              selectedLanguage === "eng"
                ? usflag
                : selectedLanguage === "urd"
                ? pakflag
                : selectedLanguage === "fr"
                ? frflag
                : selectedLanguage === "ar"
                ? arflag // Use Arabic flag if selected language is Arabic
                : usflag
            }
            alt="Language Flag"
          />
        </span>
        <span className="hidden sm:flex">
          {selectedLanguage === "eng"
            ? "Eng"
            : selectedLanguage === "urd"
            ? "اردو"
            : selectedLanguage === "fr"
            ? "Fr"
            : selectedLanguage === "ar"
            ? "عربي"
            : "Eng"}{" "}
          {/* Display selected language text */}
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
    </div>
  );
};

export default LanguageSwitcher;
