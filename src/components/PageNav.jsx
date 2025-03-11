import React, { useState, useEffect } from "react";

const PageNav = ({ menuItems, activeTab, onTabClick, className = "" }) => {
  const [showArrows, setShowArrows] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.key === activeTab);
    setActiveIndex(index);
  }, [activeTab, menuItems]);

  const handleArrowClick = (direction) => {
    let newIndex;
    if (direction === "left") {
      newIndex = activeIndex === 0 ? menuItems.length - 1 : activeIndex - 1;
    } else {
      newIndex = activeIndex === menuItems.length - 1 ? 0 : activeIndex + 1;
    }
    onTabClick(menuItems[newIndex].key);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      {showArrows && (
        <div className="flex items-center justify-between">
          <button
            className="text-orange-500 text-2xl"
            onClick={() => handleArrowClick("left")}
          >
            &larr;
          </button>
          <div className="text-center font-bold text-lg">
            {menuItems[activeIndex].label}
          </div>
          <button
            className="text-orange-500 text-2xl"
            onClick={() => handleArrowClick("right")}
          >
            &rarr;
          </button>
        </div>
      )}
      {!showArrows && (
        <ul className="flex justify-center whitespace-nowrap">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`mx-2 cursor-pointer font-bold text-lg px-3 rounded transition-colors duration-200 ${
                activeTab === item.key
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={() => onTabClick(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PageNav;
