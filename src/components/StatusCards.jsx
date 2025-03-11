import React from "react";

const Card = ({ title, progress, info, Icon, Color }) => {
  const iconBgClass = `bg-${Color}-300`;
  const iconTextClass = `text-${Color}-500`;
  const progressBgClass = `bg-${Color}-300`;
  const progressBarClass = `bg-${Color}-500`;

  return (
    <div className="bg-white mx-2 my-2 p-2 w-full rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex">
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBgClass} bg-opacity-50`}>
              <Icon size={30} className={iconTextClass} />
            </div>
          )}
          <div className="flex flex-col">
            <h2 className={`font-bold text-lg mx-3 ${iconTextClass}`}>
              {title}
            </h2>
            <h4 className="text-gray-600 mx-3 w-full truncate">{info}</h4>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div
          className={`h-2 w-full rounded-full ${progressBgClass} bg-opacity-50 relative`}
        >
          <div
            className={`h-2 ${progressBarClass} rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
