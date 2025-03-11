import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputField, Button } from "../../components/FormComponents";
import PageHeader from "../../components/PageHeader";
import { FaUserPlus, FaSave, FaTimes } from "react-icons/fa";

const AddUserPage = () => {
  const words = useSelector((state) => state.lang.words);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    department: "", // New field
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted", formData);
  };

  return (
    <div className="add-user-wrapper">
      {/* Page Header */}
      <PageHeader
        title={words["Add User"]}
        breadcrumbs={[
          { label: words["Admin"], link: "/home/dashboard" },
          { label: words["Users"], link: "/home/user-list" },
          { label: words["Add"] },
        ]}
      />

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Section Title */}
        <div className="text-2xl font-semibold text-gray-800">
          {words["Personal Information"]}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Username"]}
              name="username"
              placeholder={words["Enter Username"]}
              value={formData.username}
              onChange={handleInputChange}
              icon={<FaUserPlus />}
            />
          </div>
          {/* Email */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Email"]}
              name="email"
              type="email"
              placeholder={words["Enter Email"]}
              value={formData.email}
              onChange={handleInputChange}
              icon={<FaTimes />}
            />
          </div>
        </div>

        {/* User Role Section */}
        <div className="text-2xl font-semibold text-gray-800">
          {words["User Role"]}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* User Role */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Role"]}
              name="role"
              placeholder={words["Select Role"]}
              value={formData.role}
              onChange={handleInputChange}
              type="select"
              options={[
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
          </div>

          {/* Department */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Department"]}
              name="department"
              placeholder={words["Enter Department"]}
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="text-2xl font-semibold text-gray-800">
          {words["Password Settings"]}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Password"]}
              name="password"
              type="password"
              placeholder={words["Enter Password"]}
              value={formData.password}
              onChange={handleInputChange}
              icon={<FaSave />}
            />
          </div>

          {/* Confirm Password */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InputField
              label={words["Confirm Password"]}
              name="confirmPassword"
              type="password"
              placeholder={words["Confirm Password"]}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={<FaSave />}
            />
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="submit"
            text={words["Save User"]}
            icon={<FaSave />}
            className="w-1/2 bg-green-500 hover:bg-green-600 "
          />
          <Button
            type="button"
            text={words["Cancel"]}
            icon={<FaTimes />}
            className="w-1/2 bg-red-500 hover:bg-red-600 "
          />
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
