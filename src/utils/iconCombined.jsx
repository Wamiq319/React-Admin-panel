import React from "react";

const CombinedIcon = ({
  LargeIcon,
  SmallIcon,
  largeIconSize = 50,
  smallIconSize = 20,
  largeIconColor = "text-orange-500", // Tailwind color class as default
  smallIconColor = "text-orange-700", // Tailwind color class as default
  smallIconPosition = { bottom: -3, right: -3 },
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Large Icon */}
      <LargeIcon size={largeIconSize} className={largeIconColor} />

      {/* Small Icon */}
      <SmallIcon
        size={smallIconSize}
        className={smallIconColor}
        style={{
          position: "absolute",
          ...smallIconPosition,
        }}
      />
    </div>
  );
};

export default CombinedIcon;
