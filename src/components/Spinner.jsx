import React from "react";

const Spinner = ({ size = 8, opacity = 100 }) => {
  return (
    <div
      className={`border-4 border-solid rounded-full animate-spin`}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        borderWidth: `${size / 6}rem`,
        borderTopColor: `rgba(249, 115, 22, ${opacity / 100})`, // Orange color
        borderRightColor: `rgba(148, 163, 184, 0.5)`, // Slate color (75%)
        borderBottomColor: `rgba(148, 163, 184, 0.5)`, // Slate color
        borderLeftColor: `rgba(148, 163, 184, 0.5)`, // Slate color
      }}
    ></div>
  );
};

export default Spinner;
