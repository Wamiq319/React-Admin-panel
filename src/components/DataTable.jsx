import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoSwapVertical } from "react-icons/io5";

/* ---------------------------------------------
   Status Colors for Badge Styling
--------------------------------------------- */
const statusColors = {
  Complete: "bg-green-200 text-green-800",
  Pending: "bg-yellow-200 text-yellow-800",
  Canceled: "bg-red-200 text-red-800",
  "Out of Stock": "bg-red-200 text-red-800",
  Active: "bg-green-200 text-green-800",
  Available: "bg-green-200 text-green-800",
  Inactive: "bg-red-200 text-red-800",
};

const DataTable = ({
  hasStatusColumn = false,
  tableHeader,
  tableData,
  searchTerm,
  searchColumn,
  sortKey,
  sortDirection,
  buttons,
  rowsPerPage = 10,
  dropdownOptions,
  dropdownColumnName,
}) => {
  /* ---------------------------------------------
     State Management
  --------------------------------------------- */
  const [sortConfig, setSortConfig] = useState({
    key: sortKey ?? "id",
    direction: sortDirection ?? "descending",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  /* ---------------------------------------------
     Sorting Functionality
  --------------------------------------------- */
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  /* ---------------------------------------------
     Pagination Handlers
  --------------------------------------------- */
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredData.length / rowsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  /* ---------------------------------------------
     Data Sorting and Filtering
  --------------------------------------------- */
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

  /* ---------------------------------------------
     Row Selection Handlers
  --------------------------------------------- */
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  /* ---------------------------------------------
     Render Table
  --------------------------------------------- */
  return (
    <div className="data-table-container mt-4 overflow-hidden rounded-lg shadow-lg border border-gray-300 w-full">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="data-table min-w-full divide-y">
          <thead className="bg-gray-100 font-bold">
            <tr>
              {/* Select All Checkbox */}
              <th className="p-3 text-left border-b-2 border-gray-300">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>

              {/* Column Headers with Sorting */}
              {tableHeader.map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(header.key)}
                  className="p-3 border-b-2 border-gray-300 cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <IoSwapVertical size={16} />
                    {header.label}
                  </span>
                </th>
              ))}

              {/* Dropdown Column */}
              {dropdownColumnName && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  {dropdownColumnName}
                </th>
              )}

              {/* Status Column */}
              {hasStatusColumn && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  Status
                </th>
              )}

              {/* Actions Column */}
              {buttons && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`p-3 border-b border-gray-300 font-medium ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {/* Row Selection */}
                <td className="font-bold text-gray-800 p-3 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>

                {/* Data Columns */}
                {tableHeader.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 text-sm sm:text-base">
                    {col.key === "image" ? (
                      <img
                        src={
                          typeof row[col.key] === "string"
                            ? row[col.key]
                            : row[col.key].src
                        }
                        className="bg-white shadow-md rounded-lg h-12 w-12"
                        alt=""
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}

                {/* Dropdown Column */}
                {dropdownColumnName && (
                  <td className="p-3 text-sm sm:text-base">
                    <select
                      value={row[dropdownColumnName]}
                      onChange={(e) =>
                        (row[dropdownColumnName] = e.target.value)
                      }
                      className="border p-2 rounded-md"
                    >
                      {dropdownOptions.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                )}

                {/* Status Column */}
                {hasStatusColumn && (
                  <td className="p-3 text-sm sm:text-base">
                    {row.status ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[row.status] ||
                          "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                )}

                {/* Actions Column */}
                {buttons && (
                  <td className="p-3 text-sm sm:text-base">{buttons(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-3 bg-white flex justify-between items-center border-t border-gray-300">
        <span className="font-bold text-gray-600">
          Total Records: {tableData.length}
        </span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-md font-semibold mx-1 disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="font-bold text-gray-700 mx-2">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
            }
            className="px-3 py-1 bg-gray-300 rounded-md font-semibold mx-1 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
