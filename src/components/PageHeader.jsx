import React from "react";
import { Link } from "react-router-dom"; // Assuming we're using React Router for links

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-white p-4 w-full flex flex-col sm:flex-row justify-between rounded-lg shadow-lg">
      {/* Title */}
      <h6 className="font-bold text-xl text-slate-800">{title}</h6>

      {/* Breadcrumbs */}
      <div className="flex flex-wrap space-x-2 mt-2 sm:mt-0">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {/* If it's not the last breadcrumb, we will add a separator */}
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link
                  to={breadcrumb.link}
                  className="text-orange-500 hover:text-orange-700 text-sm sm:text-base"
                >
                  {breadcrumb.label}
                </Link>
                <span className="text-gray-500">/</span>
              </>
            ) : (
              // Last breadcrumb, no link, just the label
              <span className="text-orange-500 text-sm sm:text-base">
                {breadcrumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
