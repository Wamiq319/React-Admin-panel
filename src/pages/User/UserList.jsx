import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { useSelector } from "react-redux";

const UserListPage = () => {
  const words = useSelector((state) => state.lang.words);

  // Example user data with address, shift times, and status
  const userData = [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      address: "123 Main St, City, Country",
      shift: "9:00 AM - 5:00 PM",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      address: "456 Elm St, City, Country",
      shift: "10:00 AM - 6:00 PM",
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Active",
      address: "789 Oak St, City, Country",
      shift: "8:00 AM - 4:00 PM",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <PageHeader
        title={words["User Roles"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Users"], link: "/home/users" },
        ]}
      />

      <DataTable
        tableHeader={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address" },
          { key: "shift", label: "Shift Time" },
        ]}
        hasStatusColumn={true}
        tableData={userData}
        searchColumn="name"
        sortKey="id"
        sortDirection="ascending"
        rowsPerPage={5}
      />
    </div>
  );
};

export default UserListPage;
