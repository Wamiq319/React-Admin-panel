import React from "react";

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-white p-4 w-full flex justify-between rounded-lg shadow-lg">
      <h6 className="font-bold text-xl text-slate-800">{title}</h6>
      <h4 className="text-lg text-orange-500">{breadcrumbs}</h4>
    </div>
  );
};

export default PageHeader;
