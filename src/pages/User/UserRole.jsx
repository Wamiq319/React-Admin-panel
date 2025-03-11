import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { useSelector } from "react-redux";

const UserRolesPage = () => {
  const words = useSelector((state) => state.lang.words);

  // Sample user roles data
  const [rolesData, setRolesData] = useState([
    {
      id: 1,
      roleName: "Admin",

      description: "Admin role",
      actions: "",
    },
    {
      id: 2,
      roleName: "Editor",

      description: "Editor role",
      actions: "",
    },
    {
      id: 3,
      roleName: "Viewer",

      description: "Viewer role",
      actions: "",
    },
  ]);

  // Define dropdown options for the roles
  const dropdownOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  // Action buttons for each row
  const handleActions = (row) => {
    return (
      <div className="flex ">
        <button className="text-white mx-1 bg-green-400 hover:bg-green-500 p-2 rounded-md">
          <FaPencilAlt />
        </button>
        <button className="text-red-400 mx-1 hover:text-red-500  border-red-400 hover:border-red-500 rounded-md  p-2 border-2  ">
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <div className="user-roles-page">
      {/* Page Header */}
      <PageHeader
        title={words["User Roles"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Users"], link: "/home/users" },
          { label: words["Roles"] },
        ]}
      />

      {/* User Roles Table */}
      <DataTable
        tableHeader={[
          { key: "roleName", label: "Role Name" },
          { key: "description", label: "Description" },
        ]}
        tableData={rolesData}
        searchTerm=""
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
