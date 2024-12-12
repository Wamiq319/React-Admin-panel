import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoSwapVertical } from "react-icons/io5";

const DataTable = ({
  tableHeader,
  tableData,
  searchTerm,
  searchColumn,
  sortKey,
  sortDirection,
  buttons,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: sortKey ?? "id",
    direction: sortDirection ?? "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredData.length / rowsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    if (!searchTerm || !searchColumn) return true;
    return item[searchColumn]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="data-table-container mt-4 overflow-hidden rounded-lg border border-orange-300 w-full">
      <table className="data-table min-w-full divide-y">
        <thead className="bg-orange-400 font-bold">
          <tr>
            <th className="p-2  border-b-2  border-orange-300">#</th>
            {tableHeader.map((header, index) => (
              <th
                key={index}
                onClick={() => handleSort(header.key)}
                className="p-2 border-b-2  border-orange-300"
              >
                <span className="flex align-bottom ">
                  <h2>
                    <IoSwapVertical size={20} />
                  </h2>
                  <h2>{header.label}</h2>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={index}
              className={`p-2 border-b-2 border-orange-300 font-medium ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <td className="font-black  text-orange-bold p-2">
                {currentPage > 1 ? `${currentPage - 1}${index + 1}` : index + 1}
              </td>
              {tableHeader.map((col, colIndex) => (
                <td key={colIndex} className="p-2 ">
                  {typeof row[col.key] === "string" &&
                  row[col.key].includes("http") ? (
                    <img
                      src={row[col.key]}
                      className="bg-white shadow-lg rounded-lg h-14 w-14"
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
              {buttons && <td className="p-2 ">{buttons(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" p-2 bg-white pagination-controls flex justify-between">
        <span className="font-bold text-orange-500 text-lg ">
          TotalRecords:
          <small className="mx-1 font-bold  p-1 rounded-lg text-slate-900 text-lg">
            {tableData.length}
          </small>
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 cursor-pointer bg-orange-500 rounded-md font-black"
          >
            &lt;
          </button>
          <span className="font-bold mx-2">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
            }
            className="px-2 cursor-pointer bg-orange-500 rounded-md font-black "
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string,
  searchColumn: PropTypes.string,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  buttons: PropTypes.func,
};

export default DataTable;
