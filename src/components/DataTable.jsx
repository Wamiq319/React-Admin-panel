import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoSwapVertical } from "react-icons/io5";

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
  const [sortConfig, setSortConfig] = useState({
    key: sortKey ?? "id",
    direction: sortDirection ?? "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  const shouldShowStatusColumn =
    hasStatusColumn || tableData.some((row) => row.status !== undefined);

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

  return (
    <div className="data-table-container mt-4 overflow-hidden rounded-lg shadow-lg border border-gray-300 w-full">
      <div className="overflow-x-auto">
        <table className="data-table min-w-full divide-y">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="p-3 border-b-2 border-gray-300">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
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
              {dropdownColumnName && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  {dropdownColumnName}
                </th>
              )}
              {shouldShowStatusColumn && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  Status
                </th>
              )}
              {buttons && (
                <th className="p-3 border-b-2 border-gray-300 text-left">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`p-3 border-b border-gray-300 font-medium ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="font-bold text-gray-800 p-3 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>

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
                {dropdownColumnName && (
                  <td className="p-3 text-sm sm:text-base">
                    <select
                      value={row[dropdownColumnName]}
                      onChange={(e) => {
                        row[dropdownColumnName] = e.target.value;
                      }}
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
                {shouldShowStatusColumn && (
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
                {buttons && (
                  <td className="p-3 text-sm sm:text-base">{buttons(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  hasStatusColumn: PropTypes.bool,
  dropdownColumnName: PropTypes.string,
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default DataTable;
