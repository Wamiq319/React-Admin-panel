import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

// Components
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";

const UserRolesPage = () => {
  const words = useSelector((state) => state.lang.words);

  // Status Box Styling
  const statusStyles = {
    Admin: "bg-red-200 text-red-800",
    Editor: "bg-blue-200 text-blue-800",
    Viewer: "bg-green-200 text-green-800",
  };

  // Preprocessed roles data
  const [rolesData] = useState(
    [
      { id: 1, roleName: "Admin", description: "Admin role" },
      { id: 2, roleName: "Editor", description: "Editor role" },
      { id: 3, roleName: "Viewer", description: "Viewer role" },
    ].map((role) => ({
      ...role,
      status: (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusStyles[role.roleName]
          }`}
        >
          {words[role.roleName] || role.roleName}
        </span>
      ),
    }))
  );

  // Dropdown options for the roles
  const dropdownOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  // Action buttons for each row
  const handleActions = () => (
    <div className="flex">
      <button className="text-white mx-1 bg-green-400 hover:bg-green-500 p-2 rounded-md">
        <FaPencilAlt />
      </button>
      <button className="text-red-400 mx-1 hover:text-red-500 border-red-400 hover:border-red-500 rounded-md p-2 border-2">
        <FaTrashAlt />
      </button>
    </div>
  );

  return (
    <div className="user-roles-page">
      {/* Page Header */}
      <PageHeader
        title={words["User Roles"] || "User Roles"}
        breadcrumbs={[
          { label: words["Admin"] || "Admin", link: "/home/dashboard" },
          { label: words["Users"] || "Users", link: "/home/users" },
          { label: words["Roles"] || "Roles" },
        ]}
      />

      {/* User Roles Table */}
      <DataTable
        tableHeader={[
          { key: "roleName", label: words["Role Name"] || "Role Name" },
          { key: "description", label: words["Description"] || "Description" },
          { key: "status", label: words["Status"] || "Status" },
        ]}
        tableData={rolesData}
        searchColumn="roleName"
        sortKey="roleName"
        sortDirection="ascending"
        buttons={handleActions}
        dropdownColumnName="Role Dropdown"
        dropdownOptions={dropdownOptions}
        actionsColumnName="Actions"
        rowsPerPage={5}
      />
    </div>
  );
};

export default UserRolesPage;
