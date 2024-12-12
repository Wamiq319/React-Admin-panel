import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoSwapVertical } from "react-icons/io5";

const DataTable = ({
  draggable,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  data = [],
  columns,
  sortKey = null,
  sortDirection = null,
  buttons = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: sortKey ?? "id",
    direction: sortDirection ?? "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (sortKey && sortDirection) {
      handleSort(sortKey);
    }
  }, [sortKey, sortDirection]);

  const sortedData = [...data].sort((a, b) => {
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

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full">
      {/* Search Input */}
      {/* <div className="flex items-center gap-3 w-52 rounded-md border border-slate-700 px-3 py-2 focus-within:border-orange-500">
        <CiSearch className="text-slate-800" />
        <input
          onChange={handleSearch}
          type="text"
          placeholder={"search"}
          className="w-full bg-transparent outline-none text-base"
        />
      </div> */}

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-300">
        <table className="min-w-full divide-y">
          <thead className="bg-orange-400">
            <tr className="text-right">
              {columns?.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.dataIndex)}
                  className="px-4 py-2 text-sm font-medium text-slate-900 cursor-pointer"
                >
                  <div className="flex items-center">
                    {column.title}
                    <IoSwapVertical className="ml-2 text-slate-500" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-300">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                draggable={draggable}
                onDragStart={(e) => onDragStart(e, row)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {column.render ? (
                      column.render(row[column.dataIndex], row)
                    ) : column.dataIndex === "product" ? (
                      <div className="flex items-center">
                        <img
                          src={row[column.dataIndex].image}
                          alt="product"
                          className="w-20 h-20 mr-2"
                        />
                        <div>
                          <div className="font-medium">
                            {row[column.dataIndex].name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {row[column.dataIndex].description.length > 20
                              ? row[column.dataIndex].description.slice(0, 20) +
                                "..."
                              : row[column.dataIndex].description}
                          </div>
                        </div>
                      </div>
                    ) : column.dataIndex === "actions" ? (
                      <div className="flex items-center">
                        {buttons.map((button, index) => (
                          <button
                            key={index}
                            onClick={() => button.onClick(row)} // Call the onClick function passed in the button object
                            className={button.className} // Button class for styling
                          >
                            {button.icon} {/* The icon for the button */}
                          </button>
                        ))}
                      </div>
                    ) : (
                      row[column.dataIndex]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DataTable;
